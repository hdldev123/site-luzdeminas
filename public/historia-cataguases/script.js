const timelineEvents = [
  { year: "1888", label: "Chácara Dona Catarina", title: "Antes do moderno", text: "A Chácara Dona Catarina registra a camada oitocentista ligada ao ciclo do café e aos chalés românticos." },
  { year: "1905", label: "Fundação da companhia", title: "Nasce a Companhia", text: "A Companhia Força e Luz Cataguazes-Leopoldina é constituída por José Monteiro Ribeiro Junqueira, João Duarte Ferreira e Norberto Custódio Ferreira." },
  { year: "1907", label: "Bolsa do Rio", title: "Capital para crescer", text: "A companhia abre capital e se torna a terceira sociedade anônima registrada na Bolsa de Valores do Rio de Janeiro." },
  { year: "1908", label: "A cidade se ilumina", title: "Ave, luz!", text: "Em 3 de julho ocorre a primeira experiência elétrica. A instalação definitiva chega no dia 14 e a rede alcança outras três cidades no mesmo mês." },
  { year: "1912", label: "Usina ampliada", title: "Mais potência", text: "A capacidade da Usina Maurício é ampliada de 800 kW para 1,2 MW, sustentando o avanço regional da rede." },
  { year: "1910–18", label: "Expansão regional", title: "A rede se amplia", text: "A companhia incorpora os serviços elétricos de Muriaé em 1910 e a Companhia Pombense de Eletricidade em 1918." },
  { year: "1927", label: "Revista Verde", title: "A palavra de vanguarda", text: "Jovens de Cataguases lançam a Revista Verde e conectam a produção cultural do interior aos modernistas brasileiros." },
  { year: "1934", label: "Código de Águas", title: "Um novo marco regulatório", text: "O Código de Águas reforça o papel da União nas concessões hidrelétricas e altera o ambiente institucional das companhias regionais." },
  { year: "1941", label: "Casa de Niemeyer", title: "O moderno ganha forma", text: "A Residência Francisco Inácio Peixoto reúne projeto de Oscar Niemeyer, jardins de Burle Marx e mobiliário de Joaquim Tenreiro." },
  { year: "1945–49", label: "Colégio Cataguases", title: "Uma síntese das artes", text: "Arquitetura, paisagismo, painel, escultura e mobiliário se encontram no Colégio Cataguases, com o painel Tiradentes de Portinari." },
  { year: "1953", label: "Cine-Teatro Edgard", title: "A cidade em cena", text: "É inaugurado o Cine-Teatro Edgard, projeto modernista de Aldary Toledo e Carlos Leão." },
  { year: "1956–70", label: "Nova Usina Maurício", title: "Energia em transformação", text: "A Usina Maurício passa por nova etapa, com expansão de turbinas e mudança da frequência da rede para 60 Hz." },
  { year: "1994", label: "Tombamento federal", title: "Lugar da modernidade", text: "O IPHAN protege um perímetro urbano e 16 bens de destaque, reconhecendo a excepcional totalidade cultural da cidade." },
  { year: "2026", label: "Moderna e Eterna", title: "Patrimônio em movimento", text: "A rota turística municipal integra educação, turismo e valorização do patrimônio cultural de Cataguases." }
];

const networkStops = [
  { id: "mauricio", index: "00 · Fonte da energia", title: "Usina Maurício", text: "Das águas para a região: aqui começa a corrente que conectou cidades da Zona da Mata em uma mesma rede.", metricLabel: "Potência inicial", metric: "800 kW" },
  { id: "cataguases", index: "01 · Primeiro acendimento", title: "Cataguases", text: "Em 3 de julho, a primeira experiência elétrica acendeu a cidade e inaugurou uma transformação que logo ultrapassaria seus limites.", metricLabel: "Chegada da luz", metric: "03 JUL" },
  { id: "sao-joao", index: "02 · Expansão regional", title: "São João Nepomuceno", text: "Quatro dias depois, a corrente alcançou São João Nepomuceno e tornou visível a vocação intermunicipal da nova rede.", metricLabel: "Chegada da luz", metric: "07 JUL" },
  { id: "leopoldina", index: "03 · Rede conectada", title: "Leopoldina", text: "Leopoldina passou a integrar o sistema em 16 de julho, consolidando a conexão elétrica entre cidades vizinhas.", metricLabel: "Chegada da luz", metric: "16 JUL" },
  { id: "rio-novo", index: "04 · Circuito ampliado", title: "Rio Novo", text: "Em 23 de julho, Rio Novo completou a expansão daquele mês: quatro cidades ligadas pela energia produzida no interior.", metricLabel: "Chegada da luz", metric: "23 JUL" }
];

