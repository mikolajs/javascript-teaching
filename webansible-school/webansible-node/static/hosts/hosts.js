'use strict';


angular.module('myApp.hosts', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hosts', {
    templateUrl: 'hosts/hosts.html',
    controller: 'hostsCtrl'
  });
}])
.controller('hostsCtrl', function($scope, $http) {
  $scope.openAdd = false;
  $scope.openEdit = false;
	$scope.groups = [];
	$scope.hosts = [];
	$scope.activeGroup = {};
  //ładowanie danych

  refreshGroups(true);

  $scope.newGroupName = "";
  $scope.editGroupName = "";


  $scope.editHostName = "";
  $scope.editHostIp = "";

  $scope.change = function(){
    $scope.groupEditClose();
    refreshHosts();
	}

  $scope.addGroupOpen = function(){
		$scope.openAdd = true;
		$scope.openEdit = false;
	}

	$scope.editGroupOpen = function(){
		$scope.editGroupName = $scope.activeGroup.name;
		$scope.openAdd = false;
		$scope.openEdit = true;
	}

	$scope.groupEditClose = function(){
		$scope.openAdd = false;
		$scope.openEdit = false;
	}

	$scope.delGroup = function(){
    $http.get('/api/del?t=g&id='+$scope.activeGroup.id)
     .success(function(res){
       if(res.Ans == 'OK'){
         $scope.activeGroup = {};
         refreshGroups(true);
       }
       else alert("Nie udało się usunąć grupy. Usuń napierw komputery")
     });
	}

	$scope.addGroup = function() {
    if($scope.newGroupName.length < 2) {
      alert('Nazwa grupy za krótka!');
      return;
    }
    $http.get('/api/ins?t=g&n='+$scope.newGroupName)
     .success(function(res){
       if(res.Ans == 'OK'){
         refreshGroups(false);
       }
       else alert("Nie udało się dodać grupy")
     });
     $scope.groupEditClose();
	}

	$scope.editGroup = function() {
    if($scope.editGroupName.length < 2) {
      alert('Nazwa grupy za krótka!');
      return;
    }
    $http.get('/api/alt?t=g&n='+$scope.editGroupName + '&id=' +$scope.activeGroup.id)
     .success(function(res){
       if(res.Ans == 'OK'){
         refreshGroups(false);
       }
       else alert("Nie udało się dodać grupy")
     });
     $scope.groupEditClose();
	}
  $scope.addHost = function() {
    $http.get('/api/ins?t=h&n='+$scope.editHostName +
       '&ip=' + $scope.editHostIp + '&id=' +$scope.activeGroup.id)
     .success(function(res){
       if(res.Ans == 'OK'){
         refreshHosts();
         //$scope.editHostName = "";
         //$scope.editHostIp = "";
       }
       else alert("Nie udało się dodać hosta")
     });
  }

  $scope.delHost = function(index){
    $http.get("/api/del?t=h&id=" + $scope.hosts[index].id)
    .success(function(res){
      if(res.Ans == 'OK') {
        $scope.hosts.splice(index, 1);
      }
      else alert("Nieudane usunięcie hosta");
    });
  }

  $scope.clearHostForm = function() {
      $scope.editHostName = "";
      $scope.editHostIp = "";
  }

	//prywatne dodatkowe
  function refreshGroups(hosts){
    $http.get("/api/get?t=g")
    .success( function(response) {
      console.log("GET Groups!");
      $scope.groups = response;
      if(!$scope.activeGroup.id)
        $scope.activeGroup = $scope.groups[0];
      if(hosts) refreshHosts();
    });
  }

  function refreshHosts(){
    $http.get("/api/get?t=h&id="+$scope.activeGroup.id )
    .success( function(response) {
      console.log("GET Hosts!");
      $scope.hosts = response;
    });
  }

});
