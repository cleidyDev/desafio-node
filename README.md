# Desafio Node.js - API de Cursos

Uma API REST simples para gerenciamento de cursos, construída com Node.js, TypeScript e Fastify.

## 📋 Sobre o Projeto

Esta aplicação oferece uma API REST para gerenciar cursos, permitindo operações básicas de CRUD (Create, Read) com validação de dados e tratamento de erros.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Fastify** - Framework web rápido e eficiente
- **Pino-Pretty** - Logger formatado para desenvolvimento
- **Crypto (Node.js)** - Para geração de IDs únicos

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
npm install
```

3. Execute o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:8000`

## 📚 Endpoints da API

### GET /courses
Retorna a lista de todos os cursos disponíveis.

**Resposta de Sucesso (200):**
```json
{
  "curso": [
    {
      "id": "1",
      "name": "NodeJS",
      "duration": "3 months"
    }
  ]
}
```

### GET /courses/:id
Retorna um curso específico pelo seu ID.

**Parâmetros:**
- `id` (string) - ID do curso

**Resposta de Sucesso (200):**
```json
{
  "course": {
    "id": "1",
    "name": "NodeJS",
    "duration": "3 months"
  }
}
```

**Resposta de Erro (404):**
```json
Curso não encontrado
```

### POST /courses
Cria um novo curso.

**Body da Requisição:**
```json
{
  "name": "React Fundamentals",
  "duration": "2 months"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Curso criado com sucesso"
}
```

**Resposta de Erro (400):**
```json
{
  "message": "Nome e duracao sao obrigatorios"
}
```

## 🧪 Exemplos de Uso

### Listar todos os cursos
```bash
curl -X GET http://localhost:8000/courses
```

### Buscar curso por ID
```bash
curl -X GET http://localhost:8000/courses/1
```

### Criar um novo curso
```bash
curl -X POST http://localhost:8000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python Básico",
    "duration": "4 months"
  }'
```

## 🔧 Configurações

### Logger
O projeto utiliza o Pino-Pretty para logging formatado durante o desenvolvimento, configurado para exibir timestamps no formato `HH:MM:ss Z` e ignorar `pid` e `hostname`.

### Geração de IDs
Utiliza a função `crypto.randomUUID()` do Node.js para gerar IDs únicos para novos cursos.

## 📋 Próximos Passos

- [ ] Implementar endpoint PUT para atualizar cursos
- [ ] Implementar endpoint DELETE para remover cursos
- [ ] Adicionar persistência de dados (banco de dados)
- [ ] Implementar autenticação
- [ ] Adicionar testes unitários
- [ ] Adicionar documentação Swagger/OpenAPI

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.