"""
JSON API endpoints for authentication and CMS persistence.

Auth uses Django sessions: the SPA logs in via /api/auth/login/ and the
session cookie authenticates subsequent requests. All POSTs require the
CSRF token (sent by the frontend as the X-CSRFToken header).

CMS write endpoints require a staff user — the client-side role flag in
localStorage is cosmetic; this is the actual gate.
"""
import json
import secrets
from datetime import datetime
from functools import wraps

from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils import timezone
from django.utils.text import slugify
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET

from .models import BlogPost, Category, Dealer, Event, MediaAsset, PasswordResetOTP, Product

User = get_user_model()


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------

def _json_body(request):
    try:
        return json.loads(request.body)
    except (ValueError, TypeError):
        return None


def _user_payload(user):
    return {
        'name': user.get_full_name() or user.username,
        'email': user.email or user.username,
        'role': 'Admin' if user.is_staff else 'Operator',
    }


def staff_required_json(view):
    @wraps(view)
    def wrapped(request, *args, **kwargs):
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'error': 'Staff authentication required'}, status=403)
        return view(request, *args, **kwargs)
    return wrapped


def _client_ip(request):
    # REMOTE_ADDR is the trustworthy value here; X-Forwarded-For is only
    # meaningful behind a proxy that overwrites it, and can be spoofed otherwise.
    return request.META.get('REMOTE_ADDR', 'unknown')


def _rate_limited(request, scope, limit, window_seconds):
    """Simple fixed-window rate limiter keyed on client IP + scope.

    Uses the default (local-memory) cache: per-process, which is fine as a
    baseline brute-force brake. Returns True when the caller is over budget.
    """
    key = f'rl:{scope}:{_client_ip(request)}'
    added = cache.add(key, 1, timeout=window_seconds)
    if added:
        return False
    try:
        count = cache.incr(key)
    except ValueError:  # key expired between add() and incr()
        cache.add(key, 1, timeout=window_seconds)
        return False
    return count > limit


def _rate_limit_response():
    return JsonResponse(
        {'error': 'Too many attempts. Please wait a few minutes and try again.'},
        status=429,
    )


def _parse_display_date(value):
    """Parse dates the SPA sends, e.g. 'Jun 08, 2026' or ISO strings."""
    if not value:
        return None
    for fmt in ('%b %d, %Y', '%B %d, %Y', '%Y-%m-%d', '%Y-%m-%dT%H:%M:%S'):
        try:
            return timezone.make_aware(datetime.strptime(str(value)[:19], fmt))
        except (ValueError, TypeError):
            continue
    return None


def _set_schema_extra(obj, updates):
    """Merge keys into the JSON stored in schema_override."""
    try:
        extra = json.loads(obj.schema_override) if obj.schema_override else {}
        if not isinstance(extra, dict):
            extra = {}
    except ValueError:
        extra = {}
    extra.update({k: v for k, v in updates.items() if v is not None})
    obj.schema_override = json.dumps(extra)


# --------------------------------------------------------------------------
# Auth
# --------------------------------------------------------------------------

@ensure_csrf_cookie
@require_GET
def auth_me(request):
    """Session status. Also plants the CSRF cookie for the SPA."""
    if request.user.is_authenticated:
        return JsonResponse({'authenticated': True, 'user': _user_payload(request.user)})
    return JsonResponse({'authenticated': False, 'user': None})


@require_POST
def auth_login(request):
    if _rate_limited(request, 'login', limit=10, window_seconds=300):
        return _rate_limit_response()

    data = _json_body(request)
    if not data:
        return JsonResponse({'error': 'Invalid request payload'}, status=400)

    identifier = (data.get('email') or data.get('username') or '').strip()
    password = data.get('password') or ''
    if not identifier or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)

    # Accept either a username or an email address.
    username = identifier
    if '@' in identifier:
        match = User.objects.filter(email__iexact=identifier).first()
        if match:
            username = match.username

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    login(request, user)
    return JsonResponse({'success': True, 'user': _user_payload(user)})


