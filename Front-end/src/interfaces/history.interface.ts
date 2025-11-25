
export interface HistoryMessage {
    id: number;
    text: string;
    user: string;
    response: string;
    created_at: string;
}


export interface HistoryItemProps {
  message: HistoryMessage;
}