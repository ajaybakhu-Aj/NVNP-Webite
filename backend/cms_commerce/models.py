from django.db import models
from cms_core.models import TimeStampedModel, SEOMetadataModel, SluggedModel
from taxonomies.models import TaxonomyTerm


class Product(TimeStampedModel, SEOMetadataModel, SluggedModel):
    """
    Core Product model.
    """
    title = models.CharField(max_length=255)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    taxonomies = models.ManyToManyField(TaxonomyTerm, blank=True, related_name='products')

    def __str__(self):
        return self.title


class ProductVariant(models.Model):
    """
    A specific variation of a product (e.g. Size Large, Color Black).
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=100, unique=True)
    price_override = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    attributes = models.JSONField(default=dict, help_text='e.g. {"color": "black", "size": "L"}')
    stock = models.IntegerField(default=0)

    def get_price(self):
        return self.price_override if self.price_override is not None else self.product.base_price

    def __str__(self):
        return f"{self.product.title} - {self.sku}"


class ProductBundle(TimeStampedModel, SluggedModel):
    """
    A collection of products sold together.
    """
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    products = models.ManyToManyField(Product, through='BundleItem', related_name='bundles')

    @property
    def title(self):
        return self.name

    def __str__(self):
        return self.name


class BundleItem(models.Model):
    """
    Through model mapping a Product to a Bundle with specific quantities.
    """
    bundle = models.ForeignKey(ProductBundle, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x {self.product.title} in {self.bundle.name}"


class Order(TimeStampedModel):
    """
    Customer Order containing order items and transaction details.
    """
    PAYMENT_STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    )
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    transaction_id = models.CharField(max_length=255, blank=True, help_text="Gateway transaction ID (e.g. Khalti PIDX)")
    shipping_details = models.JSONField(default=dict, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Order {self.id} - {self.payment_status}"


class OrderItem(models.Model):
    """
    A specific item (Product or Variant) purchased in an Order.
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    variant = models.ForeignKey(ProductVariant, null=True, blank=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product.title} in Order {self.order.id}"
