'use strict';

angular.module('quizApp')
.factory('DataService', DataFactory);

DataFactory.$inject = ['$http'];

function DataFactory($http){

	return $http.get("questions.json").then(function(response){
		return response.data;
	});
}