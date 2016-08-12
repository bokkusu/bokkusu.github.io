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

function over(e) {
   var event = e || window.event;
   var x = event.pageX - canvas.offsetLeft,
       y = event.pageY - canvas.offsetTop;
   var coords = getGridCoords(x, y, board);
   
   if (coords != OOB) {
      clean();
      if (board[coords[1]][coords[0]] == "A" || (game.movedPiece != null && isAligned(game.movedPiece, coords))) {
         drawCellSmall(context, board, coords, offsetX, offsetY, "cyan", 1, true);
         drawCellSmall(context, board, coords, offsetX, offsetY, "white", 1, true, 0.3);
      }
      else {
         drawCellSmall(context, board, coords, offsetX, offsetY, "gray");
      }
      
      dirty.push(coords);
   }
}

function clean() {
/* smart cleanup */
/*   for (var i = 0; i < this.dirty.length; i++) {
      drawCell(context, board, dirty[i], offsetX, offsetY, "white", 5, true);
   }
   dirty = [];
   */
   
   //hack -- redraw everything
   redraw();
}

init();
initDebugOptions();
//execute();

function execute() {
   while (!done) {
      //handle input
      //step simulation
      //draw
   }
}

redraw();

var coords1=null;

function clickHandler(event) {
   var x = event.pageX - canvas.offsetLeft,
       y = event.pageY - canvas.offsetTop;
   var coords = getGridCoords(x, y, board);

   if (coords === OOB) {
   }
   else {
      game.click(coords);
      if (debug) console.log("clicked: " + coords + ":" + board[coords[1]][coords[0]]);
   }
   //redraw();
}

function isAligned(c1, c2) {
   for (var i = 0; i < getFunctions.length; i++)
   {
      if (searchAlignments(c1, c2, i)) {
         return true;
      }
   }
   
   return false;
}

function searchAlignments(c1, c2, dir) {
   var cur = c1;

   while (inBounds(cur, board) && board[cur[1]][cur[0]] != 0)
   {
      cur = getFunctions[dir](cur);
      
      if (cur[0] == c2[0] && cur[1] == c2[1])
      {
         return true;
      }
   }
   
   return false;
}

function inBounds(c, board) {
   return c[0] >= 0 && c[1] >= 0 && c[1] < board.length && c[0] < board[0].length;
}

function getNW(c1) {
   if (c1[1] % 2 === 0) {
      return [c1[0] - 1, c1[1] - 1];
   }
   else {
      return [c1[0], c1[1] - 1];
   }
}

function getNE(c1) {
   if (c1[1] % 2 === 0) {
      return [c1[0], c1[1] - 1];
   }
   else {
      return [c1[0] + 1, c1[1] - 1];
   }
}

function getE(c1) {
   return [c1[0] + 1, c1[1]];
}

function getSE(c1) {
   if (c1[1] % 2 === 0) {
      return [c1[0], c1[1] + 1];
   }
   else {
      return [c1[0] + 1, c1[1] + 1];
   }
}

function getSW(c1) {
   if (c1[1] % 2 === 0) {
      return [c1[0] - 1, c1[1] + 1];
   }
   else {
      return [c1[0], c1[1] + 1];
   }
}

function getW(c1) {
   return [c1[0] - 1, c1[1]];
}

var getFunctions = [getNW, getNE, getE, getSE, getSW, getW];

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
   
   var tesX = drawW / board[0].length;
   hex = new Hex((tesX/2)/(Math.sin(Math.PI/3)));
   offsetX = (canvasW - drawW)/2;
   offsetY = (canvasH - drawH)/2;
   
   OOB = [-1, -1];
   
   console.log("canvasW=" + canvasW);
   console.log("canvasH=" + canvasH);
   console.log("drawW=" + drawW);
   console.log("drawH=" + drawH);
   console.log("sideLength=" + tesX);
   console.log("board[0].length=" + board[0].length);
}

function redraw() {
   canvas.width = canvas.width;
   drawBoard(context, board, offsetX, offsetY);
}

function cycle(x, y, board) {
  console.log("cycle: " + x + "," + y);
  if (y >= 0 && y < board.length) {
     if (x >= 0 && x < board[y].length) {
        board[y][x] = (board[y][x] + 1) % 4;
     }
  }
}

function compareCoords(c1,c2) {
  return c1[0]==c2[0] && c1[1]==c2[1];
}

function getGridCoords(x, y, board) {
  x = x - offsetX;
  y = y - offsetY;
  
  var gx = x/hex.tesslenx;
  var gy = Math.floor(y/hex.tessleny);

  gx = (gy % 2 === 0) ? Math.floor(gx) : Math.floor(gx - 0.5);
  
  if (gy >= 0 && gy < board.length)
  {
     if (gx >= 0 && gx < board[gy].length)
     {
        return [gx, gy];
     }
  }
  
  return OOB;
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
   
   for (var j = 0; j < board.length; j++) {
      for (var i = 0; i < board[j].length; i++) {
        if (board[j][i] == 0) continue;
        var color = 'cyan';
        
        if (board[j][i] == 1) color = 'lightgreen';
        
        if (board[j][i] == "A") {
          drawCircle2(context, board, [i, j], xOffset, yOffset, color, 1, false);
          drawCellSmall(context, board, [i, j], xOffset, yOffset, color, 1, false, 0.3);
        }
        else {
          drawCellSmall(context, board, [i, j], xOffset, yOffset, color, 1, true, 0.3);
        }
      }
   }
   
   if (selected != null) {
      drawCell(context, board, [selected[0], selected[1]], xOffset, yOffset, 'cyan', 2, false);
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
