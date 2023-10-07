from rest_framework import generics
from rest_framework import permissions
from enrollments.models import Enrollment
from enrollments.serializers import EnrollmentSerializer
from rest_framework.authentication import TokenAuthentication


class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    def get_queryset(self):
        enrollments = Enrollment.objects.filter(
            course__instructor=self.request.user)
        return enrollments


class EnrollmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
