var arrestDialog = {
  from: "Choice", message: "Arrest suspect?", pause: 0, wait: false, clear: true,
  left: {
    message: "ARREST", 
    dialog: {"You arrest the suspect...", pause: 0, wait: true, clear: true, trigger: 1}
  },
  right: {
    message: "Not yet...",
    dialog: {"You let it go... for now."} pause: 0, wait: true, clear: true, trigger: 0}
  }
};

var winDialog = {
  from: "Choice", message: "Arrest suspect?", pause: 0, wait: false, clear: true,
  left: {
    message: "ARREST", 
    dialog: {"You arrest the suspect...", pause: 0, wait: true, clear: true, trigger: 2}
  },
  right: {
    message: "Not yet...",
    dialog: {"You let it go... for now."} pause: 0, wait: true, clear: true, trigger: 0}
  }
};

var dialogQueue = [
  {
    name: "The Crime Scene",
    background: "crime",
    dialog : [
      {from: "Narrator", message: "Looks like the scene of the crime", pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "Body's gone, but the blood's still there.", pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "Some items are scattered around...", pause: 100, wait: true, clear: true},
      {from: "Narrator", message: "A pair of ivory dice...", pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "The Ace of Spades...", pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "A tube of black lipstick", pause: 500, wait: true, trigger: 0},
    ]
  },
  {
    name: "Nightwatch Bar",
    background: "noir",
    dialog : [
      {from: "Bouncer", message: "Hello Kid.", pause: 0, wait: true, clear: false},
      {from: "Bouncer", message: "This ain't no place for the likes of you.", pause: 1000,  wait: false, clear: false},
      {from: "Bouncer", message: "I'd back off if it were me.", pause: 0, wait: true, clear: true},
      {from: "Choice", message: "Slip him a 20?", pause: 0, wait: true,
        left: {
          message: "Yes",
          dialog: [
              {from: "Narrator", message: "You slip him $20", pause: 250, wait: false, clear: false},
              {from: "Bouncer", message: "I'm going to look over here for a sec...", pause: 0, wait: false, clear: false},
              {from: "Bouncer", message: "If someone should slip past me, I'd never know.", pause: 0, wait: true, clear: true, trigger: 3}
          ],},
        right: {
          message: "No",
          dialog: [{from: "Action", message: "You leave", trigger: 0}],
        },
      },
    ],
  },
  {
    name: "The Paramount Hotel",
    background: "hotel",
    dialog: [
      {from: "Consierge", message: "Sir? Can I help you with something?", pause: 0, wait: true, clear: true},
      {from: "Narrator", message: "I ask about Vivian, and anyone she was with.", pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "I make it worth his while and he gets talkative. Gives me a room number...", pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "I head to room 206...", pause: 250, wait: true, clear: true},
      {from: "Sam 'Smith'", message: "Yeah, I was with her last night. We hit the tables.", pause: 2500, wait: false, clear: true},
      {from: "Narrator", message: "I give him a little encouragement. Encouragment is the name of my .45.", wait: false, pause: 1500, clear: true},
      {from: "Sam 'Smith'", message: "Look, no need for that see!", pause: 100, wait: false, clear: false},
      {from: "Sam 'Smith'", message: "Truth is, I wasn't doing to well alright. Lost the money.", pause: 500, clear: false, wait: false},
      {from: "Sam 'Smith'", message: "Lost the girl right after I lost the rest of it alright?", pause: 250, clear: false, wait: false},
      {from: "Sam 'Smith'", message: "I took it badly, don't usually lose. Lost something more important than some girl anyway...", pause: 500, clear: true, wait: true},
      {from: "Narrator", message: "The guy seems on the level after his encounter with encouragment.", pause: 250, clear: false, wait: false},
      arrestDialog,
    ]
  },
  {
    name: "Lounge",
    background: "lounge",
    dialog: [
      {from: "Diana", message: "Well, hello stranger...", pause: 1000, clear: true},
      {from: "Narrator", message: "She was quite a sight, red hair, bedroom eyes, and legs that run from floor to ceiling.", clear: true, pause: 100, wait: true},
      {from: "Diana", message: "So you're here about 'that'. Can't say I'm sad. She had it coming.", pause: 250, clear: true, wait: false},
      {from: "Diana", message: "I get pushed to the side, and she get's center stage!", pause: 250, clear: false, wait: false},
      {from: "Diana", message: "She even had the audacity to borrow my lipstick!", pause: 250, clear: false, wait: false},
      {from: "Diana", message: "No, she had it coming detective. That's all I've got to say to you.", pause: 250, clear: false, wait: true},
      winDialog,
    ]
  },
  {
    name: "Elis Mansion",
    background: "mansion",
    dialog: [
      {from: "Boss Elis", message: "Detective. come in.", pause: 1000, clear: true, wait: true},
      {from: "Boss Elis", message: "I think I know what brings you to this, my house.", pause: 500, clear: false, wait: false},
      {from: "Boss Elis", message: "I have some important guests, so forgive me, this will be breif.", pause: 500, clear: true, wait: true},
      {from: "Boss Elis", message: "The dame at my club, her and her date hit the tables.", pause: 500, clear: false, wait: false},
      {from: "Boss Elis", message: "Such a pity: seems he lost and became enraged.", pause: 500, clear: true, wait: true},
      {from: "Boss Elis", message: "Seems the night was not so good for him or her after that.", pause: 500, clear: false, wait: true},
      arrestDialog,
    ]
  },
];

var dialogManager = [
  {from: "Kidan", message: "I see we're admitting all kinds these days. I'll have to fix that.", pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "I think I know why you're here. In the interest of getting you out, I'll slip you a little something, eh?", pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "She was singing that night. We had some VIPs in, so I put her on instead of Diana.", pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "She left with one of those VIPs. Check the hotel.", pause: 500, clear: true, wait: true},
  arrestDialog,
];


function chooseDialog()
{
  var index = Math.floor(Math.random() * dialogQueue.length);
};

//Dialog flow:
//Print message at speed
//If pause > 0, wait for time
//If wait, wait for keypress
//If clear, clear dialog
//If choice, move to choice
//Move to next item 

function startDialog(dialog)
{
  var state = {
    dialog: dialog,
    cursor: 0,
    background: background,

  };
  state.udpate = (function(){

  }).bind(state);
  state.trigger = (function(num){
    switch(num)
    {
      case 0: // LEAVE
        popState();
        break;
      case 1: // KILLED WRONG PERSON
        popState(); // dialog
        popState(); // overworld
        game.playMusic("gameOver");
        pushState(); // Results Screen
        break;
        case 2: // KILLED CORRECT PERSON
        popState(); // dialog
        popState(); // overworld
        game.playMusic("win");
        pushState(); // Results Screen
        break;
      case 2: // BRIBED BOUNCER
        popState(); //dialog
        pushState(startDialog(dialogManager)); // new dialog
        break;
      default:
        break;
    }
  }).bind(state);
  return state;
};

