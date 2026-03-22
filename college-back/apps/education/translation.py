from modeltranslation.translator import register, TranslationOptions

from apps.education.models import (
    Admission_date,
    Specialtie,
    Scholorship_grant,
    Schedule,
    Courses_programms
)


@register(Admission_date)
class Admission_dateModelTranslation(TranslationOptions):
    fields = ("title", "description")

@register(Specialtie)
class SpecialtieModelTranslation(TranslationOptions):
    fields = ("title", "description", )


@register(Scholorship_grant)
class Scholorship_grantModelTranslation(TranslationOptions):
    fields = ("title", "description")


@register(Schedule)
class ScheduleModelTranslation(TranslationOptions):
    fields = ("title", )


@register(Courses_programms)
class Courses_programmsModelTranslation(TranslationOptions):
    fields = ("title", "description", "duration", "mini_description",)