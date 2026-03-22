from rest_framework import serializers

from .models import *
from .utils import normalize_video_embed_url

class Email_sendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email_sending
        fields = "__all__"


class SendingSerializer(serializers.Serializer):
    info_text = serializers.CharField()
    name = serializers.CharField()
    email = serializers.EmailField()


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"


class Contact_informationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact_information
        fields = "__all__"


class SertificatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sertificate
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")
        if instance.image:
            image_url = instance.image.url
            if request and not str(image_url).startswith("http"):
                image_url = request.build_absolute_uri(image_url)
            representation["image"] = image_url
        else:
            representation["image"] = None
        return representation


class Images_for_multimediaSerializer(serializers.ModelSerializer):
    """API: image / video_file — абсолютные URL; embed_url — для iframe по ссылке YouTube/Vimeo."""

    class Meta:
        model = Images_for_multimedia
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if instance.image:
            image_url = instance.image.url
            if request and not str(image_url).startswith('http'):
                image_url = request.build_absolute_uri(image_url)
            representation['image'] = image_url
        else:
            representation['image'] = None

        if instance.video_file:
            vf = instance.video_file.url
            if request and not str(vf).startswith('http'):
                vf = request.build_absolute_uri(vf)
            representation['video_file'] = vf
        else:
            representation['video_file'] = None

        if instance.type == Images_for_multimedia.TypeChoice.video and instance.link:
            representation['embed_url'] = normalize_video_embed_url(instance.link)
        else:
            representation['embed_url'] = None

        return representation


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class Block_of_contactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block_of_contact
        fields = "__all__"


class LecturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecturer
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            image_url = instance.avatar.url
            if not image_url.startswith('http'):
                image_url = request.build_absolute_uri(image_url)
            representation['avatar'] = image_url
        return representation


class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            image_url = instance.file.url
            if not image_url.startswith('http'):
                image_url = request.build_absolute_uri(image_url)
            representation['file'] = image_url
        return representation