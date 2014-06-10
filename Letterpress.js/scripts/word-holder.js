 // A class to hold the top row of letters that form the word
 function WordHolder(posX, posY) {
     this.X = posX;
     this.Y = posY;
     this.wordLetters = [];
 }

 // Returns the letters as string
WordHolder.prototype.word = function() {
     var word = this.wordLetters[0].text;
     for (var i = 1; i < this.wordLetters.length; i++) {
         word = word + this.wordwordLetters[i].text;
     };
     return word;
 };
 // Clears the letters
 WordHolder.prototype.clear = function () {
     this.wordLetters = [];
 };

 // Adds a tile
 WordHolder.prototype.addTile = function (tile) {

     if ((tile.Y - tile.targetPosY > 5) || (tile.Y + tileSize / 2 < boardY) || this.wordLetters.length == 1) {
         // moving up or released up
         this.wordLetters.push(tile);
     } else {
         var leftPadding = (canvas.width - this.wordLetters.length * tileSize) / 2;
         var tileX = Math.max(tile.X + (tileSize / 2) - leftPadding, 0);
         var newIndex = Math.min(~~(tileX / tileSize), this.wordLetters.length - 1);
         this.wordLetters.splice(newIndex, 0, tile);
     }

     this.updateTilePositions(-1);
     tile.isUsedInWord = true;

     //console.log(this.word());
 };

 // Removes a tile
 WordHolder.prototype.removeTile = function (tile) {
     var index = this.wordLetters.indexOf(tile);
     if (index > -1) {
         this.wordLetters.splice(index, 1);
         this.updateTilePositions(-1);
         tile.isUsedInWord = false;

         tile.targetPosX = tile.boardX;
         tile.targetPosY = tile.boardY;
     }

     //console.log(this.word());
 };

 // Update tile positions
 WordHolder.prototype.updateTilePositions = function (newIndex) {
     var leftPadding = (canvas.width - this.wordLetters.length * tileSize) / 2;
     for (var t = 0; t < this.wordLetters.length; t += 1) {

         if (t === newIndex) {

             this.wordLetters[t].startDragX = leftPadding + t * tileSize;
             this.wordLetters[t].startDragY = this.Y;
         } else {
             this.wordLetters[t].targetPosX = leftPadding + t * tileSize;
             this.wordLetters[t].targetPosY = this.Y;
             this.wordLetters[t].isMoving = true;
         }
     }

     // Start timer
     if (!timer)
         timer = setInterval(onTimerTick, 1000 / 60);
 };

 // Update tile positions
 WordHolder.prototype.updateWord = function (draggedTile) {
     if (this.wordLetters.length == 1)
         return;

     var leftPadding = (canvas.width - this.wordLetters.length * tileSize) / 2;
     var tileX = Math.max(draggedTile.X + (tileSize / 2) - leftPadding, 0);
     var newIndex = Math.min(~~(tileX / tileSize), this.wordLetters.length - 1);

     var oldIndex = this.wordLetters.indexOf(draggedTile);
     if (newIndex === oldIndex) {
         return;
     }

     // rearrange tiles
     this.wordLetters.move(oldIndex, newIndex);
     this.updateTilePositions(newIndex);
 };

 Array.prototype.move = function (old_index, new_index) {
     if (new_index >= this.length) {
         var k = new_index - this.length;
         while ((k--) + 1) {
             this.push(undefined);
         }
     }
     this.splice(new_index, 0, this.splice(old_index, 1)[0]);
     return this; // for testing purposes
 };
