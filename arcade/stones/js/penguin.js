players = [new Player("A"), new Player("M")]

function Player(name) {
   this.name = name;
   this.score = 0;
}

game = new Game();

function Game() {
   this.curTurn = players[0];
   
   this.movedPiece = null;
   this.click = function(coords) {
      if (this.movedPiece == null) {
         //pick up a piece
         if (board[coords[1]][coords[0]] == this.curTurn.name)
         {
            this.movedPiece = coords;
            selected = coords;
         }
      }
      else
      {
         if (isAligned(this.movedPiece, coords))
         {
            board[this.movedPiece[1]][this.movedPiece[0]] = 0;
            board[coords[1]][coords[0]] = this.curTurn.name;
            
            this.movedPiece = null;
            redraw();
            selected = null;
         }
      }
   }
}
