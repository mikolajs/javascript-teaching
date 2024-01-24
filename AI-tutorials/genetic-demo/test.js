
const Wolf = require('./src/wolf.js');
const Deer = require('./src/deer.js');
const TheWorld = require('./src/theworldtest.js');
const {execSync} = require('child_process');
const DeerMoving = require('./src/deermoving.js');

const deer = new Deer();
const wolf = new Wolf();
const world = new TheWorld();
const deerMoving = new DeerMoving(world);
//deer.test();
//wolf.test();
for(let i = 0; i < 50; i++){
  world.printWorld();
  deerMoving.nextTurn();
  console.log('%d :----------------------------------------------------------------------------', i);
  if(i % 10 == 0) deerMoving.bornNew();
  execSync('sleep 1');
}