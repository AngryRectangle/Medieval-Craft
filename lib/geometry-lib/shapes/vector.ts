namespace Geometry {
    export class Vector {
        static from: (x: number, y: number, z: number) => Vector;
        static fromCoords(coords: { x: number, y: number, z: number }): Vector {
            return new Vector(coords.x, coords.y, coords.z);
        }

        static get UP(): Vector { return new Vector(0, 1, 0); }
        static get DOWN(): Vector { return new Vector(0, -1, 0); }


        static fromPoints(f: Point, s: Point): Vector {
            return Vector.from(s.x - f.x, s.y - f.y, s.z - f.z);
        }





        static plus(...args: Vector[]): Vector {
            let x = 0, y = 0, z = 0;
            for(var i in args){
                let vec = args[i];
                x += vec.x;
                y += vec.y;
                z += vec.z;
            }
            return Vector.from(x, y, z);
        }












        constructor(public x: number, public y: number, public z: number) { }

        get length(): number {
            return Math.sqrt(Math.pow(this.x, 2) +
                Math.pow(this.y, 2) +
                Math.pow(this.z, 2));
        }

        public normalize(): Vector {
            let length = this.length;
            this.x /= length;
            this.y /= length;
            this.z /= length;
            return this;
        }

        get normalized(): Vector {
            return this.copy().normalize();
        }

        public copy(): Vector {
            return Vector.fromCoords(this);
        }

        public cross(target: Vector): Vector {
            let x = this.y * target.z - this.z * target.y;
            let y = this.z * target.x - this.x * target.z;
            let z = this.x * target.y - this.y * target.x;
            return Vector.from(x, y, z);
        }


        /*
        public static normal(a: Vector, b: Vector, c: Vector): Vector {
            let edge1 = b - a;
            let edge2 = c - a;
            let normal = edge1.cross(edge2);
            return normal;
        }
        */
    }
}
