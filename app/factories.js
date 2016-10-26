'use strict';

angular.module('quizApp')
.factory('quizMetrics', ['DataService', function(DataService){
	var quizObj = {
		activeFact: false,
		resultActive: false,
		activeQuiz: true,
		changeState: changeState,
		markQuiz: markQuiz,
		correctAnswers: [],
		// quesData: {},
		numCorrect: 0,
		numIncorrect: 0,
		numNull: 0
	};
	return quizObj;

	function changeState(metric, state){
		if(metric === "fact") {
			quizObj.activeFact = state;
		} else if(metric === "result"){
			quizObj.resultActive = state;
		} else if(metric === "quiz"){
			quizObj.activeQuiz = state;
		}
	}

	function markQuiz(){
		DataService.then(function(successRes){
			quizObj.correctAnswers = successRes.correctAns;
			for(var i = 0; i < successRes.quizData.length; i++){
				if(successRes.quizData[i].selected !== null){
					if(successRes.quizData[i].selected === successRes.correctAns[i]){
						successRes.quizData[i].correct = true;
						quizObj.numCorrect++;
					} else {
						successRes.quizData[i].correct = false;
						quizObj.numIncorrect++;
					}
				} else {
					successRes.quizData[i].correct = null;
					quizObj.numNull++;
				}
			}
		});
		
	}
}]);