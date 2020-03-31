/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 43
*/



// file: header.js

/*
█───██─███──████───███──███──█─█──████──█
██─███─█────█──██───█───█────█─█──█──█──█
█─█─██─███──█──██───█───███──█─█──████──█
█───██─█────█──██───█───█────███──█──█──█
█───██─███──████───███──███───█───█──█──███

████──████──████──███──███
█──█──█──█──█──█──█─────█
█─────████──████──███───█
█──█──█─█───█──█──█─────█
████──█─█───█──█──█─────█
*/
importLib ("Tool", "*");
importLib("energylib", "*");
Callback.addCallback("LevelLoaded",function(){
	//Game.message("Зарктыая бета-версия, распространение запрещено.");
});




// file: stringConfigure.js

var stringPath={
	imagePath:{
		grinderBar:"grinder_bar_background",
		grinderDraw:"grinderDraw",
		lastTheme:"preTheme",
		homePage:"mainPage",
		closeBook:"closeBookButton",
		grinderConstruction:"images.grinderConstruction",
		waterWheelLevel1:"images.waterWheelFirstLevel",
		millLevel1:"images.millFirstLevel"
	}
};




// file: Core/AdvancedMath.js

var AdvMath={
	sign:function(x){
		if(x>0){
			return 1;
		}else if(x<0){
			return -1;
		}else if(x==0){
			return 0;
		}else{
			return NaN;
		}
	},
	random:function(min, max){
		return min+Math.round(Math.random()*(max-min));
	}
};




// file: Core/MC.js

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




// file: Core/energy.js

var energyKineticEnergy=EnergyTypeRegistry.assureEnergyType("Kimetic Energy", 12);




// file: Core/multiblock.js

function rotationArray(array){
	for(var i in array){
	var between = array[i].z;
	array[i].z=array[i].x;
	array[i].x=between;
	}
}
function mirrorArray(array){
	for(var i in array){
	array[i].x=-array[i].x;
	array[i].z=-array[i].z;
	}
}
var multiBlock={
getLevel: function(x,y,z, array){
	for(var p in array){
	var AngleOfLevel1 =[[],[],[],[]];
	
	for(var i =0; i<4; i++){
		for(var b in array[p].Block){
			AngleOfLevel1[i].push({x:array[p].Block[b].x,y:array[p].Block[b].y,z:array[p].Block[b].z, id:array[p].Block[b].id});
		}
	}
	rotationArray(AngleOfLevel1[1]);
	mirrorArray(AngleOfLevel1[2]);
	mirrorArray(AngleOfLevel1[3]);
	rotationArray(AngleOfLevel1[3]);
	for(var ii in AngleOfLevel1){
		var check = true;
	for(var i in AngleOfLevel1[ii]){
		var lock = false;
		for( var l in AngleOfLevel1[ii][i].id){
			if(World.getBlock(x+AngleOfLevel1[ii][i].x, y + AngleOfLevel1[ii][i].y, z+AngleOfLevel1[ii][i].z).id==AngleOfLevel1[ii][i].id[l]){
			lock = true;
		}
		}
		if(!lock){
			check=false;
		}
		}
		if(check){
			return {Level:array[p].Level, orientation:ii};
		}
	}
}
	return 0;
},
getBlocksByOrientation:function(array, level, orientation){
	let blockArr = [];
	for(let i in array){
		if(array[i].Level==level){
			array = array[i];
			break;
		}
	}
	for(var b in array.Block){
		blockArr.push({x:array.Block[b].x,y:array.Block[b].y,z:array.Block[b].z, id:array.Block[b].id});
	}
	if(orientation==1){
		rotationArray(blockArr);
	}
	if(orientation==2){
		mirrorArray(blockArr);
	}
	if(orientation==3){
		rotationArray(blockArr);
		mirrorArray(blockArr);
	}
	return blockArr;
},
getBlocks:function(x,y,z,array){
	for(var i in array){
		if(World.getBlock(x,y,z).id==array[i].id){
			if(World.getBlock(x,y,z).data==array[i].data||array[i].data==-1){
				//Logger.Log(World.getBlock(x,y,z).id, "ERR");
				return array[i];
			}
		}
	}
	return false;
},
checkBlockArray:function(array, id, data){
	for(var i in array){
		if(World.getBlock(array[i].x, array[i].y, array[i].z).id!=id||World.getBlock(array.x, array.y, array.z).data!=data&&data!=-1){
			return false;
		}
	}
	return true;
}
};






// file: Core/energy.js

var energyKineticEnergy=EnergyTypeRegistry.assureEnergyType("Kimetic Energy", 12);




// file: Core/api.js

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




// file: Core/ThemeAPI.js

var openThemeArray = [];
var Theme = {
	themes: {},
	createTheme: function(name, mainPage) {
		mainPage = mainPage||null;
		this.themes[name] = { name: name, pages:[], x:60, y:100, defFirstMinX:60, defMinY:100, defFirstMaxX:400, defMaxY:500, defSecondMinX:570, defSecondMaxX:910, layout:null, mainPage:mainPage};
		this.addNewPage(this.getThemeByName(name));
	},
	newLine:function(theme, size){
		size = size||20;
		if(theme.x<theme.defFirstMaxX){
			theme.x=theme.defFirstMinX;
			theme.y+=size;
			if(theme.y>theme.defMaxY){
					theme.y = theme.defMinY;
					theme.x = theme.defSecondMinX;
				}
		}
		
		if(theme.x>theme.defFirstMaxX){
				theme.y+=size;
				theme.x = theme.defSecondMinX;
				if(theme.y>theme.defMaxY){
					theme.y = theme.defMinY;
					theme.x = theme.defFirstMinX;
					this.addNewPage(theme);
				}
			}
	},
	getNewPage:function(theme, sec){
		if(theme.y>=theme.defMaxY){
			theme.y = theme.defMinY;
			if(theme.x>=theme.defSecondMinX){
				this.addNewPage(theme);
				return false;
			}else{
				return true;
			}
		}
		if(theme.x>=theme.defSecondMinX){
				return true;
			}else{
				return false;
			}
	},
	getNewRelativePage:function(theme, y){
		if(theme.y+y>=theme.defMaxY){
			theme.y = theme.defMinY;
			if(theme.x>=theme.defSecondMinX){
				this.addNewPage(theme);
				return false;
			}else{
				return true;
			}
		}
		if(theme.x>=theme.defSecondMinX){
				return true;
			}else{
				return false;
			}
	},
	getThemeByName: function(name) {
		for(var i in this.themes) {
			if(name == this.themes[i].name) {
				return this.themes[i];
			}
		}
		return null;
	},
	openTheme: function(name, page) {
		page = page||0;
		if(openThemeArray.length==0||name!=openThemeArray[openThemeArray.length-1].link)openThemeArray.push({link:name, page:page});
		var theme = this.getThemeByName(name);
		if(theme) {
			var elements = theme.pages[page].elements;
			if(theme.pages.length>page+1){
				elements["nextPage"] = {type: "button", x: 850, y: 550, bitmap: "next_page", scale: 3, page:page, link:name, clicker: {
                        onClick: function (container) {
                           var link;
							var page;
					for(var i in container.getGuiContent().elements){
						var e = container.getGuiContent().elements[i];
						if(Math.floor(e.x)==850&&Math.floor(e.y)==550){
							link = e.link;
							page = e.page;
						}
					}
					Theme.openTheme(link, page+1);
					MC.addTimer(
					Theme.themeCloser,
					20,
					container);
                        }
                    }
                };
			}
			if(page>0){
				elements["prevPage"] = {type: "button", x: 50, y: 550, bitmap: "pre_page", scale: 3, page:page, link:name, clicker: {
                        onClick: function (container) {
                           var link;
							var page;
					for(var i in container.getGuiContent().elements){
						var e = container.getGuiContent().elements[i];
						if(Math.floor(e.x)==50&&Math.floor(e.y)==550){
							link = e.link;
							page = e.page;
						}
					}
					Theme.openTheme(link, page-1);
					MC.addTimer(
					Theme.themeCloser,
					20,
					container);
                        }
                    }
                };
			}
			if(theme.mainPage){
				elements["homeTheme"] = {type: "button", x: 400, y: 520, bitmap: stringPath.imagePath.homePage, scale: 3, link:theme.mainPage, clicker: {
                        onClick: function (container) {
					this.checkValue = function(){
						return this;
					};
					var obj = this.checkValue();
					var link=obj.link;
					openThemeArray = [];
					Theme.openTheme(link, 0);
					MC.addTimer(
					Theme.themeCloser,
					20,
					container);
                        }
                    }
                };
			}
			if(openThemeArray.length>1){
				elements["lastTheme"] = {type: "button", x: 330, y: 520, bitmap: stringPath.imagePath.lastTheme, scale: 3, clicker: {
                        onClick: function (container) {
							var t = openThemeArray[openThemeArray.length-2];
							openThemeArray.splice(-2, 2);
					Theme.openTheme(t.link, t.page);
					MC.addTimer(
					Theme.themeCloser,
					20,
					container);
                        }
                    }
                };
			}
			elements["closeButton"] = {type: "button", x: 550, y: 520, bitmap: stringPath.imagePath.closeBook, scale: 3, clicker: {
                        onClick: function (container) {
					Theme.themeCloser(container);
					openThemeArray=[];
                        }
                    }
                };
			var gui = new UI.StandartWindow({
					standart: {
						background: {
							bitmap: "guide_background",
                      		color: android.graphics.Color.argb(256, 0, 0, 0),
						}
					},
					drawing: theme.pages[page].drawable,
					elements: elements
				});
			theme.pages[page].container.openAs(
				gui
			);
		}
	},
	themeCloser:function(container){
		if(container)container.close();
	},
	addNewPage:function(theme){
		theme.pages.push({drawable:[],elements:{},container: new UI.Container()});
	}
};
var ItemVisual = {
	createViewItem: function(name, page, x, y, id, count, data, size, bitmap) {
		data = data || 0;
		size = size || 50;
		count = count || 1;
		page=page||0;
		var theme = Theme.getThemeByName(name);
		var index = Object.keys(theme.pages[page].elements).length;
		theme.pages[page].elements["Item" + index] = {};
		if(bitmap){
			theme.pages[page].elements["Item" + index] = { type: "slot", x: x, y: y, size: size, bitmap: bitmap, visual: true};
		}else{
			theme.pages[page].elements["Item" + index] = { type: "slot", x: x, y: y, size: size, bitmap: "slot_empty", visual: true, isTransparentBackground: true };
		}
		theme.pages[page].container.setSlot("Item" + index, id, count, data);
	},
	addItem:function(name, id, count, data, size){
		var theme = Theme.getThemeByName(name);
		count=count||count;
		data = data||data;
		size = size||30;
		this.createViewItem(name, theme.pages.length-1, theme.x, theme.y-size/2, id, count, data, size);
		theme.x+=size;
	},
	animateItem: [],
	createAnimateItem: function(name, page, x, y, item, size, time, bitmap) {
		size = size || 50;
		count = item[0].count || 1;
		data = item[0].data || 1;
		theme = Theme.getThemeByName(name);
		page = page||0;
		var index = Object.keys(theme.pages[page].elements).length;
		theme.pages[page].elements["Item" + index] = {};
		if(bitmap){
			theme.pages[page].elements["Item" + index] = { type: "slot", x: x, y: y, size: size, bitmap: bitmap, visual: true};
		}else{
			theme.pages[page].elements["Item" + index] = { type: "slot", x: x, y: y, size: size, bitmap: "slot_empty", visual: true };
		}
		theme.pages[page].container.setSlot("Item" + index, item[0].id, count, data);
		for(var i in item) {
			time = time || 10;
			item[i].data = item[i].data || 0;
			item[i].count = item[i].count || 1;
		}
		this.animateItem.push({ item: item, slot: "Item" + index, container: theme.pages[page].container, time: time, currentActive: 0 });
	},
	updateItemAnimation: function() {
		for(var i in this.animateItem) {
			var animation = this.animateItem[i];
			if(animation.container.isOpened()) {
				if(World.getThreadTime() % animation.time == 0) {
					if(animation.currentActive + 1 == animation.item.length) {
						animation.currentActive = 0;
					} else {
						animation.currentActive++;
					}
					var act = animation.item[animation.currentActive];
					var slot = animation.container.getSlot(animation.slot);
					slot.id = act.id;
					slot.data = act.data;
					slot.count = slot.count;
				}
			}
		}
	}
};

