const days = [
    {
      title: "Rose Day 🌹",
      date: "2026-02-07",
      msg: "Every rose reminds me of you.",
      roses: true
    },
    {
      title: "Propose Day 💍",
      date: "2026-02-08",
      msg: "I choose you. Always."
    },
    {
      title: "Chocolate Day 🍫",
      date: "2026-02-10",
      msg: "Life feels sweeter with you."
    },
    {
      title: "Teddy Day 🧸",
      date: "2026-02-11",
      msg: "Comfort feels like you."
    },
    {
      title: "Promise Day 🤞",
      date: "2026-02-12",
      msg: "Saath rehne ka vaada."
    },
    {
      title: "Hug Day 🤗",
      date: "2026-02-13",
      msg: "Home is right here."
    },
    {
      title: "Valentine’s Day ❤️",
      date: "2026-02-14",
      final: true
    }
  ];
  
  const cards = document.getElementById("cards");
  const today = new Date().toISOString().split("T")[0];
  
  days.forEach((day, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 0.15}s`;
  
    if (day.date > today) card.classList.add("locked");
  
    card.innerHTML = `
      <h3>${day.title}</h3>
      <p>${day.msg || "एक सरप्राइज़ तुम्हारा इंतज़ार कर रहा है…"}</p>
    `;
  
    card.onclick = () => {
      if (day.final) {
        document.getElementById("valentineModal").style.display = "flex";
      }
    };
  
    cards.appendChild(card);
  
    // 🌹 Rose petals only on Rose Day
    if (day.roses && day.date <= today) createPetals();
  });
  
  // 🌹 ROSE PETALS FUNCTION
  function createPetals() {
    const petals = document.getElementById("petals");
    for (let i = 0; i < 25; i++) {
      const petal = document.createElement("span");
      petal.innerHTML = "🌹";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 8 + Math.random() * 5 + "s";
      petal.style.fontSize = 14 + Math.random() * 16 + "px";
      petals.appendChild(petal);
    }
  }
  
  // 😈 NO BUTTON RUNS AWAY
  const noBtn = document.getElementById("noBtn");
  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
  
//   Yes Button
  document.getElementById("yesBtn").onclick = () => {
    startConfetti();
  
    document.querySelector(".modal-box").innerHTML = `
      <h2>❤️</h2>
      <p class="final-text">
        She said yes.
        <br/><br/>
        And that’s my favorite moment.
        <br/><br/>
        <span style="font-size:0.9rem; color:#777;">
          — Lakshit
        </span>
      </p>
    `;
  };
  
  /* 🎉 CONFETTI BURST */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function createConfetti() {
  const colors = ["#ff6b81", "#ffc0cb", "#ffd1dc", "#fff"];
  for (let i = 0; i < 120; i++) {
    confettiParticles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: Math.random() * 6 + 4,
      d: Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      speed: Math.random() * 4 + 2
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach((p, i) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x, p.y + p.tilt + p.r);
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiParticles.forEach((p, i) => {
    p.y += p.speed;
    p.tiltAngle += 0.1;
    p.tilt = Math.sin(p.tiltAngle) * 10;

    if (p.y > canvas.height) confettiParticles.splice(i, 1);
  });
}

function startConfetti() {
  createConfetti();
  const interval = setInterval(() => {
    drawConfetti();
    if (confettiParticles.length === 0) {
      clearInterval(interval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, 16);
}
