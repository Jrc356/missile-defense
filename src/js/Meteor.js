class Meteor{
  constructor(game){
    this.game = game;
    this.width = 50;
    this.isHit = false;
    this.vel = p5.Vector.random2D();
    this.vel.y = Math.floor(random(1, this.game.meteorMaxSpeed));
    this.pos = createVector(random(0,width), random(-50, 0));
  }

  update(){
    this.pos.add(this.vel);
    this.hasCollided();
  }

  hasCollided(){
    if(this.game.buildings[0] != null){
      for(var i = this.game.buildings.length-1; i >= 0; i--){
        var d = dist(this.pos.x, this.pos.y, this.game.buildings[i].pos, height-this.game.buildings[i].height) + this.game.COLLISION_BUFFER;
        if(d <= this.width-1){
          this.game.buildings[i].health -= 1;
          this.isHit = true;
          break;
        }
      }
    }
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y)
    fill(255);
    ellipseMode(CENTER);
    ellipse(0, 0, this.width/2, this.width);
    pop();
  }

}
