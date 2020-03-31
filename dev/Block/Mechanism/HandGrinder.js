var grinderConstruction=[{Block:[
{x:0, y:1, z:-1, id:[85]},{x:0, y:2, z:-1, id:[85]},{x:0, y:3, z:-1, id:[85]},{x:0, y:4, z:-1, id:[85]},
{x:0, y:1, z:1, id:[85]},{x:0, y:2, z:1, id:[85]},{x:0, y:3, z:1, id:[85]},{x:0, y:4, z:1, id:[85]},
{x:0, y:4, z:0, id:[85]},{x:0, y:3, z:0, id:[BlockID.crasherIron]},{x:0, y:0, z:-1, id:[BlockID.reduser]},{x:0, y:0, z:1, id:[BlockID.reduser]},
{x:0, y:1, z:0, id:[0]},{x:0, y:2, z:0, id:[0]}], Level:1},
{Block:[
{x:0, y:1, z:-1, id:[85]},{x:0, y:2, z:-1, id:[85]},{x:0, y:3, z:-1, id:[85]},{x:0, y:4, z:-1, id:[85]},
{x:0, y:1, z:1, id:[85]},{x:0, y:2, z:1, id:[85]},{x:0, y:3, z:1, id:[85]},{x:0, y:4, z:1, id:[85]},
{x:0, y:4, z:0, id:[85]},{x:0, y:3, z:0, id:[0]},{x:0, y:0, z:-1, id:[BlockID.reduser]},{x:0, y:0, z:1, id:[BlockID.reduser]},
{x:0, y:1, z:0, id:[0]},{x:0, y:2, z:0, id:[0]}],Level:2}];

IDRegistry.genBlockID("grinderTable");
Block.createBlock("grinderTable", [
{name: "Grinder Table", texture: [["iron_block", 0],["iron_block", 0],["iron_block", 0]], inCreative: false}
]);
IDRegistry.genItemID("grinderTable");
Item.createItem("grinderTable", "Grinder Table", {name: "grinder_table", meta: 0}, {stack: 64});
MC.replaceBlock(ItemID.grinderTable, BlockID.grinderTable);
Recipes.addShaped({id: ItemID.grinderTable, count: 1, data: 0}, ["vvv", "ivi", "bib"], ["i", 265, -1, "b", 42, -1]);
Translation.addTranslation("Grinder Table", {ru: "Дробильный Столик"});
ICRender.getGroup("kineticMachine").add(BlockID.grinderTable,-1);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.grinderTable, 0, render);
var model = BlockRenderer.createModel();
  model.addBox(.1, 15/16, .1, .15, 1, .9,42,0);
  model.addBox(.15, 15/16, .1, .85, 1, .15,42,0);
  model.addBox(.85, 15/16, .1, .9, 1, .9,42,0);
  model.addBox(.15, 15/16, .85, .85, 1, .9,42,0);
  model.addBox(.1, 0, .1, .9, 15/16, .9,42,0);
  render.addEntry(model);
IDRegistry.genBlockID("crasherIron");
Block.createBlock("crasherIron", [
{name: "Crasher", texture: [["iron_block", 0],["iron_block", 0],["iron_block", 0]], inCreative: false}
]);
IDRegistry.genItemID("crasherIron");
Item.createItem("crasherIron", "Crasher", {name: "press", meta: 0}, {stack: 64});
Translation.addTranslation("Crasher", {ru: "Железная плита для дробилки"});
MC.replaceBlock(ItemID.crasherIron, BlockID.crasherIron);
Recipes.addShaped({id: ItemID.crasherIron, count: 1, data: 0}, ["vzv", "vzv", "ibi"], ["z", 85,-1,"i", 265, -1, "b", 42, -1]);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.crasherIron, 0, render);
var model = BlockRenderer.createModel();
model.addBox(6.5/16,  0, 6.5/16, 9.5/16, 1, 9.5/16,5, 0);
model.addBox(6.5/16, -1, 6.5/16, 9.5/16, 0, 9.5/16,5,0);
model.addBox(6.5/16, -1.5, 6.5/16, 9.5/16, -1, 9.5/16,5,0);
model.addBox(0.1+1/16, -1.8, 0.1+1/16, 0.9-1/16, -1.5, 0.9-1/16,42,0);
render.addEntry(model);


