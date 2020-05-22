namespace Geometry {
    export class Quaternion {
        public x: number;
        public y: number;
        public z: number;


        public static from(x: number, y: number, z: number, angle: number): Quaternion {
            return new Quaternion(Vector.from(x, y, z), angle);
        }

        constructor(vector: Vector, public angle: number) {
            vector = vector.normalized;
            this.x = vector.x * Math.sin(angle / 2);
            this.y = vector.y * Math.sin(angle / 2);
            this.z = vector.z * Math.sin(angle / 2);

            angle = Math.cos(angle / 2);
        }


        public get normalized(): Quaternion {
            return this.scale(1 / this.length);
        }

        public get length() {
            return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.angle ** 2)
        }

        public scale(n: number): Quaternion {
            return Quaternion.from(this.x * n, this.y * n, this.z * n, this.angle * n);
        }

        public multiple(target: Quaternion): Quaternion {
            let angle = this.angle * target.angle - this.x * target.x - this.y * target.y - this.z * target.z;
            let x = this.angle * target.x + this.x * target.angle + this.y * target.z - this.z * target.y;
            let y = this.angle * target.y - this.x * target.z + this.y * target.angle + this.z * target.x;
            let z = this.angle * target.z + this.x * target.y - this.y * target.x + this.z * target.angle;
            return Quaternion.from(x, y, z, angle);
        }
    }
}