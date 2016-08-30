var piece = null;
var pieceXY = [0,0];
var lastUpdate = new Date().getTime();
var lastFrame = new Date().getTime();


// https://developer.mozilla.org/en-US/docs/Games/Anatomy

window.main = function () {
  window.requestAnimationFrame( main );
  
  // Whatever your main loop needs to do.
  update();
  
  var curTime = new Date().getTime();
  
  if ((curTime - lastFrame) > 16) {
    redraw();
    lastFrame = curTime;
  }
};

main(); //Start the cycle.

function update() {
  var curTime = new Date().getTime();
  
  if ((curTime - lastUpdate) < 500) {
    return;
  }

  lastUpdate = curTime;
  
  if (piece == null) {
    piece = getPiece();
    pieceXY = [3,0];
  }
  else {
    var x = pieceXY[0];
    var y = pieceXY[1];

    y = y + 1;
    pieceXY = [x,y];



    if ((y + piece.length) <= board.length)
    {
      y = y - 1;
    
      for (var j = 0; j < piece.length; ++j) {
        for (var i = 0; i < piece[j].length; ++i) {
          if (piece[j][i] != 0)
          {
            board[y+j][x+i] = 0;
          }
        }
      }
      
      y = y + 1;

      var blocked = false;
      loop1: for (var j = 0; j < piece.length; ++j) {
        for (var i = 0; i < piece[j].length; ++i) {
          if (piece[j][i] != 0 && board[y+j][x+i] != 0)
          {
            console.log("piece blocked");
            blocked = true;
            break loop1;
          }
        }
      }
      
      if (!blocked)
      {
        for (var j = 0; j < piece.length; ++j) {
          for (var i = 0; i < piece[j].length; ++i) {
            if (piece[j][i] != 0)
            {
              board[y+j][x+i] = piece[j][i];
            }
          }
        }
      }
      else
      {
        y = y - 1;
        for (var j = 0; j < piece.length; ++j) {
          for (var i = 0; i < piece[j].length; ++i) {
            if (piece[j][i] != 0)
            {
              board[y+j][x+i] = piece[j][i];
            }
          }
        }
        piece = null;
      }
    }
    else
    {
      piece = null;
    }
  }
}

function getPiece() {
  var min = Math.ceil(0);
  var max = Math.floor(7);
  var piece = Math.floor(Math.random() * (max - min)) + min;
  switch (piece) {
    case 0: return zpiece();
    case 1: return spiece();
    case 2: return lpiece();
    case 3: return jpiece();
    case 4: return opiece();
    case 5: return ipiece();
    case 6: return tpiece();
  }
}

function zpiece() { return  [[1,1,0],[0,1,1]];}
function spiece() { return  [[0,2,2],[2,2,0]];}
function lpiece() { return  [[0,0,3],[3,3,3]];}
function jpiece() { return  [[4,0,0],[4,4,4]];}
function opiece() { return  [[5,5],[5,5]];}
function ipiece() { return  [[6,6,6,6]];}
function tpiece() { return  [[0,7,0],[7,7,7]];}
