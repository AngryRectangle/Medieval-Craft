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


