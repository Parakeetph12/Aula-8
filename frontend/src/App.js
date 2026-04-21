import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nomeAluno, setNomeAluno] = useState('');

  const fetchAlunos = async () => {
    const res = await axios.get('http://localhost:5000/alunos');
    setAlunos(res.data);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const adicionarAluno = async () => {
    await axios.post('http://localhost:5000/alunos', { nome: nomeAluno });
    setNomeAluno('');
    fetchAlunos();
  };

  const adicionarDisciplina = async (id) => {
    const nome = prompt('Nome da disciplina:');
    if (!nome) return;
    await axios.post(`http://localhost:5000/alunos/${id}/disciplinas`, { nome });
    fetchAlunos();
  };

  const lancarNota = async (id, disciplina) => {
    const nota = prompt('Nota:');
    if (!nota) return;
    await axios.post(`http://localhost:5000/alunos/${id}/disciplinas/${disciplina}/notas`, {
      nota: parseFloat(nota)
    });
    fetchAlunos();
  };

  const editarNota = async (id, disciplina, index) => {
    const novaNota = prompt('Nova nota:');
    if (!novaNota) return;

    await axios.put(`http://localhost:5000/alunos/${id}/disciplinas/${disciplina}/notas/${index}`, {
      novaNota: parseFloat(novaNota)
    });

    fetchAlunos();
  };

  return (
    <div>
      <h1>Sistema de Notas</h1>

      <input value={nomeAluno} onChange={e => setNomeAluno(e.target.value)} />
      <button onClick={adicionarAluno}>Adicionar Aluno</button>

      {alunos.map(aluno => (
        <div key={aluno.id}>
          <h2>{aluno.nome}</h2>
          <button onClick={() => adicionarDisciplina(aluno.id)}>Adicionar Disciplina</button>

          {aluno.disciplinas.map((disc, dIndex) => (
            <div key={dIndex}>
              <h3>{disc.nome}</h3>
              <button onClick={() => lancarNota(aluno.id, disc.nome)}>Lançar Nota</button>

              <ul>
                {disc.notas.map((nota, i) => (
                  <li key={i}>
                    {nota}
                    <button onClick={() => editarNota(aluno.id, disc.nome, i)}>Editar</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;