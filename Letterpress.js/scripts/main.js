window.addEventListener("load", main, false);

var canvas, context;
var tiles;
var isDragging;
var timer;
var dragTile;
var submitButton;
var clearButton;
var wordToSubmit = '';
var words = [];
var wordHolder; // holds the letters
var boardX, boardY;
var tileSize;
var redScore = 0;
var blueScore = 0;
var redTurn = false;

var colors = {
    red: "rgb(247,153,141)",
    blue: "rgb(120,200,245)",
    gray: "rgb(225, 225, 225)",
    darkRed: "rgb(255, 67, 47)",
    darkBlue: "rgb(0, 162, 255)",
    lightGray: "rgb(230, 230, 230)",
};

function main() {

    gamePlayers = initializePlayers();
    matrixColors = initializeColorMatrix();

    prepareCanvas();
    prepareBoard();
    drawScreen();
    prepareSvg(document.documentElement.clientWidth / 2, canvas.width, canvas.height);



    canvas.addEventListener("mousedown", mouseDownListener, false);
}

function prepareCanvas() {
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.position = 'absolute';
    canvas.style.left = (document.documentElement.clientWidth - canvas.width) / 2 + 'px';

    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
}

function prepareBoard() {
    var boardLetters = generateNonRandomLetters();

    tiles = makeTiles(boardLetters);
    wordHolder = new WordHolder(0, canvas.height / 20);
    submitButton = new Button('Submit', 30, 'rgb(255, 67, 47)', 'rgb(240, 239, 236)', 645, -3, 40);
    clearButton = new Button('Clear', 30, 'rgb(0, 162, 255)', 'rgb(240, 239, 236)', 20, -3, 40);
}

// Renders the canvas to screen
function drawScreen() {

    context.fillStyle = 'rgb(240, 239, 236)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawScores();
    drawTriangle();

    submitButton.draw(context);
    clearButton.draw(context);

    for (var i = 0; i < tiles.length; i++)
        tiles[i].draw(context);

}

function drawTriangle() {
    var color = redTurn ? colors.darkRed : colors.darkBlue;
    var cx = redTurn ? 80 : 710;
    var cy = 315;
    var side = 15;
    var h = side * (Math.sqrt(3) / 2);

    context.save();
    context.fillStyle = color;

    context.translate(cx, cy);
    context.beginPath();
    context.moveTo(0, h / 2);
    context.lineTo(-side / 2, -h / 2);
    context.lineTo(side / 2, -h / 2);
    context.lineTo(0, h / 2);
    context.closePath();

    context.lineWidth = Math.max(~~(h / 5), 5);
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.stroke();

    context.fill();
    context.restore();
}

function drawScores() {
    context.save();
    var redScoreAsString = redScore.toString();
    var blueScoreAsString = blueScore.toString();

    context.textAlign = 'center';
    context.font = 'bold 68px Calibri';
    context.fillStyle = 'rgb(255, 67, 47)';
    context.fillText(redScoreAsString, 80, 380); //canvas.width * 0.4, canvas.heigh * 0.1);

    context.fillStyle = 'rgb(0, 162, 255)';
    context.fillText(blueScoreAsString, 710, 380); //canvas.width * 0.6, canvas.heigh * 0.1);
    context.restore();
}

// Returns an array of Tile objects
function makeTiles(boardLetters) {
    var i;
    var tempX, tempY, tempColor;
    var red = "rgb(247,153,141)";
    var blue = "rgb(120,200,245)";
    var gray = "rgb(225, 225, 225)";
    var darkRed = "rgb(255, 67, 47)";
    var darkBlue = "rgb(0, 162, 255)";
    var lightGray = "rgb(230, 230, 230)";

    var tileMargin = 0; // pixels
    tileSize = ~~ (canvas.height * 0.15); // pixels

    boardX = ~~ ((canvas.width - 5 * (tileSize + tileMargin)) / 2);
    boardY = ~~ ((canvas.height - 5 * (tileSize + tileMargin)) - canvas.height / 50);

    tiles = [];
    for (i = 0; i < boardLetters.length; i++) {
        var row = ~~ (i / 5);
        var col = i % 5;
        tempX = boardX + col * (tileSize + tileMargin);
        tempY = boardY + row * (tileSize + tileMargin);

        boardPos = {
            row: row,
            col: col
        };

        var rand = Math.random();
        tempColor = i % 2 ? gray : lightGray;
        tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize, row, col));
    }

    return tiles;
}

function addToWord(letter) {
    wordToSubmit += letter;
}

function addWord(wordToSubmit) {
    words.push(wordToSubmit);
}

function initializePlayers() {
    Player1 = new Player("Villy", colors.blue, colors.darkBlue);
    Player2 = new Player("Zhivko", colors.red, colors.darkRed);
    if (Player1.darkColor === colors.darkRed)
        redTurn = true;
    var gamePlayers = [];
    gamePlayers[0] = Player1;
    gamePlayers[1] = Player2;
    return gamePlayers;
}

function switchPlayers(playersIn) {
    playersIn[2] = playersIn[0];
    playersIn[0] = playersIn[1];
    playersIn[1] = playersIn[2];
    redTurn = !redTurn;
    return playersIn;
}

function initializeColorMatrix() {
    var matrixColors = [[colors.gray, colors.gray, colors.gray, colors.gray, colors.gray],
             [colors.gray, colors.gray, colors.gray, colors.gray, colors.gray],
             [colors.gray, colors.gray, colors.gray, colors.gray, colors.gray],
             [colors.gray, colors.gray, colors.gray, colors.gray, colors.gray],
             [colors.gray, colors.gray, colors.gray, colors.gray, colors.gray]];
    return matrixColors;
}