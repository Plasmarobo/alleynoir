var game = {};
var assetQueue = [
  "noir.png"
];

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
}

function initializeGame()
{
  game.window = document.getElementById("game_window");
  game.context = game.window.getContext("2d");
  resizeCanvas();
  game.width = game.context.canvas.clientWidth;
  game.height = game.context.canvas.clientHeight;
  game.assetCount = 0;
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
    var loops = 0, skipTicks = 1000 / Game.fps,
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
        }
    
        if(loops)
        {
          game.stack[game.stack.length-1].draw();
        }
      }
      else
      {
        clear();
      }
  };
});
  
  game.framestart = Date.now();
  game.frameend = Date.now();
  game.starttime = Date.now();
  game.frametimeweight = 0.4;
  game.frametimeaverage = 0;
  game.stack = [];
  //Will load all assets
  game.stack.push(startLoader());
  window.onEachFrame(game.update);
};

function clear()
{
  game.context.fillStyle = "rgb(0,0,0)";
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
    else
    {
      var imageObj = new Image();
      imageObj.onload = function() {
        game.assetCount += 1;
      };
      imageObj.src = "img/" + name + ".png";
      assets[name] = imageObj;
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

};

function DrawRotated(image, x, y, angle) {
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