MC.addHandGrinderRecipe({id:15,data:0}, {id:ItemID.dustIron, data:0, count:2});
MC.addHandGrinderRecipe({id:14,data:0}, {id:ItemID.dustGold, data:0, count:2});
MC.addHandGrinderRecipe({id:1,data:0}, {id:4, data:0, count:1});
MC.addHandGrinderRecipe({id:4,data:0}, {id:13, data:0, count:1});
MC.addHandGrinderRecipe({id:98,data:0}, {id:98, data:2, count:1});
MC.addHandGrinderRecipe({id:98,data:2}, {id:4, data:0, count:1});
MC.addHandGrinderRecipe({id:22,data:0}, {id:351, data:4, count:9});
MC.addHandGrinderRecipe({id:24,data:2}, {id:24, data:0, count:1});
MC.addHandGrinderRecipe({id:24,data:0}, {id:12, data:0, count:2});
MC.addHandGrinderRecipe({id:352,data:0}, {id:351, data:15, count:2});
MC.addHandGrinderRecipe({id:89,data:0}, {id:348, data:0, count:4});

MC.addHandGrinderRecipe({id:BlockID.oreCopper,data:0}, {id:ItemID.dustCopper, data:0, count:2});
MC.addHandGrinderRecipe({id:BlockID.oreTin,data:0}, {id:ItemID.dustTin, data:0, count:2});
MC.addHandGrinderRecipe({id:BlockID.oreLead,data:0}, {id:ItemID.dustLead, data:0, count:2});

var crusherRender = new Render();
    var partObj = [{type: "box", coords: {x: 0, y: 28+8, z: 0}, size: {x: 11, y: 5, z: 11},uv: {x: 0,y: 0}},
		{type: "box",coords: {x: 0,y: -6,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 10,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 26,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 35,z: 0},size: {x: 3, y: 2, z: 3},uv: {x: 48,y: 16}}
    ];

    crusherRender.setPart("head", partObj, {});
	
var grinderGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Grinder"
			},
			},
			minHeight: 700,
			inventory: {
				standart: true
		}, 
		background: { 
		standart: true 
		}
},
    
    drawing: [
	{type: "bitmap", x: 585, y: 265, bitmap: "grinder_bar_background", scale: 5}
	],
    
	elements: {
		"GrinderSlotInput": {type: "slot", x: 445, y: 250, size: 100},
        "GrinderSlotOutput": {type: "slot", x: 735, y: 250, size: 100},
		"GrinderSlotModified": {type: "slot", x: 850, y: 50, size: 100, bitmap:"gear_slot_1"},
        "Progress": {type: "scale", x: 585, y: 265, direction: 0, scale: 5, bitmap: "grinder_bar_scale"},
		"multiBlockCheck":{type: "image", x: 840, y: 500, bitmap: "multiblock_0", scale: 2},
		 "grinder":{type: "scale", x: 600, y: 0, direction: 3, bitmap: "grinder_0", scale: 6, invert: true}
			}
		
});
TileEntity.registerPrototype(BlockID.grinderTable, {
defaultValues:{
	id:0,
	data:0,
	recipe:null,
	progres:0,
	maxProgres:0,
	construction:0,
	checkAnimation:false
},
tick: function(){
	if(World.getThreadTime()%5==0&&this.data.construction==2){
		this.checkItemAnimation();
	}
	if(World.getThreadTime()%40==0&&this.data.construction==2){
		this.data.construction=multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level;
		if(this.data.construction!=2){
			this.animation.destroy();
			this.animationCrasher.destroy();
			this.data.checkAnimation =false;
			World.setBlock(this.x, this.y+3, this.z, BlockID.crasherIron);
		}
	}
	if(this.data.construction==1&&multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level==2){
		this.data.construction=multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level;
		this.animation =new Animation.Item(this.x + .5, this.y + 1.15, this.z + .5);
		this.animationCrasher = new Animation.Base(this.x+.5, this.y+2.05-.3, this.z+.5);
		this.animationCrasher.describe({
			render: crusherRender.getId(),
			skin: "mob/grinder_0.png",
		});
		this.animationCrasher.load();
	}
},
energyReceive: function(type, src) {
	var content = this.container.getGuiContent();
	if(this.data.construction==2){
	
	if(this.data.progres&&this.data.speed&&this.data.power){
		this.animationCrasher.setPos(this.x+.5, this.y+Math.abs(Math.sin(this.data.progres/this.data.maxProgres*20)*Math.PI*2)/10+1.75, this.z+.5);
	}
	
	
	if(content&&!this.data.progres){
		this.container.setScale("Progress",0);
		this.container.setScale("grinder",0.8);
	}
	if(content&&this.data.progres&&this.data.speed&&this.data.power){
		this.container.setScale("grinder",0.8+Math.abs(Math.sin((World.getWorldTime()%240)/20))/5);
		this.container.setScale("Progress",Math.floor(22*(1-this.data.progres/this.data.maxProgres))/22);
	}
	var recipe = MC.getHandGrinderRecipe(this.container.getSlot("GrinderSlotInput").id,this.container.getSlot("GrinderSlotInput").data);
	if(recipe&&World.getThreadTime()%5==0){
		this.data.speed=0;
		this.data.power=0;
		for(var i in gear){
			if(this.container.getSlot("GrinderSlotModified").id==gear[i].id){
				this.data.speed=gear[i].speed;
				this.data.power=gear[i].power;
			}
		}
	}
	if(recipe&&!this.data.recipe&&this.data.progres==0){
		if(this.container.getSlot("GrinderSlotOutput").count+recipe.result.count<=64){
			if(this.container.getSlot("GrinderSlotOutput").id==recipe.result.id&&this.container.getSlot("GrinderSlotOutput").data==recipe.result.data||this.container.getSlot("GrinderSlotOutput").id==0){
			this.data.recipe=recipe;
		this.data.progres=200;
		this.data.maxProgres=200;
		}
		}
	}
	if(this.data.recipe){
		if(this.container.getSlot("GrinderSlotInput").id!=this.data.recipe.input.id||this.container.getSlot("GrinderSlotOutput").count+this.data.recipe.result.count>64||this.container.getSlot("GrinderSlotOutput").id!=this.data.recipe.result.id&&this.container.getSlot("GrinderSlotOutput").id!=0||this.container.getSlot("GrinderSlotOutput").data!=this.data.recipe.result.data){
			this.data.progres=0;
			this.data.maxProgres=0;
			this.data.recipe=0;
		}
	}
	if(this.data.recipe&&recipe&&this.data.progres&&this.data.speed&&this.data.power&&src.amount()>=4*this.data.power){
		this.data.progres= Math.max(-1*this.data.speed+this.data.progres,0);
		src.get(4*this.data.power);
	}
	if(recipe&&this.data.recipe&&!this.data.progres){
		this.container.getSlot("GrinderSlotOutput").id=recipe.result.id;
		this.container.getSlot("GrinderSlotOutput").data=recipe.result.data;
		this.container.getSlot("GrinderSlotOutput").count+=recipe.result.count;
		this.container.getSlot("GrinderSlotInput").count--;
		this.container.getSlot("GrinderSlotModified").data++;
		for(var i in gear){
			if(this.container.getSlot("GrinderSlotModified").id==gear[i].id&&gear[i].damage-1==this.container.getSlot("GrinderSlotModified").data){
				this.container.getSlot("GrinderSlotModified").count--;
				this.container.getSlot("GrinderSlotModified").data=0;
			}
		}
		this.data.recipe=null;
		this.data.maxProgres=0;
		this.container.validateAll();
	}
	}
},
checkItemAnimation:function(){
	if(this.data.construction==2&&this.data.recipe&&!this.data.checkAnimation){
		this.data.checkAnimation =true;
		this.animation.describeItem({
			id: this.container.getSlot("GrinderSlotInput").id,
			data: this.container.getSlot("GrinderSlotInput").data,
			size: 4/16,
			count:1
		});
		this.animation.load();
	}
	if(this.data.construction==2&&!this.data.recipe&&this.data.checkAnimation){
		this.data.checkAnimation =false;
		this.animation.destroy();
	}
},
init: function(){
	this.data.checkAnimation =false;
	if(this.data.construction==2){
	this.animation =new Animation.Item(this.x + .5, this.y + 1, this.z + .5);
		this.animationCrasher = new Animation.Base(this.x+.5, this.y+2.05-.3, this.z+.5);
		this.animationCrasher.describe({
			render: crusherRender.getId(),
			skin: "mob/grinder_0.png",
		});
		this.animationCrasher.load();
		}
},
//TODO пофиксить текстуру гриндилки
click: function(){
	if(!MC.playerGetSneaking(Player.get())&&this.data.construction==2){
		this.container.openAs(this.getGuiScreen());
	}
	return true;
},
destroy: function(){
	if(this.animation&&this.container.getSlot("GrinderSlotInput").id!=0){
		this.animation.destroy();
	}
	if(this.animationCrasher){
		this.animationCrasher.destroy();
	}
},
getGuiScreen: function(){
	return grinderGui;
}
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.grinderTable, energyKineticEnergy);
Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.grinderTable&&multiBlock.getLevel(coords.x, coords.y, coords.z, grinderConstruction).Level==1){
			World.getTileEntity(coords.x, coords.y, coords.z).data.construction=multiBlock.getLevel(coords.x, coords.y, coords.z, grinderConstruction).Level;
			World.setBlock(coords.x, coords.y+3, coords.z,0);
			MC.addAchivement("medievalCraft","createHandgrinder");
	}
});
