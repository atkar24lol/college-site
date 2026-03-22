from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib import messages
from django.db import IntegrityError
from modeltranslation.admin import TranslationAdmin

from apps.news.models import (
    News,
    Main_page_news
)


class DuplicateActionAdminMixin:
    @admin.action(description=_("Копировать выбранные элементы"))
    def duplicate_selected(self, request, queryset):
        duplicated_count = 0
        skipped_count = 0

        for obj in queryset:
            original_pk = obj.pk
            obj.pk = None
            obj.id = None
            try:
                obj.save()
                duplicated_count += 1
            except IntegrityError:
                skipped_count += 1
            finally:
                obj.pk = original_pk

        if duplicated_count:
            self.message_user(
                request,
                _("Скопировано элементов: %(count)s") % {"count": duplicated_count},
            )
        if skipped_count:
            self.message_user(
                request,
                _("Не удалось скопировать элементов: %(count)s (ограничения уникальности)")
                % {"count": skipped_count},
                level=messages.WARNING,
            )

    actions = ["duplicate_selected"]


@admin.register(Main_page_news)
class Main_page_newsAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "news_1", "news_2", "news_3", "news_4"]

    def has_add_permission(self, request):
        count = Main_page_news.objects.count()
        if count == 0:
            return True
        return False


@admin.register(News)
class NewsAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "description", "image", "date"]

