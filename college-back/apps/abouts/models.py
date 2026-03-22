from django.core.exceptions import ValidationError
from django.db import models
from django.utils.timezone import now


class Email_sending(models.Model):
    receiver = models.EmailField(max_length=254, verbose_name='Получатель')


class FAQ(models.Model):
    question = models.CharField(max_length=255, verbose_name='Вопрос', null=True, blank=True)
    answer = models.TextField(verbose_name='Ответ', null=True, blank=True)


class Contact_information(models.Model):
    class TypeChoice(models.TextChoices):
        number = "number"
        email = "email"
        address = "address"
        extra_number = "extra number"
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    type = models.CharField(max_length=20, choices=TypeChoice.choices, verbose_name="Тип")
    text = models.TextField(verbose_name="Описание")


class Sertificate(models.Model):
    class Section(models.TextChoices):
        general = "general", "Прочие награды"
        hall_of_fame = "hall_of_fame", "В зале славы"
        partners = "partners", "Благодарности и грамоты партнёрам"

    section = models.CharField(
        max_length=32,
        choices=Section.choices,
        default=Section.general,
        verbose_name="Раздел на странице «Награды»",
    )
    sort_order = models.PositiveIntegerField(default=0, verbose_name="Порядок в разделе")
    image = models.FileField(verbose_name='Картинка', upload_to='sertificates')
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    description = models.TextField(verbose_name="Описание")

    class Meta:
        ordering = ["section", "sort_order", "id"]


class Images_for_multimedia(models.Model):
    class TypeChoice(models.TextChoices):
        picture = "picture"
        video = "video"

    image = models.FileField(
        verbose_name='Изображение / превью',
        upload_to='images_for_multimedia',
        null=True,
        blank=True,
        help_text='Обязательно для типа «Фото». Для «Видео» — по желанию (постер).',
    )
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    link = models.URLField(
        max_length=500,
        verbose_name='Ссылка на видео',
        null=True,
        blank=True,
        help_text='YouTube или Vimeo: вставьте обычную ссылку на ролик — на сайте откроется плеер.',
    )
    video_file = models.FileField(
        verbose_name='Видеофайл',
        upload_to='videos_multimedia',
        null=True,
        blank=True,
        help_text='Альтернатива ссылке: MP4 или WebM с сервера (до нескольких сотен МБ).',
    )
    type = models.CharField(max_length=20, choices=TypeChoice.choices, verbose_name="Тип")

    class Meta:
        verbose_name = 'Мультимедиа (фото / видео)'
        verbose_name_plural = 'Мультимедиа (фото / видео)'

    def clean(self):
        super().clean()
        t = self.type
        if t == self.TypeChoice.picture:
            if not self.image:
                raise ValidationError({'image': 'Для фото загрузите изображение.'})
        if t == self.TypeChoice.video:
            has_link = bool(self.link and str(self.link).strip())
            has_file = bool(self.video_file)
            if not has_link and not has_file:
                raise ValidationError(
                    'Для видео укажите ссылку на YouTube/Vimeo или загрузите видеофайл (MP4/WebM).'
                )
            if has_link and has_file:
                raise ValidationError(
                    'Укажите либо ссылку на видео, либо файл — не оба варианта одновременно.'
                )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class Contact(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    role = models.CharField(max_length=100, verbose_name='Должность', null=True, blank=True)
    email = models.EmailField(max_length=255, verbose_name='Почта')
    contact = models.CharField(max_length=255, verbose_name='Контакты')


class Block_of_contact(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    contact = models.CharField(max_length=255, verbose_name='Контакты')
    email = models.EmailField(max_length=255, verbose_name='Почта')


class Lecturer(models.Model):
    name = models.CharField(max_length=255, verbose_name="Имя", null=True, blank=True)
    avatar = models.FileField(upload_to='avatars', verbose_name='Фотография')
    age = models.IntegerField(verbose_name='Возраст')
    bio = models.TextField(verbose_name="Био")
    subject = models.CharField(max_length=255, verbose_name='Предмет', null=True, blank=True)


class Sample(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название', null=True, blank=True)
    description = models.TextField(verbose_name="Описание")
    file = models.FileField(verbose_name='Файл', upload_to='samples')
    date = models.DateTimeField(verbose_name="Дата", default=now)