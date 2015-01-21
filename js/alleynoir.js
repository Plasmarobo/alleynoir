var clearColor = "rgb(222, 13, 170)";
var buildingColor = "rgb(5, 7, 105)";
var effectColor = "rgb(249,0,0)";
var spriteColor = "rgb(0, 0, 0)";
var saveKey = "alleyNoirSave";

function startDialog(background, dialog)
{
	var state = {

	};
	return state;
};

function newStaticObject(asset)
{
	var so = {
		img : assets[asset],
		x : 0,
		y : 0,
		z : 0,
		update : function() {
			// Do nothing
		},
		draw : function(this)
		{
			game.context.drawImage(this.img, x, y);
		}
	};
	return so;
};

function startMenu()
{
	var titleSprite = newStaticObject("title");
	var newGameSprite = newStaticObject("new_game");
	var continueSprite = newStaticObject("continue_game");
	var cursorSprite = newStaticObject("cursor");

	titleSprite.x = continueSprite.x = newGameSprite.x = 640 - (newGameSprite.img.width/2);
	newGameSprite.y = 340 - (newGameSprite.img.height/2);
	continueSprite.y = 380 - (continueSprite.img.height/2);
	titleSprite.y = 20;
	cursorSprite.x = newGameSprite.x - 8 - newGameSprite.img.width/2;

	var state = {
		savedGame : null,
		update : function()
		{
			
		},
		draw : function()
		{
			clear();
			titleSprite.draw();
			newGameSprite.draw();
			continueSprite.draw();
		},
		selected : 0,
		titleSprite : titleSprite,
		continueSprite : continueSprite,
		newGameSprite : newGameSprite
	};
	if(typeof(Storage) !== "undefined") {
    	var savedGame = localStorage.getItem(saveKey);
    	if (savedGame == null)
    	{
    		var result = window.confirm("AlleyNoir would like to store save game data in your browser. We promise to only store a small amount of game-save data and nothing else!");
    		if (result == true)
    		{
    			localStorage.setItem(saveKey, {});
    		}
    	}
    	else
    	{
    		state.savedGame = savedGame;
    	}
	} else {
    	alert("Save games not supported by your browser");
	}
	
	return state;
};


function generateCity()
{

}

function startGame()
{
	game.clearColor = clearColor;
	return startMenu();
};