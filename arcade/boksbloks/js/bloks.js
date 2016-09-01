var piece = null;
var pieceXY = [0, 0];
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
        if (button == 'left') {
            if (piece != null && pieceXY[0] > 0) {
                var x = pieceXY[0];
                var y = pieceXY[1];

                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = 0;
                        }
                    }
                }
                pieceXY[0] = pieceXY[0] - 1;
                x = pieceXY[0];
                y = pieceXY[1];

                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = piece[j][i];
                        }
                    }
                }
            }
        } else if (button == 'right') {
            if (piece != null && (pieceXY[0] + piece[0].length < board[0].length)) {
                var x = pieceXY[0];
                var y = pieceXY[1];
                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = 0;
                        }
                    }
                }
                pieceXY[0] = pieceXY[0] + 1;
                x = pieceXY[0];
                y = pieceXY[1];
                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = piece[j][i];
                        }
                    }
                }
            }
        }
    }
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 37) {
        inputs[inputs.length] = 'left';
    } else if (key == 39) {
        inputs[inputs.length] = 'right';
    }
}

function update() {
    var curTime = new Date().getTime();

    if ((curTime - lastUpdate) < 70) {
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
            clearedRows[clearedRows.length] = j;
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

            for (var i = 0; i < clearedRows.length; ++i) {
                board.splice(clearedRows[i], 1);
                board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
        var x = pieceXY[0];
        var y = pieceXY[1];

        y = y + 1;
        pieceXY = [x, y];



        if ((y + piece.length) <= board.length) {
            y = y - 1;

            for (var j = 0; j < piece.length; ++j) {
                for (var i = 0; i < piece[j].length; ++i) {
                    if (piece[j][i] != 0) {
                        board[y + j][x + i] = 0;
                    }
                }
            }

            y = y + 1;

            var blocked = false;
            loop1: for (var j = 0; j < piece.length; ++j) {
                for (var i = 0; i < piece[j].length; ++i) {
                    if (piece[j][i] != 0 && board[y + j][x + i] != 0) {
                        console.log("piece blocked");
                        blocked = true;
                        break loop1;
                    }
                }
            }

            if (!blocked) {
                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = piece[j][i];
                        }
                    }
                }
            } else {
                y = y - 1;
                for (var j = 0; j < piece.length; ++j) {
                    for (var i = 0; i < piece[j].length; ++i) {
                        if (piece[j][i] != 0) {
                            board[y + j][x + i] = piece[j][i];
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

function getPiece() {
    var min = Math.ceil(0);
    var max = Math.floor(7);
    var piece = Math.floor(Math.random() * (max - min)) + min;
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
        [1, 1, 0],
        [0, 1, 1]
    ];
}

function spiece() {
    return [
        [0, 2, 2],
        [2, 2, 0]
    ];
}

function lpiece() {
    return [
        [0, 0, 3],
        [3, 3, 3]
    ];
}

function jpiece() {
    return [
        [4, 0, 0],
        [4, 4, 4]
    ];
}

function opiece() {
    return [
        [5, 5],
        [5, 5]
    ];
}

function ipiece() {
    return [
        [6, 6, 6, 6]
    ];
}

function tpiece() {
    return [
        [0, 7, 0],
        [7, 7, 7]
    ];
}
