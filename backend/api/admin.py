from django.contrib import admin
from .models import Member, Project, Task, TaskTag


# Register your models here.
admin.site.register(Member)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(TaskTag)
