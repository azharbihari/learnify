from django.contrib import admin
from enrollments.models import Enrollment

# Register the Enrollment model with the admin site


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date_enrolled')
    list_filter = ('course', 'date_enrolled')
    search_fields = ('student__username', 'course__title')
