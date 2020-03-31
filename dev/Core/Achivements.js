var AchievementAPI;
ModAPI.addAPICallback("AchievementsAPI", function (api) {
	AchievementAPI = api.AchievementAPI;
	api.AchievementAPI.registerGroup({ 
		unique: "medievalCraft", 
		name: "Medieval Craft", 
		width: 600, 
		height: 250, 
		size: 100, 
		bgTexture: "log_oak", 
		icon: { 
			id: ItemID.smallHammer
		} 
	});
	
	
	api.AchievementAPI.register("medievalCraft", { 
		unique: "openBook", 
		name: { 
			text: "Инструкция"
		}, 
		description: { 
			text: "Может стоит наконец-то почитать инструкцию?"
		}, 
		column: 1, 
		row: 1, 
		item: { 
			id: 340 
		},
		type: "challenge"
	});
	api.AchievementAPI.register("medievalCraft", { 
		unique: "stoneFurnace", 
		name: { 
			text: "Уголёк"
		}, 
		description: { 
			text: "Сожгите ваш первый уголёк в печи"
		}, 
		column: 1, 
		row: 3, 
		item: { 
			id: 263
		} 
	});
	api.AchievementAPI.register("medievalCraft", { 
		unique: "createHammer", 
		name: { 
			text: "Ваш первый инструмент"
		}, 
		description: { 
			text: "Создайте на верстаке молоток"
		}, 
		column: 3, 
		row: 3, 
		item: { 
			id: ItemID.smallHammer 
		},
		parent:{
			unique: "stoneFurnace"
		}
	});
	api.AchievementAPI.register("medievalCraft", { 
		unique: "createSawmill", 
		name: { 
			text: "Взззыыыы"
		}, 
		description: { 
			text: "Создайте лесопилку на верстаке"
		}, 
		column: 5, 
		row: 1, 
		item: { 
			id: ItemID.sawmill 
		},
		parent:{
			unique: "createHammer"
		}
	});
	api.AchievementAPI.register("medievalCraft", { 
		unique: "createHandgrinder", 
		name: { 
			text: "Бах-бах-бах"
		}, 
		description: { 
			text: "Создайте дробилку из железного стола и ударника"
		}, 
		column: 5, 
		row: 2, 
		item: { 
			id: ItemID.crasherIron 
		},
		parent:{
			unique: "createHammer"
		}
	});
	api.AchievementAPI.register("medievalCraft", { 
		unique: "createDrill", 
		name: { 
			text: "Взвввввв"
		}, 
		description: { 
			text: "Создайте бур, работающий на пружинах"
		}, 
		column: 7, 
		row: 2, 
		item: { 
			id: ItemID.kineticDrill 
		},
		parent:{
			unique: "createHandgrinder"
		},
		type: "challenge"
	});
});
function giveCoalAchive(){
	if(AchievementAPI){
		AchievementAPI.give("medievalCraft", "stoneFurnace");
	}
}
