'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).run( function($rootScope, $http){
  console.log("run!");
  $rootScope.dataPresent = false;
  $rootScope.countries = [];
  $rootScope.dane = [];
  $rootScope.mkAction = function() {console.log("to override!");}
  $http.get("http://cohesiondata.ec.europa.eu/api/views/8hcd-z58p/rows.json?accessType=DOWNLOAD")
  .success(function(res){
    $rootScope.dane = [];
    for(var i in res.data) {
      $rootScope.dane.push({"reg":res.data[i][9], "co": res.data[i][8].substring(0,2),  "up": res.data[i][10]});
    }
    console.log("load data: " + $rootScope.dane.length);
    $rootScope.dataPresent = true
    $rootScope.countries = [];
    var lastCount = ""
    var accum = 0.0;
    var up = 0.0;
    var elems = 0;
    if($rootScope.dane[0].co) {
      lastCount = $rootScope.dane[0].co;
    }

      for(var i in $rootScope.dane) {
        var c = $rootScope.dane[i].co;
        if(lastCount == c) {
          up = parseFloat($rootScope.dane[i].up);
          elems += 1;
          if(!isNaN(up)) accum += up;
        }
        else {

          $rootScope.countries.push({co:lastCount, up:(accum/elems)});
          lastCount = c;
          up = parseFloat($rootScope.dane[i].up);
          accum = 0.0;
          elems = 1;
          if(!isNaN(up)) accum =+ up;
        }

      }
      console.log("create countries done. length: " + $rootScope.countries.length);
      //$rootScope.country = $rootScope.dane[0]
      $rootScope.mkAction();
  });
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

google.load('visualization', '1.0', {'packages':['corechart', 'bar']});
