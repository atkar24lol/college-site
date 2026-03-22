from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.contrib import messages
from django.db import IntegrityError
from modeltranslation.admin import TranslationAdmin

import apps.news.translation  # noqa: F401 — регистрация переводов до TranslationAdmin

from apps.news.models import News


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


@admin.register(News)
class NewsAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True

    list_display = ["id", "title", "date", "preview_image"]
    list_filter = ["date"]
    search_fields = ["title", "description"]
    date_hierarchy = "date"
    ordering = ["-date"]

    fieldsets = (
        (
            _("Публикация"),
            {"fields": ("date", "image")},
        ),
        (
            _("Тексты (переводы по вкладкам: русский / English / кыргызча)"),
            {"fields": ("title", "description")},
        ),
    )

    @admin.display(description="Превью")
    def preview_image(self, obj):
        if not obj.image:
            return "—"
        try:
            url = obj.image.url
        except Exception:
            return "—"
        return format_html(
            '<img src="{}" width="44" height="44" style="object-fit:cover;border-radius:4px" alt="" />',
            url,
        )
