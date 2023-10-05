from rest_framework import serializers
from modules.models import Module
from authentications.serializers import UserSerializer
from courses.serializers import CourseSerializer
from lessons.models import Lesson


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
