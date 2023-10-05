from django.db import models
from django.utils.text import slugify
from courses.models import Course


class Module(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='modules')
    slug = models.SlugField(unique=True, max_length=255, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Module, self).save(*args, **kwargs)
