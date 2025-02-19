from rest_framework import viewsets, generics, status,permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Member, Project, Task, TaskTag
from .serializers import MemberSerializer, ProjectSerializer, TaskSerializer, TaskTagSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [IsAuthenticated]
    

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(members__user=user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        project_id = self.request.query_params.get('projectId')
        if project_id:
            try:
                # Проверяем, существует ли проект с таким ID
                project = Project.objects.get(id=project_id)
                queryset = queryset.filter(project=project)
            except Project.DoesNotExist:
                # Возвращаем пустой список, если проект не найден
                return Task.objects.none()
        return queryset

    @action(detail=False, methods=['get'])
    def get_tasks_by_project(self, request):
        project_id = request.query_params.get('projectId')
        if not project_id:
            return Response({"detail": "Project ID is required"}, status=400)

        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data)

class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer
    
    def perform_create(self, serializer):
        project_id = self.request.data.get("project")
        project = get_object_or_404(Project, id=project_id)
        if serializer.is_valid():  
            serializer.save(
                project=project,
                created_by=self.request.user.member,
                # img=self.request.FILES.get("img")  # Обрабатываем загрузку файла
            )

class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
      
class TaskTagViewSet(viewsets.ModelViewSet):
    serializer_class = TaskTagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'member'):
            return TaskTag.objects.filter(tag_deriction=user.member.role)
        return TaskTag.objects.none()
    
    
    