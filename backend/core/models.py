from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class SEOAbstractModel(models.Model):
    """
    Abstract base model containing common SEO metadata. 
    Inherited by all content types to ensure consistent SEO optimization.
    """
    seo_title = models.CharField(_('SEO Title'), max_length=60, blank=True, 
                                 help_text=_('Max 60 characters for optimal search engine display.'))
    meta_description = models.CharField(_('Meta Description'), max_length=160, blank=True, 
                                        help_text=_('Max 160 characters.'))
    focus_keyword = models.CharField(_('Focus Keyword'), max_length=255, blank=True)
    canonical_url = models.URLField(_('Canonical URL'), blank=True, null=True, 
                                    help_text=_('Optional. Used to avoid duplicate content issues.'))
    
    # Crawling Directives
    no_index = models.BooleanField(_('No Index'), default=False, 
                                   help_text=_('Ask search engines not to index this page.'))
    no_follow = models.BooleanField(_('No Follow'), default=False, 
                                    help_text=_('Ask search engines not to follow links on this page.'))
    
    # Open Graph (Social Media)
    og_title = models.CharField(_('Open Graph Title'), max_length=100, blank=True)
    og_description = models.CharField(_('Open Graph Description'), max_length=200, blank=True)
    og_image = models.ImageField(_('Open Graph Image'), upload_to='seo/og_images/', blank=True, null=True)
    
    # Schema Override (JSON-LD)
    schema_override = models.TextField(
        _('JSON-LD Schema Override'), 
        blank=True, 
        help_text=_('Provide custom JSON-LD schema. Leaving it blank will generate the default schema.')
    )

    class Meta:
        abstract = True


class Category(SEOAbstractModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=120)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(SEOAbstractModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    image = models.ImageField(_('Product Image'), upload_to='products/', blank=True, null=True)
    
    # Pricing & E-Commerce
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(_('Discount Percentage'), max_digits=5, decimal_places=2, default=0.00, 
                                   help_text=_('e.g. 15.00 for 15% discount'))
    
    STOCK_STATUS_CHOICES = [
        ('in_stock', 'In Stock'),
        ('out_of_stock', 'Out of Stock'),
        ('pre_order', 'Pre-Order'),
    ]
    stock_status = models.CharField(max_length=20, choices=STOCK_STATUS_CHOICES, default='in_stock')
    
    # Complex Data Fields (Leveraging PostgreSQL JSONField)
    technical_specifications = models.JSONField(
        default=dict, 
        blank=True, 
        help_text=_('Store specs as Key-Value pairs: {"resolution": "4K", "lens": "2.8mm"}')
    )
    faq_builder = models.JSONField(
        default=list, 
        blank=True, 
        help_text=_('Nested Array of FAQs: [{"question": "...", "answer": "..."}]')
    )
    
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BlogPost(SEOAbstractModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    
    # Foreign Keys
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='blog_posts')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='blog_posts')
    
    # Content
    content = models.TextField(help_text=_('Rich Text Content for the blog post.')) 
    faq_builder = models.JSONField(
        default=list, 
        blank=True, 
        help_text=_('Nested Array of FAQs: [{"question": "...", "answer": "..."}]')
    )
    
    # Timestamps
    date_published = models.DateTimeField(_('Date Published'), 
                                          help_text=_('Editable to preserve historical legacy timestamps for SEO rankings.'))
    date_modified = models.DateTimeField(_('Date Modified'), auto_now=True)

    def __str__(self):
        return self.title


