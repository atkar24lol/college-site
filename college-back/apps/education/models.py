from django.db import models
from django.utils.timezone import now


class Admission_date(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название", null=True, blank=True)
    event_date = models.DateTimeField(verbose_name="Дата и время", default=now)
    description = models.TextField(verbose_name="Описание")

    class Meta:
        verbose_name = "Срок приёмной кампании"
        verbose_name_plural = "Сроки приёмной кампании"


class Courses_programms(models.Model):
    class TypeChoice(models.TextChoices):
        student = "student", "Для слушателей / студентов"
        lecturer = "lecturer", "Для преподавателей"

    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок в каталоге')
    show_on_additional_education = models.BooleanField(
        default=True,
        verbose_name='Показывать в «Дополнительном образовании»',
    )
    show_on_international = models.BooleanField(
        default=True,
        verbose_name='Показывать в «Международном сотрудничестве»',
    )
    category = models.CharField(
        max_length=500,
        blank=True,
        verbose_name='Направление / категория',
        help_text='Как рубрика в каталоге (например «Агрономия», «Цифровые навыки»).',
    )
    study_format = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Формат обучения',
        help_text='Например: очно, онлайн, смешанный.',
    )
    start_info = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Сроки / набор',
        help_text='Дата старта, период набора и т.п.',
    )
    title = models.CharField(verbose_name='Название', max_length=255, null=True, blank=True)
    description = models.TextField(verbose_name="Описание")
    duration = models.CharField(max_length=255, verbose_name='Длительность', null=True, blank=True)
    mini_description = models.TextField(verbose_name="Краткое описание")
    price = models.IntegerField(verbose_name='Цена')
    type = models.CharField(max_length=25, verbose_name='Для кого', choices=TypeChoice.choices)
    image = models.FileField(verbose_name='Файл', upload_to='coursesProgramms')

    class Meta:
        ordering = ['sort_order', 'id']


class Schedule(models.Model):
    title = models.CharField(verbose_name="Название", max_length=255, null=True, blank=True)
    file = models.FileField(verbose_name="Файл расписания", upload_to="schedule")

    class Meta:
        verbose_name = "Расписание (файл)"
        verbose_name_plural = "Расписания"


class LectureMaterialsSection(models.Model):
    """Одна запись на сайт: заголовок блока и вводный текст (страница «Преподавателям»)."""

    section_title = models.CharField(
        max_length=500,
        verbose_name='Заголовок блока',
        blank=True,
        help_text='Если пусто — на сайте подставится текст из словаря.',
    )
    aside_note = models.TextField(
        verbose_name='Текст под заголовком',
        blank=True,
    )

    class Meta:
        verbose_name = 'Материалы для лекций: заголовок и вводный текст'
        verbose_name_plural = 'Материалы для лекций: заголовок и вводный текст'


class LecturePreparationMaterial(models.Model):
    """Карточки «материалы для подготовки лекций»."""

    sort_order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    title = models.CharField(max_length=500, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание', blank=True)
    file = models.FileField(
        verbose_name='Файл',
        upload_to='lecture_materials',
        blank=True,
        help_text='Загрузите документ — по кнопке на сайте будет открытие/скачивание (как у планов занятий).',
    )
    button_text = models.CharField(
        max_length=255,
        verbose_name='Подпись (кнопка)',
        blank=True,
        help_text='Текст ссылки (например «Скачать»). Если пусто — на сайте подставится общая подпись «скачать».',
    )
    link = models.URLField(
        max_length=500,
        verbose_name='Внешняя ссылка',
        blank=True,
        help_text='Если файла нет — можно указать ссылку на другой сайт.',
    )

    class Meta:
        verbose_name = 'Материал для подготовки лекции'
        verbose_name_plural = 'Материалы для подготовки лекций'
        ordering = ['sort_order', 'id']
