from django.shortcuts import render, get_object_or_404
from .models import Product, BlogPost, Category, Event, Dealer

# Django is API-only: the React SPA renders all public pages.
# The old server-rendered template views were removed; only the admin,
# JSON APIs, and legacy-redirect middleware remain.

import json
from django.http import JsonResponse
from .models import QuoteRequest


# JSON error handlers (this backend serves no HTML besides the admin)
def custom_404_view(request, exception=None):
    return JsonResponse({'error': 'Not found'}, status=404)

def custom_500_view(request):
    return JsonResponse({'error': 'Internal server error'}, status=500)


def setup_wizard_recommendation(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    try:
        data = json.loads(request.body)
        property_type = str(data.get('property_type', 'home')).lower()
        try:
            camera_quantity = int(data.get('camera_quantity', 4))
        except (ValueError, TypeError):
            camera_quantity = 4
        # Clamp to a sane range so negative/absurd values can't skew pricing.
        camera_quantity = max(1, min(camera_quantity, 64))
        coverage_type = str(data.get('coverage_type', 'both')).lower()
    except Exception as e:
        return JsonResponse({'error': 'Invalid request payload'}, status=400)

    # 1. Choose Camera Model & Price
    if property_type in ['warehouse', 'shop']:
        # Upgrade to industrial/AI grade
        dome_model = "NightVision Dome AI Pro (4MP)"
        dome_unit_price = 6000
        bullet_model = "NightVision Industrial AI Bullet (4MP)"
        bullet_unit_price = 7500
    else:
        dome_model = "NightVision Dome Pro V2 (2MP)"
        dome_unit_price = 4500
        bullet_model = "NightVision Trishul Bullet Pro (2MP)"
        bullet_unit_price = 5500

    if coverage_type == 'indoor':
        camera_items = [{
            'name': dome_model,
            'qty': camera_quantity,
            'unit_price': dome_unit_price,
            'total_price': camera_quantity * dome_unit_price,
            'type': 'Camera'
        }]
    elif coverage_type == 'outdoor':
        camera_items = [{
            'name': bullet_model,
            'qty': camera_quantity,
            'unit_price': bullet_unit_price,
            'total_price': camera_quantity * bullet_unit_price,
            'type': 'Camera'
        }]
    else: # 'both'
        dome_qty = camera_quantity // 2
        bullet_qty = camera_quantity - dome_qty
        camera_items = []
        if dome_qty > 0:
            camera_items.append({
                'name': dome_model,
                'qty': dome_qty,
                'unit_price': dome_unit_price,
                'total_price': dome_qty * dome_unit_price,
                'type': 'Camera'
            })
        if bullet_qty > 0:
            camera_items.append({
                'name': bullet_model,
                'qty': bullet_qty,
                'unit_price': bullet_unit_price,
                'total_price': bullet_qty * bullet_unit_price,
                'type': 'Camera'
            })

    # 2. Control Unit (NVR)
    if camera_quantity <= 4:
        nvr_model = "NightVision 4-Channel PoE NVR Hub"
        nvr_price = 12000
    elif camera_quantity <= 8:
        nvr_model = "NightVision 8-Channel PoE NVR Hub"
        nvr_price = 18000
    else:
        nvr_model = "NightVision 16-Channel Enterprise NVR Array"
        nvr_price = 35000

    control_unit = {
        'name': nvr_model,
        'qty': 1,
        'unit_price': nvr_price,
        'total_price': nvr_price,
        'type': 'Control Unit'
    }

    # 3. Connectivity
    if camera_quantity <= 4:
        conn_model = "Standard PoE Injector & Cat6 Cabling Kit"
        conn_price = 3500
    elif camera_quantity <= 8:
        conn_model = "8-Port PoE Gigabit Switch & Core Cat6 Cabling Kit"
        conn_price = 7500
    else:
        conn_model = "16-Port Managed PoE Switch & Fiber Uplink Kit"
        conn_price = 18000

    connectivity = {
        'name': conn_model,
        'qty': 1,
        'unit_price': conn_price,
        'total_price': conn_price,
        'type': 'Connectivity'
    }

    # 4. Accessories (Storage & Accessories)
    if camera_quantity <= 4:
        storage_model = "1TB Seagate Surveillance Hard Drive"
        storage_price = 6500
    elif camera_quantity <= 8:
        storage_model = "2TB Western Digital Purple Surveillance Drive"
        storage_price = 9500
    else:
        storage_model = "4TB Western Digital Purple Enterprise Drive"
        storage_price = 15000

    storage = {
        'name': storage_model,
        'qty': 1,
        'unit_price': storage_price,
        'total_price': storage_price,
        'type': 'Storage'
    }

    misc_accessories = {
        'name': "Weatherproof Junction Boxes, RJ45 Connectors & Power Units",
        'qty': 1,
        'unit_price': 2500,
        'total_price': 2500,
        'type': 'Accessories'
    }

    # Combine items
    items = camera_items + [control_unit, connectivity, storage, misc_accessories]
    subtotal = sum(item['total_price'] for item in items)
    tax = int(subtotal * 0.13)  # 13% VAT in Nepal
    total = subtotal + tax

    recommendation = {
        'property_type': property_type,
        'camera_quantity': camera_quantity,
        'coverage_type': coverage_type,
        'items': items,
        'subtotal': subtotal,
        'tax': tax,
        'total': total,
        'currency': 'NPR'
    }

    return JsonResponse(recommendation)


def submit_quote_request(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)

    from core.api import _rate_limited, _rate_limit_response
    if _rate_limited(request, 'quote', limit=5, window_seconds=3600):
        return _rate_limit_response()

    try:
        data = json.loads(request.body)
    except (ValueError, TypeError):
        return JsonResponse({'error': 'Invalid request payload'}, status=400)
    if not isinstance(data, dict):
        return JsonResponse({'error': 'Invalid request payload'}, status=400)

    # 1. Honeypot Validation
    if data.get('website_url'):
        # If the hidden honeypot field is filled, silently reject it as spam
        return JsonResponse({'error': 'Invalid submission payload'}, status=400)

    # 2. reCAPTCHA v3 Validation
    recaptcha_token = data.get('recaptcha_token')
    if not recaptcha_token:
        # In a strict production environment, this should return a 400 error.
        # But if it's missing, let's at least log it. We will reject it.
        return JsonResponse({'error': 'reCAPTCHA verification failed.'}, status=400)

    import urllib.request
    import urllib.parse
    recaptcha_secret = getattr(settings, 'RECAPTCHA_SECRET_KEY', 'dummy_secret')
    
    if recaptcha_secret != 'dummy_secret':
        verify_url = 'https://www.google.com/recaptcha/api/siteverify'
        payload = urllib.parse.urlencode({'secret': recaptcha_secret, 'response': recaptcha_token}).encode('utf-8')
        try:
            req = urllib.request.Request(verify_url, data=payload)
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode())
            if not result.get('success'):
                return JsonResponse({'error': 'reCAPTCHA verification failed.'}, status=400)
            
            # Optional: Check score for v3
            score = result.get('score', 0)
            if score < 0.5:
                return JsonResponse({'error': 'reCAPTCHA score too low.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'reCAPTCHA verification error.'}, status=500)

    client_name = str(data.get('client_name') or '').strip()[:100]
    client_phone = str(data.get('client_phone') or '').strip()[:20]
    client_email = str(data.get('client_email') or '').strip()[:254]
    if not client_name or not client_phone:
        return JsonResponse({'error': 'Name and phone number are required'}, status=400)
    if client_email and '@' not in client_email:
        return JsonResponse({'error': 'Invalid email address'}, status=400)

    recommended_package = data.get('recommended_package')
    if not isinstance(recommended_package, dict):
        recommended_package = {}

    try:
        quote = QuoteRequest.objects.create(
            property_type=str(data.get('property_type') or '')[:50],
            camera_quantity=str(data.get('camera_quantity') or '')[:20],
            coverage_type=str(data.get('coverage_type') or '')[:50],
            client_name=client_name,
            client_phone=client_phone,
            client_email=client_email,
            additional_notes=str(data.get('additional_notes') or '')[:2000],
            recommended_package=recommended_package,
        )
        quote_id = quote.id
    except Exception as db_err:
        # Log server-side only; never echo internals back to the client.
        print(f"Database error writing quote: {db_err}")
        return JsonResponse({'error': 'Could not save your request. Please try again later.'},
                            status=500)

    return JsonResponse({
        'success': True,
        'message': 'Quote request generated and logged successfully.',
        'quote_id': quote_id
    })


from .models import MediaAsset

def asset_detail_view(request, asset_id):
    asset = get_object_or_404(MediaAsset, id=asset_id)
    return JsonResponse({
        'id': asset.id,
        'title': asset.title,
        'file': asset.file.url if asset.file else '',
        'alt_text': asset.alt_text,
        'is_header': asset.is_header,
        'srcset_data': asset.srcset_data
    })

def asset_list_view(request):
    assets = MediaAsset.objects.all()
    data = [{
        'id': a.id,
        'title': a.title,
        'file': a.file.url if a.file else '',
        'alt_text': a.alt_text,
        'is_header': a.is_header,
        'srcset_data': a.srcset_data
    } for a in assets]
    return JsonResponse(data, safe=False)


from django.contrib.admin.views.decorators import staff_member_required
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import SiteSetting
# from .seed_data import SEED_PRODUCTS_RAW, SEED_BLOGS_RAW, SEED_EVENTS_RAW, SEED_DEALERS_RAW, SEED_SITE_CONTENTS_RAW, SEED_SETTINGS_RAW

def sync_existing_media_files():
    import os
    from django.conf import settings
    from .models import MediaAsset
    
    media_root = settings.MEDIA_ROOT
    if not os.path.exists(media_root):
        return
        
    supported_extensions = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg')
    
    # Get all relative paths of existing MediaAssets
    existing_paths = set(MediaAsset.objects.values_list('file', flat=True))
    
    new_assets = []
    
    # We will search the media directory for all image files
    for root, dirs, files in os.walk(media_root):
        for file in files:
            # Skip responsive variants
            if any(file.endswith(suffix) for suffix in ['-400w.webp', '-800w.webp', '-1200w.webp']):
                continue
                
            ext = os.path.splitext(file)[1].lower()
            if ext in supported_extensions:
                full_path = os.path.join(root, file)
                # Compute path relative to MEDIA_ROOT
                rel_path = os.path.relpath(full_path, media_root).replace('\\', '/')
                
                if rel_path not in existing_paths:
                    filename_no_ext = os.path.splitext(file)[0]
                    title = filename_no_ext.replace('-', ' ').replace('_', ' ').title()
                    alt_text = f"NightVision Security System Asset - {title}"
                    
                    new_assets.append(MediaAsset(
                        title=title,
                        file=rel_path,
                        alt_text=alt_text,
                        is_header='header' in rel_path.lower() or 'hero' in rel_path.lower(),
                    ))
                    existing_paths.add(rel_path)
                    
    if new_assets:
        MediaAsset.objects.bulk_create(new_assets)


def _is_safe_remote_url(url):
    """SSRF guard: only allow http(s) URLs that resolve to public IPs."""
    import socket
    import ipaddress
    import urllib.parse

    parsed = urllib.parse.urlparse(url)
    if parsed.scheme not in ('http', 'https') or not parsed.hostname:
        return False
    try:
        infos = socket.getaddrinfo(parsed.hostname, None)
    except socket.gaierror:
        return False
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if (ip.is_private or ip.is_loopback or ip.is_link_local
                or ip.is_reserved or ip.is_multicast or ip.is_unspecified):
            return False
    return True


def download_and_register_remote_images():
    import os
    import re
    import json
    import urllib.request
    import urllib.parse
    from django.core.files.base import ContentFile
    from django.utils.text import slugify
    from core.models import Product, BlogPost, Event, SiteSetting, MediaAsset

    def download_image(url, title_hint):
        if not url or not url.startswith(('http://', 'https://')):
            return None
        if not _is_safe_remote_url(url):
            print(f"Skipping unsafe or unresolvable URL: {url}")
            return None

        parsed_url = urllib.parse.urlparse(url)
        path_slug = slugify(os.path.basename(parsed_url.path))
        if not path_slug:
            path_slug = slugify(parsed_url.query)[:50]
        if not path_slug:
            path_slug = "downloaded-asset"
            
        # Check if an asset with this title already exists to avoid redundant downloads
        asset = MediaAsset.objects.filter(title=title_hint).first()
        if asset:
            return asset
            
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read()
                
            filename = f"{path_slug}.jpg"
            content_file = ContentFile(content, name=filename)
            
            asset = MediaAsset.objects.create(
                title=title_hint,
                file=content_file,
                alt_text=f"{title_hint} - Security System Media",
                is_header=False
            )
            return asset
        except Exception as e:
            print(f"Error downloading {url}: {e}")
            return None

    # 1. Scan Products
    for p in Product.objects.all():
        specs = p.technical_specifications or {}
        img_url = specs.get('img', '')
        if img_url and img_url.startswith('http'):
            asset = download_image(img_url, f"Product: {p.name}")
            if asset:
                p.image = asset.file
                specs['img'] = asset.file.url
                p.technical_specifications = specs
                p.save()
                
        thumbs = specs.get('thumbs', [])
        new_thumbs = []
        changed = False
        for idx, thumb_url in enumerate(thumbs):
            if thumb_url and thumb_url.startswith('http'):
                asset = download_image(thumb_url, f"Product Thumbnail {idx+1}: {p.name}")
                if asset:
                    new_thumbs.append(asset.file.url)
                    changed = True
                else:
                    new_thumbs.append(thumb_url)
            else:
                new_thumbs.append(thumb_url)
        if changed:
            specs['thumbs'] = new_thumbs
            p.technical_specifications = specs
            p.save()

    # 2. Scan BlogPosts
    for b in BlogPost.objects.all():
        try:
            if b.schema_override:
                extra = json.loads(b.schema_override)
                if isinstance(extra, dict) and 'image' in extra:
                    img_url = extra['image']
                    if img_url and img_url.startswith('http'):
                        asset = download_image(img_url, f"Blog: {b.title}")
                        if asset:
                            extra['image'] = asset.file.url
                            b.schema_override = json.dumps(extra)
                            b.save()
        except Exception as e:
            print(f"Error processing blog schema image: {e}")
            
        markdown_images = re.findall(r'!\[.*?\]\((https?://.*?)\)', b.content)
        if markdown_images:
            content_updated = b.content
            for idx, url in enumerate(markdown_images):
                asset = download_image(url, f"Blog Content Image {idx+1}: {b.title}")
                if asset:
                    content_updated = content_updated.replace(url, asset.file.url)
            if content_updated != b.content:
                b.content = content_updated
                b.save()

    # 3. Scan Events
    for e in Event.objects.all():
        try:
            if e.schema_override:
                extra = json.loads(e.schema_override)
                if isinstance(extra, dict) and 'image' in extra:
                    img_url = extra['image']
                    if img_url and img_url.startswith('http'):
                        asset = download_image(img_url, f"Event: {e.title}")
                        if asset:
                            extra['image'] = asset.file.url
                            e.schema_override = json.dumps(extra)
                            e.save()
        except Exception as err:
            print(f"Error processing event schema image: {err}")


def ensure_seeded():
    """Seed initial CMS content if the database is empty.

    Only cheap, count-guarded DB seeding lives here. Media-directory scanning
    and remote image downloads moved to the `seed_content` management command —
    they must never run as a side effect of serving a request.
    """
    User = get_user_model()
    admin_user = User.objects.filter(is_superuser=True).first()
    if not admin_user:
        admin_user = User.objects.first()

    # 1. Categories
    categories = [
        "Wireless CCTV Cameras", "IP CCTV Cameras", "Network Video Recoder (NVR)",
        "POE Switch", "Hard Disk", "SD Card", "Buying Guide", "Brand Guide",
        "Maintenance", "Tech Report", "Infrastructure", "Hardware", "Case Studies",
        "Engineering"
    ]
    for cat_name in categories:
        slug = slugify(cat_name)
        Category.objects.get_or_create(name=cat_name, defaults={'slug': slug})

    # 2. Products
    if Product.objects.count() == 0:
        for p in SEED_PRODUCTS_RAW:
            cat_obj = Category.objects.filter(name=p['category']).first()
            tech_specs = {
                'code': p.get('code', ''),
                'productType': p.get('productType', ''),
                'cameraMp': p.get('cameraMp', ''),
                'tags': p.get('tags', []),
                'badge': p.get('badge', ''),
                'longDesc': p.get('longDesc', ''),
                'bodySectionLabel': p.get('bodySectionLabel', ''),
                'bodySectionTitle': p.get('bodySectionTitle', ''),
                'guidePdf': p.get('guidePdf', ''),
                'img': p.get('img', ''),
                'thumbs': p.get('thumbs', []),
                'colors': p.get('colors', []),
                'specs': p.get('specs', []),
                'specTable': p.get('specTable', [])
            }
            Product.objects.create(
                name=p['name'],
                slug=p['slug'],
                category=cat_obj,
                price=p['price'],
                stock_status='in_stock',
                technical_specifications=tech_specs,
                description=p.get('description', '')
            )

    # 3. BlogPosts
    if BlogPost.objects.count() == 0:
        for b in SEED_BLOGS_RAW:
            cat_obj = Category.objects.filter(name=b.get('tag')).first()
            if not cat_obj and b.get('tag'):
                cat_obj, _ = Category.objects.get_or_create(name=b['tag'], defaults={'slug': slugify(b['tag'])})
            
            content_str = "\n\n".join(b.get('content', [])) if isinstance(b.get('content'), list) else b.get('content', '')
            
            BlogPost.objects.create(
                title=b['title'],
                slug=b['slug'],
                author=admin_user,
                category=cat_obj,
                content=content_str,
                meta_description=b.get('excerpt', '')[:160],
                date_published=timezone.now(),
                schema_override=json.dumps({"image": b.get('img', '')})
            )

    # 4. Events
    if Event.objects.count() == 0:
        for e in SEED_EVENTS_RAW:
            content_str = "\n\n".join(e.get('content', [])) if isinstance(e.get('content'), list) else e.get('content', '')
            Event.objects.create(
                title=e['title'],
                slug=e['slug'],
                description=content_str,
                start_date=timezone.now(),
                location=e.get('location', 'Kathmandu, Nepal')
            )

    # 5. Dealers
    if Dealer.objects.count() == 0:
        for d in SEED_DEALERS_RAW:
            loc = d.get('location', '')
            province = "Bagmati Province"
            for prov in ["koshi", "madhesh", "bagmati", "gandaki", "lumbini", "karnali", "sudurpashchim"]:
                if prov in loc.lower():
                    province = prov.capitalize() + " Province"
                    break
            
            name = d.get('companyName') or d.get('name') or "Dealer"
            Dealer.objects.create(
                name=name,
                slug=slugify(name),
                province=province,
                district="Kathmandu",
                address=loc,
                phone_number=d.get('phone', ''),
                email=d.get('email', '')
            )

    # 6. SiteSettings & SiteContents
    if SiteSetting.objects.filter(key='site_contents').count() == 0:
        SiteSetting.objects.create(key='site_contents', value=SEED_SITE_CONTENTS_RAW)

    if SiteSetting.objects.filter(key='global_config').count() == 0:
        SiteSetting.objects.create(key='global_config', value=SEED_SETTINGS_RAW)

@staff_member_required
def custom_admin_index_view(request):
    # ensure_seeded()
    products = Product.objects.all()
    posts = BlogPost.objects.all()
    dealers = Dealer.objects.all()
    events = Event.objects.all()
    assets = MediaAsset.objects.all()
    site_settings = SiteSetting.objects.all()
    
    stats = {
        'total_products': products.count(),
        'total_posts': posts.count(),
        'total_dealers': dealers.count(),
        'total_events': events.count(),
        'total_assets': assets.count(),
    }
    
    context = {
        'products': products,
        'posts': posts,
        'dealers': dealers,
        'events': events,
        'assets': assets,
        'site_settings': site_settings,
        'stats': stats,
        'title': 'NightVision Security Terminal',
    }
    from django.contrib import admin
    context.update(admin.site.each_context(request))
    return render(request, 'admin/index.html', context)

def api_blog_posts(request):
    posts = BlogPost.objects.all().order_by('-date_published')
    data = []
    for p in posts:
        img = "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
        try:
            if p.schema_override:
                extra = json.loads(p.schema_override)
                if 'image' in extra:
                    img = extra['image']
        except Exception:
            pass
        
        data.append({
            'id': p.id,
            'tag': p.category.name if p.category else 'Security',
            'date': p.date_published.strftime("%b %d, %Y"),
            'author': p.author.username if p.author else 'Admin',
            'slug': p.slug,
            'title': p.title,
            'excerpt': p.meta_description or p.content[:160],
            'img': img,
            'content': p.content.split('\n\n')
        })
    return JsonResponse(data, safe=False)

def api_products(request):
    products = Product.objects.all()
    data = []
    for p in products:
        prod_data = {
            'id': p.slug,
            'name': p.name,
            'price': float(p.price),
            'discount': float(p.discount),
            'status': p.get_stock_status_display().upper(),
            'description': p.description,
            'category': p.category.name if p.category else '',
            'slug': p.slug,
        }
        if isinstance(p.technical_specifications, dict):
            prod_data.update(p.technical_specifications)
        if p.image:
            prod_data['img'] = p.image.url
        data.append(prod_data)
    return JsonResponse(data, safe=False)

def api_dealers(request):
    dealers = Dealer.objects.all()
    data = []
    for d in dealers:
        extra = {}
        try:
            if d.schema_override:
                extra = json.loads(d.schema_override)
                if not isinstance(extra, dict):
                    extra = {}
        except Exception:
            pass
        data.append({
            'id': d.slug,
            'companyName': d.name,
            'businessType': extra.get('businessType') or 'Authorized Integrator',
            'contactName': extra.get('contactName') or 'Representative',
            'email': d.email,
            'location': d.address,
            'phone': d.phone_number,
            'status': extra.get('status') or 'AUTHORIZED',
            'isPlatinum': extra.get('isPlatinum') if extra.get('isPlatinum') is not None
                          else d.province == 'Bagmati Province',
            'mapUrl': extra.get('mapUrl') or f'https://maps.google.com/?q={d.address}',
            'brief': extra.get('brief') or
                     f'Serving customers in {d.province} with standard security and support services.',
            'date': extra.get('date') or ''
        })
    return JsonResponse(data, safe=False)

def api_events(request):
    events = Event.objects.all()
    data = []
    for e in events:
        extra = {}
        try:
            if e.schema_override:
                extra = json.loads(e.schema_override)
                if not isinstance(extra, dict):
                    extra = {}
        except Exception:
            pass
        data.append({
            'id': e.id,
            'slug': e.slug,
            'type': extra.get('type') or ('event' if 'summit' in e.title.lower() or 'test' in e.title.lower() else 'news'),
            'title': e.title,
            'date': e.start_date.strftime("%B %d, %Y"),
            'location': e.location,
            'tag': extra.get('tag') or ('FIELD OPERATIONS' if 'test' in e.title.lower() else 'SUMMIT EXPO'),
            'image': extra.get('image') or 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
            'excerpt': e.description[:160] if e.description else '',
            'content': e.description.split('\n\n') if e.description else [],
            'metaDetails': [
                {'label': 'Location', 'value': e.location},
                {'label': 'Start Time', 'value': e.start_date.strftime("%H:%M")}
            ]
        })
    return JsonResponse(data, safe=False)

def api_gallery(request):
    from .models import GalleryItem
    items = GalleryItem.objects.all().order_by('-id')
    data = []
    for i in items:
        data.append({
            'id': i.id,
            'title': i.title,
            'category': i.category,
            'model_name': i.model_name,
            'location': i.location,
            'resolution': i.resolution,
            'status': i.status,
            'description': i.description,
            'img': i.image.url if i.image else "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"
        })
    return JsonResponse(data, safe=False)

def api_site_contents(request):
    setting = SiteSetting.objects.filter(key='site_contents').first()
    if request.method == 'POST':
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'error': 'Staff authentication required'}, status=403)
        try:
            data = json.loads(request.body)
            if setting:
                setting.value = data
                setting.save()
            else:
                setting = SiteSetting.objects.create(key='site_contents', value=data)
            return JsonResponse({'success': True, 'data': setting.value})
        except Exception:
            return JsonResponse({'success': False, 'error': 'Invalid JSON payload'}, status=400)
    
    val = setting.value if setting else {}
    return JsonResponse(val)

