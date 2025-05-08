document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  await fetch('/compromissos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, descricao, data, hora })
  });

  // Limpa os campos do formulário (opcional)
  document.getElementById('form').reset();

  // Recarrega os compromissos
  carregarCompromissos();
});

async function carregarCompromissos() {
  const res = await fetch('/compromissos');
  const compromissos = await res.json();

  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  compromissos.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${formatarData(c.data)} ${c.hora} - ${c.titulo}`;
    lista.appendChild(li);
  });
}

// Utilitário pra deixar a data bonitinha
function formatarData(dataISO) {
  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

// Carrega compromissos ao abrir
carregarCompromissos();
