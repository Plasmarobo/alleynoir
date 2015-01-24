var dialogQueue = [
  {
    name: "Huskies Bar",
    background: "noir",
    dialog : [
    {from: "Bouncer", message: "Hello Kid.", pause: 0, wait: true},
    {from: "Bouncer", message: "This ain't no place for the likes of you.", pause: 1000,  wait: false},
    {from: "Bouncer", message: "I'd back off if it were me.", pause: 0, wait: true},
    {from: "Choice", message: "Shoot him?", pause: 0, wait: true
      left: [{from: "Action", message: "You shoot him", trigger: 0}],
      right: [{from: "Action", message: "You leave"}],
    },
    ],
  },
];

function chooseDialog()
{
  var index = Math.floor(Math.random() * dialogQueue.length);
};

function startDialog(background, dialog)
{
  var state = {
    dialog: dialog,
    cursor: 0,
    background: background,

  };
  state.udpate = (function(){

  }).bind(state);
  state.trigger = (function(num){
    swtich(num)
    {
      case 0: // LEAVE
        popState();
        break;
      case 1: // SHOOT (You can only do this once)
        popState(); // dialog
        popState(); // overworld
        pushState(); // Results Screen

    }
  }).bind(state);
  return state;
};

