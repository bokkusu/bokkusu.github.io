var piece = null;
var pieceXY = [0,0];
var lastFrame = new Date().getTime();


// https://developer.mozilla.org/en-US/docs/Games/Anatomy

window.main = function () {
  window.requestAnimationFrame( main );
  
  // Whatever your main loop needs to do.
  update();
  redraw();
};

main(); //Start the cycle.

function update() {
  var curTime = new Date().getTime();
  
  if (curTime - lastFrame < 500) {
    return;
  }
  lastFrame = curTime;
  if (piece == null) {
    piece = getPiece();
    pieceXY = [3,0];
  }
  else {
    var x = pieceXY[0];
    var y = pieceXY[1];

    for (var j = 0; j < piece.length; ++j) {
      for (var i = 0; i < piece[j].length; ++i) {
        board[y+i][x+j] = 0;
      }
    }

    y = y + 1;
    pieceXY = [x,y];

    if ((y + piece[0].length) < board[0].length)
    {
      for (var j = 0; j < piece.length; ++j) {
        for (var i = 0; i < piece[j].length; ++i) {
          board[y+i][x+j] = 1;
        }
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
function spiece() { return  [[0,1,1],[1,1,0]];}
function lpiece() { return  [[0,0,1],[1,1,1]];}
function jpiece() { return  [[1,0,0],[1,1,1]];}
function opiece() { return  [[1,1],[1,1]];}
function ipiece() { return  [[1,1,1,1]];}
function tpiece() { return  [[0,1,0],[1,1,1]];}
