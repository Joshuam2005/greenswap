from rest_framework import status 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.throttling import AnonRateThrottle
from .serializers import RegisterSerializer, LoginSerializer
from django.utils import timezone
from .models import User

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Registration successful. Check your email to verify your account."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VerifyEmailView(APIView):
    def get(self, request):
        token = request.query_params.get('token')

        if not token:
            return Response(
                {"error": "No token provided."},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(verification_token=token)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid token."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if user.token_expiry < timezone.now():
            return Response(
                {"error": "Token has expired."},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.is_verified = True
        user.verification_token = None
        user.token_expiry = None
        user.save()

        return Response(
            {"message": "Email verified successfully. You can now log in."},
            status=status.HTTP_200_OK
        )
    
class LoginView(APIView):
    throttle_classes = [AnonRateThrottle
                        ]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {"id": user.id, "email": user.email}
                },
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)