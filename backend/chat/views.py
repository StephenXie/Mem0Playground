from django.shortcuts import render
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv
import os
# Create your views here.
@api_view(['POST'])
def create_chat(request):
    user_id = request.data.get('user_id')
    content = request.data.get('content')
    if not user_id or not content:
        return Response({"error": "User ID and content are required"}, status=400)
    chat = Chat.objects.create(user_id=user_id, content=content)
    return Response({"chat": ChatSerializer(chat).data}, status=200)

@api_view(['GET'])
def get_all_chats_by_user_id(request):
    user_id = request.GET.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=400)
    chats = Chat.objects.filter(user_id=user_id)
    return Response({"chats": ChatSerializer(chats, many=True).data}, status=200)


@api_view(['GET'])
def get_chat_by_id(request):
    chat_id = request.GET.get('chat_id')
    if not chat_id:
        return Response({"error": "Chat ID is required"}, status=400)
    chat = Chat.objects.get(chat_id=chat_id)
    return Response({"chat": ChatSerializer(chat).data}, status=200)

@api_view(['DELETE'])
def delete_chat(request):
    chat_id = request.data.get('chat_id')
    if not chat_id:
        return Response({"error": "Chat ID is required"}, status=400)
    Chat.objects.get(chat_id=chat_id).delete()
    return Response({"message": "Chat deleted successfully"}, status=200)

@api_view(['PUT'])
def update_chat(request):
    chat_id = request.data.get('chat_id')
    content = request.data.get('content')
    if not chat_id or not content:
        return Response({"error": "Chat ID and content are required"}, status=400)
    chat = Chat.objects.get(chat_id=chat_id)
    chat.content = content
    chat.save()
    return Response({"chat": ChatSerializer(chat).data}, status=200)