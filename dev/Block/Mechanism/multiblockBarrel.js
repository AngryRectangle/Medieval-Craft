IDRegistry.genBlockID("woodenGate");
Block.createBlock("woodenGate", [
	{name: "Wooden Gate", texture: [["barrel_top", 0], ["barrel_top", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0]], inCreative: true}
]);
Translation.addTranslation("Wood Gate", {ru: "Деревянный краник"});
Recipes.addShaped({id: BlockID.woodenGate, count: 1, data: 0}, ["pip", "ivi", "pip"], ["p", 5,-1,"i", 265, -1]);

function getBorder(x,y,z){
	var yy = 0;
	var xx = 0;
	var zz = 0;
	for(yy = 0; World.getBlock(x,y+yy,z).id==17||World.getBlock(x,y+yy,z).id==162||World.getBlock(x,y+yy,z).id==42||World.getBlock(x,y+yy,z).id==BlockID.woodenGate||World.getBlock(x,y+yy,z).id==5;yy--){
	}
	yy++;
	for(xx = 0; World.getBlock(x+xx,y+yy,z).id==17||World.getBlock(x+xx,y+yy,z).id==162||World.getBlock(x+xx,y+yy,z).id==42||World.getBlock(x+xx,y+yy,z).id==BlockID.woodenGate||World.getBlock(x+xx,y+yy,z).id==5;xx--){
	}
	xx++;
	for(zz = 0; World.getBlock(x+xx,y+yy,z+zz).id==17||World.getBlock(x+xx,y+yy,z+zz).id==162||World.getBlock(x+xx,y+yy,z+zz).id==42||World.getBlock(x+xx,y+yy,z+zz).id==BlockID.woodenGate||World.getBlock(x+xx,y+yy,z+zz).id==5;zz--){
	}
	zz++;
	var firstPoint = {x:x+xx, y:y+yy, z:z+zz};
	for(yy = 0; World.getBlock(x,y+yy,z).id==17||World.getBlock(x,y+yy,z).id==162||World.getBlock(x,y+yy,z).id==42||World.getBlock(x,y+yy,z).id==BlockID.woodenGate||World.getBlock(x,y+yy,z).id==5;yy++){
	}
	yy--;
	for(xx = 0; World.getBlock(x+xx,y+yy,z).id==17||World.getBlock(x+xx,y+yy,z).id==162||World.getBlock(x+xx,y+yy,z).id==42||World.getBlock(x+xx,y+yy,z).id==BlockID.woodenGate||World.getBlock(x+xx,y+yy,z).id==5;xx++){
	}
	xx--;
	for(zz = 0; World.getBlock(x+xx,y+yy,z+zz).id==17||World.getBlock(x+xx,y+yy,z+zz).id==162||World.getBlock(x+xx,y+yy,z+zz).id==42||World.getBlock(x+xx,y+yy,z+zz).id==BlockID.woodenGate||World.getBlock(x+xx,y+yy,z+zz).id==5;zz++){
	}
	zz--;
	var secondPoint = {x:x+xx, y:y+yy, z:z+zz};
	var point = [firstPoint, secondPoint, {x:firstPoint.x,y:firstPoint.y, z:secondPoint.z},
	{x:firstPoint.x,y:secondPoint.y, z:secondPoint.z},
	{x:secondPoint.x,y:firstPoint.y, z:secondPoint.z},
	{x:secondPoint.x,y:secondPoint.y, z:firstPoint.z},
	{x:firstPoint.x,y:secondPoint.y, z:firstPoint.z},
	{x:secondPoint.x,y:firstPoint.y, z:firstPoint.z}
	];
	if(secondPoint.x-firstPoint.x>=3&&secondPoint.y-firstPoint.y>=3&&secondPoint.z-firstPoint.z>=3){
		return point;
	}
	return false;
}

function CBBOP(xyz1, xyz2){
	var x1 = Math.min(xyz1.x,xyz2.x);
	var x2 = Math.max(xyz1.x,xyz2.x);
	var y1 = Math.min(xyz1.y,xyz2.y);
	var y2 = Math.max(xyz1.y,xyz2.y);
	var z1 = Math.min(xyz1.z,xyz2.z);
	var z2 = Math.max(xyz1.z,xyz2.z);
	var x=x1;
	var y=y1;
	var z=z1;
	for(x1=x;x1<=x2; x1++){
		for(y1=y;y1<=y2; y1++){
			for(z1=z;z1<=z2; z1++){
				
				if(!multiBlock.getBlocks(x1,y1,z1,[{id:17,data:-1},{id:162,data:-1},{id:42,data:-1},{id:BlockID.woodenGate,data:-1}])){
					return false;
				}
			}
		}
	}
	//Logger.Log("_-------------------------------", "ERR");
	return true;
}

