
const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
const { start } = require('repl');
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
    antsNumber = nr * 2;
    maxAntsNumber = nr * nr;
    endGeneration = Math.ceil(nr * nr / 5);
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
    console.log('START file number %d from %s', nr, startNode);
    console.log('Started generation has %d ants', ants.length);
    for (let generation = 2; generation < endGeneration; generation++) {
      evolution();
      //killAnts();
      //surrvive();
      printBestAnts();
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
  for (let i = 0; i < ants.length; i++) {
    if (maxDistance < ants[i].distance) maxDistance = ants[i].distance;
    if (minDistance > ants[i].distance) minDistance = ants[i].distance;
  }
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
  let delta = maxDistance - minDistance;
  let newAnts = [];
  let fullLoops = 10;
  while (true) {
    console.log('evolution while true');
    for (let i in ants) {
      let adoption = (maxDistance - ants[i].distance) / delta;
      //console.log('adoption %d, distance %d, max %d, min %d', adoption, ants[i].distance, maxDistance, minDistance);
      if (adoption < 0.5) {
        let a = new Ant(Array.from(ants[i].gene));
        _muteGene(a);
        a.distance = checkDistance(a);
        if (0.5 < (maxDistance - a.distance) / delta) {
          newAnts.push(a);
        } 
      }
      /* if(3*Math.random() < 2*adoption){
         let a = new Ant(ants[i].gene);
         a.distance = ants[i].distance;
         ants.push(a);
       } */
      if (Math.random() < adoption) {
        //console.log('MUTATION adoption %d, distance %d', adoption, ants[i].distance);
        let a = new Ant(Array.from(ants[i].gene));
        _muteGene(a);
        a.distance = checkDistance(a);
        newAnts.push(a);
      }
    }
    if(maxAntsNumber < newAnts.length) break;
    if(fullLoops-- <= 0) break;
  }

}

function killAnts() {
  _findMaxMinDistance();
  let howManyToKill = Math.floor((ants.length - antsNumber) * (0.5 + Math.random()));
  let delta = maxDistance - minDistance;
  while (howManyToKill > 0) {
    for (let i in ants) {
      let adoption = (ants[i].distance - minDistance) / delta;
      if (Math.random() > adoption) {
        ants.splice(i, 0);
        howManyToKill--;
      }
      if (howManyToKill <= 0) break;
    }
  }
}

function surrvive() {
  _findMaxMinDistance();

  let howManyToSurrvive = antsNumber * (0.8 + 0.4 * Math.random());
  let delta = maxDistance - minDistance;
  let newAnts = [];
  for (let i in ants) {
    let adoption = (maxDistance - ants[i].distance) / delta;
    //console.log('adoption; %d, distance %d for suvirrver max %d, min', adoption, ants[i].distance, minDistance, maxDistance);
    if (adoption > 0.9) {
      //console.log('adoption; %d, distance %d for suvirrver', adoption, ants[i].distance);
      newAnts.push(ants[i]);
      howManyToSurrvive--;
    }
  }
  if (howManyToSurrvive <= 0) {
    //console.log('to many good ants? %d', newAnts.length);
    ants = newAnts;
    return;
  }
  for (let i in ants) {
    let adoption = (maxDistance - ants[i].distance) / delta;
    if (adoption > 0.4 && adoption > Math.random()) {
      newAnts.push(ants[i]);
      howManyToSurrvive--;
      if (howManyToSurrvive <= 0) {
        ants = newAnts;
        return;
      }
    }
  }

}

function printAnts() {
  for (let i in ants) ants[i].println();
}

function printBestAnts() {
  //console.log('best ants: min %d max %d all ants %d', minDistance, maxDistance, ants.length);
  _findMaxMinDistance();
  console.log('best ants after MixMax: min %d max %d all ants %d', minDistance, maxDistance, ants.length);
  for (let i = 0; i < ants.length; i++) {
    if (ants[i].distance == minDistance) ants[i].println();
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
  let nr = Math.ceil(2 * Math.random());
  let tmp = '';
  let b = 0;
  let e = 0;
  for (let i = 0; i < nr; i++) {
    b = Math.floor(Math.random() * (ant.gene.length - 1));
    e = Math.floor(Math.random() * (ant.gene.length - 1));
    if (b != e) {
      tmp = ant.gene[e];
      ant.gene[e] = ant.gene[b];
      ant.gene[b] = tmp;
    }
  }
}
