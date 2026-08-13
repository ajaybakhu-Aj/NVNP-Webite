import os
import json
from django.conf import settings
from openai import OpenAI


class AIAssistantService:
    """
    Service for generative AI functionalities inside the CMS.
    Utilizes the OpenAI SDK (GPT-4o / GPT-4o-mini).
    """
    
    def __init__(self):
        self.api_key = getattr(settings, 'OPENAI_API_KEY', os.environ.get('OPENAI_API_KEY'))
        # During testing, client might not be fully initialized if key is dummy
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def generate_meta_description(self, content_body: str, focus_keyword: str) -> str:
        """
        Generates a compelling SEO meta description under 160 chars.
        """
        if not self.client or self.api_key == 'dummy-key-for-testing':
            return f"Mock meta description focusing on {focus_keyword}"
            
        prompt = f"""
        Write a compelling SEO meta description for the following content. 
        It must be strictly under 160 characters and naturally include the focus keyword: '{focus_keyword}'.
        
        Content:
        {content_body[:2000]}  # Truncated to save tokens if massive
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert SEO copywriter. Only return the meta description text. No quotes, no intro."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=60,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()

    def suggest_alt_text(self, image_url: str) -> str:
        """
        Uses Vision capabilities to describe an image for WCAG compliance (alt text).
        """
        if not self.client or self.api_key == 'dummy-key-for-testing':
            return "A descriptive placeholder for the image alt text."
            
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": "You are an accessibility expert. Write a concise, descriptive alt text for this image suitable for screen readers. No quotes, no 'image of'."
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Provide alt text for this image:"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url,
                            },
                        },
                    ],
                }
            ],
            max_tokens=50,
        )
        return response.choices[0].message.content.strip()

    def draft_faq_pairs(self, product_spec_json: dict) -> list[dict]:
        """
        Parses raw product specs (JSON) and drafts an array of FAQ pairs.
        """
        if not self.client or self.api_key == 'dummy-key-for-testing':
            return [
                {"question": "What is the main feature?", "answer": "It is very powerful."}
            ]
            
        prompt = f"""
        Analyze the following product specifications and generate 3 to 5 Frequently Asked Questions (FAQs) based on the specs.
        Return the output STRICTLY as a JSON array of objects, with each object having a 'question' and 'answer' string key.
        Do not include markdown blocks or any other text.
        
        Specs: {json.dumps(product_spec_json)}
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful product specialist."},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" },
            temperature=0.4
        )
        
        content = response.choices[0].message.content.strip()
        # When response_format is json_object, it guarantees returning a JSON object.
        # Since we asked for an array, it might return {"faqs": [ ... ]}.
        try:
            data = json.loads(content)
            # Extract array if wrapped in an object
            if isinstance(data, dict):
                for key, value in data.items():
                    if isinstance(value, list):
                        return value
                return [data] # Fallback
            return data if isinstance(data, list) else []
        except json.JSONDecodeError:
            return []
