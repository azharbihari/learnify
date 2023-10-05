from rest_framework import serializers
from courses.models import Course
from modules.models import Module
from authentications.serializers import UserSerializer


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
    class Meta:
        model = Module
        fields = '__all__'
