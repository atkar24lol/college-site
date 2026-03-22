from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import *

router = DefaultRouter()
router.register(
    prefix='admission-dates',
    viewset=Admission_dateViewSet,
    basename='admission-dates'
)
router.register(
    prefix='specialtie',
    viewset=SpecialtieViewSet,
    basename='specialtie'
)
router.register(
    prefix='scholorships-grants',
    viewset=Scholorship_grantViewSet,
    basename='scholorships-grants'
)
router.register(
    prefix='courses-programms',
    viewset=Courses_programmsViewSet,
    basename='courses-programms'
)
router.register(
    prefix='schedule',
    viewset=ScheduleViewSet,
    basename='schedule'
)


urlpatterns = [
    path("", include(router.urls))
]