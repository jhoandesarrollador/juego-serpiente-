const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;


function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const ateApple = snake[0].x === apple.x && snake[0].y === apple.y;
  if (ateApple) {
    score++;
    document.getElementById("score").textContent = score;
    spawnApple();
  } else {
    snake.pop();
  }
}

function spawnApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);

  if (snake.some((segment) => segment.x === apple.x && segment.y === apple.y)) {
    spawnApple();
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount ||
    snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    alert("¡Juego terminado! Puntuación: " + score);
    resetGame();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  document.getElementById("score").textContent = score;
  spawnApple();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  }
  if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  }
  if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  }
  if (e.key === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawApple();
  drawSnake();
  moveSnake();
  checkCollision();
  setTimeout(gameLoop, 100);
}

spawnApple();
gameLoop();
