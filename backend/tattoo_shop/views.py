from django.contrib.contenttypes.models import ContentType
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import get_object_or_404, ListAPIView, CreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from cart.cart import Cart
from core.baseview import BaseView
from core.service import get_model_or_404
from .bussines_logic import vacant_sketches, get_sketch, all_category, \
    MODEL_CLASS_LIST_SERIALIZER, all_product_data, MODEL_CLASS_DETAIL_SERIALIZER
from .models import OrderItem
from .serializers import (
    TattooSketchDetailSerializer,
    CustomerDetailSerializer,
    SketchListSerializer,
    CategorySerializer,
    OrderDetailSerializer,
)


class TattooSketchCreateView(BaseView, CreateAPIView):
    """Запись нового эскиза в базу данных"""
    serializer_class = TattooSketchDetailSerializer


class Paginator(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 10


class VacantTattooSketchListView(BaseView, ListAPIView):
    """Выдает список свободных эскизов"""
    serializer_class = SketchListSerializer
    queryset = vacant_sketches()
    http_method_names = ['get']
    pagination_class = Paginator


class TattooSketchDetailView(BaseView):
    """выдает информацию о эскизе"""

    def get(self, request, slug):
        sketch = get_sketch(slug)
        serializer = TattooSketchDetailSerializer(sketch)
        return Response(data=serializer.data, status=200)


class CustomerCreateView(BaseView, CreateAPIView):
    """Запись нового пользователя в базу данных"""
    serializer_class = CustomerDetailSerializer


class CategoryListView(BaseView, ListAPIView):
    """Возвращает список категорий товаров"""
    serializer_class = CategorySerializer
    queryset = all_category()
    http_method_names = ['get']


class CreateOrderView(BaseView):
    """Запись закава в базу данных"""
    serializer_class = OrderDetailSerializer
    http_method_names = ['post']

    @swagger_auto_schema(
        request_body=serializer_class,
        responses={'200': 'Заказ создан', '400': 'Serializer_error'}
    )
    def post(self, request):
        cart = Cart(request)
        serializer = OrderDetailSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            for item in cart:
                OrderItem.objects.create(order=order,
                                         content_type=ContentType.objects.get(pk=item['ct_model_id']),
                                         object_id=item['id'],
                                         price=item['price'],
                                         quantity=item['quantity'])
            cart.clear()

            return Response(data='Заказ создан', status=200)
        return Response(status=400, data=serializer.error_messages)


class ProductDetailView(BaseView):
    """Возвращает детальную информацию о товаре"""

    def get(self, request, *args, **kwargs):
        model = get_model_or_404(kwargs['category_title'])
        queryset = get_object_or_404(model, slug=kwargs['product_slug'])
        serializer = MODEL_CLASS_DETAIL_SERIALIZER[model]
        return Response(data=serializer(queryset).data, status=200)


class ProductsInCategoryListView(BaseView):
    """Выдает список продуктов заданной категории"""
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        model = get_model_or_404(kwargs['category_title'])
        queryset = model.objects.all()
        serializer = MODEL_CLASS_LIST_SERIALIZER[model]
        return Response(data=serializer(queryset, many=True).data, status=200)


class ProductListView(BaseView):
    """Возвращает все продукты из базы данных."""

    def get(self, request):
        products = all_product_data()
        return Response(data=products, status=200)
