var waterWheelLevel=[{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:-1, z:-1, id:[5]},{x:1, y:-1, z:0, id:[5]},{x:1, y:-1, z:1, id:[5]},
{x:1, y:1, z:-1, id:[5]},{x:1, y:1, z:0, id:[5]},{x:1, y:1, z:1, id:[5]},
{x:1, y:0, z:-1, id:[5]},{x:1, y:0, z:1, id:[5]}, 
{x:1, y:2, z:0, id:[17,162]},{x:1, y:-2, z:0, id:[17,162]},{x:1, y:0, z:2, id:[17,162]},{x:1, y:0, z:-2, id:[17,162]}
], Level:1},
{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[17,162]},{x:1, y:2, z:0, id:[17,162]},{x:1, y:-1, z:0, id:[17,162]},{x:1, y:-2, z:0, id:[17,162]},{x:1, y:0, z:1, id:[17,162]},{x:1, y:0, z:2, id:[17,162]},{x:1, y:0, z:-1, id:[17,162]},{x:1, y:0, z:-2, id:[17,162]},
{x:1, y:1, z:1, id:[5]},{x:1, y:1, z:-1, id:[5]},{x:1, y:-1, z:1, id:[5]},{x:1, y:-1, z:-1, id:[5]},
{x:1, y:0, z:3, id:[5]},{x:1, y:-1, z:3, id:[5]},{x:1, y:1, z:3, id:[5]},{x:1, y:0, z:-3, id:[5]},{x:1, y:-1, z:-3, id:[5]},{x:1, y:1, z:-3, id:[5]},
{x:1, y:3, z:0, id:[5]},{x:1, y:3, z:1, id:[5]},{x:1, y:3, z:-1, id:[5]},{x:1, y:-3, z:0, id:[5]},{x:1, y:-3, z:1, id:[5]},{x:1, y:-3, z:-1, id:[5]},
{x:1, y:2, z:2, id:[5]},{x:1, y:-2, z:2, id:[5]},{x:1, y:2, z:-2, id:[5]},{x:1, y:-2, z:-2, id:[5]},
{x:1, y:4, z:-1, id:[17,162]},{x:1, y:4, z:1, id:[17,162]},{x:1, y:-4, z:-1, id:[17,162]},{x:1, y:-4, z:1, id:[17,162]},
{x:1, y:1, z:4, id:[17,162]},{x:1, y:-1, z:4, id:[17, 162]},{x:1, y:1, z:-4, id:[17,162]},{x:1, y:-1, z:-4, id:[17,162]}
],Level:2}];



IDRegistry.genBlockID("waterWheel");
Block.createBlockWithRotation("waterWheel", [
{name: "Water Wheel", texture: [["log_oak", 0],["log_oak", 0],["log_oak_top", 0],["watermill_side", 0],["log_oak", 0],["log_oak",0]], inCreative: true}
]);
Recipes.addShaped({id: BlockID.waterWheel, count: 1, data: 0}, ["ppp", "pop", "ppp"], ["p", 5,-1,"o",351,4]);
ICRender.getGroup("kineticMachine").add(BlockID.waterWheel,-1);
Translation.addTranslation("Water Wheel", {ru: "Водяное Колесо"});
var getRainLevel = ModAPI.requireGlobal("Level.getRainLevel");
TileEntity.registerPrototype(BlockID.waterWheel, {
defaultValues:{
	wheelLevel:0,
	count:0,
	orientation:0,
	waterCount:0,
	biome:0,
	modificator:1
},
isGenerator: function() {
return true;
},
tick: function(){
	if(World.getWorldTime()%20==0){
		this.data.modificator=getRainLevel()/4+1; 
	}
	
	if(World.getWorldTime()%80==0){
		if(this.data.wheelLevel==1){
		this.data.waterCount=0;
		for(var c =-1; c<2; c++){
			if(this.data.orientation==0){
				if(World.getBlock(this.x+1, this.y-2, this.z+c).id==8||World.getBlock(this.x+1, this.y-2, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==1){
				if(World.getBlock(this.x+c, this.y-2, this.z+1).id==8||World.getBlock(this.x+c, this.y-2, this.z+1).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==2){
				if(World.getBlock(this.x-1, this.y-2, this.z+c).id==8||World.getBlock(this.x-1, this.y-2, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==3){
				if(World.getBlock(this.x+c, this.y-2, this.z-1).id==8||World.getBlock(this.x+c, this.y-2, this.z-1).id==9){
					this.data.waterCount++;
				}
			}
		}
	}
	
	if(this.data.wheelLevel==2){
		this.data.waterCount=0;
		for(var y=0; y>-2; y--){
		for(var c =-2; c<3; c++){
			if(this.data.orientation==0){
				if(World.getBlock(this.x+1, this.y-3+y, this.z+c).id==8||World.getBlock(this.x+1, this.y-3+y, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==1){
				if(World.getBlock(this.x+c, this.y-3+y, this.z+1).id==8||World.getBlock(this.x+c, this.y-3+y, this.z+1).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==2){
				if(World.getBlock(this.x-1, this.y-3+y, this.z+c).id==8||World.getBlock(this.x-1, this.y-3+y, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==3){
				if(World.getBlock(this.x+c, this.y-3+y, this.z-1).id==8||World.getBlock(this.x+c, this.y-3+y, this.z-1).id==9){
					this.data.waterCount++;
				}
			}
		}
	}
	}
	}
},
energyTick: function(type, src) {
	if(this.data.waterCount&&this.data.wheelLevel==1){
		var energy = Math.abs(Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*this.data.waterCount));
		if(this.data.biome==0||this.data.biome==24||this.data.biome==16){
		src.add(Math.abs(energy));
		}
		if(this.data.biome==7){
		src.add(Math.round(0.4*this.data.waterCount*this.data.modificator));
		}
	}
	if(this.data.waterCount>=4&&this.data.wheelLevel==2){
		var energy = Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*this.data.waterCount*1.5);
		if(this.data.biome==0||this.data.biome==24||this.data.biome==16){
		src.add(Math.abs(energy));
		}
		if(this.data.biome==7){
		src.add(Math.round(0.4*this.data.waterCount*this.data.modificator*1.5));
		}
	}
},
});
//TODO пофикситть работу колеса в океане
EnergyTileRegistry.addEnergyTypeForId(BlockID.waterWheel, energyKineticEnergy);

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.waterWheel){
		if(World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel){
			var data = World.getTileEntity(coords.x, coords.y, coords.z).data;
			if(data.biome!=0&&data.biome!=7&&data.biome!=16&&data.biome!=24){
				Game.message("Течение слишком слабое для работы колеса");
			}else
			if(data.biome==7){
				Game.message("Текущая выработка энергии "+Math.round(0.4*data.waterCount*data.modificator)+"Кэ");
			}else{
				Game.message("Текущая выработка энергии "+Math.abs(Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*data.waterCount))+"Кэ");
			}
		}else{
		var wheel =multiBlock.getLevel(coords.x, coords.y, coords.z, waterWheelLevel);
			World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel=wheel.Level;
			World.getTileEntity(coords.x, coords.y, coords.z).data.count++;
			World.getTileEntity(coords.x, coords.y, coords.z).data.orientation=wheel.orientation;
			World.getTileEntity(coords.x, coords.y, coords.z).data.biome= World.getBiome(coords.x, coords.z);
			if(wheel.Level)Game.message("Колесо построено, следите за ним");	
			}
	}
});
