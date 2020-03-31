IDRegistry.genBlockID("reduser");
Block.createBlock("reduser", [
{name: "Reduser", texture: [["planks", 0]], inCreative: false}
],energyKineticEnergy.getWireSpecialType());
Translation.addTranslation("Reduser", {ru: "Редуктор"});

var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.reduser, 0, render);
var model = BlockRenderer.createModel();
model.addBox(0, 0, 0, 1, 1, 1,5,0);
model.addBox(5/16, 1, 5/16, 11/16, 1.3, 6/16,5,0);
model.addBox(5/16, 1, 10/16, 11/16, 1.3, 11/16,5,0);
model.addBox(5/16, 1, 6/16, 6/16, 1.3, 10/16,5,0);
model.addBox(10/16, 1, 6/16, 11/16, 1.3, 10/16,5,0);
render.addEntry(model);
IDRegistry.genItemID("reduser");
Item.createItem("reduser", "Reduser", {name: "reduser", meta: 0}, {stack: 64});
Translation.addTranslation("Reduser", {ru: "Редуктор"});
MC.replaceBlock(ItemID.reduser, BlockID.reduser);
Recipes.addShaped({id: ItemID.reduser, count: 1, data: 0}, ["ppp", "gpg", "ppp"], ["p", 5,-1,"g", IDData.item.woodenGear_1x, -1]);
