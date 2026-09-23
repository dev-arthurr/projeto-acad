from django.urls import path
from .views import ExercicioListCreateAPIView, ExercicioDetailAPIView

urlpatterns = [
    path('exercicios/', ExercicioListCreateAPIView.as_view(), name='exercicios-list-create'),
    path('exercicios/<int:pk>/', ExercicioDetailAPIView.as_view(), name='exercicios-detail'),
]