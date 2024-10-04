from django.shortcuts import render
from mem0 import MemoryClient
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from dotenv import load_dotenv
import os
from user.models import CustomUserModel

load_dotenv()

def get_client():
    api_key = os.getenv('MEM0_API_KEY')
    client = MemoryClient(api_key=api_key)
    return client

@api_view(['POST'])
def create_memory(request):
    client = get_client()
    message = request.data.get('message')
    user_id = request.data.get('user_id')
    if not message or not user_id:
        return Response({"error": "Message and user_id are required"}, status=400)
    client.add(message, user_id=user_id)
    return Response({"message": "Memory created successfully"}, status=200)

def create_memory_helper(message, user_id):
    client = get_client()
    client.add(message, user_id=user_id)
    return Response({"message": "Memory created successfully"}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_memories(request):
    client = get_client()
    email = request.GET.get('email')
    user_id = CustomUserModel.objects.get(email=email).user_id
    if not user_id:
        return Response({"error": "User ID is required"}, status=400)
    memory = client.get_all(user_id=user_id)
    return Response({"memory": memory}, status=200)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_memory(request):
    client = get_client()
    email = request.data.get('email')
    user_id = CustomUserModel.objects.get(email=email).user_id
    memory_id = request.data.get('memory_id')
    if not user_id or not memory_id:
        return Response({"error": "User ID and Memory ID are required"}, status=400)
    client.delete(memory_id)
    memory = client.get_all(user_id=user_id)
    return Response({"message": "Memory deleted successfully", "memory": memory}, status=200)

@api_view(['GET'])
def search_memory(request):
    client = get_client()
    user_id = request.GET.get('user_id')
    query = request.GET.get('query')
    if not user_id or not query:
        return Response({"error": "User ID and query are required"}, status=400)
    memory = client.search(query, user_id=user_id)
    return Response({"memory": memory}, status=200)

def search_memory_helper(user_id, query):
    client = get_client()
    memory = client.search(query, user_id=user_id)
    return memory

@api_view(['GET'])
def get_memory_by_id(request):
    client = get_client()
    user_id = request.GET.get('user_id')
    memory_id = request.GET.get('memory_id')
    if not user_id or not memory_id:
        return Response({"error": "User ID and memory ID are required"}, status=400)
    memory = client.get(memory_id, user_id=user_id)
    return Response({"memory": memory}, status=200)

@api_view(['PUT'])
def update_memory(request):
    client = get_client()
    user_id = request.data.get('user_id')
    memory_id = request.data.get('memory_id')
    memory = request.data.get('memory')
    if not user_id or not memory_id or not memory:
        return Response({"error": "User ID, memory ID and memory are required"}, status=400)
    client.update(memory_id, memory, user_id=user_id)
    return Response({"message": "Memory updated successfully"}, status=200)

@api_view(['DELETE'])
def delete_all_memories(request):
    client = get_client()
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required"}, status=400)
    client.delete_all(user_id=user_id)
    return Response({"message": "Memories deleted successfully"}, status=200)

@api_view(['GET'])
def get_users(request):
    client = get_client()
    users = client.get_users()
    return Response({"users": users}, status=200)