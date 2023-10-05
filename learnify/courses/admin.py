from django.contrib import admin
from courses.models import Course


class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'start_date',
                    'end_date', 'is_published')
    list_filter = ('is_published', 'start_date', 'end_date')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('students',)


admin.site.register(Course, CourseAdmin)
