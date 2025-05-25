# Sistema ADES

Sistema web de controle de presença para os projetos da ADES (Associação de Desenvolvimento Social), desenvolvido como parte do Projeto Integrador III do curso de Engenharia da Computação na [UNIVESP](https://univesp.br).

## 🔧 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/) com [Prisma ORM](https://www.prisma.io/)
- Hospedagem local com Linux Mint

## 🚀 Funcionalidades

- Cadastro e listagem de participantes
- Controle de presença por evento
- Layout responsivo com acessibilidade (botões de ajuste de fonte)
- Interface intuitiva para uso em campo

## ▶️ Como Rodar Localmente

Clone o repositório:

```
git clone https://github.com/miltonjsn/sistema-ades.git
cd sistema-ades


Instale as dependências:

npm install

Configure o banco de dados:

1. Crie o banco sistema_ades no MySQL

2. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL="mysql://root:1234@localhost:3306/sistema_ades"

Sincronize o Prisma com o banco:

npx prisma db pull

Inicie o servidor de desenvolvimento:

npm run dev

Abra http://localhost:3000 no navegador.

📂 Estrutura do Projeto
app/: Páginas e rotas do Next.js

app/api/: Endpoints da API REST

prisma/: Schema e configuração do banco de dados

src/components/: Componentes reutilizáveis da interface

public/: Arquivos estáticos

✍️ Autor
Milton Neto – @miltonjsn

Projeto desenvolvido com fins acadêmicos e sociais, para auxiliar a gestão dos projetos comunitários realizados pela ADES.