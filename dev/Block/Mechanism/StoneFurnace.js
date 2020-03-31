var stoneFurnace = [{
	Block: [
		{ x: -1, y: -1, z: -1, id: [4] }, { x: -1, y: -1, z: 0, id: [4] }, { x: -1, y: -1, z: 1, id: [4] },
		{ x: -2, y: -1, z: -1, id: [4] }, { x: -2, y: -1, z: 0, id: [4] }, { x: -2, y: -1, z: -1, id: [4] },
		{ x: 0, y: -1, z: -1, id: [4] }, { x: 0, y: -1, z: 0, id: [4] }, { x: 0, y: -1, z: -1, id: [4] },
		{ x: -1, y: 1, z: -1, id: [4] }, { x: -1, y: 1, z: 0, id: [4] }, { x: -1, y: 1, z: 1, id: [4] },
		{ x: -2, y: 1, z: -1, id: [4] }, { x: -2, y: 1, z: 0, id: [4] }, { x: -2, y: 1, z: -1, id: [4] },
		{ x: 0, y: 1, z: -1, id: [4] }, { x: 0, y: 1, z: 0, id: [4] }, { x: 0, y: 1, z: -1, id: [4] },
		{ x: -1, y: 0, z: -1, id: [4] }, { x: -1, y: 0, z: 0, id: [4] }, { x: -1, y: 0, z: 1, id: [4] },
		{ x: -2, y: 0, z: -1, id: [4] }, { x: -2, y: 0, z: 0, id: [4] }, { x: -2, y: 0, z: -1, id: [4] },
		{ x: 0, y: 0, z: -1, id: [4] }, { x: 0, y: 0, z: -1, id: [4] }
	],
	Level: 1
}];
var furnaceGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Furnace"
			},
		},
		minHeight: 700,
		inventory: {
			standart: true
		},
		background: {
			standart: true
		}
	},
	drawing: [
		{ type: "bitmap", x: 455, y: 260, bitmap: "fire0", scale: 5 },
		{ type: "bitmap", x: 585, y: 265, bitmap: "furnace_bar_background", scale: 5 },
		{ type: "bitmap", x: 330, y: 100, bitmap: "temp_bar_0", scale: 4 }
	],
	elements: {
		"Furnaceslot2": { type: "slot", x: 445, y: 150, size: 100 },
		"Furnaceslot3": { type: "slot", x: 735, y: 250 - 15, size: 130 },
		"Furnaceslot1": { type: "slot", x: 445, y: 350, size: 100 },
		"Progress": { type: "scale", x: 585, y: 265, direction: 0, scale: 5, bitmap: "furnace_bar_scale" },
		"FurnaceFillText": { type: "text", x: 455, y: 470, text: "20°C", height: 52, width: 200, font: { color: android.graphics.Color.rgb(255, 255, 255), size: 30, shadow: 0.5 } },
		"Fire": { type: "scale", x: 455, y: 260, direction: 1, scale: 5, bitmap: "fire1" },
		"multiBlockCheck": { type: "image", x: 840, y: 500, bitmap: "multiblock_1", scale: 2 },
		"termometr": { type: "scale", x: 330, y: 100, direction: 1, scale: 4, bitmap: "temp_bar_1" },
	}
});
MC.loadStoneFurnaceRecipeList();
MC.loadFuelList();
MC.addStoneFurnaceRecipe({id:ItemID.dustIron},{id:265},1500);
MC.addStoneFurnaceRecipe({id:ItemID.dustGold},{id:266},1060);
MC.addStoneFurnaceRecipe({id:ItemID.dustCooper},{id:ItemID.ingotCopper},1090);
MC.addStoneFurnaceRecipe({id:ItemID.dustTin},{id:ItemID.ingotTin},230);
MC.addStoneFurnaceRecipe({id:ItemID.dustLead},{id:ItemID.ingotLead},320);
TileEntity.registerPrototype(61, {
	created: function() {
		this.data.fuel = { item: { id: 0, data: 0 } };
	},
	defaultValues: {
		construstion: 0,
		progresOfRecipe: 0,
		temperature: 20,
		recipe: null
	},
	tick: function() {
		if(World.getThreadTime() % 100 == 0) {
			this.data.construstion = multiBlock.getLevel(this.x, this.y, this.z, stoneFurnace).Level;
		}
		var content = this.container.getGuiContent();
		if(content) {
			this.container.setText("FurnaceFillText", Math.round(this.data.temperature) + "°C");
			if(this.data.progresOfRecipe) {
				this.container.setScale("Progress", 1 - Math.floor(this.data.progresOfRecipe / 200 * 22) / 22);
			} else {
				this.container.setScale("Progress", 0);
			}
			this.container.setScale("termometr", (this.data.temperature + 400) / 2500);
			if(this.data.construstion && content.elements["multiBlockCheck"].bitmap == "multiblock_1") {
				content.elements["multiBlockCheck"].bitmap = "multiblock_0";
			}
			if(!this.data.construstion && content.elements["multiBlockCheck"].bitmap == "multiblock_0") {
				content.elements["multiBlockCheck"].bitmap = "multiblock_1";
			}
		}
		if(this.container.getSlot("Furnaceslot1").id == 325 && this.container.getSlot("Furnaceslot1").data == 10) {
			this.container.getSlot("Furnaceslot1").data = 0;
			this.data.fuel.maxBurn = 20000;
			this.data.fuel.maxTemperature = 4000;
			this.data.fuel.burn = 20000;
			this.data.fuel.energy = 5500;
		}
		var fuel = MC.getFuel(this.container.getSlot("Furnaceslot1").id, this.container.getSlot("Furnaceslot1").data);
		if(fuel && this.data.construstion && fuel.temperature.min <= this.data.temperature && this.data.fuel.burn == 0) {
			this.data.fuel.id = this.container.getSlot("Furnaceslot1").id;
			if(this.data.fuel.id==263){
				giveCoalAchive();
			}
			this.data.fuel.data = this.container.getSlot("Furnaceslot1").data;
			this.data.fuel.burn = fuel.timeBurn;
			this.data.fuel.maxBurn = fuel.timeBurn;
			this.data.fuel.maxTemperature = fuel.temperature.max;
			this.data.fuel.energy = fuel.energy;
			this.container.getSlot("Furnaceslot1").count--;
		}
		if(this.data.temperature > 20 && !this.data.fuel.burn) {
			this.data.temperature -= 1;
		}
		if(this.data.fuel.burn) {
			this.fuelBurn();
		}
		if(!this.data.construstion) {
			this.data.fuel.burn = 0;
		}
		var recipe = MC.getStoneFurnaceRecipe(this.container.getSlot("Furnaceslot2").id, this.container.getSlot("Furnaceslot2").data, this.data.temperature);
		if(recipe && this.data.progresOfRecipe == 0 && this.data.construstion && this.container.getSlot("Furnaceslot3").count < 64) {
			if(this.container.getSlot("Furnaceslot3").id == 0 || this.container.getSlot("Furnaceslot3").id == recipe.result.id) {
				this.data.recipe = recipe;
				this.data.progresOfRecipe = 200;
			}
		}
		if(recipe == this.data.recipe && this.data.progresOfRecipe > 0 && recipe.temperature <= this.data.temperature && this.container.getSlot("Furnaceslot3").count < 64) {
			if(this.container.getSlot("Furnaceslot3").id == 0 || this.container.getSlot("Furnaceslot3").id == recipe.result.id) {
				this.data.progresOfRecipe -= 1;
			}
		}
		if(this.data.recipe != recipe && this.data.progresOfRecipe > 0 || !this.data.construstion || this.container.getSlot("Furnaceslot3").id != 0 && recipe && this.container.getSlot("Furnaceslot3").id != recipe.result.id || this.container.getSlot("Furnaceslot3").count > 63) {
			this.data.recipe = 0;
			this.data.progresOfRecipe = 0;
		}
		if(this.data.recipe && this.data.progresOfRecipe <= 0) {
			this.container.getSlot("Furnaceslot3").id = this.data.recipe.result.id;
			this.container.getSlot("Furnaceslot3").data = this.data.recipe.result.data;
			this.container.getSlot("Furnaceslot3").count++;
			this.container.getSlot("Furnaceslot2").count--;
			this.data.recipe = null;
		}
		this.container.validateAll();
	},
	fuelBurn: function() {
		if(this.data.temperature + this.data.fuel.energy / this.data.fuel.maxBurn * 3 < this.data.fuel.maxTemperature) {
			this.data.temperature += this.data.fuel.energy / this.data.fuel.maxBurn * 3;
		}
		this.data.fuel.burn--;
		this.container.setScale("Fire", Math.round(this.data.fuel.burn / this.data.fuel.maxBurn * 15) / 15);
	},
	click: function(id, count, data, coords) {
		this.data.construstion = multiBlock.getLevel(this.x, this.y, this.z, stoneFurnace).Level;
		Game.prevent();
	},
	getGuiScreen: function() {
		return furnaceGui;
	}
});
