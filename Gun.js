class Gun{
    constructor(){
      this.angle = 0;
      this.rotationSpeed = 0.05;
      this.height = 30;

    }

    update(){
      if (frameCount <= 10){
      } else {
        this.angle += this.botControl([closestRocket.pos.x,
                                        closestRocket.pos.y,
                                        closestRocket.vel.x,
                                        closestRocket.vel.y,
                                        this.angle]);

        this.angle = constrain(this.angle, -PI/2, PI/2);
      }
    }

    control(){
      if(keyIsDown(LEFT_ARROW)) {
        return -this.rotationSpeed;
        } else if(keyIsDown(RIGHT_ARROW)){
          return this.rotationSpeed;
        }

      else {return 0}

    }

    botControl(params){
      let moves;
      $.ajax({
        url: "http://127.0.0.1:5000/model",
        data: "data=" + params.join('+'),
        dataType: 'json',
        async: false,
        success: function(data){
          moves = data['result'][0];

        },
      });

      //console.log(moves);

      if(moves[1] >= .5){
        bullets.push(new Bullet(width/2, height-1));
      }


      if (moves[0] >= .5){
        return this.rotationSpeed;
      } else {
        return -this.rotationSpeed;
      }

      // if (moves[0] >= .67){
      //   return this.rotationSpeed;
      // } else if(moves[0] < .67 && moves[1] >= .33) {
      //   return -this.rotationSpeed;
      // } else{return 0}
    }

    show(){
      push();
      fill(0);
      translate(width/2, height);
      ellipse(0, 0, 30, 30);
      rotate(this.angle);
      rect(-5, -this.height, 10, this.height);
      pop();
    }

}
