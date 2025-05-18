  
    function showTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
    }
  

  
  const dicas = [
    "Mantenha uma alimentação equilibrada e comece o pré-natal com seu médico.",
    "Evite bebidas alcoólicas e fumo. Continue tomando ácido fólico.",
    "Faça exercícios leves e mantenha-se hidratada.",
    "Observe os primeiros sintomas da gravidez. Converse com seu médico.",
    "Agende exames laboratoriais e ultrassonografias.",
    "Acompanhe o crescimento do bebê e cuide da sua saúde emocional.",
    "Evite esforços físicos intensos e descanse bastante.",
    "O útero começa a crescer. Use roupas confortáveis.",
    "Mantenha uma rotina de sono regular.",
    "O bebê já tem dedos! Continue com a alimentação saudável.",
    "Exames de translucência nucal podem ser feitos essa semana.",
    "Você pode sentir mais fome. Coma em pequenas porções.",
    "Procure orientação sobre parto e maternidade.",
    "O corpo começa a mudar visivelmente. Faça caminhadas leves.",
    "Comece a preparar o enxoval aos poucos.",
    "Converse e cante para o bebê. Ele começa a ouvir sons.",
    "Evite estresse e fortaleça vínculos com quem te apoia.",
    "Inclua alimentos ricos em ferro e cálcio.",
    "Você pode sentir o bebê mexer. Que emoção!",
    "Hora de conhecer a posição do bebê no útero.",
    "A barriga está mais saliente. Mantenha boa postura.",
    "Considere fazer curso de gestante.",
    "Evite viagens longas e descanse com as pernas elevadas.",
    "O bebê começa a acumular gordura corporal.",
    "Agende exames do terceiro trimestre.",
    "Evite comidas pesadas à noite para dormir melhor.",
    "O bebê começa a abrir os olhos.",
    "Converse sobre o plano de parto com seu obstetra.",
    "Atenção a contrações falsas (Braxton Hicks).",
    "Prepare sua mala da maternidade.",
    "O bebê se encaixa na pelve para o parto.",
    "Você pode sentir cansaço mais intenso.",
    "O bebê está ganhando peso rapidamente.",
    "Mantenha-se calma. Está quase lá!",
    "Verifique a rota e plano de chegada à maternidade.",
    "Evite esforço físico e prepare-se mentalmente.",
    "Revise os documentos e exames finais.",
    "Você pode perder o tampão mucoso. É normal.",
    "Faça respiração consciente e fique atenta às contrações reais.",
    "Parabéns! Prepare-se para o nascimento do seu bebê ❤️"
  ];

  // Recupera semana atual do localStorage ou começa em 1
let semanaAtual = parseInt(localStorage.getItem("semanaAtual")) || 1;

function atualizarLinhaDoTempo() {
  document.getElementById("semanaAtual").textContent = semanaAtual;
  document.getElementById("dicaSemana").innerHTML =
    `<p><strong>Dica da Semana ${semanaAtual}:</strong> ${dicas[semanaAtual - 1]}</p>`;

  // Carregar histórico salvo no localStorage
  const historico = JSON.parse(localStorage.getItem("historicoSemanas")) || [];
  const container = document.getElementById("historicoSemanas");
  container.innerHTML = "";

  historico.forEach(semana => {
    const card = document.createElement("div");
    card.className = "card-semana";
    card.innerHTML = `<strong>Semana ${semana.numero}:</strong> ${semana.dica}`;
    container.appendChild(card);
  });
}

function avancarSemana() {
  if (semanaAtual < 40) {
    // Salva dica anterior no histórico localStorage
    let historico = JSON.parse(localStorage.getItem("historicoSemanas")) || [];
    historico.unshift({ numero: semanaAtual, dica: dicas[semanaAtual - 1] });
    localStorage.setItem("historicoSemanas", JSON.stringify(historico));

    semanaAtual++;
    localStorage.setItem("semanaAtual", semanaAtual);

    atualizarLinhaDoTempo();
  } else {
    alert("Você chegou à 40ª semana! 💖");
  }
}

