namespace AdvancedLib {
    export class BlockInfo {
        public readonly position: Geometry.Vector;
        public readonly id: number;
        public readonly data: number;
        public constructor(position: Geometry.Vector, id: number, data: number) {
            this.position = position;
            this.id = id || 0;
            this.data = data || 0;
        }
        public equals(target: BlockInfo):boolean{
            return this.position.equals(target.position)
        }
    }
}