var ImageVisual={
	addImage:function(name, src, x, y){
		x = x||400/1.5;
		y = y||300/1.5;
		var theme = Theme.getThemeByName(name);
		Theme.newLine(theme, 30);
		Theme.getNewRelativePage(theme, y)?theme.x=theme.defSecondMinX:theme.x=theme.defFirstMinX;
		var xx = theme.x>=theme.defSecondMinX?(theme.defSecondMaxX-theme.defSecondMinX)/2-x/2+theme.defSecondMinX:(theme.defFirstMaxX+theme.defFirstMinX)/2-x/2;
		theme.pages[theme.pages.length-1].drawable.push({
            type: "custom",
            z: -1,
            custom: {},
			x:xx,
			y:theme.y,
			src:src,
			width:x,
			height:y,
            onSetup: function () {
                
            },

            func: function (canvas, scale) {
					var BitMap = new android.graphics.Bitmap.createScaledBitmap(UI.TextureSource.get(this.src), MC.unitConvertToPixel(this.width), MC.unitConvertToPixel(this.height), false);
					canvas.drawBitmap(BitMap,MC.unitConvertToPixel(this.x),MC.unitConvertToPixel(this.y),null);
            }
        });
		theme.x+=x;
		theme.y+=y;
		Theme.newLine(theme, 30);
	}
};

var Font = {
	fonts:{},
	createFont:function(name, font){
		font = font||{};
		name.size = name.size||40;
			font.lineSpacing = font.lineSpacing||1.5;
			font.color = font.color||android.graphics.Color.BLACK;
			font.underline = font.underline||false;
			font.bold = font.bold||false;
			font.typeface = font.pathTypeface?android.graphics.Typeface.createFromFile(__dir__+font.pathTypeface):android.graphics.Typeface.DEFAULT;
		font.name = name;
		this.fonts[name]=font;
	},
	getFont:function(name){
		if(typeof name=="string"){
			return Font.fonts[name];
		}
		if(typeof name=="object"){
			name.size = name.size||40;
			name.lineSpacing = name.lineSpacing||1.5;
			name.color = name.color||android.graphics.Color.BLACK;
			name.underline = name.underline||false;
			name.bold = name.bold||false;
			name.typeface = name.pathTypeface?android.graphics.Typeface.createFromFile(__dir__+name.pathTypeface):android.graphics.Typeface.DEFAULT;
			return name;
		}
	},
	lineSpacing:function(name){
		return name.size*name.lineSpacing/2;
	}
};
Font.createFont("DEFAULT");
Font.createFont("STANDART_TEXT",{size:40, pathTypeface:"res/fonts/goth.ttf"});

var TextVisual = {
	addTextLink:function(name, text, linkName, page, font, addFont){
		page=page||0;
		var theme = Theme.getThemeByName(name);
		font = font||"DEFAULT";
		font = Font.getFont(font);
		
		var paint = new android.graphics.Paint();
        paint.setColor(font.color);
        paint.setTextSize(font.size);
		paint.setUnderlineText(font.underline);
		paint.setTypeface(font.typeface);
		var string = this.textOrganizer(theme, text, font, paint);
		for(var i in string){
			var elements = theme.pages[string[i].page].elements;
			var BitMap = new android.graphics.Bitmap.createBitmap(paint.measureText(string[i].text,0, string[i].text.length), font.size,android.graphics.Bitmap.Config.ARGB_8888);
			var index = Object.keys(theme.pages[string[i].page].elements).length;
			elements["Linker"+index] = {type: "button", x: string[i].x, y: string[i].y, scale: 1, page:page, link:linkName,bitmap:BitMap, clicker: {h:0,
                        onClick: function (container) {
					this.checkValue = function(){
						return this;
					};
					var obj = this.checkValue();
					var link=obj.link;
					var page = obj.page;
					
					Theme.openTheme(link, page);
					MC.addTimer(
					Theme.themeCloser,
					10,
					container);
                        }
                    }
                };
			theme.pages[string[i].page].drawable.push({
            type: "custom",
            z: -1,
			font:font,
			text:string[i].text,
			x:MC.unitConvertToPixel(string[i].x),
			y:MC.unitConvertToPixel(string[i].y),
			paint:paint,
            func: function (canvas, scale) {
				canvas.drawText(this.text, this.x, this.y, this.paint);
			},
			custom:{}
		});
		}
	},
	textOrganizer:function(theme, text, font, paint){
		var k = 1.1;
		var letter = text.split(" ");
		var x = theme.x;
		var secondPage = x>=theme.defSecondMinX?true:false;
		var y = theme.y;
		var string = [{text:"", x:theme.x, y:theme.y, page:theme.pages.length-1}];
		var spacing = Font.lineSpacing(font);
		for(var i in letter){
			var index = string.length-1;
			var textLength = MC.pixelConvertToUnit(paint.measureText(letter[i]+" ",0, letter[i].length))*k;
			x+=textLength;
			if(x>=theme.defSecondMaxX&&secondPage||x>=theme.defFirstMaxX&&!secondPage){
				y+=spacing;
				x = secondPage?theme.defSecondMinX:theme.defFirstMinX;
				theme.x = x;
				theme.y = y;
				secondPage = Theme.getNewPage(theme);
				y = theme.y;
				var curX = secondPage?theme.defSecondMinX:theme.defFirstMinX;
				x=textLength+curX;
				string.push({text:"", x:curX, y:y, page:theme.pages.length-1});
			}		
			
			string[string.length-1].text+=letter[i]+" ";
		}
		theme.x =x;
		theme.y = y;
		return string;
	},
	addText:function(name, text, font, addFont){
		var theme = Theme.getThemeByName(name);
		font = font||"DEFAULT";
		font = Font.getFont(font);
		var paint = new android.graphics.Paint();
        paint.setColor(font.color);
        paint.setTextSize(font.size);
		paint.setUnderlineText(font.underline);
		paint.setTypeface(font.typeface);
		var string = this.textOrganizer(theme, text, font, paint);
		
		for(var i in string){
			theme.pages[string[i].page].elements=theme.pages[string[i].page].elements||{};
			theme.pages[string[i].page].drawable.push({
            type: "custom",
            z: -1,
			font:font,
			text:string[i].text,
			x:MC.unitConvertToPixel(string[i].x),
			y:MC.unitConvertToPixel(string[i].y),
			paint:paint,
            func: function (canvas, scale) {
				canvas.drawText(this.text, this.x, this.y, this.paint);
			},
			custom:{}
		});
		}
	}
};
CustomElement = {
	elements:{},
	createCustom:function(name, func){
		this.elements[name]=func;
	},
	addCustom:function(name, argument){
		this.elements[name](argument);
	}
};

CustomElement.createCustom("workbenchRecipe",function(arg){
	var theme = Theme.getThemeByName(arg.theme);
	var inputs = arg.input;
	var result = arg.result;
	var scale = arg.scale||1;
	var x = theme.x;
	var y = theme.y;
	var width = 180*scale;
	var height = 100*scale;
	Theme.newLine(theme, 20);
	Theme.getNewRelativePage(theme, height)?theme.x=theme.defSecondMinX:theme.x=theme.defFirstMinX;
	var x = theme.x>=theme.defSecondMinX?(theme.defSecondMaxX-theme.defSecondMinX)/2-width/2+theme.defSecondMinX:(theme.defFirstMaxX+theme.defFirstMinX)/2-width/2;
	var y = theme.y;
	
	for(var xx =0; xx<3;xx++){
		for(var yy =0; yy<3;yy++){
			var input = inputs[xx]||{};
			input = input[yy]||{};
			if(typeof input == "object"&&!Array.isArray(input)){
				input.id = input.id||0;
				input.data = input.data||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+yy*33*scale, y+xx*33*scale, input.id, 1, input.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof input == "object"&&Array.isArray(input)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x+yy*33*scale, y+xx*33*scale, input, 30*scale,10,"workbenchBookSlot");
			}
		}
	}
	
	if(typeof result == "object"&&!Array.isArray(result)){
				result.id = result.id||0;
				result.data = result.data||0;
				result.count = result.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result.id, result.count, result.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof result == "object"&&Array.isArray(result)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result, 30*scale,10,"workbenchBookSlot");
			}
	theme.pages[theme.pages.length-1].drawable.push({
            type: "custom",
            z: -1,
            custom: {},
			x:x+103*scale,
			y:y+34*scale,
			scale:scale,
			src:"arrayGuide",
            func: function (canvas, scale) {
					var BitMap = new android.graphics.Bitmap.createScaledBitmap(UI.TextureSource.get(this.src), MC.unitConvertToPixel(this.scale*44), MC.unitConvertToPixel(this.scale*32), false);
					canvas.drawBitmap(BitMap,MC.unitConvertToPixel(this.x),MC.unitConvertToPixel(this.y),null);
            }
        });
	theme.x += width;
	theme.y += height;
	Theme.newLine(theme, 30);
});

CustomElement.createCustom("furnaceRecipe",function(arg){
	var theme = Theme.getThemeByName(arg.theme);
	var input = arg.input;
	var result = arg.result;
	var scale = arg.scale||1;
	var temp = arg.temp||20;
	var width = 150*scale;
	var height = 60*scale;
	Theme.newLine(theme, 20);
	Theme.getNewRelativePage(theme, height)?theme.x=theme.defSecondMinX:theme.x=theme.defFirstMinX;
	var x = theme.x>=theme.defSecondMinX?(theme.defSecondMaxX-theme.defSecondMinX)/2-width/2+theme.defSecondMinX:(theme.defFirstMaxX+theme.defFirstMinX)/2-width/2;
	var y = theme.y;
	
	if(typeof input == "object"&&!Array.isArray(input)){
				input.id = input.id||0;
				input.data = input.data||0;
				input.count = input.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input.id, 1, input.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof input == "object"&&Array.isArray(input)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input, 30*scale,10,"workbenchBookSlot");
			}
	
	if(typeof result == "object"&&!Array.isArray(result)){
				result.id = result.id||0;
				result.data = result.data||0;
				result.count = result.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result.id, result.count, result.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof result == "object"&&Array.isArray(result)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result, 30*scale,10,"workbenchBookSlot");
			}
			theme.pages[theme.pages.length-1].drawable.push({
            type: "custom",
            z: -1,
            custom: {},
			x:x+width/2-30/2*scale,
			y:y+height/2-30/2*scale,
			scale:scale,
			src:"fire1",
            func: function (canvas, scale) {
					var BitMap = new android.graphics.Bitmap.createScaledBitmap(UI.TextureSource.get(this.src), MC.unitConvertToPixel(this.scale*30), MC.unitConvertToPixel(this.scale*30), false);
					canvas.drawBitmap(BitMap,MC.unitConvertToPixel(this.x),MC.unitConvertToPixel(this.y),null);
            }
        });
		
		font = "STANDART_TEXT";
		font = Font.getFont(font);
		var paint = new android.graphics.Paint();
        paint.setColor(font.color);
        paint.setTextSize(font.size*scale/1.5);
		paint.setUnderlineText(font.underline);
		paint.setTypeface(font.typeface);
		theme.pages[theme.pages.length-1].drawable.push({
            type: "custom",
            z: -1,
			x:x+width/2-MC.pixelConvertToUnit(paint.measureText(temp+"°C",0, (temp+"°C").length))*scale/3.5,
			y:y+height/1.1,
			paint:paint,
            func: function (canvas, scale) {
				canvas.drawText(temp+"°C", MC.unitConvertToPixel(this.x),MC.unitConvertToPixel(this.y), this.paint);
			},
			custom:{}
		});
	theme.x += width;
	theme.y += height;
	Theme.newLine(theme, 30);
});

CustomElement.createCustom("sawmillRecipe",function(arg){
	var theme = Theme.getThemeByName(arg.theme);
	var input = arg.input;
	var result = arg.result;
	var scale = arg.scale||1;
	var temp = arg.temp||20;
	var width = 150*scale;
	var height = 30*scale;
	Theme.newLine(theme, 20);
	Theme.getNewRelativePage(theme, height)?theme.x=theme.defSecondMinX:theme.x=theme.defFirstMinX;
	var x = theme.x>=theme.defSecondMinX?(theme.defSecondMaxX-theme.defSecondMinX)/2-width/2+theme.defSecondMinX:(theme.defFirstMaxX+theme.defFirstMinX)/2-width/2;
	var y = theme.y;
	
	if(typeof input == "object"&&!Array.isArray(input)){
				input.id = input.id||0;
				input.data = input.data||0;
				input.count = input.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input.id, 1, input.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof input == "object"&&Array.isArray(input)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input, 30*scale,10,"workbenchBookSlot");
			}
	
	if(typeof result == "object"&&!Array.isArray(result)){
				result.id = result.id||0;
				result.data = result.data||0;
				result.count = result.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result.id, result.count, result.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof result == "object"&&Array.isArray(result)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result, 30*scale,10,"workbenchBookSlot");
			}
			
		ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+width/2-50*scale/2, y+height/2-50*scale/2, ItemID.saw, 1, 0, 50*scale);
		
		
	theme.x += width;
	theme.y += height;
	Theme.newLine(theme, 30);
});


