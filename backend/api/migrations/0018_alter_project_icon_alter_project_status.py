# Generated by Django 5.1.6 on 2025-02-17 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_project_icon_alter_project_icon_bg_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='icon',
            field=models.CharField(choices=[('WebSite', 'WebSite'), ('WebApp', 'WebApp'), ('App', 'App'), ('Bot', 'Bot'), ('Learning', 'Learning'), ('Excel', 'Excel'), ('Finance', 'Finance')], max_length=255),
        ),
        migrations.AlterField(
            model_name='project',
            name='status',
            field=models.CharField(choices=[('active', 'Active'), ('on-hold', 'On hold'), ('closed', 'Closed')], max_length=50),
        ),
    ]
