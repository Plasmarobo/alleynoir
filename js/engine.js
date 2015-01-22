var game = {};
var expectedWidth = 1280;
var expectedHeight = 720;
var KEYSTATE_UP = 0;
var KEYSTATE_DOWN = 1;
var DEBOUNCE_DELAY = 100;
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
  initializeGame();
  //Create a friendly game loop
  // http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
  (function() {
  var onEachFrame;
  if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function () { cb(); requestAnimationFrame(_cb); }
      _cb();
    }
  } else if (window.webkitRequestAnimationFrame) {
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
  
  window.onEachFrame(game.update);
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

  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);

  game.context = game.window.getContext("2d");
  resizeCanvas();
  
  game.assetCount = assetQueue.length;
  game.fps = 60;
  game.clearColor = "rgb(0,0,0)";
  game.inputEvents = [];
  game.keyStates = Array(255); //ASCII keystates?
  game.assets = {images: {}, audio: {}};
  game.allowSave = false;
  clear();
  game.stack = [];
  game.context.drawRotated = DrawRotated.bind(game.context);
  game.music = null;
  game.sfx = [];
  game.playMusic = (function(name)
  {
    if (game.music != null)
    {
      game.music.pause();
    }
    game.music = game.assets.audio[name];
    game.music.loop = true;
    game.music.play();
  }).bind(game);
  game.playEffect = (function(name)
  {
    var sfx = game.assets.audio[name];
    sfx.currentTime = 0;
    // game.sfx.push(sfx);
    sfx.play();
  }).bind(game);
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
  
    return function() {
      loops = 0;
      if (game.stack.length > 0)
      {
        while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
          game.stack[game.stack.length-1].update();
          nextGameTick += skipTicks;
          loops++;
          // purge input queue
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
  })();
  //Will load all assets
  game.stack.push(startLoader());
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
      pushState(startGame());
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
  return state;
};

function loadAsset(description)
{
  var onload = function() {
    if (assetQueue.length > 0)
    {
      loadAsset(assetQueue.shift());
    }
  };

  if (description.type == "image")
  {
    var imageObj = new Image();
    imageObj.src = "img/" + description.name + ".png";
    imageObj.onload = onload;
    imageObj.onerror = function() {
      alert("Failed to load image " + imageObj.src);
    };
    game.assets.images[description.name] = imageObj;
  }
  else if (description.type == "audio")
  {
    var audioObj = new Audio();
    audioObj.src = "sfx/" + description.name + ".ogg";
    audioObj.onload = onload;
    audioObj.onerror = function() {
      alert("Failed to load audio " + audioObj.src);
    };
    game.assets.audio[description.name] = audioObj;
  }
  else {alert("Unknown content specified for load, aborting");}
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
  var obj = {x : 0, 
          y : 0, 
          z: 0
        };
  obj.draw = (function(){
            game.context.fillStyle = "rgb(255, 255, 255)";
            game.context.fillRect(this.x, this.y, 16, 16);
          }).bind(obj);
  obj.update = (function(){
            
          }).bind(obj);
  return obj;
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

function keyUp(event)
{
  // Update state
  var keyCode = ('which' in event) ? event.which : event.keyCode;
  game.keyStates[keyCode] = KEYSTATE_UP;
  // Enque input
  game.inputEvents.push({state: KEYSTATE_UP, keyCode: keyCode});
};

function keyDown(event)
{
  var keyCode = ('which' in event) ? event.which : event.keyCode;
  game.keyStates[keyCode] = KEYSTATE_DOWN;
  game.inputEvents.push({state: KEYSTATE_DOWN, keyCode: keyCode});
};