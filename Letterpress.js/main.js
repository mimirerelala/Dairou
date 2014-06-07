window.addEventListener("load", main, false);

var canvas, context;
var tiles;
var isDragging;
var timer;
var dragTile;
var wasDragged;

function main() {

    prepareCanvas();
    prepareBoard();
    drawScreen();

    canvas.addEventListener("mousedown", mouseDownListener, false);
}

function prepareCanvas() {
    canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    canvas.style.position = 'absolute';
    canvas.style.left = (document.documentElement.clientWidth - canvas.width) / 2 + 'px';

    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
}

function prepareBoard() {
    var boardLetters = generateRandomLeters();
    tiles = makeTiles(boardLetters);
}

 // Renders the canvas to screen
function drawScreen() {
    context.fillStyle = 'rgb(240, 239, 236)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < tiles.length; i++)
        tiles[i].draw(context);
}


function makeTiles(boardLetters) {
    var i;
    var tempX, tempY, tempColor;
    var boardX, boardY;
    var red = "rgb(247,153,141)";
    var blue = "rgb(120,200,245)";
    var gray = "rgb(230, 230, 230)";
    var darkRed = "rgb(255, 67, 47)";
    var darkBlue = "rgb(0, 162, 255)";

    var tileSize = 114; // pixels
    var tileMargin = 1; // pixels

    boardX = (canvas.width - 5 * (tileSize + tileMargin)) / 2;
    boardY = (canvas.height - 5 * (tileSize + tileMargin)) - tileSize / 10;

    tiles = [];
    for (i = 0; i < boardLetters.length; i++) {
        tempX = boardX + (i % 5) * (tileSize + tileMargin);
        tempY = boardY + (~~(i / 5) * (tileSize + tileMargin));

        var rand = Math.random();
        tempColor = rand < 0.33 ? red : rand < 0.66 ? blue : gray;

        tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize));
    }

    return tiles;
}