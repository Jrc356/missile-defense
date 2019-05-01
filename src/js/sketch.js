var games;
var finishedGames = [];
var numGames = 5;
var slider;
var sliderVal;
var gameP;


function setup(){
  slider = createSlider(1, 100, 1);
  slider.position(1000, 50);
  sliderVal = createP(slider.value());
  gameP = createP(0);

  $.ajax({
    url: "http://127.0.0.1:5000/model",
    data: "num_models=" + numGames,
    dataType: 'json',
    async: false,
    success: function(){
      console.log("All Models Created.")
    },
  });
  resetGames();

}

function draw(){
  sliderVal.html(slider.value());

  //Check for best current game
  let bestGameScore = 0;
  let bestGameIdx = 0;

  for(let i = 0; i < games.length; i++){
    if(games[i].score > bestGameScore){
        bestGameIdx = i;
        bestGameScore = games[i].score;
    }
  }

  //if best game is not displayed, display it
  if(games.length > 0){
    for(let i = 0; i < games.length; i++){
      if(games[i] != games[bestGameIdx]){
        games[i].displayed = false;
      } else {
        games[i].displayed = true;
        gameP.html("Game Shown: " + games[bestGameIdx]._id);
      }
    }

    //draw game
    let finIdxs = [];
    for(let i = 0; i < games.length; i++){
      if(!games[i].isGameOver){
        games[i].draw(slider.value());
      }else{
        console.log("Game " + games[i]._id + " is over.")
        finIdxs.push(i);
      }
    }
    for(let i = 0; i < finIdxs.length; i++){
      finishedGames.push(games[finIdxs[i]]);
      games.splice(finIdxs[i], 1);
    }
  } else {
    evolve();
    resetGames();
  }
}

function resetGames(){
  games = [];

  for(var i = 0; i < numGames; i++){
    games.push(new Game(i));
  }

  for(let i = 0; i < games.length; i++){
    games[i].setup();
  }
}

function evolve(){
  $.ajax({
    url: "http://127.0.0.1:5000/model/evolve",
    dataType: 'json',
    async: false,
    success: function(){
      for(let i = 0; i < finishedGames.length; i++){
        games.push(finishedGames[i]);
      }
      finishedGames = [];
    }
  })
}

function keyPressed(){
    if (keyCode === 32){
      for(let i = 0; i < games.length; i++){
        games[i].isGameOver = true;
      }
    }
  }
