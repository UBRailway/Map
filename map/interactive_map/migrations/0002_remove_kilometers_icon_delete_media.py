# Generated by Django 5.0.6 on 2024-05-20 05:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interactive_map', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kilometers',
            name='icon',
        ),
        migrations.DeleteModel(
            name='Media',
        ),
    ]
