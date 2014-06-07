 // The Tile class
function Tile(text, color, posX, posY, size) {
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