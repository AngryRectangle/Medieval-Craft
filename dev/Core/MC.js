var MC = {
DebugInSecond:function(msg){
	if(World.getThreadTime()%20==0){
		Debug.m(msg);
	}
},
fuelList:[],
addFuel:function(item, timeBurn, energy, temperature){
	MC.fuelList.push({item:item, timeBurn:timeBurn, energy:energy, temperature:temperature});
},
getFuel:function(id, data){
	for(var i in MC.fuelList){
		if(MC.fuelList[i].item.id==id&&MC.fuelList[i].item.data==data||MC.fuelList[i].item.id==id&&MC.fuelList[i].item.data==-1){
			return MC.fuelList[i];
		}
	}
	return null;
},

saveFuelList : function(){
	FileTools.WriteJSON (__dir__+"/json/fuelList.json", this.fuelList, true);
},
loadFuelList: function(){
	this.fuelList = FileTools.ReadJSON(__dir__+"/json/fuelList.json");
},
stoneFurnaceRecipeList:[],
addStoneFurnaceRecipe:function (input, result, temperature){
	input.data=input.data||-1;
	result.data=result.data||-1;
	result.count=result.count||-1;
	temperature = temperature||20;
	MC.stoneFurnaceRecipeList.push({input:input, result:result, temperature:temperature});
},
getStoneFurnaceRecipe:function(id, data,temp){
	for(var i in this.stoneFurnaceRecipeList){
		var r = this.stoneFurnaceRecipeList[i];
		if(r.input.id==id&&temp>=r.temperature){
			if(r.input.data==data||r.input.data==-1){
				return r;
			}
		}
	}
	return null;
},
saveStoneFurnaceRecipeList:function(){
	FileTools.WriteJSON (__dir__+"/json/stoneFurnaceRecipeList.json", this.stoneFurnaceRecipeList, true);
},
loadStoneFurnaceRecipeList:function(){
	this.stoneFurnaceRecipeList = FileTools.ReadJSON(__dir__+"/json/stoneFurnaceRecipeList.json");
},
timers:[],
addTimer:function(func, time, arg){
	this.timers.push({func:func, time:time, arg:arg});
},
getDisplay:function(){
	var context = UI.getContext();
	var wm = context.getSystemService(context.WINDOW_SERVICE);
	return display = wm.getDefaultDisplay();
},
getDisplayWidth:function(){
	return this.getDisplay().getWidth();
},
getDisplayHeight:function(){
	return this.getDisplay().getHeight();
},
getDisplayRatio:function(){
	return this.getDisplayWidth()/this.getDisplayHeight();
},
unitConvertToPixel:function(unit){
	return unit/1000*this.getDisplayWidth();
},
pixelConvertToUnit:function(pixel){
	return pixel/this.getDisplayWidth()*1000;
},
playerGetSneaking:function(){
	var r= ModAPI.requireGlobal("Entity.isSneaking");
	return r(Player.get());
},
playerGetGamemode:ModAPI.requireGlobal("Level.getGameMode"),
replaceBlock:function(iId, bId){
	Block.registerDropFunctionForID(bId, function(coords, id, data, diggingLevel, toolLevel){
		if(MC.playerGetGamemode()==0){
			return [[iId, 1, 0]]; 
		}else{
			return [];
		}
	});
	Callback.addCallback("ItemUse",function(coords, item, block){
		if(item.id==iId){
			if(MC.playerGetGamemode()==0){
			Player.decreaseCarriedItem(1);
			}
			World.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, bId, 0);
			World.addTileEntity (coords.relative.x, coords.relative.y, coords.relative.z) ;
		}
	});
},
handGrinderRecipeList:[],
addHandGrinderRecipe:function (input, result){
	input.data = input.data||0;
	result.data = result.data||0;
	result.count = result.count||1;
	MC.handGrinderRecipeList.push({input:input, result:result});
},
getHandGrinderRecipe:function(id, data){
	for(var i in this.handGrinderRecipeList){
		var r = this.handGrinderRecipeList[i];
		if(r.input.id==id&&r.result.id){
			if(r.input.data==data||r.input.data==-1){
				return r;
			}
		}
	}
	return null;
},
saveHandGrinderRecipeList:function(){
	FileTools.WriteJSON (__dir__+"/json/handGrinderRecipeList.json", this.handGrinderRecipeList, true);
},
loadHandGrinderRecipeList:function(){
	this.handGrinderRecipeList = FileTools.ReadJSON(__dir__+"/json/handGrinderRecipeList.json");
},
springs:[],
setSpring:function(id, capacity, inp, out){
	capacity = capacity||1000;
	inp = inp||30;
	out = out||300;
	this.springs.push({id:id, capacity:capacity, inp:inp, out:out});
	Item.setMaxDamage(id, capacity);
},
isSpring:function(id){
	for(var i in this.springs){
		if(id == this.springs[i].id){
			return true;
		}
	}
	return false;
},
getSpringIndex:function(id){
	for(var i in this.springs){
		if(id == this.springs[i].id){
			return i;
		}
	}
	return null;
},
getSpringCapacity:function(id){
	if(this.getSpringIndex(id)!==null){
		return this.springs[this.getSpringIndex(id)].capacity;
	}
},
addAchivement:function(group, id){
	if(AchievementAPI){
		AchievementAPI.give(group, id);
	}
}
};

Callback.addCallback("tick", function() {
	for(var i in MC.timers){
		var t = MC.timers[i];
		t.time--;
		if(t.time==0){
			t.func(t.arg);
			MC.timers.splice(MC.timers.indexOf(i), 1);
		}
	}
});
