from django.urls import path
from courses.views import CourseListCreateView, CourseRetrieveUpdateDestroyAPIViewView, ModuleListByCourseView

urlpatterns = [
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseRetrieveUpdateDestroyAPIViewView.as_view(),
         name='course-detail'),

    path('<int:pk>/modules/', ModuleListByCourseView.as_view(),
         name='module-list-by-course'),
]
