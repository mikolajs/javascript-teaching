
const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
const { start } = require('repl');
let arr = [8, 12, 20, 30, 40, 50, 60, 80, 200];

let antsNumber = 100;
let ants = [];
let graphObj = graphCreator.createGraph(8);
let graph = graphObj.g;
let startNode = graphObj.f;
let nodeSize = graphObj.s;

class Ant {
  constructor(start) {
    this.gene = [];
    this.gene.push(start);
    this.set = new Set();
    this.set.add(start);
  }

  copy(next) {
    let ant = new Ant('');
    ant.gene = Array.from(this.gene);
    ant.gene.push(next);
    ant.set = new Set(ant.gene);
    return ant;
  }
  println() { console.log(this.gene.join('')); }
}

function main() {
  for (const nr of arr) {
    if(nr > 30) continue;
    antsNumber = nr*400;
    ants = [];
    graphObj = graphCreator.createGraph(nr);
    graph = graphObj.g;
    startNode = graphObj.f;
    nodeSize = graphObj.s.size;
    createFirstGeneration();
    console.log('START file number %d from %s', nr, startNode);
    for (let generation = 2; generation < nodeSize + 1; generation++) {
      newGenes();
      killAnts();
      printAnts();
      console.log('there is %d ants in generation %d', ants.length, generation);

    }

      printAnts();

  }
}

main();

function createFirstGeneration() {
  for (const e of graph[startNode].edges) {
    ants.push(new Ant(e[0]));
  }
}

function newGenes() {
  let newAnts = [];
  for (let i = 0; i < ants.length; i++) {
    let lastGene = ants[i].gene[ants[i].gene.length - 1];
    for (let ng of graph[lastGene].edges) {
      if (ants[i].gene.length < nodeSize - 1 && ng[0] == startNode) continue;
      if (!ants[i].set.has(ng[0])) {
        newAnts.push(ants[i].copy(ng[0]));
      }
    }
  }
  ants = newAnts;
}

function killAnts() {
  let i = 0;
  //console.log(ants);
  while (ants.length > antsNumber) {
    i = Math.floor(Math.random() * ants.length);
    ants.splice(i, 1);
  }
}

function printAnts() {
  for (let i in ants) ants[i].println();
}

function checkGeneAnt(ant) {
  let f = false;
  for (const g of ant.gene) {
    f = false;
    for (const n of graph[startNode].edges) {
      if (g == n[0]) {
        f = true;
        startNode = n[0];
        break;
      }
    }
    if (!f) return false;
  }
  return true;
}
