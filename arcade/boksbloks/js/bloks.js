var piece = null;
var pieceXY = [0, 0];
var x = 0;
var y = 0;
var r = 0;
var lastUpdate = new Date().getTime();
var lastFrame = new Date().getTime();

var inputs = [];
board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// https://developer.mozilla.org/en-US/docs/Games/Anatomy

window.main = function() {
    window.requestAnimationFrame(main);

    // Whatever your main loop needs to do.
    processInput();
    update();

    var curTime = new Date().getTime();

    if ((curTime - lastFrame) > 16) {
        redraw();
        lastFrame = curTime;
    }
};

main(); //Start the cycle.

var flash = 0;
var clearedRows = [];

function processInput() {
    for (var i = 0; i < inputs.length; ++i) {
        var button = inputs.shift();
        if (button == 'l') {
            if (piece != null && pieceXY[0] > 0) {
                var x = pieceXY[0];
                var y = pieceXY[1];

                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = 0;
                        }
                    }
                }
                pieceXY[0] = pieceXY[0] - 1;
                x = pieceXY[0];
                y = pieceXY[1];

                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = piece[r][j][i];
                        }
                    }
                }
            }
        } else if (button == 'r') {
            if (piece != null && (pieceXY[0] + piece[r][0].length < board[0].length)) {
                var x = pieceXY[0];
                var y = pieceXY[1];
                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = 0;
                        }
                    }
                }
                pieceXY[0] = pieceXY[0] + 1;
                x = pieceXY[0];
                y = pieceXY[1];
                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = piece[r][j][i];
                        }
                    }
                }
            }
        } else if (button == 'z') {
            r = (r + 1)%4;
        }
    }
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 37) {
        inputs[inputs.length] = 'l';
    } else if (key == 39) {
        inputs[inputs.length] = 'r';
    } else if (key == 90) {
        inputs[inputs.length] = 'z';
    }
}

function update() {
    var curTime = new Date().getTime();

    if ((curTime - lastUpdate) < 100) {
        return;
    }

    lastUpdate = curTime;


    if ((flash % 2) != 1) {
        for (var j = 0; j < clearedRows.length; ++j) {
            for (var i = 0; i < board[j].length; ++i) {
                board[clearedRows[j]][i] = 1;
            }
        }
        flash++;
        return;
    }


    //check for line clear

    for (var j = 0; j < board.length; ++j) {
        var hasSpace = false;
        for (var i = 0; i < board[j].length; ++i) {
            if (board[j][i] == 0) {
                hasSpace = true;
                break;
            }
        }
        if (!hasSpace) {
            //row j should clear
            var jInArray = false;
            for (var i = 0; i < clearedRows.length; ++i) {
                if (clearedRows[i]==j) {
                    jInArray = true;
                }
            }
            if (!jInArray) {
                clearedRows[clearedRows.length] = j;
                console.log("row " + j + " should be cleared");
            }
        }
    }

    for (var j = 0; j < clearedRows.length; ++j) {
        for (var i = 0; i < board[j].length; ++i) {
            board[clearedRows[j]][i] = 0;
        }
    }
    if (clearedRows.length > 0) {
        flash++;
        if (flash == 6) {
            flash = 0;
            var numRemoved = 0;
            for (var i = clearedRows.length - 1; i >= 0; --i) {
                board.splice(clearedRows[i], 1);
                numRemoved++;
                console.log("removed " + clearedRows[i]);
            }
            for (var i = 0; i < numRemoved; ++i) {
                board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                console.log("added row");
            }
            clearedRows = [];
        } else {
            return;
        }
    }

    if (piece == null) {
        piece = getPiece();

        var min = Math.ceil(0);
        var max = Math.floor(7);


        pieceXY = [Math.floor(Math.random() * (max - min)) + min, 0];
    } else {

        var valid = tryMovement(piece, r, pieceXY[0],  pieceXY[1] + 1);

        if (valid)
        {
            lockPiece(piece, r, pieceXY[0], pieceXY[1]+1);
        }

        var x = pieceXY[0];
        var y = pieceXY[1];

        y = y + 1;
        pieceXY = [x, y];



        if ((y + piece[r].length) <= board.length) {
            y = y - 1;

            for (var j = 0; j < piece[r].length; ++j) {
                for (var i = 0; i < piece[r][j].length; ++i) {
                    if (piece[r][j][i] != 0) {
                        board[y + j][x + i] = 0;
                    }
                }
            }

            y = y + 1;

            var blocked = false;
            loop1: for (var j = 0; j < piece[r].length; ++j) {
                for (var i = 0; i < piece[r][j].length; ++i) {
                    if (piece[r][j][i] != 0 && board[y + j][x + i] != 0) {
                        console.log("piece blocked");
                        blocked = true;
                        break loop1;
                    }
                }
            }

            if (!blocked) {
                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = piece[r][j][i];
                        }
                    }
                }
            } else {
                y = y - 1;
                for (var j = 0; j < piece[r].length; ++j) {
                    for (var i = 0; i < piece[r][j].length; ++i) {
                        if (piece[r][j][i] != 0) {
                            board[y + j][x + i] = piece[r][j][i];
                        }
                    }
                }
                if (y == 0) {
                    board = [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ];
                }
                piece = null;
            }
        } else {
            piece = null;
        }
    }
}

