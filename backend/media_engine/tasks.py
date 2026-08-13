import os
from PIL import Image
# Register avif opener if not already registered by pillow-avif-plugin
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from io import BytesIO
from .models import MediaAsset


def optimize_image_task(asset_id):
    """
    Asynchronous task to process an uploaded MediaAsset.
    Generates WebP and AVIF formats in responsive widths.
    """
    try:
        asset = MediaAsset.objects.get(id=asset_id)
    except MediaAsset.DoesNotExist:
        return "Asset not found"

    # Only process if it's an image
    if not asset.mime_type.startswith('image/'):
        return "Not an image"

    original_path = asset.file.path
    if not os.path.exists(original_path):
        return "Original file missing"

    widths = [400, 800, 1200]
    formats = [('webp', 'WEBP'), ('avif', 'AVIF')]
    srcset = {}

    try:
        with Image.open(original_path) as img:
            # Ensure image is in RGB mode (e.g. converting from RGBA or P)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            base_name, _ = os.path.splitext(os.path.basename(original_path))
            relative_dir = os.path.dirname(asset.file.name)

            for width in widths:
                # If original is smaller than target width, skip upscaling
                if img.width <= width:
                    target_width = img.width
                    target_height = img.height
                    resized_img = img
                else:
                    # Calculate aspect ratio
                    aspect_ratio = img.height / img.width
                    target_height = int(width * aspect_ratio)
                    resized_img = img.resize((width, target_height), Image.Resampling.LANCZOS)

                # Generate both formats
                for ext, fmt in formats:
                    output_io = BytesIO()
                    # Save to BytesIO
                    resized_img.save(output_io, format=fmt, quality=80)
                    
                    # Construct path: assets/YYYY/MM/basename-400w.webp
                    new_filename = f"{base_name}-{width}w.{ext}"
                    new_relative_path = os.path.join(relative_dir, new_filename)
                    
                    # Save to storage
                    saved_path = default_storage.save(new_relative_path, ContentFile(output_io.getvalue()))
                    
                    # Store URL in srcset dictionary
                    if str(width) not in srcset:
                        srcset[str(width)] = {}
                    srcset[str(width)][ext] = default_storage.url(saved_path)

    except Exception as e:
        return f"Failed to process image: {str(e)}"

    asset.srcset_paths = srcset
    asset.save(update_fields=['srcset_paths'])
    
    return "Success"
