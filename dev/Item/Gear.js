Medieval.Item.add ("woodenGear_05x", {
	name: "Wooden Gear 0.5x",
	texture: ["wood_gear_05x"],
	translate: {
		ru: "Деревянная шестерня 0.5x"
	}
});
Recipes.addShaped({id: IDData.item.woodenGear_05x, count: 1, data: 0}, ["apa", "ppp", "apa"], ["p", 5,-1]);
Medieval.Item.add ("woodenGear_1x", {
	name: "Wooden Gear 1x",
	texture: ["wood_gear_1x"],
	translate: {
		ru: "Деревянная шестерня 1x"
	}
});
Recipes.addShaped({id: IDData.item.woodenGear_1x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 5,-1,"l",IDData.item.woodenGear_05x,0]);
Medieval.Item.add ("woodenGear_2x", {
	name: "Wooden Gear 2x",
	texture: ["wood_gear_2x"],
	translate: {
		ru: "Деревянная шестерня 2x"
	}
});
Recipes.addShaped({id: IDData.item.woodenGear_2x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 5,-1,"l",IDData.item.woodenGear_1x,0]);
Medieval.Item.add ("stoneGear_05x", {
	name: "Stone Gear 0.5x",
	texture: ["stone_gear_05x"],
	translate: {
		ru: "Каменная шестерня 0.5x"
	}
});
Recipes.addShaped({id: IDData.item.stoneGear_05x, count: 1, data: 0}, ["apa", "ppp", "apa"], ["p", 1,0]);
Medieval.Item.add ("stoneGear_1x", {
	name: "Stone Gear 1x",
	texture: ["stone_gear_1x"],
	translate: {
		ru: "Каменная шестерня 1x"
	}
});
Recipes.addShaped({id: IDData.item.stoneGear_1x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 1,0,"l",IDData.item.stoneGear_05x,0]);
Medieval.Item.add ("stoneGear_2x", {
	name: "Stone Gear 2x",
	texture: ["stone_gear_2x"],
	translate: {
		ru: "Каменная шестерня 2x"
	}
});
Recipes.addShaped({id: IDData.item.stoneGear_2x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 1,0,"l",IDData.item.stoneGear_1x,0]);
Medieval.Item.add ("ironGear_05x", {
	name: "Iron Gear 0.5x",
	texture: ["iron_gear_05x"],
	translate: {
		ru: "Железная шестерня 0.5x"
	}
});
Medieval.Item.add ("ironGear_1x", {
	name: "Iron Gear 1x",
	texture: ["iron_gear_1x"],
	translate: {
		ru: "Железная шестерня 1x"
	}
});
Medieval.Item.add ("ironGear_2x", {
	name: "Iron Gear 2x",
	texture: ["iron_gear_2x"],
	translate: {
		ru: "Железная шестерня 2x"
	}
});
Recipes.addShaped({id: IDData.item.ironGear_05x, count: 1, data: 0}, ["apa", "ppp", "apa"], ["p", 265,0]);
Recipes.addShaped({id: IDData.item.ironGear_1x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 265,0,"l",IDData.item.ironGear_05x,0]);
Recipes.addShaped({id: IDData.item.ironGear_2x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 265,0,"l",IDData.item.ironGear_1x,0]);
Medieval.Item.add ("goldenGear_05x", {
	name: "Golden Gear 0.5x",
	texture: ["gold_gear_05x"],
	translate: {
		ru: "Золотая шестерня 0.5x"
	}
});
Medieval.Item.add ("goldenGear_1x", {
	name: "Golden Gear 1x",
	texture: ["gold_gear_1x"],
	translate: {
		ru: "Золотая шестерня 1x"
	}
});
Medieval.Item.add ("goldenGear_2x", {
	name: "Golden Gear 2x",
	texture: ["gold_gear_2x"],
	translate: {
		ru: "Золотая шестерня 2x"
	}
});
Recipes.addShaped({id: IDData.item.goldenGear_05x, count: 1, data: 0}, ["apa", "ppp", "apa"], ["p", 266,0]);
Recipes.addShaped({id: IDData.item.goldenGear_1x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 266,0,"l",IDData.item.goldenGear_05x,0]);
Recipes.addShaped({id: IDData.item.goldenGear_2x, count: 1, data: 0}, ["pap", "ala", "pap"], ["p", 266,0,"l",IDData.item.goldenGear_1x,0]);
Medieval.Item.setGear(IDData.item.woodenGear_05x, 10, 0.5, 0.5);
Medieval.Item.setGear(IDData.item.woodenGear_1x, 10, 1, 1);
Medieval.Item.setGear(IDData.item.woodenGear_2x, 10, 2, 2);
Medieval.Item.setGear(IDData.item.stoneGear_05x, 30, 0.5, 0.5);
Medieval.Item.setGear(IDData.item.stoneGear_1x, 30, 1, 1);
Medieval.Item.setGear(IDData.item.stoneGear_2x, 30, 2, 2);
Medieval.Item.setGear(IDData.item.ironGear_05x, 100, 0.5, 0.5);
Medieval.Item.setGear(IDData.item.ironGear_1x, 100, 1, 1);
Medieval.Item.setGear(IDData.item.ironGear_2x, 100, 2, 2);
Medieval.Item.setGear(IDData.item.goldenGear_05x, 25, 0.75, 0.5);
Medieval.Item.setGear(IDData.item.goldenGear_1x, 25, 1.5, 1);
Medieval.Item.setGear(IDData.item.goldenGear_2x, 25, 3, 2);
