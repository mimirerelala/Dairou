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

function initializePlayers() {
	Player1 = new Player("Zhivko", colors.red, colors.darkRed );
	Player2 = new Player("Villy", colors.blue, colors.darkBlue);
}


function exampleWord () {
	word[0] = new Tile('g',colors.gray,30,30,10,[4,1]);
	word[1] = new Tile('g',colors.red,30,30,10,[3,1]);
	word[2] = new Tile('g',colors.blue,30,30,10,[0,0]);
	word[3] = new Tile('g',colors.blue,30,30,10,[0,1]);
	word[4] = new Tile('g',colors.blue,30,30,10,[1,0]);	
}
function initializeColorMatrix() {
	var matrix1 =[[colors.gray,colors.gray,colors.gray,colors.gray,colors.gray],
             [colors.gray,colors.gray,colors.gray,colors.gray,colors.gray],
             [colors.gray,colors.gray,colors.gray,colors.gray,colors.gray],
             [colors.gray,colors.gray,colors.gray,colors.gray,colors.gray],
             [colors.gray,colors.gray,colors.gray,colors.gray,colors.gray]];
}

