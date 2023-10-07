from django.contrib import admin
from progresses.models import Progress


@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ['enrollment', 'date_started',
                    'date_completed', 'progress_percentage']
    list_filter = ['enrollment__course']
    search_fields = ['enrollment__student__username',
                     'enrollment__course__title']
    filter_horizontal = ['modules', 'lessons']
