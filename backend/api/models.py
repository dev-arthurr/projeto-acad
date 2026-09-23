from django.db import models

# Create your models here.
class Exercicio(models.Model):
    nome = models.CharField("Exercício", max_length=100)
    grupo = models.CharField("Grupo Muscular", max_length=100)
    repeticoes = models.IntegerField("Repetições")
    concluido = models.BooleanField("Concluido", default=False)

    class Meta:
        verbose_name = "Exercicio"
        verbose_name_plural = "Exercicios"

    def __str__(self):
        return self.nome
    
