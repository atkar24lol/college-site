from modeltranslation.translator import register, TranslationOptions

from apps.education.models import (
    Admission_date,
    Scholorship_grant,
    Schedule,
    Courses_programms,
    LectureMaterialsSection,
    LecturePreparationMaterial,
)


@register(Admission_date)
class Admission_dateModelTranslation(TranslationOptions):
    fields = ("title", "description")

@register(Scholorship_grant)
class Scholorship_grantModelTranslation(TranslationOptions):
    fields = ("title", "description")


@register(Schedule)
class ScheduleModelTranslation(TranslationOptions):
    fields = ("title", )


@register(Courses_programms)
class Courses_programmsModelTranslation(TranslationOptions):
    fields = (
        "title",
        "description",
        "duration",
        "mini_description",
        "category",
        "study_format",
        "start_info",
    )


@register(LectureMaterialsSection)
class LectureMaterialsSectionModelTranslation(TranslationOptions):
    fields = ("section_title", "aside_note")


@register(LecturePreparationMaterial)
class LecturePreparationMaterialModelTranslation(TranslationOptions):
    fields = ("title", "description", "button_text")