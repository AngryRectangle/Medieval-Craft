Medieval.Item.add ("kineticDrill", {
	name: "Drill",
	texture: ["kinetic_drill"],
	translate: {
		ru: "Бур"
	},
	values:{
		stack:1
		}
});
Medieval.Item.add ("kineticDrillwithGoldSpring", {
	name: "Drill With Gold Spring",
	texture: ["kinetic_drill"],
	translate: {
		ru: "Бур с Золотой Пружиной"
	},
	values:{
		stack:1
		}
});
Medieval.Item.add ("kineticDrillwithIronSpring", {
	name: "Drill With Iron Spring",
	texture: ["kinetic_drill"],
	translate: {
		ru: "Бур с Железной Пружиной"
	},
	values:{
		stack:1
		}
});
var drillWorkbench = function(api, field, result){
	for (var i in field){
		var id =field[i].id;
			var data =field[i].data;
		if(id==IDData.item.kineticDrillwithIronSpring||id==IDData.item.kineticDrillwithGoldSpring){
			//api.decreaseFieldSlot(i);
			result.data=field[i].data;
			field[i].data=0;
			field[i].id=IDData.item.kineticDrill;
			return;
		}
		if(MC.isSpring(id)){
			result.data=field[i].data/100;
			api.decreaseFieldSlot(i);
			return;
		}
		api.decreaseFieldSlot(i);
	}
};
var drill=function(){
	MC.addAchivement("medievalCraft","createDrill");
};
Recipes.addShaped({id: IDData.item.kineticDrill, count: 1, data: 0}, ["vvi", "ibg", "vvp"], ["g", IDData.item.ironGear_1x,-1,"p",5,-1, "i", 265,0,"b", 42,0],drill);
Recipes.addShaped({id: IDData.item.kineticDrillwithGoldSpring, count: 1, data: 0}, ["aaa", "sda", "aaa"], ["s", IDData.item.kineticDrill,-1,"d",IDData.item.goldSpring,-1],drillWorkbench);
Recipes.addShaped({id: IDData.item.kineticDrillwithIronSpring, count: 1, data: 0}, ["aaa", "sda", "aaa"], ["s", IDData.item.kineticDrill,-1,"d",IDData.item.ironSpring,-1],drillWorkbench);
Item.setMaxDamage(IDData.item.kineticDrillwithGoldSpring, 4500);
Item.setMaxDamage(IDData.item.kineticDrillwithIronSpring, 3000);
Recipes.addShaped({id: IDData.item.goldSpring, count: 1, data: 0}, ["aaa", "ada", "aaa"], ["d",IDData.item.kineticDrillwithGoldSpring,-1],drillWorkbench);
Recipes.addShaped({id: IDData.item.ironSpring, count: 1, data: 0}, ["aaa", "ada", "aaa"], ["d",IDData.item.kineticDrillwithIronSpring,-1],drillWorkbench);

/*Tool.add(ItemID.kineticDrillwithGoldSpring, {durability: 4500, level: 2, efficiency: 3, damage: 3},  ToolType.kineticDrill);
Tool.add(ItemID.kineticDrillwithIronSpring, {durability: 4500, level: 2, efficiency: 3, damage: 3},  ToolType.kineticDrill);
*/
Tool.add (ItemID.kineticDrillwithGoldSpring, ['stone',"dirt"], {
	material: 'iron',
	durability: 45,
	damage: 2, 
	enchant: {
		type: Native.EnchantType.pickaxe,
		max: 5
	},
	onBroke: function(item){
		item.data = Math.min(item.data, Item.getMaxDamage(item.id));
		return true;
	},
	calcDestroyTime: function(item, block, params, destroyTime, enchant){
		if(item.data < Item.getMaxDamage(item.id)){
			return destroyTime;
		}
		else{
			return params.base;
		}
	}
});
Tool.add (ItemID.kineticDrillwithIronSpring, ['stone',"dirt"], {
	material: 'iron',
	durability: 30,
	damage: 2, 
	enchant: {
		type: Native.EnchantType.pickaxe,
		max: 5
	},
	onBroke: function(item){
		item.data = Math.min(item.data+10, Item.getMaxDamage(item.id));
		return true;
	},
	calcDestroyTime: function(item, block, params, destroyTime, enchant){
		if(item.data < Item.getMaxDamage(item.id)){
			return destroyTime;

		}
		else{
			return params.base;
		}
	}
});
