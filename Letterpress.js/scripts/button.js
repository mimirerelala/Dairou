// The Button class
function Button(text, color, posX, posY, size) {
    this.X = posX;
    this.Y = posY;
    this.color = color;
    this.size = size;
    this.text = text;
    this.fontSize = +(0.75 * size);
    this.fontFamiliy = "'Calibri'";
    this.fontColor = 'rgb(35, 35, 35)';
    this.font = "bold " + this.fontSize + "px " + this.fontFamiliy;
    this.isMoving = false;
}

// Checks if the coordinates supplied are inside the button
Button.prototype.isClicked = function (clickX, clickY) {
    return ((clickX > this.X) && (clickX < this.X + this.size) && (clickY > this.Y) && (clickY < this.Y + this.size));
};

// Draws the button (a colored square with a letter on top)
Button.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.X, this.Y, this.size * 3, this.size);

    context.fillStyle = this.fontColor;
    context.font = this.font;
    context.fillText(
        this.text,
        this.X + (this.size) - (context.measureText(this.text).width / 4),
        this.Y + (this.size / 2) + this.fontSize / 4
    );
};
