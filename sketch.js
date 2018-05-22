var gun = new Gun;
var bullets = [];
var buildings = [];
var rockets = [];
var numRockets = 5;
var maxRocketsOnScreen = 5;
var numBuildings = 4;
var rocketMaxSpeed = 5;
var buildingHealth = 4;
var score = 0;
var increment = 10;
var isGameOver = false;
var closestRocket;

function setup(){
  createCanvas(800, 800);
  frameRate(60);

  //Create buildings
  for(var i = 0; i < numBuildings; i++){
    buildings.push(new Building(100+width/numBuildings * i));
  }

  //Create initial rockets
  for(var i = 0; i < numRockets; i++){
    rockets.push(new Rocket());
  }
}

//Run every frame
function draw(){
  //Add new rocket every 1000 frames
  if(frameCount%1000 == 0){
    numRockets += 1;
    constrain(numRockets, 0, maxRocketsOnScreen) //restrict number of rockets
  }


  //Game Over scenario - all buildings destroyed
  if(buildings.length == 0){
    isGameOver = true;
  }

  //Game Over scenario - gun is hit
  for(var i = 0; i < rockets.length; i++){
    d = dist(rockets[i].pos.x, rockets[i].pos.y, width/2, height)
    if(d <= rockets[i].width){
      gun.height = 0;
      isGameOver = true;
    }
  }

  //check if bullets or rockets go offscreen and remove them if they have
  isOffscreen(bullets);
  isOffscreen(rockets);

  //check bullet collision with rockets
  if(bullets[0] != null){
    for(var i = bullets.length-1; i > 0; i--){
      bullets[i].hasCollided(rockets);
      if(bullets[i].hasHit){
        bullets.splice(bullets.indexOf(bullets[i]), 1);
        score += increment;
      }
    }
  }

  //if a buildings health is 0 or below, remove it
  for (var i = 0; i < buildings.length; i++) {
    if (buildings[i].health <= 0) {
      buildings.splice(buildings.indexOf(buildings[i]), 1);
    }
  }

  //if a rocket has hit a building, remove it
  for(var i = 0; i < rockets.length; i++){
    if(rockets[i].isHit){
      rockets.splice(rockets.indexOf(rockets[i]), 1);
    }
  }

  //generate new rockets if some amount of rockets went off screen or hit something
  while(rockets.length != numRockets){
    rockets.push(new Rocket());
  }

  gun.update();

  //display
  background(200);
  gun.show();
  updateAndDraw(bullets);
  updateAndDraw(buildings);
  updateAndDraw(rockets);

  closestRocket = calcClosestRocket();

  //display score in top left corner
  textSize(32);
  fill(0);
  text(score, 10, 30);

  //if game is over, display game over text
  if(isGameOver){
    push();
    translate(width/2, height/2);
    textSize(72);
    textAlign(CENTER);
    fill(0);
    text("Game Over", 0, 0);
    pop();
    noLoop();
  }
}



// if object in array a goes outside the border of the window + a margin (account for rocket start above the screen), remove it from the array
function isOffscreen(a){
  var margin = 100;
  for(var i = a.length - 1; i >= 0; i--){
    if(a[i].pos.x <= 0 - margin || a[i].pos.x >= width + margin || a[i].pos.y <= 0 - margin|| a[i].pos.y >= height + margin){
      a.splice(a.indexOf(a[i]), 1);
    }
  }
}

function calcClosestRocket(){
  let best = rockets[0];
  for(let i = 0; i < rockets.length; i++){
    if(rockets[i].distFromGun < best.distFromGun){
      best = rockets[i];
    }
  }
  return best
}

//run all update and show ojects within an array a
function updateAndDraw(a){
  for(var i = 0; i < a.length; i++){
    a[i].update();
    a[i].show();
  }
}

//listen for spacebar
function keyPressed() {
  if (keyCode === 32){
    bullets.push(new Bullet(width/2, height-1));
  }

  if (keyCode === 70){
    gun.botControl();
  }
}
