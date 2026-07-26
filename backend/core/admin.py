from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django.db import models
from django import forms
from tinymce.widgets import TinyMCE
from .models import Category, Product, BlogPost, Event, Dealer, QuoteRequest, MediaAsset, SiteSetting, RobotsTxtConfig, GalleryItem

class SEOAdminMixin(admin.ModelAdmin):
    """
    Mixin to apply collapsible SEO settings, Live SERP, 
    and Social Share previews in the Django Admin.
    """
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }
    
    # Render the custom reactive preview container
    readonly_fields = ('seo_preview_panel',)

    def seo_preview_panel(self, obj):
        return mark_safe('''
            <div id="seo-preview-wrapper" style="margin-top: 15px; padding: 20px; border: 1px solid #ccc; border-radius: 6px; background: #fafafa; color: #333;">
                
                <!-- Google SERP Snippet Preview -->
                <h4 style="margin-top: 0; color: #1a0dab; border-bottom: 1px solid #eee; padding-bottom: 5px;">Google SERP Snippet Preview</h4>
                <div id="serp-preview" style="font-family: Arial, sans-serif; max-width: 600px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 25px; background: #fff;">
                    <div id="serp-title" style="color: #1a0dab; font-size: 20px; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 4px;">Preview Title</div>
                    <div id="serp-url" style="color: #006621; font-size: 14px; line-height: 1.3; margin-bottom: 4px;">https://yourdomain.com/...</div>
                    <div id="serp-desc" style="color: #545454; font-size: 14px; line-height: 1.4; word-wrap: break-word;">Please write a meta description to see how this page will look in search engines.</div>
                </div>

                <!-- Open Graph Social Share Preview (Facebook / LinkedIn) -->
                <h4 style="color: #3b5998; border-bottom: 1px solid #eee; padding-bottom: 5px;">Open Graph Social Share Preview</h4>
                <div id="og-preview" style="font-family: Helvetica, Arial, sans-serif; max-width: 524px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background: #f2f3f5; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div id="og-image-preview" style="height: 274px; background: #e9ebee; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #90949c; font-size: 14px;">
                        <span>No Social Image Selected</span>
                    </div>
                    <div style="padding: 12px; background: #fff; border-top: 1px solid #e1e2e3;">
                        <div id="og-domain" style="color: #606770; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">YOURDOMAIN.COM</div>
                        <div id="og-title-preview" style="color: #1d2129; font-size: 16px; font-weight: 600; line-height: 20px; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Preview Social Title</div>
                        <div id="og-desc-preview" style="color: #606770; font-size: 14px; line-height: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Preview Social description.</div>
                    </div>
                </div>
            </div>
        ''')
    seo_preview_panel.short_description = "SEO & Social Live Previews"

    # Collapsible Grouping
    seo_fieldset = (
        _('SEO Management'), 
        {
            'classes': ('collapse',),
            'fields': (
                'seo_title', 'meta_description', 'focus_keyword', 'canonical_url',
                'no_index', 'no_follow', 'og_title', 'og_description', 'og_image',
                'schema_override', 'seo_preview_panel'
            )
        }
    )

    class Media:
        js = ('admin/js/seo_preview.js',)
        css = {
            'all': ('admin/css/seo_preview.css',)
        }


@admin.register(Category)
class CategoryAdmin(SEOAdminMixin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'description')
        }),
        SEOAdminMixin.seo_fieldset,
    )


class ProductAdminForm(forms.ModelForm):
    long_desc = forms.CharField(
        widget=TinyMCE(),
        required=False,
        label="Detailed Content (JSON longDesc)",
        help_text="This rich text will be saved into the 'longDesc' property of technical specifications."
    )

    class Meta:
        model = Product
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            specs = self.instance.technical_specifications
            if isinstance(specs, dict):
                self.fields['long_desc'].initial = specs.get('longDesc', '')

    def save(self, commit=True):
        instance = super().save(commit=False)
        specs = instance.technical_specifications
        if not isinstance(specs, dict):
            specs = {}
        
        long_desc = self.cleaned_data.get('long_desc', '')
        if long_desc:
            specs['longDesc'] = long_desc
        elif 'longDesc' in specs:
            del specs['longDesc']
            
        instance.technical_specifications = specs
        if commit:
            instance.save()
        return instance

@admin.register(Product)
class ProductAdmin(SEOAdminMixin):
    form = ProductAdminForm
    list_display = ('image_preview', 'name', 'price', 'stock_status')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'category', 'image', 'price', 'discount', 'stock_status', 'long_desc', 'technical_specifications', 'faq_builder', 'description')
        }),
        SEOAdminMixin.seo_fieldset,
    )

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" style="max-height: 40px; border-radius: 4px;" />')
        return _("No Image")
    image_preview.short_description = _("Preview")


@admin.register(BlogPost)
class BlogPostAdmin(SEOAdminMixin):
    list_display = ('title', 'author', 'date_published')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'author', 'category', 'content', 'date_published')
        }),
        SEOAdminMixin.seo_fieldset,
    )


@admin.register(Event)
class EventAdmin(SEOAdminMixin):
    list_display = ('title', 'start_date', 'location')
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'description', 'start_date', 'end_date', 'location')
        }),
        SEOAdminMixin.seo_fieldset,
    )


@admin.register(Dealer)
class DealerAdmin(SEOAdminMixin):
    list_display = ('name', 'province', 'district', 'phone_number')
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'province', 'district', 'address', 'phone_number', 'email', 'is_active')
        }),
        SEOAdminMixin.seo_fieldset,
    )


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'client_name', 'client_phone', 'client_email', 'property_type', 'camera_quantity', 'coverage_type', 'created_at')
    list_filter = ('property_type', 'coverage_type', 'created_at')
    search_fields = ('client_name', 'client_phone', 'client_email')
    readonly_fields = ('created_at',)
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'title', 'file', 'alt_status', 'asset_type')
    list_filter = ('asset_type',)
    search_fields = ('title', 'alt_text')

    def alt_status(self, obj):
        if not obj.alt_text or not obj.alt_text.strip():
            return mark_safe('<span style="background:red;color:white;padding:2px 6px;border-radius:4px;">Missing ALT</span>')
        return obj.alt_text
    alt_status.short_description = "Alt Text"

    def image_preview(self, obj):
        if obj.file:
            return mark_safe(f'<img src="{obj.file.url}" style="max-height: 50px; border-radius: 4px;" />')
        return _("No Image")
    image_preview.short_description = _("Preview")


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'location')
    list_filter = ('category', 'status')
    search_fields = ('title', 'model_name', 'location')


# Bulk CSV Importer for WordPress Migrated Redirects
import csv
from django.contrib import messages
from django.contrib.redirects.models import Redirect
from django.contrib.redirects.admin import RedirectAdmin
from django.shortcuts import render, redirect
from django.urls import path
from django.contrib.sites.models import Site

try:
    admin.site.unregister(Redirect)
except admin.sites.NotRegistered:
    pass

