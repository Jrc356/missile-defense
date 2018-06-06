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
        var d = dist(this.pos.x, this.pos.y, a[i].pos.x, a[i].pos.y);
        if(d <= a[i].width){
          a.splice(a.indexOf(a[i]), 1);
          this.hasHit = true;
        }
      }
    }
  }

  show(){
    push();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 5);
    pop();
  }
}
