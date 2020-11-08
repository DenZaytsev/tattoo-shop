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
        fields = ('title', 'price', 'slug', 'image', 'description', 'quantity')


class StickerListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sticker
        fields = ('title', 'price', 'slug', 'image', 'description', 'quantity')


class StickerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = '__all__'

