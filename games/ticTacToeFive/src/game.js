var B = require("./board.js");

class Game {

  constructor(){
    this.size = 10;
    this.board = new B.Board(this.size);
    this._randInsert();
  }

  show(){
    this.board.printBoard();
  }

  _randInsert(){
    this.board.insert(1,1, 'x');
    this.board.insert(1,2, 'o');
    this.board.insert(1,3, 'x');
    this.board.insert(1,4, 'o');
    this.board.insert(2,1, 'x');
    this.board.insert(3,2, 'o');

  }
}

module.exports.Game = Game;
