
const Wolf = require('./src/wolf.js');
const Deer = require('./src/deer.js');
const TheWorld = require('./src/theworldtest.js');
const {execSync} = require('child_process');
const DeerMoving = require('./src/deermoving.js');
const WolfMoving = require('./src/wolfmoving.js');

const deer = new Deer();
const wolf = new Wolf();
const world = new TheWorld();
const deerMoving = new DeerMoving(world);
const wolfMoving = new WolfMoving(world);
//deer.test();
//wolf.test();
let day = 1;
for(let i = 0; i < 2000; i++){
  //world.printWorld();
  deerMoving.nextTurn();

  if(i % 15 == 0) {
    console.log('end of day %d :-----------------------------------------------------------', day);
    day++;
    world.growPlants();
    deerMoving.nextDay();
    world.countGrass();
    deerMoving.printInfo();
    execSync('sleep 0.01');
  }
}
world.printWorld();
deerMoving.printInfo();
deerMoving.printAnimals();
wolfMoving.printInfo();
wolfMoving.printAnimals();

