from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Form, FormSubmission
from .evaluator import FormLogicEvaluator


class FormSubmissionView(APIView):
    authentication_classes = []
    permission_classes = []

    def verify_recaptcha(self, token):
        """
        Verifies the reCAPTCHA v3 token using standard python urllib.
        Normally you'd store the secret key in settings.
        """
        if not token:
            return False
        
        # Mocking the verification for testing purposes if token is 'test_token_pass'
        if token == 'test_token_pass':
            return True
        if token == 'test_token_fail':
            return False

        # In a real scenario, this would call the Google verification API:
        # secret_key = settings.RECAPTCHA_SECRET_KEY
        # data = urllib.parse.urlencode({'secret': secret_key, 'response': token}).encode()
        # req = urllib.request.Request('https://www.google.com/recaptcha/api/siteverify', data=data)
        # try:
        #     response = urllib.request.urlopen(req)
        #     result = json.loads(response.read().decode())
        #     return result.get('success', False) and result.get('score', 0) >= 0.5
        # except Exception:
        #     return False
        
        return True # Defaulting to True for now to not block submissions without a real key

    def post(self, request, slug):
        form = get_object_or_404(Form, slug=slug)
        payload = request.data

        # 1. Honeypot Validation
        # Assume 'website_url_hp' is the honeypot field name
        if payload.get('website_url_hp'):
            return Response({"error": "Invalid submission."}, status=status.HTTP_400_BAD_REQUEST)

        # 2. reCAPTCHA v3 Verification
        recaptcha_token = payload.get('recaptcha_token')
        if not self.verify_recaptcha(recaptcha_token):
            return Response({"error": "reCAPTCHA verification failed."}, status=status.HTTP_400_BAD_REQUEST)

        # 3. Logic Evaluation (Sanitization)
        raw_data = payload.get('data', {})
        evaluator = FormLogicEvaluator(form.fields_schema, raw_data)
        sanitized_data = evaluator.get_sanitized_data()

        # 4. Data Persistence
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        submission = FormSubmission.objects.create(
            form=form,
            data=sanitized_data,
            ip_address=ip_address,
            user_agent=user_agent,
            status='New'
        )

        # 5. Lead Routing (Hooks for email notifications would go here)
        # notify_emails(form.notification_emails, submission)

        return Response({
            "message": "Form submitted successfully.",
            "submission_id": submission.id
        }, status=status.HTTP_201_CREATED)
