from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters

from .serializers import *
from .models import *


class Admission_dateViewSet(ModelViewSet):
    queryset = Admission_date.objects.all()
    serializer_class = Admission_dateSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "description"]
    filterset_fields = ["title", "description"]


class Scholorship_grantViewSet(ModelViewSet):
    queryset = Scholorship_grant.objects.all()
    serializer_class = Scholorship_grantSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields =["title", "description", "type"]
    filterset_fields =["title", "description", "type"]


class Courses_programmsViewSet(ModelViewSet):
    queryset = Courses_programms.objects.all()
    serializer_class = Courses_programmsSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = [
        "title",
        "description",
        "duration",
        "mini_description",
        "type",
        "category",
        "study_format",
        "start_info",
    ]
    filterset_fields = [
        "title",
        "description",
        "duration",
        "mini_description",
        "type",
        "show_on_additional_education",
        "show_on_international",
    ]


class ScheduleViewSet(ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (AllowAny, )
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", ]
    filterset_fields = ["title", ]


class LectureMaterialsBundleView(APIView):
    """GET: блок заголовка + список материалов для страницы «Преподавателям»."""

    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        section = LectureMaterialsSection.objects.first()
        materials = LecturePreparationMaterial.objects.all().order_by('sort_order', 'id')
        return Response(
            {
                'section': LectureMaterialsSectionSerializer(section).data if section else None,
                'items': LecturePreparationMaterialSerializer(
                    materials, many=True, context={'request': request}
                ).data,
            }
        )