// Goes over the board and counts the red and blue tiles
// updates redScore and blueScore
function updateScores() {
    var i;
    redScore = blueScore = 0;
    for (i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        if (tile.color === colors.blue || tile.color === colors.darkBlue)
            blueScore++;
        if (tile.color === colors.red || tile.color === colors.darkRed)
            redScore++;
    }
    //console.log(blueScore + " : " + redScore);
}



//Uses a 2d matrix of colours to keep track of tile colours
//edits the tile colour itself and recalulculates the new
//color after word submission (when it is colled)
//uses isSurrounded function
function updateColors(matrix, wordTiles, curPlayer, oponent) {
    var defaultColor1 = colors.gray;
    var defaultColor2 = colors.lightGray;
    var count = 0;
    for (var iTile in wordTiles) {
        if (iTile != "move") {
            count = count + 1;
            var letterX = wordTiles[iTile].row;
            var letterY = wordTiles[iTile].col;
            if ((wordTiles[iTile].color == defaultColor1) || (wordTiles[iTile].color == defaultColor2) || (wordTiles[iTile].color == oponent.lightColor)) {
                matrix[letterX][letterY] = curPlayer.lightColor;
                wordTiles[iTile].color = curPlayer.lightColor;
            }
        }
    }

    for (var iTile in tiles) {
        if (iTile != "move") {
            var j = tiles[iTile].row;
            var k = tiles[iTile].col;
            if (isSurrounded(matrix, j, k, curPlayer)) {
                matrix[j][k] = curPlayer.darkColor;
                tiles[iTile].color = curPlayer.darkColor;
            }
        }
    }
    for (var iTile in tiles) {
        if (iTile != "move") {
            j = tiles[iTile].row;
            k = tiles[iTile].col;
            if (matrix[j][k] == curPlayer.darkColor) {
                if (!isSurrounded(matrix, j, k, curPlayer)) {
                    matrix[j][k] = curPlayer.lightColor;
                    tiles[iTile].color = curPlayer.lightColor;
                }
            } else if (matrix[j][k] == oponent.darkColor) {
                if (!isSurrounded(matrix, j, k, oponent)) {
                    matrix[j][k] = oponent.lightColor;
                    tiles[iTile].color = oponent.lightColor;
                }
            } else if (isSurrounded(matrix, j, k, oponent)) {
                matrix[j][k] = oponent.darkColor;
                tiles[iTile].color = oponent.darkColor;
            }
        }
    }
    return matrix;
}

//given the 2 d matrix and square coordinates
//calculates and returns boolean true if a given square
//is surrounded by tiles of the same player
function isSurrounded(arrayIn, xCoord, yCoord, playerIn) {
    var lenY = arrayIn.length; //rows
    var lenX = arrayIn[0].length; //cols
    var endLine = 0; //get array boundaries, keep indices within the array
    var endX = lenX - 1;
    var endY = lenY - 1;
    var tempLightColor = playerIn.lightColor;
    var tempDarkColor = playerIn.darkColor;
    curTileColor = arrayIn[xCoord][yCoord];
    //check if square above is the same
    if ((xCoord == endLine) || (arrayIn[xCoord - 1][yCoord] == tempDarkColor) || (arrayIn[xCoord - 1][yCoord] == tempLightColor)) {
        //check one downward
        if ((xCoord == endY) || (arrayIn[xCoord + 1][yCoord] == tempDarkColor) || (arrayIn[xCoord + 1][yCoord] == tempLightColor)) {
            //check leftwards
            if ((yCoord == endLine) || (arrayIn[xCoord][yCoord - 1] == tempDarkColor) || (arrayIn[xCoord][yCoord - 1] == tempLightColor)) {
                //check rightwards
                if ((yCoord == endX) || (arrayIn[xCoord][yCoord + 1] == tempDarkColor) || (arrayIn[xCoord][yCoord + 1] == tempLightColor)) {
                    return true;
                }
            }
        }
    }
    return false;
}