CustomElement.createCustom("grinderRecipe",function(arg){
	var theme = Theme.getThemeByName(arg.theme);
	var input = arg.input;
	var result = arg.result;
	var scale = arg.scale||1;
	var width = 150*scale;
	var height = 30*scale;
	Theme.newLine(theme, 20);
	Theme.getNewRelativePage(theme, height)?theme.x=theme.defSecondMinX:theme.x=theme.defFirstMinX;
	var x = theme.x>=theme.defSecondMinX?(theme.defSecondMaxX-theme.defSecondMinX)/2-width/2+theme.defSecondMinX:(theme.defFirstMaxX+theme.defFirstMinX)/2-width/2;
	var y = theme.y;
	
	if(typeof input == "object"&&!Array.isArray(input)){
				input.id = input.id||0;
				input.data = input.data||0;
				input.count = input.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input.id, 1, input.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof input == "object"&&Array.isArray(input)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x, y+height/2-30*scale/2, input, 30*scale,10,"workbenchBookSlot");
			}
	
	if(typeof result == "object"&&!Array.isArray(result)){
				result.id = result.id||0;
				result.data = result.data||0;
				result.count = result.count||0;
				ItemVisual.createViewItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result.id, result.count, result.data, 30*scale,"workbenchBookSlot");
			}
			if(typeof result == "object"&&Array.isArray(result)){
				ItemVisual.createAnimateItem(arg.theme, theme.pages.length-1,x+width-30*scale, y+height/2-30*scale/2, result, 30*scale,10,"workbenchBookSlot");
			}
			theme.pages[theme.pages.length-1].drawable.push({
            type: "custom",
            z: -1,
            custom: {},
			x:x+width/2-15/2*scale,
			y:y+height/2-55/2*scale,
			scale:scale,
			src:stringPath.imagePath.grinderDraw,
            func: function (canvas, scale) {
					var BitMap = new android.graphics.Bitmap.createScaledBitmap(UI.TextureSource.get(this.src), MC.unitConvertToPixel(this.scale*11), MC.unitConvertToPixel(this.scale*45), false);
					canvas.drawBitmap(BitMap,MC.unitConvertToPixel(this.x),MC.unitConvertToPixel(this.y),null);
            }
        });
	theme.x += width;
	theme.y += height;
	Theme.newLine(theme, 30);
});


Theme.createTheme("test");
Theme.createTheme("test2");
CustomElement.addCustom("workbenchRecipe",{
	theme:"test",
	input:[
	[{id:1, data:2},{id:264, data:0}],
	[[{id:266},{id:265}]]
	],
	result:{id:17, count:5},
	scale:1.5
});

TextVisual.addText("test", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Null elementum, Как тебе такое, Илон Маск urna arcu sagittis quam, vitae varius tellus magna sit amet magna. Nam varius orci quis rutrum ultrices. Vestibulum est massa, pharetra quis nisi ut, luctus porttitor turpis. Donec pellentesque consequat enim eu convallis. Sed maximus iaculis mi auctor tortor. Duis cursus diam elementum nisl tincidunt, pharetra tincidunt velit rutrum.","STANDART_TEXT");
//ItemVisual.createViewItem("test", 0,600, 100, 21);
//ItemVisual.createAnimateItem("test", 0,600, 120, [{ id: 17, data: 0 }, { id: 17, data: 1 }, { id: 17, data: 2 }]);
ImageVisual.addImage("test", "images.test");
TextVisual.addTextLink("test", "hello!", "test2",0,{size:40, pathTypeface:"res/fonts/goth.ttf", color:android.graphics.Color.GRAY, underline:true});
CustomElement.addCustom("grinderRecipe",{
	theme:"test",
	input:[{id:17, data:0},{id:17, data:1},{id:17, data:2},{id:17, data:3}],
	result:[{id:5, count:6, data:0},{id:5, count:6, data:1},{id:5, count:6, data:2},{id:5, count:6, data:3}],
	scale:1.5,
	temp:10
});

TextVisual.addText("test", 
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu erat in lacus dictum porta sit amet a dui. Aliquam dictum, odio quis posuere elementum, urna arcu sagittis quam, vitae varius tellus magna sit amet magna. Nam varius orci quis rutrum ultrices. Vestibulum est massa, pharetra quis nisi ut, luctus porttitor turpis. Donec pellentesque consequat enim eu convallis. Sed maximus iaculis mi ut tempus. Nam ac ultrices nibh, quis auctor tortor. Duis cursus diam elementum nisl tincidunt, pharetra tincidunt velit rutrum.","STANDART_TEXT");

TextVisual.addText("test2", 
"Lorem ipsum dolor sit amet, consectetur adip", "STANDART_TEXT");

Callback.addCallback("tick", function() {
	ItemVisual.updateItemAnimation();
});


Callback.addCallback("ItemUse", function(coords, item, block) {
	if(item.id == 265) {
		Theme.openTheme("test");
		
	}
});


var activity = UI.getContext();




// file: Render/plant.js

/*Medieval.Block.add ("testSapling", [{
	name: "tested", inCreative: false,
	texture: [["magical_stone"]]
}], {
	opaque: false,
	renderlayer: 4
});
Medieval.Block.setPlantRender ("testSapling", 0);

Medieval.Plant.addPlantTile ("test", [
	[0, 0, 0, 4], [0, 1, 0, 4]
]);

Medieval.Plant.addTileEntity (BlockID.testSapling, {
	growth: 250,
	type: "tree",
	name: "test"
});

Medieval.Plant.addTreeEntity ([280, BlockID.testSapling]);

Medieval.Plant.addTileEntity (1, {
	growth: 250,
	type: "seed",
	stages: 4
});

Medieval.Plant.addSeedEntity ([264, 1]);*/




// file: Item/tools.js






// file: Item/usable.js





// file: Item/ingredients.js

IDRegistry.genItemID("sawdust");
Item.createItem("sawdust", "Sawdust", {name: "sawdust", meta: 0}, {stack: 64});
Translation.addTranslation("Sawdust", {ru: "Опилки"});




// file: Item/Gear.js

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




// file: Item/Spring.js

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




// file: Item/KineticDrill.js

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




// file: Item/SmallHammer.js

function giveSmallHammer(){
	MC.addAchivement("medievalCraft", "createHammer");
}

IDRegistry.genItemID("smallHammer");
Item.createItem("smallHammer", "Small Hammer", {name: "small_hammer", meta: 0}, {stack: 1});
Translation.addTranslation("Small Hammer", {ru: "Молоток"});

Recipes.addShaped({id: ItemID.smallHammer, count: 1, data: 0}, ["aii", "asa", "aaa"], ["i", 265,-1, "s",280,0],giveSmallHammer);
Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==47){
			World.setBlock(coords.x, coords.y, coords.z,0);
			World.drop(coords.x, coords.y, coords.z, ItemID.guideBook, 0);
	}
});




// file: Item/dusts.js

IDRegistry.genItemID("dustIron");
Item.createItem("dustIron", "Iron Dust", {name: "iron_dust"});
Translation.addTranslation("Iron Dust", {ru: "Пыль камня и железа"});

IDRegistry.genItemID("dustGold");
Item.createItem("dustGold", "Gold Dust", {name: "gold_dust"});
Translation.addTranslation("Gold Dust", {ru: "Пыль камня и золота"});




// file: Block/BlockType.js

var BLOCK_TYPE_WOOD = Block.createSpecialType({
	base: 17,
	opaque: true
});




// file: Block/Mechanism/Shaft.js

IDRegistry.genBlockID("wodenShaft");
Block.createBlock("wodenShaft", [
{name: "Woden Shaft", texture: [["shaft", 0]], inCreative: true}
]);
Recipes.addShaped({id: BlockID.wodenShaft, count: 6, data: 0}, ["pip", "gvg", "pip"], ["p", 5,-1,"g",IDData.item.woodenGear_1x,0, "i", 265,0]);
Block.setBlockShape(BlockID.wodenShaft, {x: 8/16-3/16, y: 8/16-3/16, z: 8/16-3/16}, {x: 8/16+3/16, y: 8/16+3/16, z: 8/16+3/16});
energyKineticEnergy.registerWire(BlockID.wodenShaft);

function setupWireRender(id, width, groupName, preventSelfAdd) {
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup(groupName);
    if (!preventSelfAdd) {
        group.add(id, -1);
    }
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}

setupWireRender(BlockID.wodenShaft, 2/8, "kineticMachine");





// file: Block/Mechanism/WaterWheel.js

var waterWheelLevel=[{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:-1, z:-1, id:[5]},{x:1, y:-1, z:0, id:[5]},{x:1, y:-1, z:1, id:[5]},
{x:1, y:1, z:-1, id:[5]},{x:1, y:1, z:0, id:[5]},{x:1, y:1, z:1, id:[5]},
{x:1, y:0, z:-1, id:[5]},{x:1, y:0, z:1, id:[5]}, 
{x:1, y:2, z:0, id:[17,162]},{x:1, y:-2, z:0, id:[17,162]},{x:1, y:0, z:2, id:[17,162]},{x:1, y:0, z:-2, id:[17,162]}
], Level:1},
{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[17,162]},{x:1, y:2, z:0, id:[17,162]},{x:1, y:-1, z:0, id:[17,162]},{x:1, y:-2, z:0, id:[17,162]},{x:1, y:0, z:1, id:[17,162]},{x:1, y:0, z:2, id:[17,162]},{x:1, y:0, z:-1, id:[17,162]},{x:1, y:0, z:-2, id:[17,162]},
{x:1, y:1, z:1, id:[5]},{x:1, y:1, z:-1, id:[5]},{x:1, y:-1, z:1, id:[5]},{x:1, y:-1, z:-1, id:[5]},
{x:1, y:0, z:3, id:[5]},{x:1, y:-1, z:3, id:[5]},{x:1, y:1, z:3, id:[5]},{x:1, y:0, z:-3, id:[5]},{x:1, y:-1, z:-3, id:[5]},{x:1, y:1, z:-3, id:[5]},
{x:1, y:3, z:0, id:[5]},{x:1, y:3, z:1, id:[5]},{x:1, y:3, z:-1, id:[5]},{x:1, y:-3, z:0, id:[5]},{x:1, y:-3, z:1, id:[5]},{x:1, y:-3, z:-1, id:[5]},
{x:1, y:2, z:2, id:[5]},{x:1, y:-2, z:2, id:[5]},{x:1, y:2, z:-2, id:[5]},{x:1, y:-2, z:-2, id:[5]},
{x:1, y:4, z:-1, id:[17,162]},{x:1, y:4, z:1, id:[17,162]},{x:1, y:-4, z:-1, id:[17,162]},{x:1, y:-4, z:1, id:[17,162]},
{x:1, y:1, z:4, id:[17,162]},{x:1, y:-1, z:4, id:[17, 162]},{x:1, y:1, z:-4, id:[17,162]},{x:1, y:-1, z:-4, id:[17,162]}
],Level:2}];



