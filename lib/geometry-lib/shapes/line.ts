namespace Geometry {
    export class Line {
        static fromPoints(start: Point, end: Point): Line {
            return new Line(start, end);
        }

        public vector: Vector;
        constructor(public start: Point, public end: Point) {
            this.vector = Vector.fromPoints(start, end);
        }



        public intersectWith(target: Line): boolean {
            if(this.equals(target)) return true;
            // TODO: Доделать проверку
            return false;
        }



        public equals(target: Line): boolean {
            return this.start.equals(target.start) && this.end.equals(target.end);
        }
    }
}