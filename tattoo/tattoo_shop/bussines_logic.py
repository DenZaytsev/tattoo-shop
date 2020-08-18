from .models import TattooSketch


def vacant_sketches():
    """выдает все незабронированные эскизы"""
    return TattooSketch.objects.filter(vacant=True)


def get_sketch(primary_key: int):
    """отдает эскиз по его id"""
    return TattooSketch.objects.get(id=primary_key)
