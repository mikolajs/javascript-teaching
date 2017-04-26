'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.hosts',
  'myApp.actions',
  'myApp.runs',
  'myApp.join'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/hosts'});
}]);
