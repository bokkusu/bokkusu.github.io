var square = null;
var board = [[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];

var selected = null;

canvas.addEventListener('click', clickHandler);
canvas.onmousedown = function(){return false;};
canvas.onmousemove = function(){return false;};

var dirty = [];

init();
initDebugOptions();
redraw();

var coords1=null;

function clickHandler(event) {
   var x = event.pageX - canvas.offsetLeft,
       y = event.pageY - canvas.offsetTop;
   if (debug) console.log("clicked: " + x + ", " + y);
   //redraw();
}

function initDebugOptions() {
  debug = false;
}

function init() {
   done = false;
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d');
   
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   var canvasW = canvas.width;
   var canvasH = canvas.height;
   var aspectRatio = 1/1; // width/height
   
   var drawW;
   var drawH;
   
   if (canvasW < canvasH)
   {
      drawW = canvasW * 0.80;
      drawH = drawW * 1/(aspectRatio);
   }
   else
   {
      drawH = canvasH * 0.80;
      drawW = drawH * aspectRatio;
   }
   
   if (false && drawW < 400)
   {
      drawW = 400;
      drawH = drawW * 1/(aspectRatio);
   }
   
   offsetX = (canvasW - drawW)/2;
   offsetY = (canvasH - drawH)/2;
   
   var tesX = drawW / board[0].length;
   square = new Square(tesX/2);
   
   console.log("canvasW=" + canvasW);
   console.log("canvasH=" + canvasH);
   console.log("drawW=" + drawW);
   console.log("drawH=" + drawH);
   console.log("board.length=" + board.length);
   console.log("board[0].length=" + board[0].length);
   
   var n = 0;
/*   for (var j = 0; j < board.length; ++j)
   {
      for (var i = 0; i < board[j].length; ++i)
      {
         board[j][i] = ++n % 8;
      }
   }
   */
      outputBoard();

}

function redraw() {
   canvas.width = canvas.width;
   drawBoard(context, board, offsetX, offsetY);
   outputBoard();
}

function outputBoard() {
   outputBoard(board);
}
function outputBoard(board) {
   console.log("board=");
   var out = "";
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
         out += board[j][i];
         out += ' ';
      }
      out += '\n';
   }
   console.log(out);
}

function getCopyOfBoard()
{
    var newBoard = [];
    
    for (var j = 0; j < board.length; ++j)
    {
        newBoard[j] = [];

        for (var i = 0; j < board[j].length; ++j)
        {
            newBoard[j][i] = board[j][i]l
        }
    }
    
    newBoard[1][1] = 1;
    
    return newBoard;
}

function drawCell(context, board, coords, xOffset, yOffset, color, line, fill) {
   var curX, curY;
   
   curX = xOffset + coords[0] * square.sidelen;
   curY = yOffset + coords[1] * square.sidelen;
   
   drawSquare(context, color, curX, curY, square, line, fill);
}

function drawText(context, board, coords, xOffset, yOffset, color, line, fill, msg) {
   var curX, curY;
   
   curX = xOffset + hex.b + coords[0] * hex.tesslenx;
   curY = yOffset + hex.sidelen + coords[1] * hex.tessleny;
   
   if (coords[1] % 2 == 1) {
      curX += hex.b;
   }
      context.fillStyle = "#DDDDDD";
      //context.fillStyle = "#FEEFFE";
      context.font = "8pt Arial";
      context.fillText(msg, curX-10, curY-12);
}

function drawBoard(context, board, xOffset, yOffset) {
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
         var color = 'lightgrey';
         var fill = true;
         switch(board[j][i])
         {
            case 0:
               color = 'lightgrey';
               fill = false;
               break;
            case 1:
               color = '#90C3D4';
               break;
            case 2:
               color = '#59B9D9';
               break;
            case 3:
               color = '#21ADDB';
               break;
            case 4:
               color = '#1A89AD';
               break;
            case 5:
               color = '#3892B0';
               break;
            case 6:
               color = '#5B9DB3';
               break;
            case 7:
               color = '#45788A';
               break;
         }
        drawCell(context, board, [i, j], xOffset, yOffset, color, 1, fill);
        //print text
        if (debug) {
          drawText(context, board, [i, j], xOffset, yOffset, color, 1, false, "" + i + "," + j + ":" + board[j][i]);
        }
      }
   }
}

/* Draws a circle */
function drawCircle(context, color, x, y, radius, line, fill) {
   context.strokeStyle = color;
   context.lineWidth = line || 1;
   context.beginPath();
   context.arc(x, y, radius, 0, 2*Math.PI, false);
   context.stroke();
   context.closePath();
   if (fill) {
      context.fillStyle = color;
      context.fill();
   }
}

/* Draws a hex with corners pointed up/down */
function drawHex(context, color, x, y, hex, line, fill) {
   context.strokeStyle = color;
   context.lineWidth = line || 1;
   
   var curx = x-hex.b;
   var cury = y-hex.a;

   context.beginPath();
   context.moveTo(curx, cury);
   context.lineTo(curx+=hex.b, cury-=hex.a);
   context.lineTo(curx+=hex.b, cury+=hex.a);
   context.lineTo(curx, cury+=hex.sidelen);
   context.lineTo(curx-=hex.b, cury+=hex.a);
   context.lineTo(curx-=hex.b, cury-hex.a);
   context.lineTo(curx, cury-=hex.sidelen);
   context.closePath();
   context.stroke();
   
   if (fill) {
      context.fillStyle = color;
      context.fill();
   }
}

function drawSquare(context, color, x, y, square, line, fill) {
   context.strokeStyle = color;
   context.lineWidth = line || 1;
   
   var curx = x-square.sidelen/2;
   var cury = y-square.sidelen/2;

   context.beginPath();
   context.moveTo(curx, cury);
   context.lineTo(curx+=square.sidelen, cury);
   context.lineTo(curx, cury+=square.sidelen);
   context.lineTo(curx-=square.sidelen, cury);
   context.lineTo(curx, cury-=square.sidelen);
   context.closePath();
   context.stroke();
   
   if (fill) {
      context.fillStyle = color;
      context.fill();
   }
}

function Square(sidelen)
{
   this.sidelen = sidelen;
   this.lineWidth = 1;
   this.sidelen = this.sidelen - this.lineWidth;
}

function Hex(sidelen)
{
   this.sidelen = sidelen;
   this.a = sidelen / 2;
   this.b = sidelen * Math.sin(Math.PI/3);
   this.tesslenx = this.b * 2;
   this.tessleny = this.a * 3;
   
   /*scaling*/
   this.lineWidth = 1;
   this.sidelen = this.sidelen - this.lineWidth;
   this.a = sidelen / 2;
   this.b = sidelen * Math.sin(Math.PI/3);
}