@require_POST
def auth_logout(request):
    logout(request)
    return JsonResponse({'success': True})


@require_POST
def auth_signup(request):
    if _rate_limited(request, 'signup', limit=5, window_seconds=3600):
        return _rate_limit_response()

    data = _json_body(request)
    if not data:
        return JsonResponse({'error': 'Invalid request payload'}, status=400)

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    if not email or '@' not in email:
        return JsonResponse({'error': 'A valid email address is required'}, status=400)
    try:
        validate_password(password)
    except ValidationError as e:
        return JsonResponse({'error': ' '.join(e.messages)}, status=400)
    if User.objects.filter(username__iexact=email).exists() or \
       User.objects.filter(email__iexact=email).exists():
        return JsonResponse({'error': 'An account with this email already exists'}, status=409)

    user = User.objects.create_user(username=email, email=email, password=password)
    if name:
        user.first_name = name[:150]
        user.save(update_fields=['first_name'])

    login(request, user)
    return JsonResponse({'success': True, 'user': _user_payload(user)}, status=201)


# --------------------------------------------------------------------------
# Password reset (server-generated OTP, emailed to the account address)
# --------------------------------------------------------------------------

def _get_reset_user(email):
    if not email or '@' not in email:
        return None
    return User.objects.filter(email__iexact=email).first() or \
        User.objects.filter(username__iexact=email).first()


@require_POST
def password_reset_request(request):
    """Generate a 6-digit OTP server-side and email it to the user.

    Always responds with success so the endpoint cannot be used to probe
    which email addresses have accounts.
    """
    if _rate_limited(request, 'pwreset', limit=5, window_seconds=600):
        return _rate_limit_response()

    data = _json_body(request) or {}
    email = (data.get('email') or '').strip().lower()
    user = _get_reset_user(email)

    if user:
        code = f'{secrets.randbelow(1000000):06d}'
        PasswordResetOTP.objects.filter(user=user).delete()
        PasswordResetOTP.objects.create(user=user, code_hash=make_password(code))
        send_mail(
            subject='NightVision password reset code',
            message=(
                f'Your NightVision verification code is: {code}\n\n'
                f'It expires in {PasswordResetOTP.EXPIRY_MINUTES} minutes. '
                'If you did not request a password reset, you can ignore this email.'
            ),
            from_email=None,  # uses DEFAULT_FROM_EMAIL
            recipient_list=[user.email or user.username],
            fail_silently=False,
        )

    return JsonResponse({
        'success': True,
        'message': 'If an account exists for that address, a verification code has been sent.',
    })


def _check_reset_code(email, code):
    """Validate an OTP. Returns (user, error_response)."""
    user = _get_reset_user(email)
    otp = PasswordResetOTP.objects.filter(user=user).first() if user else None
    invalid = JsonResponse({'error': 'Invalid or expired verification code'}, status=400)

    if not otp:
        return None, invalid
    if otp.is_expired() or otp.attempts >= PasswordResetOTP.MAX_ATTEMPTS:
        otp.delete()
        return None, invalid
    if not code or not check_password(str(code), otp.code_hash):
        otp.attempts += 1
        otp.save(update_fields=['attempts'])
        return None, invalid
    return user, None


@require_POST
def password_reset_verify(request):
    """Check the OTP without consuming it (step 2 of the SPA flow)."""
    if _rate_limited(request, 'pwverify', limit=15, window_seconds=600):
        return _rate_limit_response()

    data = _json_body(request) or {}
    user, error = _check_reset_code((data.get('email') or '').strip().lower(),
                                    data.get('code'))
    if error:
        return error
    return JsonResponse({'success': True})


@require_POST
def password_reset_confirm(request):
    """Set the new password. Requires the email + valid OTP again."""
    if _rate_limited(request, 'pwconfirm', limit=15, window_seconds=600):
        return _rate_limit_response()

    data = _json_body(request) or {}
    user, error = _check_reset_code((data.get('email') or '').strip().lower(),
                                    data.get('code'))
    if error:
        return error

    password = data.get('password') or ''
    try:
        validate_password(password, user=user)
    except ValidationError as e:
        return JsonResponse({'error': ' '.join(e.messages)}, status=400)

    user.set_password(password)
    user.save(update_fields=['password'])
    PasswordResetOTP.objects.filter(user=user).delete()
    return JsonResponse({'success': True, 'message': 'Password has been reset. You can now log in.'})


