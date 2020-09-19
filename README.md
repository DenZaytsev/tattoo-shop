Запускаем контейнер:
---
```bash
docker-compose up -d
```


Команды очистки (flush) и миграции (migrate) базы :
---
```bash
docker-compose exec web python manage.py flush --no-input
docker-compose exec web python manage.py migrate
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
