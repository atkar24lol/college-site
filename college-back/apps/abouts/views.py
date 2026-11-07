from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.conf import settings
import logging
from django.core.mail import EmailMessage
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.db.models import Q
from apps.education.models import *
from apps.news.models import *
from apps.education.serializers import *
from apps.news.serializers import *
from .models import *
from .serializers import *

logger = logging.getLogger(__name__)

class Email_sendingViewSet(ModelViewSet):
    queryset = Email_sending.objects.all()
    serializer_class = Email_sendingSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["receiver", ]
    filterset_fields = ["receiver", ]


class FAQViewSet(ModelViewSet):
    queryset = FAQ.objects.order_by("id")
    serializer_class = FAQSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["question", "answer"]
    filterset_fields = ["question", "answer"]


class Contact_informationViewSet(ModelViewSet):
    queryset = Contact_information.objects.all()
    serializer_class = Contact_informationSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "type", "text"]
    filterset_fields = ["title", "type", "text"]


class SertificateViewSet(ModelViewSet):
    queryset = Sertificate.objects.all()
    serializer_class = SertificatesSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "description"]
    filterset_fields = ["title", "description", "section"]


class Images_for_multimediaViewSet(ModelViewSet):
    queryset = Images_for_multimedia.objects.all()
    serializer_class = Images_for_multimediaSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "type"]
    filterset_fields = ["title", "type"]

class ContactViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "role", "email", "contact"]
    filterset_fields = ["title", "role", "email", "contact"]

class Block_of_contactViewSet(ModelViewSet):
    queryset = Block_of_contact.objects.all()
    serializer_class = Block_of_contactSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "contact", "email"]
    filterset_fields = ["title", "contact", "email"]

class LecturerViewSet(ModelViewSet):
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["name", "age", "bio", "subject"]
    filterset_fields = ["name", "age", "bio", "subject"]


class GraduateViewSet(ModelViewSet):
    queryset = Graduate.objects.filter(is_published=True)
    serializer_class = GraduateSerializer
    permission_classes = (AllowAny,)
    filter_backends = [filters.DjangoFilterBackend, SearchFilter]
    search_fields = ["label", "title", "description"]
    filterset_fields = ["is_published", "label", "title", "description"]

@method_decorator(csrf_exempt, name="dispatch")
class Sending(APIView):
    # Публичная форма: без SessionAuthentication DRF не требует CSRF-токен,
    # даже если в браузере есть сессия админки (иначе «CSRF Failed: CSRF token missing»).
    authentication_classes = ()
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=SendingSerializer, responses={200: "Question was sent"})
    def post(self, request, *args, **kwargs):
        serializer = SendingSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": "invalid", "fields": serializer.errors}, status=400)
        receiver = Email_sending.objects.first()
        if not receiver:
            logger.error("Обратная связь: в админке не указана почта для обращений (Email_sending).")
            return Response({"error": "not_configured"}, status=503)

        data = serializer.validated_data
        msg = EmailMessage(
            subject="Обращение с сайта АТК: " + data["name"],
            body=(
                f"Имя: {data['name']}\n"
                f"Почта для ответа: {data['email']}\n\n"
                f"Обращение:\n{data['info_text']}"
            ),
            # Отправитель — почтовый ящик из настроек сервера (SMTP), получатель — из админки.
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[receiver.receiver],
            # Кнопка «Ответить» в почте сразу отвечает посетителю.
            reply_to=[data["email"]],
        )
        try:
            msg.send()
        except Exception:
            # Подробности — в логах сервера; посетителю показываем понятный текст на фронте.
            logger.exception("Обратная связь: не удалось отправить письмо через SMTP")
            return Response({"error": "send_failed"}, status=502)
        return Response({"message": "success"}, status=200)
    

query_param = openapi.Parameter(
    'q',
    openapi.IN_QUERY,
    description="Поисковый запрос",
    type=openapi.TYPE_STRING,
    required=True
)

class GlobalSearchView(APIView):
    @swagger_auto_schema(
        manual_parameters=[query_param],
        responses={200: openapi.Response(description="Результаты поиска")}
    )
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', None)
        if not query:
            return Response({"error": "Query parameter 'q' is required."}, status=400)
        results = {}

        news_results = News.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
        results["news"] = (NewsSerializer(news_results, many=True, context={'request': request}).data)

        images_for_multimedia_results = Images_for_multimedia.objects.filter(
            Q(title__icontains=query) | Q(type__icontains=query)
        )
        results["images_for_multimedia"] = (Images_for_multimediaSerializer(images_for_multimedia_results, many=True, context={'request': request}).data)

        Courses_programms_results = Courses_programms.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query) | Q(duration__icontains=query) | Q(mini_description__icontains=query) | Q(price__icontains=query) | Q(type__icontains=query)
        )
        results["courses_and_programms"] = (Courses_programmsSerializer(Courses_programms_results, many=True, context={'request': request}).data)

        Lecturer_results = Lecturer.objects.filter(
            Q(name__icontains=query) | Q(age__icontains=query) | Q(bio__icontains=query) | Q(subject__icontains=query)
        )
        results["lecturer"] = (LecturerSerializer(Lecturer_results, many=True, context={'request': request}).data)

        graduate_results = Graduate.objects.filter(
            Q(label__icontains=query) | Q(title__icontains=query) | Q(description__icontains=query),
            is_published=True,
        )
        results["graduates"] = (GraduateSerializer(graduate_results, many=True, context={'request': request}).data)

        faq_results = FAQ.objects.filter(
            Q(question__icontains=query) | Q(answer__icontains=query)
        )
        results["faq"] = (FAQSerializer(faq_results, many=True, context={'request': request}).data)

        sertificate_results = Sertificate.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
        results["sertificates"] = (SertificatesSerializer(sertificate_results, many=True, context={'request': request}).data)

        return Response(results)
