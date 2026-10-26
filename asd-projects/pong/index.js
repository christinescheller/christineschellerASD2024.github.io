/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  
  // Game Item Objects
  const KEY = {
    "W": 87,
    "S": 83,

    "UP": 38,
    "DOWN": 40
  }


  function GameItem(id, speedX, speedY){
    var objInstance = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height(),
    }
    return objInstance;
  }

  var paddleLeft = GameItem("#paddleLeft", 0, 0);
  var paddleRight = GameItem("#paddleRight", 0, 0);
  var ball = GameItem("#ball", (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3))

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(paddleLeft);
    updateGameItem(paddleLeft);
    drawGameItem(paddleRight);
    updateGameItem(paddleRight);
    drawGameItem(ball);
    updateGameItem(ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      paddleLeft.speedY = -5;
    }
    if(event.which === KEY.S){
      paddleLeft.speedY = 5;
    }

    if(event.which === KEY.UP){
      paddleRight.speedY = -5;
    }
    if(event.which === KEY.DOWN){
      paddleRight.speedY = 5;
    }
  }

  function handleKeyUp(event){
    if(event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }

    if(event.which === KEY.UP || event.which === KEY.DOWN){
      paddleRight.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  //check boundaries of paddles
  //determine if objects collide
  //handle what happens when the ball hits the walls
  //handle what happens when the ball hits the paddles
  //handle what happens when someone wins
  //handles the points
  //handle resetting the game
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}