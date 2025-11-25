from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Message

class MessageAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.send_url = '/api/messages/send/'
        self.history_url = '/api/messages/history/'

    def test_send_message_valid_user_a(self):
        data = {'user': 'A', 'text': 'Olá, teste A'}
        response = self.client.post(self.send_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('response', response.data)
        self.assertEqual(response.data['response'], "Obrigado, Usuário A! Em breve responderemos.")

    def test_send_message_valid_user_b(self):
        data = {'user': 'B', 'text': 'Olá, teste B'}
        response = self.client.post(self.send_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['response'], "Obrigado, Usuário B! Sua mensagem foi registrada.")

    def test_send_message_invalid_user(self):
        data = {'user': 'C', 'text': 'Teste inválido'}
        response = self.client.post(self.send_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)

    def test_message_saved_in_db(self):
        data = {'user': 'A', 'text': 'Mensagem para salvar'}
        self.client.post(self.send_url, data, format='json')
        message = Message.objects.last()
        self.assertEqual(message.user, 'A')
        self.assertEqual(message.text, 'Mensagem para salvar')
        self.assertEqual(message.response, "Obrigado, Usuário A! Em breve responderemos.")

    def test_history_messages(self):
        Message.objects.create(user='A', text='Msg 1', response='Resp 1')
        Message.objects.create(user='A', text='Msg 2', response='Resp 2')
        Message.objects.create(user='B', text='Msg 3', response='Resp 3')

        response = self.client.get(f'{self.history_url}?user=A')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['user'], 'A')
        self.assertEqual(response.data[1]['user'], 'A')
