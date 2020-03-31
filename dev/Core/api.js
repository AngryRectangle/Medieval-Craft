var Medieval = {};

importLib("Tool", "*");
Medieval.Tool = {
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
				this.broke (1);
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
				this.broke (1);
			}
	 	};
		
   		Tool.add (id, blocks, properties);
  	}
};

var gear = [];
var spring=[];
Medieval.Item = {
	add: function (id, params, describe) {
		IDRegistry.genItemID (id);
		Item.createItem (id, params.name, {
			name: params.texture [0],
			meta: params.texture [1] || 0
		}, params.values || {});
		if (describe) Item.describeItem (id, describe);
		if (params.translate) Translation.addTranslation (params.name, params.translate);
	},
	setGear: function (id, damage, speed, power){
		Item.setMaxDamage(id, damage);
		gear.push({id:id, damage:damage, speed:speed, power:power});
	},
	getGearSpeed:function(id){
		for(var i in gear){
			if(gear[i].id==id){
				return gear[i].speed;
			}
		}
		return 0;
	},
	getGearMaxDamage:function(id){
		for(var i in gear){
			if(gear[i].id==id){
				return gear[i].damage;
			}
		}
		return 0;
	},
	addTool: function (id, params, describe) {
		this.add (id, params, describe);
		Medieval.API.Tool [params.type] (id, params.material);
		if (describe) Item.describeItem (id, describe);
		if (params.translate) Translation.addTranslation (params.name, params.translate);
	},
	addFood: function (id, params, describe) {
		if (!params.values.food) params.values.food = 0;
		
		IDRegistry.genItemID (id);
		Item.createItem (id, params.name, {
			name: params.texture [0],
			meta: params.texture [1] || 0
		}, params.values || {});
		if (describe) Item.describeItem (id, describe);
		if (params.translate) Translation.addTranslation (params.name, params.translate);
	},
	
	registerUseFunction: function (id, func) {
		Item.registerUseFunctionForID (id, func);
	}
};

var stoneFurnaceRecipe =[[]];
var grinderRecipe=[[]];
Medieval.Recipe = {
	list: {},
	addGrinder: function (input, result, time) {
		grinderRecipe.push({input:input, result:result, time:time});
	},
	getGrinderRecipe: function(input){
		for(var i =1; i<grinderRecipe.length; i++){
			if(grinderRecipe[i].input.id==input.id&&stoneFurnaceRecipe[i].input.data==input.data){
				return i;
			}
		}
		return null;
	},
	getStoneFurnaceRecipe:function(input){
		for(var i =1; i<stoneFurnaceRecipe.length; i++){
			if(stoneFurnaceRecipe[i].input.id==input.id&&stoneFurnaceRecipe[i].input.data==input.data){
				return i;
			}
		}
		return null;
	}
};
