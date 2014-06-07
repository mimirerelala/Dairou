function mouseDownListener(evt) {
    var mousePos = getMousePos(canvas, evt);

    // The index of the tile being clicked or -1 if no tile was clicked
    var dragIndex = getDragIndex(mousePos.X, mousePos.Y);

    if (dragIndex > -1) {
        isDragging = true;
        window.addEventListener("mousemove", mouseMoveListener, false);

        dragTile = tiles[dragIndex];

        // We now place the currently dragged tile on top by placing it last in the array.
        tiles.push(tiles.splice(dragIndex, 1)[0]);

        // We record the point on the dragged tile where the mouse is "holding" it:          
        dragTile.clickOffsetX = mousePos.X - dragTile.X;
        dragTile.clickOffsetY = mousePos.Y - dragTile.Y;

        // The "target" position is where the object should be if it were to move there instantaneously. But we will
        // set up the code so that this target position is approached gradually, producing a smooth motion. 
        dragTile.targetPosX = dragTile.X;
        dragTile.targetPosY = dragTile.Y;

        // Start timer
        timer = setInterval(onTimerTick, 1000 / 60);
    }
    canvas.removeEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    // Prevents the mouse down from having an effect on the main browser window:
    evt.preventDefault();
}

function mouseUpListener(evt) {
    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    if (isDragging) {
        isDragging = false;
        // Make the tile return to its intial position
        dragTile.targetPosX = dragTile.initalX;
        dragTile.targetPosY = dragTile.initalY;
        window.removeEventListener("mousemove", mouseMoveListener, false);
    }
}

function mouseMoveListener(evt) {
    // Updates target position
    var minX = 0;
    var maxX = canvas.width - dragTile.size;
    var minY = 0;
    var maxY = canvas.height - dragTile.size;

    var mousePos = getMousePos(canvas, evt);

    // Clamp x and y positions to prevent object from dragging outside of canvas
    dragTile.targetPosX = Math.min(Math.max(mousePos.X - dragTile.clickOffsetX, minX), maxX);
    dragTile.targetPosY = Math.min(Math.max(mousePos.Y - dragTile.clickOffsetY, minY), maxY);
}