def api_global_config(request):
    setting = SiteSetting.objects.filter(key='global_config').first()
    if request.method == 'POST':
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'error': 'Staff authentication required'}, status=403)
        try:
            data = json.loads(request.body)
            if setting:
                setting.value = data
                setting.save()
            else:
                setting = SiteSetting.objects.create(key='global_config', value=data)
            return JsonResponse({'success': True, 'data': setting.value})
        except Exception:
            return JsonResponse({'success': False, 'error': 'Invalid JSON payload'}, status=400)
    
    val = setting.value if setting else {}
    return JsonResponse(val)


def api_homepage_settings(request):
    setting = SiteSetting.objects.filter(key='homepage_settings').first()
    if request.method in ('POST', 'PUT'):
        if not (request.user.is_authenticated and request.user.is_staff):
            return JsonResponse({'error': 'Staff authentication required'}, status=403)
        try:
            data = json.loads(request.body)
            if not isinstance(data, dict):
                return JsonResponse({'error': 'Invalid format, expected JSON object'}, status=400)
            
            # Simple validation on sections
            for key in ['hero', 'about', 'features', 'cta']:
                if key in data and not isinstance(data[key], dict):
                    return JsonResponse({'error': f'Section {key} must be an object'}, status=400)

            if setting:
                setting.value = data
                setting.save()
            else:
                setting = SiteSetting.objects.create(key='homepage_settings', value=data)
            return JsonResponse({'success': True, 'data': setting.value})
        except Exception:
            return JsonResponse({'success': False, 'error': 'Invalid JSON payload'}, status=400)
            
    if not setting:
        # Create a default seed setting if not found
        default_val = {
            "hero": {
                "heading": "ADVANCED SURVEILLANCE FOR PEACE OF MIND",
                "subheading": "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response.",
                "body_text": "Highly secured application and hardware for absolute privacy.",
                "button_text": "VIEW OUR PRODUCTS",
                "button_url": "/products",
                "image_url": "/hero_pointing_cctv.png"
            },
            "about": {
                "heading": "UNCOMPROMISING VIGILANCE TECHNOLOGY",
                "subheading": "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.",
                "body_text": "Weatherproof IP67 rated, Zero Downtime, Global Link, and Smart AI detection.",
                "button_text": "ABOUT US",
                "button_url": "/company/about",
                "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
            },
            "features": {
                "heading": "NV NightVision Features",
                "subheading": "Advanced and Reliable Security Solutions to meet increasing demands.",
                "body_text": "Easy Installation, Advanced Features, Durable, Secured.",
                "button_text": "Our Products",
                "button_url": "/products",
                "image_url": ""
            },
            "cta": {
                "heading": "READY FOR THE DARK?",
                "subheading": "Join the growing network of organizations and professionals who trust NIGHTVISION™.",
                "body_text": "We provide the gear, the training, and the authority to become a partner.",
                "button_text": "BECOME A PARTNER",
                "button_url": "/dealers",
                "image_url": ""
            }
        }
        setting = SiteSetting.objects.create(key='homepage_settings', value=default_val)
        
    return JsonResponse(setting.value)


