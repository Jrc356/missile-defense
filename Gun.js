class Gun{
    constructor(){
      this.angle = 0;
      this.rotationSpeed = 0.05;
      this.height = 30;

    }

    update(){
      this.angle += this.control();
      this.angle = constrain(this.angle, -PI/2, PI/2);
    }

    control(){
      if(keyIsDown(LEFT_ARROW)) {
        return -this.rotationSpeed;
      } else if(keyIsDown(RIGHT_ARROW)){
        return this.rotationSpeed;
      } else if(keyIsDown(71)){
        this.botControl()
      }
      else {return 0}

    }

    botControl(){
      $.ajax({
        url: "model.py",
      }).done(function(data){
        console.log(data)
      })
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
