Запускаем контейнер:
---
```bash
docker-compose up -d
```

Создание пользователя для админки:
---
```bash
docker-compose exec web python manage.py createsuperuser
```

Проверьте наличие ошибок в журналах, если это не работает, через команду:
---
```bash
docker-compose logs -f
```
