/// <reference path="/usr/local/lib/node_modules/@types/easeljs/index.d.ts" />

class Point3D {
  constructor(X:number, Y:number, Z:number){
    this.x = X;
    this.y = Y;
    this.z = Z;
  }
  x:number;
  y:number;
  z:number;
}

class Lib {

    static fromCubeToOddR(x:number, z:number):createjs.Point {
      return new  createjs.Point(x+(z -(z&1))/2, z);
    }

    static fromOddRToCube(col:number, row:number):Point3D {
      let x = col - (row - (row&1))/2;
      let z = row;
      let y = -x - z;
      return new Point3D( x, y, x);
    }

}
