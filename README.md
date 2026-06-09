# API de Filmes — Node.js + Fastify

API REST desenvolvida com **Node.js** e **Fastify** que consome a **The Movie Database (TMDB) API**, permitindo listar, buscar e consultar detalhes de filmes.

Projeto desenvolvido para a disciplina **CC6PDSW – Projeto e Desenvolvimento de Sistemas Web** (UTFPR).

---

## Funcionalidades

- Servidor HTTP com Fastify
- Rotas organizadas (listagem, busca por ID e pesquisa por nome)
- Uso de **parâmetros de rota** e **query parameters**
- **Middleware (Hook)** de log das requisições
- Consumo de **API externa** de filmes (TMDB)
- **Tratamento de erros** com `try/catch` e mensagens amigáveis

---

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- API externa: [The Movie Database (TMDB)](https://developer.themoviedb.org/)

---

## Estrutura de pastas

```
api-filmes-fastify/
├── src/
│   ├── routes/
│   │   └── filmes.js        # Rotas relacionadas a filmes
│   ├── services/
│   │   └── tmdbApi.js       # Integração com a TMDB API
│   ├── hooks/
│   │   └── logger.js        # Middleware (Hook) de log
│   └── server.js            # Inicialização do servidor Fastify
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

> A estrutura acima é uma sugestão. Ajuste conforme a organização do seu projeto.

---

## A TMDB API

### Como obter as credenciais

1. Crie uma conta em https://www.themoviedb.org/ e faça login.
2. Acesse **Configurações da conta > API**: https://www.themoviedb.org/settings/api
3. Aceite os termos de uso e solicite o acesso.
4. Na seção de API você encontrará duas credenciais:
   - **API Key (v3 auth)** — usada como query parameter `api_key`.
   - **API Read Access Token** — usado no header `Authorization: Bearer <token>`.

> Observação: o cadastro da API do TMDB não é otimizado para celular. Faça esse processo
> em um computador (desktop) e navegador.

### Qual credencial usar

Os dois métodos dão o mesmo nível de acesso. Este projeto usa o **API Read Access Token**
(Bearer), por ser um único token válido para as versões v3 e v4 da API e por não expor a
credencial na URL. A `API Key` fica documentada no `.env` como alternativa.

### Endpoints utilizados

| Necessidade no projeto | Endpoint TMDB                                  |
|------------------------|------------------------------------------------|
| Lista de filmes        | `GET /3/movie/popular`                         |
| Detalhes por ID        | `GET /3/movie/{id}`                            |
| Busca por nome         | `GET /3/search/movie?query={termo}`            |

- URL base da API: `https://api.themoviedb.org/3`
- URL base das imagens (pôsteres): `https://image.tmdb.org/t/p/w500{poster_path}`
- Para resultados em português, adicione `&language=pt-BR` nas requisições.

---

## Instalação e execução

### Pré-requisitos

- Node.js 18 ou superior
- Credenciais da TMDB API (API Read Access Token e/ou API Key)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/erickbonruque/api-filmes-fastify.git

# 2. Entrar na pasta do projeto
cd api-filmes-fastify

# 3. Instalar as dependências
npm install

# 4. Configurar as variáveis de ambiente
cp .env.example .env
# edite o arquivo .env e adicione suas credenciais do TMDB

# 5. Iniciar o servidor
npm start
```

O servidor ficará disponível em `http://localhost:3000`.

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`.
As variáveis necessárias são:

| Variável                 | Obrigatória | Descrição                                                        |
|--------------------------|-------------|------------------------------------------------------------------|
| `PORT`                   | Não         | Porta do servidor (padrão: 3000).                                |
| `TMDB_BASE_URL`          | Sim         | URL base da API do TMDB.                                         |
| `TMDB_READ_ACCESS_TOKEN` | Sim*        | Token de leitura, enviado como `Authorization: Bearer`.          |
| `TMDB_API_KEY`           | Sim*        | Chave da API (v3), enviada como query parameter `api_key`.       |
| `TMDB_LANGUAGE`          | Não         | Idioma das respostas (ex.: `pt-BR`).                             |

> *Use uma das duas formas de autenticação. Basta uma delas estar preenchida.
> Este projeto usa o `TMDB_READ_ACCESS_TOKEN` por padrão.

**Importante:** o arquivo `.env` contém credenciais e **não deve** ser versionado.
Confirme que ele está listado no `.gitignore`. Versione apenas o `.env.example`.

---

## Rotas

| Método | Rota              | Descrição                                            |
|--------|-------------------|------------------------------------------------------|
| GET    | `/`               | Verifica se a API está funcionando                   |
| GET    | `/filmes`         | Retorna uma lista de filmes (populares)              |
| GET    | `/filmes/:id`     | Retorna os detalhes de um filme pelo seu ID          |
| GET    | `/busca?q=valor`  | Pesquisa filmes pelo nome (query parameter)          |

### Exemplos

```http
GET /
GET /filmes
GET /filmes/603
GET /busca?q=matrix
```

> No TMDB, o ID dos filmes é numérico (ex.: o filme Matrix tem o ID `603`).

**Resposta de exemplo — `GET /`**

```json
{
  "message": "API de Filmes funcionando!"
}
```

---

## Middleware de Log

A aplicação utiliza um Hook do Fastify que registra no terminal, a cada requisição:

- Método HTTP
- URL acessada
- Horário da requisição

**Exemplo de saída no terminal:**

```
[2026-06-09 14:32:10] GET /filmes
[2026-06-09 14:32:18] GET /busca?q=matrix
```

---

## Tratamento de erros

Todas as chamadas à TMDB são envolvidas em blocos `try/catch`. Em caso de falha, a API
retorna uma resposta amigável:

```json
{
  "erro": "Não foi possível buscar os filmes no momento. Tente novamente mais tarde."
}
```

---

## Autores

- Erick Bonruque — [@ErickBonruque](https://github.com/erickbonruque)
- Kaíque Medeiros Lima — [@noirelab](https://github.com/noirelab)

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais na UTFPR.
