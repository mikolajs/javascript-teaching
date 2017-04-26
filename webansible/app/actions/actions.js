'use strict';

angular.module('myApp.actions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/actions', {
    templateUrl: 'actions/actions.html',
    controller: 'actionsCtrl'
  });
}])

.controller('actionsCtrl', [function() {

}]);
