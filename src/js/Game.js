class Game{
  constructor(idx){
    this.COLLISION_BUFFER = 20
    //containers
    this._id = idx;
    this.bullets = [];
    this.gun = new Gun(this);
    this.buildings = [];
    this.meteors = [];

    // game settings
    this.numMeteors = 5;
    this.numBuildings = 4;
    this.meteorMaxSpeed = 5;
    this.buildingHealth = 4;
    this.numBullets = 100;

    //score settings
    this.score = 0;
    this.increment = 10;

    this.displayed = false;
    this.canvas;

    this.setup()
  }

  setup(){
    this.canvas = createCanvas(800, 800);
    frameRate(60);
    this.resetSketch();
  }

  draw(){
    if(!this.isGameOver()){
      if(this.bullets.length > this.numBullets){
        this.bullets.splice(0, 1);
      }

      //check if bullets or meteors go offscreen and remove them if they have
      this.isOffscreen(this.bullets);
      this.isOffscreen(this.meteors);

      //check bullet collision with meteors
      if(this.bullets[0] != null){
        for(var i = this.bullets.length-1; i > 0; i--){
          this.bullets[i].hasCollided(this.meteors);
          if(this.bullets[i].hasHit){
            this.bullets.splice(this.bullets.indexOf(this.bullets[i]), 1);
            this.score += this.increment;
          }
        }
      }

      //if a buildings health is 0 or below, remove it
      for (var i = 0; i < this.buildings.length; i++) {
        if (this.buildings[i].health <= 0) {
          this.buildings.splice(this.buildings.indexOf(this.buildings[i]), 1);
        }
      }

      //if a meteor has hit a building, remove it
      for(var i = 0; i < this.meteors.length; i++){
        if(this.meteors[i].isHit){
          this.meteors.splice(this.meteors.indexOf(this.meteors[i]), 1);
        }
      }

      //generate new meteors if some amount of meteors went off screen or hit something
      while(this.meteors.length != this.numMeteors){
        this.meteors.push(new Meteor(this));
      }

      this.update()
      this.show()
      
    } else {
      this.update()
      this.show()
      this.gameOver()
    }
  }

  update(){
    this.gun.update();
    this.updateArr(this.meteors);
    this.updateArr(this.bullets);
    this.updateArr(this.buildings);
  }

  show(){
    if(this.displayed){
      background(200);
      this.gun.show();
      this.showArr(this.meteors);
      this.showArr(this.bullets);
      this.showArr(this.buildings);

      //display score in top left corner
      textSize(32);
      fill(0);
      text(this.score, 10, 30);
    }
  }

  gameOver(){
    push();
    translate(this.canvas.width/2, this.canvas.height/2);
    textSize(72);
    textAlign(CENTER);
    fill(0);
    text("Game Over", 0, 0);
    pop();
    console.log("GAME OVER")
    noLoop()
  }

  isGameOver(){
      //Game Over scenario - all buildings destroyed
      if(this.buildings.length == 0){
        console.log("all buildings destroyed")
        return true
      }

      //Game Over scenario - gun is hit
      for(var i = 0; i < this.meteors.length; i++){
        let d = dist(this.meteors[i].pos.x, this.meteors[i].pos.y, width/2, height) + this.COLLISION_BUFFER;
        if(d <= this.meteors[i].width){
          console.log("gun destroyed")
          this.gun.height = 0;
          return true
        }
      }

      return false
  }

  resetSketch(){
    this.buildings = [];
    this.meteors = [];
    this.gun = new Gun(this);
    this.score = 0;

    //Create buildings
    for(var i = 0; i < this.numBuildings; i++){
      this.buildings.push(new Building(100+width/this.numBuildings * i, this));
    }

    //Create initial meteors
    for(var j = 0; j < this.numMeteors; j++){
      this.meteors.push(new Meteor(this));
    }

  }

  // if object in array a goes outside the border of the window + a margin (account for meteor start above the screen), remove it from the array
  isOffscreen(a){
    var margin = 100;
    for(var i = a.length - 1; i >= 0; i--){
      if(a[i].pos.x <= 0 - margin || a[i].pos.x >= width + margin || a[i].pos.y <= 0 - margin|| a[i].pos.y >= height + margin){
        a.splice(a.indexOf(a[i]), 1);
      }
    }
  }
  //update all ojects within array a
  updateArr(a){
    for(var i = 0; i < a.length; i++){
      a[i].update();
    }
  }

  //show all objects within array a
  showArr(a){
    for(var i = 0; i < a.length; i++){
      a[i].show();
    }
  }
}
