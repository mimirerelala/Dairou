

 // Returns an array of Tile objects



function updateColors(matrix, wordTiles, curPlayer, oponent) {
	//use a mask array to recalculate card colors
	//players can have one letter colors
	//when surrounding a card with their colors, 
	//use wordTiles array of Tiles objects , both players and a 
	//color matrix as an input
	//console.log(curPlayer.lightColor);
	//console.log(curPlayer.darkColor);
	//console.log(oponent.lightColor);
	//console.log(oponent.darkColor);
	var defaultColor = 'gray';
    //console.log(wordTiles.length + " length " + typeof(wordTiles[0].row));
	//get the correct color variables and start filling new values
	var count = 0; 
	for (var iTile in wordTiles) {
		console.log("count " + count);
		count  = count +1;
		var letterX = wordTiles[iTile].row;
		var letterY = wordTiles[iTile].col;
		console.log("row " + "col"+ letterY + " " + letterX);
		//console.log(wordTiles[iTile].col  + "  "  + wordTiles[iTile].text+"  "+ "obj Itile");
        //console.log(matrix[letterX][letterY] + "  " + wordTiles[iTile].text);
		if ((matrix[letterX][letterY]==defaultColor)||(matrix[letterX][letterY]==oponent.lightColor)) {
			matrix[letterX][letterY] = curPlayer.lightColor;
            console.log("update")
		}
	}

	for (var iTile in wordTiles) {
		var j = wordTiles[iTile].row;
		var k = wordTiles[iTile].col;
		console.log(j + "       j k        " + k);
		if(isSurrounded(matrix, j, k, curPlayer)){
			matrix[j][k]=curPlayer.darkColor;
		}
		
	}
	for (var j = 0; j < matrix.length; j++) {
		for (var k = 0; k < matrix[0].length; k++) {
			if (matrix[j][k]==curPlayer.darkColor){
				if (!isSurrounded(matrix, j, k, curPlayer)){
					console.log("cleeearinng.....")
					matrix[j][k] = curPlayer.lightColor;
				}
			}
			else if(matrix[j][k]==oponent.darkColor){
				if (!isSurrounded(matrix, j, k, oponent)){
					matrix[j][k] = oponent.lightColor;
				}
            }
            else if(isSurrounded(matrix, j, k, oponent)){
				matrix[j][k]=oponent.darkColor;
			}
		}
	}
	return matrix;
}


function isSurrounded(arrayIn, xCoord,yCoord, playerIn) {
	var lenY = arrayIn.length;//rows
	var lenX = arrayIn[0].length;//cols
	var endLine = 0;//get array boundaries, keep indices within the array
	var endX = lenX-1;
	var endY = lenY-1;
	var tempLightColor = playerIn.lightColor;
	var tempDarkColor = playerIn.darkColor;
	curTileColor= arrayIn[xCoord][yCoord];
	//check if square above is the same
	if ((xCoord==endLine)||(arrayIn[xCoord-1][yCoord]==tempDarkColor)||(arrayIn[xCoord-1][yCoord]==tempLightColor)){
		//check one downward
		console.log("down");
		if((xCoord==endY)||(arrayIn[xCoord+1][yCoord]==tempDarkColor)||(arrayIn[xCoord+1][yCoord]==tempLightColor)){
			//check leftwards
			console.log("down");
			if((yCoord==endLine)||(arrayIn[xCoord][yCoord-1]==tempDarkColor)||(arrayIn[xCoord][yCoord-1]==tempLightColor)){
				//check rightwards
				if((yCoord==endX)||(arrayIn[xCoord][yCoord+1]==tempDarkColor)||(arrayIn[xCoord][yCoord+1]==tempLightColor)){
					console.log("surrounded");
					return true;
				}
			}
		}
	}
	return false;
}






