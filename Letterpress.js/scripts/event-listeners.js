function mouseDownListener(evt) {
    var mousePos = getMousePos(canvas, evt);

    // The index of the tile being clicked or -1 if no tile was clicked
    var dragIndex = getDragIndex(mousePos.X, mousePos.Y);

    if (dragIndex > -1) {
        tiles[dragIndex].onMouseDown(mousePos, dragIndex);
    } else if (wordHolder.wordLetters.length > 0) {
        // check if one of the buttons is clicked (submit, clear etc.)
        var word = wordHolder.word().toLowerCase();
        if (submitButton.isClicked(mousePos.X, mousePos.Y)) {
            if (wordIsUsed(word)) {
                alert('Word already used!');
            } else if (!isWordCorrect(word)) {
                alert('Not a valid word!');
            } else {
                console.log("word submitted");
                addToSubmittedWords(word);
                // return tiles to their places with new color
                //updateColors(matrixColors, wordHolder.wordLetters, gamePlayers[0], gamePlayers[1]);
                //switchPlayers(gamePlayers);

                updateScores();
                // clear is called last!
                wordHolder.clear();
            }
        } else {
            if (clearButton.isClicked(mousePos.X, mousePos.Y)) {
                wordHolder.clear();
            }
        }
    }
    canvas.removeEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    // Prevents the mouse down from having an effect on the main browser window:
    evt.preventDefault();
}

function mouseMoveListener(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isDragging) {
        dragTile.updateTargetPosition(mousePos);
    }
}

function mouseUpListener(evt) {
    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    if (isDragging) {
        isDragging = false;
        dragTile.onMouseUp();
        window.removeEventListener("mousemove", mouseMoveListener, false);
    }
}

// Returns the index of the tile being clicked or -1 if no tile was clicked
function getDragIndex(mouseX, mouseY) {
    var dragIndex = -1;
    // the variable will be overwritten to ensure only the topmost tile is dragged
    for (var i = 0; i < tiles.length; i++)
        if (tiles[i].isClicked(mouseX, mouseY))
            dragIndex = i;
    return dragIndex;
}

// Translates the mouse position to canvas coodrinates
function getMousePos(canvas, evt) {
    var bRect = canvas.getBoundingClientRect();
    return {
        X: (evt.clientX - bRect.left) * (canvas.width / bRect.width),
        Y: (evt.clientY - bRect.top) * (canvas.height / bRect.height)
    };
}

// Runs while the timer is ticking
function onTimerTick() {
    var noTilesMoving = true;
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].move();
        if (tiles[i].isMoving)
            noTilesMoving = false;
    }

    if (noTilesMoving) {
        if (timer) {
            clearInterval(timer);
            timer = false;
        }
    }

    drawScreen();

    //console.log(timer);
}

Tile.prototype.onMouseDown = function (mousePos, dragIndex) {
    isDragging = true;
    this.wasDragged = false; // not yet
    window.addEventListener("mousemove", mouseMoveListener, false);

    dragTile = this;
    this.isMoving = true;

    // We now place the currently dragged tile on top by placing it last in the array.
    tiles.push(tiles.splice(dragIndex, 1)[0]);

    // We record the point on the dragged tile where the mouse is "holding" it:          
    this.clickOffsetX = mousePos.X - this.X;
    this.clickOffsetY = mousePos.Y - this.Y;

    // remember where the tile starts from, so it can return back to this position
    this.anchorX = this.X;
    this.anchorY = this.Y;

    // The "target" position is where the object should be if it were to move there instantaneously. But we will
    // set up the code so that this target position is approached gradually, producing a smooth motion. 
    this.targetPosX = this.X;
    this.targetPosY = this.Y;

    // Start timer
    if (!timer)
        timer = setInterval(onTimerTick, 1000 / 60);
}

Tile.prototype.updateTargetPosition = function (mousePos) {
    // check isDragging just in case
    if (isDragging) {
        var minX = 0;
        var maxX = canvas.width - this.size;
        var minY = 0;
        var maxY = canvas.height - this.size;

        // Clamp x and y positions to prevent object from dragging outside of canvas
        this.targetPosX = Math.min(Math.max(mousePos.X - this.clickOffsetX, minX), maxX);
        this.targetPosY = Math.min(Math.max(mousePos.Y - this.clickOffsetY, minY), maxY);
    }
}

Tile.prototype.move = function () {
    if (this.isMoving) {
        // The next variable controls the lag in the tile movement (from 0 to 1)
        var easeAmount = 0.15;
        // Update the moving tile position
        this.X += easeAmount * (this.targetPosX - this.X);
        this.Y += easeAmount * (this.targetPosY - this.Y);

        if ((Math.abs(this.X - this.anchorX) > 2) || (Math.abs(this.Y - this.anchorY) > 2)) {
            this.wasDragged = true;
        }

        // Stop the motion when the target position is reached (close enough)
        if ((!isDragging) && (Math.abs(this.X - this.targetPosX) < 1) && (Math.abs(this.Y - this.targetPosY) < 1)) {
            // Snap the tile to its final position
            this.X = this.targetPosX;
            this.Y = this.targetPosY;

            this.isMoving = false;
            this.wasDragged = false;
        }

        if (isDragging && dragTile === this) {
            if (this.isUsedInWord) {
                if (this.Y + this.size / 2 < boardY) {
                    wordHolder.rearrangeWord(this);
                } else {
                    wordHolder.removeTile(this);
                }
            } else {
                if (this.Y + this.size / 2 < boardY) {
                    wordHolder.insertTile(this);
                }
            }
        }
    }
}

Tile.prototype.onMouseUp = function () {
    if (this.wasDragged) {
        if (!this.isUsedInWord && (this.Y - this.targetPosY > 5)) {
            // tile is not used in word and is moving up
            wordHolder.addTile(this);

        } else if (this.isUsedInWord && (this.Y + this.size / 2 >= boardY)) {
            // tile is used in word and released down
            wordHolder.removeTile(this);
        } else {
            // return it to its starting position (where the drag started)
            this.snapBack();
        }
    } else {
        // tile was clicked
        if (this.isUsedInWord) {
            wordHolder.removeTile(this);
            this.snapBack();
        } else {
            wordHolder.addTile(this);
        }
    }
}

// Points the tile to its anchor position (where the drag started)
Tile.prototype.snapBack = function () {
    this.targetPosX = this.anchorX;
    this.targetPosY = this.anchorY;
}