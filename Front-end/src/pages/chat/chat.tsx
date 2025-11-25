import { useParams, Link } from 'react-router-dom';
import './chat.css';
import { useEffect, useState } from 'react';
import type { Message } from '../../interfaces/chat.interface';



export default function Chat() {
    const { usuario } = useParams<{ usuario: string }>();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSendMessage = () => {
        if (message.trim() === '') return;
        
        setMessages(prev => [...prev, { 
            id: `${Date.now()}-user`,
            text: message, 
            type: 'user' 
        }]);
        fetch(`${apiUrl}/messages/send/`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                user: usuario,
                text: message
             })
        })
        .then(response => response.json())
        .then(data => {
            setMessages(prev => [...prev, { 
                id: `${data.id}-api`,
                text: data.response, 
                type: 'api' 
            }]);
        })
        .catch(error => {
            console.error('Erro ao buscar mensagem da API:', error);
            setMessages(prev => [...prev, { 
                id: `${Date.now()}-error`,
                text: 'Erro ao conectar com a API', 
                type: 'api' 
            }]);
        });
        setMessage('');
    };

    useEffect(() => {
        const timer = setTimeout(() => setMessages([]), 0);
        return () => clearTimeout(timer);
    }, [usuario]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat - Usuário {usuario?.toUpperCase()}</h2>
                <Link to={`/history/${usuario}`} className="history-button">
                    📜 Histórico
                </Link>
            </div>
            <div className="chat-messages">
                {messages.length === 0 ? (
                    <p className="chat-placeholder">Suas mensagens aparecerão aqui...</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message-bubble ${msg.type === 'user' ? 'message-user' : 'message-api'}`}
                        >
                            <p>{msg.text}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chat-send-button" onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    );
}
