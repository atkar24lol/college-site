from modeltranslation.translator import register, TranslationOptions

from apps.abouts.models import (
    Email_sending,
    Contact,
    Contact_information,
    FAQ,
    Sertificate,
    Images_for_multimedia,
    Block_of_contact,
    Lecturer,
    Graduate,
)


@register(FAQ)
class FAQModelTranslation(TranslationOptions):
    fields = ("question", "answer")

@register(Contact_information)
class Contact_informationModelTranslation(TranslationOptions):
    fields = ("title", "text")


@register(Sertificate)
class SertificateModelTranslation(TranslationOptions):
    fields = ("title", "description")


@register(Images_for_multimedia)
class Images_for_multimediaModelTranslation(TranslationOptions):
    fields = ("title", )


@register(Contact)
class ContactModelTranslation(TranslationOptions):
    fields = ("title", "role",)

@register(Block_of_contact)
class Block_of_contactModelTranslation(TranslationOptions):
    fields = ("title",)

@register(Lecturer)
class LecturerModelTranslation(TranslationOptions):
    fields = ("name", "bio", "subject")


@register(Graduate)
class GraduateModelTranslation(TranslationOptions):
    fields = ("label", "title", "description")
