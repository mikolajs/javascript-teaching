class Graph {
  constructor(name, edges) {
    this.name = name;
    this.id = -1;
    this.edges = [];
    this.edges.push(edges);
    this.distance = 0;
  }

  printA() {
    console.log('%s : %d', this.name, this.edges.length);
  }
  printFull(){
    console.log('Name: %s, id: %d, edges: %s', this.name, this.id, this.edges.map(x => '['+x.join(',')+']').join(','));
  }
}

module.exports = Graph