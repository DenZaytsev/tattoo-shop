from .models import TattooSketch, Order
from rest_framework import serializers


class TattooSketchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TattooSketch
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

