from django.core.exceptions import ValidationError
from django.db import models


class Email_sending(models.Model):
    receiver = models.EmailField(
        max_length=254,
        verbose_name="Почта для системных писем",
        help_text="С этого адреса отправляются письма из формы обратной связи (и как получатель копии). Должна совпадать с настройками SMTP.",
    )

    class Meta:
        verbose_name = "Почта отправителя (обратная связь)"
        verbose_name_plural = "Почта отправителя (обратная связь)"


class FAQ(models.Model):
    question = models.CharField(max_length=255, verbose_name="Вопрос", null=True, blank=True)
    answer = models.TextField(verbose_name="Ответ", null=True, blank=True)

    class Meta:
        verbose_name = "Вопрос и ответ (FAQ)"
        verbose_name_plural = "Частые вопросы (FAQ)"


class Contact_information(models.Model):
    class TypeChoice(models.TextChoices):
        number = "number", "Телефон"
        email = "email", "E-mail"
        address = "address", "Адрес"
        extra_number = "extra number", "Доп. телефон"

    title = models.CharField(max_length=255, verbose_name="Подпись", null=True, blank=True)
    type = models.CharField(max_length=20, choices=TypeChoice.choices, verbose_name="Тип контакта")
    text = models.TextField(verbose_name="Текст")

    class Meta:
        verbose_name = "Контактная строка (блок на сайте)"
        verbose_name_plural = "Контактная информация (блоки)"


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
        verbose_name = "Сертификат / грамота"
        verbose_name_plural = "Награды и сертификаты"


class Images_for_multimedia(models.Model):
    class TypeChoice(models.TextChoices):
        picture = "picture", "Фото"
        video = "video", "Видео"

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
    title = models.CharField(max_length=255, verbose_name="ФИО / должность (кратко)", null=True, blank=True)
    role = models.CharField(max_length=100, verbose_name="Роль на сайте", null=True, blank=True)
    email = models.EmailField(max_length=255, verbose_name="E-mail")
    contact = models.CharField(max_length=255, verbose_name="Телефон или другой контакт")

    class Meta:
        verbose_name = "Контакт (карточка на странице «Контакты»)"
        verbose_name_plural = "Контакты (карточки)"


class Block_of_contact(models.Model):
    title = models.CharField(max_length=255, verbose_name="Заголовок блока", null=True, blank=True)
    contact = models.CharField(max_length=255, verbose_name="Телефон / контакт")
    email = models.EmailField(max_length=255, verbose_name="E-mail")

    class Meta:
        verbose_name = "Блок контактов (альтернативный)"
        verbose_name_plural = "Блоки контактов"


class Lecturer(models.Model):
    name = models.CharField(max_length=255, verbose_name="ФИО", null=True, blank=True)
    avatar = models.FileField(upload_to="avatars", verbose_name="Фотография")
    age = models.IntegerField(verbose_name="Возраст")
    bio = models.TextField(verbose_name="Биография")
    subject = models.CharField(max_length=255, verbose_name="Предмет / курс", null=True, blank=True)

    class Meta:
        verbose_name = "Преподаватель (демо / старый раздел)"
        verbose_name_plural = "Преподаватели"


class Graduate(models.Model):
    sort_order = models.PositiveIntegerField(default=0, verbose_name="Порядок")
    is_published = models.BooleanField(default=True, verbose_name="Опубликовано")
    image = models.FileField(
        upload_to="graduates",
        verbose_name="Фото / изображение",
        null=True,
        blank=True,
    )
    label = models.CharField(max_length=100, verbose_name="Метка", null=True, blank=True)
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Выпускник / карточка страницы"
        verbose_name_plural = "Наши выпускники"

