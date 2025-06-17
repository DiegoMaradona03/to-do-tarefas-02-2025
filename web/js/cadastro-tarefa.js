// Atualiza o cadastro-tarefa.js para detectar modo de edição e atualizar a tarefa
const form = document.getElementById('formTarefa');
const mensagem = document.getElementById('mensagem');
const usuarioSelect = document.getElementById('usuario');
const params = new URLSearchParams(window.location.search);
const tarefaId = params.get('id');

// Carrega os usuários para o select
async function carregarUsuarios() {
  try {
    const response = await fetch('http://localhost:3810/usuarios');
    const usuarios = await response.json();

    usuarioSelect.innerHTML = '<option value="">Selecione</option>';

    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = `${usuario.nome} (${usuario.email})`;
      usuarioSelect.appendChild(option);
    });
  } catch (error) {
    usuarioSelect.innerHTML = '<option value="">Erro ao carregar</option>';
  }
}

// Se for edição, carregar os dados da tarefa
async function carregarTarefaParaEdicao(id) {
  try {
    const response = await fetch(`http://localhost:3810/tarefas/${id}`);
    const tarefa = await response.json();

    document.getElementById('descricao').value = tarefa.descricao;
    document.getElementById('setor').value = tarefa.setor;
    document.getElementById('prioridade').value = tarefa.prioridade;
    document.getElementById('usuario').value = tarefa.usuarioId;

    const botao = form.querySelector('button[type="submit"]');
    botao.textContent = 'Salvar Alterações';
  } catch (error) {
    mensagem.textContent = 'Erro ao carregar tarefa para edição.';
    mensagem.style.color = 'red';
  }
}

carregarUsuarios().then(() => {
  if (tarefaId) carregarTarefaParaEdicao(tarefaId);
});

// Envio do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();
  const setor = document.getElementById('setor').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const usuarioId = document.getElementById('usuario').value;

  if (!descricao || !setor || !prioridade || !usuarioId) {
    mensagem.textContent = 'Preencha todos os campos obrigatórios.';
    mensagem.style.color = 'red';
    return;
  }

  const tarefa = {
    descricao,
    setor,
    prioridade,
    usuarioId: Number(usuarioId)
  };

  try {
    const url = tarefaId ? `http://localhost:3810/tarefas/${tarefaId}` : 'http://localhost:3810/tarefas';
    const metodo = tarefaId ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa)
    });

    if (response.ok) {
      mensagem.textContent = tarefaId ? 'Tarefa atualizada com sucesso.' : 'Cadastro concluído com sucesso.';
      mensagem.style.color = 'green';
      form.reset();
      if (tarefaId) window.location.href = 'gerenciar-tarefas.html';
    } else {
      mensagem.textContent = 'Erro ao salvar tarefa.';
      mensagem.style.color = 'red';
    }
  } catch (err) {
    mensagem.textContent = 'Erro ao conectar com o servidor.';
    mensagem.style.color = 'red';
  }
});