IDRegistry.genBlockID("waterWheel");
Block.createBlockWithRotation("waterWheel", [
{name: "Water Wheel", texture: [["log_oak", 0],["log_oak", 0],["log_oak_top", 0],["watermill_side", 0],["log_oak", 0],["log_oak",0]], inCreative: true}
]);
Recipes.addShaped({id: BlockID.waterWheel, count: 1, data: 0}, ["ppp", "pop", "ppp"], ["p", 5,-1,"o",351,4]);
ICRender.getGroup("kineticMachine").add(BlockID.waterWheel,-1);
Translation.addTranslation("Water Wheel", {ru: "Водяное Колесо"});
var getRainLevel = ModAPI.requireGlobal("Level.getRainLevel");
TileEntity.registerPrototype(BlockID.waterWheel, {
defaultValues:{
	wheelLevel:0,
	count:0,
	orientation:0,
	waterCount:0,
	biome:0,
	modificator:1
},
isGenerator: function() {
return true;
},
tick: function(){
	if(World.getWorldTime()%20==0){
		this.data.modificator=getRainLevel()/4+1; 
	}
	
	if(World.getWorldTime()%80==0){
		if(this.data.wheelLevel==1){
		this.data.waterCount=0;
		for(var c =-1; c<2; c++){
			if(this.data.orientation==0){
				if(World.getBlock(this.x+1, this.y-2, this.z+c).id==8||World.getBlock(this.x+1, this.y-2, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==1){
				if(World.getBlock(this.x+c, this.y-2, this.z+1).id==8||World.getBlock(this.x+c, this.y-2, this.z+1).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==2){
				if(World.getBlock(this.x-1, this.y-2, this.z+c).id==8||World.getBlock(this.x-1, this.y-2, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==3){
				if(World.getBlock(this.x+c, this.y-2, this.z-1).id==8||World.getBlock(this.x+c, this.y-2, this.z-1).id==9){
					this.data.waterCount++;
				}
			}
		}
	}
	
	if(this.data.wheelLevel==2){
		this.data.waterCount=0;
		for(var y=0; y>-2; y--){
		for(var c =-2; c<3; c++){
			if(this.data.orientation==0){
				if(World.getBlock(this.x+1, this.y-3+y, this.z+c).id==8||World.getBlock(this.x+1, this.y-3+y, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==1){
				if(World.getBlock(this.x+c, this.y-3+y, this.z+1).id==8||World.getBlock(this.x+c, this.y-3+y, this.z+1).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==2){
				if(World.getBlock(this.x-1, this.y-3+y, this.z+c).id==8||World.getBlock(this.x-1, this.y-3+y, this.z+c).id==9){
					this.data.waterCount++;
				}
			}
			if(this.data.orientation==3){
				if(World.getBlock(this.x+c, this.y-3+y, this.z-1).id==8||World.getBlock(this.x+c, this.y-3+y, this.z-1).id==9){
					this.data.waterCount++;
				}
			}
		}
	}
	}
	}
},
energyTick: function(type, src) {
	if(this.data.waterCount&&this.data.wheelLevel==1){
		var energy = Math.abs(Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*this.data.waterCount));
		if(this.data.biome==0||this.data.biome==24||this.data.biome==16){
		src.add(Math.abs(energy));
		}
		if(this.data.biome==7){
		src.add(Math.round(0.4*this.data.waterCount*this.data.modificator));
		}
	}
	if(this.data.waterCount>=4&&this.data.wheelLevel==2){
		var energy = Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*this.data.waterCount*1.5);
		if(this.data.biome==0||this.data.biome==24||this.data.biome==16){
		src.add(Math.abs(energy));
		}
		if(this.data.biome==7){
		src.add(Math.round(0.4*this.data.waterCount*this.data.modificator*1.5));
		}
	}
},
});
//TODO пофикситть работу колеса в океане
EnergyTileRegistry.addEnergyTypeForId(BlockID.waterWheel, energyKineticEnergy);

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.waterWheel){
		if(World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel){
			var data = World.getTileEntity(coords.x, coords.y, coords.z).data;
			if(data.biome!=0&&data.biome!=7&&data.biome!=16&&data.biome!=24){
				Game.message("Течение слишком слабое для работы колеса");
			}else
			if(data.biome==7){
				Game.message("Текущая выработка энергии "+Math.round(0.4*data.waterCount*data.modificator)+"Кэ");
			}else{
				Game.message("Текущая выработка энергии "+Math.abs(Math.round(Math.sin((World.getWorldTime()%24000+6000)/4000)*data.waterCount))+"Кэ");
			}
		}else{
		var wheel =multiBlock.getLevel(coords.x, coords.y, coords.z, waterWheelLevel);
			World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel=wheel.Level;
			World.getTileEntity(coords.x, coords.y, coords.z).data.count++;
			World.getTileEntity(coords.x, coords.y, coords.z).data.orientation=wheel.orientation;
			World.getTileEntity(coords.x, coords.y, coords.z).data.biome= World.getBiome(coords.x, coords.z);
			if(wheel.Level)Game.message("Колесо построено, следите за ним");	
			}
	}
});




// file: Block/Mechanism/Mill.js

var wodenMillLevel=[{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[5]},{x:1, y:-1, z:0, id:[5]},{x:1, y:0, z:1, id:[5]},{x:1, y:0, z:-1, id:[5]},
{x:1, y:2, z:0, id:[85]},{x:1, y:3, z:0, id:[85]},{x:1, y:4, z:0, id:[85]},
{x:1, y:-2, z:0, id:[85]},{x:1, y:-3, z:0, id:[85]},{x:1, y:-4, z:0, id:[85]},
{x:1, y:0, z:2, id:[85]},{x:1, y:0, z:3, id:[85]},{x:1, y:0, z:4, id:[85]},
{x:1, y:0, z:-2, id:[85]},{x:1, y:0, z:-3, id:[85]},{x:1, y:0, z:-4, id:[85]}
], 
Level:1},
{Block:[
{x:1, y:0, z:0, id:[17,162]},{x:1, y:1, z:0, id:[17,162]},{x:1, y:-1, z:0, id:[17,162]},{x:1, y:0, z:1, id:[17,162]},{x:1, y:0, z:-1, id:[17,162]},
{x:1, y:2, z:0, id:[85]},{x:1, y:3, z:0, id:[85]},{x:1, y:4, z:0, id:[85]},
{x:1, y:-2, z:0, id:[85]},{x:1, y:-3, z:0, id:[85]},{x:1, y:-4, z:0, id:[85]},
{x:1, y:0, z:2, id:[85]},{x:1, y:0, z:3, id:[85]},{x:1, y:0, z:4, id:[85]},
{x:1, y:0, z:-2, id:[85]},{x:1, y:0, z:-3, id:[85]},{x:1, y:0, z:-4, id:[85]},

{x:1, y:2, z:1, id:[85]},{x:1, y:3, z:1, id:[85]},{x:1, y:4, z:1, id:[85]},{x:1, y:1, z:1, id:[85]},
{x:1, y:2, z:-1, id:[85]},{x:1, y:3, z:-1, id:[85]},{x:1, y:4, z:-1, id:[85]},{x:1, y:1, z:-1, id:[85]},
{x:1, y:-2, z:1, id:[85]},{x:1, y:-3, z:1, id:[85]},{x:1, y:-4, z:1, id:[85]},{x:1, y:-1, z:1, id:[85]},
{x:1, y:-2, z:-1, id:[85]},{x:1, y:-3, z:-1, id:[85]},{x:1, y:-4, z:-1, id:[85]},{x:1, y:-1, z:-1, id:[85]},
{x:1, y:1, z:2, id:[85]},{x:1, y:1, z:3, id:[85]},{x:1, y:1, z:4, id:[85]},{x:1, y:1, z:1, id:[85]},
{x:1, y:-1, z:2, id:[85]},{x:1, y:-1, z:3, id:[85]},{x:1, y:-1, z:4, id:[85]},{x:1, y:-1, z:1, id:[85]},
{x:1, y:1, z:-2, id:[85]},{x:1, y:1, z:-3, id:[85]},{x:1, y:1, z:-4, id:[85]},{x:1, y:1, z:-1, id:[85]},
{x:1, y:-1, z:-2, id:[85]},{x:1, y:-1, z:-3, id:[85]},{x:1, y:-1, z:-4, id:[85]},{x:1, y:-1, z:-1, id:[85]}
], 
Level:2},
];
var windSpeed = 10;
var windMap=[
{id:0, modifier:0.7},
{id:1, modifier:0.6},
{id:2, modifier:0.7},
{id:3, modifier:0.9},
{id:4, modifier:0.4},
{id:5, modifier:0.7},
{id:6, modifier:0.3},
{id:7, modifier:0.5},
{id:8, modifier:0},
{id:9, modifier:0},
{id:10, modifier:0.8},
{id:11, modifier:0.6},
{id:12, modifier:0.7},
{id:13, modifier:0.9},
{id:14, modifier:0.5},
{id:15, modifier:0.6},
{id:16, modifier:0.5},
{id:17, modifier:0.8},
{id:18, modifier:0.4},
{id:19, modifier:0.6},
{id:20, modifier:0.8},
{id:21, modifier:0.3},
{id:22, modifier:0.2},
{id:23, modifier:0.4},
{id:24, modifier:0.8},
{id:25, modifier:0.9},
{id:26, modifier:0.6},
{id:27, modifier:0.4},
{id:28, modifier:0.3},
{id:29, modifier:0.1},
{id:30, modifier:0.9},
{id:31, modifier:0.8},
{id:32, modifier:0.8},
{id:33, modifier:0.7},
{id:34, modifier:1},
{id:35, modifier:0.6},
{id:36, modifier:0.7},
{id:37, modifier:0.6},
{id:38, modifier:0.8},
{id:39, modifier:0.8}
];

IDRegistry.genBlockID("woodenMill");
Block.createBlockWithRotation("woodenMill", [
{name: "Mill", texture: [["log_oak", 0],["log_oak", 0],["log_oak_top", 0],["mill_side", 1],["log_oak", 0],["log_oak", 0]], inCreative: true}
]);
Recipes.addShaped({id: BlockID.woodenMill, count: 1, data: 0}, ["ppp", "pop", "ppp"], ["p", 5,-1,"o",288,0]);
ICRender.getGroup("kineticMachine").add(BlockID.woodenMill,-1);
Translation.addTranslation("Mill", {ru: "Мельница"});
var getRainLevel = ModAPI.requireGlobal("Level.getRainLevel");

TileEntity.registerPrototype(BlockID.woodenMill, {
defaultValues:{
	wheelLevel:0,
	orientation:0,
	biome:0,
	modificator:1,
	airCount:0
},
isGenerator: function() {
return true;
},
tick: function(){
	if(World.getWorldTime()%20==0){
		this.data.modificator=getRainLevel()/4; 
	}
	
if(World.getWorldTime()%80==0){
		if(this.data.wheelLevel==1||this.data.wheelLevel==2){
		this.data.airCount=0;
		for(var len =-5; len<11; len++){
			for(var y =-4; y<5; y++){
				for(var c =-4; c<5; c++){
			if(this.data.orientation==0){
				if(World.getBlock(this.x+1+len, this.y+y, this.z+c).id==0){
					this.data.airCount++;
				}
			}
			if(this.data.orientation==1){
				if(World.getBlock(this.x+c, this.y+y, this.z+1+len).id==0){
					this.data.airCount++;
				}
			}
			if(this.data.orientation==2){
				if(World.getBlock(this.x-len, this.y+y, this.z+c).id==0){
					this.data.airCount++;
				}
			}
			if(this.data.orientation==3){
				if(World.getBlock(this.x+c, this.y+y, this.z-len).id==0){
					this.data.airCount++;
				}
			}
		}
	}
	}
	}
	}
	if(World.getWorldTime()%100==0&&windSpeed>35){
		this.data.wheelLevel=0;
	}
},
energyTick: function(type, src) {
	var energy = Math.min(this.data.airCount/1000*windMap[this.data.biome].modifier,1);
	if(this.data.wheelLevel==1&&windSpeed>2){
		src.add(Math.min(5,Math.round(energy*Math.min(10,windSpeed)/2)));
	}
	if(this.data.wheelLevel==2&&windSpeed>4){
		src.add(Math.min(30,Math.round(energy*Math.min(10,windSpeed)*2)));
		
	}
},
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.woodenMill, energyKineticEnergy);

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.woodenMill){
		if(!World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel){
		var wheel =multiBlock.getLevel(coords.x, coords.y, coords.z, wodenMillLevel);
			World.getTileEntity(coords.x, coords.y, coords.z).data.wheelLevel=wheel.Level;
			World.getTileEntity(coords.x, coords.y, coords.z).data.orientation=wheel.orientation;
			World.getTileEntity(coords.x, coords.y, coords.z).data.biome= World.getBiome(coords.x, coords.z);
			if(wheel.Level)Game.message("Мельница построена, следите за ней");
			if(!wheel.Level)Game.message("Мельница построена не правильно");
			}else{
				var data = World.getTileEntity(coords.x, coords.y, coords.z).data;
				if(windSpeed>data.wheelLevel*2){
				var energy = Math.min(data.airCount/1000*windMap[data.biome].modifier,1);
				if(data.wheelLevel==1){
					Game.message("Текущая выработка "+ Math.min(5,Math.round(energy*Math.min(10,windSpeed)/2))+"Кэ/тик");
				}else if(data.wheelLevel==2){
					Game.message("Текущая выработка "+ Math.min(30,Math.round(energy*Math.min(10,windSpeed)*2))+"Кэ/тик");
				}
				}else{
					Game.message("Ветер слишком слаб, чтобы крутить мельницу, необходимо больше, чем"+2*data.wheelLevel+"м/с , сейчас "+Math.round(windSpeed)+"м/с");
				}
			}
	}
});
var ko = Math.random()*100;
Callback.addCallback("tick",function(){
	if(World.getWorldTime()%500==0){
		ko = Math.random()*100;
	}
	if(World.getWorldTime()%20==0){
		windSpeed=Math.abs(25*Math.sin((World.getWorldTime()%24000+6000)/(3950+ko))+getRainLevel()*(5+Math.random()*2));
	}
});




// file: Block/Mechanism/Flywheel.js

var renderStick = new Render();
    var partObj = [{
            type: "box",
            coords: {
                x: 0,
                y: 0,
                z: 0
            },
            size: {
                x: 2,
                y: 10,
                z: 2
            },
            uv: {
                x: 0,
                y: 16
            }
        }
    ];
	//renderStick.addPart("body.rotPart");
renderStick.setPart(/*render.getPart("body.rotPart")*/"body", partObj, {});

