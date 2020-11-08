from typing import Any

from django.contrib.contenttypes.models import ContentType
from django.http import Http404


def get_model_or_404(category_title: str) -> Any:
    """Возвращает модель или кидает ошибку 404."""
    try:
        model = ContentType.objects.get(model=category_title).model_class()
    except ContentType.DoesNotExist:
        raise Http404("Category does not exist")
    return model
