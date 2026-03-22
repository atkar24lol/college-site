from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters

from .models import *
from .serializers import *

class NewsViewSet(ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "description", "date"]
    filterset_fields = ["title", "description", "date"]


class Main_page_newsSerializer(ModelViewSet):
    queryset = Main_page_news.objects.all()
    serializer_class = Main_page_newsSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["news_1", "news_2", "news_3", "news_4"]
    filterset_fields = ["news_1", "news_2", "news_3", "news_4"]