namespace Geometry.Shapes {
    export class Box {
        public start: Vector
        public end: Vector

        constructor(f: Vector, s: Vector) {
            let min = Math.min;
            let max = Math.max;
            this.start = Vector.from(min(f.x, s.x), min(f.y, s.y), min(f.x, s.z));
            this.end = Vector.from(max(f.x, s.x), max(f.y, s.y), max(f.x, s.z));
        }

        public containsPoint(point: Vector, strict = false): boolean {
            return this.contains(point.x, point.y, point.z, strict);
        }

        public contains(x: number, y: number, z: number, strict = false): boolean {
            let xs = Utilites.inRange(x, this.start.x, this.end.x, strict);
            let ys = Utilites.inRange(y, this.start.y, this.end.y, strict);
            let zs = Utilites.inRange(z, this.start.z, this.end.z, strict);
            return xs && ys && zs;
        }


        public get width(): number {
            return Math.abs(this.end.x - this.start.x);
        }

        public get height(): number {
            return Math.abs(this.end.y - this.start.y);
        }

        public get depth(): number {
            return Math.abs(this.end.z - this.start.z);
        }

        public get corners(): Vector[] {
            var points = [];
            points.push(Vector.fromCoords(this.start));
            
            points.push(Vector.from(this.start.x + this.width, this.start.y, this.start.z));
            points.push(Vector.from(this.start.x, this.start.y + this.height, this.start.z));
            points.push(Vector.from(this.start.x, this.start.y, this.start.z + this.depth));

            points.push(Vector.from(this.start.x + this.width, this.start.y + this.height, this.start.z));
            points.push(Vector.from(this.start.x, this.start.y + this.height, this.start.z + this.depth));
            points.push(Vector.from(this.start.x + this.width, this.start.y, this.start.z + this.depth));

            points.push(Vector.fromCoords(this.end));
            
            return points;
        }

        public get edges(): Line[] {
            var edges = [];

            let start = Vector.fromCoords(this.start);
            let end = Vector.fromCoords(this.end);

            edges.push(Line.fromPoints(start, Vector.from(start.x + this.width, start.y, start.z)));
            edges.push(Line.fromPoints(start, Vector.from(start.x, start.y + this.height, start.z)));
            edges.push(Line.fromPoints(start, Vector.from(start.x, start.y, start.z + this.depth)));


            edges.push(Line.fromPoints(Vector.from(start.x + this.width, start.y, start.z), end));
            edges.push(Line.fromPoints(Vector.from(start.x, start.y + this.height, start.z), end));
            edges.push(Line.fromPoints(Vector.from(start.x, start.y, start.z + this.depth), end));
            
            return edges;
        }

        

        public intersectWith(target: Box, strict = false): boolean {
            for(let i in target.corners){
                let corner = target.corners[i];
                if(this.containsPoint(corner, true)) return true;
            }
            return false;
        }


        public adjacentWith(target: Box, strict = false){
            let tEdges = target.edges;
            let tCorners = target.corners;
            let lieTouching = false;

            for(let i = 0; i < 4; i++){
                if(this.corners[i] == tCorners[(i + 2) % 4]) lieTouching = !lieTouching;
            }
            if(lieTouching) return false;
            for(let i = 0; i < 4; i++){
                if(this.edges[i].intersectWith(tEdges[(i + 2) % 4])) return true;
            }
            return false;
        }
    }
}