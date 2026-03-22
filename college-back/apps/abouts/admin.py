# Регистрация modeltranslation должна выполниться до импорта TranslationAdmin и autodiscover.
import apps.abouts.translation  # noqa: F401, E402

from django.contrib import admin
from django.contrib import messages
from django.db import IntegrityError
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from modeltranslation.admin import TranslationAdmin

from apps.abouts.models import (
    Email_sending,
    Contact,
    Contact_information,
    FAQ,
    Sertificate,
    Images_for_multimedia,
    Block_of_contact,
    Lecturer,
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


@admin.register(Email_sending)
class Email_sendingAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "receiver"]

    def has_add_permission(self, request):
        return Email_sending.objects.count() == 0


@admin.register(FAQ)
class FAQAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "question"]
    search_fields = ["question", "answer"]
    fieldsets = (
        (_("Вопрос и ответ (переводы по языкам)"), {"fields": ("question", "answer")}),
    )


@admin.register(Contact_information)
class Contact_informationAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "type", "title", "text"]
    list_filter = ["type"]
    fieldsets = (
        (_("Тип строки"), {"fields": ("type",)}),
        (_("Тексты (переводы по языкам)"), {"fields": ("title", "text")}),
    )


@admin.register(Sertificate)
class SertificateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "sort_order", "section", "title", "image"]
    list_filter = ["section"]
    ordering = ["section", "sort_order", "id"]

    fieldsets = (
        (
            _("Раздел на сайте «Награды»"),
            {
                "fields": ("section", "sort_order"),
                "description": _(
                    "«Зал славы» и «Партнёры» — отдельные блоки; «Прочие» — остальная сетка."
                ),
            },
        ),
        (
            _("Подпись и описание (переводы по языкам)"),
            {"fields": ("title", "description")},
        ),
        (_("Изображение грамоты / сертификата"), {"fields": ("image",)}),
    )


@admin.register(Images_for_multimedia)
class Images_for_multimediaAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = [
        "id",
        "type",
        "preview_thumb",
        "title",
        "link",
        "video_file",
    ]
    list_filter = ["type"]
    search_fields = ["title"]

    fieldsets = (
        (_("Тип"), {"fields": ("type",)}),
        (
            _("Название (переводы по языкам)"),
            {
                "fields": ("title",),
                "description": _("Одно поле «Название» — ниже переключатель RU / EN / KY, без дублирования «Название» и «Название RU»."),
            },
        ),
        (
            _("Изображение / постер"),
            {
                "fields": ("image",),
                "description": _(
                    "Обязательно для типа «Фото». Для «Видео» можно загрузить постер или оставить пустым."
                ),
            },
        ),
        (
            _("Видео"),
            {
                "fields": ("link", "video_file"),
                "description": _(
                    "Только для типа «Видео»: ссылка YouTube/Vimeo **или** файл MP4/WebM — не оба сразу."
                ),
            },
        ),
    )

    @admin.display(description=_("Превью"))
    def preview_thumb(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="56" height="40" style="object-fit:cover;border-radius:4px" alt="" />',
                obj.image.url,
            )
        return "—"


@admin.register(Contact)
class ContactAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "title", "role", "email", "contact"]
    search_fields = ["title", "role", "email", "contact"]
    fieldsets = (
        (
            _("Контакты без перевода"),
            {"fields": ("email", "contact")},
        ),
        (
            _("ФИО и роль (переводы по языкам)"),
            {"fields": ("title", "role")},
        ),
    )


@admin.register(Block_of_contact)
class Block_of_contactAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "title", "contact", "email"]
    fieldsets = (
        (_("Без перевода"), {"fields": ("contact", "email")}),
        (_("Заголовок (переводы по языкам)"), {"fields": ("title",)}),
    )


@admin.register(Lecturer)
class LecturerAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    group_fieldsets = True
    list_display = ["id", "name", "avatar", "age", "subject"]
    fieldsets = (
        (
            _("Фото и возраст (без перевода)"),
            {"fields": ("avatar", "age")},
        ),
        (
            _("ФИО, био, предмет (переводы по языкам)"),
            {"fields": ("name", "bio", "subject")},
        ),
    )

