# Generated by Django 5.0.6 on 2024-07-23 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactive_map', '0008_alter_kilometers_start_longitude_sectionskilometers'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='description',
            field=models.CharField(max_length=1000, null=True, verbose_name='Описание станции'),
        ),
    ]
