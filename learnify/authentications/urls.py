from django.contrib import admin
from django.urls import path
from authentications.views import RegistrationView, LoginView, UserDetailView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetailView.as_view(), name='login'),
]
