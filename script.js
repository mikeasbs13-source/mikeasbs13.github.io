// Atualiza ano
document.getElementById("year").textContent = new Date().getFullYear();

// Fundo animado (partículas)
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
let w, h, parts;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  w = c.width = innerWidth * DPR;
  h = c.height = innerHeight * DPR;
  c.style.width = innerWidth + "px";
  c.style.height = innerHeight + "px";
  spawn();
}

function spawn() {
  const count = Math.round((innerWidth * innerHeight) / 22000);
  parts = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3 * DPR,
    vy: (Math.random() - 0.5) * 0.3 * DPR,
    r: (Math.random() * 1.2 + 0.3) * DPR,
  }));
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (const p of parts) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(167,139,250,0.7)";
    ctx.fill();
  }
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const a = parts[i], b = parts[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120 * DPR) {
        ctx.strokeStyle = `rgba(167,139,250, ${(1 - dist / (120 * DPR)) * 0.15})`;
        ctx.lineWidth = 0.6 * DPR;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
animate();

// Status Discord fake
const dot = document.getElementById("disc-dot");
const text = document.getElementById("disc-text");

if (dot && text) {
  setInterval(() => {
    const online = Math.random() > 0.3;
    dot.style.background = online ? "#22c55e" : "#f59e0b";
    dot.style.boxShadow = online
      ? "0 0 10px rgba(34,197,94,.7)"
      : "0 0 10px rgba(245,158,11,.7)";
    text.textContent = online ? "Online" : "Ocupado";
  }, 10000);
}

// transicao
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = document.querySelector("main, .hero, .content"); // seleciona a parte principal

  if (page) {
    page.classList.add("page-transition");
    setTimeout(() => page.classList.add("show"), 50);
  }

  // intercepta links HTML internos
  document.querySelectorAll("a[href$='.html']").forEach(link => {
    link.addEventListener("click", e => {
      const url = link.getAttribute("href");
      if (url && !url.startsWith("http")) {
        e.preventDefault();
        if (page) page.classList.remove("show");
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      }
    });
  });
});


// ====== Typing Effect no TÍTULO da aba ======
const frasesTitle = ['mwave', 'rei delas', 'comedor de coroa'];
let iTitle = 0;
let jTitle = 0;
let apagandoTitle = false;

function animarTitulo() {
  const frase = frasesTitle[iTitle % frasesTitle.length];
  if (!apagandoTitle) {
    // escrever
    document.title = frase.substring(0, jTitle + 1);
    jTitle++;
    if (jTitle === frase.length) {
      apagandoTitle = true;
      return setTimeout(animarTitulo, 1500); // pausa ao terminar
    }
    setTimeout(animarTitulo, 180); // velocidade de digitação
  } else {
    // apagar
    document.title = frase.substring(0, jTitle - 1);
    jTitle--;
    if (jTitle === 0) {
      apagandoTitle = false;
      iTitle++;
      return setTimeout(animarTitulo, 70); // pausa antes de recomeçar
    }
    setTimeout(animarTitulo, 130); // velocidade de apagar
  }
}

// iniciar ao carregar a página
window.addEventListener("load", animarTitulo);

// ====== Intro screen ======
const intro = document.getElementById('intro');

intro.addEventListener('click', () => {
  // adicionar animação de fade-out
  intro.classList.add('hide');

  // tocar som "woosh suave"
  const audio = new Audio('assets/sound.mp3');
  audio.volume = 0.4;
  audio.play().catch(() => console.warn("Som bloqueado até interação do utilizador."));

  // adicionar fade-in ao body
  document.body.classList.add('loaded');

  // remover o intro após a animação
  setTimeout(() => intro.remove(), 1500);
});