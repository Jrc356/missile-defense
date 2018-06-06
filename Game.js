class Game{
  constructor(idx){
    //containers
    this._id = idx;
    this.gun = new Gun(this);
    this.bullets = [];
    this.buildings = [];
    this.rockets = [];

    // game settings
    this.numRockets = 5;
    this.numBuildings = 4;
    this.rocketMaxSpeed = 5;
    this.buildingHealth = 4;
    this.isGameOver = false;
    this.numBullets = 100;
    this.slider;
    this.sliderVal;
    this.cycles;

    //score settings
    this.score = 0;
    this.increment = 10;

    //Genetic algo settings
    this.closestRocket;
    this.generation = 0;

    this.displayed = false;
    this.canvas;
  }

  setup(){
    this.canvas = createCanvas(800, 800);
    frameRate(60);
    this.resetSketch();
  }

  //Run every frame
  draw(cycles){
    if(!this.isGameOver){
      for(let n = 0; n < cycles; n++){

        if(this.bullets.length > this.numBullets){
          this.bullets.splice(0, 1);
        }


        //Game Over scenario - all buildings destroyed
        if(this.buildings.length == 0){
          this.isGameOver = true;
        }

        //Game Over scenario - gun is hit
        for(var i = 0; i < this.rockets.length; i++){
          let d = dist(this.rockets[i].pos.x, this.rockets[i].pos.y, width/2, height);
          if(d <= this.rockets[i].width){
            this.gun.height = 0;
            this.isGameOver = true;
          }
        }

        //check if bullets or rockets go offscreen and remove them if they have
        this.isOffscreen(this.bullets);
        this.isOffscreen(this.rockets);

        //check bullet collision with rockets
        if(this.bullets[0] != null){
          for(var i = this.bullets.length-1; i > 0; i--){
            this.bullets[i].hasCollided(this.rockets);
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

        //if a rocket has hit a building, remove it
        for(var i = 0; i < this.rockets.length; i++){
          if(this.rockets[i].isHit){
            this.rockets.splice(this.rockets.indexOf(this.rockets[i]), 1);
          }
        }

        //generate new rockets if some amount of rockets went off screen or hit something
        while(this.rockets.length != this.numRockets){
          this.rockets.push(new Rocket(this));
        }

        this.gun.update();
        this.updateArr(this.rockets);
        this.updateArr(this.bullets);
        this.updateArr(this.buildings);


        this.closestRocket = this.calcClosestRocket();
        //if game is over, display game over text
        //and mutate NN
        if(this.isGameOver){
          push();
          translate(width/2, height/2);
          textSize(72);
          textAlign(CENTER);
          fill(0);
          text("Game Over", 0, 0);
          pop();
          //noLoop();
          //this.mutateNN();
          //this.resetSketch();
        }
      }

      if(this.displayed){
        background(200);
        this.gun.show();
        this.showArr(this.rockets);
        this.showArr(this.bullets);
        this.showArr(this.buildings);

        //display score in top left corner
        textSize(32);
        fill(0);
        text(this.score, 10, 30);
      }
    }
  }

  display(){
    if(this.displayed){
      this.displayed = false;
      this.canvas.hide();
    } else {
      this.displayed = true;
      this.canvas.show();
    }
  }


  resetSketch(){
    this.buildings = [];
    this.rockets = [];
    this.isGameOver = false;
    this.gun = new Gun(this);
    this.score = 0;


    //Create buildings

    for(var i = 0; i < this.numBuildings; i++){
      this.buildings.push(new Building(100+width/this.numBuildings * i, this));
    }

    //Create initial rockets
    for(var j = 0; j < this.numRockets; j++){
      this.rockets.push(new Rocket(this));
    }

  }

  mutateNN(){
    $.ajax({
      url: "http://127.0.0.1:5000/model/mutate",
      data: "data=mutate",
      dataType: 'json',
      async: false,
      success: function(){
        this.generation += 1;
        console.log("Current Generation: " + this.generation);
      },
    });
  }

  // if object in array a goes outside the border of the window + a margin (account for rocket start above the screen), remove it from the array
  isOffscreen(a){
    var margin = 100;
    for(var i = a.length - 1; i >= 0; i--){
      if(a[i].pos.x <= 0 - margin || a[i].pos.x >= width + margin || a[i].pos.y <= 0 - margin|| a[i].pos.y >= height + margin){
        a.splice(a.indexOf(a[i]), 1);
      }
    }
  }

  calcClosestRocket(){
    let best = this.rockets[0];
    for(let i = 0; i < this.rockets.length; i++){
      if(this.rockets[i].distFromGun < best.distFromGun){
        best = this.rockets[i];
      }
    }
    return best
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