import os
from django.conf import settings
from django.http import HttpResponse

def serve_react_app(request):
    """
    Serves the React SPA with dynamic server-side injected SEO tags.
    In DEBUG mode, bridges to Vite on port 5174.
    In Production, serves the built dist/index.html.
    """
    if settings.DEBUG:
        index_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'index.html')
    else:
        index_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'dist', 'index.html')

    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            html = f.read()
    except FileNotFoundError:
        return HttpResponse(f"React frontend not found at {index_path}. Have you built the project?", status=500)

    # Route mapping for SEO
    path = request.path
    
    # Default SEO
    meta_title = "NightVision - Advanced surveillance for peace of mind"
    meta_desc = "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response in Nepal."
    
    valid_route = False
    
    if path == '/' or path == '':
        meta_title = "NightVision - Advanced surveillance for peace of mind"
        valid_route = True
    elif path.startswith('/products') or path.startswith('/product'):
        meta_title = "Explore Security Products - NightVision Nepal"
        meta_desc = "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance."
        valid_route = True
    elif path.startswith('/about') or path.startswith('/company'):
        meta_title = "About Us - NightVision Surveillance"
        meta_desc = "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and operational reliability."
        valid_route = True
    elif path.startswith('/contact'):
        meta_title = "Contact Us - NightVision Specialists"
        meta_desc = "Get in touch with NightVision surveillance experts in Nepal for custom security consultations, quotes, and product support."
        valid_route = True
    elif path.startswith('/dealership') or path.startswith('/apply-dealers') or path.startswith('/dealers'):
        meta_title = "Dealers & Partners - NightVision Network"
        meta_desc = "Find authorized NightVision dealers across Nepal or apply to become an official partner."
        valid_route = True
    elif path.startswith('/support') or path.startswith('/warranty'):
        meta_title = "Technical Support & Warranty - NightVision"
        meta_desc = "Access manuals, software downloads, and contact our 24/7 technical surveillance support helpline."
        valid_route = True
    elif path.startswith('/blog') or path.startswith('/events'):
        meta_title = "Security Intelligence Blog & Events - NightVision"
        meta_desc = "Read latest updates, security tutorials, threat reports, and CCTV guides from NightVision experts."
        valid_route = True
    elif path.startswith('/cctv-setup') or path.startswith('/login') or path.startswith('/admin-login'):
        valid_route = True

    # Replace generic tags in HTML string
    html = html.replace('<title>NV // NIGHTVISION™</title>', f'<title>{meta_title}</title>')
    
    # Inject meta description
    desc_tag = f'<meta name="description" content="{meta_desc}" />'
    if '<meta name="description"' in html:
        import re
        html = re.sub(r'<meta name="description"[^>]*>', desc_tag, html)
    else:
        html = html.replace('</head>', f'  {desc_tag}\n  </head>')

    if settings.DEBUG:
        # Bridge to Vite for dev mode HMR
        html = html.replace('src="/src/main.jsx"', 'src="http://localhost:5173/src/main.jsx"')
        html = html.replace('href="/favicon', 'href="http://localhost:5173/favicon')
        
        # Inject Vite client
        vite_client = '<script type="module" src="http://localhost:5173/@vite/client"></script>'
        html = html.replace('<head>', f'<head>\n    {vite_client}')

    response = HttpResponse(html)
    if not valid_route:
        response.status_code = 404
    return response


