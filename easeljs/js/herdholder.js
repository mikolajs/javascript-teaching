
function HerdHolder(sheep){
  this.sheep = sheep;
  this.productive = 0;
  this.sheepUnits = [];
  this.herds = 0;
  this.maxHerds = 5;
  this.milk = 0;
  this.meat = 0;
  this.wool = 0;
  this.sheepWas = 0;

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSound("sounds/sheep.mp3", "bloat");

  this.playBloatSound = function() {
      var instance = createjs.Sound.play("bloat");
      //instance.on("complete", this.handleComplete, this);
      instance.volume = 0.5;
  }

  this.manageHerd = function() {
    for(var i = 0; i < this.sheepUnits.length; i++){
      this.productive += this.sheepUnits[i].obj.grow();
      this.sheep += this.sheepUnits[i].obj.count;
    }
    this.sheepWas = this.sheep;
    console.log("productive " +  this.productive + " sheeps: " + this.sheep);
    this.milk += Math.floor(this.productive*1);
    this.wool += Math.floor(this.productive*0.2);
    this.productive = 0;
    var newHerdsNumber = Math.ceil(this.sheep / 90);
    //console.log("new herds number: " + newHerdsNumber);
    if(newHerdsNumber > this.maxHerds) {
      var forSlaughter = this.sheep - this.maxHerds * 90;
      console.log("sheep slaughte: " +  forSlaughter);
      this.sheep -= forSlaughter;
      this.meat += 30*forSlaughter;
    }
    newHerdsNumber = Math.ceil(this.sheep / 90);
    if(newHerdsNumber > this.sheepUnits.length){
      var us = new Unit(new Sheep(0));
      us.setHex(map.lookForGrass()); //global function???
      map.setOccupied(new Point(us.x, us.y));
      this.sheepUnits.push(us);
      this.herds++;
      this.playBloatSound();
    } else if(newHerdsNumber < this.sheepUnits.length) {
        for(var i = newHerdsNumber; i < this.sheepUnits.length; i++){
          this.sheepUnits[i].obj.delSheep();
          map.freeOccupied(new Point(this.sheepUnits.x, this.sheepUnits.y));
          this.herds--;
        }
        this.sheepUnits.slice(0, newHerdsNumber);
    }
    for(var i = 0; i < this.sheepUnits.length; i++){
        if(this.sheep >  90) {
          this.sheepUnits[i].obj.count =  90;
          this.sheep -= 90;
        } else {
          this.sheepUnits[i].obj.count = this.sheep;
          this.sheep = 0
        }
      }
      //console.log("herds.length: " +  this.sheepUnits.length + " herds: " + this.herds);
    }

    this.displayHerds = function(){
      for(var i = 0; i < this.sheepUnits.length; i++)
      this.sheepUnits[i].obj.displayStay(stage);
    }

    this.mkEat = function() {
        for(var i = 0; i < this.sheepUnits.length; i++) {
          var demand = this.sheepUnits[i].obj.getDemand();
          var p = new Point(this.sheepUnits[i].x, this.sheepUnits[i].y);
            //console.log("amount of grass on pool: " + map.getAmountGrass(p) + " but now damand is: " +sheepUnits[i].obj.getDemand() );
            var newPoint = map.lookForGrass(p, demand);
            map.freeOccupied(new Point(this.sheepUnits[i].x, this.sheepUnits[i].y));
            this.sheepUnits[i].setHex(newPoint);

          //console.log("demand when eat: " + demand + " at point " + p.x + ", " + p.y);
          var amount = map.eatGrass(demand, p);
          this.sheepUnits[i].obj.mkEat(amount);
        }
    }

    this.getResources = function(){
      var res = new Object();
      res.milk = this.milk;
      res.wool = this.wool;
      res.meat = this.meat;
      res.count = this.sheepWas;
      //console.log("this.milk " + this.milk + " res.milk " + res.milk);
      return res;
    }

}
