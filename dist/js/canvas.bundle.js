/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");
var centerx = canvas.width / 2;
var centery = canvas.height / 2;
var player = /*#__PURE__*/function () {
  function player(x, y, radius, color) {
    _classCallCheck(this, player);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  _createClass(player, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.strokeStyle = "white";
      c.stroke();
    }
  }]);
  return player;
}();
var Projictile = /*#__PURE__*/function () {
  function Projictile(x, y, radius, color, velocity) {
    _classCallCheck(this, Projictile);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  _createClass(Projictile, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.strokeStyle = this.color;
      c.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
      this.draw();
    }
  }]);
  return Projictile;
}();
var Enemy = /*#__PURE__*/function () {
  function Enemy(x, y, radius, color, velocity) {
    _classCallCheck(this, Enemy);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  _createClass(Enemy, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.strokeStyle = this.color;
      c.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
      this.draw();
    }
  }]);
  return Enemy;
}();
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var radiusEnemies;
function spawnEnemies() {
  radiusEnemies = randomIntFromRange(20, 40);
  setInterval(function () {
    var x;
    var y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radiusEnemies : canvas.width + radiusEnemies;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radiusEnemies : canvas.height + radiusEnemies;
    }
    var angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    var velocity = {
      x: Math.cos(angle) * 0.8,
      y: Math.sin(angle) * 0.8
    };
    var cr2 = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    enemyarray.push(new Enemy(x, y, radiusEnemies, cr2, velocity));
  }, 1000);
}
var player1 = new player(centerx, centery, 20, "white");
var projectilesarray = [];
var enemyarray = [];
var animationid;
function animate() {
  animationid = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  projectilesarray.forEach(function (Projictile3, projectileindex_02) {
    Projictile3.update();
    if (projectilesarray.x - projectilesarray.radius < 0 || projectilesarray.x + projectilesarray.radius > canvas.width || projectilesarray.y - projectilesarray.radius < 0 || projectilesarray.y + projectilesarray.radius > canvas.height) {
      setTimeout(function () {
        projectilesarray.splice(projectileindex_02, 1);
      }, 0);
    }
  });
  enemyarray.forEach(function (enemy2, index) {
    enemy2.update();
    var dist = Math.hypot(player1.x - enemy2.x, player1.y - enemy2.y);
    if (dist - enemy2.radius - player1.radius < 1) {
      cancelAnimationFrame(animationid);
    }
    projectilesarray.forEach(function (Projictile9, projectileindex) {
      var dist = Math.hypot(Projictile9.x - enemy2.x, Projictile9.y - enemy2.y);
      if (dist - enemy2.radius - Projictile9.radius < 1) {
        if (enemy2.radius - 10 > 10) {
          enemy2.radius -= 10;
          projectilesarray.splice(projectileindex, 1);
        } else {
          setTimeout(function () {
            enemyarray.splice(index, 1);
            projectilesarray.splice(projectileindex, 1);
          }, 0);
        }
      }
    });
  });
  player1.draw();
}
window.addEventListener("click", function (event) {
  console.log(projectilesarray);
  var x = event.clientX;
  var y = event.clientY;
  var angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
  var velocity = {
    x: Math.cos(angle) * 15,
    y: Math.sin(angle) * 15
  };
  projectilesarray.push(new Projictile(centerx, centery, 5, "white", velocity));
});
animate();
spawnEnemies();
/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map