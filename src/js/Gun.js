class Gun{
    constructor(game){
      this.game = game
      this.angle = 0;
      this.rotationSpeed = 0.05;
      this.height = 30;
    }

    update(){
      this.angle += this.control()
      this.angle = constrain(this.angle, -1, 1);
    }

    control(){
      if(keyIsDown(LEFT_ARROW)) {
        return -this.rotationSpeed;
        } else if(keyIsDown(RIGHT_ARROW)){
          return this.rotationSpeed;
        }

      else {return 0}

    }

    show(){
      push();
      fill(0);
      translate(width/2, height);
      ellipseMode(CENTER)
      ellipse(0, 0, 30, 30);
      
      rotate(this.angle);
      rectMode(CENTER)
      rect(0, -this.height, 10, this.height);
      pop();
    }

    fire(){
      this.game.bullets.push(new Bullet(width/2, height, this.game))
    }

}
