from rest_framework import serializers
from lessons.models import Lesson
from modules.serializers import ModuleSerializer
from enrollments.models import Enrollment


class LessonSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = '__all__'

    def get_is_completed(self, obj):
        user = self.context['request'].user
        course = obj.module.course
        enrollment = Enrollment.objects.get(student=user, course=course)
        progress = enrollment.progress
        return obj in progress.lessons.all()


class LessonCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
