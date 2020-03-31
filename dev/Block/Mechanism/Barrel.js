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
			minHeight: 700,
			inventory: {
				standart: true
		}, 
		background: { 
		standart: true 
		}
},
	drawing: [
		{type: "bitmap", x: 850, y: 120, bitmap: "bar", scale: 4}
	],

	elements: {
		"woodbarrelslot1": {type: "slot", x: 400, y: 100, size: 160},
		"woodbarrelslot2": {type: "slot", x: 400, y: 300, size: 160},
		"woodbarrelScale": {type: "scale", x: 850, y: 120, direction: 1, scale: 4, value:1, bitmap: "bar", overlay: "bars", overlay_scale: 4},
		"FillText": {type: "text", x: 400, y:470 , text: "Вёдер 0/16", height: 60 , width:400, font:{color:android.graphics.Color.rgb(255, 255, 255), size:30, shadow:0.5}},
		"FillText2": {type: "text", x: 400, y:40 , text: "мB 0/16000", height: 60,width:400, font:{color:android.graphics.Color.rgb(255, 255, 255), size:30, shadow:0.5}}
			}
		
});


TileEntity.registerPrototype(BlockID.barrel, {
	defaultValues: {
		type:"water"
	},

	tick: function(){
		var content = this.container.getGuiContent(); 
		this.liquidStorage.updateUiScale("woodbarrelScale", this.data.type);
		this.container.validateAll();
		var id1 = this.container.getSlot("woodbarrelslot1").id;
		var data1 = this.container.getSlot("woodbarrelslot1").data;
		var count1 = this.container.getSlot("woodbarrelslot1").count;
		var id2 = this.container.getSlot("woodbarrelslot2").id;
		var data2 = this.container.getSlot("woodbarrelslot2").data;
		var count2 = this.container.getSlot("woodbarrelslot2").count;
	if(this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data))<16&&LiquidRegistry.getEmptyItem(id1, data1)!=null){
		if(this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data))>0||this.liquidStorage.isEmpty()==true){
			if(this.container.getSlot("woodbarrelslot2").id==LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).id||this.container.getSlot("woodbarrelslot2").id==0){			
				this.data.type=LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data);
				this.liquidStorage.setLimit(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data), 16);	
				this.liquidStorage.addLiquid(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data), 1);
				this.container.getSlot("woodbarrelslot2").id=LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).id;
				this.container.getSlot("woodbarrelslot2").data=LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).data;
				this.container.getSlot("woodbarrelslot2").count++;
				this.container.getSlot("woodbarrelslot1").count--;
				if (content){ 
					this.container.setText("FillText2","mB "+(this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())*1000+"/"+this.liquidStorage.getLimit(this.data.type)*1000));
					this.container.setText("FillText2","Bucket "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())+"/"+this.liquidStorage.getLimit(this.data.type));
				}
			}
		}
	}
	if(LiquidRegistry.getFullItem(id1, data1, this.data.type)!=null&&this.liquidStorage.getAmount(this.data.type)>0){
		if(this.container.getSlot("woodbarrelslot2").id ==LiquidRegistry.getFullItem(id1, data1, this.data.type).id&&this.container.getSlot("woodbarrelslot2").data ==LiquidRegistry.getFullItem(id1, data1, this.data.type).data||id2==0){
			this.container.getSlot("woodbarrelslot2").id =LiquidRegistry.getFullItem(id1, data1, this.data.type).id;
			this.container.getSlot("woodbarrelslot2").data =LiquidRegistry.getFullItem(id1, data1, this.data.type).data;
			this.container.getSlot("woodbarrelslot2").count++;
			this.container.getSlot("woodbarrelslot1").count--;
			this.liquidStorage.getLiquid(this.data.type, 1);
			if (content){ 
				this.container.setText("FillText1","mB "+(this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())*1000+"/"+this.liquidStorage.getLimit(this.data.type)*1000));
				this.container.setText("FillText2","Bucket "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())+"/"+this.liquidStorage.getLimit(this.data.type));
			}
		}
	}
	},
	
	click: function(id, count, data, coords){
		
	},
	
getGuiScreen: function(){
		return barrelGui;
		
	}
});

Recipes.addShaped({id: BlockID.barrel_wooden, count: 1, data: 0}, ["pap", "gug", "pgp"], ["g", 5,-1,"p", 265, -1, "a", 17, -1, "u", 102, -1]);
Recipes.addShaped({id: BlockID.barrel_wooden, count: 1, data: 0}, ["pap", "gug", "pgp"], ["g", 5,-1,"p", 265, -1, "a", 162, -1, "u", 102, -1]);
