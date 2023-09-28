
const graphCreator = require('./graphs.js');
const Graph = require('./graph.js');
const timer = require('./time_reg.js');
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
let timers;
let bestAnt;

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
        timers = new timer.TimeRegister(5);
        //console.log(timers);
        for (let i in timer.timers) console.log(timers.timers[i]);
        antsNumber = Math.floor(nr * nr);
        maxAntsNumber = antsNumber * 4;
        endGeneration = Math.ceil(nr * nr / 10);
        ants = [];
        graphObj = graphCreator.createGraph(nr);
        graph = graphObj.g;
        startNode = graphObj.f;
        nodeSize = graphObj.s.length;
        nodesSet = graphObj.s;
        //console.log(nodesSet);
     

        //let testAnt = ['B', 'C', 'D', 'F', 'G', 'H', 'E', 'A'];
        //let testAnt2 = ['E', 'H', 'D', 'C', 'F', 'B', 'G', 'A'];
        //let ant = new Ant(testAnt);
        //checkDistance(ant)
        //let ant2 = new Ant(testAnt2);
        //checkDistance(ant2);
        //continue;



        console.log('=================');
        console.log('START file number %d from %s', nr, startNode);
        console.log('antsNumber %d, maxAntsNumber %d, endGeneration %d', antsNumber, maxAntsNumber, endGeneration);
        console.log('there is %d ant at begin', ants.length);
        createStartAnt(nodesSet);
        bestAnt = ants[0];
        for (let generation = 1; generation < endGeneration; generation++) {
            ants = [];
            timers.start(1);
            createRandomGeneration(nodesSet);

            timers.stop(1);
            for (let i in ants) {
                if (bestAnt.distance > ants[i].distance) {
                    bestAnt = ants[i];
                    break;
                }
            }
            bestAnt.println();
        }
        //printBestAnts();
    }

    console.log('there is %d ant at end', ants.length);
    console.log('createRandomGeneration time %d', timers.getTime(1));
    //printAnts();
    ants = [];
    ants.push(bestAnt);
    bestAnt.println();
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
    //ants = ants.sort((a1, a2)=> {if(a1.distance > a2.distance) return 1; else return -1;});
}

function createStartAnt(nodesSet) {
    let nodes = [];
    for (const el of nodesSet.values()) {
        nodes.push(el);
    }
    let ant = new Ant(_mkGene(nodes));
    ant.distance = checkDistance(ant);
    ants.push(ant);

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

function printAnts() {
    for (let i in ants) ants[i].println();
}

function printBestAnts() {
    console.log('best ants: min %d max %d all ants %d', minDistance, maxDistance, ants.length);
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
