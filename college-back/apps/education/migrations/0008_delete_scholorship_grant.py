from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("education", "0007_alter_courses_programms_options"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Scholorship_grant",
        ),
    ]
