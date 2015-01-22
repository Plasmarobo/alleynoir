

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
(["menu_theme",
  "city_theme",
  "shot_effect"
]).forEach(function(name){
	assetQueue.push({type: "audio", nane: name});
});