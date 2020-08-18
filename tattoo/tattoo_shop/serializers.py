from .models import TattooSketch, Customer
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
        fields = ('id', 'title')