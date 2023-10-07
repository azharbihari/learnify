from rest_framework import serializers
from courses.models import Course
from modules.models import Module
from lessons.models import Lesson
from authentications.serializers import UserSerializer
from lessons.serializers import LessonSerializer


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    instructor = UserSerializer(read_only=True)
    students = UserSerializer(many=True, read_only=True)
    number_of_modules = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_number_of_modules(self, obj):
        return Module.objects.filter(course=obj).count()
