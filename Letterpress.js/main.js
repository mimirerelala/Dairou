window.addEventListener("load", main, false);

var canvas, context;
var tiles;
var isDragging;
var timer;
var dragTile;

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
    var numTiles = 25;
    var boardLetters = "GMYONIWNXGETSMZWZZLENTEGI";
    tiles = makeTiles(numTiles, boardLetters);
}

 // Renders the canvas to screen
function drawScreen() {
    context.fillStyle = 'rgb(240, 239, 236)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < tiles.length; i++)
        tiles[i].draw(context);
}


function makeTiles(numTiles, boardLetters) {
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
    for (i = 0; i < numTiles; i++) {
        tempX = boardX + (i % 5) * (tileSize + tileMargin);
        tempY = boardY + (~~(i / 5) * (tileSize + tileMargin));

        var rand = Math.random();
        tempColor = rand < 0.33 ? red : rand < 0.66 ? blue : gray;

        tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize));
    }

    return tiles;
}


 // Runs while the timer is ticking
function onTimerTick() {
    // The next variable controls the lag in the tile movement (from 0 to 1)
    var easeAmount = 0.2;
    // Update the moving tile position
    dragTile.X += easeAmount * (dragTile.targetPosX - dragTile.X);
    dragTile.Y += easeAmount * (dragTile.targetPosY - dragTile.Y);

    // Stop the timer when the target position is reached (close enough)
    if ((!isDragging) && (Math.abs(dragTile.X - dragTile.targetPosX) < 0.1) && (Math.abs(dragTile.Y - dragTile.targetPosY) < 0.1)) {
        // Snap the tile to its final position
        dragTile.X = dragTile.targetPosX;
        dragTile.Y = dragTile.targetPosY;
        dragTile.isMoving = false;
        // Stop timer:
        clearInterval(timer);
    }
    drawScreen();
}