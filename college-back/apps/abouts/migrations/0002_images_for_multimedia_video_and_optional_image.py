from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('abouts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images_for_multimedia',
            name='image',
            field=models.FileField(
                blank=True,
                help_text='Обязательно для фото и галереи выпускников. Для видео — по желанию (постер).',
                null=True,
                upload_to='images_for_multimedia',
                verbose_name='Изображение / превью',
            ),
        ),
        migrations.AlterField(
            model_name='images_for_multimedia',
            name='link',
            field=models.URLField(
                blank=True,
                help_text='YouTube или Vimeo: вставьте обычную ссылку на ролик — на сайте откроется плеер.',
                max_length=500,
                null=True,
                verbose_name='Ссылка на видео',
            ),
        ),
        migrations.AddField(
            model_name='images_for_multimedia',
            name='video_file',
            field=models.FileField(
                blank=True,
                help_text='Альтернатива ссылке: MP4 или WebM с сервера (до нескольких сотен МБ).',
                null=True,
                upload_to='videos_multimedia',
                verbose_name='Видеофайл',
            ),
        ),
    ]
