var dialogBox = {
  padding: 32,
  color: "rgb(128,128,200)",
  borderColor: "rgb(100,100,100)",
  // TODO base these on window
  height: 320,
  width: 800,
};

var arrestDialog = {
  from: "Narrator", 
  message: "Arrest suspect?", 
  pause: 0, 
  wait: false, 
  clear: true, 
  speed: 150,
  choice: {
    left: {
      name: "ARREST", 
      dialog: [{
        message: "You arrest the suspect...", 
        pause: 0, 
        wait: true, 
        clear: true,
        speed: 150, 
        trigger: 1
      }]
    },
    right: {
      name: "Not yet...",
      dialog: [{
        message: "You let it go... for now.", 
        pause: 0, 
        wait: true, 
        clear: true,
        speed: 150, 
        trigger: 0
      }]
    }
  }
};

var winDialog = {
  from: "Narrator", 
  message: "Arrest suspect?", 
  pause: 0, 
  wait: false,
  speed: 150, 
  clear: true,
  choice: {
    left: {
      name: "ARREST", 
      dialog: [{
        message: "You arrest the suspect...", 
        pause: 0, 
        wait: true,
        speed: 150, 
        clear: true, 
        trigger: 2
      }]
    },
    right: {
      name: "Not yet...",
      dialog: [{
        message: "You let it go... for now.", 
        pause: 0, 
        wait: true,
        speed: 150, 
        clear: true, 
        trigger: 0
      }]
    }
  }
};

var dialogQueue = [
  {
    name: "The Crime Scene",
    background: "crime",
    dialog : [
      {from: "Narrator", message: "Looks like the scene of the crime", speed: 150,pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "Body's gone, but the blood's still there.", speed: 150,pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "Some items are scattered around...", speed: 150,pause: 100, wait: true, clear: true},
      {from: "Narrator", message: "A pair of ivory dice...",speed: 150, pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "The Ace of Spades...",speed: 150, pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "A tube of black lipstick",speed: 150, pause: 500, wait: true, trigger: 0},
    ]
  },
  {
    name: "Nightwatch Bar",
    background: "noir",
    dialog : [
      {from: "Bouncer", message: "Hello Kid.",speed: 150, pause: 0, wait: true, clear: false},
      {from: "Bouncer", message: "This ain't no place for the likes of you.",speed: 150, pause: 1000,  wait: false, clear: false},
      {from: "Bouncer", message: "I'd back off if it were me.",speed: 150, pause: 0, wait: true, clear: true},
      {from: "Choice", message: "Slip him a 20?",speed: 150, pause: 0, wait: true, choice: {
          left: {
            name: "Yes",
            dialog: [
                {from: "Narrator", message: "You slip him $20",speed: 150, pause: 250, wait: false, clear: false},
                {from: "Bouncer", message: "I'm going to look over here for a sec...",speed: 150, pause: 0, wait: false, clear: false},
                {from: "Bouncer", message: "If someone should slip past me, I'd never know.",speed: 150, pause: 0, wait: true, clear: true, trigger: 3}
            ],},
          right: {
            name: "No",
            dialog: [{from: "Action", message: "You leave",pause: 0, clear: false, wait: false, speed: 150, trigger: 0}],
          },
        },
      },
    ],
  },
  {
    name: "The Paramount Hotel",
    background: "hotel",
    dialog: [
      {from: "Consierge", message: "Sir? Can I help you with something?",speed: 150, pause: 0, wait: true, clear: true},
      {from: "Narrator", message: "I ask about Vivian, and anyone she was with.", speed: 150,pause: 100, wait: false, clear: false},
      {from: "Narrator", message: "I make it worth his while and he gets talkative. Gives me a room number...",speed: 150, pause: 500, wait: false, clear: false},
      {from: "Narrator", message: "I head to room 206...",speed: 150, pause: 250, wait: true, clear: true},
      {from: "Sam 'Smith'", message: "Yeah, I was with her last night. We hit the tables.",speed: 150,pause: 2500, wait: false, clear: true},
      {from: "Narrator", message: "I give him a little encouragement. Encouragment is the name of my .45.", speed: 150,wait: false, pause: 1500, clear: true},
      {from: "Sam 'Smith'", message: "Look, no need for that see!", speed: 150,pause: 100, wait: false, clear: false},
      {from: "Sam 'Smith'", message: "Truth is, I wasn't doing to well alright. Lost the money.",speed: 150,pause: 500, clear: false, wait: false},
      {from: "Sam 'Smith'", message: "Lost the girl right after I lost the rest of it alright?",speed: 150, pause: 250, clear: false, wait: false},
      {from: "Sam 'Smith'", message: "I took it badly, don't usually lose. Lost something more important than some girl anyway...", speed: 150,pause: 500, clear: true, wait: true},
      {from: "Narrator", message: "The guy seems on the level after his encounter with encouragment.",speed: 150, pause: 250, clear: false, wait: false},
      arrestDialog,
    ]
  },
  {
    name: "Lounge",
    background: "lounge",
    dialog: [
      {from: "Diana", message: "Well, hello stranger...",speed: 150, pause: 1000, clear: true},
      {from: "Narrator", message: "She was quite a sight, red hair, bedroom eyes, and legs that run from floor to ceiling.", speed: 150,clear: true, pause: 100, wait: true},
      {from: "Diana", message: "So you're here about 'that'. Can't say I'm sad. She had it coming.", speed: 150,pause: 250, clear: true, wait: false},
      {from: "Diana", message: "I get pushed to the side, and she get's center stage!", speed: 150,pause: 250, clear: false, wait: false},
      {from: "Diana", message: "She even had the audacity to borrow my lipstick!", speed: 150,pause: 250, clear: false, wait: false},
      {from: "Diana", message: "No, she had it coming detective. That's all I've got to say to you.", speed: 150,pause: 250, clear: false, wait: true},
      winDialog,
    ]
  },
  {
    name: "Elis Mansion",
    background: "mansion",
    dialog: [
      {from: "Boss Elis", message: "Detective. come in.", speed: 150,pause: 1000, clear: true, wait: true},
      {from: "Boss Elis", message: "I think I know what brings you to this, my house.",speed: 150, pause: 500, clear: false, wait: false},
      {from: "Boss Elis", message: "I have some important guests, so forgive me, this will be breif.",speed: 150, pause: 500, clear: true, wait: true},
      {from: "Boss Elis", message: "The dame at my club, her and her date hit the tables.",speed: 150, pause: 500, clear: false, wait: false},
      {from: "Boss Elis", message: "Such a pity: seems he lost and became enraged.",speed: 150, pause: 500, clear: true, wait: true},
      {from: "Boss Elis", message: "Seems the night was not so good for him or her after that.",speed: 150, pause: 500, clear: false, wait: true},
      arrestDialog,
    ]
  },
];

