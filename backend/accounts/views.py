from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import authenticate, logout
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import MemberSerializer
from .serializers import ChangePasswordSerializer

from api.models import Member
import logging

logger = logging.getLogger(__name__)

class LoginView(APIView):
    """User authentication (JWT)"""

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                }
            }, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_400_BAD_REQUEST
        )

class AccountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        members = Member.objects.filter(user=user)
        member_data = [
            {
                'id': member.id,
                'name': member.full_name,
                'photo': member.photo.url,
                'role': member.role,
                'assignTask': member.can_assign_tasks,
                'github': member.github_link,
                'linkedin': member.linkedin_link,
            } 
            for member in members
        ]
            
        return Response({
            "id": user.id,
            "email": user.email,
            "username": user.username,
            'member': member_data
        })

class UpdateAccountAPIView(APIView):
    def put(self, request, *args, **kwargs):
        member = Member.objects.get(user=request.user)

        if 'email' in request.data:
            request.user.email = request.data['email']
            request.user.save()

        serializer = MemberSerializer(member, data=request.data, partial=True)

        if serializer.is_valid():
            if 'photo' in request.FILES:
                member.photo = request.FILES['photo']
                member.save()

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user

        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data['new_password']

            user.set_password(new_password)
            user.save()

            return Response({"message": "Password updated successfully!"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """User logout (JWT). To log out correctly, the refresh token must be passed in the request body."""
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            logger.error(f"Error blacklisting token: {e}")
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST
            )

        logout(request)
        return Response(
            {"message": "Successfully logged out"},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        logger.exception("Error during logout:")
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