const places = {
  colegio: { year: "1945—1949", title: "Colégio Cataguases", description: "Uma obra-síntese do modernismo brasileiro: arquitetura escolar de Oscar Niemeyer, paisagismo de Roberto Burle Marx, painel abstrato de Paulo Werneck, escultura de Jan Zach e o painel Tiradentes, de Portinari.", facts: { "Arquitetura": "Oscar Niemeyer", "Paisagismo": "Roberto Burle Marx", "Uso atual": "Escola Estadual Manoel Ignácio Peixoto", "Proteção": "Tombamento federal; restauro selecionado no PAC" } },
  residencia: { year: "1941", title: "Residência Francisco Inácio Peixoto", description: "O impulso inicial da arquitetura moderna local. A casa combina traços modernos e referências tradicionais brasileiras, integrada aos jardins de Burle Marx, esculturas e mobiliário de Joaquim Tenreiro.", facts: { "Arquitetura": "Oscar Niemeyer", "Paisagismo": "Roberto Burle Marx", "Uso atual": "Residência particular", "Proteção": "Tombamento federal" } },
  hotel: { year: "Meados do século XX", title: "Hotel Cataguases", description: "Parte do conjunto urbano que transformou programas cotidianos em manifestações modernas. Seus ambientes também receberam mobiliário de Joaquim Tenreiro e jardins com escultura de Jan Zach.", facts: { "Arquitetura": "Aldary Henriques Toledo e Gilberto Lemos", "Estilo": "Modernismo", "Uso atual": "Hotel", "Proteção": "Tombamento federal" } },
  santuario: { year: "1944—1968", title: "Santuário de Santa Rita de Cássia", description: "Um marco do modernismo religioso local, reconhecível por suas linhas verticais e pela integração de arte e arquitetura, incluindo obras de Djanira.", facts: { "Arquitetura": "Edgar Guimarães do Vale", "Estilo": "Modernismo religioso", "Uso atual": "Santuário diocesano", "Proteção": "Inserido no acervo urbano protegido" } },
  cine: { year: "Projeto de 1946 · Inauguração em 1953", title: "Cine-Teatro Edgard", description: "Cinema, sociabilidade e arquitetura se encontram em um dos principais equipamentos culturais modernos da cidade. O bem está em processo de requalificação cultural.", facts: { "Arquitetura": "Aldary Toledo e Carlos Leão", "Estilo": "Modernismo", "Uso atual": "Em requalificação", "Preservação": "Consulta pública de restauração em 2026" } },
  chacara: { year: "1888", title: "Chácara Dona Catarina", description: "O chalé romântico preserva a memória do ciclo do café e lembra que a história arquitetônica local não começou com o modernismo. Sua presença evidencia o diálogo entre diferentes tempos da cidade.", facts: { "Autoria": "Não identificada nas fontes", "Estilo": "Chalé romântico oitocentista", "Uso atual": "Museu e espaço cultural", "Camada histórica": "Ciclo do café" } }
};

const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const progress = document.querySelector(".reading-progress span");
const menuButton = document.querySelector(".menu-toggle");
const themeButton = document.querySelector(".theme-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeButton.setAttribute("aria-label", dark ? "Ativar tema claro" : "Ativar tema escuro");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#171814" : "#f2eddf";
}

const storedTheme = localStorage.getItem("cataguases-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(storedTheme || preferredTheme);

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("cataguases-theme", nextTheme);
});

function setMenu(open, returnFocus = true) {
  body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  if (open) {
    window.setTimeout(() => {
      if (body.classList.contains("menu-open")) navLinks[0].focus();
    }, 420);
  } else if (returnFocus) {
    menuButton.focus();
  }
}

menuButton.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));

navLinks.forEach(link => link.addEventListener("click", () => {
  setMenu(false, false);
}));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    setMenu(false);
  }
});

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  header.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

document.querySelectorAll("#luz, #industria, #cultura, #patrimonio, #presente").forEach(section => sectionObserver.observe(section));

const nightScene = document.querySelector("[data-night-scene]");
const lightSwitch = nightScene.querySelector(".switch");
const sceneStatus = nightScene.querySelector(".scene-status");
const routeState = nightScene.querySelector(".route-state");
const routeGuide = document.querySelector("[data-route-guide]");
lightSwitch.addEventListener("click", () => {
  const lit = nightScene.classList.toggle("is-lit");
  lightSwitch.setAttribute("aria-pressed", String(lit));
  lightSwitch.querySelector("strong").textContent = lit ? "Apagar Cataguases" : "Acender Cataguases";
  routeState.textContent = lit ? "Rota acesa · Descubra abaixo ↓" : "Acenda a cidade para ativar a rota";
  routeGuide.classList.toggle("is-active", lit);
  routeGuide.setAttribute("aria-hidden", String(!lit));
  routeGuide.inert = !lit;
  sceneStatus.textContent = lit
    ? "Cataguases está acesa. A Rota Luz de Minas foi revelada com Cataguases, Leopoldina e seu distrito Piacatuba, e Itamarati de Minas."
    : "A cidade volta à noite anterior à eletricidade e a rota é apagada.";
});

