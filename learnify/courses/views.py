from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from courses.models import Course
from modules.models import Module
from courses.serializers import CourseSerializer, ModuleSerializer


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


class ModuleListByCourseView(generics.ListAPIView):
    serializer_class = ModuleSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        self.course = get_object_or_404(Course, pk=self.kwargs['pk'])
        return Module.objects.filter(course=self.course)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        response = {
            'course': CourseSerializer(self.course).data,
            'modules': serializer.data
        }

        return Response(response)
