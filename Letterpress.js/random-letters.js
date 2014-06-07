function generateRandomLeters() {
    var letters = [],
        currentCharCode,
        currentLetter,
        lettersCount = 25,
        startCode = 'A'.charCodeAt(0),
        endCode = 'Z'.charCodeAt(0);        

    for (var i = 0; i < lettersCount; i += 1) {
        currentCharCode = getRandomInt(startCode, endCode);
        currentLetter = String.fromCharCode(currentCharCode);
        letters[i] = currentLetter;
    }

    return letters;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}