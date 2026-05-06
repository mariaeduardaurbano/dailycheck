# 📋 Daily Check

> Seu hub diário de tarefas e clima — tudo em um só lugar.

![Daily Check Banner](https://img.shields.io/badge/Daily-Check-4F46E5?style=for-the-badge&logo=checkmarx&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## 📌 Sobre o Projeto

**Daily Check** é uma aplicação web completa que centraliza sua rotina diária em três funcionalidades principais:

- 🏠 **Home** — Visão geral das suas tarefas em cards visuais
- 🌡️ **Temperatura** — Consulta de clima em tempo real por localização
- ✅ **Tarefas** — Gerenciamento completo de tarefas com banco de dados persistente

---

## ✨ Funcionalidades

### 🏠 Home
- Cards visuais exibindo todas as tarefas cadastradas
- Cada card apresenta imagem, nome da tarefa e período (início → fim)
- Layout responsivo e agradável para visualização rápida

### 🌡️ Temperatura
- Campo de busca para pesquisar qualquer cidade do mundo
- Exibição de temperatura atual, sensação térmica, umidade e condição do clima
- Integração com API de meteorologia em tempo real
- Interface em HTML puro com design limpo

### ✅ Tarefas
- Criação de tarefas via modal com os campos:
  - **Nome** da tarefa
  - **Data de início**
  - **Data de fim**
  - **Descrição** detalhada
- Dados persistidos em banco de dados com **Prisma ORM**
- Edição e exclusão de tarefas
- Listagem completa com filtros

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Frontend | JavaScript |
| Estilização |  CSS |
| Backend | JavaScript API Routes |
| ORM | Prisma |
| Banco de Dados | PostgreSQL (ou SQLite para dev) |
| API de Clima | OpenWeatherMap API |
| Linguagem | TypeScript |

---

## 📁 Estrutura do Projeto

```
daily-check/
├── prisma/
│   ├── schema.prisma        # Definição dos modelos do banco
│   └── migrations/          # Histórico de migrações
├── public/
│   └── images/              # Imagens dos cards de tarefas
├── src/
│   ├── app/
│   │   ├── page.tsx         # Home — cards de tarefas
│   │   ├── temperatura/
│   │   │   └── page.tsx     # Página de consulta de clima
│   │   ├── tarefas/
│   │   │   └── page.tsx     # Gerenciamento de tarefas
│   │   └── api/
│   │       └── tarefas/
│   │           └── route.ts # API REST para tarefas
│   ├── components/
│   │   ├── Navbar.tsx       # Barra de navegação
│   │   ├── TaskCard.tsx     # Card de tarefa para a Home
│   │   └── TaskModal.tsx    # Modal de criação/edição
│   └── lib/
│       └── prisma.ts        # Instância do cliente Prisma
├── .env                     # Variáveis de ambiente
├── .env.example             # Exemplo de variáveis
└── README.md
```

---

## 🗄️ Modelo de Dados

```prisma
model Tarefa {
  id        Int      @id @default(autoincrement())
  nome      String
  descricao String?
  inicio    DateTime
  fim       DateTime
  imagem    String?
}
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Banco de dados PostgreSQL (ou SQLite para desenvolvimento rápido)
- Chave de API do [OpenWeatherMap](https://openweathermap.org/api)

### Passo a Passo

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/daily-check.git
cd daily-check
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/daily_check"
# ou para SQLite (desenvolvimento):
# DATABASE_URL="file:./dev.db"

# API de Clima
OPENWEATHER_API_KEY="sua_chave_aqui"
```

**4. Configure o banco de dados**
```bash
# Rodar as migrações
npx prisma migrate dev --name init

# (Opcional) Visualizar o banco com Prisma Studio
npx prisma studio
```

**5. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**6. Acesse no navegador**
```
http://localhost:3000
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/tarefas` | Lista todas as tarefas |
| `POST` | `/api/tarefas` | Cria uma nova tarefa |
| `PUT` | `/api/tarefas/:id` | Atualiza uma tarefa |
| `DELETE` | `/api/tarefas/:id` | Remove uma tarefa |

### Exemplo de payload para criar tarefa:
```json
{
  "nome": "Estudar TypeScript",
  "descricao": "Revisar generics e utility types",
  "inicio": "2025-05-06",
  "fim": "2025-05-20"
}
```

---

## 🌐 API de Temperatura

A página de Temperatura utiliza a **OpenWeatherMap API** (plano gratuito suportado).

**Como obter a chave:**
1. Acesse [openweathermap.org](https://openweathermap.org/api)
2. Crie uma conta gratuita
3. Vá em *API Keys* no painel
4. Copie a chave e cole no `.env`

---

Feito com 💜 por **[Maria Eduarda Urbano](https://github.com/mariaeduardaurbano**
