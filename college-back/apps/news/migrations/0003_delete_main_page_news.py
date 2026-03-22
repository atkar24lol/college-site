from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0002_alter_main_page_news_options_alter_news_options_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Main_page_news",
        ),
    ]
