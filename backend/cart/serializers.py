from rest_framework import serializers


class CartAddProductSerializer(serializers.Serializer):
    PRODUCT_QUANTITY_CHOICES = [(int(i), str(i)) for i in range(-10, 21)]

    quantity = serializers.ChoiceField(required=False, choices=PRODUCT_QUANTITY_CHOICES)
    update = serializers.BooleanField(required=False, initial=False)
    category_title = serializers.CharField(max_length=100, required=False)
    product_slug = serializers.CharField(max_length=100, required=False)


class CartRemoveSerializer(serializers.Serializer):
    category_title = serializers.CharField(max_length=100, required=False)
    product_slug = serializers.CharField(max_length=100, required=False)


class TestSerializer(serializers.Serializer):
    a = serializers.CharField(max_length=12)
    b = serializers.CharField(max_length=4)