// Inicializa na carga da página
atualizarLinhaDoTempo();





// Função para formatar a data
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// CONSULTAS
const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
const formConsulta = document.getElementById("formConsulta");
const listaConsultas = document.getElementById("listaConsultas");

formConsulta.addEventListener("submit", e => {
  e.preventDefault();
  const novaConsulta = {
    data: document.getElementById("dataConsulta").value,
    obs: document.getElementById("obsConsulta").value
  };
  consultas.push(novaConsulta);
  localStorage.setItem("consultas", JSON.stringify(consultas));
  formConsulta.reset();
  renderConsultas();
});

function renderConsultas() {
  listaConsultas.innerHTML = "";
  consultas.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${formatarData(c.data)}</strong>: ${c.obs} 
      <button onclick="removerConsulta(${i})">🗑️</button>`;
    listaConsultas.appendChild(li);
  });
}

function removerConsulta(index) {
  consultas.splice(index, 1);
  localStorage.setItem("consultas", JSON.stringify(consultas));
  renderConsultas();
}

renderConsultas();

// VACINAS
const vacinas = JSON.parse(localStorage.getItem("vacinas")) || [];
const formVacina = document.getElementById("formVacina");
const listaVacinas = document.getElementById("listaVacinas");

formVacina.addEventListener("submit", e => {
  e.preventDefault();
  const novaVacina = {
    data: document.getElementById("dataVacina").value,
    nome: document.getElementById("nomeVacina").value
  };
  vacinas.push(novaVacina);
  localStorage.setItem("vacinas", JSON.stringify(vacinas));
  formVacina.reset();
  renderVacinas();
});

function renderVacinas() {
  listaVacinas.innerHTML = "";
  vacinas.forEach((v, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${formatarData(v.data)}</strong>: ${v.nome} 
      <button onclick="removerVacina(${i})">🗑️</button>`;
    listaVacinas.appendChild(li);
  });
}

function removerVacina(index) {
  vacinas.splice(index, 1);
  localStorage.setItem("vacinas", JSON.stringify(vacinas));
  renderVacinas();
}

renderVacinas();

// CRESCIMENTO
const crescimento = JSON.parse(localStorage.getItem("crescimento")) || [];
const formCrescimento = document.getElementById("formCrescimento");
const listaCrescimento = document.getElementById("listaCrescimento");

formCrescimento.addEventListener("submit", e => {
  e.preventDefault();
  const novaMedida = {
    data: document.getElementById("dataCrescimento").value,
    peso: parseFloat(document.getElementById("peso").value),
    altura: parseFloat(document.getElementById("altura").value)
  };
  crescimento.push(novaMedida);
  localStorage.setItem("crescimento", JSON.stringify(crescimento));
  formCrescimento.reset();
  renderCrescimento();
});

