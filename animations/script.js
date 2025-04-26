const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: 160, y: 160 }];
let direction = "right";
let food = spawnFood();
let score = 0;

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Score: " + score);
        resetGame();
    }
    if (eatFood()) {
        score++;
        food = spawnFood();
    }
    drawGame();
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= grid;
            break;
        case "down":
            head.y += grid;
            break;
        case "left":
            head.x -= grid;
            break;
        case "right":
            head.x += grid;
            break;
    }

    snake.unshift(head);
    snake.pop();
}

function eatFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function spawnFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * (canvasSize / grid)) * grid,
            y: Math.floor(Math.random() * (canvasSize / grid)) * grid,
        };
    } while (isFoodOnSnake(foodPosition));
    return foodPosition;
}

function isFoodOnSnake(foodPosition) {
    for (let i = 0; i < snake.length; i++) {
        if (foodPosition.x === snake[i].x && foodPosition.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });

    // Draw food
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x, food.y, grid, grid);

    // Draw score
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = "right";
    score = 0;
    food = spawnFood();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});

setInterval(gameLoop, 100);