@admin.register(Redirect)
class CustomRedirectAdmin(RedirectAdmin):
    change_list_template = "admin/redirects_changelist.html"
    list_display = ('old_path', 'new_path', 'is_active_status')
    actions = ['export_as_csv']

    def is_active_status(self, obj):
        if hasattr(obj, 'extension'):
            return obj.extension.is_active
        return True
    is_active_status.boolean = True
    is_active_status.short_description = "Active"

    def export_as_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="redirects_export.csv"'
        writer = csv.writer(response)
        writer.writerow(['from_url', 'to_url', 'is_active'])
        for obj in queryset:
            is_active = True
            if hasattr(obj, 'extension'):
                is_active = obj.extension.is_active
            writer.writerow([obj.old_path, obj.new_path, is_active])
        return response
    export_as_csv.short_description = "Export Selected as CSV"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('import-csv/', self.admin_site.admin_view(self.import_csv_view), name='redirect_import_csv'),
        ]
        return custom_urls + urls

    def import_csv_view(self, request):
        from django.urls import resolve, Resolver404
        if request.method == 'POST' and request.FILES.get('csv_file'):
            csv_file = request.FILES['csv_file']
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded_file)
            
            imported_count = 0
            errors = []
            
            # Ensure at least one site exists
            current_site = Site.objects.first()
            if not current_site:
                current_site = Site.objects.create(domain='yourdomain.com', name='Nightvision')

            for row_idx, row in enumerate(reader, start=1):
                from_url = row.get('from_url')
                to_url = row.get('to_url')
                
                if not from_url or not to_url:
                    errors.append(f"Row {row_idx}: Missing 'from_url' or 'to_url'.")
                    continue

                from_url = from_url.strip()
                to_url = to_url.strip()

                # Ensure leading slashes for Django redirects
                if not from_url.startswith('/'):
                    from_url = f"/{from_url}"
                if not to_url.startswith('/') and not to_url.startswith('http'):
                    to_url = f"/{to_url}"

                # 4. Error Intercept Systems (prevent infinite redirect loops)
                if from_url == to_url:
                    errors.append(f"Row {row_idx}: Infinite loop detected. 'from_url' matches 'to_url' ('{from_url}').")
                    continue

                # Live Page Conflict Detection
                try:
                    match = resolve(from_url)
                    # If it resolves to something other than the catch-all for React, it's an API/Admin view
                    if match.view_name != 'serve_react_app':
                        errors.append(f"Row {row_idx}: Conflict! '{from_url}' resolves to a live view ({match.view_name}).")
                        continue
                except Resolver404:
                    pass

                # Deep Chain Detection
                chain_detected = False
                current_check = to_url
                chain_depth = 0
                while chain_depth < 5:
                    if not current_check.startswith('/'):
                        break # external url
                    try:
                        next_r = Redirect.objects.get(site=current_site, old_path=current_check)
                        current_check = next_r.new_path
                        chain_depth += 1
                        if current_check == from_url:
                            chain_detected = True
                            errors.append(f"Row {row_idx}: Circular loop detected within chain at depth {chain_depth}.")
                            break
                    except Redirect.DoesNotExist:
                        break
                
                if chain_detected:
                    continue
                if chain_depth >= 5:
                    errors.append(f"Row {row_idx}: Redirect chain is too deep (>= 5).")
                    continue

                # Save or Update
                try:
                    r, created = Redirect.objects.update_or_create(
                        site=current_site,
                        old_path=from_url,
                        defaults={'new_path': to_url}
                    )
                    
                    # Update active status if provided in CSV
                    if 'is_active' in row:
                        from core.models import RedirectExtension
                        is_act = str(row['is_active']).lower() in ('true', '1', 'yes')
                        ext, _ = RedirectExtension.objects.get_or_create(redirect=r)
                        ext.is_active = is_act
                        ext.save()
                        
                    imported_count += 1
                except Exception as e:
                    errors.append(f"Row {row_idx}: Import error ({str(e)}).")

            if imported_count > 0:
                messages.success(request, f"Successfully imported {imported_count} redirects.")
            if errors:
                for err in errors[:10]:
                    messages.error(request, err)
                if len(errors) > 10:
                    messages.error(request, f"...and {len(errors) - 10} more errors occurred.")
            
            return redirect('admin:redirects_redirect_changelist')

        context = {
            **self.admin_site.each_context(request),
            'title': 'Bulk CSV Redirect Importer',
        }
        return render(request, 'admin/import_csv.html', context)


from django import forms
from django.utils.html import escape


class MediaLibraryPickerWidget(forms.ClearableFileInput):
    """Image picker: shows the server's media library first (click a
    thumbnail to reuse an existing MediaAsset) with a prominent button to
    upload a new file from the local computer instead.

    The selected existing asset id travels in a `<field name>_existing`
    hidden input; an uploaded file always takes priority in the form save.
    """

    def render(self, name, value, attrs=None, renderer=None):
        file_input = super().render(name, value, attrs, renderer)
        input_id = (attrs or {}).get('id', f'id_{name}')

        assets = MediaAsset.objects.exclude(file='').order_by('-id')[:60]
        items = []
        for a in assets:
            try:
                url = a.file.url
            except ValueError:
                continue
            title = escape(a.title or a.alt_text or f'Asset {a.id}')
            items.append(
                f'<div class="nv-media-item" data-asset-id="{a.id}" data-url="{escape(url)}" title="{title}">'
                f'<img src="{escape(url)}" loading="lazy" alt="{title}">'
                f'<span>{title}</span>'
                f'</div>'
            )
        library_html = ''.join(items) or (
            '<div class="nv-media-empty">No images on the server yet — upload one from your computer.</div>'
        )

        return mark_safe(f'''
<style>
    .nv-picker {{ max-width: 720px; }}
    .nv-picker-actions {{
        display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;
    }}
    .nv-picker .nv-btn {{
        font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 1.5px; border-radius: 6px;
        padding: 10px 18px; cursor: pointer; transition: all .25s ease;
    }}
    .nv-btn-upload {{
        background: var(--primary, #00ff66) !important;
        color: #071009 !important;
        border: 2px solid var(--primary, #00ff66) !important;
        box-shadow: 0 0 12px rgba(0, 255, 102, 0.35);
    }}
    .nv-btn-upload:hover {{ filter: brightness(1.15); box-shadow: 0 0 20px rgba(0, 255, 102, 0.55); }}
    .nv-btn-library {{
        background: transparent !important;
        color: var(--primary, #00ff66) !important;
        border: 2px solid var(--primary, #00ff66) !important;
    }}
    .nv-btn-library:hover {{ background: rgba(0, 255, 102, 0.12) !important; }}
    .nv-picker-status {{
        font-size: 12px; margin-bottom: 10px; color: var(--primary, #00ff66);
        letter-spacing: .5px; min-height: 16px;
    }}
    .nv-media-library {{
        display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 10px; max-height: 340px; overflow-y: auto; padding: 12px;
        border: 1px solid rgba(0, 255, 102, 0.25); border-radius: 8px;
        background: rgba(9, 17, 13, 0.6); margin-bottom: 12px;
    }}
    .nv-media-item {{
        cursor: pointer; border: 2px solid transparent; border-radius: 6px;
        overflow: hidden; background: rgba(27, 38, 33, 0.6); transition: all .2s ease;
    }}
    .nv-media-item:hover {{ border-color: rgba(0, 255, 102, 0.5); transform: translateY(-2px); }}
    .nv-media-item.selected {{
        border-color: var(--primary, #00ff66);
        box-shadow: 0 0 12px rgba(0, 255, 102, 0.5);
    }}
    .nv-media-item img {{ width: 100%; height: 80px; object-fit: cover; display: block; }}
    .nv-media-item span {{
        display: block; font-size: 10px; padding: 4px 6px; color: #c9d4cd;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }}
    .nv-media-empty {{ grid-column: 1/-1; font-size: 12px; color: #8fa096; padding: 10px; }}
    .nv-picker-preview img {{
        max-height: 160px; border-radius: 8px; margin-top: 4px;
        border: 1px solid rgba(0, 255, 102, 0.35);
    }}
    .nv-file-holder {{ display: none; }}
</style>

<div class="nv-picker" id="nv-picker-{name}">
    <div class="nv-picker-actions">
        <button type="button" class="nv-btn nv-btn-upload" id="nv-upload-btn-{name}">
            &#8679; Upload from computer
        </button>
        <button type="button" class="nv-btn nv-btn-library" id="nv-library-btn-{name}">
            &#128193; Server images
        </button>
    </div>
    <div class="nv-picker-status" id="nv-status-{name}">Pick an image from the server library below, or upload a new one.</div>
    <div class="nv-media-library" id="nv-library-{name}">{library_html}</div>
    <div class="nv-file-holder">{file_input}</div>
    <input type="hidden" name="{name}_existing" id="nv-existing-{name}" value="">
    <div class="nv-picker-preview" id="nv-preview-{name}"></div>
</div>

<script>
(function() {{
    var picker   = document.getElementById('nv-picker-{name}');
    var library  = document.getElementById('nv-library-{name}');
    var status   = document.getElementById('nv-status-{name}');
    var existing = document.getElementById('nv-existing-{name}');
    var preview  = document.getElementById('nv-preview-{name}');
    var fileInput = document.getElementById('{input_id}');
    var uploadBtn = document.getElementById('nv-upload-btn-{name}');
    var libraryBtn = document.getElementById('nv-library-btn-{name}');

    function clearSelection() {{
        library.querySelectorAll('.nv-media-item.selected').forEach(function(el) {{
            el.classList.remove('selected');
        }});
    }}

    function showPreview(url) {{
        preview.innerHTML = url ? '<img src="' + url + '" alt="Selected hero image">' : '';
    }}

    // Pick an existing server image
    library.addEventListener('click', function(e) {{
        var item = e.target.closest('.nv-media-item');
        if (!item) return;
        clearSelection();
        item.classList.add('selected');
        existing.value = item.dataset.assetId;
        if (fileInput) fileInput.value = '';
        status.textContent = 'Server image selected: ' + item.title + ' (saved when you click SAVE)';
        showPreview(item.dataset.url);
    }});

    // Upload a new image from the local computer
    uploadBtn.addEventListener('click', function() {{
        if (fileInput) fileInput.click();
    }});

    if (fileInput) {{
        fileInput.addEventListener('change', function() {{
            if (!fileInput.files.length) return;
            clearSelection();
            existing.value = '';
            status.textContent = 'New file chosen: ' + fileInput.files[0].name + ' (uploaded when you click SAVE)';
            showPreview(URL.createObjectURL(fileInput.files[0]));
        }});
    }}

    // Toggle the library grid
    libraryBtn.addEventListener('click', function() {{
        library.style.display = (library.style.display === 'none') ? 'grid' : 'none';
    }});
}})();
</script>
''')


