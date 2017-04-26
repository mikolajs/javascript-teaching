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
	$http.get("http://www.w3schools.com/angular/customers.php")
	.success( function(response) {
		console.log("GET Groups!");
	});




  $scope.editHostName = "";
  $scope.editHostIp = "";
  $scope.editHostFirm = false;
  $scope.editHostId= -9999;
  $scope.showErrorMessageHost = false;
  $scope.errorMessageHost = "";
  $scope.inputGroupName = "";

  $scope.change = function(){
    $scope.groupEditClose();
	}

  $scope.addGroupOpen = function(){
		$scope.openAdd = true;
		$scope.openEdit = false;
	}

	$scope.editGroupOpen = function(){
		$scope.addGroupName = $scope.activeGroup.name;
		$scope.openAdd = false;
		$scope.openEdit = true;
	}

	$scope.groupEditClose = function(){
		$scope.openAdd = false;
		$scope.openEdit = false;
	}

	$scope.delGroup = function(){

	}

	$scope.addGroup = function() {
		$scope.groupEditClose();
	}

	$scope.editGroup = function() {
		$scope.groupEditClose();
		var name = $scope.addGroupName;
		var i = findGroup(name);
		if(i >= 0) $scope.groups[i].name = name;
	}


	//prywatne dodatkowe
	var findGroup = function(name){
		for(i in $scope.groups) {
			if($scope.groups[i].name === name) return i;
		}
		return -1;
	}

  /*


  $scope.removeHostFromGroup = function(index){
    if(confirm("Chcesz usunąć z grupy hosta:  " + $rootScope.hosts[index].name + "?")){
      var removeHost = $rootScope.hosts.splice(index,1)[0];
      $scope.hosts.push(removeHost);
    }
  }

  $scope.editHost = function(index){
    var host =  $scope.hostsAvail[index];
    $scope.editHostName = host.name;
    $scope.editHostIp = host.ip;
    $scope.editHostFirm = (host.firm == 'Tak') ;
    $scope.editHostId = host.id;
  }

  $scope.addToGroup = function(index){
    var removeHost = $scope.hostsAvail.splice(index,1)[0];
    $rootScope.hosts.push(removeHost);
    $scope._clearEdit();
  }

  $scope.addHost = function(){
       if(!$scope._isValid()) return;
      var firmTemp = 'Nie';
      if($scope.editHostFirm) firmTemp = 'Tak' ;
       $scope.hostsAvail.push({id:Math.floor(Math.random()*-1000) ,
         name:$scope.editHostName,
        ip:$scope.editHostIp,
        firm:firmTemp,
        ping:"------"});
      $scope._clearEdit();

  }

  $scope.alterHost = function(){
        if(!$scope._isValid()) return;
       for(i in $scope.hostsAvail){
           if($scope.hostsAvail[i].id == $scope.editHostId ){
             $scope.hostsAvail[i].name  = $scope.editHostName;
             $scope.hostsAvail[i].ip = $scope.editHostIp;
             if($scope.editHostFirm) $scope.hostsAvail[i].firm = 'Tak' ;
             else $scope.hostsAvail[i].firm = 'Nie' ;
             $scope._clearEdit();
             return;
           }
         }
      alert("Błąd, nie znaleziono elementu do zmiany");l
    }

  $scope.delHost = function(){
    //if( $scope.editHostId){$scope._clearEdit(); return;}
    if (confirm("Na pewno chcesz usunąć hosta  " + $scope.editHostId + " : " + $scope.editHostName + "?" )) {
       for(i in $scope.hostsAvail){
         if($scope.hostsAvail[i].id == $scope.editHostId ){
         $scope.hostsAvail.splice(i,1);
          $scope._clearEdit();
           return;
           }
         }
      $scope._clearEdit();
    }
  }

  $scope.firmIpInputChanged = function(){
    $scope.editHostFirm = true;
  }


  $scope._clearEdit = function() {
    $scope.editHostName = "";
    $scope.editHostIp = "";
    $scope.editHostFirm = false;
    $scope.editHostId = -9999;
    $scope.showErrorMessageHost = false;
    $scope.errorMessageHost = "";
  }

  $scope._isValid = function() {
    var valid = true;
    if($scope.editHostName.length < 3) {
      $scope.showErrorMessageHost = true;
      $scope.errorMessageHost = "Nazwa musi być dłuższa. ";
      valid = false;
    }
    if($scope.editHostFirm && $scope.editHostIp.length < 3){
      $scope.showErrorMessageHost = true;
      $scope.errorMessageHost += "  Domena/Ip musi być dłuższa.";
      valid = false;
    }
    return valid;
  }

  $scope.add = function() {
		$scope.inputGroupName = "";
		$scope.openEdit = false;
		$scope.openAdd = true;

	}

	$scope.edit = function() {
		$scope.inputGroupName = $scope.activeGroup.name;
		$scope.openAdd = false;
		$scope.openEdit = true;
	}

	$scope.delete = function(){
		if(confirm("Chcesz usunąć grupę " + $scope.activeGroup.name + "?\n" +
				"Wszelkie informacje o grupie zostaną utracone!")) {
			alert("Kasuję");
		}

	}

	$scope.save = function() {
		$scope.activeGroup.name = $scope.inputGroupName;
		$scope.openAdd = false;
	}

	$scope.alter = function() {

		$scope.openEdit = false;
	}

	$scope.close = function(){
		$scope.openAdd = false;
		$scope.openEdit = false;
	}

	$scope.getHosts = function() {

		//alert($rootScope.groupId);
		//mockuped!!!!!
		for(i in hostMockup) if(hostMockup[i].id == $rootScope.groupId) return hostMockup[i].hosts;
	}


	$scope.ajaxSave = function(){

	}
	$scope.ajaxAlter = function(){

	}
	$scope.change();
  */
});
