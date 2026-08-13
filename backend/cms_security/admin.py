from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import User, Group
from .models import AuditLog, UserRoleProfile


# We don't need Django Groups anymore if we are moving to strict Role Profile check.
admin.site.unregister(Group)


class UserRoleProfileInline(admin.StackedInline):
    model = UserRoleProfile
    can_delete = False
    verbose_name_plural = 'Role Assignment'


class CustomUserAdmin(DefaultUserAdmin):
    inlines = (UserRoleProfileInline, )
    
    def get_fieldsets(self, request, obj=None):
        # We want to remove 'groups' and 'user_permissions' from the default fieldsets.
        fieldsets = super().get_fieldsets(request, obj)
        
        new_fieldsets = []
        for name, opts_dict in fieldsets:
            fields = opts_dict.get('fields', ())
            # Filter out groups and user_permissions
            fields = tuple(f for f in fields if f not in ('groups', 'user_permissions'))
            if fields:
                opts_dict['fields'] = fields
                new_fieldsets.append((name, opts_dict))
                
        return tuple(new_fieldsets)


# Unregister default user and register custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'actor', 'action', 'target_model', 'ip_address')
    list_filter = ('action', 'timestamp')
    search_fields = ('actor__username', 'target_model', 'ip_address')
    readonly_fields = ('actor', 'action', 'target_model', 'ip_address', 'timestamp')
    
    def has_add_permission(self, request):
        return False
        
    def has_delete_permission(self, request, obj=None):
        return False
        
    def has_change_permission(self, request, obj=None):
        return False
