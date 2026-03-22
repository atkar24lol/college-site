from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import *

router = DefaultRouter()
router.register(
    prefix='news',
    viewset=NewsViewSet,
    basename='news'
)
router.register(
    prefix='main-page-news',
    viewset=Main_page_newsSerializer,
    basename='main-page-news'
)


urlpatterns = [
    path("", include(router.urls))
]