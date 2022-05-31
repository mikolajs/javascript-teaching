'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $rootScope, $http) {
  if(!$scope.country) $scope.country = "";
  $scope.filtredCount = [];
  $scope.headers = ["Region", "Przyrost"];
  $scope.sortHead = $scope.headers[0];
  $scope.order = "A";

  $scope.mkSort = function(){
    console.log("Sortowanie po : " + $scope.sortHead + "  sposób: " + $scope.order);
    var comparator = function(){};
    if($scope.sortHead == $scope.headers[0]){
      console.log("sortowanie po Regionie");
      if($scope.order == "A") comparator = function(a, b){
        if(a.reg < b.reg) return -1;
        if(a.reg > b.reg) return 1;
        return 0;
      }
      else comparator = function (a, b) {
        if(b.reg < a.reg) return -1;
        if(b.reg > a.reg) return 1;
        return 0;
      }
    }
    else {
      console.log("sortowanie po Przyroście");
      if($scope.order == "A") comparator = function(a, b){
        return (a.up - b.up);
      }
      else comparator = function (a, b) {
        return (b.up - a.up);
      }
    }
    $rootScope.dane.sort(comparator);
  }

  $rootScope.mkAction = function(){
    if($rootScope.countries[0]) $scope.country = $rootScope.countries[0];
    $scope.mkSort();
    console.log("country set");
  }
  if($scope.country == "" && $rootScope.countries.length > 0)
      $scope.country = $rootScope.countries[0];

  $scope.mkSort();


});
