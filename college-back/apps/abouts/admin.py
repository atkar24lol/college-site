import apps.abouts.translation  # noqa: F401 — регистрация переводов до TranslationAdmin

from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.abouts.models import (
    Email_sending,
    Contact,
    FAQ,
    Sertificate,
    Images_for_multimedia,
    Lecturer,
    Graduate,
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
# Новости обратной связи: почта получателя
# ──────────────────────────────────────────────

@admin.register(Email_sending)
class Email_sendingAdmin(admin.ModelAdmin):
    list_display = ["receiver"]

    def has_add_permission(self, request):
        return Email_sending.objects.count() == 0


# ──────────────────────────────────────────────
# Часто задаваемые вопросы (FAQ — страница «Абитуриентам»)
# ──────────────────────────────────────────────

@admin.register(FAQ)
class FAQAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["question_ru"]
    search_fields = ["question_ru", "answer_ru"]

    fieldsets = (
        (_("Вопрос и ответ"), {
            "description": _("Заполните на русском языке — остальные вкладки (EN, KY) по желанию."),
            "fields": ("question", "answer"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("question_ru", "answer_ru"):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form


# ──────────────────────────────────────────────
# Награды и сертификаты (страница «Награды»)
# ──────────────────────────────────────────────

@admin.register(Sertificate)
class SertificateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["section", "sort_order", "title_ru", "image_preview"]
    list_filter = ["section"]
    ordering = ["section", "sort_order", "id"]

    fieldsets = (
        (_("Раздел и порядок"), {
            "description": _(
                "«Зал славы» — крупные достижения с фото. "
                "«Благодарности партнёрам» — грамоты от сторонних организаций. "
                "«Прочие» — всё остальное."
            ),
            "fields": ("section", "sort_order"),
        }),
        (_("Изображение грамоты / сертификата"), {"fields": ("image",)}),
        (_("Название и описание"), {
            "description": _("Заполните на русском языке. Вкладки EN / KY — по желанию."),
            "fields": ("title", "description"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("description_ru",):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form

    @admin.display(description=_("Превью"))
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="56" height="40" style="object-fit:cover;border-radius:4px" alt="" />',
                obj.image.url,
            )
        return "—"


# ──────────────────────────────────────────────
# Галерея (фото и видео)
# ──────────────────────────────────────────────

@admin.register(Images_for_multimedia)
class Images_for_multimediaAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["type", "image_preview", "title_ru", "link"]
    list_filter = ["type"]
    search_fields = ["title_ru"]

    fieldsets = (
        (_("Тип материала"), {
            "description": _("Выберите «Фото» или «Видео» — от этого зависит, какие поля нужно заполнить."),
            "fields": ("type",),
        }),
        (_("Название"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("title",),
        }),
        (_("Изображение"), {
            "description": _("Для типа «Фото» — обязательно. Для «Видео» — постер (необязательно)."),
            "fields": ("image",),
        }),
        (_("Видео"), {
            "description": _(
                "Только для типа «Видео». Заполните либо ссылку (YouTube/Vimeo), "
                "либо загрузите файл — не оба варианта сразу."
            ),
            "fields": ("link", "video_file"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("title_ru",):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form

    @admin.display(description=_("Превью"))
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="56" height="40" style="object-fit:cover;border-radius:4px" alt="" />',
                obj.image.url,
            )
        return "—"


# ──────────────────────────────────────────────
# Контакты — карточки на странице «Контакты»
# ──────────────────────────────────────────────

@admin.register(Contact)
class ContactAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["title_ru", "role_ru", "email", "contact"]
    search_fields = ["title_ru", "email", "contact"]

    fieldsets = (
        (_("Контактные данные"), {
            "description": _("Email и телефон одинаковы на всех языках — заполняются один раз."),
            "fields": ("email", "contact"),
        }),
        (_("ФИО и должность"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("title", "role"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("title_ru",):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form


# ──────────────────────────────────────────────
# Преподаватели
# ──────────────────────────────────────────────

@admin.register(Lecturer)
class LecturerAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["name_ru", "subject_ru", "age"]

    fieldsets = (
        (_("Фото и возраст"), {"fields": ("avatar", "age")}),
        (_("ФИО, биография, предмет"), {
            "description": _("Заполните на русском. Вкладки EN / KY — по желанию."),
            "fields": ("name", "bio", "subject"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("name_ru", "bio_ru", "subject_ru"):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form


# ──────────────────────────────────────────────
# Наши выпускники
# ──────────────────────────────────────────────

@admin.register(Graduate)
class GraduateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["sort_order", "is_published", "title_ru", "image_preview"]
    list_filter = ["is_published"]
    ordering = ["sort_order", "id"]
    search_fields = ["title_ru", "description_ru"]

    fieldsets = (
        (_("Публикация и порядок"), {
            "description": _("Снимите галочку «Опубликовано», чтобы скрыть карточку с сайта без удаления."),
            "fields": ("is_published", "sort_order"),
        }),
        (_("Фото выпускника"), {"fields": ("image",)}),
        (_("Содержимое карточки"), {
            "description": _(
                "«Метка» — маленький значок над заголовком (например «Выпускник 2023»). "
                "Заполните на русском. Вкладки EN / KY — по желанию."
            ),
            "fields": ("label", "title", "description"),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        for f in ("title_ru", "description_ru"):
            if f in form.base_fields:
                form.base_fields[f].required = True
        return form

    @admin.display(description=_("Фото"))
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="44" height="44" style="object-fit:cover;border-radius:50%" alt="" />',
                obj.image.url,
            )
        return "—"
