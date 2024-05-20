from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path('', views.purchase, name='purchase'),
    path('get-sellers', views.get_sellers, name='get-sellers'),
    path('get-pins-id', views.get_pins_id, name='get-pins-id'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)