class Event(SEOAbstractModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    description = models.TextField(blank=True)
    
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class Dealer(SEOAbstractModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    
    # Location details
    province = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    
    # Optional metadata
    email = models.EmailField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class QuoteRequest(models.Model):
    property_type = models.CharField(max_length=50)
    camera_quantity = models.CharField(max_length=20)
    coverage_type = models.CharField(max_length=50)
    client_name = models.CharField(max_length=100)
    client_phone = models.CharField(max_length=20)
    client_email = models.EmailField()
    additional_notes = models.TextField(blank=True)
    recommended_package = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quote Request #{self.id} - {self.client_name} ({self.property_type})"


import os
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.exceptions import ValidationError
from django.utils.text import slugify

class MediaAsset(models.Model):
    title = models.CharField(max_length=200, blank=True, help_text="Optional asset identifier")
    file = models.ImageField(upload_to='assets/', help_text="Upload raw image (PNG, JPG, JPEG, WEBP)")
    alt_text = models.CharField(max_length=255, help_text="Critical SEO ALT description. Cannot be empty.")
    ASSET_TYPE_CHOICES = [
        ('general', 'General'),
        ('hero', 'Hero Layout (Max 500KB)'),
        ('product', 'Product (Min 800x800, Max 200KB)')
    ]
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPE_CHOICES, default='general', help_text="Determine optimization ceilings and dimension constraints.")
    srcset_data = models.JSONField(default=dict, blank=True, help_text="Stores relative paths for 400w, 800w, and 1200w variants")

    def clean(self):
        super().clean()
        if not self.alt_text or not self.alt_text.strip():
            raise ValidationError({'alt_text': "ALT text is mandatory for SEO and accessibility compliance."})

    def save(self, *args, **kwargs):
        self.clean()
        if self.file:
            try:
                img = Image.open(self.file)
                img.load()
            except Exception as e:
                raise ValidationError("Failed to open image file. Ensure it is a valid image type.")

            original_filename = os.path.basename(self.file.name)
            name_without_ext, _ = os.path.splitext(original_filename)
            normalized_name = slugify(name_without_ext)
            if not normalized_name:
                normalized_name = "security-asset"
            new_filename = f"{normalized_name}.webp"

            max_size_kb = 500 if self.asset_type == 'hero' else 200
            max_size_bytes = max_size_kb * 1024

            if self.asset_type == 'product':
                if img.width < 800 or img.height < 800:
                    raise ValidationError("Product images must have dimensions of at least 800x800px to meet Core Web Vitals clarity standards.")

            quality = 85
            webp_io = io.BytesIO()

            # WebP supports alpha, so keep transparency instead of flattening
            # onto a white background (which ruins hero/product cutout images).
            has_alpha = img.mode in ('RGBA', 'LA') or \
                (img.mode == 'P' and 'transparency' in img.info)
            img_rgb = img.convert('RGBA') if has_alpha else img.convert('RGB')

            img_rgb.save(webp_io, format='WEBP', quality=quality, optimize=True)
            
            while webp_io.tell() > max_size_bytes and quality > 30:
                quality -= 10
                webp_io = io.BytesIO()
                img_rgb.save(webp_io, format='WEBP', quality=quality, optimize=True)

            file_size_bytes = webp_io.tell()
            if file_size_bytes > max_size_bytes:
                raise ValidationError(
                    f"Optimized image size ({file_size_bytes / 1024:.1f} KB) exceeds the maximum allowed ceiling cap for "
                    f"{'hero' if self.asset_type == 'hero' else 'standard'} layouts ({max_size_kb} KB). Please upload a smaller or pre-compressed image."
                )

            # Re-wrap in Django ContentFile
            self.file = ContentFile(webp_io.getvalue(), name=new_filename)
            
        super().save(*args, **kwargs)
        
        if self.file:
            self.generate_srcset_images()

    def generate_srcset_images(self):
        original_path = self.file.name
        base_dir = os.path.dirname(original_path)
        filename = os.path.basename(original_path)
        name_without_ext, ext = os.path.splitext(filename)
        
        try:
            with default_storage.open(original_path, 'rb') as f:
                img = Image.open(f)
                img.load()
        except Exception as e:
            print(f"Error opening saved image for srcset generation: {e}")
            return

        widths = [400, 800, 1200]
        srcset_paths = {}

        # Preserve transparency in responsive variants too (WebP supports alpha).
        has_alpha = img.mode in ('RGBA', 'LA') or \
            (img.mode == 'P' and 'transparency' in img.info)
        img_rgb = img.convert('RGBA') if has_alpha else img.convert('RGB')

        for w in widths:
            aspect_ratio = img_rgb.height / img_rgb.width
            h = int(w * aspect_ratio)
            resized_img = img_rgb.resize((w, h), Image.Resampling.LANCZOS)
            
            resized_io = io.BytesIO()
            resized_img.save(resized_io, format='WEBP', quality=80, optimize=True)
            
            resized_filename = f"{name_without_ext}-{w}w.webp"
            resized_path = os.path.join(base_dir, resized_filename).replace('\\', '/')
            
            if default_storage.exists(resized_path):
                default_storage.delete(resized_path)
            
            default_storage.save(resized_path, ContentFile(resized_io.getvalue()))
            srcset_paths[f"{w}w"] = default_storage.url(resized_path)

        MediaAsset.objects.filter(id=self.id).update(srcset_data=srcset_paths)
        self.srcset_data = srcset_paths

    def __str__(self):
        return self.title or os.path.basename(self.file.name)


class PasswordResetOTP(models.Model):
    """Server-side one-time codes for the SPA password-reset flow.

    The code itself is never stored — only its hash. Codes expire after
    EXPIRY_MINUTES and allow at most MAX_ATTEMPTS verification tries.
    """
    EXPIRY_MINUTES = 10
    MAX_ATTEMPTS = 5

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='password_reset_otps')
    code_hash = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    attempts = models.PositiveSmallIntegerField(default=0)

    def is_expired(self):
        from django.utils import timezone
        from datetime import timedelta
        return timezone.now() > self.created_at + timedelta(minutes=self.EXPIRY_MINUTES)

    def __str__(self):
        return f"Password reset code for {self.user} ({self.created_at:%Y-%m-%d %H:%M})"


