from django.db import models
from django.utils.timezone import now

class News(models.Model):
    title = models.CharField(max_length=255, verbose_name='заголовок', null=True, blank=True)
    description = models.TextField(verbose_name="Описание")
    image = models.FileField(verbose_name='Картинка', upload_to='news')
    date = models.DateTimeField(default=now, verbose_name='Дата')

    def __str__(self):
        return str(self.title)

class Main_page_news(models.Model):
    news_1 = models.OneToOneField(News, on_delete=models.PROTECT, verbose_name='Новость 1', related_name='main_page1')
    news_2 = models.OneToOneField(News, on_delete=models.PROTECT, verbose_name='Новость 2', related_name='main_page2')
    news_3 = models.OneToOneField(News, on_delete=models.PROTECT, verbose_name='Новость 3', related_name='main_page3')
    news_4 = models.OneToOneField(News, on_delete=models.PROTECT, verbose_name='Новость 4', related_name='main_page4')