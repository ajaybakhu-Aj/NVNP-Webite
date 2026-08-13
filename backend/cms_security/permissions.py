from rest_framework.permissions import BasePermission
from .models import RoleChoices


class HasRolePermission(BasePermission):
    """
    Custom DRF Permission to check if user has one of the allowed roles.
    SuperAdmin has access to everything.
    """
    # Optional default roles to allow if used generically, but usually passed via init
    allowed_roles = []

    def __init__(self, allowed_roles=None):
        if allowed_roles is not None:
            self.allowed_roles = allowed_roles
            
    def __call__(self):
        # DRF expects permission classes to be instantiable without args when passed as class references,
        # so we return ourselves. But for parameterized usage we return an instance.
        return self

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
            
        # If view has a specific `allowed_roles` attribute, override.
        roles = getattr(view, 'allowed_roles', self.allowed_roles)
            
        try:
            profile = request.user.role_profile
            user_role = profile.role
        except AttributeError:
            user_role = None
            
        if user_role == RoleChoices.SUPER_ADMIN:
            return True
            
        if user_role and user_role in roles:
            return True
            
        return False
