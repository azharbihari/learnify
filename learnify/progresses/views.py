from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from progresses.models import Progress
from progresses.serializers import ProgressSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from lessons.models import Lesson
from enrollments.models import Enrollment


class CompleteLessonView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        lesson = Lesson.objects.get(pk=pk)
        user = request.user
        course = lesson.module.course
        enrollment = Enrollment.objects.get(student=user, course=course)
        progress = enrollment.progress

        if lesson in progress.lessons.all():
            return Response({'detail': 'Lesson is already completed'}, status=status.HTTP_400_BAD_REQUEST)

        progress.lessons.add(lesson)

        module = lesson.module
        if module:
            all_lessons_completed = module.lessons.filter(
                id__in=progress.lessons.all()).count() == module.lessons.count()

            if all_lessons_completed:
                progress.modules.add(module)

        return Response({'detail': 'Lesson marked as completed'}, status=status.HTTP_200_OK)
