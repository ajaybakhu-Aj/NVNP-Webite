from django.core.management.base import BaseCommand, CommandError
from django.db import connection
from django.core.cache import cache
from django.core.files.storage import default_storage
from django.conf import settings
from django.core.files.base import ContentFile


class Command(BaseCommand):
    help = 'Runs end-to-end sanity verifications across CMS subsystems'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING('Starting CMS Health Check...'))
        
        has_critical_failure = False

        # 1. Database Check
        try:
            connection.ensure_connection()
            self.stdout.write(self.style.SUCCESS('[OK] Database connection'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'[FAIL] Database connection: {e}'))
            has_critical_failure = True
            
        # 2. Redis/Cache Check
        try:
            cache.set('cms_health_check_ping', 'pong', timeout=10)
            if cache.get('cms_health_check_ping') == 'pong':
                self.stdout.write(self.style.SUCCESS('[OK] Redis cache ping'))
            else:
                self.stdout.write(self.style.ERROR('[FAIL] Redis cache read/write mismatch'))
                has_critical_failure = True
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'[FAIL] Redis cache connection: {e}'))
            has_critical_failure = True

        # 3. Media Storage Check
        try:
            path = default_storage.save('health_check.txt', ContentFile(b'test'))
            if default_storage.exists(path):
                default_storage.delete(path)
                self.stdout.write(self.style.SUCCESS('[OK] Media storage writable'))
            else:
                self.stdout.write(self.style.ERROR('[FAIL] Media storage file missing after write'))
                has_critical_failure = True
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'[FAIL] Media storage access: {e}'))
            has_critical_failure = True
            
        # 4. Pillow (Webp) Check
        try:
            from PIL import features
            try:
                has_webp = features.check_feature('webp')
            except ValueError:
                has_webp = False
                
            if has_webp:
                self.stdout.write(self.style.SUCCESS('[OK] Pillow webp support'))
            else:
                self.stdout.write(self.style.WARNING('[WARN] Pillow webp support missing'))
        except ImportError:
            self.stdout.write(self.style.WARNING('[WARN] Pillow library missing'))

        # 5. Headless Webhooks Check
        frontend_url = getattr(settings, 'FRONTEND_URL', None)
        if frontend_url:
            self.stdout.write(self.style.SUCCESS(f'[OK] Headless integration (FRONTEND_URL: {frontend_url})'))
        else:
            self.stdout.write(self.style.WARNING('[WARN] Headless FRONTEND_URL is not set'))

        # 6. Analytics Check
        gsc_creds = getattr(settings, 'GOOGLE_SERVICE_ACCOUNT_JSON', None)
        if gsc_creds:
            self.stdout.write(self.style.SUCCESS('[OK] Google Analytics credentials configured'))
        else:
            self.stdout.write(self.style.WARNING('[WARN] Google Analytics credentials missing (GOOGLE_SERVICE_ACCOUNT_JSON)'))

        # Finish
        if has_critical_failure:
            self.stdout.write(self.style.ERROR('\nCMS Health Check failed with critical errors.'))
            raise CommandError('CMS Health Check Failed')
        else:
            self.stdout.write(self.style.SUCCESS('\nCMS Health Check passed! System is ready.'))
