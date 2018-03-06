
var canvas;
var canvasContext;
var paddle1y;
var ballX = 400;
var ballSpeedX = 5;
var ballY = 20;
var ballSpeedY = 5;
var count2 = Number(document.getElementById("count2").innerHTML);
var button = document.getElementById("button");

function mousePosition(evt) { // tracking the mouse movement event
  var rect = canvas.getBoundingClientRect(); // gets the boundaries of the canvas
  var root = document.documentElement; // gets the boundaries of the document
  var mouseX = evt.clientX - rect.left - root.scrollLeft; // confines the x-position of the mouse tracking to the canvas
  var mouseY = evt.clientY - rect.top - root.scrollTop; // same for the y-pos of the mouse
  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function() { // waits for the document to load first
  canvas = document.getElementById("canvas"); // canvas handle
  canvasContext = canvas.getContext('2d');
  var frameRate = 60; // sets framerate

  setInterval(function() {
    moveEverything();
    drawEverything();
    ballCollision();
  }, 1000/frameRate)

  canvas.addEventListener('mousemove', // adds event listener to y position of mouse
    function(evt) {
      var mousePos = mousePosition(evt);
      paddle1y = mousePos.y-50; // assigns this to the y-position of the paddle
    })
}

// paddle and ball movement logic
function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if(ballX >= canvas.width-40) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballX <= 0) {
    count2 += 1;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = ballSpeedY = 0;
    setTimeout(function() {ballSpeedX = ballSpeedY = 5;}, 1000);
    }
  if (ballY >= canvas.height | ballY <= 0){
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  canvasContext.clearRect(0,0,canvas.width, canvas.height);
  canvasContext.fillStyle = "white"; // colour for paddles
  canvasContext.fillRect(20, paddle1y, 20, 100); // Paddle 1 parameters
  // canvasContext.fillRect(20, ballY-50, 20, 100); // comp vs. comp
  canvasContext.fillRect(canvas.width-40, ballY-50, 20, 100); // Paddle 2 parameters

  // drawing the ball
  canvasContext.fillStyle = "red"
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
  canvasContext.closePath();

// Drawing the Center Line
  canvasContext.beginPath();
  canvasContext.moveTo(canvas.width/2, 0);
  canvasContext.lineTo(canvas.width/2, canvas.height);
  canvasContext.strokeStyle = "white"
  canvasContext.stroke();

// ScoreCard
  canvasContext.font = "30px Arial";
  canvasContext.fillStyle = "white";
  canvasContext.fillText(count2, 3/4*canvas.width, 200);
  }

// Ball Collision Logic
function ballCollision() {
  if ((ballX == 40) && (ballY >= paddle1y-50 && ballY <= paddle1y+100)) { // If the y-component of the ball's direction
  // if (ballX == 40) { // comp vs. comp
    ballSpeedX = -Math.round(1.15*ballSpeedX);                             // coincides with the paddles y-pos, ball will change directions
  }
}
