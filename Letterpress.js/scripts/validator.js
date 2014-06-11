var submittedWords = [];

function wordIsUsed(word) {
    return submittedWords.indexOf(word) > -1 ? true : false;
}

function addToSubmittedWords(word) {
    submittedWords.push(word);
}