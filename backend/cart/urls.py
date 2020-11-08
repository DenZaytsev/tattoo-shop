from django.urls import path

from cart.views import CartDetailView, AddToCartView, RemoveCartView, ClearCartView, TestView

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart'),
    path('add-to-cart/', AddToCartView.as_view(), name='add_to_cart'),
    path('remove-to-cart/', RemoveCartView.as_view(), name='remove_to_cart'),
    path('clear-cart/', ClearCartView.as_view(), name='clear_cart'),
    path('test/', TestView.as_view(), name='test_cart'),

]
