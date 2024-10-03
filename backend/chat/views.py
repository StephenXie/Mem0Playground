from django.shortcuts import render
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
import os
from memory.views import *
import json
load_dotenv()
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

@api_view(['POST'])
def query_llm(request):
    messages = json.loads(request.data.get('messages'))
    latest_message = messages[-1].get("content")
    user_id = request.data.get('user_id')
    requested_model = request.data.get('model')
    openai_models = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"]
    anthropic_models = ["claude-3-5-sonnet-20240620", "claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"]
    if requested_model in openai_models:
        model = ChatOpenAI(model=requested_model)
    elif requested_model in anthropic_models:
        model = ChatAnthropic(model=requested_model)
    else:
        return Response({"error": "Model not found"}, status=400)

    recalled_memory = search_memory({"data": {"user_id": user_id, "query": latest_message}})
    
    messages = create_memory({"data": {"message": latest_message, "user_id": user_id}})
    return Response({"llm": llm}, status=200)