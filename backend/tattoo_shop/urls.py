from django.urls import path

from .views import (
    TattooSketchCreateView,
    CustomerCreateView,
    VacantTattooSketchListView,
    TattooSketchDetailView,
    CategoryListView,
    CreateOrderView,
    ProductDetailView,
    ProductsInCategoryListView,
    ProductListView
)

urlpatterns = [
    path('sketch/create/', TattooSketchCreateView.as_view()),
    path('customer/create/', CustomerCreateView.as_view()),
    path('sketch/vacant/', VacantTattooSketchListView.as_view()),
    path('sketch/<str:slug>/', TattooSketchDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('order/create/', CreateOrderView.as_view(), name='create_order'),
    path('products/', ProductListView.as_view(), name='all_products'),
    path('products/<str:category_title>/', ProductsInCategoryListView.as_view(), name='products_in_category_list'),
    path('products/<str:category_title>/<str:product_slug>/', ProductDetailView.as_view(), name='product_detail'),

]
