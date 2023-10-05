from django.contrib import admin
from lessons.models import Lesson


class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'is_published')
    list_filter = ('module',)
    search_fields = ('title', 'module__title')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Lesson, LessonAdmin)
