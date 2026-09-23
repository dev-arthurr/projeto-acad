export default function ExercicioCard({ exercicio, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirmou = window.confirm(`Deseja realmente excluir "${exercicio.nome}"?`);
    if (!confirmou) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exercicios/${exercicio.id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDeleteSuccess(exercicio.id);
      }
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
      <h4>{exercicio.nome}</h4>
      <p>Grupo: {exercicio.grupo_muscular || 'N/A'}</p>
      <p>Repetições: {exercicio.repeticoes}</p>
      <p>Status: {exercicio.concluido ? ' Concluído' : '⏳ Pendente'}</p>
      <button onClick={handleDelete} style={{ color: 'red' }}>Excluir</button>
    </div>
  );
}