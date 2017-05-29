'use strict'

var groupsMockup = [{name:"Klasa",id:23}, {name:"Sala",id:22},{name:"Hala",id:34}];

var hostsMockup = [{id:23, hosts:[{id:234, name:"PC2", ip:"10.0.0.1"},
		               {id:224,name:"PC4", ip:"10.0.0.2"},
		               {id:134,name:"PC3", ip:"10.0.0.3"}]},
		               {id:22, hosts:[{id:232,name:"KOM1", ip:"10.0.2.1", firm:"Nie"},
		       		     {id:230,name:"KOM2", ip:"10.0.2.2"},
		       		     {id:204,name:"KOM3", ip:"10.0.2.4"}]},
		               {id:34,  hosts:[{id:284,name:"HAL1", ip:"199.0.0.1"},
			             {id:237,name:"HAL2", ip:"199.0.0.3"}]}
                  ];

exports.getGroups = function() {
  return groupsMockup;
}

exports.getHosts = function(id) {
  for(var i in hostsMockup){
    if(hostsMockup[i].id == id) return hostsMockup[i].hosts;
  }
  return {"Dane":("brak grupy hostów o id " + id)};
}

exports.setGroup = function(gName) {
  var lastId = groupsMockup[groupsMockup.length - 1].id;
  lastId++;
	var group = {name:gName, id:lastId}
  groupsMockup.push(group);
	return group;
}

exports.setHost = function(groupId, hostName, hostIp) {
   var hosts = getHosts(groupId);
   var lastId = hosts[hosts.length-1].id;
   lastId++;
	 var host = {id:lastId, name:name, ip:hostIp}
   hosts.push(host);
	 return host;
}
