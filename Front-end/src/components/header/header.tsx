import { useState } from 'react';
import './header.css';
import type { Usuario, HeaderProps } from '../../interfaces/header.interface';
import { useNavigate } from 'react-router-dom';

export default function Header({ onUsuarioChange }: HeaderProps) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  const handleUsuarioClick = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    onUsuarioChange?.(usuario);
  };

  const backHome = () => {
    setUsuarioSelecionado(null);
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-container">
        <button className="header-title" onClick={backHome}>
          Chat 4Blue
        </button>
        <div className="header-buttons">
          <button
            className={`btn-usuario ${usuarioSelecionado === 'A' ? 'active' : ''}`}
            onClick={() => handleUsuarioClick('A')}
          >
            Usuário A
          </button>
          <button
            className={`btn-usuario ${usuarioSelecionado === 'B' ? 'active' : ''}`}
            onClick={() => handleUsuarioClick('B')}
          >
            Usuário B
          </button>
        </div>
      </div>
    </header>
  );
}
