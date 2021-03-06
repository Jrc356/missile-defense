class Building{
    constructor(posx, game){
      this.game = game
      this.health = this.game.buildingHealth;
      this.pos = posx;
      this.isDestroyed = false;
      this.height = this.health*20;
      this.width = 40;
    }

    update(){
      this.height = this.health*20;
      if (this.health == 0){
        this.isDestroyed = true;
      }
    }

    show(){
      if(!this.isDestroyed){
        push();
        translate(0, height+this.height/2);
        //color buildings by health
        if(this.health < this.game.buildingHealth){
          if(this.health/this.game.buildingHealth <= .25){
            fill(255, 0, 0);
          } else if (this.health/this.game.buildingHealth <= .50 && this.health/this.game.buildingHealth > .25) {
            fill(0, 0, 255);
          } else if (this.health/this.game.buildingHealth <= .75 && this.health/this.game.buildingHealth > .5) {
            fill(0, 255, 0);
          }
        } else {fill(0);}

        rectMode(CENTER);
        rect(this.pos, -this.height, this.width, this.height);
        pop();
      }
    }

}
