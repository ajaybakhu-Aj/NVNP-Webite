import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from cms_core.models import Page
from .models import ContentRevision
from .services import SnapshotService
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='tester', password='password')
    client.login(username='tester', password='password')
    return client


@pytest.fixture
def sample_page():
    return Page.objects.create(
        title="Original Title",
        slug="original-title",
        seo_title="Original SEO",
        is_published=True
    )


@pytest.mark.django_db
class TestSnapshotService:
    def test_auto_snapshot_on_save(self, sample_page):
        # sample_page creation should have triggered the signal
        content_type = ContentType.objects.get_for_model(Page)
        revisions = ContentRevision.objects.filter(content_type=content_type, object_id=sample_page.id)
        
        assert revisions.count() == 1
        rev = revisions.first()
        assert rev.version_number == 1
        assert rev.snapshot['title'] == "Original Title"

    def test_snapshot_restore(self, sample_page):
        # Get the first revision
        content_type = ContentType.objects.get_for_model(Page)
        rev1 = ContentRevision.objects.get(content_type=content_type, object_id=sample_page.id)

        # Modify the page and save it (triggers second snapshot)
        sample_page.title = "Modified Title"
        sample_page.slug = "modified-title"
        sample_page.save()

        assert ContentRevision.objects.filter(content_type=content_type, object_id=sample_page.id).count() == 2

        # Restore to first revision
        restored_page = SnapshotService.restore_snapshot(rev1.id)
        
        assert restored_page.title == "Original Title"
        assert restored_page.slug == "original-title"


@pytest.mark.django_db
class TestRevisionRestoreAPI:
    def test_restore_endpoint(self, api_client, sample_page):
        content_type = ContentType.objects.get_for_model(Page)
        rev1 = ContentRevision.objects.get(content_type=content_type, object_id=sample_page.id)

        # Modify page
        sample_page.title = "Hacked Title"
        sample_page.save()
        assert sample_page.title == "Hacked Title"

        url = reverse('revision-restore', kwargs={'id': rev1.id})
        response = api_client.post(url, format='json')

        assert response.status_code == 200
        
        # Check DB
        sample_page.refresh_from_db()
        assert sample_page.title == "Original Title"