function renderCrescimento() {
  listaCrescimento.innerHTML = "";
  crescimento.forEach((c, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${formatarData(c.data)}</strong>: ${c.peso} kg, ${c.altura} cm 
      <button onclick="removerCrescimento(${i})">🗑️</button>`;
    listaCrescimento.appendChild(li);
  });
}

function removerCrescimento(index) {
  crescimento.splice(index, 1);
  localStorage.setItem("crescimento", JSON.stringify(crescimento));
  renderCrescimento();
}

renderCrescimento();



  const agenda = JSON.parse(localStorage.getItem("agenda")) || [];
  const formAgenda = document.getElementById("formAgenda");
  const listaAgenda = document.getElementById("listaAgenda");

  formAgenda.addEventListener("submit", e => {
    e.preventDefault();

    const data = document.getElementById("dataAgenda").value;
    const tipo = document.getElementById("tipoConsulta").value;

    agenda.push({ data, tipo });
    localStorage.setItem("agenda", JSON.stringify(agenda));
    formAgenda.reset();
    renderAgenda();
  });

  function renderAgenda() {
    listaAgenda.innerHTML = agenda
      .sort((a, b) => new Date(a.data) - new Date(b.data)) // ordena por data
      .map((item, i) => `
        <li>
          <span>${formatarData(item.data)} — ${item.tipo}</span>
          <button onclick="removerAgenda(${i})">🗑️</button>
        </li>
      `)
      .join("");
  }

  function removerAgenda(index) {
    agenda.splice(index, 1);
    localStorage.setItem("agenda", JSON.stringify(agenda));
    renderAgenda();
  }

  function formatarData(dataStr) {
    const [year, month, day] = dataStr.split("-");
    return `${day}/${month}/${year}`;
  }

  renderAgenda();



  // Alimentação
  const alimentacao = JSON.parse(localStorage.getItem("alimentacao")) || [];
  const formAlimentacao = document.getElementById("formAlimentacao");
  const listaAlimentacao = document.getElementById("listaAlimentacao");

  formAlimentacao.addEventListener("submit", e => {
    e.preventDefault();
    alimentacao.push({
      hora: document.getElementById("horaAlimentacao").value,
      tipo: document.getElementById("tipoAlimento").value
    });
    localStorage.setItem("alimentacao", JSON.stringify(alimentacao));
    formAlimentacao.reset();
    renderAlimentacao();
  });

  function renderAlimentacao() {
    listaAlimentacao.innerHTML = alimentacao.map((a, i) =>
      `<li><strong>${formatarDataHora(a.hora)}</strong>: ${a.tipo}
        <button onclick="removerAlimentacao(${i})">🗑️</button></li>`
    ).join("");
  }

  function removerAlimentacao(index) {
    alimentacao.splice(index, 1);
    localStorage.setItem("alimentacao", JSON.stringify(alimentacao));
    renderAlimentacao();
  }

  renderAlimentacao();

  // Sono
  const sono = JSON.parse(localStorage.getItem("sono")) || [];
  const formSono = document.getElementById("formSono");
  const listaSono = document.getElementById("listaSono");

  formSono.addEventListener("submit", e => {
    e.preventDefault();
    sono.push({
      hora: document.getElementById("horaSono").value,
      duracao: document.getElementById("duracaoSono").value
    });
    localStorage.setItem("sono", JSON.stringify(sono));
    formSono.reset();
    renderSono();
  });

  function renderSono() {
    listaSono.innerHTML = sono.map((s, i) =>
      `<li><strong>${formatarDataHora(s.hora)}</strong>: ${s.duracao}
        <button onclick="removerSono(${i})">🗑️</button></li>`
    ).join("");
  }

  function removerSono(index) {
    sono.splice(index, 1);
    localStorage.setItem("sono", JSON.stringify(sono));
    renderSono();
  }

  renderSono();

  // Fralda
  const fraldas = JSON.parse(localStorage.getItem("fraldas")) || [];
  const formFralda = document.getElementById("formFralda");
  const listaFralda = document.getElementById("listaFralda");

  formFralda.addEventListener("submit", e => {
    e.preventDefault();
    fraldas.push({
      hora: document.getElementById("horaFralda").value,
      obs: document.getElementById("obsFralda").value
    });
    localStorage.setItem("fraldas", JSON.stringify(fraldas));
    formFralda.reset();
    renderFraldas();
  });

  function renderFraldas() {
    listaFralda.innerHTML = fraldas.map((f, i) =>
      `<li><strong>${formatarDataHora(f.hora)}</strong>: ${f.obs}
        <button onclick="removerFralda(${i})">🗑️</button></li>`
    ).join("");
  }

  function removerFralda(index) {
    fraldas.splice(index, 1);
    localStorage.setItem("fraldas", JSON.stringify(fraldas));
    renderFraldas();
  }

  renderFraldas();

  // Função para formatar a data
  function formatarDataHora(dataIso) {
    const data = new Date(dataIso);
    return data.toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }

