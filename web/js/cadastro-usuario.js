const form = document.getElementById('formUsuario');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email || !email.includes('@')) {
    mensagem.textContent = 'Preencha todos os campos corretamente.';
    mensagem.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://localhost:3810/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    if (response.ok) {
      mensagem.textContent = 'Cadastro concluído com sucesso.';
      mensagem.style.color = 'green';
      form.reset();
    } else {
      const erro = await response.json();
      mensagem.textContent = 'Erro: ' + (erro.message || 'Falha no cadastro.');
      mensagem.style.color = 'red';
    }
  } catch (err) {
    mensagem.textContent = 'Erro ao conectar com o servidor.';
    mensagem.style.color = 'red';
  }
});
