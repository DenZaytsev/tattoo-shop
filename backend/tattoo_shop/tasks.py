from celery import task
from django.core.mail import send_mail
from .models import Order


@task
def order_created(order_id):
    """
    Задача для отправки уведомления по электронной почте при успешном создании заказа.
    """

    order = Order.objects.get(id=order_id)
    subject = f'Order nr. {order_id}'
    message = f'Dear {order.first_name},\n\nYou have successfully placed an order.\
                Your order id is {order.id}.'
    mail_sent = send_mail(subject,
                          message,
                          'deserza@gmail.com',
                          [order.email])
    return mail_sent