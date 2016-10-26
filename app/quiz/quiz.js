'use strict';

angular.module('quizApp.quiz', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/quiz', {
		templateUrl: 'quiz/quiz.html',
		controller: 'QuizCtrl'
	});
}])

.controller('QuizCtrl', ['$scope', '$location', 'quizMetrics', 'DataService', function($scope, $location, quizMetrics, DataService){

	$scope.quizMetrics = quizMetrics;
	DataService.then(function(successRes){
		$scope.quizData = successRes.quizData;
		// console.log($scope.quizData);
	});
	$scope.activeQues = 0;
	$scope.finalize = true;
	$scope.quizPanel = true;

	$scope.backToFact = function(){
		// console.log($scope.quizMetrics);
		quizMetrics.changeState("fact", false);
		// console.log($scope.quizMetrics);
	};

	var numQuesAnswered = 0;
	$scope.quesAnswered = function(){
		var quizLength = $scope.quizData.length;
		// console.log(quizLength);
		if($scope.quizData[$scope.activeQues].selected !== null){
			numQuesAnswered++;
			// console.log(numQuesAnswered);
			if(numQuesAnswered >= quizLength){
				//finalise quiz
				if($scope.activeQues === (quizLength - 1)){
					$scope.quizStats();
					if($scope.Unanswered === 0){
						$scope.finalize = false;
						$scope.quizPanel = false;
						return;
					}
				}
			}
		}

		$scope.setActiveQues();
	};

	$scope.setActiveQues = function(){
		var quizLength = $scope.quizData.length - 1;
		if($scope.activeQues < quizLength){
			$scope.activeQues++;
		} else {
			$scope.activeQues = 0;
		}
		// console.log($scope.activeQues);
	};

	$scope.prevQues = function(){
		$scope.activeQues--;
	}

	$scope.setQues = function(index){
		$scope.activeQues = index;
	};

	$scope.selectAns = function(index){
		$scope.quizData[$scope.activeQues].selected = index;
		// alert($scope.quizData[$scope.activeQues].selected);
	};

	$scope.quizSubmit = function(){
		$("#submitModal").modal("show");
	};

	$scope.quizStats = function(){
		var quizLength = $scope.quizData.length;
		var numQuesAnswered = 0;
		for(var i=0; i<quizLength; i++){
			if($scope.quizData[i].selected !== null){
				numQuesAnswered++;
			}
		}
		var quesUnanswered = quizLength - numQuesAnswered;
		$scope.Answered = numQuesAnswered;
		$scope.Unanswered = quesUnanswered;
	};

	$scope.getBackToQuiz = function(){
		$scope.finalize = true;
		$scope.quizPanel = true;
	};

	$scope.showResult = function(){
		quizMetrics.markQuiz();
		$("#submitModal").modal("hide");
		// console.log($scope.quizMetrics);
		// console.log($scope.quizData);
		quizMetrics.changeState("result", true);
		quizMetrics.changeState("quiz", true);
	};
}])