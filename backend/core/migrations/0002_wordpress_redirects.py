from django.db import migrations

def populate_legacy_redirects(apps, schema_editor):
    """
    Migration deployment script: Pre-populates the database redirects table
    with hardcoded cleanups to preserve core search indexing authority.
    """
    Redirect = apps.get_model('redirects', 'Redirect')
    Site = apps.get_model('sites', 'Site')
    
    # Fetch or construct default Site object
    site, created = Site.objects.get_or_create(
        domain='nightvision.com', 
        defaults={'name': 'Nightvision'}
    )
    
    # 1. Hardcoded structural cleanups
    redirects_map = {
        '/our-products/': '/products/',
        '/our-dealers/': '/dealers/',
        '/shop/': '/products/',
    }
    
    # Apply to Redirects database model
    for old_path, new_path in redirects_map.items():
        Redirect.objects.update_or_create(
            site=site,
            old_path=old_path,
            defaults={'new_path': new_path}
        )

class Migration(migrations.Migration):
    dependencies = [
        # Adjust dependency to your app's actual initial migration file name
        ('core', '0001_initial'),
        ('redirects', '0001_initial'),
        ('sites', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_legacy_redirects),
    ]
