# Файл для материалов подготовки лекций

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('education', '0003_lecture_preparation_materials'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecturepreparationmaterial',
            name='file',
            field=models.FileField(
                blank=True,
                help_text='Загрузите документ — по кнопке на сайте будет открытие/скачивание (как у планов занятий).',
                upload_to='lecture_materials',
                verbose_name='Файл',
            ),
        ),
        migrations.AlterField(
            model_name='lecturepreparationmaterial',
            name='button_text',
            field=models.CharField(
                blank=True,
                help_text='Текст ссылки (например «Скачать»). Если пусто — на сайте подставится общая подпись «скачать».',
                max_length=255,
                verbose_name='Подпись (кнопка)',
            ),
        ),
        migrations.AlterField(
            model_name='lecturepreparationmaterial',
            name='link',
            field=models.URLField(
                blank=True,
                help_text='Если файла нет — можно указать ссылку на другой сайт.',
                max_length=500,
                verbose_name='Внешняя ссылка',
            ),
        ),
    ]
