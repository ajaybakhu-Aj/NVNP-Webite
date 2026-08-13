class BlockVisibilityEvaluator:
    @staticmethod
    def evaluate(request, block):
        """
        Evaluates the block's visibility rules against the current request context.
        Returns True if the block should be rendered, False if it should be omitted.
        """
        rules = block.visibility_rules
        if not rules:
            # If no rules exist, default to visible
            return True
            
        # 1. Evaluate GEO context
        country_code = BlockVisibilityEvaluator._get_client_country(request)
        if not BlockVisibilityEvaluator._evaluate_geo(rules, country_code):
            return False
            
        # 2. Evaluate UTM parameters
        if not BlockVisibilityEvaluator._evaluate_utm(rules, request):
            return False
            
        return True

    @staticmethod
    def _get_client_country(request):
        """
        Extracts IP and returns the ISO Country Code using GeoIP2 (Mocked for now).
        """
        # Get IP Address (handling proxies)
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
            
        # In a real production environment, you would use django.contrib.gis.geoip2
        # from django.contrib.gis.geoip2 import GeoIP2
        # g = GeoIP2()
        # return g.country_code(ip)
        
        # Mocking lookup based on a dummy header or just returning None
        # for testing purposes we can read a custom header
        return request.META.get('HTTP_X_MOCK_COUNTRY', None)

    @staticmethod
    def _evaluate_geo(rules, country_code):
        """
        Evaluates the 'countries' and 'exclude_countries' lists.
        """
        countries = rules.get('countries', [])
        exclude_countries = rules.get('exclude_countries', [])
        
        # If country is explicitly excluded, fail
        if exclude_countries and country_code in exclude_countries:
            return False
            
        # If there is a whitelist and country isn't in it, fail
        if countries and country_code not in countries:
            return False
            
        return True

    @staticmethod
    def _evaluate_utm(rules, request):
        """
        Evaluates UTM parameters in the query string.
        """
        required_source = rules.get('utm_source')
        required_campaigns = rules.get('utm_campaign')
        
        # Check utm_source (exact match)
        if required_source:
            actual_source = request.GET.get('utm_source')
            if actual_source != required_source:
                return False
                
        # Check utm_campaign (match ANY in the list)
        if required_campaigns:
            if isinstance(required_campaigns, str):
                required_campaigns = [required_campaigns]
                
            actual_campaign = request.GET.get('utm_campaign')
            if actual_campaign not in required_campaigns:
                return False
                
        return True
