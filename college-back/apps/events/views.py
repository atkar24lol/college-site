from rest_framework.permissions import AllowAny
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet

from .serializers import *
from .models import *


class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerialier
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "duration", "description", "type", "location"]
    filterset_fields = ["title", "duration", "description", "type", "location"]