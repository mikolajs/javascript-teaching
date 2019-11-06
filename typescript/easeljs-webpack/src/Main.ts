
import { Help } from "./Help"

class Main {
 a : number
 h : Help
 constructor(){
   this.a = 2
   this.h = new Help()
 }
 start(){
  this.h.mk()
 }
 } 

 export function init(){
 var main = new Main();
 main.start();
 console.log("Started")
 alert("HE")
 }

 init();
