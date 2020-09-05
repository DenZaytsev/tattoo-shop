from django.contrib import admin
from .models import *


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['content_type']


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id',
                    'first_name',
                    'last_name',
                    'address',
                    'status',
                    'created_at',
                    ]
    list_filter = ['status']
    inlines = [OrderItemInline]


admin.site.register(Order, OrderAdmin)
admin.site.register(Customer)
admin.site.register(TattooSketch)

admin.site.register(Category)

admin.site.register(TShirt)
admin.site.register(Sticker)

