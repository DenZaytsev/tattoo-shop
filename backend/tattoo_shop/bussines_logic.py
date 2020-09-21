from django.contrib.contenttypes.models import ContentType
from rest_framework.response import Response
from django.http import Http404
from .models import TattooSketch, Category, TShirt, Sticker, Product
from .serializers import TShirtDetailSerializer, StickerDetailSerializer, TShirtListSerializer, StickerListSerializer
from typing import Dict, Any


CT_MODEL_MODEL_CLASS = {
    'tshirt': TShirt,
    'sticker': Sticker
}


MODEL_CLASS_LIST_SERIALIZER = {
    TShirt: TShirtListSerializer,
    Sticker: StickerListSerializer,
}


MODEL_CLASS_DETAIL_SERIALIZER = {
    TShirt: TShirtDetailSerializer,
    Sticker: StickerDetailSerializer,
}


MODEL_CLASS_CT_MODEL = {
    'TShirt': 'tshirt',
    'Sticker': 'sticker',
}


def vacant_sketches():
    """выдает все незабронированные эскизы"""
    return TattooSketch.objects.filter(vacant=True)


def get_sketch(slug: str):
    """отдает эскиз по его id"""
    return TattooSketch.objects.get(slug=slug)


def all_category():
    """Выдает все имеющиеся категории."""
    return Category.objects.all()


def get_product_models() -> list:
    """Возвращает список с классами продуктов.    """
    return Product.__subclasses__()


def get_all_product_qyeryset() -> list:
    product_models = get_product_models()
    return [model.objects.all() for model in product_models]


def all_product_data() -> list:
    """Возвтащает информацию по всем продуктам.
        Пример:
            [
          {
             categoryId: 1,
             categoryTitle: "Футболки",
             content: [ {//продукт-футболка}, {...}, ...]
          },
          {
             categoryId: 2,
             categoryTitle: "Лампы блять",
            content: [ // список всех ламп]
          }
        ]
    """
    products: list = []
    product_qyerysets = get_all_product_qyeryset()

    for product_qyeryset in product_qyerysets:
        first_item = product_qyeryset.first()

        if first_item is None:
            continue

        model = product_qyeryset.model
        serializer = MODEL_CLASS_LIST_SERIALIZER.get(model)
        category_id, category_title = first_item.category.id, model.__name__.lower()
        content = serializer(product_qyeryset, many=True).data

        data = {
            'categoryId': category_id,
            'categoryTitle': category_title,
            'content': content
        }
        products.append(data)

    return products


def get_error_data(exception) -> Dict[str, str]:
    data = {
        'errorMessage': str(exception),
        'errorClass': str(exception.__class__),
    }
    return data


def get_model_or_404(category_title: str) -> Any:
    """Возвращает модель или кидает ошибку 404."""
    try:
        model = ContentType.objects.get(model=category_title).model_class()
    except ContentType.DoesNotExist:
        raise Http404("Category does not exist")
    return model
