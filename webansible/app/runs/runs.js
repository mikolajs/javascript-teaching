'use strict';

angular.module('myApp.runs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/runs', {
    templateUrl: 'runs/runs.html',
    controller: 'runsCtrl'
  });
}])

.controller('runsCtrl', [function() {

}]);
