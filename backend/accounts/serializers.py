import secrets
from django.utils import timezone
from datetime import timedelta
from rest_framework import serializers
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate_email(self, value):
        allowed_domains = ['my.unt.edu', 'unt.edu']
        domain = value.split('@')[-1].lower()
        if domain not in allowed_domains:
            raise serializers.ValidationError(
                "Registration is restricted to UNT email addresses only."
            )
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.verification_token = secrets.token_urlsafe(32)
        user.token_expiry = timezone.now() + timedelta(hours=24)
        user.save()
        return user