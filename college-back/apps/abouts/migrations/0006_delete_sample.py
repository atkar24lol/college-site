from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("abouts", "0005_alter_block_of_contact_options_alter_contact_options_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Sample",
        ),
    ]
