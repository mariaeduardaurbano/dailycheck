const url = "http://localhost:3000/tarefas";

const tarefas = [];
let tarefaAtual = null;

init();

async function init() {
  await carregarTarefas();
  await renderizarTarefas();
}

async function carregarTarefas() {
  try {
    const response = await fetch(url + "/listar");

    const data = await response.json();

    tarefas.length = 0;
    tarefas.push(...data);
  } catch (e) {
    console.error(e);
    alert("Erro ao carregar tarefas" + e);
  }
}

async function carregarTarefasHome() {
  const container = document.getElementById("cards-home");

  const dados = await fetch("http://localhost:3000/tarefas/listar").then(
    (res) => res.json(),
  );

  container.innerHTML = "";

  dados.slice(0, 4).forEach((tarefa) => {
    container.innerHTML += `
      <div class="card">
        <img src="${tarefa.imagem}">
        <h4>${tarefa.nome}</h4>
        <p>${tarefa.descricao}</p>
      </div>
    `;
  });
}

function renderizarTarefas() {
  const main = document.getElementById("lista-tarefas");

  main.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${tarefa.imagem}" alt="${tarefa.nome}" />
      <h3>${tarefa.nome}</h3>
      <p><strong>Início:</strong> ${tarefa.dataComeco}</p>
      <p><strong>Fim:</strong> ${tarefa.dataTermino}</p>
      <p>${tarefa.descricao}</p>

      <button onclick="abrirEditar(${tarefa.id}, '${tarefa.nome}', '${tarefa.dataInicio}', '${tarefa.dataFim}', '${tarefa.img}', '${tarefa.descricao}')">
        Atualizar
      </button>

      <button onclick="deletarTarefa(${tarefa.id})">Excluir</button>
    `;

    main.appendChild(card);
  });
}

function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  limparCampos();
  tarefaAtual = null;
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("dataInicio").value = "";
  document.getElementById("dataFim").value = "";
  document.getElementById("img").value = "";
  document.getElementById("descricao").value = "";
}

function abrirEditar(id, nome, dataInicio, dataFim, img, descricao) {
  tarefaAtual = id;

  document.getElementById("nome").value = nome;
  document.getElementById("dataInicio").value = dataInicio;
  document.getElementById("dataFim").value = dataFim;
  document.getElementById("img").value = img;
  document.getElementById("descricao").value = descricao;

  abrirModal();
}
async function salvarTarefa() {
  const novaTarefa = {
    nome: document.getElementById("nome").value,
    dataComeco: document.getElementById("dataInicio").value,
    dataTermino: document.getElementById("dataFim").value,
    imagem: document.getElementById("img").value,
    descricao: document.getElementById("descricao").value,
  };

  if (
    !novaTarefa.nome ||
    !novaTarefa.dataComeco ||
    !novaTarefa.dataTermino ||
    !novaTarefa.descricao
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    let response;

    if (tarefaAtual) {
      response = await fetch(url + "/atualizar/" + tarefaAtual, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTarefa),
      });
    } else {
      response = await fetch(url + "/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTarefa),
      });
    }

    if (!response.ok) {
      throw new Error("Erro ao salvar tarefa.");
    }

    fecharModal();
    carregarTarefas();
  } catch (e) {
    console.error(e);
    alert("Erro ao salvar tarefa.");
  }
}

async function deletarTarefa(id) {
  const confirmacao = confirm("Tem certeza que deseja deletar esta tarefa?");

  if (!confirmacao) return;

  try {
    const response = await fetch(url + "/excluir/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar tarefa.");
    }

    carregarTarefas();
  } catch (e) {
    console.error(e);
    alert("Erro ao deletar tarefa.");
  }
}
