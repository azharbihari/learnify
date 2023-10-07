from django.urls import path
from enrollments.views import EnrollmentListCreateView, EnrollmentDetailView

urlpatterns = [
    path('', EnrollmentListCreateView.as_view(), name='enrollment-list-create'),
    path('<int:pk>/', EnrollmentDetailView.as_view(), name='enrollment-detail'),
]
