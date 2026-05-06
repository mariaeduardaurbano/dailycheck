const key = "704f05b6f5e2098c56453b0496117247";

function colocarDadosNaTela(dados) {
  document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
  document.querySelector(".temp").innerHTML =
    Math.floor(dados.main.temp) + "°C";
  document.querySelector(".texto-previsao").innerHTML =
    dados.weather[0].description;
  document.querySelector(".umidade").innerHTML =
    "Umidade: " + dados.main.humidity + "%";
  // document.querySelector(".img-previsao").src =
  //   "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

function criarCard(dados) {
  const container = document.querySelector(".container-cards");

  const card = document.createElement("div");
  card.classList.add("card-historico");

  card.innerHTML = `
        <h3>${dados.name}</h3>
        <p>${Math.floor(dados.main.temp)}°C</p>

        <div class="caixa-menor">
            <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png">
            <p>${dados.weather[0].description}</p>
        </div>

        <p>Umidade: ${dados.main.humidity}%</p>
    `;

  container.appendChild(card);
}

async function buscarCidade(cidade) {
  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`,
    );

    const dados = await resposta.json();

    if (dados.cod === "404") {
      alert("Cidade não encontrada.");
      return;
    }

    colocarDadosNaTela(dados);
    criarCard(dados);
  } catch (erro) {
    alert("Erro ao buscar dados."+ erro);
  }
}

function cliqueiNoBotao() {
  const cidade = document.querySelector(".input-cidade").value;
  buscarCidade(cidade);
}