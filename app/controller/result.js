angular.module('quizApp')

.controller('ResultCtrl', ['$scope', 'quizMetrics', 'DataService', function($scope, quizMetrics, DataService){
	$scope.quizMetrics = quizMetrics;
	DataService.then(function(successRes){
		$scope.quesData = successRes.quizData;
		$scope.totalQues = $scope.quesData.length;
		$scope.correctAns = successRes.correctAns;
	});
	$scope.calPercent = function(){
		return ((quizMetrics.numCorrect/$scope.totalQues) * 100);
	}
	$scope.activeQues = 0;


	$scope.continueQues = function(){
		var len = $scope.quesData.length - 1;
		console.log(len);
		if($scope.activeQues < len){
			$scope.activeQues++;
			console.log($scope.activeQues);
		} else {
			$scope.activeQues = 0;
		}
	}

	$scope.optionReview = function(index){
		if(index === $scope.correctAns[$scope.activeQues]){
			return 'bg-success';
		} else if(index === $scope.quesData[$scope.activeQues].selected){
			if(index === $scope.correctAns[$scope.activeQues]){
				return 'bg-success';
			} else {
				return 'bg-danger';
			}
		}
	}

	$scope.showChart = true;
	$scope.viewChart = true;
	$scope.viewAnalytics = function(){
		$scope.showChart = false;
		$scope.viewChart = false;
		$scope.correct = $scope.quizMetrics.numCorrect;
		$scope.inCorrect = $scope.quizMetrics.numIncorrect;
		$scope.noAns = $scope.quizMetrics.numNull;
		alert($scope.inCorrect + " " + $scope.noAns + " " + $scope.correct);
		var ctx = $("#myChart");
		var myPieChart = new Chart(ctx, {
			type: 'pie',
			data: {
			    labels: [
			        "Incorrect",
			        "Not Answered",
			        "Correct"
			    ],
			    datasets: [
			        {
			            data: [$scope.inCorrect, $scope.noAns, $scope.correct],
			            backgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#99EDCC"
			            ],
			            hoverBackgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#99EDCC"
			            ]
			        }]
			},
			animation:{
		        animateScale:true
		    }
		});
	}

}])