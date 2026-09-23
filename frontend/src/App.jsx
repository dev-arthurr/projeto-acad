import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ExercicioForm from './components/ExercicioForm';
import ExercicioCard from './components/ExercicioCard';
import FilterStatus from './components/FilterStatus';

export default function App() {
  const [exercicios, setExercicios] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos'); // 'todos' | 'concluidos' | 'pendentes'
  const [loading, setLoading] = useState(false);

  // Busca dados na API Django (com suporte a busca textual por nome)
  const fetchExercicios = async (nomeFiltro = '') => {
    setLoading(true);
    try {
      const url = nomeFiltro
        ? `http://127.0.0.1:8000/api/exercicios/?nome=${encodeURIComponent(nomeFiltro)}`
        : 'http://127.0.0.1:8000/api/exercicios/';
      const res = await fetch(url);
      const data = await res.json();
      setExercicios(data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);

  // Adição sem reload
  const handleAddSuccess = (novoItem) => {
    setExercicios((prev) => [novoItem, ...prev]);
  };

  // Exclusão sem reload
  const handleDeleteSuccess = (idExcluido) => {
    setExercicios((prev) => prev.filter((item) => item.id !== idExcluido));
  };

  // Filtro local com base no botão clicado
  const exerciciosExibidos = exercicios.filter((item) => {
    if (statusFiltro === 'concluidos') return item.concluido === true;
    if (statusFiltro === 'pendentes') return item.concluido === false;
    return true; // 'todos'
  });

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Painel de Exercícios</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={() => fetchExercicios(search)}
      />

      <ExercicioForm onAddSuccess={handleAddSuccess} />

      <hr style={{ margin: '24px 0' }} />

      <h3>Lista de Exercícios</h3>

      {/* Botões de filtro por status */}
      <FilterStatus
        statusFiltro={statusFiltro}
        setStatusFiltro={setStatusFiltro}
      />

      {/* Renderização condicional e mapeamento */}
      {loading ? (
        <p>A carregar...</p>
      ) : exerciciosExibidos.length === 0 ? (
        <p>Nenhum item registado com este critério.</p>
      ) : (
        <div>
          {exerciciosExibidos.map((ex) => (
            <ExercicioCard
              key={ex.id}
              exercicio={ex}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}