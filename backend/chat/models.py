from django.db import models


# Create your models here.
class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=16)
    content = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
