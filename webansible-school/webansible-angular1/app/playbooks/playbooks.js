'use strict';

angular.module('myApp.playbooks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/playbooks', {
    templateUrl: 'playbooks/playbooks.html',
    controller: 'playbooksCtrl'
  });
}])

.controller('playbooksCtrl', [function() {

}]);
