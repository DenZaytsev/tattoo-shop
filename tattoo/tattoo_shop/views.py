from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http import Http404
from .models import TShirt, Sticker

from .serializers import (
    TattooSketchDetailSerializer,
    CustomerDetailSerializer,
    SketchListSerializer,
    CategorySerializer,
    OrderDetailSerializer, StickerDetailSerializer, TShirtDetailSerializer

)

from .bussines_logic import vacant_sketches, get_sketch, all_category


class TattooSketchCreateView(generics.CreateAPIView):
    """Запись нового эскиза в базу данных"""
    serializer_class = TattooSketchDetailSerializer


class Paginator(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 10


class VacantTattooSketchListView(generics.ListAPIView):
    """Выдает список свободных эскизов"""
    serializer_class = SketchListSerializer
    queryset = vacant_sketches()
    http_method_names = ['get']
    pagination_class = Paginator


class TattooSketchDetailView(APIView):
    """выдает информацию о эскизе"""

    def get(self, request, slug):
        sketch = get_sketch(slug)
        serializer = TattooSketchDetailSerializer(sketch)
        return Response(serializer.data)


class CustomerCreateView(generics.CreateAPIView):
    """Запись нового пользователя в базу данных"""
    serializer_class = CustomerDetailSerializer


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = all_category()
    http_method_names = ['get']


class CreateOrderView(generics.ListCreateAPIView):
    serializer_class = OrderDetailSerializer


class ProductDetailView(generics.RetrieveAPIView):
    CT_MODEL_MODEL_CLASS = {
        't-shirt': TShirt,
        'sticker': Sticker
    }

    def dispatch(self, request, *args, **kwargs):
        self.model = self.CT_MODEL_MODEL_CLASS[kwargs['ct_model']]
        self.queryset = self.model._base_manager.all()
        self.serializer_class = StickerDetailSerializer if self.model == Sticker else TShirtDetailSerializer
        return super().dispatch(request, *args, **kwargs)

    lookup_field = 'slug'


class ProductsInCategoryListView(generics.ListAPIView):
    """Выдает список продуктов заданной категории"""
    CT_MODEL_MODEL_CLASS = {
        't-shirt': TShirt,
        'sticker': Sticker
    }

    def dispatch(self, request, *args, **kwargs):
        self.model = self.CT_MODEL_MODEL_CLASS.get(kwargs['ct_model'])
        if not self.model:
            raise Http404("Category does not exist")
        self.queryset = self.model.objects.all()
        self.serializer_class = StickerDetailSerializer if self.model == Sticker else TShirtDetailSerializer
        return super().dispatch(request, *args, **kwargs)

    lookup_field = 'ct_model'
    http_method_names = ['get']
    pagination_class = Paginator