var dialogManager = [
  {from: "Kidan", message: "I see we're admitting all kinds these days. I'll have to fix that.",speed: 150, pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "I think I know why you're here. In the interest of getting you out, I'll slip you a little something, eh?",speed: 150, pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "She was singing that night. We had some VIPs in, so I put her on instead of Diana.",speed: 150, pause: 500, clear: true, wait: true},
  {from: "Kidan", message: "She left with one of those VIPs. Check the hotel.",speed: 150, pause: 500, clear: true, wait: true},
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
  var noirClose = newStaticObject("noir_close");
  noirClose.x = 0;
  noirClose.y = noirClose.img.height;
  var flare = {
    x : 254,
    y : 248,
    w : 16,
    h : 16,
    color : "rgb(0,0,0)",
    time : (new Date).getTime(),
  };
  flare.updateColor = (function(){
    var now = (new Date).getTime() - this.time;
    if (now < 8000)
    {
    var rads = (now/4000) * Math.PI;
    var r = 200 + 55 * Math.sin(rads);
    this.color = "rgb("+r+",0,0)";
    }
    if(now > 12000)
    {
        this.time = (new Date).getTime();
    }
  }).bind(flare);


  var state = {
    dialog: dialog,
    cursor: 0,
    subcursor: 0,
    background: newStaticObject(dialog.background),
    accumulator: 0,
    from: null,
    noirClose : noirClose,
    flare : flare
  };

  state.udpate = (function(){
    flare.updateColor();

    //Print message up to subcursor
    
    if (this.from == null)
    {
      this.from = "SYSTEM ERROR";
    }
    if (this.from == "Choice")
    {
      //Check input
    }
    else
    {
      this.accumulator += game.delta;
      if (this.accumulator > this.dialog[cursor].speed)
      {
        this.accumuator -= this.dialog[cursor].speed;
        this.subcursor += 1;
      }
      if (this.subcursor < this.dialog[cursor].message.length)
      {

      }
      else
      {
        if (this.dialog[cursor].clear == true)
        {

        }
        if (this.dialog[cursor].wait == true)
        {

        }
        if (this.dialog[cursor].pause == true)
        {

        }
        this.cursor += 1;
        this.from = this.dialog[cursor].from;
        this.subcursor = 0;
      }
    }
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
  state.draw = (function(){
    noirClose.draw();
    game.context.fillStyle = flare.color;
    game.context.fillRect(flare.x, flare.y, flare.w, flare.h);
    //Dialog box
    game.context.fillStyle = dialogBox.borderColor;
    game.context.fillRect(dialogBox.padding, game.height-dialogBox.height-dialogBox.padding, dialogBox.width+dialogBox.padding, dialogBox.height+dialogBox.padding);
    game.context.fillStyle = dialogBox.color;
    game.context.fillRect(dialogBox.padding*2, game.height-dialogBox.height, dialogBox.width, dialogBox.height);
    // Get substring to print


  }).bind(state);
  return state;
};

