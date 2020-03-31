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
