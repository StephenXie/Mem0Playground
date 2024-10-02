from rest_framework import serializers
from .models import Chat


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["chat_id", "user_id", "content", "created_at", "updated_at"]

    def create(self, validated_data):
        return Chat.objects.create(**validated_data)