class SiteSettingForm(forms.ModelForm):
    # Hero fields
    hero_heading = forms.CharField(
        max_length=255, 
        required=False, 
        label="Hero Heading",
        widget=forms.TextInput(attrs={'style': 'width: 600px;'})
    )
    hero_subheading = forms.CharField(
        widget=TinyMCE(), 
        required=False, 
        label="Hero Subheading"
    )
    hero_body_text = forms.CharField(
        widget=TinyMCE(), 
        required=False, 
        label="Hero Body Text"
    )
    hero_button_text = forms.CharField(
        max_length=100, 
        required=False, 
        label="Hero Button Text",
        widget=forms.TextInput(attrs={'style': 'width: 300px;'})
    )
    hero_button_url = forms.CharField(
        max_length=255, 
        required=False, 
        label="Hero Button URL",
        widget=forms.TextInput(attrs={'style': 'width: 300px;'})
    )
    hero_image = forms.ImageField(
        required=False,
        label="Hero Image",
        widget=MediaLibraryPickerWidget,
        help_text="Pick an existing server image or upload a new one. New uploads run through the MediaAsset optimization pipeline (WebP conversion, auto-scaling)."
    )

    # Features section fields (the "NV NightVision Features" strip on the
    # homepage). Heading/subheading/highlights/center image live in the
    # homepage_settings JSON; the four feature cards live in site_contents.
    features_heading = forms.CharField(
        max_length=255, required=False, label="Features Heading",
        widget=forms.TextInput(attrs={'style': 'width: 600px;'})
    )
    features_subheading = forms.CharField(
        required=False, label="Features Subheading",
        widget=TinyMCE()
    )
    features_body_text = forms.CharField(
        required=False, label="Features Highlights Line",
        widget=forms.TextInput(attrs={'style': 'width: 600px;'}),
        help_text="Shown as 'Highlights: ...' under the subheading. Leave empty to hide."
    )
    features_image = forms.ImageField(
        required=False,
        label="Center Product Image",
        widget=MediaLibraryPickerWidget,
        help_text="The product visual in the middle of the features grid. Pick a server image or upload a new one."
    )
    features_image_url_display = forms.CharField(
        max_length=500, required=False, label="Current Center Image URL",
        widget=forms.TextInput(attrs={'readonly': 'readonly', 'style': 'width: 600px; background-color: #eee;'})
    )
    hero_image_url_display = forms.CharField(
        max_length=500,
        required=False,
        label="Current Hero Image URL",
        widget=forms.TextInput(attrs={'readonly': 'readonly', 'style': 'width: 600px; background-color: #eee;'})
    )

    # Scrolling ticker fields (the marquee bar just below the homepage hero).
    # Shown only when editing the 'global_config' row; stored in its JSON as
    # bannerText / bannerEnabled / bannerSpeed.
    ticker_enabled = forms.BooleanField(
        required=False,
        initial=True,
        label="Show Scrolling Ticker",
        help_text="Untick to hide the scrolling bar on the website without deleting the text."
    )
    ticker_text = forms.CharField(
        max_length=500,
        required=False,
        label="Ticker Text",
        widget=TinyMCE(),
        help_text="The scrolling announcement, e.g. 'Dashain Offer: 15% off all NVR kits // Free installation in Kathmandu valley //'"
    )
    ticker_speed = forms.IntegerField(
        required=False,
        min_value=5,
        max_value=120,
        label="Scroll Duration (seconds)",
        help_text="Time for one full scroll cycle. Smaller = faster. Default 18.",
        widget=forms.NumberInput(attrs={'style': 'width: 100px;'})
    )

    # Feature cards (4 cards around the center image). Shown when editing the
    # 'site_contents' row. Icon names come from Material Symbols
    # (https://fonts.google.com/icons), e.g. power, near_me, thunderstorm, shield.
    _card_icon = dict(max_length=50, required=False,
                      widget=forms.TextInput(attrs={'style': 'width: 200px;'}),
                      help_text="Material Symbols icon name, e.g. power, shield")
    _card_title = dict(max_length=100, required=False,
                       widget=forms.TextInput(attrs={'style': 'width: 300px;'}))
    _card_desc = dict(required=False,
                      widget=TinyMCE())

    feature1_icon = forms.CharField(label="Card 1 – Icon", **_card_icon)
    feature1_title = forms.CharField(label="Card 1 – Title", **_card_title)
    feature1_desc = forms.CharField(label="Card 1 – Description", **_card_desc)
    feature2_icon = forms.CharField(label="Card 2 – Icon", **_card_icon)
    feature2_title = forms.CharField(label="Card 2 – Title", **_card_title)
    feature2_desc = forms.CharField(label="Card 2 – Description", **_card_desc)
    feature3_icon = forms.CharField(label="Card 3 – Icon", **_card_icon)
    feature3_title = forms.CharField(label="Card 3 – Title", **_card_title)
    feature3_desc = forms.CharField(label="Card 3 – Description", **_card_desc)
    feature4_icon = forms.CharField(label="Card 4 – Icon", **_card_icon)
    feature4_title = forms.CharField(label="Card 4 – Title", **_card_title)
    feature4_desc = forms.CharField(label="Card 4 – Description", **_card_desc)

    social_facebook = forms.CharField(max_length=255, required=False, label="Facebook URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))
    social_instagram = forms.CharField(max_length=255, required=False, label="Instagram URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))
    social_linkedin = forms.CharField(max_length=255, required=False, label="LinkedIn URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))
    social_tiktok = forms.CharField(max_length=255, required=False, label="TikTok URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))
    social_x = forms.CharField(max_length=255, required=False, label="X (Twitter) URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))
    social_youtube = forms.CharField(max_length=255, required=False, label="YouTube URL", widget=forms.TextInput(attrs={'style': 'width: 400px;'}))

    # --- NEW FIELDS FOR HOMEPAGE DYNAMICS ---
    # About (homepage_settings)
    about_heading = forms.CharField(label="About Heading", max_length=255, required=False, widget=forms.TextInput(attrs={'style': 'width: 600px;'}))
    about_subheading = forms.CharField(label="About Subheading", required=False, widget=TinyMCE())
    about_body_text = forms.CharField(label="About Body Text", required=False, widget=TinyMCE())
    
    # CTA/Dealer (homepage_settings)
    cta_heading = forms.CharField(label="CTA Heading", max_length=255, required=False, widget=forms.TextInput(attrs={'style': 'width: 600px;'}))
    cta_subheading = forms.CharField(label="CTA Subheading", required=False, widget=TinyMCE())
    cta_body_text = forms.CharField(label="CTA Body Text", required=False, widget=TinyMCE())
    cta_button_text = forms.CharField(label="CTA Button Text", max_length=100, required=False)
    cta_button_url = forms.CharField(label="CTA Button URL", max_length=255, required=False)

    # Why Section (site_contents)
    why_tag = forms.CharField(label="Why Tag", max_length=255, required=False)
    why_title = forms.CharField(label="Why Title", max_length=255, required=False, widget=forms.TextInput(attrs={'style': 'width: 600px;'}))
    why_subtitle = forms.CharField(label="Why Subtitle", required=False, widget=TinyMCE())
    why_feat1_val = forms.CharField(label="Why Feat 1 Val", max_length=100, required=False)
    why_feat1_label = forms.CharField(label="Why Feat 1 Label", max_length=100, required=False)
    why_feat2_val = forms.CharField(label="Why Feat 2 Val", max_length=100, required=False)
    why_feat2_label = forms.CharField(label="Why Feat 2 Label", max_length=100, required=False)
    why_feat3_val = forms.CharField(label="Why Feat 3 Val", max_length=100, required=False)
    why_feat3_label = forms.CharField(label="Why Feat 3 Label", max_length=100, required=False)
    why_feat4_val = forms.CharField(label="Why Feat 4 Val", max_length=100, required=False)
    why_feat4_label = forms.CharField(label="Why Feat 4 Label", max_length=100, required=False)

    # Founder Section (site_contents)
    home_founder_name = forms.CharField(label="Founder Name", max_length=255, required=False)
    home_founder_tag = forms.CharField(label="Founder Tag", max_length=255, required=False)
    home_founder_quote = forms.CharField(label="Founder Quote", required=False, widget=TinyMCE())
    home_founder_desc = forms.CharField(label="Founder Description", required=False, widget=TinyMCE())

    # Testimonials (site_contents)
    testimonials_title = forms.CharField(label="Testimonials Title", max_length=255, required=False)
    testi1_text = forms.CharField(label="Testimonial 1 Text", required=False, widget=TinyMCE())
    testi1_author = forms.CharField(label="Testimonial 1 Author", max_length=255, required=False)
    testi2_text = forms.CharField(label="Testimonial 2 Text", required=False, widget=TinyMCE())
    testi2_author = forms.CharField(label="Testimonial 2 Author", max_length=255, required=False)
    testi3_text = forms.CharField(label="Testimonial 3 Text", required=False, widget=TinyMCE())
    testi3_author = forms.CharField(label="Testimonial 3 Author", max_length=255, required=False)

    # Blog Section (site_contents)
    home_blog_title = forms.CharField(label="Home Blog Title", max_length=255, required=False)
    home_blog_subtitle = forms.CharField(label="Home Blog Subtitle", required=False, widget=TinyMCE())

    # Secondary Pages Hero
    about_hero_title = forms.CharField(label="About Hero Title", max_length=255, required=False)
    about_hero_desc = forms.CharField(label="About Hero Subtitle", required=False, widget=TinyMCE())
    founder_hero_title = forms.CharField(label="Founder Hero Title", max_length=255, required=False)
    founder_hero_subtitle = forms.CharField(label="Founder Hero Subtitle", required=False, widget=TinyMCE())
    contact_hero_title = forms.CharField(label="Contact Hero Title", max_length=255, required=False)
    contact_hero_subtitle = forms.CharField(label="Contact Hero Subtitle", required=False, widget=TinyMCE())
    gallery_hero_title = forms.CharField(label="Gallery Hero Title", max_length=255, required=False)
    gallery_hero_subtitle = forms.CharField(label="Gallery Hero Subtitle", required=False, widget=TinyMCE())
    events_hero_title = forms.CharField(label="Events Hero Title", max_length=255, required=False)
    events_hero_subtitle = forms.CharField(label="Events Hero Subtitle", required=False, widget=TinyMCE())

    # About Us Content
    about_story_title = forms.CharField(label="About Story Title", max_length=255, required=False)
    about_story_desc1 = forms.CharField(label="About Story Desc 1", required=False, widget=TinyMCE())
    about_story_desc2 = forms.CharField(label="About Story Desc 2", required=False, widget=TinyMCE())
    about_vision = forms.CharField(label="About Vision", required=False, widget=TinyMCE())
    about_mission = forms.CharField(label="About Mission", required=False, widget=TinyMCE())
    about_pillars_title = forms.CharField(label="About Pillars Title", max_length=255, required=False)
    about_pillars_desc = forms.CharField(label="About Pillars Desc", required=False, widget=TinyMCE())
    
    about_pillar1_icon = forms.CharField(label="Pillar 1 Icon", max_length=50, required=False)
    about_pillar1_title = forms.CharField(label="Pillar 1 Title", max_length=255, required=False)
    about_pillar1_text = forms.CharField(label="Pillar 1 Text", required=False, widget=TinyMCE())
    
    about_pillar2_icon = forms.CharField(label="Pillar 2 Icon", max_length=50, required=False)
    about_pillar2_title = forms.CharField(label="Pillar 2 Title", max_length=255, required=False)
    about_pillar2_text = forms.CharField(label="Pillar 2 Text", required=False, widget=TinyMCE())
    
    about_pillar3_icon = forms.CharField(label="Pillar 3 Icon", max_length=50, required=False)
    about_pillar3_title = forms.CharField(label="Pillar 3 Title", max_length=255, required=False)
    about_pillar3_text = forms.CharField(label="Pillar 3 Text", required=False, widget=TinyMCE())

    # Founder Content
    founder_image = forms.CharField(label="Founder Image URL", max_length=500, required=False)
    founder_bio1_title = forms.CharField(label="Bio Section 1 Title", max_length=255, required=False)
    founder_bio1_text = forms.CharField(label="Bio Section 1 Text", required=False, widget=TinyMCE())
    founder_bio1_text_sec = forms.CharField(label="Bio Section 1 Secondary Text", required=False, widget=TinyMCE())
    
    founder_bio2_title = forms.CharField(label="Bio Section 2 Title", max_length=255, required=False)
    founder_bio2_text = forms.CharField(label="Bio Section 2 Text", required=False, widget=TinyMCE())
    founder_bio2_text_sec = forms.CharField(label="Bio Section 2 Secondary Text", required=False, widget=TinyMCE())
    
    founder_start_title = forms.CharField(label="Start Brand Title", max_length=255, required=False)
    founder_start_text = forms.CharField(label="Start Brand Text", required=False, widget=TinyMCE())
    founder_start_quote = forms.CharField(label="Start Brand Quote", required=False, widget=TinyMCE())
    
    founder_market_title = forms.CharField(label="Market Title", max_length=255, required=False)
    founder_market_text = forms.CharField(label="Market Text", required=False, widget=TinyMCE())
    founder_market_quote = forms.CharField(label="Market Quote", required=False, widget=TinyMCE())
    
    founder_vision_title = forms.CharField(label="Vision Title", max_length=255, required=False)
    founder_vision_text = forms.CharField(label="Vision Text", required=False, widget=TinyMCE())
    founder_vision_quote = forms.CharField(label="Vision Quote", required=False, widget=TinyMCE())



    class Meta:
        model = SiteSetting
        fields = ('key', 'value')

    HERO_FIELDS = ('hero_heading', 'hero_subheading', 'hero_body_text', 'hero_button_text',
                   'hero_button_url', 'hero_image', 'hero_image_url_display')
    FEATURES_HP_FIELDS = ('features_heading', 'features_subheading', 'features_body_text',
                          'features_image', 'features_image_url_display')
    TICKER_FIELDS = ('ticker_enabled', 'ticker_text', 'ticker_speed')
    CARD_FIELDS = tuple(f'feature{i}_{part}' for i in range(1, 5)
                        for part in ('icon', 'title', 'desc'))
    SOCIAL_FIELDS = ('social_facebook', 'social_instagram', 'social_linkedin', 'social_tiktok', 'social_x', 'social_youtube')
    ABOUT_FIELDS = ('about_heading', 'about_subheading', 'about_body_text')
    CTA_FIELDS = ('cta_heading', 'cta_subheading', 'cta_body_text', 'cta_button_text', 'cta_button_url')
    WHY_FIELDS = ('why_tag', 'why_title', 'why_subtitle',
                  'why_feat1_val', 'why_feat1_label', 'why_feat2_val', 'why_feat2_label',
                  'why_feat3_val', 'why_feat3_label', 'why_feat4_val', 'why_feat4_label')
    FOUNDER_FIELDS = ('home_founder_name', 'home_founder_tag', 'home_founder_quote', 'home_founder_desc')
    TESTI_FIELDS = ('testimonials_title', 'testi1_text', 'testi1_author', 'testi2_text', 'testi2_author', 'testi3_text', 'testi3_author')
    BLOG_FIELDS = ('home_blog_title', 'home_blog_subtitle')
    SECONDARY_HERO_FIELDS = ('about_hero_title', 'about_hero_desc', 'founder_hero_title', 'founder_hero_subtitle', 'contact_hero_title', 'contact_hero_subtitle', 'gallery_hero_title', 'gallery_hero_subtitle', 'events_hero_title', 'events_hero_subtitle')
    ABOUT_CONTENT_FIELDS = ('about_story_title', 'about_story_desc1', 'about_story_desc2', 'about_vision', 'about_mission', 'about_pillars_title', 'about_pillars_desc', 'about_pillar1_icon', 'about_pillar1_title', 'about_pillar1_text', 'about_pillar2_icon', 'about_pillar2_title', 'about_pillar2_text', 'about_pillar3_icon', 'about_pillar3_title', 'about_pillar3_text')
    FOUNDER_CONTENT_FIELDS = ('founder_image', 'founder_bio1_title', 'founder_bio1_text', 'founder_bio1_text_sec', 'founder_bio2_title', 'founder_bio2_text', 'founder_bio2_text_sec', 'founder_start_title', 'founder_start_text', 'founder_start_quote', 'founder_market_title', 'founder_market_text', 'founder_market_quote', 'founder_vision_title', 'founder_vision_text', 'founder_vision_quote')

    def _hide_fields(self, names):
        for field in names:
            self.fields[field].widget = forms.HiddenInput()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        key = self.instance.key if (self.instance and self.instance.pk) else None

        default_cards = [
            { "icon": "power", "title": "Easy Installation", "desc": "Does not require any wiring and function as Wi-Fi Based plug and play surveillance devices." },
            { "icon": "near_me", "title": "Advanced Features", "desc": "Night Vision Cameras are designed and developed with advanced feature and keeping practical usage in consideration." },
            { "icon": "thunderstorm", "title": "Durable", "desc": "Manufactured to be used for indoor and outdoor purpose to last long from temperature -20 degree to 50+ degree Celsius." },
            { "icon": "shield", "title": "Secured", "desc": "Highly secured application and hardware for absolute privacy which also comes with private mode." }
        ]

        if key == 'homepage_settings':
            val = self.instance.value or {}
            hero = val.get('hero', {})
            self.fields['hero_heading'].initial = hero.get('heading', '')
            self.fields['hero_subheading'].initial = hero.get('subheading', '')
            self.fields['hero_body_text'].initial = hero.get('body_text', '')
            self.fields['hero_button_text'].initial = hero.get('button_text', '')
            self.fields['hero_button_url'].initial = hero.get('button_url', '')
            self.fields['hero_image_url_display'].initial = hero.get('image_url', '')
            
            features = val.get('features', {})
            self.fields['features_heading'].initial = features.get('heading') or "NV NightVision"
            self.fields['features_subheading'].initial = features.get('subheading') or "Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television."
            self.fields['features_body_text'].initial = features.get('body_text', '')
            self.fields['features_image_url_display'].initial = features.get('image_url', '')
            
            # Load features items
            items = features.get('items')
            if not items:
                try:
                    sc = SiteSetting.objects.filter(key='site_contents').first()
                    items = (sc.value or {}).get('features') if sc else None
                except Exception:
                    items = None
            if not items:
                items = default_cards

            for i in range(4):
                card = items[i] if (items and i < len(items)) else {}
                default_card = default_cards[i]
                self.fields[f'feature{i + 1}_icon'].initial = card.get('icon') or default_card['icon']
                self.fields[f'feature{i + 1}_title'].initial = card.get('title') or default_card['title']
                self.fields[f'feature{i + 1}_desc'].initial = card.get('desc') or default_card['desc']

            about = val.get('about', {})
            self.fields['about_heading'].initial = about.get('heading', '')
            self.fields['about_subheading'].initial = about.get('subheading', '')
            self.fields['about_body_text'].initial = about.get('body_text', '')

            cta = val.get('cta', {})
            self.fields['cta_heading'].initial = cta.get('heading', '')
            self.fields['cta_subheading'].initial = cta.get('subheading', '')
            self.fields['cta_body_text'].initial = cta.get('body_text', '')
            self.fields['cta_button_text'].initial = cta.get('button_text', '')
            self.fields['cta_button_url'].initial = cta.get('button_url', '')

            self._hide_fields(self.TICKER_FIELDS + self.SOCIAL_FIELDS + self.CARD_FIELDS + self.WHY_FIELDS + self.FOUNDER_FIELDS + self.TESTI_FIELDS + self.BLOG_FIELDS + self.SECONDARY_HERO_FIELDS + self.ABOUT_CONTENT_FIELDS + self.FOUNDER_CONTENT_FIELDS)
        elif key == 'global_config':
            val = self.instance.value or {}
            self.fields['ticker_enabled'].initial = val.get('bannerEnabled', True)
            self.fields['ticker_text'].initial = val.get('bannerText', '')
            self.fields['ticker_speed'].initial = val.get('bannerSpeed', 18)
            self._hide_fields(self.HERO_FIELDS + self.FEATURES_HP_FIELDS + self.CARD_FIELDS + self.SOCIAL_FIELDS + self.ABOUT_FIELDS + self.CTA_FIELDS + self.WHY_FIELDS + self.FOUNDER_FIELDS + self.TESTI_FIELDS + self.BLOG_FIELDS + self.SECONDARY_HERO_FIELDS + self.ABOUT_CONTENT_FIELDS + self.FOUNDER_CONTENT_FIELDS)
        elif key == 'site_contents':
            val = self.instance.value or {}
            cards = val.get('features') or []
            for i in range(4):
                card = cards[i] if i < len(cards) else {}
                default_card = default_cards[i]
                self.fields[f'feature{i + 1}_icon'].initial = card.get('icon') or default_card['icon']
                self.fields[f'feature{i + 1}_title'].initial = card.get('title') or default_card['title']
                self.fields[f'feature{i + 1}_desc'].initial = card.get('desc') or default_card['desc']
            self.fields['social_facebook'].initial = val.get('socialFacebook', '')
            self.fields['social_instagram'].initial = val.get('socialInstagram', '')
            self.fields['social_linkedin'].initial = val.get('socialLinkedin', '')
            self.fields['social_tiktok'].initial = val.get('socialTiktok', '')
            self.fields['social_x'].initial = val.get('socialX', '')
            self.fields['social_youtube'].initial = val.get('socialYoutube', '')

            self.fields['why_tag'].initial = val.get('whyTag', '')
            self.fields['why_title'].initial = val.get('whyTitle', '')
            self.fields['why_subtitle'].initial = val.get('whySubtitle', '')
            why_feats = val.get('whyFeatures') or []
            for i in range(4):
                f = why_feats[i] if i < len(why_feats) else {}
                self.fields[f'why_feat{i+1}_val'].initial = f.get('val', '')
                self.fields[f'why_feat{i+1}_label'].initial = f.get('label', '')

            self.fields['home_founder_name'].initial = val.get('homeFounderName', '')
            self.fields['home_founder_tag'].initial = val.get('homeFounderTag', '')
            self.fields['home_founder_quote'].initial = val.get('homeFounderQuote', '')
            self.fields['home_founder_desc'].initial = val.get('homeFounderDesc', '')

            self.fields['testimonials_title'].initial = val.get('testimonialsTitle', '')
            testis = val.get('testimonials') or []
            for i in range(3):
                t = testis[i] if i < len(testis) else {}
                self.fields[f'testi{i+1}_text'].initial = t.get('text', '')
                self.fields[f'testi{i+1}_author'].initial = t.get('author', '')

            self.fields['home_blog_title'].initial = val.get('homeBlogTitle', '')

            self.fields['home_blog_subtitle'].initial = val.get('homeBlogSubtitle', '')

            self.fields['about_hero_title'].initial = val.get('aboutHeroTitle', '')
            self.fields['about_hero_desc'].initial = val.get('aboutHeroDesc', '')
            self.fields['founder_hero_title'].initial = val.get('founderHeroTitle', '')
            self.fields['founder_hero_subtitle'].initial = val.get('founderHeroSubtitle', '')
            self.fields['contact_hero_title'].initial = val.get('contactHeroTitle', '')
            self.fields['contact_hero_subtitle'].initial = val.get('contactHeroSubtitle', '')
            self.fields['gallery_hero_title'].initial = val.get('galleryHeroTitle', '')
            self.fields['gallery_hero_subtitle'].initial = val.get('galleryHeroSubtitle', '')
            self.fields['events_hero_title'].initial = val.get('eventsHeroTitle', '')

            self.fields['events_hero_subtitle'].initial = val.get('eventsHeroSubtitle', '')

            self.fields['about_story_title'].initial = val.get('aboutStoryTitle', '')
            self.fields['about_story_desc1'].initial = val.get('aboutStoryDesc1', '')
            self.fields['about_story_desc2'].initial = val.get('aboutStoryDesc2', '')
            self.fields['about_vision'].initial = val.get('aboutVision', '')
            self.fields['about_mission'].initial = val.get('aboutMission', '')
            self.fields['about_pillars_title'].initial = val.get('aboutPillarsTitle', '')
            self.fields['about_pillars_desc'].initial = val.get('aboutPillarsDesc', '')
            
            pillars = val.get('aboutPillars', [])
            for i in range(3):
                if i < len(pillars):
                    self.fields[f'about_pillar{i+1}_icon'].initial = pillars[i].get('icon', '')
                    self.fields[f'about_pillar{i+1}_title'].initial = pillars[i].get('title', '')
                    self.fields[f'about_pillar{i+1}_text'].initial = pillars[i].get('text', '')

            self.fields['founder_image'].initial = val.get('founderImage', '')
            bios = val.get('founderBioSections', [])
            for i in range(2):
                if i < len(bios):
                    self.fields[f'founder_bio{i+1}_title'].initial = bios[i].get('title', '')
                    self.fields[f'founder_bio{i+1}_text'].initial = bios[i].get('text', '')
                    self.fields[f'founder_bio{i+1}_text_sec'].initial = bios[i].get('textSec', '')
            
            self.fields['founder_start_title'].initial = val.get('founderStartTitle', '')
            self.fields['founder_start_text'].initial = val.get('founderStartText', '')
            self.fields['founder_start_quote'].initial = val.get('founderStartQuote', '')
            self.fields['founder_market_title'].initial = val.get('founderMarketTitle', '')
            self.fields['founder_market_text'].initial = val.get('founderMarketText', '')
            self.fields['founder_market_quote'].initial = val.get('founderMarketQuote', '')
            self.fields['founder_vision_title'].initial = val.get('founderVisionTitle', '')
            self.fields['founder_vision_text'].initial = val.get('founderVisionText', '')
            self.fields['founder_vision_quote'].initial = val.get('founderVisionQuote', '')



            self._hide_fields(self.HERO_FIELDS + self.FEATURES_HP_FIELDS + self.TICKER_FIELDS + self.ABOUT_FIELDS + self.CTA_FIELDS)
        else:
            self._hide_fields(self.HERO_FIELDS + self.FEATURES_HP_FIELDS + self.TICKER_FIELDS + self.CARD_FIELDS + self.SOCIAL_FIELDS + self.ABOUT_FIELDS + self.CTA_FIELDS + self.WHY_FIELDS + self.FOUNDER_FIELDS + self.TESTI_FIELDS + self.BLOG_FIELDS + self.SECONDARY_HERO_FIELDS + self.ABOUT_CONTENT_FIELDS + self.FOUNDER_CONTENT_FIELDS)

    def save(self, commit=True):
        instance = super().save(commit=False)
        if instance.key == 'homepage_settings':
            val = instance.value or {}
            if 'hero' not in val:
                val['hero'] = {}
            val['hero']['heading'] = self.cleaned_data.get('hero_heading', '')
            val['hero']['subheading'] = self.cleaned_data.get('hero_subheading', '')
            val['hero']['body_text'] = self.cleaned_data.get('hero_body_text', '')
            val['hero']['button_text'] = self.cleaned_data.get('hero_button_text', '')
            val['hero']['button_url'] = self.cleaned_data.get('hero_button_url', '')
            
            # Handle image: a fresh upload wins; otherwise a server-library
            # selection (hero_image_existing) reuses an existing MediaAsset.
            hero_image = self.cleaned_data.get('hero_image')
            if hero_image:
                alt_text = "NightVision CCTV Hero Section Image"
                asset = MediaAsset.objects.create(
                    title="Hero Image Uploaded via Admin",
                    file=hero_image,
                    alt_text=alt_text,
                    is_header=True
                )
                val['hero']['image_url'] = asset.file.url
            else:
                existing_id = (self.data.get('hero_image_existing') or '').strip()
                if existing_id.isdigit():
                    asset = MediaAsset.objects.filter(id=int(existing_id)).exclude(file='').first()
                    if asset:
                        val['hero']['image_url'] = asset.file.url

            # Features section (heading/subheading/highlights/center image)
            features = val.setdefault('features', {})
            features['heading'] = self.cleaned_data.get('features_heading', '')
            features['subheading'] = self.cleaned_data.get('features_subheading', '')
            features['body_text'] = self.cleaned_data.get('features_body_text', '')
            
            # Save the 4 card items as well!
            items = []
            for i in range(4):
                items.append({
                    'icon': self.cleaned_data.get(f'feature{i + 1}_icon', ''),
                    'title': self.cleaned_data.get(f'feature{i + 1}_title', ''),
                    'desc': self.cleaned_data.get(f'feature{i + 1}_desc', ''),
                })
            features['items'] = items

            features_image = self.cleaned_data.get('features_image')
            if features_image:
                asset = MediaAsset.objects.create(
                    title="Features Center Image Uploaded via Admin",
                    file=features_image,
                    alt_text="NightVision product visual - homepage features section",
                    is_header=True,
                )
                features['image_url'] = asset.file.url
            else:
                existing_id = (self.data.get('features_image_existing') or '').strip()
                if existing_id.isdigit():
                    asset = MediaAsset.objects.filter(id=int(existing_id)).exclude(file='').first()
                    if asset:
                        features['image_url'] = asset.file.url
            
            about = val.setdefault('about', {})
            about['heading'] = self.cleaned_data.get('about_heading', '')
            about['subheading'] = self.cleaned_data.get('about_subheading', '')
            about['body_text'] = self.cleaned_data.get('about_body_text', '')
            
            cta = val.setdefault('cta', {})
            cta['heading'] = self.cleaned_data.get('cta_heading', '')
            cta['subheading'] = self.cleaned_data.get('cta_subheading', '')
            cta['body_text'] = self.cleaned_data.get('cta_body_text', '')
            cta['button_text'] = self.cleaned_data.get('cta_button_text', '')
            cta['button_url'] = self.cleaned_data.get('cta_button_url', '')

            instance.value = val
        elif instance.key == 'site_contents':
            val = instance.value or {}
            cards = list(val.get('features') or [])
            while len(cards) < 4:
                cards.append({})
            for i in range(4):
                cards[i] = {
                    'icon': self.cleaned_data.get(f'feature{i + 1}_icon', ''),
                    'title': self.cleaned_data.get(f'feature{i + 1}_title', ''),
                    'desc': self.cleaned_data.get(f'feature{i + 1}_desc', ''),
                }
            val['features'] = cards
            val['socialFacebook'] = self.cleaned_data.get('social_facebook', '')
            val['socialInstagram'] = self.cleaned_data.get('social_instagram', '')
            val['socialLinkedin'] = self.cleaned_data.get('social_linkedin', '')
            val['socialTiktok'] = self.cleaned_data.get('social_tiktok', '')
            val['socialX'] = self.cleaned_data.get('social_x', '')
            val['socialYoutube'] = self.cleaned_data.get('social_youtube', '')

            val['whyTag'] = self.cleaned_data.get('why_tag', '')
            val['whyTitle'] = self.cleaned_data.get('why_title', '')
            val['whySubtitle'] = self.cleaned_data.get('why_subtitle', '')
            val['whyFeatures'] = [
                {'val': self.cleaned_data.get(f'why_feat{i+1}_val', ''), 'label': self.cleaned_data.get(f'why_feat{i+1}_label', '')}
                for i in range(4)
            ]

            val['homeFounderName'] = self.cleaned_data.get('home_founder_name', '')
            val['homeFounderTag'] = self.cleaned_data.get('home_founder_tag', '')
            val['homeFounderQuote'] = self.cleaned_data.get('home_founder_quote', '')
            val['homeFounderDesc'] = self.cleaned_data.get('home_founder_desc', '')

            val['testimonialsTitle'] = self.cleaned_data.get('testimonials_title', '')
            val['testimonials'] = [
                {'text': self.cleaned_data.get(f'testi{i+1}_text', ''), 'author': self.cleaned_data.get(f'testi{i+1}_author', '')}
                for i in range(3)
            ]

            val['homeBlogTitle'] = self.cleaned_data.get('home_blog_title', '')

            val['homeBlogSubtitle'] = self.cleaned_data.get('home_blog_subtitle', '')

            val['aboutHeroTitle'] = self.cleaned_data.get('about_hero_title', '')
            val['aboutHeroDesc'] = self.cleaned_data.get('about_hero_desc', '')
            val['founderHeroTitle'] = self.cleaned_data.get('founder_hero_title', '')
            val['founderHeroSubtitle'] = self.cleaned_data.get('founder_hero_subtitle', '')
            val['contactHeroTitle'] = self.cleaned_data.get('contact_hero_title', '')
            val['contactHeroSubtitle'] = self.cleaned_data.get('contact_hero_subtitle', '')
            val['galleryHeroTitle'] = self.cleaned_data.get('gallery_hero_title', '')
            val['galleryHeroSubtitle'] = self.cleaned_data.get('gallery_hero_subtitle', '')
            val['eventsHeroTitle'] = self.cleaned_data.get('events_hero_title', '')

            val['eventsHeroSubtitle'] = self.cleaned_data.get('events_hero_subtitle', '')

            val['aboutStoryTitle'] = self.cleaned_data.get('about_story_title', '')
            val['aboutStoryDesc1'] = self.cleaned_data.get('about_story_desc1', '')
            val['aboutStoryDesc2'] = self.cleaned_data.get('about_story_desc2', '')
            val['aboutVision'] = self.cleaned_data.get('about_vision', '')
            val['aboutMission'] = self.cleaned_data.get('about_mission', '')
            val['aboutPillarsTitle'] = self.cleaned_data.get('about_pillars_title', '')
            val['aboutPillarsDesc'] = self.cleaned_data.get('about_pillars_desc', '')
            
            val['aboutPillars'] = [
                {'icon': self.cleaned_data.get(f'about_pillar{i+1}_icon', ''), 'title': self.cleaned_data.get(f'about_pillar{i+1}_title', ''), 'text': self.cleaned_data.get(f'about_pillar{i+1}_text', '')}
                for i in range(3)
            ]

            val['founderImage'] = self.cleaned_data.get('founder_image', '')
            val['founderBioSections'] = [
                {'title': self.cleaned_data.get(f'founder_bio{i+1}_title', ''), 'text': self.cleaned_data.get(f'founder_bio{i+1}_text', ''), 'textSec': self.cleaned_data.get(f'founder_bio{i+1}_text_sec', '')}
                for i in range(2)
            ]
            val['founderStartTitle'] = self.cleaned_data.get('founder_start_title', '')
            val['founderStartText'] = self.cleaned_data.get('founder_start_text', '')
            val['founderStartQuote'] = self.cleaned_data.get('founder_start_quote', '')
            val['founderMarketTitle'] = self.cleaned_data.get('founder_market_title', '')
            val['founderMarketText'] = self.cleaned_data.get('founder_market_text', '')
            val['founderMarketQuote'] = self.cleaned_data.get('founder_market_quote', '')
            val['founderVisionTitle'] = self.cleaned_data.get('founder_vision_title', '')
            val['founderVisionText'] = self.cleaned_data.get('founder_vision_text', '')
            val['founderVisionQuote'] = self.cleaned_data.get('founder_vision_quote', '')



            instance.value = val
        elif instance.key == 'global_config':
            val = instance.value or {}
            val['bannerEnabled'] = bool(self.cleaned_data.get('ticker_enabled'))
            val['bannerText'] = self.cleaned_data.get('ticker_text', '')
            val['bannerSpeed'] = self.cleaned_data.get('ticker_speed') or 18
            instance.value = val
        if commit:
            instance.save()
        return instance


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    form = SiteSettingForm
    list_display = ('key',)
    search_fields = ('key',)

    def hero_image_preview(self, obj):
        if obj.key == 'homepage_settings' and obj.value:
            hero = obj.value.get('hero', {})
            img_url = hero.get('image_url')
            if img_url:
                return mark_safe(f'<img src="{img_url}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ccc;" />')
        return "No Hero Image Set"
    hero_image_preview.short_description = "Current Hero Image Preview"

    def features_image_preview(self, obj):
        if obj.key == 'homepage_settings' and obj.value:
            features = obj.value.get('features', {})
            img_url = features.get('image_url')
            if img_url:
                return mark_safe(f'<img src="{img_url}" style="max-height: 200px; border-radius: 8px; border: 1px solid #ccc;" />')
        return "No Features Image Set"
    features_image_preview.short_description = "Current Features Image Preview"

    def get_fieldsets(self, request, obj=None):
        if obj and obj.key == 'homepage_settings':
            return (
                (None, {
                    'fields': ('key', 'value')
                }),
                ('Hero Section Customizer', {
                    'description': 'Easily edit the Hero section of the homepage. Changes here will update the JSON values below.',
                    'fields': (
                        'hero_heading', 'hero_subheading', 'hero_body_text',
                        'hero_button_text', 'hero_button_url', 'hero_image_url_display',
                        'hero_image', 'hero_image_preview'
                    )
                }),
                ('Features Section Customizer', {
                    'description': 'The "NV NightVision Features" strip on the homepage: edit the heading, '
                                   'subheading, highlights line, center product image, and the four features cards '
                                   'around the image.',
                    'fields': (
                        'features_heading', 'features_subheading', 'features_body_text',
                        'features_image_url_display', 'features_image', 'features_image_preview',
                        'feature1_icon', 'feature1_title', 'feature1_desc',
                        'feature2_icon', 'feature2_title', 'feature2_desc',
                        'feature3_icon', 'feature3_title', 'feature3_desc',
                        'feature4_icon', 'feature4_title', 'feature4_desc',
                    )
                }),
            )
        if obj and obj.key == 'site_contents':
            return (
                (None, {
                    'fields': ('key', 'value')
                }),
                ('Homepage Feature Cards', {
                    'description': 'The four feature cards in the "NV NightVision Features" section '
                                   '(two on each side of the center image). Icon names are Material Symbols '
                                   'names, e.g. power, near_me, thunderstorm, shield.',
                    'fields': (
                        'feature1_icon', 'feature1_title', 'feature1_desc',
                        'feature2_icon', 'feature2_title', 'feature2_desc',
                        'feature3_icon', 'feature3_title', 'feature3_desc',
                        'feature4_icon', 'feature4_title', 'feature4_desc',
                    )
                }),

                ('Homepage Other Sections', {
                    'description': 'Other homepage sections.',
                    'fields': (
                        'why_tag', 'why_title', 'why_subtitle',
                        'why_feat1_val', 'why_feat1_label',
                        'why_feat2_val', 'why_feat2_label',
                        'why_feat3_val', 'why_feat3_label',
                        'why_feat4_val', 'why_feat4_label',
                        'home_founder_name', 'home_founder_tag', 'home_founder_quote', 'home_founder_desc',
                        'testimonials_title',
                        'testi1_text', 'testi1_author',
                        'testi2_text', 'testi2_author',
                        'testi3_text', 'testi3_author',
                        'home_blog_title', 'home_blog_subtitle'
                    )
                }),
                ('Social Media URLs', {
                    'description': 'Social media links used in the footer.',
                    'fields': (
                        'social_facebook', 'social_instagram', 'social_linkedin', 'social_tiktok', 'social_x', 'social_youtube'
                    )
                }),
                ('Secondary Pages Hero Texts', {
                    'description': 'Hero text and subtitle for the secondary pages.',
                    'fields': (
                        'about_hero_title', 'about_hero_desc',
                        'founder_hero_title', 'founder_hero_subtitle',
                        'contact_hero_title', 'contact_hero_subtitle',
                        'gallery_hero_title', 'gallery_hero_subtitle',
                        'events_hero_title', 'events_hero_subtitle'
                    )
                }),

                ('About Us Page Content', {
                    'description': 'Content for the About Us page.',
                    'fields': (
                        'about_story_title', 'about_story_desc1', 'about_story_desc2',
                        'about_vision', 'about_mission',
                        'about_pillars_title', 'about_pillars_desc',
                        'about_pillar1_icon', 'about_pillar1_title', 'about_pillar1_text',
                        'about_pillar2_icon', 'about_pillar2_title', 'about_pillar2_text',
                        'about_pillar3_icon', 'about_pillar3_title', 'about_pillar3_text'
                    )
                }),
                ('About CEO / Founder Content', {
                    'description': 'Content for the About CEO (Founder) page.',
                    'fields': (
                        'founder_image',
                        'founder_bio1_title', 'founder_bio1_text', 'founder_bio1_text_sec',
                        'founder_bio2_title', 'founder_bio2_text', 'founder_bio2_text_sec',
                        'founder_start_title', 'founder_start_text', 'founder_start_quote',
                        'founder_market_title', 'founder_market_text', 'founder_market_quote',
                        'founder_vision_title', 'founder_vision_text', 'founder_vision_quote'
                    )
                }),
            )
        if obj and obj.key == 'global_config':
            return (
                (None, {
                    'fields': ('key', 'value')
                }),
                ('Scrolling Announcement Ticker', {
                    'description': 'The scrolling marquee bar shown just below the homepage hero section. '
                                   'Changes here update the JSON values above (bannerText / bannerEnabled / bannerSpeed).',
                    'fields': ('ticker_enabled', 'ticker_text', 'ticker_speed'),
                }),
            )
        return (
            (None, {
                'fields': ('key', 'value')
            }),
        )

    def get_readonly_fields(self, request, obj=None):
        if obj and obj.key == 'homepage_settings':
            return ('hero_image_preview', 'features_image_preview')
        return ()

@admin.register(RobotsTxtConfig)
class RobotsTxtConfigAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not RobotsTxtConfig.objects.exists()


