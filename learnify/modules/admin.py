from django.contrib import admin
from modules.models import Module


class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course')
    list_filter = ('course',)
    search_fields = ('title', 'course__title')
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Module, ModuleAdmin)
