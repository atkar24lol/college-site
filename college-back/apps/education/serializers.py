from rest_framework import serializers
from .models import *


class Admission_dateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission_date
        fields = "__all__"


class SpecialtieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialtie
        fields = "__all__"


class Scholorship_grantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholorship_grant
        fields = "__all__"


class Courses_programmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses_programms
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

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"