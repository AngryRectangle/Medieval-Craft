IDRegistry.genItemID("dw");
Item.createItem("dw", "Drop to lava", {name: "debug_wrench", meta: 0}, {stack: 64});
Translation.addTranslation("Drop to lava", {ru: "Выкинь в лаву"});

var debString = ["Change to block mode", "Change to player mode", "Change to tile entites mode", "Change to biom mode"];

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.dw){
		if(MC.playerGetSneaking(Player.get())){
			if(item.data<3){
				Player.setCarriedItem(item.id, 1, item.data+1);
			}else{
				Player.setCarriedItem(item.id, 1, 0);
			}
			Game.message(debString[Player.getCarriedItem().data]);
		}else if(item.data==0){
			alert("Id: "+block.id);
			alert("Data: "+block.data);
			alert("Side: "+coords.side);
		if(block.id == 7){
			World.setBlock(coords.x+1, coords.y, coords.z, 152);
			World.setBlock(coords.x, coords.y, coords.z+1, 22);
			World.setBlock(coords.x-1, coords.y, coords.z, 1);
			World.setBlock(coords.x, coords.y, coords.z-1, 1);
		}
		}else if(item.data == 1){
			alert("X: " +Player.getPosition().x+" Y: "+Player.getPosition().y+" Z: "+Player.getPosition().z);
			alert("Gamemode: "+ MC.playerGetGamemode());
			alert("Health: "+ Entity.getHealth(Player.get()));
			alert("Hunger: "+ Player.getHunger());
		}else if(item.data == 2){
			if(World.getTileEntity(coords.x, coords.y, coords.z)){
				Debug.m(World.getTileEntity(coords.x, coords.y, coords.z).data);
			}else{
				alert("No tile entity");
			}
		}else if(item.data == 3){
			alert("Current biome is "+World.getBiome(coords.x, coords.z)/*+", "+World.getBiomeName(coords.x, coords.z)*/);
		}
	}
});
