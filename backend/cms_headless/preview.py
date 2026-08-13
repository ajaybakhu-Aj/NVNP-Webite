import jwt
import datetime
from django.conf import settings


def generate_preview_token(user):
    """
    Generates a short-lived JWT for Next.js preview drafts.
    """
    payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=5),
        'iat': datetime.datetime.now(datetime.timezone.utc)
    }
    
    # Get role if RBAC is installed
    if hasattr(user, 'role_profile'):
        payload['role'] = user.role_profile.role
        
    token = jwt.encode(payload, settings.PREVIEW_JWT_SECRET, algorithm='HS256')
    return token


def validate_preview_token(token):
    """
    Validates the JWT token and returns payload.
    """
    try:
        payload = jwt.decode(token, settings.PREVIEW_JWT_SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
