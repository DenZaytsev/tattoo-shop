from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone

# Create your models here.


class TattooSketch(models.Model):
    """Эскизы татуировок"""
    id = models.AutoField(primary_key=True)
    title = models.CharField('Название эскиза', max_length=125)
    description = models.TextField('Описание эскиза', max_length=255)
    vacant = models.BooleanField('свободен ли эскиз', default=True)


class Cart(models.Model):
    """Модель карзины """
    pass


class CartProduct(models.Model):
    pass


class Product(models.Model):
    pass


class Customer(models.Model):
    """Модель покупателя"""
    id = models.AutoField(primary_key=True)
    email = models.EmailField('email address')
    phone_number = PhoneNumberField('Номер телефона', unique=True)
    name = models.CharField('Имя пользователя', max_length=30)
    surname = models.CharField('Фамилия пользователя', max_length=30)
    patronymic = models.CharField('Отчество пользователя', max_length=30)


class ProductPhoto(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.CharField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)


class TattooSketchPhoto(models.Model):
    id = models.AutoField(primary_key=True)
    url = models.CharField(255)
    sketch_id = models.ForeignKey(TattooSketch, on_delete=models.CASCADE)


