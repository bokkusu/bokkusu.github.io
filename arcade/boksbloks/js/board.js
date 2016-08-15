var hex = null;
var board =
[[1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
 [1,1,"A",1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
 [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
 [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1]];

var selected = null;

canvas.addEventListener('click', clickHandler);
canvas.onmousedown = function(){return false;};
canvas.onmousemove = over;

var dirty = [];

init();
initDebugOptions();
redraw();

var coords1=null;

function clickHandler(event) {
   var x = event.pageX - canvas.offsetLeft,
       y = event.pageY - canvas.offsetTop;
   if (debug) console.log("clicked: " + x + ", " + y);
   }
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
   
   console.log("canvasW=" + canvasW);
   console.log("canvasH=" + canvasH);
   console.log("drawW=" + drawW);
   console.log("drawH=" + drawH);
   console.log("board[0].length=" + board[0].length);
}

function redraw() {
   canvas.width = canvas.width;
   drawBoard(context, board, offsetX, offsetY);
}

function drawCell(context, board, coords, xOffset, yOffset, color, line, fill) {
   var curX, curY;
   
   curX = xOffset + hex.b + coords[0] * hex.tesslenx;
   curY = yOffset + hex.sidelen + coords[1] * hex.tessleny;
   
   if (coords[1] % 2 == 1) {
      curX += hex.b;
   }
   
   drawHex(context, color, curX, curY, hex, line, fill);
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

function drawCircle2(context, board, coords, xOffset, yOffset, color, line, fill, scale) {
   var curX, curY;
   
   curX = xOffset + hex.b + coords[0] * hex.tesslenx;
   curY = yOffset + hex.sidelen + coords[1] * hex.tessleny;
   
   if (coords[1] % 2 == 1) {
      curX += hex.b;
   }
   var myScale = scale || 1;
   drawCircle(context, color, curX, curY, hex.b * myScale, 4, fill);
}


function drawCellSmall(context, board, coords, xOffset, yOffset, color, line, fill, scale) {
   var curX, curY;
   
   curX = xOffset + hex.b + coords[0] * hex.tesslenx;
   curY = yOffset + hex.sidelen + coords[1] * hex.tessleny;
   
   var myScale = scale || 0.8;
   
   if (coords[1] % 2 == 1) {
      curX += hex.b;
   }
   var smHex = new Hex(hex.sidelen * myScale);
   drawHex(context, color, curX, curY, smHex, line, fill);
}

function drawBoard(context, board, xOffset, yOffset) {
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
        drawCell(context, board, [i, j], xOffset, yOffset, 'lightgrey', 1, false);
        //print text
        if (debug) {
          drawText(context, board, [i, j], xOffset, yOffset, color, 1, false, "" + i + "," + j + ":" + board[j][i]);
        }
      }
   }
}

function drawBoard2(context, board, xOffset, yOffset) {
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
         var curX, curY;
         
         curX = xOffset + hex.b + i * hex.tesslenx;
         curY = yOffset + hex.sidelen + j * hex.tessleny;

         if (j % 2 == 1) {
            curX += hex.b;
         }
         
         if (debug) {
            context.fillStyle = "#DDDDDD";
            //context.fillStyle = "#FEEFFE";
            context.font = "8pt Arial";
            context.fillText("" + i + "," + j + ":" + board[j][i], curX-10, curY-12);
         }
         
         //context.fillStyle = "#FEEFFE";
         //context.font = "8pt Arial";
         //context.fillText("" + board[j][i], curX-4, curY+3);
         
         if (board[j][i] === 0) {
            drawHex(context, "lightgray", curX, curY, hex);
         }
         else if (board[j][i] == 1) {
            drawHex(context, 'cyan', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'cyan', curX, curY, smHex);
         }
         
         else if (board[j][i] == 2) {
            drawHex(context, 'darkkhaki', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'darkkhaki', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.6);
            drawHex(context, 'darkkhaki', curX, curY, smHex);
         }
         else if (board[j][i] == 3) {
            drawHex(context, 'greenyellow', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'greenyellow', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.6);
            drawHex(context, 'greenyellow', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.4);
            drawHex(context, 'greenyellow', curX, curY, smHex);
         }
         else if (board[j][i] == 'A') {
            drawHex(context, 'cyan', curX, curY, hex);
         }
      }
   }
   
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
         
         if (board[j][i] == 0) continue;
         
         var curX, curY;
         
         curX = xOffset + hex.b + i * hex.tesslenx;
         curY = yOffset + hex.sidelen + j * hex.tessleny;

         if (j % 2 == 1) {
            curX += hex.b;
         }
         
         if (board[j][i] === 0) {
            drawHex(context, "#EEEEEE", curX, curY, hex);
         }
         else if (board[j][i] == 1) {
            drawHex(context, 'cyan', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'cyan', curX, curY, smHex);
         }
         
         else if (board[j][i] == 2) {
            drawHex(context, 'darkkhaki', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'darkkhaki', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.6);
            drawHex(context, 'darkkhaki', curX, curY, smHex);
         }
         else if (board[j][i] == 3) {
            drawHex(context, 'greenyellow', curX, curY, hex);
            var smHex = new Hex(hex.sidelen * 0.8);
            drawHex(context, 'greenyellow', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.6);
            drawHex(context, 'greenyellow', curX, curY, smHex);
            smHex = new Hex(hex.sidelen * 0.4);
            drawHex(context, 'greenyellow', curX, curY, smHex);
         }
         else if (board[j][i] == 'A') {
            drawHex(context, 'cyan', curX, curY, hex);
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
