from django.db import models

class Event(models.Model):
    class TypeChoice(models.TextChoices):
        offline = "offline"
        online = "online"
    title = models.CharField(verbose_name='Название', max_length=255, null=True, blank=True)
    background = models.FileField(verbose_name='Фон', upload_to='events')
    duration = models.CharField(max_length=255, verbose_name='Длительность', null=True, blank=True)
    description = models.TextField(verbose_name="Описание")
    location = models.CharField(max_length=255, verbose_name='Локация', null=True, blank=True)
    type = models.CharField(max_length=25, verbose_name='Тип мероприятия', choices=TypeChoice.choices)