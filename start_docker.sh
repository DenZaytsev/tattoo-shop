#!/bin/sh

sudo docker-compose up -d --build

sudo docker-compose exec web python manage.py createsuperuser
