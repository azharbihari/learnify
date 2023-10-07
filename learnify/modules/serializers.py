from rest_framework import serializers
from modules.models import Module
from courses.models import Course
from authentications.serializers import UserSerializer
from lessons.models import Lesson


class CourseSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    students = UserSerializer(many=True, read_only=True)
    number_of_modules = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_number_of_modules(self, obj):
        return Module.objects.filter(course=obj).count()


class ModuleSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    number_of_lessons = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = '__all__'

    def get_number_of_lessons(self, obj):
        return Lesson.objects.filter(module=obj).count()


class ModuleCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'
