from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from modules.models import Module
from modules.serializers import ModuleSerializer, ModuleCreateUpdateSerializer


class ModuleListView(generics.ListAPIView):
    serializer_class = ModuleSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        modules = Module.objects.filter(course__instructor=self.request.user)
        return modules


class ModuleCreateView(generics.CreateAPIView):
    serializer_class = ModuleCreateUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ModuleUpdateView(generics.UpdateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleCreateUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ModuleDeleteView(generics.DestroyAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleCreateUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ModuleDetailView(generics.RetrieveAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleCreateUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
