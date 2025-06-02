from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar']  # 필요 시 필드 조정

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    photo = serializers.ImageField(required=False, allow_null=True)  # ✅ 추가

    class Meta:
        model = User
        fields = ('email', 'username', 'password','photo')  # ✅ 이미지 필드 추가

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            photo=validated_data.get("photo")  # ✅ 이미지 저장
        )
        user.set_password(validated_data['password'])
        user.save()

        # 사용자 생성 시 프로필도 함께 생성 (옵션)
        UserProfile.objects.create(user=user)

        return user


class UserSerializer(serializers.ModelSerializer):

    profile = UserProfileSerializer(read_only=True)  # 이 라인 반드시 필요
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'profile','photo_url')

    
    def get_photo_url(self, obj):
        request = self.context.get("request")
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None