"""Настройка заголовков стандартной админки Django (русский интерфейс)."""
from django.contrib import admin

admin.site.site_header = "Сайт АТК — администрирование"
admin.site.site_title = "АТК"
admin.site.index_title = "Панель управления"
