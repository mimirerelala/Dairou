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

 var colors = {
    red: "rgb(247,153,141)",
    blue: "rgb(120,200,245)",
    gray: "rgb(225, 225, 225)",
    darkRed: "rgb(255, 67, 47)",
    darkBlue: "rgb(0, 162, 255)",
    lightGray: "rgb(230, 230, 230)",
};



Player1 = new Player("Zhivko", colors.red, 'darkRed' );
Player2 = new Player("Villy", colors.blue, 'darkBlue');


