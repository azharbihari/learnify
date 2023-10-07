from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.CompleteLessonView.as_view(), name='lesson-complete'),
]
