from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone

# Create your models here.


class TattooSketch(models.Model):
    """Эскизы татуировок"""
    title = models.CharField('Название эскиза', max_length=125, blank=False)
    description = models.TextField('Описание эскиза', max_length=255, blank=False)
    vacant = models.BooleanField('свободен ли эскиз', default=True)


class Cart(models.Model):
    """Модель корзины """
    pass


class CartProduct(models.Model):
    pass


class Product(models.Model):
    pass


class Customer(models.Model):
    """Модель покупателя"""
    email = models.EmailField('email address', blank=False)
    phone_number = PhoneNumberField('Номер телефона', unique=True, blank=False)
    name = models.CharField('Имя пользователя', max_length=30, blank=False)
    surname = models.CharField('Фамилия пользователя', max_length=30, blank=False)
    patronymic = models.CharField('Отчество пользователя', max_length=30)


class ProductPhoto(models.Model):
    url = models.CharField(max_length=255)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)


class TattooSketchPhoto(models.Model):
    url = models.CharField(max_length=255)
    sketch_id = models.ForeignKey(TattooSketch, on_delete=models.CASCADE)


