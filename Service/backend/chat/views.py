from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny

from .models import Message
from .serializers import MessageSerializer

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return 

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['post'])
    def send(self, request):
        user = request.data.get('user').upper()
        text = request.data.get('text')

        if user not in ["A", "B"]:
            return Response({"error": "Usuário inválido"}, status=400)

        respostas = {
            "A": "Obrigado, Usuário A! Em breve responderemos.",
            "B": "Obrigado, Usuário B! Sua mensagem foi registrada.",
        }

        response = respostas[user]

        msg = Message.objects.create(user=user, text=text, response=response)
        print(msg.response)

        return Response({
            "id": msg.id,
            "response": msg.response
        })
    
    
    @action(detail=False, methods=['get'])
    def history(self, request):
        user = request.query_params.get('user').upper()

        if user not in ["A", "B"]:
            return Response({"error": "Usuário inválido"}, status=400)

        messages = Message.objects.filter(user=user).order_by('-created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
