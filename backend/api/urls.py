from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, ProjectViewSet, TaskViewSet, TaskCreateView, TaskTagViewSet,TaskUpdateView

router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'tasks', TaskViewSet)
router.register(r'task/task-tags', TaskTagViewSet, basename='tasktag')

urlpatterns = [
    path('', include(router.urls)),
    path('task/create/', TaskCreateView.as_view(), name='task-create'),
    path('task/<int:pk>/edit', TaskUpdateView.as_view(), name='task-edit'),
    
]