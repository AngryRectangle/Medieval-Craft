namespace Geometry {

    export class Vector {
        static from(x: number, y: number, z: number): Vector {
            return new Geometry.Vector(x, y, z);
        }
        static fromCoords(coords: { x: number, y: number, z: number }): Vector {
            return new Geometry.Vector(coords.x, coords.y, coords.z);
        }

        static get UP(): Vector { return new Geometry.Vector(0, 1, 0); }
        static get DOWN(): Vector { return new Geometry.Vector(0, -1, 0); }

        static get NORTH(): Vector { return new Geometry.Vector(-1, 0, 0); }
        static get SOUTH(): Vector { return new Geometry.Vector(1, 0, 0); }

        static get EAST(): Vector { return new Geometry.Vector(0, 0, -1); }
        static get WEST(): Vector { return new Geometry.Vector(0, 0, 1); }

        static get ZERO(): Vector { return new Geometry.Vector(0, 0, 0); }
        static get ONE(): Vector { return new Geometry.Vector(1, 1, 1); }


        static plus(...args: { x: number, y: number, z: number }[]): Vector {
            let x = 0, y = 0, z = 0;
            for (var i in args) {
                let vec = args[i];
                x += vec.x;
                y += vec.y;
                z += vec.z;
            }
            return Vector.from(x, y, z);
        }

        static minus(a: { x: number, y: number, z: number }, b: { x: number, y: number, z: number }): Vector {
            let x = a.x, y = a.y, z = a.z;
            x -= b.x; y -= b.y; z -= b.z;
            return Vector.from(x, y, z);
        }


        public plus(v: { x: number, y: number, z: number }): Vector {
            let x = this.x + v.x;
            let y = this.y + v.y;
            let z = this.z + v.z;
            return Vector.from(x, y, z);
        }

        public minus(v: { x: number, y: number, z: number }): Vector {
            let x = this.x - v.x;
            let y = this.y - v.y;
            let z = this.z - v.z;
            return Vector.from(x, y, z);
        }












        constructor(public x: number, public y: number, public z: number) { }

        get length(): number {
            return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        }

        get normalized(): Vector {
            let length = this.length;
            return Vector.from(this.x / length, this.y / length, this.z / length);
        }


        public scale(n: number): Vector {
            return Vector.from(this.x * n, this.y * n, this.z * n);
        }




        public copy(): Vector {
            return Vector.fromCoords(this);
        }

        public cross(target: { x: number, y: number, z: number }): Vector {
            let x = this.y * target.z - this.z * target.y;
            let y = this.z * target.x - this.x * target.z;
            let z = this.x * target.y - this.y * target.x;
            return Vector.from(x, y, z);
        }







        public toString(): string {
            return `Vector (${this.x}, ${this.y}, ${this.z})`;
        }


        public equals(target: Vector): boolean {
            return this.x == target.x && this.y == target.y && this.z == target.z;
        }
    }
}
