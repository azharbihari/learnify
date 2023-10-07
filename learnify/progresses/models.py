from django.db import models
from django.contrib.auth.models import User
from courses.models import Course
from enrollments.models import Enrollment
from lessons.models import Lesson
from modules.models import Module


class Progress(models.Model):
    enrollment = models.OneToOneField(Enrollment, on_delete=models.CASCADE)
    modules = models.ManyToManyField(Module, blank=True)
    lessons = models.ManyToManyField(Lesson, blank=True)
    progress_percentage = models.DecimalField(
        max_digits=5, decimal_places=2, default=0.00)
    date_started = models.DateTimeField(auto_now_add=True)
    date_completed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Progress for {self.enrollment.student.username} in {self.enrollment.course.title}"
