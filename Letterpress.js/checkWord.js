function checkIfWordRepeats(word) {

    var words = ['cats', 'dog', 'pigs', 'babysitter'];

    for (var i = 0; i < words.length; i++) {

        var answer = words[i].indexOf(word);

        if (answer !== -1) {
            return true;
        }
    }
    return false;
}
