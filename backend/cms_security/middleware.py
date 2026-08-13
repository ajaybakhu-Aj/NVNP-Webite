import threading
from django.core.cache import cache
from django.http import HttpResponseForbidden


_thread_locals = threading.local()


def get_current_user():
    return getattr(_thread_locals, 'user', None)


def get_current_request():
    return getattr(_thread_locals, 'request', None)


class ThreadLocalUserMiddleware:
    """
    Middleware that stores the current user and request in thread local storage.
    This allows signals to access the active user without needing the request object.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        _thread_locals.user = getattr(request, 'user', None)
        _thread_locals.request = request
        
        response = self.get_response(request)
        
        # Clean up after request
        if hasattr(_thread_locals, 'user'):
            del _thread_locals.user
        if hasattr(_thread_locals, 'request'):
            del _thread_locals.request
            
        return response


class BruteForceProtectionMiddleware:
    """
    Middleware to block requests from IPs that have been locked out due to 
    excessive failed login attempts.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only enforce on login endpoints to minimize overhead, 
        # but for maximum security we can check globally if the IP is blocked.
        # The lock key is typically lockout:ip
        
        # Get IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
            
        # Check if this IP is globally locked out
        lockout_key = f"lockout_ip:{ip}"
        if cache.get(lockout_key):
            return HttpResponseForbidden("Access denied due to excessive failed login attempts. Please try again later.")
            
        return self.get_response(request)
