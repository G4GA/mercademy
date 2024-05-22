from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views

urlpatterns = [
    path('', views.purchase, name='purchase'),
    path('detail/', views.detail, name='detail'),
    path('get-sellers', views.get_sellers, name='get-sellers'),
    path('make-sale', views.make_sale, name='make-sale'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)