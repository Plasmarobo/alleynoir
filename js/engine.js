var game = {};
var expectedWidth = 1280;
var expectedHeight = 720;
var KEYSTATE_UP = 0;
var KEYSTATE_DOWN = 1;
var KeyCodes =
{
  BACKSPACE : 8,
  TAB       : 9,
  ENTER     : 13,
  SHIFT     : 16,
  CTRL      : 17,
  ALT       : 18,
  ESC       : 27,
  SPACE     : 32,
  LEFT      : 37,
  UP        : 38,
  RIGHT     : 39,
  DOWN      : 40,
  A         : 65,
  D         : 68,
  S         : 83,
  W         : 87,
};

document.addEventListener("DOMContentLoaded", function(event) {
  //Create a friendly game loop
  // http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
  (function() {
  var onEachFrame;
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  window.onEachFrame = onEachFrame;
  })();
  initializeGame();
});

document.addEventListener("resize", resizeCanvas);
  
function resizeCanvas() {
  game.window.width = window.innerWidth;
  game.window.height = window.innerHeight;
  game.width = game.context.canvas.clientWidth;
  game.height = game.context.canvas.clientHeight;
  game.scale = Math.min(expectedWidth/game.width, expectedHeight/game.height);
}

function initializeGame()
{
  game.window = document.getElementById("game_window");

  game.window.addEventListener("onkeydown", keyDown);
  game.window.addEventListener("onkeyup", keyUp);

  game.context = game.window.getContext("2d");
  resizeCanvas();
  
  game.assetCount = 0;
  game.fps = 60;
  game.clearColor = "rgb(0,0,0)";
  game.inputEvents = [];
  game.keyStates = Array(255); //ASCII keystates?
  clear();
  
  game.context.drawRotated = DrawRotated.bind(game.context);
  game.runtime = (function()
  {
    return Date.now()-this.starttime;
  }).bind(game);
  game.delta = (function()
  {
    return Date.now() - this.framestart;
  }).bind(game);
  game.update = (function() {
    var loops = 0, skipTicks = 1000 / game.fps,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();
  
    return function {
      loops = 0;
      if (game.stack.length > 0)
      {
        while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
          game.stack[game.stack.length-1].update();
          nextGameTick += skipTicks;
          loops++;
          // purge input queue
          game.inputEvents = [];
        }
    
        if(loops)
        {
          game.stack[game.stack.length-1].draw();
        }
      }
      else
      {
        //clear();
      }

  };
});
  
  game.stack = [];
  //Will load all assets
  game.stack.push(startLoader());
  window.onEachFrame(game.update);
};

function clear()
{
  game.context.fillStyle = game.clearColor;
  game.context.fillRect(0, 0, game.width, game.height);
}

function startLoader()
{
  var state = {};
  state.progress = 0;
  state.update = (function()
  {
    clear();
    this.progress = game.assetCount - assetQueue.length;
    //Get scale, should be about 80% of screen space by 10%
    if (assetQueue.length == 0)
    {
      popState();
      startGame();
    }
  }).bind(state);

  state.draw = (function()
  {
    var width = game.width * (4/5);
    var height = game.height / 10;
    game.context.fillStyle = "rgb(255, 255, 255)";
    game.context.fillRect((game.width/2)-(width/2)-1,(game.height/2)-(height/2)-1, width+1, height+1);
    game.context.fillStyle = "rgb(0, 196, 0)";
    game.context.fillRect((game.width/2)-(width/2), (game.height/2)-(height/2), width * (this.progress/game.assetCount),height);
  }).bind(state);
  //start load process
  loadAsset(assetQueue.shift());
};

function loadAsset(name)
{
  var imageObj = new Image();
  imageObj.onload = function() {
    if (assetQueue.length > 0)
    {
      loadAsset(assetQueue.shift());
    }
  };
  imageObj.src = "img/" + name + ".png";
  assets[name] = imageObj;
}

function DrawRotated(image, x, y, angle) {
  // TODO: SCALE COORDINATES SOMEHOW
  this.save();
  this.translate(x+game.width/2, y+game.height/2);
  this.rotate(angle);
  this.drawImage(image, -(image.width/2), -(image.height/2));
  this.restore();
};

function newObject()
{
  return {x : 0, 
          y : 0, 
          z: 0, 
          draw : function(this){
            game.context.fillStyle = "rgb(255, 255, 255)";
            game.context.fillRect(this.x, this.y, 16, 16);
          },
          update : function(this){
            game
          }
        };
};

//All states need two functions: update and draw
function pushState(state)
{
  game.stack.push(state);
};


function popState()
{
  game.stack.pop();
};

function zSort(a, b)
{
  return (a.z - b.z);
};

function keyUp(e)
{
  // Update state
  var keyCode = ('which' in event) ? event.which : event.keyCode;
  game.keyStates(keyCode) = KEYSTATE_UP;
  // Enque input
  game.inputEvents.push({state: KEYSTATE_UP, key: keyCode});
};

function keyDown(e)
{
  var keyCode = ('which' in event) ? event.which : event.keyCode;
  game.keyStates(keyCode) = KEYSTATE_DOWN;
  game.inputEvents.push({state: KEYSTATE_DOWN, key: keyCode});
};