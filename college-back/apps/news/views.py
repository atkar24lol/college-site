from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import News
from .serializers import NewsSerializer


class NewsViewSet(ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "description", "date"]
    filterset_fields = ["title", "description", "date"]
