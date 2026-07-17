import json
import logging
from django.urls import reverse
from django.conf import settings

logger = logging.getLogger(__name__)

def get_canonical_url(request, path=None):
    """
    Helper to construct absolute canonical URL.
    """
    domain = request.get_host()
    scheme = 'https' if request.is_secure() else 'http'
    if path:
        return f"{scheme}://{domain}{path}"
    return f"{scheme}://{domain}{request.path}"

def get_page_schema(request, obj=None, page_type='homepage', **kwargs):
    """
    Main entry point for schemas. Checks if a schema_override exists on the database 
    record; if so, validates and prioritizes it. Otherwise, calls auto-generation services.
    """
    # 5. Check if schema_override is present and valid
    if obj and hasattr(obj, 'schema_override') and obj.schema_override:
        try:
            override_data = json.loads(obj.schema_override)
            logger.info("Prioritizing database schema_override JSON-LD block.")
            return override_data
        except json.JSONDecodeError:
            logger.warning("schema_override contains malformed JSON. Falling back to auto-generator.")

    # Execute auto-generators based on page type
    if page_type == 'homepage':
        return generate_homepage_schema(request, **kwargs)
    elif page_type == 'product' and obj:
        return generate_product_schema(request, obj)
    elif page_type == 'blog_post' and obj:
        return generate_blog_post_schema(request, obj, **kwargs)
    elif page_type == 'dealer' and obj:
        return generate_dealer_schema(request, obj)
    
    return {}

def generate_homepage_schema(request, global_config=None):
    """
    1. Homepage: Merges Organization + WebSite + LocalBusiness schemas
    """
    canonical = get_canonical_url(request)
    
    # Fallbacks for global configurations
    site_name = getattr(settings, 'SEO_SITE_NAME', 'Nightvision Enterprises')
    logo_url = getattr(settings, 'SEO_SITE_LOGO', get_canonical_url(request, '/static/logo.png'))
    socials = getattr(settings, 'SEO_SOCIAL_LINKS', [
        "https://www.facebook.com/nightvisioninterprises",
        "https://www.instagram.com/nightvision_nepal/",
        "https://www.youtube.com/@nvnightvisionnp"
    ])
    phone = getattr(settings, 'SEO_CONTACT_PHONE', '+977-1-XXXXXXX')
    address = getattr(settings, 'SEO_CONTACT_ADDRESS', 'Kathmandu, Nepal')

    if global_config:
        site_name = global_config.get('site_name', site_name)
        logo_url = global_config.get('logo_url', logo_url)
        socials = global_config.get('socials', socials)
        phone = global_config.get('phone', phone)
        address = global_config.get('address', address)

    # Combined @graph schema structures
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": f"{canonical}#organization",
                "name": site_name,
                "url": canonical,
                "logo": {
                    "@type": "ImageObject",
                    "@id": f"{canonical}#logo",
                    "url": logo_url,
                    "caption": site_name
                },
                "sameAs": socials
            },
            {
                "@type": "WebSite",
                "@id": f"{canonical}#website",
                "url": canonical,
                "name": site_name,
                "publisher": {
                    "@id": f"{canonical}#organization"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": f"{canonical}/search/?q={{search_term_string}}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "LocalBusiness",
                "@id": f"{canonical}#localbusiness",
                "name": site_name,
                "image": logo_url,
                "telephone": phone,
                "url": canonical,
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": address,
                    "addressLocality": "Kathmandu",
                    "addressCountry": "NP"
                }
            }
        ]
    }
    return schema

