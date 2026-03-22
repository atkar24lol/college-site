from rest_framework import serializers
from .models import *

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
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


class Main_page_newsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Main_page_news
        fields = "__all__"