import type { HistoryItemProps } from "../../interfaces/history.interface";
import './history-item.css';

export default function HistoryItem({ message }: HistoryItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="history-item">
      <div className="history-timestamp">{formatDate(message.created_at)}</div>
      <div className="history-conversation">
        <div className="history-message history-message-user">
          <strong>Você:</strong>
          <p>{message.text}</p>
        </div>
        <div className="history-message history-message-api">
          <strong>API:</strong>
          <p>{message.response}</p>
        </div>
      </div>
    </div>
  );
}