var wodenMillLevel=[{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[5]},{x:1, y:-1, z:0, id:[5]},{x:1, y:0, z:1, id:[5]},{x:1, y:0, z:-1, id:[5]},
{x:1, y:2, z:0, id:[85]},{x:1, y:3, z:0, id:[85]},{x:1, y:4, z:0, id:[85]},
{x:1, y:-2, z:0, id:[85]},{x:1, y:-3, z:0, id:[85]},{x:1, y:-4, z:0, id:[85]},
{x:1, y:0, z:2, id:[85]},{x:1, y:0, z:3, id:[85]},{x:1, y:0, z:4, id:[85]},
{x:1, y:0, z:-2, id:[85]},{x:1, y:0, z:-3, id:[85]},{x:1, y:0, z:-4, id:[85]}
], 
Level: 1, domen: [
	new Geometry.Shapes.Box(new Geometry.Point(1, 1, 0), new Geometry.Point(1, 4, 0)),
	new Geometry.Shapes.Box(new Geometry.Point(1, -1, 0), new Geometry.Point(1, -4, 0)),
	new Geometry.Shapes.Box(new Geometry.Point(1, 0, -4), new Geometry.Point(1, 0, 4))
]
},
{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[17,162]},{x:1, y:-1, z:0, id:[17,162]},{x:1, y:0, z:1, id:[17,162]},{x:1, y:0, z:-1, id:[17,162]},
{x:1, y:2, z:0, id:[85]},{x:1, y:3, z:0, id:[85]},{x:1, y:4, z:0, id:[85]},
{x:1, y:-2, z:0, id:[85]},{x:1, y:-3, z:0, id:[85]},{x:1, y:-4, z:0, id:[85]},
{x:1, y:0, z:2, id:[85]},{x:1, y:0, z:3, id:[85]},{x:1, y:0, z:4, id:[85]},
{x:1, y:0, z:-2, id:[85]},{x:1, y:0, z:-3, id:[85]},{x:1, y:0, z:-4, id:[85]},

{x:1, y:2, z:1, id:[85]},{x:1, y:3, z:1, id:[85]},{x:1, y:4, z:1, id:[85]},{x:1, y:1, z:1, id:[85]},
{x:1, y:2, z:-1, id:[85]},{x:1, y:3, z:-1, id:[85]},{x:1, y:4, z:-1, id:[85]},{x:1, y:1, z:-1, id:[85]},
{x:1, y:-2, z:1, id:[85]},{x:1, y:-3, z:1, id:[85]},{x:1, y:-4, z:1, id:[85]},{x:1, y:-1, z:1, id:[85]},
{x:1, y:-2, z:-1, id:[85]},{x:1, y:-3, z:-1, id:[85]},{x:1, y:-4, z:-1, id:[85]},{x:1, y:-1, z:-1, id:[85]},
{x:1, y:1, z:2, id:[85]},{x:1, y:1, z:3, id:[85]},{x:1, y:1, z:4, id:[85]},{x:1, y:1, z:1, id:[85]},
{x:1, y:-1, z:2, id:[85]},{x:1, y:-1, z:3, id:[85]},{x:1, y:-1, z:4, id:[85]},{x:1, y:-1, z:1, id:[85]},
{x:1, y:1, z:-2, id:[85]},{x:1, y:1, z:-3, id:[85]},{x:1, y:1, z:-4, id:[85]},{x:1, y:1, z:-1, id:[85]},
{x:1, y:-1, z:-2, id:[85]},{x:1, y:-1, z:-3, id:[85]},{x:1, y:-1, z:-4, id:[85]},{x:1, y:-1, z:-1, id:[85]}
], 
Level:2},
];
var windSpeed = 10;
var windMap=[
{id:0, modifier:0.7},
{id:1, modifier:0.6},
{id:2, modifier:0.7},
{id:3, modifier:0.9},
{id:4, modifier:0.4},
{id:5, modifier:0.7},
{id:6, modifier:0.3},
{id:7, modifier:0.5},
{id:8, modifier:0},
{id:9, modifier:0},
{id:10, modifier:0.8},
{id:11, modifier:0.6},
{id:12, modifier:0.7},
{id:13, modifier:0.9},
{id:14, modifier:0.5},
{id:15, modifier:0.6},
{id:16, modifier:0.5},
{id:17, modifier:0.8},
{id:18, modifier:0.4},
{id:19, modifier:0.6},
{id:20, modifier:0.8},
{id:21, modifier:0.3},
{id:22, modifier:0.2},
{id:23, modifier:0.4},
{id:24, modifier:0.8},
{id:25, modifier:0.9},
{id:26, modifier:0.6},
{id:27, modifier:0.4},
{id:28, modifier:0.3},
{id:29, modifier:0.1},
{id:30, modifier:0.9},
{id:31, modifier:0.8},
{id:32, modifier:0.8},
{id:33, modifier:0.7},
{id:34, modifier:1},
{id:35, modifier:0.6},
{id:36, modifier:0.7},
{id:37, modifier:0.6},
{id:38, modifier:0.8},
{id:39, modifier:0.8}
];
IDRegistry.genBlockID("woodenMill");
Block.createBlockWithRotation("woodenMill", [{
	name: "Mill",
	texture: [
		["log_oak", 0],
		["log_oak", 0],
		["log_oak_top", 0],
		["mill_side", 1],
		["log_oak", 0],
		["log_oak", 0]
	],
	inCreative: true
}]);
Callback.addCallback('PreLoaded', function () {
Recipes.addShaped({
	id: BlockID.woodenMill,
	count: 1,
	data: 0
}, ["ppp", "pop", "ppp"], ["p", 5, -1, "o", 288, 0]);
});
ICRender.getGroup("kineticMachine").add(BlockID.woodenMill, -1);
Translation.addTranslation("Mill", {
	ru: "Мельница"
});
var getRainLevel = ModAPI.requireGlobal("Level.getRainLevel");

