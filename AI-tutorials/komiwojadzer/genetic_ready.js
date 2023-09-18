
const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
const { start } = require('repl');
let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];

let antsNumber = 5;
let ants = [];
let graphObj = graphCreator.createGraph(8);
let graph = graphObj.g;
let startNode = graphObj.f;
let nodeSize = graphObj.s;
let nodesSet = new Set();

class Ant {
  constructor(start) {
    this.gene = start; 
    this.distance = 0;
  }
  println() { console.log(this.gene.join(' ') + ' distance: ' + this.distance); }
}

function main() {
  for (const nr of arr) {
    if(nr != 8) continue;
    antsNumber = nr*10;
    ants = [];
    graphObj = graphCreator.createGraph(nr);
    graph = graphObj.g;
    startNode = graphObj.f;
    nodeSize = graphObj.s.length;
    nodesSet = graphObj.s;
    console.log(nodesSet);
    createRandomGeneration(nodesSet);
    console.log('START file number %d from %s', nr, startNode);
    for (let generation = 2; generation < nodeSize + 1; generation++) {
      evolution();
      killAnts();
      //printAnts();
      //console.log('there is %d ants in generation %d', ants.length, generation);
    }

     printAnts();

  }
}

main();


function createRandomGeneration(nodesSet) {
  let nodes = [];
  for(const el of nodesSet.values()) {
    nodes.push(el);
  }

  for(let i = 0; i < antsNumber; i++) {
    let ant = new Ant(_mkGene(nodes));
    ant.distance = checkDistance(ant);
    ants.push(ant);
  }
  ants = ants.sort((a1, a2)=> {if(a1.distance > a2.distance) return 1; else return -1;});
}

function _mkGene(nodes){
  let gene = [];
  let nmbs = [];
  for(let i = 0; i < nodes.length; i++) nmbs.push(i);
  //console.log(nmbs.length);
  let i = 0;
  while(nmbs.length > 0){
    i = Math.floor(Math.random()*nmbs.length);
    //console.log(i + ' ' + nmbs[i]);
    gene.push(nodes[nmbs[i]]);
    nmbs.splice(i, 1);
  }
  //console.log(gene);
  return gene;
}

function evolution(){
   //delete 50% minimal
   //copy 25% with mutation
   //create 25% crossed genes
}

function killAnts() {
}

function printAnts() {
  for (let i in ants) ants[i].println();
}

function checkDistance(ant) {
  let begin = startNode;
  let d = 0;
  for(const g of ant.gene){
    d += graphCreator.distance(begin, g, graph);
    begin = g;
  } 
  return d;
}
