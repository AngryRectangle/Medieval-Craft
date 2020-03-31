IDRegistry.genBlockID("sawmill");
Block.createBlock("sawmill", [
{name: "Sawmill", texture: [["cobblestone", 0]], inCreative: false}
]);
IDRegistry.genItemID("sawmill");
Item.createItem("sawmill", "Sawmill", {name: "sawmill", meta: 0}, {stack: 64});
MC.replaceBlock(ItemID.sawmill, BlockID.sawmill);
Translation.addTranslation("Sawmill", {ru: "Лесопилка"});
ICRender.getGroup("kineticMachine").add(BlockID.sawmill,-1);
IDRegistry.genItemID("saw");
function giveSawmill(){
	MC.addAchivement("medievalCraft", "createSawmill");
}
Item.createItem("saw", "Saw", {name: "saw", meta: 0}, {stack: 64});
Translation.addTranslation("Saw", {ru: "Пила"});
Recipes.addShaped({id: IDData.item.saw, count: 1, data: 0}, ["aia", "aia", "aia"], ["i", 265,-1]);
Recipes.addShaped({id: ItemID.sawmill, count: 1, data: 0}, ["sss", "cac", "cac"], ["s", 280,-1,"c", 4, -1, "a", ItemID.saw, -1],giveSawmill);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.sawmill, 0, render);
var model = BlockRenderer.createModel();
model.addBox(0, 0, 0, 1, 1, 7/16,4,0);
model.addBox(0, 0, 9/16, 1, 1, 1,4,0);
model.addBox(0, 0, 7/16, 2/16, 1, 9/16,4,0);
model.addBox(14/16, 0, 7/16, 1, 1, 9/16,4,0);
model.addBox(0, 1, 0, 1/16, 2, 1/16,17,0);
model.addBox(15/16, 1, 15/16, 1, 2, 1,17,0);
model.addBox(0, 1, 15/16, 1/16, 2, 1,17,0);
model.addBox(15/16, 1, 0, 1, 2, 1/16,17,0);

model.addBox(0, 2, 0, 1/16, 2+1/16, 1,17,0);
model.addBox(15/16, 2, 0, 1, 2+1/16, 1,17,0);
model.addBox(1/16, 2, 6/16, 15/16, 2+1/16, 7/16,17,0);
model.addBox(1/16, 2, 9/16, 15/16, 2+1/16, 10/16,17,0);

render.addEntry(model);

var sawmillGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Sawmill"
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
	{type: "bitmap", x: 585, y: 265, bitmap: "furnace_bar_background", scale: 5}
	],
    
	elements: {
		"SawmillSlotInput": {type: "slot", x: 445, y: 250, size: 100},
        "SawmillSlotOutput": {type: "slot", x: 735, y: 250, size: 100},
		"SawmillSlotOutputAddition": {type: "slot", x: 850, y: 250, size: 100},
		"SawmillSlotModified": {type: "slot", x: 850, y: 50, size: 100, bitmap:"gear_slot_1"},
        "Progress": {type: "scale", x: 585, y: 265, direction: 0, scale: 5, bitmap: "furnace_bar_scale"}
			}
		
});
MC.sawmillRecipes=[1];
MC.addSawmillRecipe=function(input, result, time){
	MC.sawmillRecipes.push({input:input, result:result, time:time});
}
MC.getSawmillRecipe=function(input){
	if(typeof input == "number"){
		return MC.sawmillRecipes[input];
	}else if(typeof input == "object"){
		for(var i =1; i<MC.sawmillRecipes.length; i++){
			if(MC.sawmillRecipes[i].input.id==input.id&&MC.sawmillRecipes[i].input.data==input.data){
				return i;
			}
		}
		return null;
	}else if(typeof input == "undefined"){
		return null;
	}
};


