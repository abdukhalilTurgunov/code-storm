# Generated by Django 5.1.6 on 2025-02-17 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_remove_task_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('to-do', 'To do'), ('in-progress', 'In progress'), ('completed', 'Completed')], max_length=20),
        ),
    ]