# --------------------------------------------------------------------------
# CMS writes (staff only)
# --------------------------------------------------------------------------

@require_POST
@staff_required_json
def blog_save(request):
    data = _json_body(request)
    if not data or not data.get('title'):
        return JsonResponse({'error': 'A title is required'}, status=400)

    slug = data.get('slug') or slugify(data['title'])
    content = data.get('content')
    if isinstance(content, list):
        content = '\n\n'.join(str(c) for c in content)

    category = None
    if data.get('tag'):
        category, _ = Category.objects.get_or_create(
            name=data['tag'], defaults={'slug': slugify(data['tag'])}
        )

    post, created = BlogPost.objects.update_or_create(
        slug=slug,
        defaults={
            'title': data['title'],
            'category': category,
            'content': content or '',
            'meta_description': (data.get('excerpt') or '')[:160],
            'date_published': _parse_display_date(data.get('date')) or timezone.now(),
        },
    )
    if created:
        post.author = request.user
    _set_schema_extra(post, {'image': data.get('img')})
    post.save()
    return JsonResponse({'success': True, 'id': post.id, 'slug': post.slug,
                         'created': created})


@require_POST
@staff_required_json
def blog_delete(request):
    data = _json_body(request) or {}
    ident = data.get('id') or data.get('slug')
    if not ident:
        return JsonResponse({'error': 'An id or slug is required'}, status=400)
    qs = BlogPost.objects.filter(id=ident) if str(ident).isdigit() \
        else BlogPost.objects.filter(slug=ident)
    deleted, _ = qs.delete()
    return JsonResponse({'success': True, 'deleted': deleted})


@require_POST
@staff_required_json
def event_save(request):
    data = _json_body(request)
    if not data or not data.get('title'):
        return JsonResponse({'error': 'A title is required'}, status=400)

    slug = data.get('slug') or slugify(data['title'])
    content = data.get('content')
    if isinstance(content, list):
        content = '\n\n'.join(str(c) for c in content)

    event, created = Event.objects.update_or_create(
        slug=slug,
        defaults={
            'title': data['title'],
            'description': content or data.get('excerpt') or '',
            'start_date': _parse_display_date(data.get('date')) or timezone.now(),
            'location': data.get('location') or '',
        },
    )
    _set_schema_extra(event, {
        'image': data.get('image') or data.get('img'),
        'type': data.get('type'),
        'tag': data.get('tag'),
    })
    event.save()
    return JsonResponse({'success': True, 'id': event.id, 'slug': event.slug,
                         'created': created})


@require_POST
@staff_required_json
def event_delete(request):
    data = _json_body(request) or {}
    ident = data.get('id') or data.get('slug')
    if not ident:
        return JsonResponse({'error': 'An id or slug is required'}, status=400)
    qs = Event.objects.filter(id=ident) if str(ident).isdigit() \
        else Event.objects.filter(slug=ident)
    deleted, _ = qs.delete()
    return JsonResponse({'success': True, 'deleted': deleted})


