from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0002_alter_event_options_alter_event_background_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Event",
        ),
    ]
