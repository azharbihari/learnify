from django.db import models
from django.utils.text import slugify
from modules.models import Module


class Lesson(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    content = models.TextField()
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)
    video_url = models.URLField(blank=True)
    duration = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Lesson, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
