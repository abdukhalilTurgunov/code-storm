from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Member, Project, Task, TaskTag

User = get_user_model()

class MemberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Member
        fields = [
            'id',
            'full_name',
            'photo',
            'role',
            'can_assign_tasks',
            'github_link',
            'linkedin_link',
            'email',
        ]

class ProjectSerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    # img = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Task
        fields = '__all__'

class TaskTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskTag
        fields = '__all__'