function checkBarrelConstruction(x,y,z){
	var verticles = getBorder(x,y,z);
	if(verticles&&CBBOP(verticles[0],verticles[4])&&CBBOP(verticles[1],verticles[6])&&CBBOP(verticles[0],verticles[3])&&CBBOP(verticles[1],verticles[7])&&CBBOP(verticles[0],verticles[5])&&CBBOP(verticles[1],verticles[2])){
		if(multiBlock.checkBlockArray(verticles, 42,-1)){
			return [verticles[0], verticles[1]];
		}
		}
return false;
		
}
TileEntity.registerPrototype(BlockID.woodenGate, {
	defaultValues: {
		type:"water",
		capacity:0,
		isGood:false
	},

	tick: function(){
		if(World.getWorldTime()%40==0&&this.data.capacity==0){
			var verticles = checkBarrelConstruction(this.x, this.y, this.z);
			if(verticles){
				let x = verticles[1].x-verticles[0].x-1;
				let y = verticles[1].y-verticles[0].y-1;
				let z = verticles[1].z-verticles[0].z-1;
				this.data.capacity = x*y*z;
				this.data.isGood=true;
				this.liquidStorage.setLimit(this.data.type, 16*this.data.capacity);	
			}
		}
		if(World.getWorldTime()%100&&this.data.capacity!=0){
			if(checkBarrelConstruction(this.x, this.y, this.z)){
				this.data.isGood=true;
			}else{
				this.data.isGood=false;
				this.data.capacity=0;
			}
		}
		var content = this.container.getGuiContent(); 
		
		this.liquidStorage.updateUiScale("woodbarrelScale", this.data.type);
		this.container.validateAll();
		var id1 = this.container.getSlot("woodbarrelslot1").id;
		var data1 = this.container.getSlot("woodbarrelslot1").data;
		var count1 = this.container.getSlot("woodbarrelslot1").count;
		var id2 = this.container.getSlot("woodbarrelslot2").id;
		var data2 = this.container.getSlot("woodbarrelslot2").data;
		var count2 = this.container.getSlot("woodbarrelslot2").count;
					if(this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data))<16*this.data.capacity&&LiquidRegistry.getEmptyItem(id1, data1)!=null){
						

					   if(this.liquidStorage.getAmount(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data))>0||this.liquidStorage.isEmpty()==true){
						   if(this.container.getSlot("woodbarrelslot2").id==LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).id||this.container.getSlot("woodbarrelslot2").id==0){
					this.data.type=LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data);
	this.liquidStorage.setLimit(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data), 16*this.data.capacity);	
	this.liquidStorage.addLiquid(LiquidRegistry.getItemLiquid(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data), 1);
	this.container.getSlot("woodbarrelslot2").id=LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).id;
	this.container.getSlot("woodbarrelslot2").data=LiquidRegistry.getEmptyItem(this.container.getSlot("woodbarrelslot1").id, this.container.getSlot("woodbarrelslot1").data).data;
	this.container.getSlot("woodbarrelslot2").count++;
	this.container.getSlot("woodbarrelslot1").count--;
	if (content){ 
		this.container.setText("FillText","mB "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())*1000+"/"+this.liquidStorage.getLimit(this.data.type)*1000);
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
		this.container.setText("FillText","mB "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())*1000+"/"+this.liquidStorage.getLimit(this.data.type)*1000);
		this.container.setText("FillText2","Bucket "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())+"/"+this.liquidStorage.getLimit(this.data.type));
		}
	}
	}
	},
	
	click: function(id, count, data, coords){
		if(!MC.playerGetSneaking()&&this.data.isGood){
		this.container.openAs(this.getGuiScreen());
		var content = this.container.getGuiContent(); 
		this.container.setText("FillText","mB "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())*1000+"/"+this.liquidStorage.getLimit(this.data.type)*1000);
		this.container.setText("FillText2","Bucket "+this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored())+"/"+this.liquidStorage.getLimit(this.data.type));
	}
	return true;
	},
	
getGuiScreen: function(){
		return barrelGui;
		
	}
});
