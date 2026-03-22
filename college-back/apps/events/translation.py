from modeltranslation.translator import register, TranslationOptions

from apps.events.models import (
    Event
)


@register(Event)
class EventModelTranslation(TranslationOptions):
    fields = ("title", "duration", "description", "location")
