IDRegistry.genBlockID("barrel_wooden");
Block.createBlock("barrel_wooden", [
	{name: "Wooden barrel", texture: [["barrel_top", 0], ["barrel_top", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0]], inCreative: true}
]);
Translation.addTranslation("Wooden barrel", {ru: "Деревянная бочка"});

var barrelGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Бочка"
			},
			},
			inventory: {
				standart: true
		}, 
		background: { 
		standart: true 
		}
},
	drawing: [
		{type: "bitmap", x: 850, y: 60, bitmap: "bar", scale: 4}
	],

	elements: {
		"woodbarrelslot1": {type: "slot", x: 400, y: 100, size: 120},
		"woodbarrelslot2": {type: "slot", x: 400, y: 250, size: 120},
		"woodbarrelScale": {type: "scale", x: 850, y: 60, direction: 1, scale: 4, value:1, bitmap: "bar", overlay: "bars", overlay_scale: 4},
		"FillText": {type: "text", x: 400, y:420 , text: "Вёдер 0/16", height: 60 , width:400, font:{color:android.graphics.Color.rgb(255, 255, 255), size:30, shadow:0.5}},
		"FillText2": {type: "text", x: 400, y:40 , text: "мB 0/16000", height: 60,width:400, font:{color:android.graphics.Color.rgb(255, 255, 255), size:30, shadow:0.5}}
			}
		
});

TileEntity.registerPrototype(BlockID["barrel_wooden"], {
	defaultValues: {
		type: "water"
	},
	init: function(){
		this.inputSlot = this.container.getSlot("woodbarrelslot1");
		this.outputSlot = this.container.getSlot("woodbarrelslot2");
	},
	tick: function () {
		var content = this.container.getGuiContent();
		this.liquidStorage.updateUiScale("woodbarrelScale", this.data.type);
		this.container.validateAll();
		if (this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.inputSlot.id, this.inputSlot.data)) < 16 && LiquidRegistry.getEmptyItem(this.inputSlot.id, this.inputSlot.data) != null) {
			if (this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.inputSlot.id, this.inputSlot.data)) > 0 || this.liquidStorage.isEmpty() == true) {
				if (this.outputSlot.id == LiquidRegistry.getEmptyItem(this.inputSlot.id, this.inputSlot.data).id || this.outputSlot.id == 0) {
					this.data.type = LiquidRegistry.getItemLiquid(this.inputSlot.id, this.inputSlot.data);
					this.liquidStorage.setLimit(LiquidRegistry.getItemLiquid(this.inputSlot.id, this.inputSlot.data), 16);
					this.liquidStorage.addLiquid(LiquidRegistry.getItemLiquid(this.inputSlot.id, this.inputSlot.data), 1);
					this.outputSlot.id = LiquidRegistry.getEmptyItem(this.inputSlot.id, this.inputSlot.data).id;
					this.outputSlot.data = LiquidRegistry.getEmptyItem(this.inputSlot.id, this.inputSlot.data).data;
					this.outputSlot.count++;
					this.inputSlot.count--;
					if (content) {
						this.container.setText("FillText2", "mB " + (this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored()) * 1000 + "/" + this.liquidStorage.getLimit(this.data.type) * 1000));
						this.container.setText("FillText2", "Bucket " + this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored()) + "/" + this.liquidStorage.getLimit(this.data.type));
					}
				}
			}
		}
		if (LiquidRegistry.getFullItem(this.inputSlot.id, this.inputSlot.data, this.data.type) != null && this.liquidStorage.getAmount(this.data.type) > 0) {
			if (this.outputSlot.id == LiquidRegistry.getFullItem(this.inputSlot.id, this.inputSlot.data, this.data.type).id && this.outputSlot.data == LiquidRegistry.getFullItem(this.inputSlot.id, this.inputSlot.data, this.data.type).data || this.outputSlot.id == 0) {
				this.outputSlot.id = LiquidRegistry.getFullItem(this.inputSlot.id, this.inputSlot.data, this.data.type).id;
				this.outputSlot.data = LiquidRegistry.getFullItem(this.inputSlot.id, this.inputSlot.data, this.data.type).data;
				this.outputSlot.count++;
				this.inputSlot.count--;
				this.liquidStorage.getLiquid(this.data.type, 1);
				if (content) {
					this.container.setText("FillText1", "mB " + (this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored()) * 1000 + "/" + this.liquidStorage.getLimit(this.data.type) * 1000));
					this.container.setText("FillText2", "Bucket " + this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored()) + "/" + this.liquidStorage.getLimit(this.data.type));
				}
			}
		}
	},
	getGuiScreen: function () {
		return barrelGui;
	}
});

Recipes.addShaped({
	id: BlockID["barrel_wooden"],
	count: 1,
	data: 0
}, ["pap", "gug", "pgp"], ["g", 5, -1, "p", 265, -1, "a", 17, -1, "u", 102, -1]);
Recipes.addShaped({
	id: BlockID["barrel_wooden"],
	count: 1,
	data: 0
}, ["pap", "gug", "pgp"], ["g", 5, -1, "p", 265, -1, "a", 162, -1, "u", 102, -1]);