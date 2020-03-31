IDRegistry.genItemID("guideBook");
Item.createItem("guideBook", "Guide book", {name: "guide_book", meta: 0}, {stack: 1});

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