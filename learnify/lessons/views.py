from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from lessons.models import Lesson
from lessons.serializers import LessonSerializer, LessonCreateSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Lesson.objects.filter(module__course__instructor=user)
        return queryset


class LessonCreateView(generics.CreateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonCreateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class LessonDetailView(generics.RetrieveAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class LessonUpdateView(generics.UpdateAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class LessonDeleteView(generics.DestroyAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
