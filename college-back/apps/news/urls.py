from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import NewsViewSet

router = DefaultRouter()
router.register(
    prefix="news",
    viewset=NewsViewSet,
    basename="news",
)

urlpatterns = [
    path("", include(router.urls)),
]
