var game;

function setup(){
  resetGame();
}

function draw(){
  game.draw()
}

function resetGame(){
  game = new Game(0)
  game.displayed = true
}

function keyPressed(){
  if(keyCode == 32){
    game.gun.fire()
  } else if (keyCode == 75){
    game.isGameOver = true
  }
}