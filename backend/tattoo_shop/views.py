from .bussines_logic import CT_MODEL_MODEL_CLASS, vacant_sketches, get_sketch, all_category, all_product_dict

from rest_framework.generics import get_object_or_404, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http import Http404
from .models import TShirt, Sticker, OrderItem, ContentType
from .cart import Cart
from .tasks import order_created
from .serializers import (
    TattooSketchDetailSerializer,
    CustomerDetailSerializer,
    SketchListSerializer,
    CategorySerializer,
    OrderDetailSerializer,
    StickerDetailSerializer,
    TShirtDetailSerializer,
    CartAddProductSerializer,
    CartRemoveSerializer

)


class BaseView(APIView):
    pass


class TattooSketchCreateView(CreateAPIView):
    """Запись нового эскиза в базу данных"""
    serializer_class = TattooSketchDetailSerializer


class Paginator(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 10


class VacantTattooSketchListView(ListAPIView):
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


class CustomerCreateView(CreateAPIView):
    """Запись нового пользователя в базу данных"""
    serializer_class = CustomerDetailSerializer


class CategoryListView(ListAPIView):
    """Возвращает список категорий товаров"""
    serializer_class = CategorySerializer
    queryset = all_category()
    http_method_names = ['get']


class CreateOrderView(APIView):
    """Запись закава в базу данных"""
    serializer_class = OrderDetailSerializer

    def get(self, request):
        cart = Cart(request)
        return Response(cart.cart)

    def post(self, request):
        cart = Cart(request)
        serializer = OrderDetailSerializer(data=request.POST)
        if serializer.is_valid():
            order = serializer.save()
            for item in cart:
                OrderItem.objects.create(order=order,
                                         content_type=ContentType.objects.get(pk=item['ct_model_id']),
                                         object_id=item['id'],
                                         price=item['price'],
                                         quantity=item['quantity'])

            cart.clear()
            order_created.delay(order.id)
            return Response({'massage': 'Заказ создан'})


class ProductDetailView(RetrieveAPIView):
    """Возвращает детальную информацию о товаре"""

    def dispatch(self, request, *args, **kwargs):
        self.model = CT_MODEL_MODEL_CLASS[kwargs['ct_model']]
        self.queryset = self.model._base_manager.all()
        self.serializer_class = StickerDetailSerializer if self.model == Sticker else TShirtDetailSerializer
        return super().dispatch(request, *args, **kwargs)

    lookup_field = 'slug'


class ProductsInCategoryListView(ListAPIView):
    """Выдает список продуктов заданной категории"""

    def dispatch(self, request, *args, **kwargs):
        self.model = CT_MODEL_MODEL_CLASS.get(kwargs['ct_model'])
        if not self.model:
            raise Http404("Category does not exist")
        self.queryset = self.model.objects.all()
        self.serializer_class = StickerDetailSerializer if self.model == Sticker else TShirtDetailSerializer
        return super().dispatch(request, *args, **kwargs)

    lookup_field = 'ct_model'
    http_method_names = ['get']
    pagination_class = Paginator


class CartDetailView(APIView):
    """
        Показывает содержание корзины.
    """

    def get(self, request):
        cart = Cart(request)
        return Response({'cart': cart.cart, 'total_price': cart.get_total_price()})


class AddToCartView(APIView):
    """Добавление товара в корзину информация о котором содержится в пост запросе.
        Корзина хронится в сессии request.session['cart']
    """

    serializer_class = CartAddProductSerializer

    def post(self, request):
        cart = Cart(request)

        serializer = CartAddProductSerializer(data=request.POST)

        if serializer.is_valid(raise_exception=True):
            clean_data = serializer.data
            model = CT_MODEL_MODEL_CLASS.get(clean_data['category'])
            if not model:
                raise Http404("Category does not exist")
            product = get_object_or_404(model, slug=clean_data['slug'])
            cart.add_item(product=product,
                          quantity=clean_data['quantity'],
                          update_quantity=clean_data['update'])
            return Response({'status': 'ok', 'cart': cart.cart, 'total_price': cart.get_total_price()})

        return Response({'status': 'ne_ok'})


class RemoveCartView(APIView):
    """Удфляет товар из корзины"""
    serializer_class = CartRemoveSerializer

    def post(self, request):
        cart = Cart(request)

        serializer = CartRemoveSerializer(data=request.POST)

        if serializer.is_valid(raise_exception=True):
            clean_data = serializer.data
            model = CT_MODEL_MODEL_CLASS.get(clean_data['ct_model'])  # переделать с контенттайп
            if not model:
                raise Http404("Category does not exist")
            product = get_object_or_404(model, slug=clean_data['slug'])
            cart.remove(product=product)
            return Response({'status': 'ok', 'cart': cart.cart})

        return Response({'status': 'ne_ok'})


class ClearCartView(APIView):
    """Очищает содержимое корзины"""

    def post(self, request):
        cart = Cart(request)
        cart.clear()
        return Response({'status': 'ok', 'cart': cart.cart})


class ProductListView(APIView):
    def get(self, request):
        products = all_product_dict()
        return Response(products)