const networkMap = document.querySelector("[data-network-map]");
const networkNodes = [...networkMap.querySelectorAll("[data-network-stop]")];
const networkDetailIndex = networkMap.querySelector(".network-detail-index");
const networkDetailTitle = networkMap.querySelector(".network-detail h4");
const networkDetailText = networkMap.querySelector(".network-detail p");
const networkMetricLabel = networkMap.querySelector(".network-detail-metric span");
const networkMetric = networkMap.querySelector(".network-detail-metric strong");
const networkCounter = networkMap.querySelector(".network-controls b");
let activeNetworkIndex = 0;

function selectNetworkStop(index, focus = false) {
  activeNetworkIndex = (index + networkStops.length) % networkStops.length;
  const stop = networkStops[activeNetworkIndex];
  networkMap.dataset.active = stop.id;
  networkNodes.forEach((node, nodeIndex) => node.setAttribute("aria-pressed", String(nodeIndex === activeNetworkIndex)));
  networkDetailIndex.textContent = stop.index;
  networkDetailTitle.textContent = stop.title;
  networkDetailText.textContent = stop.text;
  networkMetricLabel.textContent = stop.metricLabel;
  networkMetric.textContent = stop.metric;
  networkCounter.textContent = activeNetworkIndex + 1;
  if (focus) networkNodes[activeNetworkIndex].focus();
}

networkNodes.forEach((node, index) => {
  node.addEventListener("click", () => selectNetworkStop(index));
  node.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const previous = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? networkStops.length - 1 : index + (previous ? -1 : 1);
    selectNetworkStop(nextIndex, true);
  });
});

networkMap.querySelector(".network-prev").addEventListener("click", () => selectNetworkStop(activeNetworkIndex - 1));
networkMap.querySelector(".network-next").addEventListener("click", () => selectNetworkStop(activeNetworkIndex + 1));

const timeline = document.querySelector(".timeline");
const timelineTrack = document.querySelector(".timeline-track");
const detailYear = document.querySelector(".timeline-detail-year");
const detailTitle = document.querySelector(".timeline-detail h4");
const detailText = document.querySelector(".timeline-detail p");
let activeTimelineIndex = 1;

timelineEvents.forEach((event, index) => {
  const item = document.createElement("li");
  item.className = `timeline-item${index === activeTimelineIndex ? " active" : ""}`;
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = `<strong>${event.year}</strong><span>${event.label}</span>`;
  button.addEventListener("click", () => selectTimelineEvent(index));
  item.append(button);
  timelineTrack.append(item);
});

function selectTimelineEvent(index) {
  activeTimelineIndex = (index + timelineEvents.length) % timelineEvents.length;
  const event = timelineEvents[activeTimelineIndex];
  const items = [...timelineTrack.children];
  items.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === activeTimelineIndex));
  detailYear.textContent = event.year;
  detailTitle.textContent = event.title;
  detailText.textContent = event.text;
  items[activeTimelineIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

document.querySelector(".timeline-prev").addEventListener("click", () => selectTimelineEvent(activeTimelineIndex - 1));
document.querySelector(".timeline-next").addEventListener("click", () => selectTimelineEvent(activeTimelineIndex + 1));
timeline.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    selectTimelineEvent(activeTimelineIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(index));
  tab.addEventListener("keydown", event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : index + (event.key === "ArrowRight" ? 1 : -1);
    activateTab((next + tabs.length) % tabs.length, true);
  });
});

function activateTab(index, focus = false) {
  tabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
  });
  if (focus) tabs[index].focus();
}

const dialog = document.querySelector(".place-dialog");
const dialogClose = dialog.querySelector(".dialog-close");
let placeTrigger = null;

document.querySelectorAll(".place-open").forEach(button => button.addEventListener("click", () => {
  placeTrigger = button;
  const place = places[button.closest("[data-place]").dataset.place];
  document.getElementById("dialog-year").textContent = place.year;
  document.getElementById("dialog-title").textContent = place.title;
  document.getElementById("dialog-description").textContent = place.description;
  document.getElementById("dialog-facts").innerHTML = Object.entries(place.facts).map(([term, value]) => `<dt>${term}</dt><dd>${value}</dd>`).join("");
  dialog.showModal();
  body.classList.add("dialog-open");
}));

function closeDialog() {
  dialog.close();
  body.classList.remove("dialog-open");
  placeTrigger?.focus();
}

dialogClose.addEventListener("click", closeDialog);
dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) closeDialog();
});
dialog.addEventListener("cancel", () => body.classList.remove("dialog-open"));

const chart = document.querySelector(".visitation");
const chartObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    chart.classList.add("is-visible");
    chartObserver.disconnect();
  }
}, { threshold: 0.35 });
chartObserver.observe(chart);

const marquee = document.querySelector(".names-marquee div");
marquee.innerHTML += marquee.innerHTML;
