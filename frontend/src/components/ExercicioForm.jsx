import { useState } from 'react';

export default function ExercicioForm({ onAddSuccess }) {
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [concluido, setConcluido] = useState(false);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página

    // Validação básica dos campos obrigatórios
    if (!nome.trim() || !grupo.trim() || repeticoes === '') {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setErro(null);
    setCarregando(true);

    // Estrutura exata esperada pelo serializer da API Django
    const payload = {
      nome: nome.trim(),
      grupo: grupo.trim(),
      repeticoes: parseInt(repeticoes, 10),
      concluido: Boolean(concluido),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/exercicios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erros retornados pelo Django:', errorData);
        setErro('Falha ao registar o exercício. Verifique os dados enviados.');
        setCarregando(false);
        return;
      }

      const novoExercicio = await response.json();

      // Atualiza o estado da lista no componente principal sem chamar window.location.reload()
      if (onAddSuccess) {
        onAddSuccess(novoExercicio);
      }

      // Limpa os campos do formulário após o sucesso
      setNome('');
      setGrupo('');
      setRepeticoes('');
      setConcluido(false);
    } catch (err) {
      console.error('Erro de conexão com o servidor:', err);
      setErro('Não foi possível conectar ao servidor Django.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ marginBottom: '25px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Adicionar Novo Exercício</h3>

      {/* Renderização condicional de mensagem de erro */}
      {erro && (
        <p style={{ color: 'red', marginBottom: '12px' }}>
          {erro}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Exercício:</label>
          <input
            type="text"
            placeholder="Ex: Supino Reto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Grupo Muscular:</label>
          <input
            type="text"
            placeholder="Ex: Peito"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Repetições:</label>
          <input
            type="number"
            placeholder="Ex: 12"
            value={repeticoes}
            onChange={(e) => setRepeticoes(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
          <input
            type="checkbox"
            id="concluidoCheck"
            checked={concluido}
            onChange={(e) => setConcluido(e.target.checked)}
          />
          <label htmlFor="concluidoCheck">Concluído</label>
        </div>

        <button
          type="submit"
          disabled={carregando}
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: carregando ? 'not-allowed' : 'pointer',
          }}
        >
          {carregando ? 'A guardar...' : 'Adicionar Exercício'}
        </button>
      </form>
    </div>
  );
}