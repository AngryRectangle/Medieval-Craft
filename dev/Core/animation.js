var BLOCK_TYPE_INVISIBLE = Block.createSpecialType({
	base: 7,
	opaque: false,
	explosionres: 9999,
	redstoneconsumer: false,
	destroytime: 999999
});
IDRegistry.genBlockID("phisicBlock");
Block.createBlock("phisicBlock", [
	{name: "Invisible Block (Is Tech)", texture: [["empty",0]], inCreative: false}
],BLOCK_TYPE_INVISIBLE);

var BlockAnimation = {
	setPhisicBlocks:function(array, entity){
		for(let i in array.Block){
			World.setBlock(entity.x+array[i].Block.x, entity.y+array[i].Block.y, entity.z+array[i].Block.z, 0,0);
		}
	},
	convertBlockToAnimationTech:function(x,y,z){
		animation =new Animation.Item(x, y, z);
		animation.describeItem({
			id: World.getBlock(x,y,z).id,
			data: World.getBlock(x,y,z).data,
			size: 1,
			rotation:[0,0,0]
		});
		animation.load();
		return animation;
	},
	convertBlocksToAnimation:function(array, en){
		var animations = [];
		for(let i in array){
			animations.push(this.convertBlockToAnimationTech(array[i].x+en.x, array[i].y+en.y, array[i].z+en.z));
		}
		this.setPhisicBlocks(array, en);
		return animations;
	}
};
