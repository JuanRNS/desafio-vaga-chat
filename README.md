# Desafio Técnico - Vaga Full-Stack Jr

Este é o repositório do projeto do desafio técnico para a vaga de Desenvolvedor Full-Stack Jr. O projeto é composto por **backend** em Django e **frontend** em React (Vite), utilizando SQLite como banco de dados.

---

## 🔧 Tecnologias Utilizadas

- **Backend**: Django, SQLite, Django CORS
- **Frontend**: React (Vite), React Router DOM
- **Outros**: Fetch API nativo para requisições HTTP

---

## ⚙️ Estrutura do Projeto

- **Backend**: separado em pastas para models, views e urls, facilitando a manutenção e leitura do código.
- **Frontend**: componentes criados quando necessário para aumentar a reutilização e a clareza do código.
- **Banco de Dados**: SQLite, simples e rápido para o contexto do projeto.
- **Gerenciamento de Estado**: estado local dos componentes do React, utilizando Fetch API nativo para comunicação com o backend.

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- Python 3.x
- Node.js + npm ou yarn

### 1️⃣ Backend (Django)

```bash
# Entrar na pasta do backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar o ambiente virtual
# Windows CMD
venv\Scripts\activate
# Windows PowerShell
.venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Rodar migrações
python manage.py migrate

# Rodar o servidor Django
python manage.py runserver


### 2️⃣ Frontend (React + Vite)

# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install
# ou
yarn install

# Rodar o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

💡 Decisões Técnicas

- Django + SQLite: rápido e simples, ideal para o desafio.

- CORS: configurado para comunicação com o frontend.

- Fetch API: chamadas HTTP simples, sem dependências extras.

- Estrutura do código: pastas claras e componentes reutilizáveis.

- React Router DOM: navegação entre páginas.

- IA no frontend: aceleração da criação de páginas HTML e CSS.

- Testes simples: validação das principais funcionalidades.


