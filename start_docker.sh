#!/bin/sh

sudo docker-compose up -d --build

sudo docker-compose exec web python manage.py makemigrations tattoo_shop
sudo docker-compose exec web python manage.py migrate
sudo docker-compose exec web python manage.py createsuperuser
