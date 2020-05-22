namespace Geometry {
    export class Utilites {
        static inRange(value: number, min: number, max: number, strict: boolean): boolean {
            if(strict) return value > min && value < max;
            return value >= min && value <= max;
        }
    }

}


EXPORT("Geometry", Geometry);