from .bussines_logic import CT_MODEL_MODEL_CLASS, vacant_sketches, get_sketch, all_category, all_product_dict, \
    MODEL_CLASS_SERIALIZER
from rest_framework.generics import get_object_or_404, ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.http import Http404, JsonResponse
from .models import TShirt, Sticker, OrderItem, ContentType
from .cart import Cart
from .tasks import order_created
from .serializers import (
    TattooSketchDetailSerializer,
    CustomerDetailSerializer,
    SketchListSerializer,
    CategorySerializer,
    OrderDetailSerializer,
    CartAddProductSerializer,
    CartRemoveSerializer

)


class BaseView(APIView):
    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)
        except Exception as e:
            return self._response({'errorMassege': str(e)}, status=400)

        if isinstance(response, (dict, list)):
            return self._response(response)
        else:
            return response

    @staticmethod
    def _response(data, *, status=200):
        return JsonResponse(
            data=data,
            status=status,
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
        return Response(serializer.data)


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
            return Response(data='Заказ создан', status=200)


class ProductDetailView(BaseView):
    """Возвращает детальную информацию о товаре"""

    def get(self, request, *args, **kwargs):
        model = CT_MODEL_MODEL_CLASS.get(kwargs['ct_model'])
        queryset = get_object_or_404(model, slug=kwargs['slug'])
        serializer = MODEL_CLASS_SERIALIZER[model.__name__]
        return Response(data=serializer(queryset).data, status=200)


class ProductsInCategoryListView(BaseView):
    """Выдает список продуктов заданной категории"""
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        model = CT_MODEL_MODEL_CLASS.get(kwargs['ct_model'])
        queryset = model.objects.all()
        serializer = MODEL_CLASS_SERIALIZER[model.__name__]
        return Response(data=serializer(queryset, many=True).data, status=200)


class CartDetailView(BaseView):
    """Показывает содержимое корзины."""

    def get(self, request):
        cart = Cart(request)
        data = {
            'cart_contents': cart.cart,
            'total_price': cart.get_total_price()
        }
        return Response(data=data)


class AddToCartView(BaseView):
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
            data = {
                'cart_contents': cart.cart,
                'total_price': cart.get_total_price()
            }
            return Response(data=data, status=200)

        return Response(status=404)


# переделать с контенттайп
class RemoveCartView(BaseView):
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


class ClearCartView(BaseView):
    """Очищает содержимое корзины"""

    def post(self, request):
        cart = Cart(request)
        cart.clear()

        return Response(status=200, data='Корзина очищена')


class ProductListView(BaseView):
    def get(self, request):
        products = all_product_dict()
        return Response(data=products, status=200)
