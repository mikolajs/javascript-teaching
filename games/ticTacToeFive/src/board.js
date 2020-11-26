class Board {
   constructor(N){
     this.size = N;
     this.board =  Array(N).fill(null).map(() => Array(N).fill("."));
   }

   insert(r, c, s){
     this.board[r][c] = s;
   }

   get getBoard(){
     return this.board;
   }

  printBoard(){
    for(let i in this.board){
      console.log(this.board[i].join(""));
    }

  }
}
 module.exports.Board = Board;
