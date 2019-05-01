class Bullet{
  constructor(posx, posy, game){
    this.game = game;
    this.pos = createVector(posx, posy);
    this.vel = createVector();
    this.vel.x = sin(this.game.gun.angle);
    this.vel.y = -cos(this.game.gun.angle);
    this.vel.mult(5);
    this.hasHit = false;
  }

  update(){
    this.pos.add(this.vel)
  }

  hasCollided(a){
    if(a[0] != null){
      for(var i = a.length-1; i >= 0; i--){
        var d = dist(a[i].pos.x, a[i].pos.y, this.pos.x, this.pos.y) + this.game.COLLISION_BUFFER;
        if(d <= a[i].width){
          a.splice(a.indexOf(a[i]), 1);
          this.hasHit = true;
        }
      }
    }
  }

  show(){
    push();
    translate(this.pos.x, this.pos.y)
    fill(0);
    ellipseMode(CENTER)
    ellipse(0, 0, 5, 5);
    pop();
  }
}