from django.views.decorators.cache import cache_page
from .models import RobotsTxtConfig, Product, BlogPost, Dealer

def robots_txt_view(request):
    config = RobotsTxtConfig.load()
    return HttpResponse(config.content, content_type="text/plain")

@cache_page(300) # 5 minutes cache
def dynamic_sitemap_view(request):
    from django.core.paginator import Paginator
    from django.utils.dateformat import format
    
    # Collect URLs
    urls = []
    base_url = f"{request.scheme}://{request.get_host()}"
    
    # Products
    for product in Product.objects.filter(no_index=False):
        url_data = {'loc': f"{base_url}/products/{product.slug}", 'images': []}
        if product.image:
            url_data['images'].append(f"{base_url}/media/{product.image}")
        urls.append(url_data)
        
    # Blog Posts
    for post in BlogPost.objects.filter(no_index=False):
        urls.append({'loc': f"{base_url}/blog/{post.slug}", 'images': []})
        
    # Dealers
    for dealer in Dealer.objects.filter(is_active=True, no_index=False):
        urls.append({'loc': f"{base_url}/dealers", 'images': []})
        
    # Paginator: 500 URLs per partition
    paginator = Paginator(urls, 500)
    page_number = request.GET.get('p', 1)
    page_obj = paginator.get_page(page_number)
    
    # Render XML
    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">')
    
    for item in page_obj:
        xml.append('  <url>')
        xml.append(f"    <loc>{item['loc']}</loc>")
        for img in item.get('images', []):
            xml.append('    <image:image>')
            xml.append(f"      <image:loc>{img}</image:loc>")
            xml.append('    </image:image>')
        xml.append('  </url>')
        
    xml.append('</urlset>')
    
    return HttpResponse("\n".join(xml), content_type="application/xml")

