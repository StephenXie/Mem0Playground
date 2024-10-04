from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create_chat, name='create_chat'),
    path('all', views.get_all_chats_by_user_id, name='get_all_chats_by_user_id'),
    path('delete', views.delete_chat, name='delete_chat'),
    path('get', views.get_chat_by_id, name='get_chat_by_id'),
    path('update', views.update_chat, name='update_chat'),
    path('query', views.query_llm, name='query_llm')
]