from decimal import Decimal
from django.conf import settings
from typing import Union
from .models import TShirt, Sticker
from django.contrib.contenttypes.models import ContentType


class Cart:
    """Класс предназначенный для хранение корзины товаров в сессии."""

    def __init__(self, request):
        """
        Инициализируем корзину.
        Если в сессии не задана корзина, мы создадим новую корзину и сохраним ее в session key корзины.
        """
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = dict()
        self.cart = cart

    def add_item(self, product: Union[TShirt, Sticker], quantity: int = 1, update_quantity=False) -> None:
        """
           Добавить продукт в корзину или обновить его количество.
           """
        category_id, product_id = str(product.category), str(product.id)

        if category_id not in self.cart:
            self.cart[category_id] = {
                product_id: {
                    'quantity': 0,
                    'price': str(product.price)
                }
            }
        if product_id not in self.cart[category_id]:
            self.cart[category_id][product_id] = {'quantity': 0,
                                                  'price': str(product.price)
                                                  }
        if update_quantity:
            self.cart[category_id][product_id]['quantity'] = quantity
        else:
            self.cart[category_id][product_id]['quantity'] += quantity
        self.save()

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, product):
        """
        Удаление товара из корзины.
        """
        category_id, product_id = str(product.category), str(product.id)
        if product_id in self.cart[category_id]:
            del self.cart[category_id][product_id]
            self.save()
