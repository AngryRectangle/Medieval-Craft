function giveSmallHammer(){
	MC.addAchivement("medievalCraft", "createHammer");
}

IDRegistry.genItemID("smallHammer");
Item.createItem("smallHammer", "Small Hammer", {name: "small_hammer", meta: 0}, {stack: 1});
Translation.addTranslation("Small Hammer", {ru: "Молоток"});

Recipes.addShaped({id: ItemID.smallHammer, count: 1, data: 0}, ["aii", "asa", "aaa"], ["i", 4,-1, "s",280,0],giveSmallHammer);
Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==47){
			World.setBlock(coords.x, coords.y, coords.z,0);
			World.drop(coords.x, coords.y, coords.z, ItemID.guideBook, 1,0);
	}
});
