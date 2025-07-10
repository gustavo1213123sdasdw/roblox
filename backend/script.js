const animais = [
  { id: 'a1', nome: 'Mimi', raca: 'Siamês' },
  { id: 'a2', nome: 'Bob', raca: 'Persa' }
];


const usuarios = [
  { id: 'u1', nome: 'José', animal: animais[1] }, // Bob
  { id: 'u2', nome: 'Ana', animal: animais[0] }   // Mimi
];

const doutores = [
  { id: 'd1', nome: 'Robson' },
  { id: 'd2', nome: 'Carla' }
];

function getAllAnimais() {
  return animais;
}

function postAnimal(nome, raca) {
  const novo = {
    id: 'a' + (animais.length + 1),
    nome,
    raca
  };
  animais.push(novo);
  return novo;
}

function mostrarAnimais() {
  const lista = document.getElementById('listaAnimais');
  const todos = getAllAnimais();
  lista.innerHTML = '';
  todos.forEach(animal => {
    const li = document.createElement('li');
    li.textContent = `${animal.nome} (${animal.raca})`;
    lista.appendChild(li);
  });
}

document.getElementById('btnListar').addEventListener('click', mostrarAnimais);

document.getElementById('btnCadastrar').addEventListener('click', () => {
  const nome = document.getElementById('nomeAnimal').value.trim();
  const raca = document.getElementById('racaAnimal').value.trim();

  if (!nome || !raca) {
    alert('Preencha nome e raça!');
    return;
  }

  const novo = postAnimal(nome, raca);
  alert(`Animal cadastrado com ID: ${novo.id}`);

  document.getElementById('nomeAnimal').value = '';
  document.getElementById('racaAnimal').value = '';
  mostrarAnimais();
  preencherSelectAnimais(); 
});

mostrarAnimais();

function getUsuario(id) {
  return usuarios.find(u => u.id === id);
}

function getDoutor(id) {
  return doutores.find(d => d.id === id);
}

function montarFrase(usuarioId, doutorId) {
  const usuario = getUsuario(usuarioId);
  const doutor = getDoutor(doutorId);

  if (!usuario) return 'Usuário não encontrado.';
  if (!doutor) return 'Doutor não encontrado.';
  if (!usuario.animal) return `${usuario.nome} não tem um animal cadastrado.`;

  return `O usuário ${usuario.nome} trouxe seu gato ${usuario.animal.nome} da raça ${usuario.animal.raca} que será atendido pelo veterinário ${doutor.nome}.`;
}


function preencherSelectUsuarios() {
  const select = document.getElementById('selectUsuario');
  select.innerHTML = '';
  usuarios.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = u.nome;
    select.appendChild(option);
  });
}

function preencherSelectDoutores() {
  const select = document.getElementById('selectDoutor');
  select.innerHTML = '';
  doutores.forEach(d => {
    const option = document.createElement('option');
    option.value = d.id;
    option.textContent = d.nome;
    select.appendChild(option);
  });
}

preencherSelectUsuarios();
preencherSelectDoutores();

document.getElementById('btnMostrarFrase').addEventListener('click', () => {
  const usuarioId = document.getElementById('selectUsuario').value;
  const doutorId = document.getElementById('selectDoutor').value;
  const frase = montarFrase(usuarioId, doutorId);
  document.getElementById('fraseResultado').textContent = frase;
});
