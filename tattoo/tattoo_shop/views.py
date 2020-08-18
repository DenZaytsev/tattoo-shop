from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import TattooSketchDetailSerializer, CustomerDetailSerializer, TattooSketchListSerializer
from .bussines_logic import vacant_sketches, get_sketch


class TattooSketchCreateView(generics.CreateAPIView):
    """Запись нового эскиза в базу данных"""
    serializer_class = TattooSketchDetailSerializer


class TattooSketchListView(APIView):
    """Выдает список эскизов"""

    def get(self, request):
        """выдает список доступных эскизов"""
        sketches = vacant_sketches()
        serializer = TattooSketchListSerializer(sketches, many=True)
        return Response(serializer.data)


class TattooSketchDetailView(APIView):
    """выдает информацию о эскизе"""

    def get(self, request, pk):
        sketch = get_sketch(pk)
        serializer = TattooSketchDetailSerializer(sketch)
        return Response(serializer.data)


class CustomerCreateView(generics.CreateAPIView):
    """Запись нового пользователя в базу данных"""
    serializer_class = CustomerDetailSerializer