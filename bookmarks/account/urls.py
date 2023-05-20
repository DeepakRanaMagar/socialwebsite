from django.conf.urls import url 
from . import views

urlpatterns = [
    path('login/', views.user_login, name='login'),
]
