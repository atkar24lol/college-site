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
    Sample,
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
        count = Email_sending.objects.count()
        if count == 0:
            return True
        return False


@admin.register(FAQ)
class FAQAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "question", "answer"]


@admin.register(Contact_information)
class Contact_informationAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "text", "type"]


@admin.register(Sertificate)
class SertificateAdmin(DuplicateActionAdminMixin, TranslationAdmin):
    list_display = ["id", "sort_order", "section", "title", "image"]
    list_filter = ["section"]
    sortable_by = ["sort_order", "id"]


@admin.register(Images_for_multimedia)
class Images_for_multimediaAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = [
        "id",
        "type",
        "preview_thumb",
        "title_ru",
        "link",
        "video_file",
    ]
    list_filter = ["type"]
    search_fields = ["title_ru", "title_ky", "title_en"]
    fieldsets = (
        (
            _("Тип"),
            {"fields": ("type",)},
        ),
        (
            _("Название (переводы)"),
            {"fields": ("title_ru", "title_ky", "title_en")},
        ),
        (
            _("Изображение / постер"),
            {
                "fields": ("image",),
                "description": _(
                    "Обязательно для типа «Фото». "
                    "Для «Видео» можно загрузить постер или оставить пустым."
                ),
            },
        ),
        (
            _("Видео"),
            {
                "fields": ("link", "video_file"),
                "description": _(
                    "Только для типа «Видео»: вставьте ссылку на ролик YouTube/Vimeo "
                    "или загрузите файл MP4/WebM. Не заполняйте ссылку и файл одновременно."
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
class ContactAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "role", "email", "contact"]

@admin.register(Block_of_contact)
class Block_of_contactAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "contact", "email"]

@admin.register(Lecturer)
class LecturerAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "name", "avatar", "age", "bio", "subject"]

@admin.register(Sample)
class SampleAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "description", "file", "date"]
