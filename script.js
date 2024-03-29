const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
const userStart = [230, 10];
const ballStart = [270, 40];
let currentPositon = userStart;
let ballCurrentPosition = ballStart;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;
class block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
const blocks = [
  new block(10, 270),
  new block(120, 270),
  new block(230, 270),
  new block(340, 270),
  new block(450, 270),
  new block(10, 240),
  new block(120, 240),
  new block(230, 240),
  new block(340, 240),
  new block(450, 240),
  new block(10, 210),
  new block(120, 210),
  new block(230, 210),
  new block(340, 210),
  new block(450, 210),
];
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlock();
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);
function drawUser() {
  user.style.left = currentPositon[0] + "px";
  user.style.bottom = currentPositon[1] + "px";
}
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPositon[0] > 0) {
        currentPositon[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPositon[0] < boardWidth - blockWidth) {
        currentPositon[0] += 10;
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", moveUser);
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 20);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You Win";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  } else if (
    ballCurrentPosition[0] > currentPositon[0] &&
    ballCurrentPosition[0] < currentPositon[0] + blockWidth &&
    ballCurrentPosition[1] > currentPositon[1] &&
    ballCurrentPosition[1] < currentPositon[1] + blockHeight
  ) {
    changeDirection();
  } else if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose";
    document.removeEventListener("keydown", moveUser);
  }
}
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
