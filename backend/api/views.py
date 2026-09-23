from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Exercicio  
from .serializers import ExercicioSerializer

class ExercicioListCreateAPIView(APIView):
    def get(self, request):
        nome_filtro = request.query_params.get('nome', None)
        
        if nome_filtro:
            exercicios = Exercicio.objects.filter(nome__icontains=nome_filtro)
        else:
            exercicios = Exercicio.objects.all()
            
        serializer = ExercicioSerializer(exercicios, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ExercicioSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExercicioDetailAPIView(APIView):
    def delete(self, request, pk):
        exercicio = get_object_or_404(Exercicio, pk=pk)
        exercicio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)