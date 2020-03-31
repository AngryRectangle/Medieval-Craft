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
