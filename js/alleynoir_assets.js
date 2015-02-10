
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
	name: "noir_left", 
	frames: [
		{
			x: 0,
			y: 0,
			w: 128,
			h: 128,
			time: 500,
			trigger: null,
		},
		{
			x: 128,
			y: 0,
			w: 128,
			h: 128,
			time: 500,
			trigger: null,
	}
	]
  },
  {name: "noir_right", frames: []}
  {name: "noir_idle", frames: []}
  {name: "noir_shoot", frames: []}
]).forEach(function(anim){
	anim.type = "animation";
	assetQueue.push(anim)

});
