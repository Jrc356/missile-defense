class Rocket{
  constructor(game){
    this.game = game;
    this.width = 50;
    this.isHit = false;
    this.vel = p5.Vector.random2D();
    this.vel.y = Math.floor(random(1, this.game.rocketMaxSpeed));
    this.pos = createVector(random(0,width), random(-50, 0));
    this.distFromGun = 0

  }

  update(){
    this.pos.add(this.vel);
    this.hasCollided();
    this.calcGunDistance();
  }

  hasCollided(){
    if(this.game.buildings[0] != null){
      for(var i = this.game.buildings.length-1; i >= 0; i--){
        var d = dist(this.pos.x, this.pos.y, this.game.buildings[i].pos, height-this.game.buildings[i].height);
        if(d <= this.width-1){
          this.game.buildings[i].health -= 1;
          this.isHit = true;
          break;
        }
      }
    }
  }

  calcGunDistance(){
    this.distFromGun = dist(this.pos.x, this.pos.y, width/2, height)
  }

  show(){
    push();
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.width/2, this.width);
    pop();
  }

}
