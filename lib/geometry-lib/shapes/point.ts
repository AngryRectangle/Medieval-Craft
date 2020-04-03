namespace Geometry {
    export class Point {
        static from: (x: number, y: number, z: number) => Point;
        static fromCoords(coords: { x: number, y: number, z: number }): Point {
            return new Point(coords.x, coords.y, coords.z);
        }
        static fromEntity(entity: number): Point {
            return Point.fromCoords(Entity.getPosition(entity));
        }





        constructor(public x: number, public y: number, public z: number) { }

        public distanceTo(point: Point): number {
            return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) + Math.pow(point.z - this.z, 2));
        }

        public toString(): string {
            return `Point (${this.x}, ${this.y}, ${this.z})`;
        }

        public equals(target: Point): boolean {
            return this.x == target.x && this.y == target.y && this.z == target.z;
        }
    }
}

