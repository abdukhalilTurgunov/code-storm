# Generated by Django 5.1.6 on 2025-02-15 20:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='members/')),
                ('role', models.CharField(choices=[('full-stack', 'Full-stack'), ('back-end', 'Back-end'), ('front-end', 'Front-end'), ('ux-design', 'UX Design'), ('project-manager', 'Project Manager')], max_length=20)),
                ('can_create_tasks', models.BooleanField(default=False)),
                ('github_link', models.URLField(blank=True, null=True)),
                ('linkedin_link', models.URLField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='member', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('desc', models.TextField()),
                ('type', models.CharField(max_length=50)),
                ('status', models.CharField(max_length=50)),
                ('icon', models.CharField(max_length=255)),
                ('icon_bg', models.CharField(max_length=20)),
                ('members', models.ManyToManyField(to='api.member')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateField()),
                ('deadline', models.DateField()),
                ('status', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('img', models.CharField(blank=True, max_length=255, null=True)),
                ('tag', models.CharField(max_length=100)),
                ('tag_bg', models.CharField(max_length=20)),
                ('assigned_to', models.ManyToManyField(related_name='assigned_tasks', to='api.member')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_tasks', to='api.member')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.project')),
            ],
        ),
    ]
