class Rocket{
  constructor(){
    this.width = 50;
    this.isHit = false;
    this.vel = p5.Vector.random2D();
    this.vel.y = Math.floor(random(1, rocketMaxSpeed));
    this.pos = createVector(random(0,width), random(-50, 0));

  }

  update(){
    this.pos.add(this.vel);
    this.hasCollided();
  }

  hasCollided(){
    if(buildings[0] != null){
      for(var i = buildings.length-1; i >= 0; i--){
        var d = dist(this.pos.x, this.pos.y, buildings[i].pos, height-buildings[i].height);
        if(d <= this.width-1){
          buildings[i].health -= 1;
          this.isHit = true;
          break;
        }
      }
    }
  }

  show(){
    push();
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.width/2, this.width);
    pop();
  }

}
