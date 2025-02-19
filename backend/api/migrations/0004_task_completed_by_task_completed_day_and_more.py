# Generated by Django 5.1.6 on 2025-02-16 16:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_can_create_tasks_member_can_assign_tasks'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='completed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='completed_tasks', to='api.member'),
        ),
        migrations.AddField(
            model_name='task',
            name='completed_day',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='created_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
