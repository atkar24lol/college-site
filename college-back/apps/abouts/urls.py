from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import *

router = DefaultRouter()
router.register(
    prefix='email-sending',
    viewset=Email_sendingViewSet,
    basename='email-sending'
)
router.register(
    prefix='faq',
    viewset=FAQViewSet,
    basename='faq'
)
router.register(
    prefix='contact-information',
    viewset=Contact_informationViewSet,
    basename='contact-information'
)
router.register(
    prefix='sertificates',
    viewset=SertificateViewSet,
    basename='sertificates'
)
router.register(
    prefix='images-of-multimedia',
    viewset=Images_for_multimediaViewSet,
    basename='images-of-multimedia'
)
router.register(
    prefix='contacts',
    viewset=ContactViewSet,
    basename='contacts'
)
router.register(
    prefix='block-of-contacts',
    viewset=Block_of_contactViewSet,
    basename='block-of-contacts'
)
router.register(
    prefix='lecturers',
    viewset=LecturerViewSet,
    basename='lecturers'
)
router.register(
    prefix='sample',
    viewset=SampleViewSet,
    basename='sample'
)



urlpatterns = [
    path("", include(router.urls)),
    path('sending/', Sending.as_view(), name='sending'),
    path("global-search/", GlobalSearchView.as_view(), name='global-search')
]