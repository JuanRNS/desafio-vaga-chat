import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Chat from '../pages/chat/chat';
import Home from '../pages/home/home';
import History from '../pages/history/history';

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/chat/:usuario',
                element: <Chat />,
            },
            {
                path: '/history/:usuario',
                element: <History />,
            },
        ],
    }
]);