function isLocked() {
    return !tryMovement(piece, r, pieceXY[0], pieceXY[1]+1);
}

function tryMovement(newPiece, newR, newX, newY) {
    var newBoard = getCopyOfBoard();
    
    // try to lay newPiece onto the board
    for (var j = 0; j < newPiece[newR].length; ++j) {
        for (var i = 0; i < newPiece[newR][j].length; ++i) {
            if (newPiece[newR][j][i] != 0) {
                var posY = newY + j;
                var posX = newX + i;

                if (posY >= 0 
                    && posX >= 0 
                    && posY < newBoard.length 
                    && posX < newBoard[posY].length 
                    && newBoard[posY][posX] == 0) {
                    newBoard[newY + j][newX + i] = newPiece[newR][j][i];
                } else {
                    return false;
                }
            }
        }
    }

    return true;
}

function lockPiece(newPiece, newR, newX, newY)
{
    for (var j = 0; j < newPiece[newR].length; ++j) {
        for (var i = 0; i < newPiece[newR][j].length; ++i) {
            if (newPiece[newR][j][i] != 0) {
                var posY = newY + j;
                var posX = newX + i;

                board[newY + j][newX + i] = newPiece[newR][j][i];
            }
        }
    }
}

function getPiece() {
    var min = Math.ceil(0);
    var max = Math.floor(7);
    var piece = Math.floor(Math.random() * (max - min)) + min;
    r = 0;

    switch (piece) {
        case 0:
            return zpiece();
        case 1:
            return spiece();
        case 2:
            return lpiece();
        case 3:
            return jpiece();
        case 4:
            return opiece();
        case 5:
            return ipiece();
        case 6:
            return tpiece();
    }
}

function zpiece() {
    return [
        [[1,1,0],[0,1,1],[0,0,0]],
        [[0,0,1],[0,1,1],[0,1,0]],
        [[0,0,0],[1,1,0],[0,1,1]],
        [[0,1,0],[1,1,0],[1,0,0]]
    ];
}

function spiece() {
    return [
        [[0,1,1],[1,1,0],[0,0,0]],
        [[0,1,0],[0,1,1],[0,0,1]],
        [[0,0,0],[0,1,1],[1,1,0]],
        [[1,0,0],[1,1,0],[0,1,0]]
    ];
}

function lpiece() {
    return [
        [[0,0,1],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,0],[0,1,1]],
        [[0,0,0],[1,1,1],[1,0,0]],
        [[1,1,0],[0,1,0],[0,1,0]]
    ];
}

function jpiece() {
    return [
        [[1,0,0],[1,1,1],[0,0,0]],
        [[0,1,1],[0,1,0],[0,1,0]],
        [[0,0,0],[1,1,1],[0,0,1]],
        [[0,1,0],[0,1,0],[1,1,0]]
    ];
}

function opiece() {
    return [
        [[0,1,1,0],[0,1,1,0],[0,0,0,0]],
        [[0,1,1,0],[0,1,1,0],[0,0,0,0]],
        [[0,1,1,0],[0,1,1,0],[0,0,0,0]],
        [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
    ];
}

function ipiece() {
    return [
        [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
        [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
        [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    ];
}

function tpiece() {
    return [
        [[0,1,0],[1,1,1],[0,0,0]],
        [[0,1,0],[0,1,1],[0,1,0]],
        [[0,0,0],[1,1,1],[0,1,0]],
        [[0,1,0],[1,1,0],[0,1,0]]
    ];
}
