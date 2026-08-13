from django.db.models.signals import post_save, post_delete
from django.contrib.auth.signals import user_login_failed, user_logged_in
from django.dispatch import receiver
from django.core.cache import cache
from django.contrib.auth import get_user_model
from .models import AuditLog, UserRoleProfile
from .middleware import get_current_user, get_current_request


User = get_user_model()


@receiver(post_save, sender=User)
def create_user_role_profile(sender, instance, created, **kwargs):
    if created:
        UserRoleProfile.objects.create(user=instance, role=None)


def get_client_ip(request):
    if not request:
        return None
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


@receiver(user_login_failed)
def track_failed_login(sender, credentials, request, **kwargs):
    ip = get_client_ip(request)
    username = credentials.get('username', 'unknown')
    
    # Log the failure
    AuditLog.objects.create(
        actor=None,
        action='LOGIN_FAILED',
        target_model=f"Username: {username}",
        ip_address=ip
    )
    
    if not ip:
        return
        
    # Track attempts
    lockout_key = f"lockout_ip:{ip}"
    attempts_key = f"attempts:{ip}"
    
    attempts = cache.get(attempts_key, 0) + 1
    cache.set(attempts_key, attempts, timeout=900)  # 15 minutes rolling window
    
    if attempts >= 5:
        # Lockout for 15 minutes
        cache.set(lockout_key, True, timeout=900)


@receiver(user_logged_in)
def track_successful_login(sender, user, request, **kwargs):
    ip = get_client_ip(request)
    
    # Log the success
    AuditLog.objects.create(
        actor=user,
        action='LOGIN_SUCCESS',
        target_model=f"User: {user.username}",
        ip_address=ip
    )
    
    # Clear attempts on success
    if ip:
        cache.delete(f"attempts:{ip}")
        cache.delete(f"lockout_ip:{ip}")


@receiver(post_save)
def log_model_create_or_update(sender, instance, created, **kwargs):
    # We don't want to log AuditLog creations (infinite loop)
    if sender == AuditLog:
        return
        
    # Also ignore session and log models to reduce noise, but let's stick to simple for now
    # Only log if there's an active web request (meaning an admin/user did it)
    user = get_current_user()
    request = get_current_request()
    
    # Optional: Only log if user is authenticated
    if not user or not user.is_authenticated:
        return
        
    ip = get_client_ip(request)
    action = 'CREATE' if created else 'UPDATE'
    target = f"{sender.__name__}:{instance.pk}"
    
    AuditLog.objects.create(
        actor=user,
        action=action,
        target_model=target,
        ip_address=ip
    )


@receiver(post_delete)
def log_model_delete(sender, instance, **kwargs):
    if sender == AuditLog:
        return
        
    user = get_current_user()
    request = get_current_request()
    
    if not user or not user.is_authenticated:
        return
        
    ip = get_client_ip(request)
    target = f"{sender.__name__}:{instance.pk}"
    
    AuditLog.objects.create(
        actor=user,
        action='DELETE',
        target_model=target,
        ip_address=ip
    )
