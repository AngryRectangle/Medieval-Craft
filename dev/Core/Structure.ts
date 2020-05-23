/*class Structure{
    public readonly rotated: AdvancedLib.BlockInfo[][];
    name: string;
    public constructor(name:string, blocks:AdvancedLib.BlockInfo[]){
        this.name = name;
        this.rotated = [
            this.rotateStructure(blocks, 0),
            this.rotateStructure(blocks, Math.PI/2),
            this.rotateStructure(blocks, Math.PI),
            this.rotateStructure(blocks, Math.PI*1.5)
        ];
    }
    rotateStructure(blocks :AdvancedLib.BlockInfo[], angle: number):AdvancedLib.BlockInfo[]{
        var output = new AdvancedLib.BlockInfo[blocks.length];
        for(var i =0; i<output.length; i++){
            output[i] = new AdvancedLib.BlockInfo(this.rotateVector(blocks[i].position, angle), blocks[i].id, blocks[i].data);
        }
        return output;
    }
    rotateVector(vec: Geometry.Vector, angle: number):Geometry.Vector{
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);
        var x = vec.x*cos-vec.z*sin;
        var z = vec.x*sin+vec.z*cos;
        return new Geometry.Vector(x, vec.y, z);
    }
    public isThereStructure(position: Geometry.Vector):boolean{
        for(var j = 0; j<4; j++){
            
        }
    }
}
namespace Structure{
    export class StructureInfo{
        public constructor(public struct: Structure, public isStructure:boolean, public orientation: number){

        }
    }
}*/