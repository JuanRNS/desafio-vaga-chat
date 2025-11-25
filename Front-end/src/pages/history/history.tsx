import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { HistoryMessage } from '../../interfaces/history.interface';
import HistoryItem from '../../components/history-component/history-item';
import './history.css';


export default function History() {
    const { usuario } = useParams<{ usuario: string }>();
    const [historyMessages, setHistoryMessages] = useState<HistoryMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setLoading(true);
        fetch(`${apiUrl}/messages/history/?user=${usuario}`)
            .then(response => response.json())
            .then(data => {
                setHistoryMessages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar histórico:', error);
                setLoading(false);
            });
    }, [usuario, apiUrl]);

    let history;

    if (loading) {
        history = <p className="history-placeholder">Carregando histórico...</p>;
    } else if (historyMessages.length === 0) {
        history = <p className="history-placeholder">Nenhuma mensagem encontrada no histórico.</p>;
    } else {
        history = (
            <div className="history-list">
                {historyMessages.map(msg => (
                    <HistoryItem key={msg.id} message={msg} />
                ))}
            </div>
        );
    }
    return (
        <div className="history-container">
            <div className="history-header">
                <h2>Histórico de Mensagens - Usuário {usuario?.toUpperCase()}</h2>
            </div>
            <div className="history-content">
                {history}
            </div>
        </div>
    );
}