var windmill_render = new Render();
var wind_millTexture = new Texture("res/model/small_windmill.png").setResolution(16,16);
var mesh = new RenderMesh(__dir__ + "res/model/small_windmill.obj", "obj", {scale:[16, 16, 16],translate: [0, -16, 0]});
var bodyPart = windmill_render.getPart("head");
bodyPart.setMesh(mesh);

TileEntity.registerPrototype(BlockID.woodenMill, {
	defaultValues: {
		wheelLevel: 0,
		orientation: 0,
		biome: 0,
		modificator: 1,
		airCount: 0
	},
	isGenerator: function () {
		return true;
	},
	loadAnimation:function(id, texturePath){
		var anim = new Animation.Base(this.x + .5, this.y, this.z + 17/16);
		anim.describe({
			render: id,
			skin: texturePath
		});
		anim.load();
		return anim;
	},
	init:function(){
		this.animation = this.loadAnimation(windmill_render.getId(), "model/small_windmill.png");
	},
	tick: function () {
		if (World.getWorldTime() % 20 == 0) {
			this.data.modificator = getRainLevel() / 4;
		}

		if (World.getWorldTime() % 80 == 0) {
			if (this.data.wheelLevel == 1 || this.data.wheelLevel == 2) {
				this.data.airCount = 0;
				for (var len = -5; len < 11; len++) {
					for (var y = -4; y < 5; y++) {
						for (var c = -4; c < 5; c++) {
							if (this.data.orientation == 0) {
								if (World.getBlock(this.x + 1 + len, this.y + y, this.z + c).id == 0) {
									this.data.airCount++;
								}
							}
							if (this.data.orientation == 1) {
								if (World.getBlock(this.x + c, this.y + y, this.z + 1 + len).id == 0) {
									this.data.airCount++;
								}
							}
							if (this.data.orientation == 2) {
								if (World.getBlock(this.x - len, this.y + y, this.z + c).id == 0) {
									this.data.airCount++;
								}
							}
							if (this.data.orientation == 3) {
								if (World.getBlock(this.x + c, this.y + y, this.z - len).id == 0) {
									this.data.airCount++;
								}
							}
						}
					}
				}
			}
		}
		if (World.getWorldTime() % 100 == 0 && windSpeed > 35) {
			this.data.wheelLevel = 0;
		}
	},
	energyTick: function (type, src) {
		var energy = Math.min(this.data.airCount / 1000 * windMap[this.data.biome].modifier, 1);
		if (this.data.wheelLevel == 1 && windSpeed > 2) {
			src.add(Math.min(5, Math.round(energy * Math.min(10, windSpeed) / 2)));
		}
		if (this.data.wheelLevel == 2 && windSpeed > 4) {
			src.add(Math.min(30, Math.round(energy * Math.min(10, windSpeed) * 2)));

		}
	},
});
TileEntityRegistry.addEnergyTypeForId(BlockID.woodenMill, energyKineticEnergy);

Callback.addCallback("ItemUse", function (coords, item, block) {
	if (item.id == ItemID.smallHammer && block.id == BlockID.woodenMill) {
		if (!World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel) {
			var wheel = multiBlock.getLevel(coords.x, coords.y, coords.z, wodenMillLevel);
			var entity = World.getTileEntity(coords.x, coords.y, coords.z);
			entity.data.wheelLevel = wheel.Level;
			entity.data.orientation = wheel.orientation;
			entity.data.biome = World.getBiome(coords.x, coords.z);
			DomenManager.createDomen(entity, wodenMillLevel[0].domen);
			var blockObj;
			for(var i =0; i< wodenMillLevel[0].Block.length; i++){
				blockObj =  wodenMillLevel[0].Block[i];
				World.setBlock(blockObj.x+coords.x, blockObj.y+coords.y, blockObj.z+coords.z, blockObj.id[0], blockObj.id[1]);
			}
			if (wheel.Level) Game.message("Мельница построена, следите за ней");
			if (!wheel.Level) Game.message("Мельница построена не правильно");
		} else {
			var data = World.getTileEntity(coords.x, coords.y, coords.z).data;
			if (windSpeed > data.wheelLevel * 2) {
				var energy = Math.min(data.airCount / 1000 * windMap[data.biome].modifier, 1);
				if (data.wheelLevel == 1) {
					Game.message("Текущая выработка " + Math.min(5, Math.round(energy * Math.min(10, windSpeed) / 2)) + "Кэ/тик");
				} else if (data.wheelLevel == 2) {
					Game.message("Текущая выработка " + Math.min(30, Math.round(energy * Math.min(10, windSpeed) * 2)) + "Кэ/тик");
				}
			} else {
				Game.message("Ветер слишком слаб, чтобы крутить мельницу, необходимо больше, чем" + 2 * data.wheelLevel + "м/с , сейчас " + Math.round(windSpeed) + "м/с");
			}
		}
	}
});
var ko = Math.random() * 100;
Callback.addCallback("tick", function () {
	if (World.getWorldTime() % 500 == 0) {
		ko = Math.random() * 100;
	}
	if (World.getWorldTime() % 20 == 0) {
		windSpeed = Math.abs(25 * Math.sin((World.getWorldTime() % 24000 + 6000) / (3950 + ko)) + getRainLevel() * (5 + Math.random() * 2));
	}
});
