import json
import urllib.request
import urllib.error
from django.conf import settings


class KhaltiPaymentService:
    """
    Service to handle Khalti epayment (PIDX) workflow.
    """
    # Default to sandbox URL if not specified
    BASE_URL = getattr(settings, 'KHALTI_BASE_URL', 'https://a.khalti.com/api/v2/')
    
    def __init__(self):
        self.secret_key = getattr(settings, 'KHALTI_SECRET_KEY', 'test_secret_key')
        self.headers = {
            'Authorization': f'Key {self.secret_key}',
            'Content-Type': 'application/json',
        }

    def initiate_payment(self, order, return_url, website_url):
        """
        Initiate a payment via Khalti PIDX API.
        :param order: Order model instance
        :param return_url: URL to redirect user after payment
        :param website_url: The base website URL
        :return: dictionary with pidx and payment_url
        """
        endpoint = f"{self.BASE_URL}epayment/initiate/"
        
        # Amount is in paisa (cents)
        amount_in_paisa = int(order.total_amount * 100)
        
        payload = {
            "return_url": return_url,
            "website_url": website_url,
            "amount": amount_in_paisa,
            "purchase_order_id": str(order.id),
            "purchase_order_name": f"Order {order.id}",
            "customer_info": {
                # Fallback info as customer details might vary based on shipping_details structure
                "name": order.shipping_details.get('name', 'Customer'),
                "email": order.shipping_details.get('email', 'customer@example.com'),
                "phone": order.shipping_details.get('phone', '9800000000')
            }
        }

        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(endpoint, data=data, headers=self.headers, method='POST')

        try:
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode('utf-8'))
            
            # Save transaction ID for future verification
            if 'pidx' in result:
                order.transaction_id = result['pidx']
                order.save()
                
            return {
                'success': True,
                'pidx': result.get('pidx'),
                'payment_url': result.get('payment_url')
            }
        except urllib.error.HTTPError as e:
            error_msg = e.read().decode('utf-8')
            return {
                'success': False,
                'error': error_msg
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

    def verify_payment(self, pidx):
        """
        Verify payment status with Khalti using PIDX.
        :param pidx: The Khalti transaction PIDX
        :return: Boolean success status
        """
        endpoint = f"{self.BASE_URL}epayment/lookup/"
        payload = {"pidx": pidx}
        data = json.dumps(payload).encode('utf-8')
        
        req = urllib.request.Request(endpoint, data=data, headers=self.headers, method='POST')

        try:
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode('utf-8'))
            
            if result.get('status') == 'Completed':
                return True
            return False
        except Exception:
            return False
