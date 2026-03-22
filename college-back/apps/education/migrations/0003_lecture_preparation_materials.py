# Generated manually — материалы для подготовки лекций

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0002_delete_specialtie'),
    ]

    operations = [
        migrations.CreateModel(
            name='LectureMaterialsSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                (
                    'section_title',
                    models.CharField(
                        blank=True,
                        help_text='Если пусто — на сайте подставится текст из словаря.',
                        max_length=500,
                        verbose_name='Заголовок блока',
                    ),
                ),
                (
                    'section_title_ru',
                    models.CharField(
                        blank=True,
                        help_text='Если пусто — на сайте подставится текст из словаря.',
                        max_length=500,
                        null=True,
                        verbose_name='Заголовок блока',
                    ),
                ),
                (
                    'section_title_en',
                    models.CharField(
                        blank=True,
                        help_text='Если пусто — на сайте подставится текст из словаря.',
                        max_length=500,
                        null=True,
                        verbose_name='Заголовок блока',
                    ),
                ),
                (
                    'section_title_ky',
                    models.CharField(
                        blank=True,
                        help_text='Если пусто — на сайте подставится текст из словаря.',
                        max_length=500,
                        null=True,
                        verbose_name='Заголовок блока',
                    ),
                ),
                ('aside_note', models.TextField(blank=True, verbose_name='Текст под заголовком')),
                ('aside_note_ru', models.TextField(blank=True, null=True, verbose_name='Текст под заголовком')),
                ('aside_note_en', models.TextField(blank=True, null=True, verbose_name='Текст под заголовком')),
                ('aside_note_ky', models.TextField(blank=True, null=True, verbose_name='Текст под заголовком')),
            ],
            options={
                'verbose_name': 'Материалы для лекций: заголовок и вводный текст',
                'verbose_name_plural': 'Материалы для лекций: заголовок и вводный текст',
            },
        ),
        migrations.CreateModel(
            name='LecturePreparationMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')),
                ('title', models.CharField(max_length=500, verbose_name='Заголовок')),
                ('title_ru', models.CharField(max_length=500, null=True, verbose_name='Заголовок')),
                ('title_en', models.CharField(max_length=500, null=True, verbose_name='Заголовок')),
                ('title_ky', models.CharField(max_length=500, null=True, verbose_name='Заголовок')),
                ('description', models.TextField(blank=True, verbose_name='Описание')),
                ('description_ru', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('description_en', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('description_ky', models.TextField(blank=True, null=True, verbose_name='Описание')),
                (
                    'button_text',
                    models.CharField(
                        blank=True,
                        help_text='Например: «Подробнее». Если задана ссылка — текст ведёт по ссылке.',
                        max_length=255,
                        verbose_name='Подпись (кнопка)',
                    ),
                ),
                (
                    'button_text_ru',
                    models.CharField(
                        blank=True,
                        help_text='Например: «Подробнее». Если задана ссылка — текст ведёт по ссылке.',
                        max_length=255,
                        null=True,
                        verbose_name='Подпись (кнопка)',
                    ),
                ),
                (
                    'button_text_en',
                    models.CharField(
                        blank=True,
                        help_text='Например: «Подробнее». Если задана ссылка — текст ведёт по ссылке.',
                        max_length=255,
                        null=True,
                        verbose_name='Подпись (кнопка)',
                    ),
                ),
                (
                    'button_text_ky',
                    models.CharField(
                        blank=True,
                        help_text='Например: «Подробнее». Если задана ссылка — текст ведёт по ссылке.',
                        max_length=255,
                        null=True,
                        verbose_name='Подпись (кнопка)',
                    ),
                ),
                (
                    'link',
                    models.URLField(
                        blank=True,
                        help_text='Необязательно: внешняя страница или документ.',
                        max_length=500,
                        verbose_name='Ссылка',
                    ),
                ),
            ],
            options={
                'verbose_name': 'Материал для подготовки лекции',
                'verbose_name_plural': 'Материалы для подготовки лекций',
                'ordering': ['sort_order', 'id'],
            },
        ),
    ]
