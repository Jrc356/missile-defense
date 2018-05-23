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
        }

      else {return 0}

    }

    botControl(){
      console.log("Calling...");
      $.ajax({
        url: "http://127.0.0.1:5000/model",
        data: "data=1+5+6+3+7",
        dataType: 'json',
        success: function(data){
          console.log(data);
        },
        //error: function(data){console.log(data[0])}
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
