class Domen {
    public readonly boxes: Geometry.Shapes.Box[];
    public constructor(boxes: Geometry.Shapes.Box[]) {
        this.boxes = boxes;
    }
    public contains(x: number, y: number, z: number): boolean {
        this.boxes.forEach(box => {
            if (box.contains(x, y, z, false))
                return true;
        });
        return false;
    };
    /*public function contains(point: Geometry.Point): boolean {
        this.boxes.forEach(box => {
            if (box.containsPoint(point, false))
                return true;
        });
        return false;
    }*/
}
namespace DomenManager {
    var domens: Domen[];
    var entities: TileEntity[];

    export function createDomen(entity: TileEntity, boxes: Geometry.Shapes.Box[]): void {
        this.domens.push(new Domen(boxes));
        var vec = new Geometry.Vector(entity.x, entity.y, entity.z);
        for(var i =0; i<boxes.length; i++){
            boxes[i] = new Geometry.Shapes.Box(Geometry.Vector.plus(vec, boxes[i].start), Geometry.Vector.plus(vec, boxes[i].end))
        }
        this.entities.push(entity);
    }

    export function getDomen(x: number, y: number, z: number): Domen {
        this.domens.forEach(domen => {
            if (domen.contains(x, y, z))
                return domen;
        });
        return null;
    }

    export function removeDomenByEntity(entity: TileEntity): boolean {
        var x: number = entity.x;
        var y: number = entity.y;
        var z: number = entity.z;
        var entity: TileEntity;
        for (var i = 0; i < this.domens.length; i++) {
            entity = this.entities[i];
            if (entity.x == x && entity.y == y && entity.z == z) {
                this.domens.splice(i, 1);
                this.entities.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    export function removeDomenByCoords(x: number, y: number, z: number): boolean {
        var domen: Domen;
        for (var i = 0; i < this.domens.length; i++) {
            domen = this.domens[i];
            if (domen.contains(x, y, z)) {
                this.domens.splice(i, 1);
                this.entities.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}