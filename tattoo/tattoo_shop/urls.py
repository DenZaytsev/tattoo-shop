from django.urls import path
from .views import TattooSketchCreateView, OrderCreateView


urlpatterns = [
    path('tattoo_sketch/create/', TattooSketchCreateView.as_view()),
    path('order/create/', OrderCreateView.as_view()),
]