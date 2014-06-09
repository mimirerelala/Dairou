

 // Returns an array of Tile objects

Player1 = new Player("Zhivko",'red','darkRed' );
Player2 = new Player("Villy", 'blue', 'darkBlue');



console.log(Player2.lightColor);
console.log(Player1.darkColor);





function updateColors(matrix, wordTiles, curPlayer, oponent) {
	//use a mask array to recalculate card colors
	//players can have one letter colors
	//when surrounding a card with their colors, 
	//use wordTiles array of Tiles objects , both players and a 
	//color matrix as an input
	console.log(curPlayer.lightColor);
	console.log(curPlayer.darkColor);
	console.log(oponent.lightColor);
	console.log(oponent.darkColor);
	var defaultColor = 'gray';
    console.log(wordTiles.length + " length " + typeof(wordTiles[0].row));
	//get the correct color variables and start filling new values
	for (iTile in wordTiles) {
		var letterX = wordTiles[iTile].row;
		var letterY = wordTiles[iTile].col;
		console.log(letterY);
		console.log(wordTiles[iTile].col  + "  "  + wordTiles[iTile].text+"  "+ "obj Itile");
        console.log(matrix[letterX][letterY] + "  " + wordTiles[iTile].text);
		if ((matrix[letterX][letterY]==defaultColor)||(matrix[letterX][letterY]==oponent.lightColor)) {
			matrix[letterX][letterY] = curPlayer.lightColor;
            console.log("update")
		}
	for (var j = 0; j < matrix.length; j++) {
		for (var k = 0; k < matrix[0].length; k++) {
			if(isSurrounded(matrix, j, k)){
			}
			else if (matrix[j,k]==curPlayer.darkColor){
				matrix[j,k] = curPlayer.lightColor;
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
//function Tile(text, color, posX, posY, size, row , col) {

word[0] = new Tile('g','gray',30,30,10,4,1);
word[1] = new Tile('g','red',30,30,10,3,1);
word[2] = new Tile('g','blue',30,30,10,0,0);
word[3] = new Tile('g','blue',30,30,10,0,1);
word[4] = new Tile('g','blue',30,30,10,1,0);

//console.log(word.length + "  " + typeof(tiles) + "  " +"  " + "  word array"); 
//console.log(m1);


m1 = updateColors(matrix1,word, Player2,Player1);

console.log("m1" + m1);

