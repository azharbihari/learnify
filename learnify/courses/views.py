from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from courses.models import Course
from modules.models import Module
from courses.serializers import CourseSerializer, ModuleSerializer
from enrollments.models import Enrollment
from enrollments.serializers import EnrollmentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def get_queryset(self):
        courses = Course.objects.filter(instructor=self.request.user)
        return courses


class CourseRetrieveUpdateDestroyAPIViewView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        is_enrolled = Enrollment.objects.filter(
            student=user, course=instance).exists()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['is_enrolled'] = is_enrolled

        return Response(data, status=status.HTTP_200_OK)


class ModuleListByCourseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        course = get_object_or_404(Course, pk=pk)
        modules = Module.objects.filter(course=course)
        serializer = ModuleSerializer(modules, many=True)

        response_data = {
            'course': CourseSerializer(course).data,
            'modules': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)


class EnrollmentListByCourseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        course = get_object_or_404(Course, pk=pk)
        enrollments = Enrollment.objects.filter(course=course)
        serializer = EnrollmentSerializer(enrollments, many=True)

        response_data = {
            'course': CourseSerializer(course).data,
            'enrollments': serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)
