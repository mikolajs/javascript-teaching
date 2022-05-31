'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $rootScope) {

  $rootScope.mkAction = function() {
        console.log("create chart");
        var table = [["Symbol kraju", "Przyrost średni", { role: 'annotation' }]];
        for(var i in $rootScope.countries) {
          table.push([$rootScope.countries[i].co,
            $rootScope.countries[i].up, $rootScope.countries[i].up.toFixed(1) + "%"] );
        }
        var data = google.visualization.arrayToDataTable(table);
        var options = {'width':600, 'height': 800, 'legend':'none',
        'chartArea': {'width': '100%', 'height': '100%'}}
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
}
  $rootScope.mkAction();

});