IDRegistry.genBlockID("flywheel");
Block.createBlock("flywheel", [
{name: "Flywheel", texture: [["log_oak_top", 0],["log_oak_top", 0],["log_oak", 0]], inCreative: false}
]);

IDRegistry.genItemID("flywheel");
Item.createItem("flywheel", "Flywheel", {name: "flywheel", meta: 0}, {stack: 64});
Translation.addTranslation("Flywheel", {ru: "Маховик"});
MC.replaceBlock(ItemID.flywheel, BlockID.flywheel);
Recipes.addShaped({id: ItemID.flywheel, count: 1, data: 0}, ["vvv", "psp", "ppp"], ["p", 5,-1,"s", 280, -1]);

ICRender.getGroup("kineticMachine").add(BlockID.flywheel,-1);
Translation.addTranslation("Flywheel", {ru: "Маховик"});

var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.flywheel, 0, render);
var model = BlockRenderer.createModel();
model.addBox(.1, .05, .1, .15, .6, .9,17,0);
model.addBox(.15, .05, .1, .85, .6, .15,17,0);
model.addBox(.85, .05, .1, .9, .6, .9,17,0);
model.addBox(.15, .05, .85, .85, .6, .9,17,0);
model.addBox(.1, 0, .1, .9, .05, .9,17,0);
render.addEntry(model);

TileEntity.registerPrototype(BlockID.flywheel, {
defaultValues:{
	energy:0,
	id:0,
	data:0,
	rotation:0
},
destroy: function(){
	this.ani.destroy();
	if(this.data.id){
			World.drop(this.x, this.y+1, this.z, this.data.id, 1, this.data.data);
			this.data.id = 0;
			this.animation.destroy();
		}
},
energyTick: function(type, src) {
	var k = Medieval.Item.getGearSpeed(this.data.id);
		if(World.getThreadTime()%200==0&&this.data.energy){
				this.data.data++;
				if(this.data.data>=Medieval.Item.getGearMaxDamage(this.data.id)){
					this.data.id=0;
					this.animation.destroy();
				}
			}
		if(k){
			this.data.energy += src.storage(Math.min(10*k, 1000*k - this.data.energy), Math.min(10*k, this.data.energy));
			this.data.rotation+=Math.round(this.data.energy/(1000*k)*12);
			this.data.rotation%=360;
			this.init_animation();
		}
		if(!k)this.data.energy=0;
},
init_animation: function(){
		if(this.data.id){
			this.animation.describeItem({
			id: this.data.id,
			data: this.data.data,
			size: 1,
			count:1,
			rotation:[Math.PI/2,this.data.rotation/360*2*Math.PI,0]
		});
		this.animation.load();
		}
	},
init: function(){
	this.animation =new Animation.Item(this.x + .5, this.y + 11/16, this.z + .5);
	this.init_animation();
	this.ani = new Animation.Base(this.x+.5, this.y-1.1, this.z+.5);
		this.ani.describe({
			render: renderStick.getId(),
			skin: "mob/flyWheel_oak.png"
		});
	this.ani.load();
},
click:function(){
	if(Medieval.Item.getGearSpeed(Player.getCarriedItem().id)&&!this.data.id){
		this.data.id = Player.getCarriedItem().id;
		this.data.data = Player.getCarriedItem().data;
		this.init_animation();
		Player.decreaseCarriedItem(1);
	}
	if(MC.playerGetSneaking()&&!MC.isSpring(Player.getCarriedItem().id)){
		if(this.data.id){
			World.drop(this.x, this.y+1, this.z, this.data.id, 1, this.data.data);
			this.data.id = 0;
			this.animation.destroy();
		}
	}
}
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.flywheel, energyKineticEnergy);

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.flywheel){
		if(World.getTileEntity(coords.x, coords.y, coords.z).data.id){
			Game.message("Накоплено "+ World.getTileEntity(coords.x, coords.y, coords.z).data.energy+"Кэ из "+Medieval.Item.getGearSpeed(World.getTileEntity(coords.x, coords.y, coords.z).data.id)*1000+"Кэ");
			Game.message("Состояние шестерёнки: "+(100-Math.floor(100*World.getTileEntity(coords.x, coords.y, coords.z).data.data/Medieval.Item.getGearMaxDamage(World.getTileEntity(coords.x, coords.y, coords.z).data.id)))+"%");
		}else{
			Game.message("Энергии нет");
		}
	}
	if(block.id==BlockID.flywheel&&MC.isSpring(item.id)){
		if(!MC.playerGetSneaking()){
		var energy = Math.min(World.getTileEntity(coords.x, coords.y, coords.z).data.energy,item.data);
		Game.message("Текущая энергия в пружине "+((MC.getSpringCapacity(item.id)-item.data)+energy)+"Кэ");
		World.getTileEntity(coords.x, coords.y, coords.z).data.energy-=energy;
		Player.setCarriedItem(item.id, item.count, item.data-energy);
		}else{
			var energy = Math.min(Medieval.Item.getGearSpeed(World.getTileEntity(coords.x, coords.y, coords.z).data.id)*1000-World.getTileEntity(coords.x, coords.y, coords.z).data.energy, Math.round(Math.abs(item.data-MC.getSpringCapacity(item.id))/10));
		World.getTileEntity(coords.x, coords.y, coords.z).data.energy+=energy;
		Player.setCarriedItem(item.id, item.count, item.data+energy*10);
		Game.message("Текущая энергия в пружине "+((MC.getSpringCapacity(item.id)-item.data)-energy)+"Кэ");
		}
	}
});




// file: Block/Mechanism/StoneFurnace.js

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




// file: Block/Mechanism/Reduser.js

IDRegistry.genBlockID("reduser");
Block.createBlock("reduser", [
{name: "Reduser", texture: [["planks", 0]], inCreative: false}
],energyKineticEnergy.getWireSpecialType());
Translation.addTranslation("Reduser", {ru: "Редуктор"});

var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.reduser, 0, render);
var model = BlockRenderer.createModel();
model.addBox(0, 0, 0, 1, 1, 1,5,0);
model.addBox(5/16, 1, 5/16, 11/16, 1.3, 6/16,5,0);
model.addBox(5/16, 1, 10/16, 11/16, 1.3, 11/16,5,0);
model.addBox(5/16, 1, 6/16, 6/16, 1.3, 10/16,5,0);
model.addBox(10/16, 1, 6/16, 11/16, 1.3, 10/16,5,0);
render.addEntry(model);
IDRegistry.genItemID("reduser");
Item.createItem("reduser", "Reduser", {name: "reduser", meta: 0}, {stack: 64});
Translation.addTranslation("Reduser", {ru: "Редуктор"});
MC.replaceBlock(ItemID.reduser, BlockID.reduser);
Recipes.addShaped({id: ItemID.reduser, count: 1, data: 0}, ["ppp", "gpg", "ppp"], ["p", 5,-1,"g", IDData.item.woodenGear_1x, -1]);




// file: Block/Mechanism/HandGrinder.js

var grinderConstruction=[{Block:[
{x:0, y:1, z:-1, id:[85]},{x:0, y:2, z:-1, id:[85]},{x:0, y:3, z:-1, id:[85]},{x:0, y:4, z:-1, id:[85]},
{x:0, y:1, z:1, id:[85]},{x:0, y:2, z:1, id:[85]},{x:0, y:3, z:1, id:[85]},{x:0, y:4, z:1, id:[85]},
{x:0, y:4, z:0, id:[85]},{x:0, y:3, z:0, id:[BlockID.crasherIron]},{x:0, y:0, z:-1, id:[BlockID.reduser]},{x:0, y:0, z:1, id:[BlockID.reduser]},
{x:0, y:1, z:0, id:[0]},{x:0, y:2, z:0, id:[0]}], Level:1},
{Block:[
{x:0, y:1, z:-1, id:[85]},{x:0, y:2, z:-1, id:[85]},{x:0, y:3, z:-1, id:[85]},{x:0, y:4, z:-1, id:[85]},
{x:0, y:1, z:1, id:[85]},{x:0, y:2, z:1, id:[85]},{x:0, y:3, z:1, id:[85]},{x:0, y:4, z:1, id:[85]},
{x:0, y:4, z:0, id:[85]},{x:0, y:3, z:0, id:[0]},{x:0, y:0, z:-1, id:[BlockID.reduser]},{x:0, y:0, z:1, id:[BlockID.reduser]},
{x:0, y:1, z:0, id:[0]},{x:0, y:2, z:0, id:[0]}],Level:2}];

IDRegistry.genBlockID("grinderTable");
Block.createBlock("grinderTable", [
{name: "Grinder Table", texture: [["iron_block", 0],["iron_block", 0],["iron_block", 0]], inCreative: false}
]);
IDRegistry.genItemID("grinderTable");
Item.createItem("grinderTable", "Grinder Table", {name: "grinder_table", meta: 0}, {stack: 64});
MC.replaceBlock(ItemID.grinderTable, BlockID.grinderTable);
Recipes.addShaped({id: ItemID.grinderTable, count: 1, data: 0}, ["vvv", "ivi", "bib"], ["i", 265, -1, "b", 42, -1]);
Translation.addTranslation("Grinder Table", {ru: "Дробильный Столик"});
ICRender.getGroup("kineticMachine").add(BlockID.grinderTable,-1);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.grinderTable, 0, render);
var model = BlockRenderer.createModel();
  model.addBox(.1, 15/16, .1, .15, 1, .9,42,0);
  model.addBox(.15, 15/16, .1, .85, 1, .15,42,0);
  model.addBox(.85, 15/16, .1, .9, 1, .9,42,0);
  model.addBox(.15, 15/16, .85, .85, 1, .9,42,0);
  model.addBox(.1, 0, .1, .9, 15/16, .9,42,0);
  render.addEntry(model);
IDRegistry.genBlockID("crasherIron");
Block.createBlock("crasherIron", [
{name: "Crasher", texture: [["iron_block", 0],["iron_block", 0],["iron_block", 0]], inCreative: false}
]);
IDRegistry.genItemID("crasherIron");
Item.createItem("crasherIron", "Crasher", {name: "press", meta: 0}, {stack: 64});
Translation.addTranslation("Crasher", {ru: "Железная плита для дробилки"});
MC.replaceBlock(ItemID.crasherIron, BlockID.crasherIron);
Recipes.addShaped({id: ItemID.crasherIron, count: 1, data: 0}, ["vzv", "vzv", "ibi"], ["z", 85,-1,"i", 265, -1, "b", 42, -1]);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.crasherIron, 0, render);
var model = BlockRenderer.createModel();
model.addBox(6.5/16,  0, 6.5/16, 9.5/16, 1, 9.5/16,5, 0);
model.addBox(6.5/16, -1, 6.5/16, 9.5/16, 0, 9.5/16,5,0);
model.addBox(6.5/16, -1.5, 6.5/16, 9.5/16, -1, 9.5/16,5,0);
model.addBox(0.1+1/16, -1.8, 0.1+1/16, 0.9-1/16, -1.5, 0.9-1/16,42,0);
render.addEntry(model);


MC.addHandGrinderRecipe({id:15,data:0}, {id:ItemID.dustIron, data:0, count:2});
MC.addHandGrinderRecipe({id:14,data:0}, {id:ItemID.dustGold, data:0, count:2});
MC.addHandGrinderRecipe({id:1,data:0}, {id:4, data:0, count:1});
MC.addHandGrinderRecipe({id:4,data:0}, {id:13, data:0, count:1});
MC.addHandGrinderRecipe({id:98,data:0}, {id:98, data:2, count:1});
MC.addHandGrinderRecipe({id:98,data:2}, {id:4, data:0, count:1});
MC.addHandGrinderRecipe({id:22,data:0}, {id:351, data:4, count:9});
MC.addHandGrinderRecipe({id:24,data:2}, {id:24, data:0, count:1});
MC.addHandGrinderRecipe({id:24,data:0}, {id:12, data:0, count:2});
MC.addHandGrinderRecipe({id:352,data:0}, {id:351, data:15, count:2});
MC.addHandGrinderRecipe({id:89,data:0}, {id:348, data:0, count:4});

MC.addHandGrinderRecipe({id:BlockID.oreCopper,data:0}, {id:ItemID.dustCopper, data:0, count:2});
MC.addHandGrinderRecipe({id:BlockID.oreTin,data:0}, {id:ItemID.dustTin, data:0, count:2});
MC.addHandGrinderRecipe({id:BlockID.oreLead,data:0}, {id:ItemID.dustLead, data:0, count:2});

