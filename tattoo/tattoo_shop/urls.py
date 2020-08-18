from django.urls import path

from .views import TattooSketchCreateView, CustomerCreateView, TattooSketchListView, TattooSketchDetailView


urlpatterns = [
    path('tattoo_sketch/create/', TattooSketchCreateView.as_view()),
    path('customer/create/', CustomerCreateView.as_view()),
    path('tattoo_sketch/vacant/', TattooSketchListView.as_view()),
    path('tattoo_sketch/<int:pk>', TattooSketchDetailView.as_view()),

]