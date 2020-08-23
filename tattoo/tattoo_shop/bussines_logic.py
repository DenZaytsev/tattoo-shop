from .models import TattooSketch, Category


def vacant_sketches():
    """выдает все незабронированные эскизы"""
    return TattooSketch.objects.filter(vacant=True)


def get_sketch(slug: str):
    """отдает эскиз по его id"""
    return TattooSketch.objects.get(slug=slug)


def all_category():
    """выдает все имеющиеся категории"""
    return Category.objects.all()
