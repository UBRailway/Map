# Generated by Django 5.0.6 on 2024-06-22 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interactive_map', '0005_media_alter_kilometers_start_latitude_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название')),
                ('latitude', models.DecimalField(decimal_places=12, max_digits=15, null=True, verbose_name='Широта')),
                ('longitude', models.DecimalField(decimal_places=12, max_digits=15, null=True, verbose_name='Долгота')),
            ],
        ),
    ]