@require_POST
@staff_required_json
def dealer_save(request):
    data = _json_body(request)
    name = data.get('companyName') or data.get('name') if data else None
    if not name:
        return JsonResponse({'error': 'A company name is required'}, status=400)

    slug = data.get('slug') or (data.get('id') if isinstance(data.get('id'), str) else None) \
        or slugify(name)
    location = data.get('location') or ''

    province = data.get('province') or 'Bagmati Province'
    for prov in ('koshi', 'madhesh', 'bagmati', 'gandaki', 'lumbini', 'karnali', 'sudurpashchim'):
        if prov in location.lower():
            province = prov.capitalize() + ' Province'
            break

    dealer, created = Dealer.objects.update_or_create(
        slug=slug,
        defaults={
            'name': name,
            'province': province,
            'district': data.get('district') or 'Kathmandu',
            'address': location,
            'phone_number': data.get('phone') or data.get('phone_number') or '',
            'email': data.get('email') or '',
        },
    )
    _set_schema_extra(dealer, {
        'businessType': data.get('businessType'),
        'contactName': data.get('contactName'),
        'status': data.get('status'),
        'isPlatinum': data.get('isPlatinum'),
        'mapUrl': data.get('mapUrl'),
        'brief': data.get('brief'),
        'date': data.get('date'),
    })
    dealer.save()
    return JsonResponse({'success': True, 'id': dealer.id, 'slug': dealer.slug,
                         'created': created})


@require_POST
@staff_required_json
def product_save(request):
    data = _json_body(request)
    if not data or not data.get('name'):
        return JsonResponse({'error': 'A product name is required'}, status=400)

    slug = data.get('slug') or (data.get('id') if isinstance(data.get('id'), str) else None) \
        or slugify(data['name'])

    category = None
    if data.get('category'):
        category, _ = Category.objects.get_or_create(
            name=data['category'], defaults={'slug': slugify(data['category'])}
        )

    status_map = {'IN STOCK': 'in_stock', 'OUT OF STOCK': 'out_of_stock', 'PRE-ORDER': 'pre_order'}
    stock_status = status_map.get(str(data.get('status', '')).upper(), 'in_stock')

    try:
        price = float(data.get('price') or 0)
    except (TypeError, ValueError):
        price = 0

    # Everything the model doesn't have a column for lives in the specs JSON.
    model_fields = {'id', 'slug', 'name', 'category', 'price', 'discount', 'status', 'description'}
    tech_specs = {k: v for k, v in data.items() if k not in model_fields}

    product, created = Product.objects.update_or_create(
        slug=slug,
        defaults={
            'name': data['name'],
            'category': category,
            'price': price,
            'discount': float(data.get('discount') or 0),
            'stock_status': stock_status,
            'description': data.get('description') or '',
            'technical_specifications': tech_specs,
        },
    )
    return JsonResponse({'success': True, 'id': product.slug, 'created': created})


@require_POST
@staff_required_json
def product_delete(request):
    data = _json_body(request) or {}
    ident = data.get('id') or data.get('slug')
    if not ident:
        return JsonResponse({'error': 'An id or slug is required'}, status=400)
    qs = Product.objects.filter(slug=ident)
    if not qs.exists() and str(ident).isdigit():
        qs = Product.objects.filter(id=int(ident))
    deleted, _ = qs.delete()
    return JsonResponse({'success': True, 'deleted': deleted})


@require_POST
@staff_required_json
def upload_image(request):
    """Multipart image upload -> optimized WebP via the MediaAsset pipeline."""
    upload = request.FILES.get('file')
    if not upload:
        return JsonResponse({'error': 'No file provided (multipart field name: "file")'}, status=400)

    alt_text = request.POST.get('alt_text') or upload.name
    is_header = request.POST.get('is_header') in ('1', 'true', 'yes')

    from django.core.exceptions import ValidationError
    asset = MediaAsset(file=upload, alt_text=alt_text, is_header=is_header,
                       title=request.POST.get('title', ''))
    try:
        asset.save()
    except ValidationError as e:
        return JsonResponse({'error': '; '.join(e.messages)}, status=400)

    return JsonResponse({
        'success': True,
        'id': asset.id,
        'url': asset.file.url,
        'srcset': asset.srcset_data,
    }, status=201)


@require_POST
@staff_required_json
def dealer_delete(request):
    data = _json_body(request) or {}
    ident = data.get('id') or data.get('slug')
    if not ident:
        return JsonResponse({'error': 'An id or slug is required'}, status=400)
    qs = Dealer.objects.filter(id=ident) if str(ident).isdigit() \
        else Dealer.objects.filter(slug=ident)
    deleted, _ = qs.delete()
    return JsonResponse({'success': True, 'deleted': deleted})
