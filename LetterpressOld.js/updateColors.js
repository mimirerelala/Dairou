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

    tiles = new Array();
    for (i = 0; i < numTiles; i++) {
        tempX = boardX + (i % 5) * (tileSize + tileMargin);
        tempY = boardY + (~~(i / 5) * (tileSize + tileMargin));

        var rand = Math.random();
        tempColor = rand < 0.33 ? red : rand < 0.66 ? blue : gray;
        posCoords=[i%5,~~(i / 5)];//save matrix coordinas
        //tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize, posCoords));
        tiles[i] = new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize, posCoords);

    }

    return tiles;
}

 // Translates the mouse position to canvas coodrinates
function getMousePos(canvas, evt) {
    var bRect = canvas.getBoundingClientRect();
    return {
        X: (evt.clientX - bRect.left) * (canvas.width / bRect.width),
        Y: (evt.clientY - bRect.top) * (canvas.height / bRect.height)
    };
}

 // Returns the index of the tile being clicked or -1 if no tile was clicked
function getDragIndex(mouseX, mouseY) {
    var dragIndex = -1;
    // the variable will be overwritten to ensure only the topmost tile is dragged
    for (var i = 0; i < tiles.length; i++)
        if (tiles[i].isClicked(mouseX, mouseY))
            dragIndex = i;
    return dragIndex;
}

function mouseDownListener(evt) {
    var mousePos = getMousePos(canvas, evt);

    // The index of the tile being clicked or -1 if no tile was clicked
    var dragIndex = getDragIndex(mousePos.X, mousePos.Y);

    if (dragIndex > -1) {
        isDragging = true;
        window.addEventListener("mousemove", mouseMoveListener, false);

        dragTile = tiles[dragIndex];

        // We now place the currently dragged tile on top by placing it last in the array.
        tiles.push(tiles.splice(dragIndex, 1)[0]);

        // We record the point on the dragged tile where the mouse is "holding" it:          
        dragTile.clickOffsetX = mousePos.X - dragTile.X;
        dragTile.clickOffsetY = mousePos.Y - dragTile.Y;

        // The "target" position is where the object should be if it were to move there instantaneously. But we will
        // set up the code so that this target position is approached gradually, producing a smooth motion. 
        dragTile.targetPosX = dragTile.X;
        dragTile.targetPosY = dragTile.Y;

        // Start timer
        timer = setInterval(onTimerTick, 1000 / 60);
    }
    canvas.removeEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    // Prevents the mouse down from having an effect on the main browser window:
    evt.preventDefault();
}

function mouseUpListener(evt) {
    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    if (isDragging) {
        isDragging = false;
        // Make the tile return to its intial position
        dragTile.targetPosX = dragTile.initalX;
        dragTile.targetPosY = dragTile.initalY;
        window.removeEventListener("mousemove", mouseMoveListener, false);
    }
}

function mouseMoveListener(evt) {
    // Updates target position
    var minX = 0;
    var maxX = canvas.width - dragTile.size;
    var minY = 0;
    var maxY = canvas.height - dragTile.size;

    var mousePos = getMousePos(canvas, evt);

    // Clamp x and y positions to prevent object from dragging outside of canvas
    dragTile.targetPosX = Math.min(Math.max(mousePos.X - dragTile.clickOffsetX, minX), maxX);
    dragTile.targetPosY = Math.min(Math.max(mousePos.Y - dragTile.clickOffsetY, minY), maxY);
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
        // Stop timer:
        clearInterval(timer);
    }
    drawScreen();
}



function Player(name, lightColor, darkColor) {
    this.name= name;
    this.lightColor = lightColor;
    this.darkColor = darkColor;
    this.points = 0;
    //this.image;
}


var gameOn = true;
//Main players loop
Player.prototype.play = function (context) {
    while (gameOn){}
};



var red = "rgb(247,153,141)";
var blue = "rgb(120,200,245)";
var gray = "rgb(230, 230, 230)";
var darkRed = "rgb(255, 67, 47)";
var darkBlue = "rgb(0, 162, 255)";
 // The Tile class
function Tile(text, color, posX, posY, size, coords) {
    this.initalX = posX;
    this.initalY = posY;
    this.X = posX;
    this.Y = posY;
    this.color = color;
    this.size = size;
    this.text = text;
    this.fontSize = +(0.75 * size);
    this.fontFamiliy = "'Calibri'";
    this.fontColor = 'rgb(35, 35, 35)';
    this.font = "bold " + this.fontSize + "px " + this.fontFamiliy;
    this.coords = coords;
    this.isMoving = false;
}

 // Checks if the coordinates supplied are inside the tile
