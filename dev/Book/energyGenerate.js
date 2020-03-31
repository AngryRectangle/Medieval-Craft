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
