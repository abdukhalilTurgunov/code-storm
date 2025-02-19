from django.db import models
from django.contrib.auth import get_user_model
from datetime import date
User = get_user_model()
DIRECTIONS = [
    ("full-stack", "Full-stack"),
    ("back-end", "Back-end"),
    ("front-end", "Front-end"),
    ("designer", "Designer"),
    ("project-manager", "Project Manager"),
]
class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="member")
    full_name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to="members/", blank=True, null=True, default='/default_photo.jpg')
    role = models.CharField(max_length=20, choices=DIRECTIONS)
    can_assign_tasks = models.BooleanField(default=False)
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.full_name

class Project(models.Model):
    PROJECT_TYPES = [
        ('WebSite', 'WebSite'),
        ('WebApp', 'WebApp'),
        ('App', 'App'),
        ('Bot', 'Bot'),
        ('Learning', 'Learning'),
        ('Excel', 'Excel'),
        ('Finance', 'Finance'),
    ]
    PROJECT_ICONS = [
        ('webSite.svg', 'WebSite'),
        ('webApp.svg', 'WebApp'),
        ('phone.svg', 'App'),
        ('bot.svg', 'Bot'),
        ('learning.svg', 'Learning'),
        ('excel.svg', 'Excel'),
        ('finance.svg', 'Finance'),
    ]
    PROJECT_STATUS = [
        ('active','Active'),
        ('on-hold','On hold'),
        ('closed','Closed'),
    ]
    ICON_BGS = [
        ('FFEAF8', 'WebSite'),
        ('DEEDFF', 'WebApp'),
        ('E9E0F5', 'App'),
        ('FFF8EA', 'Bot'),
        ('FFEEEC', 'Learning'),
        ('D6E6FF', 'Excel'),
        ('E9D9FF', 'Finance'),
    ]
    name = models.CharField(max_length=255)
    desc = models.TextField()
    type = models.CharField(choices=PROJECT_TYPES, max_length=50)
    status = models.CharField(choices=PROJECT_STATUS, max_length=50)
    members = models.ManyToManyField(Member)
    icon = models.CharField(choices=PROJECT_ICONS, max_length=255)
    icon_bg = models.CharField(choices=ICON_BGS, max_length=20)

    def __str__(self):
        return self.name

class Task(models.Model):
    STATUS_CHOICES = [
        ('to-do', 'To do'),
        ('in-progress', 'In progress'),
        ('completed', 'Completed'),
        ('closed', 'Closed'),
    ]
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    created_by = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='created_tasks', null=True, blank=True)
    assigned_to = models.ManyToManyField(Member, related_name='assigned_tasks')
    created_date = models.DateField(default=date.today)
    deadline = models.DateField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=20)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)   
    # img = models.ImageField(upload_to='tasks/',null=True, blank=True)
    tag = models.CharField(max_length=100, blank=True, null=True)
    tag_bg = models.CharField(max_length=20, blank=True, null=True)

    completed_by = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True, related_name='completed_tasks')
    completed_day = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title


class TaskTag(models.Model):
    tag_name = models.CharField(max_length=50)
    tag_bg = models.CharField(max_length=50)
    tag_deriction = models.CharField(max_length=50, choices=DIRECTIONS)

    def __str__(self):
        return (f'{self.tag_name} - {self.tag_deriction}')
    
    class Meta:
        ordering = ['tag_deriction']