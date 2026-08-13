import pytest
from cms_core.models import DummyPage

@pytest.mark.django_db
class TestSluggedModel:
    def test_slug_generation_from_title(self):
        """
        Test that a slug is automatically generated from the title field.
        """
        page = DummyPage.objects.create(title="Hello World")
        assert page.slug == "hello-world"

    def test_slug_collision_prevention(self):
        """
        Test that duplicate titles result in unique slugs by appending an integer.
        """
        page1 = DummyPage.objects.create(title="Test Collision")
        page2 = DummyPage.objects.create(title="Test Collision")
        page3 = DummyPage.objects.create(title="Test Collision")

        assert page1.slug == "test-collision"
        assert page2.slug == "test-collision-1"
        assert page3.slug == "test-collision-2"

    def test_custom_slug_respect(self):
        """
        Test that providing a custom slug overrides the auto-generation.
        """
        page = DummyPage.objects.create(title="My Normal Title", slug="my-custom-slug")
        assert page.slug == "my-custom-slug"

    def test_slug_collision_with_custom_slug(self):
        """
        Test that providing a custom slug that already exists triggers collision handling.
        """
        DummyPage.objects.create(title="First", slug="first-slug")
        page2 = DummyPage.objects.create(title="Second", slug="first-slug")
        assert page2.slug == "first-slug-1"


@pytest.mark.django_db
class TestTimeStampedModel:
    def test_timestamp_auto_fields(self):
        """
        Test that created_at and updated_at are populated.
        """
        page = DummyPage.objects.create(title="Time Stamp Test")
        assert page.created_at is not None
        assert page.updated_at is not None
        assert not page.is_published
        assert page.published_at is None
