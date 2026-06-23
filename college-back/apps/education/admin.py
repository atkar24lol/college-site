import apps.education.translation  # noqa: F401 — регистрация переводов до TranslationAdmin

from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.education.models import (
    Admission_date,
    Schedule,
    Courses_programms,
    LecturePreparationMaterial,
    # LectureMaterialsSection намеренно не импортируется — раздел убран из админки
)

# ──────────────────────────────────────────────
# Вспомогательный миксин: действие «Копировать»
# ──────────────────────────────────────────────

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
            self.message_user(request, _("Скопировано: %(c)s") % {"c": duplicated_count})
        if skipped_count:
            self.message_user(
                request,
                _("Не удалось скопировать: %(c)s (нарушение уникальности)") % {"c": skipped_count},
                level=messages.WARNING,
            )

    actions = ["duplicate_selected"]


# ──────────────────────────────────────────────
# Сроки приёмной кампании (страница «Абитуриентам»)
# ──────────────────────────────────────────────

@admin.register(Admission_date)
class Admission_dateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["title_ru", "event_date"]
    date_hierarchy = "event_date"
    ordering = ["-event_date"]

    fieldsets = (
        (_("Дата и время"), {
            "description": _("Укажите дату начала или срок подачи документов."),
            "fields": ("event_date",),
        }),
        (_("Название и описание"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("title", "description"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("title_ru", "description_ru"):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form


# ──────────────────────────────────────────────
# Курсы и программы (доп. образование / межд. сотрудничество)
# ──────────────────────────────────────────────

@admin.register(Courses_programms)
class Courses_programmsAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True

    list_display = [
        "title_ru",
        "type",
        "price",
        "show_on_additional_education",
        "show_on_international",
        "sort_order",
    ]
    list_filter = ["type", "show_on_additional_education", "show_on_international"]
    ordering = ["sort_order", "id"]
    search_fields = ["title_ru", "description_ru", "category_ru"]

    fieldsets = (
        (_("Где показывать на сайте"), {
            "description": _(
                "Выберите, в каком разделе сайта появится этот курс. "
                "Можно отметить оба варианта одновременно."
            ),
            "fields": ("show_on_additional_education", "show_on_international", "type", "sort_order"),
        }),
        (_("Цена и изображение"), {
            "fields": ("price", "image"),
        }),
        (_("Название, описание и детали"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": (
                "title",
                "category",
                "study_format",
                "start_info",
                "duration",
                "mini_description",
                "description",
            ),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("title_ru", "mini_description_ru", "description_ru", "duration_ru"):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form


# ──────────────────────────────────────────────
# Расписание (файлы)
# ──────────────────────────────────────────────

@admin.register(Schedule)
class ScheduleAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["title_ru", "file"]

    fieldsets = (
        (_("Файл расписания"), {
            "description": _("Загрузите PDF или другой документ с расписанием."),
            "fields": ("file",),
        }),
        (_("Название"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("title",),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if "title_ru" in form.base_fields:
            form.base_fields["title_ru"].required = True
        return form


# ──────────────────────────────────────────────
# Материалы для подготовки лекций (страница «Преподавателям»)
# ──────────────────────────────────────────────

@admin.register(LecturePreparationMaterial)
class LecturePreparationMaterialAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["sort_order", "title_ru", "file", "link"]
    ordering = ["sort_order", "id"]

    fieldsets = (
        (_("Порядок в списке"), {"fields": ("sort_order",)}),
        (_("Заголовок и описание"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("title", "description", "button_text"),
        }),
        (_("Файл или ссылка"), {
            "description": _(
                "Загрузите файл (PDF, DOCX…) или укажите ссылку на внешний ресурс. "
                "Если оставить пустым — кнопки на сайте не будет."
            ),
            "fields": ("file", "link"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if "title_ru" in form.base_fields:
            form.base_fields["title_ru"].required = True
        return form
