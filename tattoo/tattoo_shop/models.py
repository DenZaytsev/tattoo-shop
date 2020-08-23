from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.urls import reverse
from django.utils import timezone


User = get_user_model()


def get_models_for_count(*model_names):
    return [models.Count(model_name) for model_name in model_names]


def get_product_url(obj, viewname):
    ct_model = obj.__class__._meta.model_name
    return reverse(viewname, kwargs={'ct_model': ct_model, 'slug': obj.slug})


class CategoryManager(models.Manager):

    CATEGORY_NAME_COUNT_NAME = {
        'футболки': 'tshort__count',
        'наклейки': 'sticker__count'
    }

    def get_queryset(self):
        return super().get_queryset()

    def get_categories_for_left_sidebar(self):
        models = get_models_for_count('tshort', 'sticker')
        qs = list(self.get_queryset().annotate(*models))
        data = [
            dict(name=c.name, url=c.get_absolute_url(), count=getattr(c, self.CATEGORY_NAME_COUNT_NAME[c.name]))
            for c in qs
        ]
        return data


class Category(models.Model):
    """категория товара"""
    name = models.CharField("название категории", max_length=155)
    slug = models.SlugField(unique=True)
    objects = CategoryManager()

    def __str__(self):
        return self.name


class TattooSketch(models.Model):
    """Эскизы татуировок"""
    title = models.CharField('Название эскиза', max_length=125, blank=False)
    description = models.TextField('Описание эскиза', max_length=255, blank=False)
    vacant = models.BooleanField('свободен ли эскиз', default=True)
    image = models.ImageField(verbose_name='Изображение')
    slug = models.SlugField(unique=True)


class Product(models.Model):

    class Meta:
        abstract = True

    title = models.CharField('Название товара', max_length=125, blank=False)
    description = models.TextField('Описание товара', max_length=255, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveSmallIntegerField(default=0)
    category = models.ForeignKey(Category, verbose_name="категория", on_delete=models.CASCADE)
    slug = models.SlugField(unique=True)
    image = models.ImageField(verbose_name='Изображение', blank=False)

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
    orders = models.ManyToManyField('Order', verbose_name='Заказы покупателя', related_name='related_order')

    def __str__(self):
        return f"{self.email}"


class OrderItem(models.Model):
    """"""
    order = models.ForeignKey('Order', related_name='items', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    quantity = models.PositiveSmallIntegerField(default=1, verbose_name='количество вещей в корзине')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='цена')

    def __str__(self):
        return f"{self.content_object}"

    def get_cost(self):
        return self.price * self.quantity


class TShirt(Product):
    """Модель футболки"""
    SIZE_CHOICES = [
        ('S', 'SMALL'),
        ('M', 'MEDIUM'),
        ('L', 'LARGE'),
        ('XL', 'EXTRA LARGE'),
    ]

    COLOUR_CHOICES = [
        ('B', 'BLACK'),
        ('W', 'WHITE')
    ]

    size = models.CharField(
        max_length=3,
        choices=SIZE_CHOICES
    )
    colour = models.CharField(
        max_length=1,
        choices=COLOUR_CHOICES
    )

    def __str__(self):
        return f"{self.title} размера {self.size}"

    def get_absolute_url(self):
        return get_product_url(self, 'product_detail')


class Sticker(Product):
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title}"

    def get_absolute_url(self):
        return get_product_url(self, 'product_detail')


class Order(models.Model):

    STATUS_NEW = 'new'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_READY = 'is_ready'
    STATUS_COMPLETED = 'completed'

    BUYING_TYPE_SELF = 'self'
    BUYING_TYPE_DELIVERY = 'delivery'

    STATUS_CHOICES = (
        (STATUS_NEW, 'Новый заказ'),
        (STATUS_IN_PROGRESS, 'Заказ в обработке'),
        (STATUS_READY, 'Заказ готов'),
        (STATUS_COMPLETED, 'Заказ выполнен')
    )

    BUYING_TYPE_CHOICES = (
        (BUYING_TYPE_SELF, 'Самовывоз'),
        (BUYING_TYPE_DELIVERY, 'Доставка')
    )

    first_name = models.CharField(max_length=255, verbose_name='Имя', blank=True)
    last_name = models.CharField(max_length=255, verbose_name='Фамилия', blank=True)
    phone = PhoneNumberField(max_length=20, verbose_name='Телефон', blank=True)
    address = models.CharField(max_length=1024, verbose_name='Адрес', null=True, blank=True)

    status = models.CharField(
        max_length=100,
        verbose_name='Статус заказ',
        choices=STATUS_CHOICES,
        default=STATUS_NEW
    )
    buying_type = models.CharField(
        max_length=100,
        verbose_name='Тип заказа',
        choices=BUYING_TYPE_CHOICES,
        default=BUYING_TYPE_SELF
    )
    comment = models.TextField(verbose_name='Комментарий к заказу', null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True, verbose_name='Дата создания заказа')
    order_date = models.DateField(verbose_name='Дата получения заказа', default=timezone.now)

    def __str__(self):
        return str(self.id)

    def get_total_price(self):
        return sum(item.get_price() for item in self.items.all())
