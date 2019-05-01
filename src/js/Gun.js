class Gun{
    constructor(game){
      this.game = game
      this.angle = 0;
      this.rotationSpeed = 0.05;
      this.height = 30;

    }

    update(){
      if (frameCount <= 10){
      } else {
        this.angle += this.botControl([this.game.closestRocket.pos.x,
                                        this.game.closestRocket.pos.y,
                                        this.game.closestRocket.vel.x,
                                        this.game.closestRocket.vel.y,
                                        this.angle]);

        this.angle = constrain(this.angle, -1, 1);
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
        url: "http://127.0.0.1:5000/model/predict",
        data: "data=" + params.join('+') + "&model=" + this.game._id,
        dataType: 'json',
        async: false,
        success: function(data){
          moves = data['result'][0][0];
        },
      });

      //console.log(moves);

      if(moves[1] >= .5){
        this.game.bullets.push(new Bullet(width/2, height-1, this.game));
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
