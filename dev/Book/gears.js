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
