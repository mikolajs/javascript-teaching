Create table GroupHosts (
   id INTEGER Primary Key AUTOINCREMENT,
   name TEXT
);
CREATE table Hosts (
   id INTEGER Primary Key AUTOINCREMENT,
   name TEXT,
   ip TEXT,
   ghid INTEGER,
   FOREIGN KEY(ghid) REFERENCES ghidHosts(id)
);

INSERT INTO GroupHosts (name) values ('Klasa');
INSERT INTO GroupHosts (name) values ('Sala');
INSERT INTO GroupHosts (name) values ('Hala');

INSERT INTO Hosts (name, ip, ghid) values ('PC1', '10.0.0.1', 1);
INSERT INTO Hosts (name, ip, ghid) values ('PC2', '10.0.0.2', 1);
INSERT INTO Hosts (name, ip, ghid) values ('PC3', '10.0.0.3', 1);
INSERT INTO Hosts (name, ip, ghid) values ('PC4', '10.0.0.4', 1);

INSERT INTO Hosts (name, ip, ghid) values ('KOM1', '10.0.2.1', 2);
INSERT INTO Hosts (name, ip, ghid) values ('KOM2', '10.0.2.2', 2);
INSERT INTO Hosts (name, ip, ghid) values ('KOM3', '10.0.2.3', 2);
INSERT INTO Hosts (name, ip, ghid) values ('KOM4', '10.0.2.4', 2);

INSERT INTO Hosts (name, ip, ghid) values ('HAL1', '192.168.2.1', 3);
INSERT INTO Hosts (name, ip, ghid) values ('HAL2', '192.168.2.2', 3);
