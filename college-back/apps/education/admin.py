from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

import apps.education.translation  # noqa: F401 — регистрация переводов до TranslationAdmin

from apps.education.models import (
    Admission_date,
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
class Admission_dateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "title", "event_date"]
    date_hierarchy = "event_date"
    ordering = ["-event_date"]
    fieldsets = (
        (_("Дата и время"), {"fields": ("event_date",)}),
        (_("Тексты (переводы по языкам)"), {"fields": ("title", "description")}),
    )


@admin.register(Courses_programms)
class Courses_programmsAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True

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
    search_fields = ["title", "description", "mini_description", "category"]

    fieldsets = (
        (
            _("Где показывать на сайте"),
            {
                "fields": (
                    "sort_order",
                    "type",
                    "show_on_additional_education",
                    "show_on_international",
                ),
                "description": _(
                    "Галочки разделяют каталог «Дополнительное образование» и блок «Международное сотрудничество»."
                ),
            },
        ),
        (
            _("Каталог: поля без перевода"),
            {
                "fields": ("price", "image"),
            },
        ),
        (
            _("Каталог: переводы (русский / EN / KY по вкладкам)"),
            {
                "fields": (
                    "title",
                    "category",
                    "study_format",
                    "start_info",
                    "duration",
                    "mini_description",
                    "description",
                ),
            },
        ),
    )


@admin.register(Schedule)
class ScheduleAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "title", "file"]
    fieldsets = (
        (_("Файл"), {"fields": ("file",)}),
        (_("Название (переводы по языкам)"), {"fields": ("title",)}),
    )


@admin.register(LectureMaterialsSection)
class LectureMaterialsSectionAdmin(TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "section_title"]

    fieldsets = (
        (
            _("Тексты для страницы «Преподавателям» (переводы по языкам)"),
            {"fields": ("section_title", "aside_note")},
        ),
    )

    def has_add_permission(self, request):
        return not LectureMaterialsSection.objects.exists()


@admin.register(LecturePreparationMaterial)
class LecturePreparationMaterialAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "sort_order", "title", "file", "link"]
    ordering = ["sort_order", "id"]

    fieldsets = (
        (_("Порядок"), {"fields": ("sort_order",)}),
        (
            _("Заголовок и описание (переводы по языкам)"),
            {"fields": ("title", "description", "button_text")},
        ),
        (
            _("Файл или внешняя ссылка"),
            {
                "fields": ("file", "link"),
                "description": _("Заполните файл **или** ссылку — не оба, если так задумано на сайте."),
            },
        ),
    )
