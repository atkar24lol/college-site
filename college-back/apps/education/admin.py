from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

import apps.education.translation  # noqa: F401 — регистрация переводов до TranslationAdmin

from apps.education.models import (
    Admission_date,
    Scholorship_grant,
    Schedule,
    Courses_programms,
    LectureMaterialsSection,
    LecturePreparationMaterial,
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


@admin.register(Scholorship_grant)
class Scholorship_grantAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "type"]


@admin.register(Courses_programms)
class Courses_programmsAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    list_display = [
        "id",
        "sort_order",
        "title",
        "category",
        "price",
        "show_on_additional_education",
        "show_on_international",
    ]
    list_filter = ["show_on_additional_education", "show_on_international", "type"]
    ordering = ["sort_order", "id"]


@admin.register(Schedule)
class ScheduleAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "file",
    ]


@admin.register(LectureMaterialsSection)
class LectureMaterialsSectionAdmin(TranslationAdmin):
    list_display = ["id", "section_title"]

    def has_add_permission(self, request):
        return not LectureMaterialsSection.objects.exists()


@admin.register(LecturePreparationMaterial)
class LecturePreparationMaterialAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    list_display = ["id", "sort_order", "title", "file", "link"]
    exclude = ("button_text",)
