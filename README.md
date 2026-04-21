# Prova — Sistema de Gestão de Notas com Disciplinas - N1

## Autor

| Campo | Info |
|-------|------|
| **Nome** | Guilherme Espicoz Almeida |
| **Instituição** | Uniube |
| **Período** | Matutino |

Aplicação web completa para gerenciamento de alunos, disciplinas e notas, desenvolvida com Node.js, Express e React.

## Sobre o Projeto

O sistema permite cadastrar alunos, adicionar disciplinas para cada aluno, lançar notas por disciplina e editar notas já cadastradas.

Os dados são armazenados em um banco JSON local utilizando lowdb, garantindo persistência mesmo após reiniciar o servidor.

## Tecnologias Utilizadas

- **Node.js** — ambiente de execução do servidor
- **Express** — criação da API REST
- **lowdb** — banco de dados JSON
- **CORS** — comunicação entre front e back
- **React** — interface do usuário
- **Axios** — requisições HTTP

## Estrutura do Projeto

```
sistema-notas/
├── backend/
│   ├── server.js
│   ├── db.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
```

## Como Rodar

### Backend

```bash
cd backend
npm install
node server.js
```

Servidor roda em:

```
http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Funcionalidades

* Cadastro de alunos
* Cadastro de disciplinas por aluno
* Lançamento de notas por disciplina
* Edição de notas existentes
* Persistência de dados com lowdb
* API REST com validações

## Endpoints da API

### Alunos

* `GET /alunos` — listar alunos
* `POST /alunos` — criar aluno

### Disciplinas

* `POST /alunos/:id/disciplinas` — adicionar disciplina

### Notas

* `POST /alunos/:id/disciplinas/:disciplina/notas` — lançar nota
* `PUT /alunos/:id/disciplinas/:disciplina/notas/:index` — editar nota

## Códigos de Resposta HTTP

* `200` — sucesso
* `201` — criado com sucesso
* `400` — erro de validação
* `404` — recurso não encontrado

## Observações

* As notas são armazenadas dentro de disciplinas
* Cada aluno possui um array de disciplinas
* Cada disciplina possui um array de notas

## Melhorias Futuras

* Autenticação com login
* Interface mais amigável (UI/UX)
* Cálculo de média por disciplina
* Deploy online (Render ou Vercel)