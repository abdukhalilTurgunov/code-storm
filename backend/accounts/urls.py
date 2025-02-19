from django.urls import path
from .views import *

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", logout_view, name="logout"),
    path("account/", AccountView.as_view(), name="account"),
    path("account/edit", UpdateAccountAPIView.as_view(), name="edit"),
    path("account/change-password", ChangePasswordAPIView.as_view(), name="change-password"),
    
]