Tile.prototype.isClicked = function (clickX, clickY) {
    return ((clickX > this.X) && (clickX < this.X + this.size) && (clickY > this.Y) && (clickY < this.Y + this.size));
};

 // Draws the tile (a colored square with a letter on top)
Tile.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.X, this.Y, this.size, this.size);

    context.fillStyle = this.fontColor;
    context.font = this.font;
    context.fillText(
        this.text,
        this.X + (this.size / 2) - (context.measureText(this.text).width / 2),
        this.Y + (this.size / 2) + this.fontSize / 4
    );
};

 // Returns an array of Tile objects

Player1 = new Player("Zhivko",'red','darkRed' );
Player2 = new Player("Villy", 'blue', 'darkBlue');



console.log(Player2.lightColor);
console.log(Player1.darkColor);





function updateColors(matrix, wordTiles, player, oponent) {
	//use a mask array to recalculate card colors
	//players can have one letter colors
	//when surrounding a card with their colors, 
	//use wordTiles array of Tiles objects , both players and a 
	//color matrix as an input
	console.log(player.lightColor);
	console.log(player.darkColor);
	console.log(oponent.lightColor);
	console.log(oponent.darkColor);
	var defaulColor = 'gray';
    console.log(wordTiles.length + "length");
	//get the correct color variables and start filling new values
	for (var i = 0; i < wordTiles.length; i++) {
		letterCoords = wordTiles[i].coords;
        console.log(i);
        console.log(matrix[letterCoords[0]][letterCoords[1]]);
		if ((matrix[letterCoords[0]][letterCoords[1]]==defaulColor)||(matrix[letterCoords[0]][letterCoords[1]]==oponent.lightColor)) {
			matrix[letterCoords[0]][letterCoords[1]] = player.lightColor;
            console.log("update")
		}
	for (var j = 0; j < matrix.length; j++) {
		for (var k = 0; k < matrix[0].length; k++) {
			if(isSurrounded(matrix, j, k)){
			}
			else if (matrix[j,k]==player.darkColor){
				matrix[j,k] = player.lightColor;
			}
			else if(matrix[j,k]==oponent.darkColor){
				matrix[j,k] = oponent.lightColor;
            }
		}
	}
	return matrix;
}
}

function isSurrounded(arrayIn, xCoord,yCoord) {
	var lenY = arrayIn.length;//rows
	var lenX = arrayIn[0].length;//cols
	var endLine = 0;//get array boundaries, keep indices within the array
	var endX = lenX-1;
	var endY = lenY-1;
	curTileColor= arrayIn[xCoord,yCoord];
	//check if square above is the same
	if ((xCoord==endLine)||(arrayIn[xCoord-1][yCoord][0]==curTileColor)){
		//check one downward
		if((xCoord==endY)||(arrayIn[xCoord+1][yCoord][0]==curTileColor)){
			//check leftwards
			if((yCoord==endLine)||(arrayIn[xCoord][yCoord-1][0]==curTileColor)){
				//check rightwards
				if((yCoord==endX)||(arrayIn[xCoord][yCoord+1][0]==curTileColor)){
					return true;
				}
			}
		}
	}
	return false;
}

//colors are 'r', 'rr','b','bb', 'gray'
var matrix1 =[['gray','gray','gray','gray','gray'],
             ['gray','gray','gray','gray','gray'],
             ['gray','gray','gray','gray','gray'],
             ['gray','gray','gray','gray','gray'],
             ['gray','gray','gray','gray','gray']];
console.log(matrix1 + "arry 1 ");

//var letterCoords = [[0,1],[1,0],[0,0],[4,4],[2,3]];



//console.log(matrix1);
//

word = new Array();

//tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize, posCoords));
// Tile(text, color, posX, posY, size, coords) 
//word = word.push(new Tile('g','gray',30,30,10,[0,1]));
word[0] = new Tile('g','gray',30,30,10,[4,1]);
word[1] = new Tile('g','red',30,30,10,[3,1]);
word[2] = new Tile('g','blue',30,30,10,[0,0]);
word[3] = new Tile('g','blue',30,30,10,[0,1]);
word[4] = new Tile('g','blue',30,30,10,[1,0]);

//console.log(word.length + "  " + typeof(tiles) + "  " +"  " + "  word array"); 
//console.log(m1);


m1 = updateColors(matrix1,word, Player2,Player1);

console.log("m1" + m1);