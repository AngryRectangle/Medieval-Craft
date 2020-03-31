var ae_api_tool = {
	material: function (params) {
		ToolAPI.addToolMaterial (params.material, params.describe);
	},
	
	add: function (id, block, properties) {
		Item.setToolRender (id, true);
	
		ToolAPI.registerTool (id, properties.material, block, properties);
		
		if (properties.enchant) {
			Item.setEnchantType (id, properties.enchant.type, properties.enchant.max);
		}
		if (properties.useItem) {
			Item.registerUseFunctionForID (id, properties.useItem);
		}
		
		Item.setMaxDamage (id, properties.durability);
	},
	broke: function (damage) {
		item = Player.getCarriedItem ();
		item.data += damage;
		
		if (item.data > Item.getMaxDamage (item.id)) {
			item.id = 0;
		} else {
			Player.setCarriedItem (item.id, item.count, item.data, item.enchant);
		}
	},
  
  	sword: function (id, material) {
 	    var properties = {};
 	    var tool_material = ToolAPI.toolMaterials [material];
 	    var blocks = ["plant", "corweb"];
		
  	    properties.material = material;
  	    properties.isWeapon = true;
 	    properties.durability = tool_material.durability;
  		properties.damage = 4;
		properties.enchant = {
     	    type: Native.EnchantType.sword,
  		    max: tool_material.enchantability
  	    };
		
   		Tool.add (id, blocks, properties);
	},
	pickaxe: function (id, material) {
   		var properties = {};
   		var tool_material = ToolAPI.toolMaterials [material];
   		var blocks = ["stone"];
		
   		properties.material = material;
   		properties.durability = tool_material.durability;
   		properties.damage = 2;
   		properties.enchant = {
    		type: Native.EnchantType.pickaxe,
    		max: tool_material.enchantability
   		};
		
   		Tool.add (id, blocks, properties);
  	},
	axe: function (id, material) {
   		var properties = {};
   		var tool_material = ToolAPI.toolMaterials [material];
   		var blocks = ["wood"];
		
   		properties.material = material;
   		properties.durability = tool_material.durability;
   		properties.damage = 3;
   		properties.enchant = {
    		type: Native.EnchantType.axe,
    		max: tool_material.enchantability
   		};
		
   		Tool.add (id, blocks, properties);
  	},
	shovel: function (id, material) {
   		var properties = {};
   		var tool_material = ToolAPI.toolMaterials [material];
   		var blocks = ["dirt"];
		
   		properties.material = material;
   		properties.durability = tool_material.durability;
   		properties.damage = 1;
   		properties.enchant = {
    		type: Native.EnchantType.shovel,
    		max: tool_material.enchantability
   		};
		
   		properties.useItem = function (coords, item, block) {
			if (block.id == 2 && coords.side == 1) {
				World.setBlock (coords.x, coords.y, coords.z, 198);
				World.playSound (coords.x, coords.y, coords.z, 'step.grass', 1, 1);
				core_API_Tool.broke (1);
			}
   		};
		
   		Tool.add (id, blocks, properties);
  	},
	hoe: function (id, material) {
   		var properties = {};
   		var tool_material = ToolAPI.toolMaterials [material];
   		var blocks = [];
		
   		properties.material = material;
   		properties.durability = tool_material.durability;
   		properties.damage = 0;
   		properties.enchant = {
    		type: Native.EnchantType.hoe,
   		    max: tool_material.enchantability
   		};
		
   		properties.useItem = function (coords, item, block) {
			if (block.id == 2 && coords.side == 1) {
				World.setBlock (coords.x, coords.y, coords.z, 60);
				World.playSound (coords.x, coords.y, coords.z, 'step.grass', 1, 1);
				core_API_Tool.broke (1);
			}
	 	};
		
   		Tool.add (id, blocks, properties);
  	}
};


var ae_item = {
	add: function (id, params, describe) {
		IDRegistry.genItemID (id + "");
		Item.createItem (id + "", params.name, params.texture, params.values);
		if (describe) Item.setDescribe (id + "", describe);
	},
	addTool: function (id, params, describe) {
		this.add (id, params, describe);
		ae_api_tool [params.type] (id + "", params.material);
		if (describe) Item.setDescribe (id + "", describe);
	},
	addFood: function (id, params, describe) {
		this.add (id, params, describe);
		if (describe) Item.setDescribe (id + "", describe);
	}
};

var ae_block = {
	add: function (id, variations, describe, rotate) {
		IDRegistry.genBlockID (id);
		
		if (!rotate) rotate = false;
		if (rotate == false) {
			Block.createBlock (id, variations, Block.createSpecialType (describe));
		} else Block.createBlockWithRotation (id, variations, Block.createSpecialType (describe));
	}
};

var ae_particle = {
	add: function (x, y, z, id, size, count) {
		if (!count) count = 1;
		for (var i = 0; i < count; i ++) Particles.addParticle (x, y, z, id, 0, 0, 0, size);
	}
};

var ae_animation = {
	lineBetweenCoords: function (coords, params) {
		this.parent = Animation.base;
		this.parent (coords [0] [0], coords [0] [1], coords [0] [2]);
		
		var velocity = .4;
		this.vel = {};
		this.tick = function () {
				dx = coords [1] [0] - coords [0] [0];
				dy = coords [1] [1] - coords [0] [1];
				dz = coords [1] [2] - coords [0] [2];
				da = Math.sqrt (Math.pow (dx, 2) + Math.pow (dy, 2) + Math.pow (dz, 2));
			dx /= da, dy /= da, dz /= da;
			
			this.vel.x = (dx)/da * velocity;
			this.vel.y = (dy)/da * velocity;
			this.vel.z = (dz)/da * velocity;
			
			ae_particle.add (this.coords.x + .4 + Math.random () * .2, this.coords.y + .4 + Math.random () * .2, this.coords.z + .4 + Math.random () * .2, params.particle, params.size, 3);
			this.coords.x += this.vel.x, this.coords.y += this.vel.y, this.coords.z += this.vel.z;
		
			if (Math.floor (this.coords.x) == coords [1] [0] && Math.floor (this.coords.y) == coords [1] [1] && Math.floor (this.coords.z) == coords [1] [2]) {
				this.destroy ();
			}
		};
	}
};

var ae_interface = {
	
};

var ae_tileentity = {
	registerPrototype: function (id, Prototype) {
		TileEntity.registerPrototype (id, Prototype);
		EnergyTileRegistry.addEnergyTypeForId (id, Prototype.energyType);
		ICRenderLib.addConnectionBlock (Prototype.energyName, id);
	}
};

var ae_player = {
	state: {
		health: {
			max: 20
		},
		
		registerState: function (name, state, logic, interface) {
			if (!this [name]) this [name] = {
				max: state [0],
				now: state [1]
			};
			var speed = logic.speed;
			
			if (!logic.direct) logic.direct = "increase";
			
			Callback.addCallback ("tick", function () {
				if (logic.direct == "decrease") {
					if ((logic.speed --) == 0) {
						this [name].now --;
						logic.speed = speed;
					}
				} else {
					if ((logic.speed --) == 0) {
						this [name].now ++;
						logic.speed = speed;
					}
				}
			});
		}
	}
};

var ae_ritual = {
	
};

var ae_plant = {
	addTree: function (sapling, x, y, z, params) {
		ae_block.add ("sapling", [{
			name: "Sapling", inCreative: true,
			texture: [["magical_stone"]]
		}], {
			renderlayer: 1
		});
	}
};

var ae_genetation = {
	
};

ae_plant.addTree ();
