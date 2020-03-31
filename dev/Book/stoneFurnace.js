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

