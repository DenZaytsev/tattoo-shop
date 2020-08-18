from rest_framework import generics
from .serializers import TattooSketchDetailSerializer, OrderDetailSerializer


class TattooSketchCreateView(generics.CreateAPIView):
    """Запись нового эскиза в базу данных"""
    serializer_class = TattooSketchDetailSerializer


class OrderCreateView(generics.CreateAPIView):
    """Запись нового пользователя в базу данных"""
    serializer_class = OrderDetailSerializer

