from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create_memory, name='create_memory'),
    path('all', views.get_all_memories, name='get_all_memories'),
    path('delete', views.delete_memory, name='delete_memory'),
    path('search', views.search_memory, name='search_memory'),
    path('get', views.get_memory_by_id, name='get_memory_by_id'),
    path('update', views.update_memory, name='update_memory'),
    path('delete-all', views.delete_all_memories, name='delete_all_memories'),
    path('users', views.get_users, name='get_users'),
]