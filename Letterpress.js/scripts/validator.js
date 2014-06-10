var submittedWords = [];

function checkIfWordRepeats(word) {

    for (var i = 0; i < submittedWords.length; i++) {

        var answer = submittedWords[i].indexOf(word);

        if (answer !== -1) {
            return true;
        }
    }
    return false;
}

function addToSubmittedWords(word) {
    submittedWords.push(word);
}




