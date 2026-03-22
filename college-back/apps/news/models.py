from django.db import models
from django.utils.timezone import now

class News(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок", null=True, blank=True)
    description = models.TextField(verbose_name="Текст новости")
    image = models.FileField(verbose_name="Изображение", upload_to="news")
    date = models.DateTimeField(default=now, verbose_name="Дата публикации")

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
        ordering = ["-date"]

    def __str__(self):
        return str(self.title) or f"Новость #{self.pk}"