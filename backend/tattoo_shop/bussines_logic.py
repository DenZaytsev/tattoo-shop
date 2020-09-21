from .models import TattooSketch, Category, TShirt, Sticker, Product
from .serializers import TShirtDetailSerializer, StickerDetailSerializer, TShirtListSerializer, StickerListSerializer
from typing import Dict


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
    """Возвтащает информацию  всем продуктам.

            [
          {
             categoryid: 1,
             categoryTitle: "Футболки",
             content: [ {//продукт-футболка}, {...}, ...]
          },
          {
             categoryid: 2,
             categoryTitle: "Лампы блять",
            content: [ // список всех ламп]
          }
        ]
    """
    products: list = []
    product_qyerysets = get_all_product_qyeryset()

    for product_qyeryset in product_qyerysets:
        first_item = product_qyeryset.first()
        model_name = product_qyeryset.model.__name__
        category_id, category_title = first_item.category.id, model_name.lower()
        content = MODEL_CLASS_LIST_SERIALIZER.get(model_name)(product_qyeryset, many=True).data

        data = {
            'categoryId': category_id,
            'categoryTitle': category_title,
            'content': content
        }
        products.append(data)
    return products


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


def get_error_data(exception) -> Dict[str, str]:
    data = {
        'errorMassege': str(exception),
        'errorClass': str(exception.__class__),
    }
    return data
