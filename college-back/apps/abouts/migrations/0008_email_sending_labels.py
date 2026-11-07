from django.db import migrations, models


class Migration(migrations.Migration):
    """Понятные подписи для почты обратной связи (только тексты, без изменения данных)."""

    dependencies = [
        ('abouts', '0007_graduate'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='email_sending',
            options={
                'verbose_name': 'Почта для обращений (обратная связь)',
                'verbose_name_plural': 'Почта для обращений (обратная связь)',
            },
        ),
        migrations.AlterField(
            model_name='email_sending',
            name='receiver',
            field=models.EmailField(
                help_text='На эту почту будут приходить сообщения из формы «Обратная связь» на сайте. '
                          'Можно указать любую почту, которую вы регулярно проверяете.',
                max_length=254,
                verbose_name='Куда приходят обращения',
            ),
        ),
    ]
