from django.contrib import admin
from django.contrib import messages
from django.utils.translation import gettext_lazy as _
from django.db import IntegrityError
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
class SertificateAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = ["id", "title", "description", "image"]


@admin.register(Images_for_multimedia)
class Images_for_multimediaAdmin(DuplicateActionAdminMixin, admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "image",
        "link",
        "type"
    ]


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
