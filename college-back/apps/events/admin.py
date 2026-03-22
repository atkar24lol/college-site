from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.events.models import (
    Event
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

@admin.register(Event)
class EvemtAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "background", "duration", "description", "location", "type"]