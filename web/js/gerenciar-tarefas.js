const API_URL = 'http://localhost:3810/tarefas';

async function carregarTarefas() {
  const response = await fetch(API_URL);
  const tarefas = await response.json();

  document.getElementById('tarefas-a-fazer').innerHTML = '';
  document.getElementById('tarefas-fazendo').innerHTML = '';
  document.getElementById('tarefas-pronto').innerHTML = '';

  tarefas.forEach(tarefa => {
    const card = document.createElement('div');
    card.className = 'tarefa';

    card.innerHTML = `
      <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
      <p><strong>Setor:</strong> ${tarefa.setor}</p>
      <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
      <p><strong>Usuário:</strong> ${tarefa.usuario?.nome || 'Desconhecido'}</p>

      <label>Status:</label>
      <select>
        <option value="A_FAZER" ${tarefa.status === 'A_FAZER' ? 'selected' : ''}>A Fazer</option>
        <option value="FAZENDO" ${tarefa.status === 'FAZENDO' ? 'selected' : ''}>Fazendo</option>
        <option value="PRONTO" ${tarefa.status === 'PRONTO' ? 'selected' : ''}>Pronto</option>
      </select>

      <div class="botoes">
        <button onclick="editarTarefa(${tarefa.id})">Editar</button>
        <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
        <button onclick="atualizarStatus(${tarefa.id}, this)">💾 Salvar Alterações</button>
      </div>
    `;

    const colunaId = tarefa.status === 'A_FAZER' ? 'tarefas-a-fazer'
                    : tarefa.status === 'FAZENDO' ? 'tarefas-fazendo'
                    : 'tarefas-pronto';

    document.getElementById(colunaId).appendChild(card);
  });
}

function editarTarefa(id) {
  window.location.href = `cadastro-tarefa.html?id=${id}`;
}

async function excluirTarefa(id) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregarTarefas();
}

async function atualizarStatus(id, botao) {
  const card = botao.closest('.tarefa');
  const novoStatus = card.querySelector('select').value;

  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: novoStatus })
  });

  carregarTarefas();
}

carregarTarefas();