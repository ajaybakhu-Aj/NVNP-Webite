from django.db import models
from django.contrib.auth.models import User


class RoleChoices(models.TextChoices):
    SUPER_ADMIN = 'SuperAdmin', 'Super Admin'
    EDITOR = 'Editor', 'Editor'
    AUTHOR = 'Author', 'Author'
    CONTRIBUTOR = 'Contributor', 'Contributor'
    SALES_SUPPORT = 'SalesSupport', 'Sales Support'
    SEO_MANAGER = 'SEOManager', 'SEO Manager'


class UserRoleProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='role_profile')
    role = models.CharField(
        max_length=50,
        choices=RoleChoices.choices,
        null=True,
        blank=True,
        help_text="Designates the user's operational role within the CMS."
    )

    def __str__(self):
        return f"{self.user.username} - {self.role or 'No Role'}"


class AuditLog(models.Model):
    """
    System-wide Audit Log tracking administrative changes and login attempts.
    """
    ACTION_CHOICES = (
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
        ('LOGIN_SUCCESS', 'Login Success'),
        ('LOGIN_FAILED', 'Login Failed'),
    )

    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='audit_logs')
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    target_model = models.CharField(max_length=255, blank=True, null=True, help_text="E.g. Product:123")
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        actor_name = self.actor.username if self.actor else "System/Anonymous"
        return f"{self.timestamp} - {actor_name} - {self.action} - {self.target_model}"
