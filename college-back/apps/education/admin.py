from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.education.models import (
    Admission_date,
    Specialtie,
    Scholorship_grant,
    Schedule,
    Courses_programms
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

@admin.register(Admission_date)
class Admission_dateAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "event_date", "description"]


@admin.register(Specialtie)
class SpecialtieAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "description", "study_time", "type", "budget", ]

@admin.register(Scholorship_grant)
class Scholorship_grantAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "type"]


@admin.register(Courses_programms)
class Courses_programmsAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "description", "duration", "mini_description", "price", "type"]


@admin.register(Schedule)
class ScheduleAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "file",
    ]
