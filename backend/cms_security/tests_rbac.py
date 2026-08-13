import pytest
from django.contrib.auth import get_user_model
from django.urls import path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.test import APIClient
from .models import RoleChoices
from .permissions import HasRolePermission


User = get_user_model()


# Mock view for testing permissions
class MockSalesView(APIView):
    permission_classes = [HasRolePermission]
    allowed_roles = [RoleChoices.SALES_SUPPORT]

    def get(self, request):
        return Response({"status": "ok"})


urlpatterns = [
    path('test-sales/', MockSalesView.as_view(), name='test-sales'),
]


@pytest.fixture
def api_client():
    return APIClient()


@pytest.mark.django_db
class TestRBACSystem:

    def test_user_profile_auto_created(self):
        user = User.objects.create_user(username='new_user', password='password123')
        assert hasattr(user, 'role_profile')
        assert user.role_profile.role is None

    def test_has_role_permission_denied_for_no_role(self, api_client):
        user = User.objects.create_user(username='no_role', password='password123')
        api_client.force_authenticate(user=user)
        
        # Create a request object mock
        view = MockSalesView()
        # Test directly or via test client if url is mocked
        # We can just test the permission class directly
        class MockRequest:
            def __init__(self, user):
                self.user = user
                
        perm = HasRolePermission()
        assert not perm.has_permission(MockRequest(user), view)

    def test_has_role_permission_denied_for_wrong_role(self):
        user = User.objects.create_user(username='editor_user', password='password123')
        user.role_profile.role = RoleChoices.EDITOR
        user.role_profile.save()
        
        view = MockSalesView()
        class MockRequest:
            def __init__(self, user):
                self.user = user
                
        perm = HasRolePermission()
        assert not perm.has_permission(MockRequest(user), view)

    def test_has_role_permission_granted_for_correct_role(self):
        user = User.objects.create_user(username='sales_user', password='password123')
        user.role_profile.role = RoleChoices.SALES_SUPPORT
        user.role_profile.save()
        
        view = MockSalesView()
        class MockRequest:
            def __init__(self, user):
                self.user = user
                
        perm = HasRolePermission()
        assert perm.has_permission(MockRequest(user), view)

    def test_has_role_permission_granted_for_superadmin(self):
        user = User.objects.create_user(username='superadmin', password='password123')
        user.role_profile.role = RoleChoices.SUPER_ADMIN
        user.role_profile.save()
        
        view = MockSalesView()
        class MockRequest:
            def __init__(self, user):
                self.user = user
                
        perm = HasRolePermission()
        assert perm.has_permission(MockRequest(user), view)
