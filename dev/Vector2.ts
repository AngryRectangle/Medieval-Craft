namespace Geometry {
    export class Vector2 {
        static get LEFT(): Vector2 { return Vector2.from(-1, 0); }
        static get RIGHT(): Vector2 { return Vector2.from(1, 0); }

        static get DOWN(): Vector2 { return Vector2.from(0, -1); }
        static get UP(): Vector2 { return Vector2.from(0, 1); }

        static get ZERO(): Vector2 { return Vector2.from(0, 0); }
        static get ONE(): Vector2 { return Vector2.from(1, 1); }


        
        static from(x: number, y: number): Vector2 {
            return new Vector2(x, y);
        }

        
        static fromCoords(coords: { x: number, y: number}): Vector2 {
            return new Vector2(coords.x, coords.y);
        }

        constructor(public x: number, public y: number){
        }

        
        public get length(): number {
            return (this.x ** 2 + this.y ** 2) ** 0.5;
        }

        
        public get normalized(): Vector2 {
            let len = this.length;
            return new Vector2(this.x / len, this.y / len);
        }

        public scale(n: number): Vector2 {
            return Vector2.from(this.x * n, this.y * n);
        }

        public equals(vec: Vector2): boolean {
            return Math.abs(this.x - vec.x) < Number.EPSILON && Math.abs(this.y - vec.y) < Number.EPSILON;
        }
        private static lerpF(a:number, b:number, c:number):number{
            return (b-a)*c+a;
        }
        public static lerp(a:Vector2, b:Vector2, c:number):Vector2{
            return new Vector2(this.lerpF(a.x, b.x, c), this.lerpF(a.y, b.y, c));
        }
    }
}