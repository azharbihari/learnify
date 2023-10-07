"""
URL configuration for learnify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from authentications.views import MyCourseListView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentications.urls')),
    path('courses/', include('courses.urls')),
    path('modules/', include('modules.urls')),
    path('lessons/', include('lessons.urls')),
    path('enrollments/', include('enrollments.urls')),
    path('my_courses/', MyCourseListView.as_view(), name='my-course-list'),
    path('progresses/', include('progresses.urls')),
]
