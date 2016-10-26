'use strict';

// Declare app level module which depends on views, and components
angular.module('quizApp', [
  'ngRoute',
  'quizApp.quiz'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');

  //$routeProvider.otherwise({redirectTo: '/view1'});
}]).
controller('listCtrl', ['$scope', '$http', '$location', 'quizMetrics', ListController])

// ListController.$inject = ['quizMetrics'];

function ListController($scope, $http, $location, quizMetrics) {

	$scope.quizMetrics = quizMetrics;
	console.log($scope.quizMetrics);

	$http.get("lists.json").then(function(response){
		$scope.myData = response.data.factsData;
	});

	$scope.displayInfo = function(data){
		$scope.activeDevice = data;
		console.log($scope.activeDevice.name);
	};

	$scope.search = "";

	$scope.quizRoute = function(){
		quizMetrics.changeState("fact", true);
		quizMetrics.changeState("quiz", false);
		$location.path('/quiz');
	};
}