var crusherRender = new Render();
    var partObj = [{type: "box", coords: {x: 0, y: 28+8, z: 0}, size: {x: 11, y: 5, z: 11},uv: {x: 0,y: 0}},
		{type: "box",coords: {x: 0,y: -6,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 10,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 26,z: 0},size: {x: 3, y: 16, z: 3},uv: {x: 48,y: 16}},
		{type: "box",coords: {x: 0,y: 35,z: 0},size: {x: 3, y: 2, z: 3},uv: {x: 48,y: 16}}
    ];

    crusherRender.setPart("head", partObj, {});
	
var grinderGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Grinder"
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
	{type: "bitmap", x: 585, y: 265, bitmap: "grinder_bar_background", scale: 5}
	],
    
	elements: {
		"GrinderSlotInput": {type: "slot", x: 445, y: 250, size: 100},
        "GrinderSlotOutput": {type: "slot", x: 735, y: 250, size: 100},
		"GrinderSlotModified": {type: "slot", x: 850, y: 50, size: 100, bitmap:"gear_slot_1"},
        "Progress": {type: "scale", x: 585, y: 265, direction: 0, scale: 5, bitmap: "grinder_bar_scale"},
		"multiBlockCheck":{type: "image", x: 840, y: 500, bitmap: "multiblock_0", scale: 2},
		 "grinder":{type: "scale", x: 600, y: 0, direction: 3, bitmap: "grinder_0", scale: 6, invert: true}
			}
		
});
TileEntity.registerPrototype(BlockID.grinderTable, {
defaultValues:{
	id:0,
	data:0,
	recipe:null,
	progres:0,
	maxProgres:0,
	construction:0,
	checkAnimation:false
},
tick: function(){
	if(World.getThreadTime()%5==0&&this.data.construction==2){
		this.checkItemAnimation();
	}
	if(World.getThreadTime()%40==0&&this.data.construction==2){
		this.data.construction=multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level;
		if(this.data.construction!=2){
			this.animation.destroy();
			this.animationCrasher.destroy();
			this.data.checkAnimation =false;
			World.setBlock(this.x, this.y+3, this.z, BlockID.crasherIron);
		}
	}
	if(this.data.construction==1&&multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level==2){
		this.data.construction=multiBlock.getLevel(this.x, this.y, this.z, grinderConstruction).Level;
		this.animation =new Animation.Item(this.x + .5, this.y + 1.15, this.z + .5);
		this.animationCrasher = new Animation.Base(this.x+.5, this.y+2.05-.3, this.z+.5);
		this.animationCrasher.describe({
			render: crusherRender.getId(),
			skin: "mob/grinder_0.png",
		});
		this.animationCrasher.load();
	}
},
energyReceive: function(type, src) {
	var content = this.container.getGuiContent();
	if(this.data.construction==2){
	
	if(this.data.progres&&this.data.speed&&this.data.power){
		this.animationCrasher.setPos(this.x+.5, this.y+Math.abs(Math.sin(this.data.progres/this.data.maxProgres*20)*Math.PI*2)/10+1.75, this.z+.5);
	}
	
	
	if(content&&!this.data.progres){
		this.container.setScale("Progress",0);
		this.container.setScale("grinder",0.8);
	}
	if(content&&this.data.progres&&this.data.speed&&this.data.power){
		this.container.setScale("grinder",0.8+Math.abs(Math.sin((World.getWorldTime()%240)/20))/5);
		this.container.setScale("Progress",Math.floor(22*(1-this.data.progres/this.data.maxProgres))/22);
	}
	var recipe = MC.getHandGrinderRecipe(this.container.getSlot("GrinderSlotInput").id,this.container.getSlot("GrinderSlotInput").data);
	if(recipe&&World.getThreadTime()%5==0){
		this.data.speed=0;
		this.data.power=0;
		for(var i in gear){
			if(this.container.getSlot("GrinderSlotModified").id==gear[i].id){
				this.data.speed=gear[i].speed;
				this.data.power=gear[i].power;
			}
		}
	}
	if(recipe&&!this.data.recipe&&this.data.progres==0){
		if(this.container.getSlot("GrinderSlotOutput").count+recipe.result.count<=64){
			if(this.container.getSlot("GrinderSlotOutput").id==recipe.result.id&&this.container.getSlot("GrinderSlotOutput").data==recipe.result.data||this.container.getSlot("GrinderSlotOutput").id==0){
			this.data.recipe=recipe;
		this.data.progres=200;
		this.data.maxProgres=200;
		}
		}
	}
	if(this.data.recipe){
		if(this.container.getSlot("GrinderSlotInput").id!=this.data.recipe.input.id||this.container.getSlot("GrinderSlotOutput").count+this.data.recipe.result.count>64||this.container.getSlot("GrinderSlotOutput").id!=this.data.recipe.result.id&&this.container.getSlot("GrinderSlotOutput").id!=0||this.container.getSlot("GrinderSlotOutput").data!=this.data.recipe.result.data){
			this.data.progres=0;
			this.data.maxProgres=0;
			this.data.recipe=0;
		}
	}
	if(this.data.recipe&&recipe&&this.data.progres&&this.data.speed&&this.data.power&&src.amount()>=4*this.data.power){
		this.data.progres= Math.max(-1*this.data.speed+this.data.progres,0);
		src.get(4*this.data.power);
	}
	if(recipe&&this.data.recipe&&!this.data.progres){
		this.container.getSlot("GrinderSlotOutput").id=recipe.result.id;
		this.container.getSlot("GrinderSlotOutput").data=recipe.result.data;
		this.container.getSlot("GrinderSlotOutput").count+=recipe.result.count;
		this.container.getSlot("GrinderSlotInput").count--;
		this.container.getSlot("GrinderSlotModified").data++;
		for(var i in gear){
			if(this.container.getSlot("GrinderSlotModified").id==gear[i].id&&gear[i].damage-1==this.container.getSlot("GrinderSlotModified").data){
				this.container.getSlot("GrinderSlotModified").count--;
				this.container.getSlot("GrinderSlotModified").data=0;
			}
		}
		this.data.recipe=null;
		this.data.maxProgres=0;
		this.container.validateAll();
	}
	}
},
checkItemAnimation:function(){
	if(this.data.construction==2&&this.data.recipe&&!this.data.checkAnimation){
		this.data.checkAnimation =true;
		this.animation.describeItem({
			id: this.container.getSlot("GrinderSlotInput").id,
			data: this.container.getSlot("GrinderSlotInput").data,
			size: 4/16,
			count:1
		});
		this.animation.load();
	}
	if(this.data.construction==2&&!this.data.recipe&&this.data.checkAnimation){
		this.data.checkAnimation =false;
		this.animation.destroy();
	}
},
init: function(){
	this.data.checkAnimation =false;
	if(this.data.construction==2){
	this.animation =new Animation.Item(this.x + .5, this.y + 1, this.z + .5);
		this.animationCrasher = new Animation.Base(this.x+.5, this.y+2.05-.3, this.z+.5);
		this.animationCrasher.describe({
			render: crusherRender.getId(),
			skin: "mob/grinder_0.png",
		});
		this.animationCrasher.load();
		}
},
//TODO пофиксить текстуру гриндилки
click: function(){
	if(!MC.playerGetSneaking(Player.get())&&this.data.construction==2){
		this.container.openAs(this.getGuiScreen());
	}
	return true;
},
destroy: function(){
	if(this.animation&&this.container.getSlot("GrinderSlotInput").id!=0){
		this.animation.destroy();
	}
	if(this.animationCrasher){
		this.animationCrasher.destroy();
	}
},
getGuiScreen: function(){
	return grinderGui;
}
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.grinderTable, energyKineticEnergy);
Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.smallHammer&&block.id==BlockID.grinderTable&&multiBlock.getLevel(coords.x, coords.y, coords.z, grinderConstruction).Level==1){
			World.getTileEntity(coords.x, coords.y, coords.z).data.construction=multiBlock.getLevel(coords.x, coords.y, coords.z, grinderConstruction).Level;
			World.setBlock(coords.x, coords.y+3, coords.z,0);
			MC.addAchivement("medievalCraft","createHandgrinder");
	}
});




// file: Block/Mechanism/Barrel.js

IDRegistry.genBlockID("barrel");
Block.createBlock("barrel", [
	{name: "Wooden barrel", texture: [["barrel_top", 0], ["barrel_top", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0], ["barrel_side", 0]], inCreative: false}
]);
IDRegistry.genItemID("barrel");
Item.createItem("barrel", "Wooden barrel", {name: "barrel", meta: 0}, {stack: 64});
MC.replaceBlock(ItemID.barrel, BlockID.barrel);
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

Recipes.addShaped({id: ItemID.barrel, count: 1, data: 0}, ["pap", "gug", "pgp"], ["g", 5,-1,"p", 265, -1, "a", 17, -1, "u", 102, -1]);
Recipes.addShaped({id: ItemID.barrel, count: 1, data: 0}, ["pap", "gug", "pgp"], ["g", 5,-1,"p", 265, -1, "a", 162, -1, "u", 102, -1]);




// file: Block/Mechanism/multiblockBarrel.js

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




// file: Block/Mechanism/Sawmill.js

IDRegistry.genBlockID("sawmill");
Block.createBlock("sawmill", [
{name: "Sawmill", texture: [["cobblestone", 0]], inCreative: false}
]);
IDRegistry.genItemID("sawmill");
Item.createItem("sawmill", "Sawmill", {name: "sawmill", meta: 0}, {stack: 64});
MC.replaceBlock(ItemID.sawmill, BlockID.sawmill);
Translation.addTranslation("Sawmill", {ru: "Лесопилка"});
ICRender.getGroup("kineticMachine").add(BlockID.sawmill,-1);
IDRegistry.genItemID("saw");
function giveSawmill(){
	MC.addAchivement("medievalCraft", "createSawmill");
}
Item.createItem("saw", "Saw", {name: "saw", meta: 0}, {stack: 64});
Translation.addTranslation("Saw", {ru: "Пила"});
Recipes.addShaped({id: IDData.item.saw, count: 1, data: 0}, ["aia", "aia", "aia"], ["i", 265,-1]);
Recipes.addShaped({id: ItemID.sawmill, count: 1, data: 0}, ["sss", "cac", "cac"], ["s", 280,-1,"c", 4, -1, "a", ItemID.saw, -1],giveSawmill);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.sawmill, 0, render);
var model = BlockRenderer.createModel();
model.addBox(0, 0, 0, 1, 1, 7/16,4,0);
model.addBox(0, 0, 9/16, 1, 1, 1,4,0);
model.addBox(0, 0, 7/16, 2/16, 1, 9/16,4,0);
model.addBox(14/16, 0, 7/16, 1, 1, 9/16,4,0);
model.addBox(0, 1, 0, 1/16, 2, 1/16,17,0);
model.addBox(15/16, 1, 15/16, 1, 2, 1,17,0);
model.addBox(0, 1, 15/16, 1/16, 2, 1,17,0);
model.addBox(15/16, 1, 0, 1, 2, 1/16,17,0);

model.addBox(0, 2, 0, 1/16, 2+1/16, 1,17,0);
model.addBox(15/16, 2, 0, 1, 2+1/16, 1,17,0);
model.addBox(1/16, 2, 6/16, 15/16, 2+1/16, 7/16,17,0);
model.addBox(1/16, 2, 9/16, 15/16, 2+1/16, 10/16,17,0);

render.addEntry(model);

