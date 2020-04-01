var Tool = {
	add: function (id, block, properties) {
		Item.setToolRender (id, true);
	
		ToolAPI.registerTool (id, properties.material, block, properties);
		
		if (properties.enchant) {
			Item.setEnchantType (id, properties.enchant.type, properties.enchant.max);
		}
		if (properties.useItem) {
			Item.registerUseFunctionForID (id, properties.useItem);
		}
		//TODO fix it
		//Item.setMaxDamage (id, properties.durability);
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

  pickaxe: function(id, material){
   var properties = {};
   var tool_material = ToolAPI.toolMaterials[material];
   var blocks = ["stone"];
   properties.material = material;
   properties.durability = tool_material.durability;
   properties.damage = 2;
   properties.enchant = {
    type: Native.EnchantType.pickaxe,
    max: tool_material.enchantability
   }
   Tool.add(id, blocks, properties);
  },

  axe: function(id, material){
   var properties = {};
   var tool_material = ToolAPI.toolMaterials[material];
   var blocks = ["wood"];
   properties.material = material;
   properties.durability = tool_material.durability;
   properties.damage = 3;
   properties.enchant = {
    type: Native.EnchantType.axe,
    max: tool_material.enchantability
   }
   Tool.add(id, blocks, properties);
  },

  shovel: function(id, material){
   var properties = {};
   var tool_material = ToolAPI.toolMaterials[material];
   var blocks = ["dirt"];
   properties.material = material;
   properties.durability = tool_material.durability;
   properties.damage = 1;
   properties.enchant = {
    type: Native.EnchantType.shovel,
    max: tool_material.enchantability
   }
   properties.useItem = function (coords, item, block) {
		if (block.id == 2 && coords.side == 1) {
			World.setBlock (coords.x, coords.y, coords.z, 198);
			World.playSound (coords.x, coords.y, coords.z, 'step.grass', 1, 1);
			Tool.broke (1);
		}
   };
   Tool.add(id, blocks, properties);
  },

  hoe: function(id, material){
   var properties = {};
   var tool_material = ToolAPI.toolMaterials[material];
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
			Tool.broke (1);
		}
	 };
   Tool.add(id, blocks, properties);
  },

  sword: function(id, material){
   var properties = {};
   var tool_material = ToolAPI.toolMaterials[material];
   var blocks = ["plant", "corweb"];
   properties.material = material;
   properties.isWeapon = true;
   properties.durability = tool_material.durability;
   properties.damage = 4;
   properties.enchant = {
    type: Native.EnchantType.sword,
    max: tool_material.enchantability
   }
   Tool.add(id, blocks, properties);
  }
};