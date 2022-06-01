
--CREATE USER 'user'@'localhost' IDENTIFIED BY 'qwerty';
--GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';
--ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerty' //dla UBUNTU
--CREATE DATABASE dieta DEFAULT CHARSET=utf8;
--source nazwa.sqlprod

use dieta;

CREATE TABLE product ( id int AUTO_INCREMENT, weight int, shortname varchar(255), description text, calorie int, protein int, carbohydrate int, fat int, PRIMARY KEY(id));

CREATE TABLE recipe ( id int AUTO_INCREMENT, title varchar(255), description text, PRIMARY KEY(id));

CREATE TABLE productlist (recipeid int, productid int, quantity int, 
 FOREIGN KEY (recipeid) REFERENCES recipe(id),  FOREIGN KEY (productid) REFERENCES product(id)); 
