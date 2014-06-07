//colors are 'r', 'rr','b','bb', 'w'
var matrix1 =[['w','w','w','w','w'],
			 ['w','w','w','w','w'],
			 ['w','w','w','w','w'],
			 ['w','w','w','w','w'],
			 ['w','w','w','w','w']];

var letterCoords = [[0,1],[1,0],[0,0],[4,4],[2,3]];




function updateColors(matrix, tilesWord, player) {
	//use a mask array to recalculate card colors
	//players can have one letter colors
	//when surrounding a card with their colors, 
	//they will get a new color 'b'->'bb'
	//'r'->'rr'
	// a custom color will get appropriat second name
	// eg 'g'=>'gg'
	player.lightColor;
	player.darkColor;

	//get the correct color variables and start filling new values
	for (var i = 0; i <tilesWord.length; i++) {
		if ((matrix[letterCoords[i][0]][letterCoords[i][1]]!==sampleColor)&&(matrix[letterCoords[i][0]][letterCoords[i][1]]!=='rr')){
			matrix[letterCoords[i][0]][letterCoords[i][1]] = newColor; 
		}
	}
	//check for bounded letters
	if (playerColor =="b") {
		var newColor= "bb";
	}
	else if(playerColor =="r"){
		newColor='rr';
	}
	else {
		newColor = playerColor + playerColor;
	}
	//check for letters surrounded on all sides by the same type
	//if true  --> change color by doubling the letter!
	for (var k = 0; k <letterCoords.length; k++) {
		if(isSurrounded(matrix,letterCoords[k][0],letterCoords[k][1],playerColor)) {
			if((matrix[letterCoords[k][0]][letterCoords[k][1]]!=sampleColor)&&(matrix[letterCoords[k][0]][letterCoords[k][1]]!='rr')){
				matrix[letterCoords[k][0]][letterCoords[k][1]] = newColor;
			}
		}
	}	
	return matrix;
}

function isSurrounded(arrayIn, xCoord, yCoord, playerColor) {
	var lenY = arrayIn.length;//rows
	var lenX = arrayIn[0].length;//cols
	var endLine = 0;//get array boundaries, keep indices within the array
	var endX = lenX-1;
	var endY = lenY-1;
	//check if square above is the same
	if ((xCoord==endLine)||(arrayIn[xCoord-1][yCoord][0]==playerColor)){
		//check one downward
		if((xCoord==endY)||(arrayIn[xCoord+1][yCoord][0]==playerColor)){
			//check leftwards
			if((yCoord==endLine)||(arrayIn[xCoord][yCoord-1][0]==playerColor)){
				//check rightwards
				if((yCoord==endX)||(arrayIn[xCoord][yCoord+1][0]==playerColor)){
					return true;
				}
			}
		}
	}
	return false;
}






console.log(matrix1);

m1 = updateColors(matrix1,letterCoords,"b");
m2 = updateColors(m1,[[2,3],[0,1],[4,4],[3,4],[4,3]],"r");
console.log(m1);

console.log(m2);
m3 = updateColors(m2,[[2,3],[0,1],[4,4],[3,4],[4,3]],"b");
//updateColors(matrix1,letterCoords,'b')
m4 = updateColors(m3,[[2,3],[0,1],[4,4],[3,4],[4,3]],"g");

console.log(m4);
