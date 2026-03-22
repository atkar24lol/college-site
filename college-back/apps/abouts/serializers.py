from rest_framework import serializers
from .models import *

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


class Images_for_multimediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images_for_multimedia
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            image_url = instance.image.url
            if not image_url.startswith('http'):
                image_url = request.build_absolute_uri(image_url)
            representation['image'] = image_url
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