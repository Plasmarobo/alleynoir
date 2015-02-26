
var assetQueue = [];

// Image assets
(["title",
  "new_game",
  "continue_game",
  "cursor",
  "noir"
]).forEach(function(name){
	assetQueue.push({type: "image", name: name});
});

//Audio assets
(["Backed Vibes Clean",
  "Despair and Triumph",
  "I Knew a Guy"
]).forEach(function(name){
	assetQueue.push({type: "audio", name: name});
});

//Animations
([{
  	name: "noir_right", 
  	frames: [
  		{
  			x: 0,
  			y: 0,
  			w: 64,
  			h: 154,
  			time: 500,
  			trigger: null,
  		},
  		{
  			x: 64,
  			y: 0,
  			w: 64,
  			h: 154,
  			time: 500,
  			trigger: null,
    	}
  	],
    loop: true,
  },
  {
    name: "noir_left", 
    frames: [
      {
        x: 0,
        y: 0,
        w: 64,
        h: 154,
        time: 500,
        trigger: null,
      },
      {
        x: 128,
        y: 0,
        w: 64,
        h: 154,
        time: 500,
        trigger: null,
      }
    ],
    loop: true,
  },
  {
    name: "noir_idle", 
    frames: [
      {
        x: 128,
        y: 0,
        w: 64,
        h: 154,
        time: 0,
        trigger: null,
      }
    ],
    loop: false,
  },
  {
    name: "noir_shoot", 
    frames: [
      {
        x: 192,
        y: 0,
        w: 64,
        h: 154,
        time: 0,
        trigger: null 
      }
    ],
    loop: false,

  },
]).forEach(function(anim){
	anim.type = "animation";
	assetQueue.push(anim)

});
