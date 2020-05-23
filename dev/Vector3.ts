namespace Geometry {
    export class Vector3 {
        //#region Static Constructors
        static get UP(): Vector3 { return Vector3.from(0, 1, 0); }
        static get DOWN(): Vector3 { return Vector3.from(0, -1, 0); }

        static get NORTH(): Vector3 { return Vector3.from(-1, 0, 0); }
        static get SOUTH(): Vector3 { return Vector3.from(1, 0, 0); }

        static get EAST(): Vector3 { return Vector3.from(0, 0, -1); }
        static get WEST(): Vector3 { return Vector3.from(0, 0, 1); }

        static get ZERO(): Vector3 { return Vector3.from(0, 0, 0); }
     static get ONE(): Vector3 { return Vector3.from(1, 1, 1); }


        static from(x: number, y: number, z: number): Vector3 {
            return new Vector3(x, y, z);
        }

        static fromCoords(coords: { x: number, y: number, z: number }): Vector3 {
            return new Vector3(coords.x, coords.y, coords.z);
        }


        constructor(public x: number, public y: number, public z: number) {
        }
        //#endregion

        //#region Vector Operations
        public get length(): number {
            return (this.x ** 2 + this.y ** 2 + this.z ** 2) ** 0.5;
        }

        public get normalized(): Vector3 {
            let len = this.length;
            return new Vector3(this.x / len, this.y / len, this.z / len);
        }

        public scale(n: number): Vector3 {
            return Vector3.from(this.x * n, this.y * n, this.z * n);
        }

        public get inverted(): Vector3 {
            return this.scale(-1);
        }

        public cross(vec: Vector3): Vector3 {
            const x = this.y * vec.z - this.z * vec.y;
            const y = this.z * vec.x - this.x * vec.z;
            const z = this.x * vec.y - this.y * vec.x;
            return Vector3.from(x, y, z);
        }

        public toArray(): number[] {
            return [this.x, this.y, this.z];
        }
        //#endregion

        //#region Math Operations
        public plus(vec: Vector3) {
            return Vector3.from(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        }
        //#endregion

        public copy(): Vector3 {
            return Vector3.fromCoords(this);
        }

        public toString(): string {
            return `Vector3 (${this.x}, ${this.y}, ${this.z})`;
        }

        public equals(vec: Vector3): boolean {
            return Math.abs(this.x - vec.x) < Number.EPSILON && Math.abs(this.y - vec.y) < Number.EPSILON && Math.abs(this.z - vec.z) < Number.EPSILON;
        }

        public isNaN(): boolean {
            return isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
        }
        private static lerpF(a:number, b:number, c:number):number{
            return (b-a)*c+a;
        }
        public static lerp(a:Vector3, b:Vector3, c:number):Vector3{
            return new Vector3(this.lerpF(a.x, b.x, c), this.lerpF(a.y, b.y, c),this.lerpF(a.z, b.z, c));
        }
    }
}