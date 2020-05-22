namespace Geometry {
    export class Line {
        static fromPoints(start: Vector, end: Vector): Line {
            return new Line(start, end);
        }

        public vector: Vector;
        constructor(public start: Vector, public end: Vector) {
            this.vector = end.minus(start);
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