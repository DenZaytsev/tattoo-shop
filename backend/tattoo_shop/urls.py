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
    CartDetailView,
    AddToCartView,
    RemoveCartView,
    ClearCartView,
    ProductListView
)

urlpatterns = [
    path('sketch/create/', TattooSketchCreateView.as_view()),
    path('products/', ProductListView.as_view()),
    path('customer/create/', CustomerCreateView.as_view()),
    path('sketch/vacant/', VacantTattooSketchListView.as_view()),
    path('sketch/<str:slug>/', TattooSketchDetailView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('order/create/', CreateOrderView.as_view(), name='create_order'),
    path('products/<int:category_id>/<str:slug>/', ProductDetailView.as_view(), name='product_detail'),
    path('products/<int:category_id>/', ProductsInCategoryListView.as_view(), name='products_in_category_list'),
    path('cart/', CartDetailView.as_view(), name='cart'),
    path('add-to-cart/', AddToCartView.as_view(), name='add_to_cart'),
    path('remove-to-cart/', RemoveCartView.as_view(), name='remove_to_cart'),
    path('clear-cart/', ClearCartView.as_view(), name='clear_cart'),
]
