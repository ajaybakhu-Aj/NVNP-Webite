import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load a .env file next to manage.py if present (no external dependency).
# Real environment variables always win over .env values.
_env_file = BASE_DIR / '.env'
if _env_file.exists():
    for _line in _env_file.read_text().splitlines():
        _line = _line.strip()
        if _line and not _line.startswith('#') and '=' in _line:
            _key, _, _val = _line.partition('=')
            os.environ.setdefault(_key.strip(), _val.strip())

# SECURITY: set DJANGO_SECRET_KEY in the environment (or .env) for production.
SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-dev-only-key-do-not-use-in-production'
)

# SECURITY: defaults to False. Set DJANGO_DEBUG=true for local development.
DEBUG = os.environ.get('DJANGO_DEBUG', 'false').lower() in ('1', 'true', 'yes')

# Refuse to run in production with the known development key.
if not DEBUG and SECRET_KEY.startswith('django-insecure-'):
    from django.core.exceptions import ImproperlyConfigured
    raise ImproperlyConfigured(
        'DJANGO_SECRET_KEY must be set to a unique secret value when DEBUG is off.'
    )

ALLOWED_HOSTS = [h.strip() for h in os.environ.get(
    'DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1'
).split(',') if h.strip()]

# Origins allowed to POST with CSRF protection (the Vite dev server proxies
# /api but the browser still sends its own Origin header).
CSRF_TRUSTED_ORIGINS = [o.strip() for o in os.environ.get(
    'DJANGO_CSRF_TRUSTED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173,http://localhost:8000,http://127.0.0.1:8000'
).split(',') if o.strip()]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Required for Django redirects framework
    'django.contrib.sites',
    'django.contrib.redirects',
    
    # Custom SEO App
    'core.apps.CoreConfig',
    'tinymce',
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    
    # Enforces lowercase and strips www. prefix
    'core.middleware.SEOCanonicalMiddleware',
    
    # Enforces legacy WordPress redirect rules
    'core.middleware.LegacyRedirectMiddleware',
    
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',  # Handles APPEND_SLASH redirects
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    # Handles exact path redirects from the django.contrib.redirects DB table
    'core.middleware.ActiveRedirectFallbackMiddleware',
    
    # Enforces 403 Forbidden for unauthenticated /admin/ and /api/
    'core.middleware.SecurityRestrictionMiddleware',
    
    # Injects X-Robots-Tag noindex in staging
    'core.middleware.StagingRobotsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.seo_schema_processor',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database: explicit selection via DJANGO_DB_ENGINE ('sqlite' or 'postgres').
# No silent fallback — a misconfigured Postgres should fail loudly, not
# quietly switch to a different database.
if os.environ.get('DJANGO_DB_ENGINE', 'sqlite').lower() == 'postgres':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('POSTGRES_DB', 'nightvision_db'),
            'USER': os.environ.get('POSTGRES_USER', 'postgres'),
            'PASSWORD': os.environ['POSTGRES_PASSWORD'],
            'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),
            'PORT': os.environ.get('POSTGRES_PORT', '5432'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATICFILES_DIRS = []
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
WHITENOISE_ROOT = os.path.join(BASE_DIR, '..', 'frontend', 'dist')

# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Enforces trailing slash redirect on urls.py patterns cleanly
APPEND_SLASH = True

# ---------------------------------------------------------------------------
# Email (used for password reset OTPs).
# Defaults to the console backend so development works with no SMTP server;
# set DJANGO_EMAIL_BACKEND=smtp plus the SMTP variables in production.
# ---------------------------------------------------------------------------
if os.environ.get('DJANGO_EMAIL_BACKEND', 'console').lower() == 'smtp':
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = os.environ.get('EMAIL_HOST', 'localhost')
    EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
    EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'true').lower() in ('1', 'true', 'yes')
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

DEFAULT_FROM_EMAIL = os.environ.get('DJANGO_DEFAULT_FROM_EMAIL', 'no-reply@nightvision.com.np')

# ---------------------------------------------------------------------------
# Production security hardening. Applied whenever DEBUG is off so session and
# CSRF cookies never travel over plain HTTP. Individual toggles can be
# overridden via environment variables for unusual deployments.
# ---------------------------------------------------------------------------
if not DEBUG:
    SECURE_SSL_REDIRECT = os.environ.get('DJANGO_SECURE_SSL_REDIRECT', 'true').lower() in ('1', 'true', 'yes')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(os.environ.get('DJANGO_HSTS_SECONDS', '3600'))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = False
    SECURE_HSTS_PRELOAD = False
    # Set when Django sits behind a TLS-terminating reverse proxy (nginx etc.)
    if os.environ.get('DJANGO_BEHIND_PROXY', '').lower() in ('1', 'true', 'yes'):
        SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SESSION_COOKIE_HTTPONLY = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
X_FRAME_OPTIONS = 'DENY'

# TinyMCE Configuration
TINYMCE_DEFAULT_CONFIG = {
    'height': 360,
    'width': '100%',
    'menubar': 'file edit view insert format tools table help',
    'plugins': 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
    'toolbar': 'undo redo | code | formatselect | h1 h2 h3 | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
}

# Environment configuration
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'production')
