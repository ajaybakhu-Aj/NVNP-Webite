"""
JSON Schema Definitions (Draft 7) for PageBlocks.
These schemas validate the 'data' JSONField of the PageBlock model
and serve as a contract for the frontend rendering.
"""

HERO_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "headline": {"type": "string"},
        "subheadline": {"type": "string"},
        "image_url": {"type": "string", "format": "uri"},
        "cta_buttons": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "text": {"type": "string"},
                    "url": {"type": "string"},
                    "style": {"type": "string", "enum": ["primary", "secondary", "outline"]}
                },
                "required": ["text", "url"]
            }
        }
    },
    "required": ["headline"]
}

FEATURE_GRID_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "features": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "icon": {"type": "string"},
                    "title": {"type": "string"},
                    "description": {"type": "string"}
                },
                "required": ["title", "description"]
            }
        }
    },
    "required": ["features"]
}

COMPARISON_TABLE_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "headers": {
            "type": "array",
            "items": {"type": "string"}
        },
        "rows": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {"type": "string"}
            }
        }
    },
    "required": ["headers", "rows"]
}

FAQ_ACCORDION_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "faqs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "question": {"type": "string"},
                    "answer": {"type": "string"}
                },
                "required": ["question", "answer"]
            }
        }
    },
    "required": ["faqs"]
}

CTA_BANNER_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "heading": {"type": "string"},
        "subheading": {"type": "string"},
        "background_color": {"type": "string", "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"},
        "button_text": {"type": "string"},
        "button_url": {"type": "string"}
    },
    "required": ["heading", "button_text", "button_url"]
}

BLOCK_SCHEMAS = {
    "Hero": HERO_SCHEMA,
    "FeatureGrid": FEATURE_GRID_SCHEMA,
    "ComparisonTable": COMPARISON_TABLE_SCHEMA,
    "FAQAccordion": FAQ_ACCORDION_SCHEMA,
    "CTABanner": CTA_BANNER_SCHEMA,
}
