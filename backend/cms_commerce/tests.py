import pytest
from unittest.mock import patch
from .models import Product, ProductVariant, ProductBundle, BundleItem, Order
from .services.khalti import KhaltiPaymentService


@pytest.mark.django_db
class TestCommerceModels:
    def test_product_and_variant_creation(self):
        product = Product.objects.create(
            title="Test Product",
            slug="test-product",
            base_price=100.00,
            stock=10
        )
        
        variant1 = ProductVariant.objects.create(
            product=product,
            sku="TEST-1-S",
            attributes={"size": "S"}
        )
        
        variant2 = ProductVariant.objects.create(
            product=product,
            sku="TEST-1-L",
            price_override=120.00,
            attributes={"size": "L"}
        )

        assert product.title == "Test Product"
        assert variant1.get_price() == 100.00
        assert variant2.get_price() == 120.00
        assert product.variants.count() == 2

    def test_product_bundle_creation(self):
        p1 = Product.objects.create(title="P1", slug="p1", base_price=50)
        p2 = Product.objects.create(title="P2", slug="p2", base_price=75)

        bundle = ProductBundle.objects.create(
            name="Starter Kit",
            slug="starter-kit",
            price=100.00
        )

        BundleItem.objects.create(bundle=bundle, product=p1, quantity=2)
        BundleItem.objects.create(bundle=bundle, product=p2, quantity=1)

        assert bundle.products.count() == 2
        assert bundle.bundleitem_set.get(product=p1).quantity == 2


@pytest.mark.django_db
class TestKhaltiPaymentService:
    @patch('urllib.request.urlopen')
    def test_initiate_payment_success(self, mock_urlopen):
        # Mock the urllib response
        class MockResponse:
            def read(self):
                return b'{"pidx": "test_pidx_123", "payment_url": "https://khalti.com/payment/test_pidx_123"}'
        mock_urlopen.return_value = MockResponse()

        order = Order.objects.create(
            total_amount=500.00,
            shipping_details={"name": "John"}
        )

        service = KhaltiPaymentService()
        result = service.initiate_payment(order, "http://localhost/return", "http://localhost")

        assert result['success'] is True
        assert result['pidx'] == "test_pidx_123"
        assert result['payment_url'] == "https://khalti.com/payment/test_pidx_123"
        
        order.refresh_from_db()
        assert order.transaction_id == "test_pidx_123"

    @patch('urllib.request.urlopen')
    def test_verify_payment_success(self, mock_urlopen):
        class MockResponse:
            def read(self):
                return b'{"status": "Completed", "transaction_id": "TXN123"}'
        mock_urlopen.return_value = MockResponse()

        service = KhaltiPaymentService()
        is_verified = service.verify_payment("test_pidx_123")
        
        assert is_verified is True
