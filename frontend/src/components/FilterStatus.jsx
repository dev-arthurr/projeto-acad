export default function FilterStatus({ statusFiltro, setStatusFiltro }) {
  const botoes = [
    { rotulo: 'Todos', valor: 'todos' },
    { rotulo: 'Concluídos', valor: 'concluidos' },
    { rotulo: 'Pendentes', valor: 'pendentes' },
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      {botoes.map((botao) => (
        <button
          key={botao.valor}
          type="button"
          onClick={() => setStatusFiltro(botao.valor)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: '1px solid #007bff',
            backgroundColor: statusFiltro === botao.valor ? '#007bff' : 'transparent',
            color: statusFiltro === botao.valor ? '#fff' : '#007bff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {botao.rotulo}
        </button>
      ))}
    </div>
  );
}