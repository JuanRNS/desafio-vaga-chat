import { useEffect, useState } from 'react'
import {  Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import type { Usuario } from './interfaces/header.interface';

function App() {
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  const handleUsuarioChange = (usuario: Usuario) => {
    setUsuarioAtual(usuario);
    navigate(`/chat/${usuario.toLowerCase()}`);
  };

  useEffect(() => {
    document.body.className = usuarioAtual === 'A' ? 'theme-usuario-a' : 'theme-usuario-b';
  }, [usuarioAtual]);

   return (
      <div className="app-container">
      <Header onUsuarioChange={handleUsuarioChange} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App
