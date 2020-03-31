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