def generate_product_schema(request, product):
    """
    2. Products Page: Generates Product + Offer + AggregateRating markup, 
    and loops dynamic FAQPage arrays if the product builder has FAQ inputs.
    """
    product_url = get_canonical_url(request, f"/products/{product.slug}/")
    
    # Base Product schema
    product_schema = {
        "@type": "Product",
        "@id": f"{product_url}#product",
        "name": product.name,
        "description": product.meta_description or product.description[:150],
        "image": get_canonical_url(request, product.og_image.url) if product.og_image else None,
        "offers": {
            "@type": "Offer",
            "url": product_url,
            "priceCurrency": "NPR",  # Local currency mapping
            "price": str(product.price),
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock" if product.stock_status == 'in_stock' else "https://schema.org/OutOfStock"
        }
    }

    specs = product.technical_specifications or {}
    rating_value = specs.get('ratingValue')
    review_count = specs.get('reviewCount')
    
    if rating_value and review_count:
        product_schema["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": str(rating_value),
            "reviewCount": str(review_count)
        }

    # Add FAQ builder structure if present in database JSON block
    graph = [product_schema]
    
    if hasattr(product, 'faq_builder') and product.faq_builder:
        faq_questions = []
        for item in product.faq_builder:
            q = item.get('question')
            a = item.get('answer')
            if q and a:
                faq_questions.append({
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": a
                    }
                })
        
        if faq_questions:
            faq_schema = {
                "@type": "FAQPage",
                "@id": f"{product_url}#faq",
                "mainEntity": faq_questions
            }
            graph.append(faq_schema)

    return {
        "@context": "https://schema.org",
        "@graph": graph
    }

def generate_blog_post_schema(request, post, founder_config=None):
    """
    3. Blog Post: Generates detailed Article schema utilizing 
    the site founder's data mapping for high E-E-A-T trust signals.
    """
    post_url = get_canonical_url(request, f"/blog/{post.slug}/")
    
    # E-E-A-T Founder profile fallback
    founder_name = "Founder Name"
    founder_job = "CEO & Founder"
    founder_url = "https://yourdomain.com/company/founder/"
    founder_same_as = []
    
    if founder_config:
        founder_name = founder_config.get('name', founder_name)
        founder_job = founder_config.get('job_title', founder_job)
        founder_url = founder_config.get('profile_url', founder_url)
        founder_same_as = founder_config.get('same_as', founder_same_as)

    article_schema = {
        "@type": "Article",
        "@id": f"{post_url}#article",
        "headline": post.title,
        "description": post.meta_description,
        "image": get_canonical_url(request, post.og_image.url) if post.og_image else None,
        "datePublished": post.date_published.isoformat() if post.date_published else None,
        "dateModified": post.date_modified.isoformat() if post.date_modified else None,
        "author": {
            "@type": "Person",
            "name": founder_name,
            "jobTitle": founder_job,
            "url": founder_url,
            "sameAs": founder_same_as
        },
        "publisher": {
            "@type": "Organization",
            "name": getattr(settings, 'SEO_SITE_NAME', 'Nightvision Enterprises'),
            "logo": {
                "@type": "ImageObject",
                "url": getattr(settings, 'SEO_SITE_LOGO', '')
            }
        }
    }
    
    graph = [article_schema]
    
    if hasattr(post, 'faq_builder') and post.faq_builder:
        faq_questions = []
        for item in post.faq_builder:
            q = item.get('question')
            a = item.get('answer')
            if q and a:
                faq_questions.append({
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": a
                    }
                })
        
        if faq_questions:
            faq_schema = {
                "@type": "FAQPage",
                "@id": f"{post_url}#faq",
                "mainEntity": faq_questions
            }
            graph.append(faq_schema)
    
    return {
        "@context": "https://schema.org",
        "@graph": graph
    }

def generate_dealer_schema(request, dealer):
    """
    4. Dealers / Contact Page: Dynamically maps LocalBusiness schemas based on locations.
    """
    dealer_url = get_canonical_url(request, f"/dealers/{dealer.slug}/")
    
    dealer_schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": f"{dealer_url}#localbusiness",
        "name": dealer.name,
        "telephone": dealer.phone_number,
        "url": dealer_url,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": dealer.address,
            "addressLocality": dealer.district,
            "addressRegion": dealer.province,
            "addressCountry": "NP"
        }
    }
    
    return dealer_schema