var sawmillGui = new UI.StandartWindow({
	standart: {
		header: {
			text: {
				text: "Sawmill"
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
	{type: "bitmap", x: 585, y: 265, bitmap: "furnace_bar_background", scale: 5}
	],
    
	elements: {
		"SawmillSlotInput": {type: "slot", x: 445, y: 250, size: 100},
        "SawmillSlotOutput": {type: "slot", x: 735, y: 250, size: 100},
		"SawmillSlotOutputAddition": {type: "slot", x: 850, y: 250, size: 100},
		"SawmillSlotModified": {type: "slot", x: 850, y: 50, size: 100, bitmap:"gear_slot_1"},
        "Progress": {type: "scale", x: 585, y: 265, direction: 0, scale: 5, bitmap: "furnace_bar_scale"}
			}
		
});
MC.sawmillRecipes=[1];
MC.addSawmillRecipe=function(input, result, time){
	MC.sawmillRecipes.push({input:input, result:result, time:time});
}
MC.getSawmillRecipe=function(input){
	if(typeof input == "number"){
		return MC.sawmillRecipes[input];
	}else if(typeof input == "object"){
		for(var i =1; i<MC.sawmillRecipes.length; i++){
			if(MC.sawmillRecipes[i].input.id==input.id&&MC.sawmillRecipes[i].input.data==input.data){
				return i;
			}
		}
		return null;
	}else if(typeof input == "undefined"){
		return null;
	}
};


//FileTools.WriteJSON (__dir__+"/json/sawmillRecipes.json", MC.sawmillRecipes, true);
MC.sawmillRecipes=FileTools.ReadJSON(__dir__+"/json/sawmillRecipes.json");
TileEntity.registerPrototype(BlockID.sawmill, {
defaultValues:{
	id:0,
	data:0,
	recipe:null,
	progres:0,
	maxProgres:0,
	id:0,
	data:0
},
updateItemAnimation:function(){
	if(this.container.getSlot("SawmillSlotInput").id!=0){
		if(Item.getNumericId(this.container.getSlot("SawmillSlotInput").id)>=256){
			this.itemAnimation.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.8,
			count:1,
			rotation:[Math.PI/2,0,0]
		});
		this.itemAnimation.setPos(this.x + .2, this.y + 1+1/32, this.z + .5);
		this.itemAnimation2.destroy();
		}else{
			this.itemAnimation.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.4,
			count:1,
			rotation:[0,0,Math.PI/2]
		});
		this.itemAnimation2.describeItem({
			id: this.container.getSlot("SawmillSlotInput").id,
			data: this.container.getSlot("SawmillSlotInput").data,
			size: 0.4,
			count:1,
			rotation:[0,0,Math.PI/2]
		});
		this.itemAnimation.setPos(this.x + .2, this.y + 1.12, this.z + .43);
		this.itemAnimation2.setPos(this.x-.2, this.y + 1.12, this.z + .43);
		this.itemAnimation2.load();
		}
		this.itemAnimation.load();
	}else{
		this.itemAnimation.destroy();
		this.itemAnimation2.destroy();
	}
},
energyReceive: function(type, src) {
	if(this.data.id!=this.container.getSlot("SawmillSlotInput").id||this.data.data!=this.container.getSlot("SawmillSlotInput").data){
		this.updateItemAnimation();
		this.data.id = this.container.getSlot("SawmillSlotInput").id;
		this.data.data = this.container.getSlot("SawmillSlotInput").data;
	}
	var content = this.container.getGuiContent();
	if(content&&!this.data.progres){
		this.container.setScale("Progress",0);
	}
	if(content&&this.data.progres&&this.data.speed&&this.data.power){
		this.container.setScale("Progress",Math.floor(22*(1-this.data.progres/this.data.maxProgres))/22);
	}
	var recipe = MC.getSawmillRecipe({id:this.container.getSlot("SawmillSlotInput").id,data:this.container.getSlot("SawmillSlotInput").data});
	if(recipe&&World.getWorldTime()%5==0){
		this.data.speed=0;
		this.data.power=0;
		for(var i in gear){
			if(this.container.getSlot("SawmillSlotModified").id==gear[i].id){
				this.data.speed=gear[i].speed;
				this.data.power=gear[i].power;
			}
		}
	}
	

	if(recipe&&!this.data.recipe&&this.data.progres==0&&
	this.container.getSlot("SawmillSlotInput").id==MC.getSawmillRecipe(recipe).input.id&&this.container.getSlot("SawmillSlotInput").data==MC.getSawmillRecipe(recipe).input.data){
		if(this.container.getSlot("SawmillSlotOutput").count+MC.getSawmillRecipe(recipe).result.count<=64||this.container.getSlot("SawmillSlotOutput").id==MC.getSawmillRecipe(recipe).result.id&&this.container.getSlot("SawmillSlotOutput").data==MC.getSawmillRecipe(recipe).result.data||this.container.getSlot("SawmillSlotOutput").id==0){
			this.data.recipe=recipe;
			
		
		this.data.progres=MC.getSawmillRecipe(recipe).time;
		this.data.maxProgres=MC.getSawmillRecipe(recipe).time;
		}
	}
	if(this.data.recipe){
		if(this.container.getSlot("SawmillSlotInput").id!=MC.getSawmillRecipe(this.data.recipe).input.id||this.container.getSlot("SawmillSlotOutput").count+MC.getSawmillRecipe(recipe).result.count>64||this.container.getSlot("SawmillSlotOutput").id!=MC.getSawmillRecipe(recipe).result.id&&this.container.getSlot("SawmillSlotOutput").id!=0||this.container.getSlot("SaySlotOutput").data!=MC.getSawmillRecipe(recipe).result.data){
			this.data.progres=0;
			this.data.maxProgres=0;
			this.data.recipe=0;
			
		}
	}
	if(this.data.recipe&&recipe&&this.data.progres&&this.data.speed&&this.data.power&&src.amount()>=2*this.data.power){
		this.data.progres= Math.max(-1*this.data.speed+this.data.progres,0);
		src.get(2*this.data.power);
		var ypos =Math.abs(Math.sin((this.data.progres%20)*Math.PI/20*2)/4)+1;
		this.animation.setPos(this.x+.7, this.y+ypos, this.z+.43);
		if(Item.getNumericId(this.container.getSlot("SawmillSlotInput").id)>=256){
			this.itemAnimation.setPos(this.x + .2+(1-this.data.progres/this.data.maxProgres)*.3, this.y + 1+1/32, this.z + .5);
		}else{
			this.itemAnimation.setPos(this.x + .2+(1-this.data.progres/this.data.maxProgres)*.8, this.y + 1.12, this.z + .43);
			this.itemAnimation2.setPos(this.x +(1-this.data.progres/this.data.maxProgres)*.8-.2, this.y + 1.12, this.z + .43);
		}
	}
	if(recipe&&this.data.recipe&&!this.data.progres){
		this.container.getSlot("SawmillSlotOutput").id=MC.getSawmillRecipe(recipe).result.id;
		this.container.getSlot("SawmillSlotOutput").data=MC.getSawmillRecipe(recipe).result.data;
		this.container.getSlot("SawmillSlotOutput").count+=MC.getSawmillRecipe(recipe).result.count;
		this.container.getSlot("SawmillSlotInput").count--;
		this.container.getSlot("SawmillSlotModified").data++;
		if(Math.random()>=.5&&MC.getSawmillRecipe(recipe).result.id==5&&this.container.getSlot("SawmillSlotOutputAddition").count<64){
			if(this.container.getSlot("SawmillSlotOutputAddition").id==ItemID.sawdust||this.container.getSlot("SawmillSlotOutputAddition").id==0){
				this.container.getSlot("SawmillSlotOutputAddition").id=IDData.item.sawdust;
		this.container.getSlot("SawmillSlotOutputAddition").data=0;
		this.container.getSlot("SawmillSlotOutputAddition").count+=1;
			}
		}
		for(var i in gear){
			if(this.container.getSlot("SawmillSlotModified").id==gear[i].id&&gear[i].damage-1==this.container.getSlot("SawmillSlotModified").data){
				this.container.getSlot("SawmillSlotModified").count--;
				this.container.getSlot("SawmillSlotModified").data=0;
			}
		}
		this.data.recipe=null;
		this.data.maxProgres=0;
		this.container.validateAll();
	}
},
click: function(){
	if(!MC.playerGetSneaking()){
		this.container.openAs(this.getGuiScreen());
	}
	return true;
},
destroy: function(){
	this.animation.destroy();
	this.itemAnimation.destroy();
	this.itemAnimation2.destroy();
},
init:function(){
	this.animation =new Animation.Item(this.x + .7, this.y + 1, this.z + .43);
	this.itemAnimation =new Animation.Item(this.x + .2, this.y + 1.12, this.z + .43);
	this.itemAnimation2 =new Animation.Item(this.x-.6, this.y + 1.12, this.z + .43);
	this.animation.describeItem({
			id: ItemID.saw,
			data: 0,
			size: 2,
			count:1
		});
		this.animation.load();
		this.updateItemAnimation();
},
getGuiScreen: function(){
	return sawmillGui;
}
});
EnergyTileRegistry.addEnergyTypeForId(BlockID.sawmill, energyKineticEnergy);




// file: Item/di.js

IDRegistry.genItemID("dw");
Item.createItem("dw", "Drop to lava", {name: "debug_wrench", meta: 0}, {stack: 64});
Translation.addTranslation("Drop to lava", {ru: "Выкинь в лаву"});

var debString = ["Change to block mode", "Change to player mode", "Change to tile entites mode", "Change to biom mode"];

Callback.addCallback("ItemUse",function(coords, item, block){
	if(item.id==ItemID.dw){
		if(MC.playerGetSneaking(Player.get())){
			if(item.data<3){
				Player.setCarriedItem(item.id, 1, item.data+1);
			}else{
				Player.setCarriedItem(item.id, 1, 0);
			}
			Game.message(debString[Player.getCarriedItem().data]);
		}else if(item.data==0){
			alert("Id: "+block.id);
			alert("Data: "+block.data);
			alert("Side: "+coords.side);
		if(block.id == 7){
			World.setBlock(coords.x+1, coords.y, coords.z, 152);
			World.setBlock(coords.x, coords.y, coords.z+1, 22);
			World.setBlock(coords.x-1, coords.y, coords.z, 1);
			World.setBlock(coords.x, coords.y, coords.z-1, 1);
		}
		}else if(item.data == 1){
			alert("X: " +Player.getPosition().x+" Y: "+Player.getPosition().y+" Z: "+Player.getPosition().z);
			alert("Gamemode: "+ MC.playerGetGamemode());
			alert("Health: "+ Entity.getHealth(Player.get()));
			alert("Hunger: "+ Player.getHunger());
		}else if(item.data == 2){
			if(World.getTileEntity(coords.x, coords.y, coords.z)){
				Debug.m(World.getTileEntity(coords.x, coords.y, coords.z).data);
			}else{
				alert("No tile entity");
			}
		}else if(item.data == 3){
			alert("Current biome is "+World.getBiome(coords.x, coords.z)/*+", "+World.getBiomeName(coords.x, coords.z)*/);
		}
	}
});




// file: Core/Achivements.js

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




// file: Book/aboutUs.js

Theme.createTheme("about_us", "main_page");

TextVisual.addText("about_us", 
"Этот мод создавался ещё с 2014 года, с тех пор вышло несколько версий. Одна из них была на ModPE, другая на Core Engine. Теперь я перешёл на совершенно новый уровень: новве анимации, идеи, механизмы. Почти всё, что есть в этом моде создано одним человеком - SlePE", 
"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("about_us"), 30);
TextVisual.addText("about_us", 
"Группа RG Project:", 
"STANDART_TEXT");
TextVisual.addText("about_us", 
"vk.com/medievalcraft_mod", 
{size:40, pathTypeface:"res/fonts/goth.ttf", color:android.graphics.Color.BLUE});




// file: Book/versionHistory.js

Theme.createTheme("versionHistory", "main_page");
TextVisual.addText("versionHistory", 
"К сожалению здесь пусто.", 
"STANDART_TEXT");




// file: Book/stoneFurnace.js

Theme.createTheme("stoneFurnace", "main_page");

TextVisual.addText("stoneFurnace", 
"Medieval Craft изменяет печь, делая её более реалистичной. Теперь для того, чтобы что-то расплавить в печи, нужно нагреть её до нужной температуры, для этого придётся сжечь достаточно много топлива. У каждого вида топлива есть минимальная и максимальная температура горения (последнее услвность, которая в послежующих версиях будет исправлена, так как в реальности всё зависит от количество тепла, которое выделяет топливо за единицу времени). Когда в печи нет толпива она остывает. Чтобы потсроить новую печь, сделайте куб из булыжника 3х3х3, а в середине одной из боковых сторон сломайте блок и поставьте печку. Ниже приведены виды топлива, а также печные рецепты. Минимальная температура горения - температура, при которой загорается топливо, максимальная - температура, до которой оно может греть, время горения - врем, за которое сгорает топливо, энергия - количество теплоты, которое выделяет топливо.", 
"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("stoneFurnace"), 30);
TextVisual.addText("stoneFurnace", "Мин.°C f.Макс.°C Время Энергия","STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("stoneFurnace"), 30);
for(var i in MC.fuelList){
	var f = MC.fuelList[i];
	ItemVisual.addItem("stoneFurnace", f.item.id, 1, f.item.data);
	TextVisual.addText("stoneFurnace", 
Math.max(f.temperature.min,20)+"°C "+f.temperature.max+"°C "+f.timeBurn/20+"c "+f.energy+"Мд", 
"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("stoneFurnace"), 30);
}
TextVisual.addText("stoneFurnace", "Рецепты, которые можно использовать в печи","STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("stoneFurnace"), 50);
for(var i in MC.stoneFurnaceRecipeList){
	var r = MC.stoneFurnaceRecipeList[i];
	CustomElement.addCustom("furnaceRecipe",{
	theme:"stoneFurnace",
	input:{id:r.input.id, data:r.input.data},
	result:{id:r.result.id, count:1, data:r.result.data},
	scale:1.5,
	temp:r.temperature
});
}





// file: Book/gears.js

Theme.createTheme("gears", "main_page");

TextVisual.addText("gears", 
"Для крафтов и работы некоторых механизмов, вам понадобятся шестерёнки. Они делятся на материал из которого они изготовлены и коэффициент эффективности. Например у деревянных шестерёнок прочность 10 едениц, у каменных 30, у железных 100, а у золотых 25. Большие шестерёнки с большим количеством зубьев будут крутиться в 2 раза быстрее, но и потребление жнергии у механизма возрастёт также в 2 раза. У шетсерёнок с меньшим количеством зубьев напртив потребление уменьшится в 2 раза, но и скорость упадёт в 2 раза. Золотые шестерёнки несколько эффективнее остальных при использовании маленькой шестерёнки скорость упадёт только на 25%, а потребление на 50%. При использовании большой шестерёнки, скорость увеличиться не на 100%, а на 200%!", 
"STANDART_TEXT");

CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:1},{}],
	[{id:1},{id:1},{id:1}],
	[{},{id:1},{}]
	],
	result:{id:ItemID.stoneGear_05x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:1},{}],
	[{id:1},{id:ItemID.stoneGear_05x},{id:1}],
	[{},{id:1},{}]
	],
	result:{id:ItemID.stoneGear_1x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:1},{}],
	[{id:1},{id:ItemID.stoneGear_1x},{id:1}],
	[{},{id:1},{}]
	],
	result:{id:ItemID.stoneGear_2x, count:1},
	scale:1.5
});
var i = 265;
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:i},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.ironGear_05x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:ItemID.ironGear_05x},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.ironGear_1x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:ItemID.ironGear_1x},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.ironGear_2x, count:1},
	scale:1.5
});
i = 266;
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:i},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.goldenGear_05x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:ItemID.goldenGear_05x},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.goldenGear_1x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},{id:i},{}],
	[{id:i},{id:ItemID.goldenGear_1x},{id:i}],
	[{},{id:i},{}]
	],
	result:{id:ItemID.goldenGear_2x, count:1},
	scale:1.5
});
var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},oP,{}],
	[oP,oP,oP],
	[{},oP,{}]
	],
	result:{id:ItemID.goldGear_05x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},oP,{}],
	[oP,{id:ItemID.woodenGear_05x},oP],
	[{},oP,{}]
	],
	result:{id:ItemID.woodenGear_1x, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"gears",
	input:[
	[{},oP,{}],
	[oP,{id:ItemID.woodenGear_1x},oP],
	[{},oP,{}]
	],
	result:{id:ItemID.woodenGear_2x, count:1},
	scale:1.5
});




