# Desafio Node.js - API de Cursos

Uma API REST simples para gerenciamento de cursos, construída com Node.js, TypeScript e Fastify.

## 📋 Sobre o Projeto

Esta aplicação oferece uma API REST para gerenciar cursos, permitindo operações básicas de CRUD (Create, Read) com validação de dados e tratamento de erros.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Fastify** - Framework web rápido e eficiente
- **Pino-Pretty** - Logger formatado para desenvolvimento

## 📁 Estrutura do Projeto

```
desafio-node/
├── server.ts          # Servidor principal da aplicação
├── package.json       # Dependências e scripts do projeto
├── tsconfig.json      # Configurações do TypeScript
└── README.md          # Documentação do projeto
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd desafio-node
```

2. Instale as dependências:
```bash
npm i
```

3. Executar o drizzle-kit para generar o db
```bash
npm run generate
```
4.Executar o drizzle-kit para migrar o db
```bash
npm run migrate
```
5. Execute o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:8000`

## 🔧 Configurações

### Logger
O projeto utiliza o Pino-Pretty para logging formatado durante o desenvolvimento, configurado para exibir timestamps no formato `HH:MM:ss Z` e ignorar `pid` e `hostname`.

## 📋 Próximos Passos

- [ ] Implementar endpoint PUT para atualizar cursos
- [ ] Implementar endpoint DELETE para remover cursos
- [ ] Implementar autenticação
- [ ] Adicionar testes unitários
- [ ] Adicionar documentação Swagger/OpenAPI

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.