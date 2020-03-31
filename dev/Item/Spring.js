Medieval.Item.add ("ironSpring", {
	name: "Iron Spring",
	texture: ["iron_spring"],
	translate: {
		ru: "Железная пружина"
	},
	values:{
		stack:1
		}
});
Medieval.Item.add ("goldSpring", {
	name: "Gold Spring",
	texture: ["gold_spring"],
	translate: {
		ru: "Золотая пружина"
	},
	values:{
		stack:1
		}
});
MC.setSpring(IDData.item.ironSpring, 3000, 30, 500);
MC.setSpring(IDData.item.goldSpring, 4500, 45, 750);
Recipes.addShaped({id: IDData.item.ironSpring, count: 1, data: 0}, ["ivv", "viv", "ivv"], ["i", 265,-1]);
Recipes.addShaped({id: IDData.item.goldSpring, count: 1, data: 0}, ["ivv", "viv", "ivv"], ["i", 266,-1]);
