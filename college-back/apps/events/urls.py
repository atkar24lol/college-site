from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import *

router = DefaultRouter()
router.register(
    prefix='events',
    viewset=EventViewSet,
    basename='events'
)


urlpatterns = [
    path("", include(router.urls))
]