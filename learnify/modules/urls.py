from django.urls import path
from modules.views import ModuleCreateView, ModuleListView, ModuleUpdateView, ModuleDeleteView, ModuleDetailView

urlpatterns = [
    path('', ModuleListView.as_view(), name='module-list'),
    path('create/', ModuleCreateView.as_view(), name='module-create'),
    path('<int:pk>/', ModuleDetailView.as_view(), name='module-detail'),
    path('<int:pk>/update/', ModuleUpdateView.as_view(), name='module-update'),
    path('<int:pk>/delete/', ModuleDeleteView.as_view(), name='module-delete'),
]
