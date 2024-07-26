let canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

let c = canvas.getContext("2d");
let centerx = canvas.width / 2;
let centery = canvas.height / 2;

class player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = "white";
    c.stroke();
  }
}

class Projictile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
    c.stroke();
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.draw();
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
    c.stroke();
  }
  update() {
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.draw();
  }
}
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let radiusEnemies;
function spawnEnemies() {
  radiusEnemies = randomIntFromRange(20, 40);
  setInterval(() => {
    let x;
    let y;
    if (Math.random() < 0.5) {
      x =
        Math.random() < 0.5 ? 0 - radiusEnemies : canvas.width + radiusEnemies;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y =
        Math.random() < 0.5 ? 0 - radiusEnemies : canvas.height + radiusEnemies;
    }

    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle) * 0.8,
      y: Math.sin(angle) * 0.8,
    };
    var cr2 =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    enemyarray.push(new Enemy(x, y, radiusEnemies, cr2, velocity));
  }, 1000);
}
let player1 = new player(centerx, centery, 20, "white");
const projectilesarray = [];
const enemyarray = [];

let animationid;

function animate() {
  animationid = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  projectilesarray.forEach((Projictile3, projectileindex_02) => {
    Projictile3.update();
    if (
      projectilesarray.x - projectilesarray.radius < 0 ||
      projectilesarray.x + projectilesarray.radius > canvas.width ||
      projectilesarray.y - projectilesarray.radius < 0 ||
      projectilesarray.y + projectilesarray.radius > canvas.height
    ) {
      setTimeout(() => {
        projectilesarray.splice(projectileindex_02, 1);
      }, 0);
    }
  });
  enemyarray.forEach((enemy2, index) => {
    enemy2.update();
    const dist = Math.hypot(player1.x - enemy2.x, player1.y - enemy2.y);
    if (dist - enemy2.radius - player1.radius < 1) {
      cancelAnimationFrame(animationid);
    }
    projectilesarray.forEach((Projictile9, projectileindex) => {
      const dist = Math.hypot(
        Projictile9.x - enemy2.x,
        Projictile9.y - enemy2.y
      );
      if (dist - enemy2.radius - Projictile9.radius < 1) {
        if (enemy2.radius -10 > 10) {
          enemy2.radius -= 10;
          projectilesarray.splice(projectileindex, 1);
        } else {
          setTimeout(() => {
            enemyarray.splice(index, 1);
            projectilesarray.splice(projectileindex, 1);
          }, 0);
        }
      }
    });
  });
  player1.draw();
}

window.addEventListener("click", (event) => {
  console.log(projectilesarray);
  let x = event.clientX;
  let y = event.clientY;

  const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
  const velocity = {
    x: Math.cos(angle) * 15,
    y: Math.sin(angle) * 15,
  };
  projectilesarray.push(new Projictile(centerx, centery, 5, "white", velocity));
});

animate();
spawnEnemies();
