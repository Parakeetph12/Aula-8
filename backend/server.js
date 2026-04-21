const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Banco JSON
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ alunos: [] }).write();

// Buscar alunos
app.get('/alunos', (req, res) => {
  res.json(db.get('alunos').value());
});

// Criar aluno
app.post('/alunos', (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send('Nome obrigatório');

  const novoAluno = {
    id: Date.now(),
    nome,
    disciplinas: []
  };

  db.get('alunos').push(novoAluno).write();
  res.status(201).json(novoAluno);
});

// Adicionar disciplina
app.post('/alunos/:id/disciplinas', (req, res) => {
  const aluno = db.get('alunos').find({ id: parseInt(req.params.id) }).value();

  if (!aluno) return res.status(404).send('Aluno não encontrado');

  const { nome } = req.body;
  if (!nome) return res.status(400).send('Nome da disciplina obrigatório');

  aluno.disciplinas.push({ nome, notas: [] });
  db.write();

  res.status(201).json(aluno);
});

// Lançar nota
app.post('/alunos/:id/disciplinas/:disciplina/notas', (req, res) => {
  const aluno = db.get('alunos').find({ id: parseInt(req.params.id) }).value();
  if (!aluno) return res.status(404).send('Aluno não encontrado');

  const disciplina = aluno.disciplinas.find(d => d.nome === req.params.disciplina);
  if (!disciplina) return res.status(404).send('Disciplina não encontrada');

  const { nota } = req.body;
  if (typeof nota !== 'number') return res.status(400).send('Nota inválida');

  disciplina.notas.push(nota);
  db.write();

  res.status(201).json(disciplina);
});

// Editar nota
app.put('/alunos/:id/disciplinas/:disciplina/notas/:index', (req, res) => {
  const aluno = db.get('alunos').find({ id: parseInt(req.params.id) }).value();
  if (!aluno) return res.status(404).send('Aluno não encontrado');

  const disciplina = aluno.disciplinas.find(d => d.nome === req.params.disciplina);
  if (!disciplina) return res.status(404).send('Disciplina não encontrada');

  const index = parseInt(req.params.index);
  if (index >= disciplina.notas.length) return res.status(404).send('Nota não encontrada');

  const { novaNota } = req.body;
  if (typeof novaNota !== 'number') return res.status(400).send('Nota inválida');

  disciplina.notas[index] = novaNota;
  db.write();

  res.json(disciplina);
});

app.listen(5000, () => console.log('Servidor rodando em http://localhost:5000'));