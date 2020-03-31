var renderStick = new Render();
    var partObj = [{
            type: "box",
            coords: {
                x: 0,
                y: 0,
                z: 0
            },
            size: {
                x: 2,
                y: 10,
                z: 2
            },
            uv: {
                x: 0,
                y: 16
            }
        }
    ];
	//renderStick.addPart("body.rotPart");
renderStick.setPart(/*render.getPart("body.rotPart")*/"body", partObj, {});

IDRegistry.genBlockID("flywheel");
Block.createBlock("flywheel", [
{name: "Flywheel", texture: [["log_oak_top", 0],["log_oak_top", 0],["log_oak", 0]], inCreative: false}
]);

IDRegistry.genItemID("flywheel");
Item.createItem("flywheel", "Flywheel", {name: "flywheel", meta: 0}, {stack: 64});
Translation.addTranslation("Flywheel", {ru: "Маховик"});
MC.replaceBlock(ItemID.flywheel, BlockID.flywheel);
Recipes.addShaped({id: ItemID.flywheel, count: 1, data: 0}, ["vvv", "psp", "ppp"], ["p", 5,-1,"s", 280, -1]);

ICRender.getGroup("kineticMachine").add(BlockID.flywheel,-1);
Translation.addTranslation("Flywheel", {ru: "Маховик"});

var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.flywheel, 0, render);
var model = BlockRenderer.createModel();
model.addBox(.1, .05, .1, .15, .6, .9,17,0);
model.addBox(.15, .05, .1, .85, .6, .15,17,0);
model.addBox(.85, .05, .1, .9, .6, .9,17,0);
model.addBox(.15, .05, .85, .85, .6, .9,17,0);
model.addBox(.1, 0, .1, .9, .05, .9,17,0);
render.addEntry(model);

TileEntity.registerPrototype(BlockID.flywheel, {
defaultValues:{
	energy:0,
	id:0,
	data:0,
	rotation:0
},
destroy: function(){
	this.ani.destroy();
	if(this.data.id){
			World.drop(this.x, this.y+1, this.z, this.data.id, 1, this.data.data);
			this.data.id = 0;
			this.animation.destroy();
		}
},
energyTick: function(type, src) {
	var k = Medieval.Item.getGearSpeed(this.data.id);
		if(World.getThreadTime()%200==0&&this.data.energy){
				this.data.data++;
				if(this.data.data>=Medieval.Item.getGearMaxDamage(this.data.id)){
					this.data.id=0;
					this.animation.destroy();
				}
			}
		if(k){
			this.data.energy += src.storage(Math.min(10*k, 1000*k - this.data.energy), Math.min(10*k, this.data.energy));
			this.data.rotation+=Math.round(this.data.energy/(1000*k)*12);
			this.data.rotation%=360;
			this.init_animation();
		}
		if(!k)this.data.energy=0;
},
init_animation: function(){
		if(this.data.id){
			this.animation.describeItem({
			id: this.data.id,
			data: this.data.data,
			size: 1,
			count:1,
			rotation:[Math.PI/2,this.data.rotation/360*2*Math.PI,0]
		});
		this.animation.load();
		}
	},
init: function(){
	this.animation =new Animation.Item(this.x + .5, this.y + 11/16, this.z + .5);
	this.init_animation();
	this.ani = new Animation.Base(this.x+.5, this.y-1.1, this.z+.5);
		this.ani.describe({
			render: renderStick.getId(),
			skin: "mob/flyWheel_oak.png"
		});
	this.ani.load();
},
click:function(){
	if(Medieval.Item.getGearSpeed(Player.getCarriedItem().id)&&!this.data.id){
		this.data.id = Player.getCarriedItem().id;
		this.data.data = Player.getCarriedItem().data;
		this.init_animation();
		Player.decreaseCarriedItem(1);
	}
	if(MC.playerGetSneaking()&&!MC.isSpring(Player.getCarriedItem().id)){
		if(this.data.id){
			World.drop(this.x, this.y+1, this.z, this.data.id, 1, this.data.data);
			this.data.id = 0;
			this.animation.destroy();
		}
	}
}
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.flywheel, energyKineticEnergy);

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.flywheel){
		if(World.getTileEntity(coords.x, coords.y, coords.z).data.id){
			Game.message("Накоплено "+ World.getTileEntity(coords.x, coords.y, coords.z).data.energy+"Кэ из "+Medieval.Item.getGearSpeed(World.getTileEntity(coords.x, coords.y, coords.z).data.id)*1000+"Кэ");
			Game.message("Состояние шестерёнки: "+(100-Math.floor(100*World.getTileEntity(coords.x, coords.y, coords.z).data.data/Medieval.Item.getGearMaxDamage(World.getTileEntity(coords.x, coords.y, coords.z).data.id)))+"%");
		}else{
			Game.message("Энергии нет");
		}
	}
	if(block.id==BlockID.flywheel&&MC.isSpring(item.id)){
		if(!MC.playerGetSneaking()){
		var energy = Math.min(World.getTileEntity(coords.x, coords.y, coords.z).data.energy,item.data);
		Game.message("Текущая энергия в пружине "+((MC.getSpringCapacity(item.id)-item.data)+energy)+"Кэ");
		World.getTileEntity(coords.x, coords.y, coords.z).data.energy-=energy;
		Player.setCarriedItem(item.id, item.count, item.data-energy);
		}else{
			var energy = Math.min(Medieval.Item.getGearSpeed(World.getTileEntity(coords.x, coords.y, coords.z).data.id)*1000-World.getTileEntity(coords.x, coords.y, coords.z).data.energy, Math.round(Math.abs(item.data-MC.getSpringCapacity(item.id))/10));
		World.getTileEntity(coords.x, coords.y, coords.z).data.energy+=energy;
		Player.setCarriedItem(item.id, item.count, item.data+energy*10);
		Game.message("Текущая энергия в пружине "+((MC.getSpringCapacity(item.id)-item.data)-energy)+"Кэ");
		}
	}
});
