from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core import views, api

# Django is API-only: the React SPA (frontend/) renders every public page.
# This backend serves the Django admin, JSON APIs, and uploaded media.

urlpatterns = [
    # SEO
    path('robots.txt', views.robots_txt_view, name='robots_txt'),
    path('sitemap.xml', views.dynamic_sitemap_view, name='dynamic_sitemap'),

    # Django Admin Panel
    path('admin/', views.custom_admin_index_view, name='custom_admin_index'),
    path('admin/', admin.site.urls),
    path('tinymce/', include('tinymce.urls')),

    # Authentication (session-based, CSRF-protected)
    path('api/auth/me/', api.auth_me, name='auth_me'),
    path('api/auth/login/', api.auth_login, name='auth_login'),
    path('api/auth/logout/', api.auth_logout, name='auth_logout'),
    path('api/auth/signup/', api.auth_signup, name='auth_signup'),
    path('api/auth/password-reset/request/', api.password_reset_request, name='password_reset_request'),
    path('api/auth/password-reset/verify/', api.password_reset_verify, name='password_reset_verify'),
    path('api/auth/password-reset/confirm/', api.password_reset_confirm, name='password_reset_confirm'),

    # Setup Wizard API
    path('api/wizard/recommendation/', views.setup_wizard_recommendation, name='wizard_recommendation'),
    path('api/wizard/quote/', views.submit_quote_request, name='wizard_quote'),

    # Media Asset Optimization API
    path('api/assets/', views.asset_list_view, name='asset_list'),
    path('api/assets/<int:asset_id>/', views.asset_detail_view, name='asset_detail'),

    # CMS read APIs (public)
    path('api/blogs/', views.api_blog_posts, name='api_blogs'),
    path('api/products/', views.api_products, name='api_products'),
    path('api/dealers/', views.api_dealers, name='api_dealers'),
    path('api/events/', views.api_events, name='api_events'),
    path('api/gallery/', views.api_gallery, name='api_gallery'),
    path('api/site-contents/', views.api_site_contents, name='api_site_contents'),
    path('api/global-config/', views.api_global_config, name='api_global_config'),
    path('api/homepage-settings/', views.api_homepage_settings, name='api_homepage_settings'),

    # CMS write APIs (staff only)
    path('api/products/save/', api.product_save, name='api_product_save'),
    path('api/products/delete/', api.product_delete, name='api_product_delete'),
    path('api/upload/', api.upload_image, name='api_upload_image'),
    path('api/blogs/save/', api.blog_save, name='api_blog_save'),
    path('api/blogs/delete/', api.blog_delete, name='api_blog_delete'),
    path('api/events/save/', api.event_save, name='api_event_save'),
    path('api/events/delete/', api.event_delete, name='api_event_delete'),
    path('api/dealers/save/', api.dealer_save, name='api_dealer_save'),
    path('api/dealers/delete/', api.dealer_delete, name='api_dealer_delete'),
]

from django.urls import re_path
urlpatterns += [
    re_path(r'^(?!api|admin|media|static|assets|tinymce).*$', views.serve_react_app, name='serve_react_app'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# JSON error handlers
handler404 = 'core.views.custom_404_view'
handler500 = 'core.views.custom_500_view'
