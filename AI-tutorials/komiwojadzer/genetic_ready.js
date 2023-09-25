
const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];

let antsNumber = 5;
let maxAntsNumber = antsNumber * 10;
let endGeneration = 10;
let ants = [];
let graphObj;
let graph;
let startNode;
let nodeSize;
let nodesSet = new Set();
let maxDistance = Number.MIN_SAFE_INTEGER;
let minDistance = Number.MAX_SAFE_INTEGER;
let medium = 0;

class Ant {
  constructor(start) {
    this.gene = start;
    this.distance = 0;
  }
  println() { console.log(this.gene.join(' ') + ' distance: ' + this.distance); }
}

function main() {
  for (const nr of arr) {
    if (nr > 20) continue;
    antsNumber = Math.floor(3*nr * nr+ nr);
    maxAntsNumber = antsNumber * 4;
    endGeneration = Math.ceil(nr * nr / 4);
    ants = [];
    graphObj = graphCreator.createGraph(nr);
    graph = graphObj.g;
    startNode = graphObj.f;
    nodeSize = graphObj.s.length;
    nodesSet = graphObj.s;
    //console.log(nodesSet);
    maxDistance = Number.MIN_SAFE_INTEGER;
    minDistance = Number.MAX_SAFE_INTEGER;

    //let testAnt = ['B', 'C', 'D', 'F', 'G', 'H', 'E', 'A'];
    //let testAnt2 = ['E', 'H', 'D', 'C', 'F', 'B', 'G', 'A'];
    //let ant = new Ant(testAnt);
    //checkDistance(ant)
    //let ant2 = new Ant(testAnt2);
    //checkDistance(ant2);
    //continue;


    createRandomGeneration(nodesSet);
    _findMaxMinDistance();
    printBestAnts();
    console.log('START file number %d from %s', nr, startNode);
    console.log('Started generation has %d ants', ants.length);
    console.log('antsNumber %d, maxAntsNumber %d, endGeneration %d', antsNumber, maxAntsNumber, endGeneration);
    printBestAnts();
    for (let generation = 2; generation < endGeneration; generation++) {
      evolution();
      //killAnts();
      surrvive();
      //printBestAnts();
    }

    console.log('there is %d ant at end', ants.length);
    //printAnts();
    printBestAnts();

  }
}

main();

function createRandomGeneration(nodesSet) {
  let nodes = [];
  for (const el of nodesSet.values()) {
    nodes.push(el);
  }

  for (let i = 0; i < antsNumber; i++) {
    let ant = new Ant(_mkGene(nodes));
    ant.distance = checkDistance(ant);
    ants.push(ant);
  }
  _findMaxMinDistance();
  //ants = ants.sort((a1, a2)=> {if(a1.distance > a2.distance) return 1; else return -1;});
}

function _findMaxMinDistance() {
  maxDistance = Number.MIN_SAFE_INTEGER;
  minDistance = Number.MAX_SAFE_INTEGER;
  medium = 0;
  for (let i = 0; i < ants.length; i++) {
    if (maxDistance < ants[i].distance) maxDistance = ants[i].distance;
    if (minDistance > ants[i].distance) minDistance = ants[i].distance;
    medium += ants[i].distance;
  }
  medium /= ants.length;
}

function _mkGene(nodes) {
  let gene = [];
  let nmbs = [];
  for (let i = 1; i < nodes.length; i++) nmbs.push(i);
  //console.log(nmbs.length);
  let i = 0;
  while (nmbs.length > 0) {
    i = Math.ceil(Math.random() * (nmbs.length)) - 1;
    //console.log(i + ' ' + nmbs[i]);
    gene.push(nodes[nmbs[i]]);
    nmbs.splice(i, 1);
  }
  gene.push(nodes[0]);
  //console.log(gene);

  return gene;
}

function evolution() {
  _findMaxMinDistance();
  //console.log('start evolution');
  if(ants.length == 0) {
    console.log("NO ANTS!!!!!");
    return;
  }
  let delta = maxDistance - minDistance;
  let loops = maxAntsNumber*5;
  let i = 0;
  while (true) {
    let adoption = countAdoption(ants[i].distance, delta);
    //console.log('adoption %d, distance %d, max %d, min %d', adoption, ants[i].distance, maxDistance, minDistance);

    if (Math.random() < adoption) {
      let a = new Ant(Array.from(ants[i].gene));
      _muteGene(a);
      a.distance = checkDistance(a);
      if(a.distance < medium) ants.push(a);
      //console.log('evolve mutate distance %d', a.distance);
      
    }
    if(Math.random() < adoption*0.6){
      ants.push(ants[i]);
    }
    
    i++;
    i %= ants.length;
    if (maxAntsNumber < ants.length) break;
    if (loops-- <= 0) break;
  }

}
/*
function killAnts() {
  console.log('start killing ');
  _findMaxMinDistance();
  let delta = maxDistance - minDistance;
  let newAnts = [];
  let adoption = 0;
  while (true) {
    for (let i in ants) {
      adoption = (maxDistance - ants[i].distance) / delta;
      if (Math.random() < adoption) {
        newAnts.push(ants[i])
        //ants.splice(i, 0);
        if (howManyToSurrvive <= newAnts.length) break;
      }
      if (howManyToSurrvive <= newAnts.length) break;
    }
  }
  ants = newAnts;
}
*/

function surrvive() {
  //console.log('start survive');
  if(ants.length == 0) {
    console.log("NO ANTS!!!!!");
    return;
  }
  _findMaxMinDistance();

  let delta = maxDistance - minDistance;
  if(delta == 0) delta = 1;
  let newAnts = [];
  let i = 0;
  let turn = 1;
  while(true){
    let adoption = countAdoption(ants[i].distance, delta);
    //console.log('adoption: %d, delta %d', adoption, delta);
    if(Math.random() < adoption*turn){
      newAnts.push(ants[i]);
    }
    i++;
    if(i % ants.length == 0) {
      i = 0;
      turn += 0.2;
    }
    if(newAnts.length >= antsNumber) break;
    if(turn > 10) break;
  }
  //console.log('to many good ants? %d', newAnts.length);
  ants = newAnts;
}

function countAdoption(distance, delta){
    return 0.5+0.5*((medium - distance) / delta);

}

function printAnts() {
  for (let i in ants) ants[i].println();
}

function printBestAnts() {
  console.log('best ants: min %d max %d all ants %d', minDistance, maxDistance, ants.length);
  _findMaxMinDistance();
  for (let i = 0; i < ants.length; i++) {
    if (ants[i].distance == minDistance) {
      ants[i].println();
      break;
    }
  }
}

function checkDistance(ant) {
  let begin = startNode;
  let d = 0;
  for (const g of ant.gene) {
    d += graphCreator.distance(begin, g, graph);
    //console.log('from %s to %s distance sum %d', begin, g, d);
    begin = g;
  }
  return d;
}

function _muteGene(ant) {
  let nr = Math.ceil(ants.length / 2 * Math.random());
  let tmp = '';
  let b = 0;
  let e = 0;
  for (let i = 0; i < nr; i++) {
    b = Math.floor(Math.random() * (ant.gene.length - 1));
    e = Math.floor(Math.random() * (ant.gene.length - 1));
    if (b != e) {
      //console.log('mute from %d to %d', b, e);
      tmp = ant.gene[e];
      ant.gene[e] = ant.gene[b];
      ant.gene[b] = tmp;
    }
  }
}
