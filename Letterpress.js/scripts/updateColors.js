// Returns an array of Tile objects

Player1 = new Player("Zhivko", 'red', 'darkRed');
Player2 = new Player("Villy", 'blue', 'darkBlue');



console.log(Player2.lightColor);
console.log(Player1.darkColor);


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

    console.log(blueScore + " : " + redScore);
}

//colors are 'r', 'rr','b','bb', 'gray'
var matrix1 = [['gray', 'gray', 'gray', 'gray', 'gray'],
             ['gray', 'gray', 'gray', 'gray', 'gray'],
             ['gray', 'gray', 'gray', 'gray', 'gray'],
             ['gray', 'gray', 'gray', 'gray', 'gray'],
             ['gray', 'gray', 'gray', 'gray', 'gray']];
console.log(matrix1 + "arry 1 ");

//var letterCoords = [[0,1],[1,0],[0,0],[4,4],[2,3]];



//console.log(matrix1);
//

word = new Array();

//tiles.push(new Tile(boardLetters[i], tempColor, tempX, tempY, tileSize, posCoords));
// Tile(text, color, posX, posY, size, coords) 
//word = word.push(new Tile('g','gray',30,30,10,[0,1]));
word[0] = new Tile('g', 'gray', 30, 30, 10, [4, 1]);
word[1] = new Tile('g', 'red', 30, 30, 10, [3, 1]);
word[2] = new Tile('g', 'blue', 30, 30, 10, [0, 0]);
word[3] = new Tile('g', 'blue', 30, 30, 10, [0, 1]);
word[4] = new Tile('g', 'blue', 30, 30, 10, [1, 0]);

// Returns an array of Tile objects



function updateColors(matrix, wordTiles, curPlayer, oponent) {
    var defaultColor1 = colors.gray;
    var defaultColor2 = colors.lightGray;
    var count = 0;
    for (var iTile in wordTiles) {
        if (iTile != "move") {
            console.log("count " + count);
            count = count + 1;
            var letterX = wordTiles[iTile].row;
            var letterY = wordTiles[iTile].col;
            console.log("row " + "col" + " " + letterX + " " + letterY);
            console.log("contin");
            //console.log(wordTiles[iTile].col  + "  "  + wordTiles[iTile].text+"  "+ "obj Itile");
            //console.log(matrix[letterX][letterY] + "  " + wordTiles[iTile].text);
            if ((wordTiles[iTile].color == defaultColor1) || (wordTiles[iTile].color == defaultColor2) || (wordTiles[iTile].color == oponent.lightColor)) {
                matrix[letterX][letterY] = curPlayer.lightColor;
                wordTiles[iTile].color = curPlayer.lightColor;
                console.log("update")
            }

        }
    }

    for (var iTile in tiles) {
        if (iTile != "move") {
            var j = tiles[iTile].row;
            var k = tiles[iTile].col;
            console.log(iTile);
            if (isSurrounded(matrix, j, k, curPlayer)&&(tiles[iTile].color==curPlayer.lightColor)) {
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
                    console.log("cleeearinng.....")
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
        console.log("down");
        if ((xCoord == endY) || (arrayIn[xCoord + 1][yCoord] == tempDarkColor) || (arrayIn[xCoord + 1][yCoord] == tempLightColor)) {
            //check leftwards
            console.log("down");
            if ((yCoord == endLine) || (arrayIn[xCoord][yCoord - 1] == tempDarkColor) || (arrayIn[xCoord][yCoord - 1] == tempLightColor)) {
                //check rightwards
                if ((yCoord == endX) || (arrayIn[xCoord][yCoord + 1] == tempDarkColor) || (arrayIn[xCoord][yCoord + 1] == tempLightColor)) {
                    console.log("surrounded");
                    return true;
                }
            }
        }
    }
    return false;
}

// m1 = updateColors(matrix1, word, Player2, Player1);