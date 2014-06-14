var submittedWords = [];

function wordIsUsed(word) {
	var answer = false;
	for(var i = 0; i < submittedWords.length; i=i+1){
		if(submittedWords[i].indexOf(word) !== -1){
			answer = true;
		}		
	}
	return answer;
}

function addToSubmittedWords(word) {
    submittedWords.push(word);
}