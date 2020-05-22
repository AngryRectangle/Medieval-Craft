namespace AdvancedLib.AdvWorld{
    export function getBlockInfo(vector: Geometry.Vector){
        var info = World.getBlock(vector.x, vector.y, vector.z);
        return new BlockInfo(vector, info.id, info.data);
    }
}