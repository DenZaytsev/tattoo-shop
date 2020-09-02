from decimal import Decimal
from django.conf import settings
from typing import Union
from .models import TShirt, Sticker
from django.contrib.contenttypes.models import ContentType
from .bussines_logic import CT_MODEL_MODEL_CLASS


class Cart:
    """Класс предназначенный для хранение корзины товаров в сессии."""

    def __init__(self, request):
        """
        Инициализирует корзину.
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
        ct_model_id, category = ContentType.objects.get_for_model(product).id, str(product.category)
        product_id, product_slug = str(product.id), str(product.slug)
        if category not in self.cart:
            self.cart[category] = {
                product_slug: {
                    'id': product_id,
                    'quantity': 0,
                    'price': str(product.price),
                    'ct_model_id': ct_model_id,
                }
            }
        if product_id not in self.cart[category]:
            self.cart[category][product_slug] = {
                'id': product_id,
                'quantity': 0,
                'price': str(product.price),
                'ct_model_id': ct_model_id,
            }
        if update_quantity:
            self.cart[category][product_slug]['quantity'] = quantity
        else:
            self.cart[category][product_slug]['quantity'] += quantity
        self.save()

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart
        self.session.modified = True

    def remove(self, product):
        """
        Удаление товара из корзины.
        """
        category, product_slug = str(product.category), str(product.slug)
        if product_slug in self.cart[category]:
            del self.cart[category][product_slug]
            self.save()

    def clear(self):
        """удаление корзины из сессии"""
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True

    def __iter__(self):
        products_in_ct_model = self.cart.values()
        for products in products_in_ct_model:
            for product in products.values():
                yield product

    def get_products_by_category(self, category: str):
        """возвращает из корзины кверисет с продуктами по заданной категории"""
        try:
            model: Union[TShirt, Sticker] = CT_MODEL_MODEL_CLASS[category]
            product_ids = self.cart[category].keys()
            products = model.objects.filter(id__in=product_ids)

        except KeyError:
            print('Такой категории нет в корзине')
        return products

    def get_all_product_in_cart(self):
        """возвращает список содержащий кверисеты со всеми продуктами из корзины"""
        categories = self.cart.key()
        return [self.get_products_by_category(category) for category in categories]

    def get_total_price(self):
        """Возвращает цену всех предметов в корзине"""
        return sum(int(item['quantity']) * Decimal(item['price']) for item in self)

    def __str__(self):
        return self.cart

    def __len__(self):
        """Возвращает количество передметов в корзине"""
        return sum(item['quantity'] for item in self)
