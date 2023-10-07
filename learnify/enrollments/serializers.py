from rest_framework import serializers
from enrollments.models import Enrollment
from authentications.serializers import UserSerializer
from courses.serializers import CourseSerializer


class EnrollmentSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    date_enrolled = serializers.DateTimeField(format="%a, %B %d, %Y %I:%M %p")

    class Meta:
        model = Enrollment
        fields = '__all__'
