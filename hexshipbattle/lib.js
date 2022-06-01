class Point3D {
    constructor(X, Y, Z) {
        this.x = X;
        this.y = Y;
        this.z = Z;
    }
}
class Lib {
    static fromCubeToOddR(x, z) {
        return new createjs.Point(x + (z - (z & 1)) / 2, z);
    }
    static fromOddRToCube(col, row) {
        let x = col - (row - (row & 1)) / 2;
        let z = row;
        let y = -x - z;
        return new Point3D(x, y, x);
    }
}
//# sourceMappingURL=lib.js.map