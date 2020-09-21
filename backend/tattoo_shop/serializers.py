from .models import TattooSketch, Customer, Category, Order, TShirt, Sticker
from rest_framework import serializers


class TattooSketchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooSketch
        fields = ('title', 'description', 'vacant', 'image')


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class SketchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooSketch
        fields = ('id', 'title', 'slug', 'image')


class CategorySerializer(serializers.ModelSerializer):

    name = serializers.CharField(required=True)
    slug = serializers.SlugField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('first_name', 'last_name', 'phone', 'address', 'buying_type', 'comment', 'email')


class TShirtDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = TShirt
        fields = '__all__'


class TShirtListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TShirt
        fields = ('title', 'price', 'slug', 'image')


class StickerListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sticker
        fields = ('title', 'price', 'slug', 'image')


class StickerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'


class CartAddProductSerializer(serializers.Serializer):
    PRODUCT_QUANTITY_CHOICES = [(int(i), str(i)) for i in range(-10, 21)]

    quantity = serializers.ChoiceField(required=False, choices=PRODUCT_QUANTITY_CHOICES)
    update = serializers.BooleanField(required=False, initial=False)
    category_title = serializers.CharField(max_length=100, required=False)
    product_slug = serializers.CharField(max_length=100, required=False)


class CartRemoveSerializer(serializers.Serializer):
    category_title = serializers.CharField(max_length=100, required=False)
    product_slug = serializers.CharField(max_length=100, required=False)
