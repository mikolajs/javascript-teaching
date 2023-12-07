const hexlib = require('./hexlib.js');

module.exports = class MapGenerator {
  constructor(r, c, preferences){
   this.R = r;
   this.C = c;
   this.mo = 0.03;
   this.hi = 0.06;//not counted this from around mounts
   this.st = 0.15;
   this.wd = 0.1; //water ??? why wd?
   this.fo = preferences.woods/100.0;
   console.log("generator: " + preferences.woods);
   this.arr = new Array(this.R).fill(0).map(row => new Array(this.C).fill('pl'));
   this.plants = new Array(this.R).fill(0).map(row => new Array(this.C).fill(''));
   let hex = hexlib.hexlib.Hex(this.R, this.C);
   let pathFinder = hexlib.hexlib.PathFinder(hex);
   this.hexLibrary = new hexlib.hexlib.HexLibrary(hex, pathFinder);
   this._makeMountains();
   this._makeRandom('hi');
   this._makeRandom('st');
   this._makeRandom('wd');
   this._mkWoods();
   this._fillGrass();
  }
  getMap() {return this.arr;}

  getPlants(){return this.plants;}

  
  _makeMountains(){
    let loops = 0;
    let all = Math.ceil((this.R * this.C)*this.mo);
    while(all > 0 && loops < 1000){
      loops++;
      //console.log('loops = ' + loops + ' all = ' + all);
      let r = Math.floor(this.R*Math.random());
      let c = Math.floor(this.C*Math.random());
      if(this.arr[r][c] == 'pl') {
        this.arr[r][c] = 'mo';
        all--;
      } else continue;
      let chain = Math.floor(Math.random()*5);
      
      while(all > 0 && chain > 0 && loops < 1000){
      	loops++;
        let neighbours = this.hexLibrary.neighbours(r,c, 1);
        let dir = Math.floor(Math.random()*6);
        //console.log(neighbours);
        if(neighbours.length == 6) {
          r = neighbours[dir][0];
          c = neighbours[dir][1];
          //console.log('mo ' + x + ' ' + y);
          if(this.arr[r][c] == 'pl') {
            this.arr[r][c] = 'mo';
            all--;
            chain--;
          } else continue;
        } else break;
      }
    }
    for(let r in this.arr){
     for(let c in this.arr[r]){
       if(this.arr[r][c] != 'mo') continue;
       let neighbours = this.hexLibrary.neighbours(r,c, 1);
       for(let n in neighbours){
       	  if(this.arr[neighbours[n][0]][neighbours[n][1]] == 'pl') 
       	     this.arr[neighbours[n][0]][neighbours[n][1]] = 'hi';
       }
     }
   }
 }
 
 _makeRandom(what){
   let loops = 0;
   let all = 0;
   if(what == 'hi') all = Math.ceil((this.R * this.C)*this.hi);
   else if(what == 'st') all = Math.ceil((this.R * this.C)*this.st);
   else if(what == 'wd') all = Math.ceil((this.R * this.C)*this.wd);
   while(all > 0 && loops < 5000){
      loops++;
      //console.log('loops = ' + loops + ' all = ' + all);
      let r = Math.floor(this.R*Math.random());
      let c = Math.floor(this.C*Math.random());
      if(this.arr[r][c] == 'pl') {
        this.arr[r][c] = what;
        all--;
      } else continue;
      let group = Math.floor(Math.random()*6);
      
      while(all > 0 && group > 0 && loops < 5000){
      	loops++;
        let neighbours = this.hexLibrary.neighbours(r, c, 1);
        let dir = Math.floor(Math.random()*6);
        //console.log(neighbours);
        if(neighbours.length == 6) {
          r = neighbours[dir][0];
          c = neighbours[dir][1];
          //console.log(what + ' ' + x + ' ' + y);
          if(this.arr[r][c] == 'pl') {
            this.arr[r][c] = what;
            all--;
            group--;
          } else continue;
        } else break;
      }
   }
    
 }

 _randomWoodSize() {
   let r = Math.random()*3
   if(r < 1) return 'os';
   else if(r < 2) return 'om';
   else return 'ol';
 }

 _mkWoods(){
  //console.log('Start create WOODS %d %d %f', this.R, this.C, this.fo);
  let loops = 0;
  let all = Math.ceil((this.R * this.C)*this.fo);
  while(all > 0 && loops < 5000){
     loops++;
     //console.log('woods loops = ' + loops + ' all = ' + all);
     let r = Math.floor(this.R*Math.random());
     let c = Math.floor(this.C*Math.random());

     if(this.arr[r][c] == 'pl' || this.arr[r][c] == 'hi') {
       this.plants[r][c] = this._randomWoodSize();
       all--;
     } else continue;
     let group = Math.floor(Math.random()*4);
     
     while(group > 0 && loops < 5000){
       loops++;
       let neighbours = this.hexLibrary.neighbours(r, c, 1);
       let dir = Math.floor(Math.random()*6);
       //console.log(neighbours);
       if(neighbours.length == 6) {
         r = neighbours[dir][0];
         c = neighbours[dir][1];
         //console.log(what + ' ' + x + ' ' + y);
         if(this.arr[r][c] == 'pl' || this.arr[r][c] == 'hi') {
           this.plants[r][c] = this._randomWoodSize();
           group--;
         } else continue;
       } else break;
     }
  }
 }
  
 _fillGrass(){
  for(let i in this.plants){
    for(let j in this.plants[i]){
      if(this.plants[i][j] == '' && 
        (this.arr[i][j] == 'pl' || this.arr[i][j] == 'hi' || this.arr[i][j] == 'st')){
          this.plants[i][j] = 'gr';
        }
    }
  }
 }

}

