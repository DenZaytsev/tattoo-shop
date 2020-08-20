from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


User = get_user_model()


# Create your models here.
class Category(models.Model):
    """категория товара"""
    name = models.CharField("название категории", max_length=155)
    slag = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class TattooSketch(models.Model):
    """Эскизы татуировок"""
    title = models.CharField('Название эскиза', max_length=125, blank=False)
    description = models.TextField('Описание эскиза', max_length=255, blank=False)
    vacant = models.BooleanField('свободен ли эскиз', default=True)
    image = models.ImageField(verbose_name='Изображение')


class Product(models.Model):

    class Meta:
        abstract = True

    title = models.CharField('Название товара', max_length=125, blank=False)
    description = models.TextField('Описание эскиза', max_length=255, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveSmallIntegerField(default=0)
    category = models.ForeignKey(Category, verbose_name="категория", on_delete=models.CASCADE)
    slag = models.SlugField(unique=True)
    image = models.ImageField(verbose_name='Изображение')

    def __str__(self):
        return self.title


class Customer(models.Model):
    """Модель покупателя"""
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)
    email = models.EmailField('email address', blank=False)
    phone_number = PhoneNumberField('Номер телефона', unique=True, blank=False)
    name = models.CharField('Имя пользователя', max_length=30, blank=False)
    surname = models.CharField('Фамилия пользователя', max_length=30, blank=False)
    patronymic = models.CharField('Отчество пользователя', max_length=30)


class CartProduct(models.Model):
    """"""
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, verbose_name="покупатель")
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE, verbose_name="корзина", related_name="related_products")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveSmallIntegerField(default=1, verbose_name='количество вещей в корзине')
    final_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='цена всех товаров в корзине')

    def __str__(self):
        return f"{self.product}"


class Cart(models.Model):
    """Модель корзины """

    owner = models.ForeignKey('Customer', verbose_name='Владелец', on_delete=models.CASCADE)
    products = models.ManyToManyField(CartProduct, blank=True, related_name='related_cart')
    number_of_product = models.PositiveSmallIntegerField(default=0)
    final_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='цена всех товаров в корзине')

    def __str__(self):
        return self.id




