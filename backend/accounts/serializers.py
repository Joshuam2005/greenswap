import secrets
from django.utils import timezone
from datetime import timedelta
from rest_framework import serializers
from .models import User
from .utils import send_verification_email
from django.contrib.auth import authenticate

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
        send_verification_email(user)
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])

        if user is None:
            raise serializers.ValidationError("Invalid email or password.")

        if not user.is_verified:
            raise serializers.ValidationError("Invalid email or password.")

        data['user'] = user
        return data