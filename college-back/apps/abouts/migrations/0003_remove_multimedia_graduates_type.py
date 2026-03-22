from django.db import migrations, models


def delete_graduates_rows(apps, schema_editor):
    Images = apps.get_model('abouts', 'Images_for_multimedia')
    Images.objects.filter(type='graduates').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('abouts', '0002_images_for_multimedia_video_and_optional_image'),
    ]

    operations = [
        migrations.RunPython(delete_graduates_rows, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='images_for_multimedia',
            name='type',
            field=models.CharField(
                choices=[('picture', 'Picture'), ('video', 'Video')],
                max_length=20,
                verbose_name='Тип',
            ),
        ),
        migrations.AlterField(
            model_name='images_for_multimedia',
            name='image',
            field=models.FileField(
                blank=True,
                help_text='Обязательно для типа «Фото». Для «Видео» — по желанию (постер).',
                null=True,
                upload_to='images_for_multimedia',
                verbose_name='Изображение / превью',
            ),
        ),
    ]
