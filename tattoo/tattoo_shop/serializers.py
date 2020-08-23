from .models import TattooSketch, Customer, Category, Order, TShirt, Sticker
from rest_framework import serializers


class TattooSketchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooSketch
        fields = ('title', 'description', 'vacant')


class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class TattooSketchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooSketch
        fields = ('id', 'title', 'slug')


class CategorySerializer(serializers.ModelSerializer):

    name = serializers.CharField(required=True)
    slug = serializers.SlugField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')


class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('first_name', 'last_name', 'phone', 'address', 'products', 'comment')


class TShirtDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = TShirt
        fields = '__all__'


class StickerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'