document.getElementById('hamburgerBtn').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('active');
});

const starCanvas = document.getElementById('starCanvas');
const ctxStars = starCanvas.getContext('2d');
let stars = [];
let meteors = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      alpha: Math.random(),
      flickerSpeed: Math.random() * 0.02 + 0.01
    });
  }
}

function drawStars() {
  ctxStars.clearRect(0, 0, starCanvas.width, starCanvas.height);
  for (let star of stars) {
    ctxStars.beginPath();
    ctxStars.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctxStars.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctxStars.fill();
  }
  for (let meteor of meteors) {
    ctxStars.beginPath();
    ctxStars.moveTo(meteor.x, meteor.y);
    ctxStars.lineTo(meteor.x - meteor.speedX * 5, meteor.y - meteor.speedY * 5);
    ctxStars.strokeStyle = `rgba(150, 200, 255, ${meteor.opacity})`;
    ctxStars.lineWidth = meteor.size;
    ctxStars.stroke();
  }
}

function moveStars() {
  for (let star of stars) {
    star.y += star.speed;
    if (star.y > window.innerHeight) {
      star.y = 0;
      star.x = Math.random() * window.innerWidth;
    }
    star.alpha += star.flickerSpeed;
    if (star.alpha >= 1 || star.alpha <= 0.3) {
      star.flickerSpeed *= -1;
    }
  }
  for (let i = meteors.length - 1; i >= 0; i--) {
    const meteor = meteors[i];
    meteor.x += meteor.speedX;
    meteor.y += meteor.speedY;
    meteor.opacity -= 0.02;
    if (meteor.opacity <= 0) {
      meteors.splice(i, 1);
    }
  }
}

function createMeteor() {
  const startX = Math.random() * window.innerWidth;
  meteors.push({
    x: startX,
    y: 0,
    size: Math.random() * 1 + 0.5,
    speedX: Math.random() * 4 + 15,
    speedY: Math.random() * 4 + 15,
    opacity: 1
  });
  setTimeout(createMeteor, Math.random() * 5000 + 4000);
}

function animateStars() {
  drawStars();
  moveStars();
  requestAnimationFrame(animateStars);
}

function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
initStars();
animateStars();
createMeteor();