class SiteSetting(models.Model):
    key = models.CharField(max_length=100, unique=True, help_text="e.g. 'site_contents' or 'global_config'")
    value = models.JSONField(default=dict)

    def __str__(self):
        return self.key


from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Product)
def sync_product_image_to_media_asset(sender, instance, created, **kwargs):
    if instance.image:
        image_name = instance.image.name
        # If the image path is already inside the optimized assets folder, we don't need to optimize it again
        if image_name.startswith('assets/'):
            return
            
        # Check if a MediaAsset already exists for this product name
        asset = MediaAsset.objects.filter(title=f"Product: {instance.name}").first()
        if asset and asset.file.name != image_name:
            # The image was changed! Let's update the file
            asset.file = instance.image
            asset.save() # This triggers the optimization pipeline on the new image!
        elif not asset:
            alt_text = f"{instance.name} - NightVision CCTV Camera"
            if instance.category:
                alt_text += f" - {instance.category.name}"
            
            # Create a MediaAsset record. This will run the optimization pipeline, WebP conversion, size check, and srcset generation!
            asset = MediaAsset.objects.create(
                title=f"Product: {instance.name}",
                file=instance.image,
                alt_text=alt_text,
                asset_type='product',
            )
        
        # Update the product's image field to point to the optimized MediaAsset file path
        # We use .update() to avoid triggering the post_save signal recursively!
        Product.objects.filter(id=instance.id).update(image=asset.file.name)


from django.contrib.redirects.models import Redirect

class RedirectExtension(models.Model):
    """
    Extension to the built-in django.contrib.redirects.models.Redirect
    to support active/inactive toggles without migrating built-in tables.
    """
    redirect = models.OneToOneField(Redirect, on_delete=models.CASCADE, related_name='extension')
    is_active = models.BooleanField(default=True, help_text=_('Toggle to temporarily disable this redirect.'))

    def __str__(self):
        return f"Extension for {self.redirect.old_path}"


class RobotsTxtConfig(models.Model):
    content = models.TextField(
        default="User-agent: *\nDisallow: /admin/\nDisallow: /api/\nDisallow: /search/?q=\n",
        help_text="The contents of your robots.txt file. Ensure you do not block the entire site accidentally."
    )

    class Meta:
        verbose_name = "Robots.txt Configuration"
        verbose_name_plural = "Robots.txt Configuration"

    def clean(self):
        super().clean()
        lines = [line.strip() for line in self.content.splitlines()]
        if 'Disallow: /' in lines:
            raise ValidationError({'content': "CRITICAL WARNING: 'Disallow: /' will de-index the entire site! If you intend to do this, use the Staging environment configuration instead."})

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('premium-cameras', 'Premium Cameras'),
        ('control-centers', 'Control Rooms'),
        ('thermal-ir', 'Thermal / IR'),
        ('enterprise-installations', 'Enterprise Installations')
    ]
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='premium-cameras')
    model_name = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    resolution = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, blank=True, default='ACTIVE - SECURED')
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True, help_text="Upload gallery image here.")

    def __str__(self):
        return self.title
