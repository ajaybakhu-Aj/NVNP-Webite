import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Form, FormSubmission
from .evaluator import FormLogicEvaluator
from django.contrib.auth.models import User


@pytest.fixture
def api_client():
    client = APIClient()
    user = User.objects.create_user(username='tester', password='password')
    client.login(username='tester', password='password')
    return client


@pytest.fixture
def sample_form():
    # A form with a conditional field that only shows if is_company == 'Yes'
    fields_schema = [
        {"name": "name"},
        {"name": "is_company"},
        {
            "name": "company_name", 
            "conditional_logic": {
                "action": "show",
                "match": "all",
                "rules": [
                    {"field": "is_company", "operator": "equals", "value": "Yes"}
                ]
            }
        }
    ]
    return Form.objects.create(
        title="Contact Form",
        slug="contact",
        fields_schema=fields_schema
    )


@pytest.mark.django_db
class TestFormLogicEvaluator:
    def test_conditional_hide(self, sample_form):
        # 'company_name' should be stripped out because is_company is not 'Yes'
        data = {
            "name": "John Doe",
            "is_company": "No",
            "company_name": "Hidden Corp"
        }
        evaluator = FormLogicEvaluator(sample_form.fields_schema, data)
        sanitized = evaluator.get_sanitized_data()
        
        assert "name" in sanitized
        assert "is_company" in sanitized
        assert "company_name" not in sanitized

    def test_conditional_show(self, sample_form):
        # 'company_name' should be kept because is_company is 'Yes'
        data = {
            "name": "Jane Doe",
            "is_company": "Yes",
            "company_name": "Visible Corp"
        }
        evaluator = FormLogicEvaluator(sample_form.fields_schema, data)
        sanitized = evaluator.get_sanitized_data()
        
        assert "name" in sanitized
        assert "is_company" in sanitized
        assert "company_name" in sanitized


@pytest.mark.django_db
class TestFormSubmissionAPI:
    def test_successful_submission(self, api_client, sample_form):
        url = reverse('form-submit', kwargs={'slug': 'contact'})
        payload = {
            "recaptcha_token": "test_token_pass",
            "data": {
                "name": "Test User",
                "is_company": "No",
                "company_name": "Should Be Stripped"
            }
        }
        response = api_client.post(url, payload, format='json')
        assert response.status_code == 201
        assert FormSubmission.objects.count() == 1
        submission = FormSubmission.objects.first()
        assert submission.status == 'New'
        assert "company_name" not in submission.data

    def test_honeypot_blocking(self, api_client, sample_form):
        url = reverse('form-submit', kwargs={'slug': 'contact'})
        payload = {
            "recaptcha_token": "test_token_pass",
            "website_url_hp": "http://spam.com", # Honeypot filled out
            "data": {"name": "Spammer"}
        }
        response = api_client.post(url, payload, format='json')
        assert response.status_code == 400
        assert FormSubmission.objects.count() == 0

    def test_recaptcha_blocking(self, api_client, sample_form):
        url = reverse('form-submit', kwargs={'slug': 'contact'})
        payload = {
            "recaptcha_token": "test_token_fail", # Fails reCAPTCHA
            "data": {"name": "Bot"}
        }
        response = api_client.post(url, payload, format='json')
        assert response.status_code == 400
        assert FormSubmission.objects.count() == 0
