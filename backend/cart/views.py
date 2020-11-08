from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from cart.cart import Cart
from cart.serializers import CartAddProductSerializer, CartRemoveSerializer, TestSerializer
from core.baseview import BaseView
from core.service import get_model_or_404


class CartDetailView(BaseView):
    """Показывает содержимое корзины."""

    def get(self, request):
        cart = Cart(request)
        data = cart.get_info()
        return Response(data=data, status=200)


class AddToCartView(BaseView):
    """
    Добавление товара в корзину информация о котором содержится в пост запросе.
    Корзина хронится в сессии request.session['cart']
    """

    serializer_class = CartAddProductSerializer

    @swagger_auto_schema(
        request_body=serializer_class,
        responses={
            200: 'OK',
            400: 'serializerError'
        }
    )
    def post(self, request):
        cart = Cart(request)

        serializer = CartAddProductSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            clean_data = serializer.data

            model = get_model_or_404(clean_data['category_title'])
            product = get_object_or_404(model, slug=clean_data['product_slug'])

            cart.add_item(
                product=product,
                quantity=clean_data['quantity'],
                update_quantity=clean_data['update']
            )

            return Response(status=200)

        return Response(status=400, data=serializer.error_messages)


class RemoveCartView(BaseView):
    """Удаляет товар из корзины."""

    serializer_class = CartRemoveSerializer

    @swagger_auto_schema(
        request_body=serializer_class,
        responses={
            200: 'OK',
            400: 'serializerError'
        }
    )
    def post(self, request):
        cart = Cart(request)
        serializer = CartRemoveSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            clean_data = serializer.data
            model = get_model_or_404(clean_data['category_title'])
            product = get_object_or_404(model, slug=clean_data['product_slug'])
            cart.remove(product=product)

            return Response(status=200, data='OK')
        return Response(status=400, data=serializer.error_messages)


class ClearCartView(BaseView):
    """Очищает содержимое корзины."""

    @swagger_auto_schema(
        responses={200: 'Корзина очищена.'}
    )
    def post(self, request):
        cart = Cart(request)
        cart.clear()
        return Response(status=200, data='Корзина очищена')


class TestView(BaseView):
    @swagger_auto_schema(
        request_body=TestSerializer
    )
    def post(self, request):
        body = request.body
        post = request.POST
        data = {
            'request.data': request.data,
            'request.body': body,
            'request.POST': post
        }

        return Response(status=200, data=data)