// file: Book/energyStorage.js

Theme.createTheme("energyStorage", "main_page");

TextVisual.addText("energyStorage", 
"Накопленую энергию нужно где-то хранить. Тут вам и поможет маховик. Для того чтобы он начала работать просто положите в него шестерёнку. Чес больше зубьев у шестерёнки, тем больше он хранит энергии (4 - 500Кэ, 8 - 1000Кэ, 12- 2000Кэ). Каждые десять секунд шестерёнка теряет свою прочность, и, например, деревянная шестерёнка сломается через 1 минуту 40 чекунд, а железная 16 минут 40 секунд.",
"STANDART_TEXT");

var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"energyStorage",
	input:[
	[{},{},{}],
	[oP,{id:280},oP],
	[oP,oP,oP]
	],
	result:{id:ItemID.flywheel, count:1},
	scale:1.5
	});
TextVisual.addText("energyStorage", 
"Также энергию можно хранить в пружинах. Золотая хранит 4500 Кэ, а железная 3000Кэ. Но при попытке зарядить этой энергией маховик (присев и нажать по нему) вам вернётся только 1/10 часть энергии, хранящаяся в пружине. Именно поэтому пружины лучше использовать как переносной источник энергии или просто аккамулятор для бура.",
"STANDART_TEXT");

CustomElement.addCustom("workbenchRecipe",{
	theme:"energyStorage",
	input:[
	[{id:265},{},{}],
	[{},{id:265},{}],
	[{id:265}]
	],
	result:{id:ItemID.ironSpring, count:1},
	scale:1.5
	});
CustomElement.addCustom("workbenchRecipe",{
	theme:"energyStorage",
	input:[
	[{id:266},{},{}],
	[{},{id:266},{}],
	[{id:266}]
	],
	result:{id:ItemID.goldSpring, count:1},
	scale:1.5
	});




// file: Book/energyGenerate.js

Theme.createTheme("energyGenerate", "main_page");

TextVisual.addText("energyGenerate", 
"Есть несколько способов генерации энергии: ветряки и водяные мельницы. Водяные мельницы сожно устанавливать только в реках или окенах (тогда они работают как приливные).",
"STANDART_TEXT");

var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"energyGenerate",
	input:[
	[oP,oP,oP],
	[oP,{id:288},oP],
	[oP,oP,oP]
	],
	result:{id:BlockID.woodenMill, count:1},
	scale:1.5
});

CustomElement.addCustom("workbenchRecipe",{
	theme:"energyGenerate",
	input:[
	[oP,oP,oP],
	[oP,{id:351, data:4},oP],
	[oP,oP,oP]
	],
	result:{id:BlockID.waterWheel, count:1},
	scale:1.5
});
TextVisual.addText("energyGenerate", 
"У каждого из генераторов есть несколько уровней, здесь я напишу только об одном из них. Для постройки постройте конструкцию, как на картинках ниже, а за центральным блоком поставьте (на 1 картинке водяное колесо, а на второй мельница). Затем нажмите по главному блоку (тот, что только что поставили) молотком. Если вы всё сделали правильно, вам в чат прийдёт сообщение о правильной постройке. Помните, что чем больше блоков свободно перед мельницей, тем лучше она работает, а под водяным колесом должна быть вода.",
"STANDART_TEXT");
ImageVisual.addImage("energyGenerate", stringPath.imagePath.waterWheelLevel1);
ImageVisual.addImage("energyGenerate", stringPath.imagePath.millLevel1);




// file: Book/sawmill.js

Theme.createTheme("sawmill", "main_page");

TextVisual.addText("sawmill", 
"Может получиться так, что вам лень рубить много деревьев, или их вокруг просто мало, ну или вам просто хочется более эффеутивно расходовать ресурсы. Тут и поможет лесопилка. Она позволяет распилить брёвна не на 4 доски, а на 6! Также в ней можно распилить старые и уже не нужные преметы вроде сундуков и дверей. Чтобы её скрафтить понадобиться пила и другие ресурсы.", 
"STANDART_TEXT");

CustomElement.addCustom("workbenchRecipe",{
	theme:"sawmill",
	input:[
	[{},{id:265}],
	[{},{id:265}],
	[{},{id:265}]
	],
	result:{id:ItemID.saw, count:1},
	scale:1.5
});
CustomElement.addCustom("workbenchRecipe",{
	theme:"sawmill",
	input:[
	[{id:280},{id:280},{id:280}],
	[{id:4},{id:ItemID.saw},{id:4}],
	[{id:4},{id:ItemID.saw},{id:4}]
	],
	result:{id:ItemID.sawmill, count:1},
	scale:1.5
});

TextVisual.addText("sawmill", 
"Для работы расходуется 1 Кэ/тик. В правые верхний слот нужно положить шестерёнку. При распилке брёвен есть некоторый шанс, чтотвы сможете получить опилки",
"STANDART_TEXT");






// file: Book/grinder.js

Theme.createTheme("grinder", "main_page");

TextVisual.addText("grinder",
"Этот многоблочный механизм поможет вам раздробить руду на более мелкие камни, что повысит эффективность добычи в 2 раза. Для начала нужно построить конструкцию, как на фото ниже, для этого вам понадобится дробика, дробильный стол и редуктор."
,"STANDART_TEXT");

CustomElement.addCustom("workbenchRecipe",{
	theme:"grinder",
	input:[
	[{},{},{}],
	[{id:265},{},{id:265}],
	[{id:42},{id:265},{id:42}]
	],
	result:{id:ItemID.grinderTable, count:1},
	scale:1.5
});
var zabor = [{id:85, data:0},{id:85, data:1},{id:85, data:2},{id:85, data:3},{id:85, data:4},{id:85, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"grinder",
	input:[
	[{},zabor,{}],
	[{},zabor,{}],
	[{id:265},{id:42},{id:265}]
	],
	result:{id:ItemID.crasherIron, count:1},
	scale:1.5
});
var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"grinder",
	input:[
	[oP,oP,oP],
	[{id:IDData.item.woodenGear_1x},oP,{id:IDData.item.woodenGear_1x}],
	[oP,oP,oP]
	],
	result:{id:ItemID.reduser, count:1},
	scale:1.5
});
ImageVisual.addImage("grinder", stringPath.imagePath.grinderConstruction);

TextVisual.addText("grinder",
"Затем просто нажмите по дробильному столику молотком, подведите с одной из сторон энергию, положите в слот для шестерёнок шестерню и можете начинать дробить! Потребляет 4 Кэ/тик, рецепты ниже."
,"STANDART_TEXT");

for(var i in MC.handGrinderRecipeList){
	var r = MC.handGrinderRecipeList[i];
	CustomElement.addCustom("grinderRecipe",{
	theme:"grinder",
	input:{id:r.input.id, data:r.input.data},
	result:{id:r.result.id, count:r.result.count, data:r.result.data},
	scale:1.5
});
}




// file: Book/barrel.js

Theme.createTheme("barrel", "main_page");
TextVisual.addText("barrel",
"В бочках вы сможете хранить жидкость. Бочки бывают многоблочные и одноблочные. Крафт одноблочной бочки, хранящей 16 вёдер ниже."
,"STANDART_TEXT");
var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"barrel",
	input:[
	[{id:265},[{id:17, data:0},{id:17, data:1},{id:17, data:2},{id:17, data:3},{id:162, data:0},{id:162, data:1}],{id:265}],
	[oP,{id:102},oP],
	[{id:265},oP,{id:265}]
	],
	result:{id:ItemID.barrel, count:1},
	scale:1.5
});

TextVisual.addText("barrel",
"Многоблочные бочки нужны для хранения большого количества жидкости. Минимальный размер такой бочки - 4х4х4 блока. По углам стоят блоки железа, стороны сделаны из брёвен, а всё внутреннее пространство заполнено досками. Чтобы бочка заработала, поставьте с одной из сторон вместо бревна краник. Вместимость бочки высчитывается согласно формуле: B*16, где B количество блоков досок внутри бочки. Ниже крафт краника."
,"STANDART_TEXT");
CustomElement.addCustom("workbenchRecipe",{
	theme:"barrel",
	input:[
	[{id:265},oP,{id:265}],
	[oP,{},oP],
	[{id:265},oP,{id:265}]
	],
	result:{id:BlockID.woodenGate, count:1},
	scale:1.5
});




// file: Book/drill.js

Theme.createTheme("drill", "main_page");

TextVisual.addText("drill",
"А вы хотели сходить в шахту с буром? Я да. Теперь и вы сможете. Для работы просто положите вместе с щаряженной пружиной в сетку крафта. За один сломанный блок потребляется 10Кэ. Когда вам надоест, просто достаньте пружину из бура, положив его в сетку крафта."
,"STANDART_TEXT");
var oP = [{id:5, data:0},{id:5, data:1},{id:5, data:2},{id:5, data:3},{id:5, data:4},{id:5, data:5}];
CustomElement.addCustom("workbenchRecipe",{
	theme:"drill",
	input:[
	[{},{},{id:265}],
	[{id:265},{id:42},{id:IDData.item.ironGear_1x}],
	[{},{},oP]
	],
	result:{id:ItemID.kineticDrill, count:1},
	scale:1.5
});




// file: Book/mechanismPage.js

Theme.createTheme("mechamismPage", "main_page");

TextVisual.addTextLink("mechamismPage", "Многоблочная каменная печь", "stoneFurnace",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Шестерёнки", "gears",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Добыча энергии", "energyGenerate",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Хранение энерги", "energyStorage",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Лесопилка", "sawmill",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Дробилка", "grinder",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Бочки", "barrel",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);
TextVisual.addTextLink("mechamismPage", "Бур", "drill",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("mechamismPage"), 50);




// file: Book/main.js

IDRegistry.genItemID("guideBook");
Item.createItem("guideBook", "Учебная книга", {name: "guide_book", meta: 0}, {stack: 1});

Theme.createTheme("main_page");
Callback.addCallback("ItemUse",function(coords, item, block){
		if(item.id==ItemID.guideBook){
			Theme.openTheme("main_page");
			MC.addAchivement("medievalCraft", "openBook");
		}
	});
	

TextVisual.addTextLink("main_page", "Механизмы", "mechamismPage",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("main_page"), 50);
TextVisual.addTextLink("main_page", "О нас", "about_us",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("main_page"), 50);
TextVisual.addTextLink("main_page", "История версий", "versionHistory",0,"STANDART_TEXT");
Theme.newLine(Theme.getThemeByName("main_page"), 50);




