# Generated manually for admin verbose names

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("education", "0006_alter_admission_date_options_alter_schedule_options_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="courses_programms",
            options={
                "ordering": ["sort_order", "id"],
                "verbose_name": "Курс / программа",
                "verbose_name_plural": "Курсы и программы",
            },
        ),
    ]
