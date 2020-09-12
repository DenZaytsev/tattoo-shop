from .models import TattooSketch, Category, TShirt, Sticker, Product
from .serializers import TShirtDetailSerializer, StickerDetailSerializer


def vacant_sketches():
    """выдает все незабронированные эскизы"""
    return TattooSketch.objects.filter(vacant=True)


def get_sketch(slug: str):
    """отдает эскиз по его id"""
    return TattooSketch.objects.get(slug=slug)


def all_category():
    """выдает все имеющиеся категории"""
    return Category.objects.all()


def get_product_models():
    return Product.__subclasses__()


def get_all_product_qyeryset() -> list:
    product_models = get_product_models()
    return [model.objects.all() for model in product_models]


def all_product_dict() -> dict:
    """возвтащает словарь со всеми продуктами"""
    products = {}

    product_qyerysets = get_all_product_qyeryset()
    for product_qyeryset in product_qyerysets:
        model_name = product_qyeryset.model.__name__
        products[model_name] = MODEL_CLASS_SERIALIZER.get(model_name)(product_qyeryset, many=True).data

    return products


CT_MODEL_MODEL_CLASS = {
        't-shirts': TShirt,
        'stickers': Sticker
    }

MODEL_CLASS_SERIALIZER = {
    'TShirt': TShirtDetailSerializer,
    'Sticker': StickerDetailSerializer,
}