//FileTools.WriteJSON (__dir__+"/json/sawmillRecipes.json", MC.sawmillRecipes, true);
MC.sawmillRecipes=FileTools.ReadJSON(__dir__+"/json/sawmillRecipes.json");
TileEntity.registerPrototype(BlockID.sawmill, {
defaultValues:{
	id:0,
	data:0,
	recipe:null,
	progres:0,
	maxProgres:0,
	id:0,
	data:0
},
updateItemAnimation:function(){
	if(this.container.getSlot("SawmillSlotInput").id!=0){
		if(Item.getNumericId(this.container.getSlot("SawmillSlotInput").id)>=256){
			this.itemAnimation.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.8,
			count:1,
			rotation:[Math.PI/2,0,0]
		});
		this.itemAnimation.setPos(this.x + .2, this.y + 1+1/32, this.z + .5);
		this.itemAnimation2.destroy();
		}else{
			this.itemAnimation.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.4,
			count:1,
			rotation:[0,0,Math.PI/2]
		});
		this.itemAnimation2.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.4,
			count:1,
			rotation:[0,0,Math.PI/2]
		});
		this.itemAnimation.setPos(this.x + .2, this.y + 1.12, this.z + .43);
		this.itemAnimation2.setPos(this.x-.2, this.y + 1.12, this.z + .43);
		this.itemAnimation2.load();
		}
		this.itemAnimation.load();
	}else{
		this.itemAnimation.destroy();
		this.itemAnimation2.destroy();
	}
},
energyReceive: function(type, src) {
	if(this.data.id!=this.container.getSlot("SawmillSlotInput").id||this.data.data!=this.container.getSlot("SawmillSlotInput").data){
		this.updateItemAnimation();
		this.data.id = this.container.getSlot("SawmillSlotInput").id;
		this.data.data = this.container.getSlot("SawmillSlotInput").data;
	}
	var content = this.container.getGuiContent();
	if(content&&!this.data.progres){
		this.container.setScale("Progress",0);
	}
	if(content&&this.data.progres&&this.data.speed&&this.data.power){
		this.container.setScale("Progress",Math.floor(22*(1-this.data.progres/this.data.maxProgres))/22);
	}
	var recipe = MC.getSawmillRecipe({id:this.container.getSlot("SawmillSlotInput").id,data:this.container.getSlot("SawmillSlotInput").data});
	if(recipe&&World.getWorldTime()%5==0){
		this.data.speed=0;
		this.data.power=0;
		for(var i in gear){
			if(this.container.getSlot("SawmillSlotModified").id==gear[i].id){
				this.data.speed=gear[i].speed;
				this.data.power=gear[i].power;
			}
		}
	}
	

	if(recipe&&!this.data.recipe&&this.data.progres==0&&
	this.container.getSlot("SawmillSlotInput").id==MC.getSawmillRecipe(recipe).input.id&&this.container.getSlot("SawmillSlotInput").data==MC.getSawmillRecipe(recipe).input.data){
		if(this.container.getSlot("SawmillSlotOutput").count+MC.getSawmillRecipe(recipe).result.count<=64||this.container.getSlot("SawmillSlotOutput").id==MC.getSawmillRecipe(recipe).result.id&&this.container.getSlot("SawmillSlotOutput").data==MC.getSawmillRecipe(recipe).result.data||this.container.getSlot("SawmillSlotOutput").id==0){
			this.data.recipe=recipe;
			
		
		this.data.progres=MC.getSawmillRecipe(recipe).time;
		this.data.maxProgres=MC.getSawmillRecipe(recipe).time;
		}
	}
	if(this.data.recipe){
		if(this.container.getSlot("SawmillSlotInput").id!=MC.getSawmillRecipe(this.data.recipe).input.id||this.container.getSlot("SawmillSlotOutput").count+MC.getSawmillRecipe(recipe).result.count>64||this.container.getSlot("SawmillSlotOutput").id!=MC.getSawmillRecipe(recipe).result.id&&this.container.getSlot("SawmillSlotOutput").id!=0||this.container.getSlot("SaySlotOutput").data!=MC.getSawmillRecipe(recipe).result.data){
			this.data.progres=0;
			this.data.maxProgres=0;
			this.data.recipe=0;
			
		}
	}
	if(this.data.recipe&&recipe&&this.data.progres&&this.data.speed&&this.data.power&&src.amount()>=2*this.data.power){
		this.data.progres= Math.max(-1*this.data.speed+this.data.progres,0);
		src.get(2*this.data.power);
		var ypos =Math.abs(Math.sin((this.data.progres%20)*Math.PI/20*2)/4)+1;
		this.animation.setPos(this.x+.7, this.y+ypos, this.z+.43);
		if(Item.getNumericId(this.container.getSlot("SawmillSlotInput").id)>=256){
			this.itemAnimation.setPos(this.x + .2+(1-this.data.progres/this.data.maxProgres)*.3, this.y + 1+1/32, this.z + .5);
		}else{
			this.itemAnimation.setPos(this.x + .2+(1-this.data.progres/this.data.maxProgres)*.8, this.y + 1.12, this.z + .43);
			this.itemAnimation2.setPos(this.x +(1-this.data.progres/this.data.maxProgres)*.8-.2, this.y + 1.12, this.z + .43);
		}
	}
	if(recipe&&this.data.recipe&&!this.data.progres){
		this.container.getSlot("SawmillSlotOutput").id=MC.getSawmillRecipe(recipe).result.id;
		this.container.getSlot("SawmillSlotOutput").data=MC.getSawmillRecipe(recipe).result.data;
		this.container.getSlot("SawmillSlotOutput").count+=MC.getSawmillRecipe(recipe).result.count;
		this.container.getSlot("SawmillSlotInput").count--;
		this.container.getSlot("SawmillSlotModified").data++;
		if(Math.random()>=.5&&MC.getSawmillRecipe(recipe).result.id==5&&this.container.getSlot("SawmillSlotOutputAddition").count<64){
			if(this.container.getSlot("SawmillSlotOutputAddition").id==ItemID.sawdust||this.container.getSlot("SawmillSlotOutputAddition").id==0){
				this.container.getSlot("SawmillSlotOutputAddition").id=IDData.item.sawdust;
		this.container.getSlot("SawmillSlotOutputAddition").data=0;
		this.container.getSlot("SawmillSlotOutputAddition").count+=1;
			}
		}
		for(var i in gear){
			if(this.container.getSlot("SawmillSlotModified").id==gear[i].id&&gear[i].damage-1==this.container.getSlot("SawmillSlotModified").data){
				this.container.getSlot("SawmillSlotModified").count--;
				this.container.getSlot("SawmillSlotModified").data=0;
			}
		}
		this.data.recipe=null;
		this.data.maxProgres=0;
		this.container.validateAll();
	}
},
click: function(){
	if(!MC.playerGetSneaking()){
		this.container.openAs(this.getGuiScreen());
	}
	return true;
},
destroy: function(){
	this.animation.destroy();
	this.itemAnimation.destroy();
	this.itemAnimation2.destroy();
},
init:function(){
	this.animation =new Animation.Item(this.x + .7, this.y + 1, this.z + .43);
	this.itemAnimation =new Animation.Item(this.x + .2, this.y + 1.12, this.z + .43);
	this.itemAnimation2 =new Animation.Item(this.x-.6, this.y + 1.12, this.z + .43);
	this.animation.describeItem({
			id: ItemID.saw,
			data: 0,
			size: 2,
			count:1
		});
		this.animation.load();
		this.updateItemAnimation();
},
getGuiScreen: function(){
	return sawmillGui;
}
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.sawmill, energyKineticEnergy);
