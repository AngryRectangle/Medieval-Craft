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
