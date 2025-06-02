from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import SignupAPIView, LogoutAPIView, MeAPIView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("signup/", SignupAPIView.as_view(), name="signup"),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("logout/", LogoutAPIView.as_view()),
    path("me/", MeAPIView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)