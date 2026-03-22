from rest_framework import serializers
from .models import *


class Admission_dateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission_date
        fields = "__all__"


class Courses_programmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses_programms
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request and instance.image:
            image_url = instance.image.url
            if not image_url.startswith('http'):
                image_url = request.build_absolute_uri(image_url)
            representation['image'] = image_url
        elif not instance.image:
            representation['image'] = None
        return representation

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"


class LectureMaterialsSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LectureMaterialsSection
        fields = "__all__"


class LecturePreparationMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = LecturePreparationMaterial
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        f = instance.file
        if f and getattr(f, 'name', None):
            url = f.url
            if request and url and not str(url).startswith('http'):
                url = request.build_absolute_uri(url)
            representation['file'] = url
        return representation