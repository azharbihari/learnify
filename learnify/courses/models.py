from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(unique=True, max_length=255, blank=True)

    start_date = models.DateField()
    end_date = models.DateField()

    instructor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='courses')

    students = models.ManyToManyField(
        User, through="enrollments.Enrollment", through_fields=("course", "student"))

    is_published = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
