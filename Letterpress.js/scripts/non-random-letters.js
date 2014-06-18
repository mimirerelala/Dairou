function generateNonRandomLetters() {
    var randomWord;
    var dictLength = 1000; // words in dictionary = 11,381
    var neededLetters = 25;
    var repeat = 100;

    // for testing
    var minTries = Infinity;
    var maxTries = 0;
    var minWords = Infinity;
    var maxWords = 0;
    var totalUsedWords = 0;
    var usedWords = [];
    var tries = [0, 0, 0];

    for (var i = 0; i < repeat; i++) {

        tries[0] = 0;
        tries[1] = 0;

        usedWords = [];
        var boardFreqDict = createBoardFreqDict(neededLetters, dictLength, tries, usedWords);
        var boardLetters = freqDictToArray(boardFreqDict);

        if (boardLetters.length !== neededLetters)
            console.log('Bug!');

        shuffle(boardLetters);

        // for testing
        minTries = Math.min(tries[0], minTries);
        maxTries = Math.max(tries[0], maxTries);
        minWords = Math.min(tries[1], minWords);
        maxWords = Math.max(tries[1], maxWords);
        totalUsedWords += tries[1];
    }

    //    console.log('minTries = ' + minTries + ', maxTries = ' + maxTries);
    //    console.log('minWords = ' + minWords + ', maxWords = ' + maxWords);
    //    console.log('avg used words = ' + (totalUsedWords / repeat));
    //    console.log('avg letters in word = ' + (tries[2] / totalUsedWords));
    //    console.log(boardLetters.join('') + ' = [' + usedWords.join(', ') + ']');

    console.log('hint: [' + usedWords.join(', ') + ']');

    return boardLetters;
}

function createBoardFreqDict(neededLetters, dictLength, tries, usedWords) {
    var letterCount = 0;
    var boardDict = {};
    var maxWords = Math.min(activeDictionary.length, dictLength);

    while (letterCount < neededLetters) {
        tries[0]++;
        randomWord = activeDictionary[~~(Math.random() * maxWords)];
        var randomWordDict = createOccurnceDict(randomWord);

        var tempDict = cloneDict(boardDict);
        var newChars = 0;

        for (var ch in randomWordDict) {
            tempDict[ch] = tempDict[ch] || 0;
            if (randomWordDict[ch] > tempDict[ch]) {
                newChars += randomWordDict[ch] - tempDict[ch];
                tempDict[ch] = randomWordDict[ch];
            }
        }

        if (newChars > 0 && letterCount + newChars <= neededLetters) {
            boardDict = tempDict;
            letterCount += newChars;
            tries[1]++;
            tries[2] += randomWord.length;
            usedWords.push(randomWord);
        }
    }

    return boardDict;
}

function cloneDict(org) {
    var copy = {};
    for (var p in org)
        copy[p] = org[p];
    return copy;
}

function countLettersInDict(occurences) {
    var count = 0;
    for (var c in occurences) {
        count += occurences[c];
    }
    return count;
}

function freqDictToArray(occurnceDict) {
    var boardLetters = [];
    for (var ch in occurnceDict) {
        for (var j = 0; j < occurnceDict[ch]; j++) {
            boardLetters.push(ch.toUpperCase());
        }
    }

    return boardLetters;
}

function createOccurnceDict(string) {
    var count = {};
    string.split('').forEach(function (s) {
        count[s] ? count[s]++ : count[s] = 1;
    });
    return count;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}