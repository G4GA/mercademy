from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('history/', views.history, name='history')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)