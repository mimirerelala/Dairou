// The Tile class
function Tile(text, color, posX, posY, size, row, col) {
    this.boardX = posX;
    this.boardY = posY;
    this.X = posX;
    this.Y = posY;
    this.row = row;
    this.col = col;
    this.color = color;
    this.size = size;
    this.text = text;
    this.fontSize = ~~ (0.75 * size);
    this.fontFamiliy = "'Calibri'";
    this.fontColor = 'rgb(35, 35, 35)';
    this.font = "bold " + this.fontSize + "px " + this.fontFamiliy;
    this.isMoving = false;
    this.wasDragged = false;
    this.isUsedInWord = false;
}

// Checks if the coordinates supplied are inside the tile
Tile.prototype.isClicked = function (clickX, clickY) {
    return ((clickX > this.X) && (clickX < this.X + this.size) && (clickY > this.Y) && (clickY < this.Y + this.size));
};

// Draws the tile (a colored square with a letter on top)
Tile.prototype.draw = function (context) {
    context.fillStyle = this.color;
    if (!this.isMoving) {
        context.fillRect(this.X, this.Y, this.size, this.size);
        context.fillStyle = this.fontColor;
        context.font = this.font;

        context.fillText(
            this.text,
            this.X + (this.size / 2) - (context.measureText(this.text).width / 2),
            this.Y + (this.size / 2) + this.fontSize / 4
        );

    } else {
        context.save();
        context.beginPath();
        context.moveTo(this.X, this.Y); //1
        context.lineTo(this.X + this.size, this.Y); //2

        context.quadraticCurveTo((this.X + this.size * 0.95), this.Y + this.size * 0.6, (this.X + 1.05 * this.size), this.Y + this.size * 0.95); //3
        context.quadraticCurveTo((this.X + this.size * 0.55), this.Y + this.size * 0.9, this.X + this.size * 0.05, this.Y + this.size * 1.05); //4
        context.quadraticCurveTo(this.X - this.size * 0.05, this.Y + this.size * 0.55, this.X, this.Y); //5

        context.shadowColor = '#999';
        context.shadowBlur = 8;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.fill();

        context.restore();
        context.save();

        context.fillStyle = this.fontColor;
        context.font = this.font;
        context.translate(this.X + this.size * 0.5, this.Y + this.size * 0.5);
        context.rotate(-0 * Math.PI / 180);
        context.translate(-(this.X + this.size * 0.5), -(this.Y + this.size * 0.5));

        context.fillText(
            this.text,

            this.X + (this.size / 2) - (context.measureText(this.text).width / 2),
            this.Y + (this.size / 2) + this.fontSize / 4
        );

        context.restore();
    }

};

function findXText(x, y, angleOfRotation) {
    var cosAngleWithAngleOfRotation = x / (Math.sqrt(x * x + y * y));
    var angle = Math.acos(cosAngleWithAngleOfRotation) - angleOfRotation;
    var newX = Math.cos(angle) * (Math.sqrt(x * x + y * y));
    return newX;
}

function findYText(x, y, angleOfRotation) {
    var cosAngleWithAngleOfRotation = x / (Math.sqrt(x * x + y * y));
    var angle = Math.acos(cosAngleWithAngleOfRotation) - angleOfRotation;
    var newY = Math.sin(angle) * (Math.sqrt(x * x + y * y));
    return newY;
}