export type Usuario = 'A' | 'B';

export interface HeaderProps {
  readonly onUsuarioChange?: (usuario: Usuario) => void;
}