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
				elements["nextPage"] = {type: "button", x: 850, y: 420, bitmap: "next_page", scale: 3, page:page, link:name, clicker: {
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
				elements["prevPage"] = {type: "button", x: 50, y: 420, bitmap: "pre_page", scale: 3, page:page, link:name, clicker: {
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
				elements["homeTheme"] = {type: "button", x: 400, y: 420, bitmap: stringPath.imagePath.homePage, scale: 3, link:theme.mainPage, clicker: {
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
				elements["lastTheme"] = {type: "button", x: 330, y: 420, bitmap: stringPath.imagePath.lastTheme, scale: 3, clicker: {
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
			elements["closeButton"] = {type: "button", x: 550, y: 420, bitmap: stringPath.imagePath.closeBook, scale: 3, clicker: {
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
