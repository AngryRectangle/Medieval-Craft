/**
 * Module used to manage armor's behavior
 */
declare namespace Armor {
    /**
     * Registers armor's hurt and tick functions
     * @param id armor item string id
     * @param funcs 
     */
    function registerFuncs(id: string, funcs: {
        tick: 
        /**
         * Called every tick if player wears the armor
         * @param item current armor item instance
         * @param index armor slot, one of the [[Native.ArmorType]] values
         * @param maxDamage maximum damage the armor 
         * @returns true, if changes to the item parameter should be applied, 
         * false otherwise
         */
        (item: ItemInstance, index: number, maxDamage: number) => boolean,
        
        hurt: 
        /**
         * Called when player deals damage if player wears the armor
         * @param params additional data about damage
         * @param params.attacker attacker entity or -1 if the damage was not 
         * caused by an entity
         * @param params.damage damage amout that was applied to the player
         * @param params.type damage type
         * @param params.b1 unknown param
         * @param params.b2 unknown param
         * @param item current armor item instance
         * @param index armor slot, one of the [[Native.ArmorType]] values
         * @param maxDamage maximum damage the armor 
         * @returns true, if changes to the item parameter should be applied, 
         * false otherwise
         */
        (params: {attacker: number, damage: number, type: number, b1: boolean, b2: boolean}, 
            item: ItemInstance, index: number, maxDamage: number) => boolean
    }): void;

    /**
     * Prevents armor from being damaged
     * @deprecated Currently not implemented
     * @param id armor item string id
     */
    function preventDamaging(id: string): void;
}

/**
 * Module used to create and manipulate blocks. The difference between terms 
 * "block" and "tile" is in its usage: blocks are used in the inventory, 
 * tiles are placed in the world and have different ids for some vanilla blocks. 
 * Use [[Block.convertBlockToItemId]] and [[Block.convertItemToBlockId]]
 */
declare namespace Block {
    /**
     * @param id string id of the block
     * @returns block numeric id by its string id or just returns its numeric id 
     * if input was a numeric id
     */
    function getNumericId(id: string): number;

    /**
     * Creates new block using specified params
     * @param namedID string id of the block. You should register it via 
     * [[IDRegistry.genBlockID]] call first
     * @param defineData array containing all variations of the block. Each 
     * variation corresponds to block data value, data values are assigned 
     * according to variations order
     * @param blockType [[SpecialType]] object, either java-object returned by
     * [[Block.createSpecialType]] or js-object with the required properties, 
     * you can also pass special type name, if the type was previously 
     * registered
     */
    function createBlock(namedID: string, defineData: BlockVariation[], blockType: SpecialType|string): void;

    /**
     * Creates new block using specified params, creating four variations for 
     * each of the specified variations to be able to place it facing flayer 
     * with the front side and defines the appropriate behavior. Useful for 
     * different machines and mechanisms
     * @param namedID string id of the block. You should register it via 
     * [[IDRegistry.genBlockID]] call first
     * @param defineData array containing all variations of the block. Each 
     * variation corresponds to four block data values, data values are assigned 
     * according to variations order
     * @param blockType [[SpecialType]] object, either java-object returned by
     * [[Block.createSpecialType]] or js-object with the required properties, 
     * you can also pass special type name, if the type was previously 
     * registered
     */
    function createBlockWithRotation(namedID: string, defineData: BlockVariation[], blockType: SpecialType|string): void;

    /**
     * @param id numeric block id
     * @returns true, if the specified block id is a vanilla block
     */
    function isNativeTile(id: number): boolean;

    /**
     * Converts tile id to the block id
     * @param id numeric tile id
     * @returns numeric block id corresponding to the given tile id
     */
    function convertBlockToItemId(id: number): number;

    /**
     * Converts block id to the tile id
     * @param id numeric tile id
     * @returns numeric tile id corresponding to the given block id
     */
    function convertItemToBlockId(id: number): number;

    /**
     * Same as [[Block.registerDropFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerDropFunctionForID(numericID: number, dropFunc: DropFunction, level?: number): boolean;

    /**
     * Registers function used by Core Engine to determine block drop for the 
     * specified block id
     * @param numericID tile string or numeric id
     * @param dropFunc function to be called to determine what will be dropped 
     * when the block is broken
     * @param level if level is specified and is not 0, digging level of the
     * block is additionally set
     * @returns true, if specified string or numeric id exists and the function
     * was registered correctly, false otherwise
     */
    function registerDropFunction(namedID: string|number, dropFunc: DropFunction, level?: number): boolean;

    /**
     * Same as [[Block.registerPopResourcesFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerPopResourcesFunctionForID(numericID: number, func: PopResourcesFunction): void;

    /**
     * Registeres function used by Core Engine to determine block drop for the 
     * specified block id
     * @param namedID tile string or numeric id 
     * @param func function to be called when a block in the world is broken by
     * environment (explosions, pistons, etc.)
     * @returns true, if specified string or numeric id exists and the function
     * was registered correctly, false otherwise
     */
    function registerPopResourcesFunction(namedID: string|number, func: PopResourcesFunction): void;

    /**
     * Same as [[Block.setDestroyLevel]] but accepts only numeric 
     * tile id as the first param
     */
    function setDestroyLevelForID(id: number, level: number, resetData: boolean): void;

    /**
     * Registers a default destroy function for the specified block, considering
     * its digging level
     * @param namedID tile string id
     * @param level digging level of the block
     * @param resetData if true, the block is dropped with data equals to 0
     */
    function setDestroyLevel(namedID: string|number, level: number, resetData: boolean): void;

    /**
     * Sets destroy time for the block with specified id
     * @param namedID string or numeric block id
     * @param time destroy time for the block, in ticks
     */
    function setDestroyTime(namedID: string|number, time: number): void;

    /**
     * @param numericID numeric block id
     * @returns true, if block is solid, false otherwise
     */
    function isSolid(numericID: number): boolean;

    /**
     * @param numericID numeric block id
     * @returns destroy time of the block, in ticks
     */
    function getDestroyTime(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns explostion resistance of the block
     */
    function getExplosionResistance(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns friction of the block
     */
    function getFriction(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns translucency of the block
     */
    function getTranslucency(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns light level, emmited by block, from 0 to 15
     */
    function getLightLevel(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns light opacity of the block, from 0 to 15
     */
    function getLightOpacity(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns render layer of the block
     */
    function getRenderLayer(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns render type of the block
     */
    function getRenderType(numericID: number): number;

    /**
     * Temporarily sets destroy time for block, saving the old value for the 
     * further usage
     * @param numericID numeric block id
     * @param time new destroy time in ticks
     */
    function setTempDestroyTime(numericID: number, time: number): void;

    /**
     * Registers material and digging level for the specified block
     * @param namedID block numeric or string id
     * @param material material name
     * @param level block's digging level
     */
    function setBlockMaterial(namedID: string|number, material: string, level: number): void;

    /**
     * Makes block accept redstone signal
     * @param namedID block numeric or string id
     * @param data block data, currently not used
     * @param isRedstone if true, the redstone changes at the block will notify
     * the "RedstoneSignal" callback
     */
    function setRedstoneTile(namedID: string|number, data: number, isRedstone: boolean): void;

    /**
     * Gets drop for the specified block. Used mostly by Core Engine's 
     * [[ToolAPI]], though, can be useful in the mods, too
     * @param block block info
     * @param item item that was (or is going to be) used to break the block
     * @param coords coordinates where the block was (or is going to be) broken 
     * @returns block drop, the array of arrays, each containing three values: 
     * id, count and data respectively
     */
    function getBlockDropViaItem(block: Tile, item: ItemInstance, coords: Vector): [number, number, number][];

    /**
     * Same as [[Block.registerPlaceFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerPlaceFunctionForID(block: number, func: PlaceFunction): void;

    /**
     * Registers function to be called when the block is placed in the world
     * @param namedID block numeric or string id
     * @param func function to be called when the block is placed in the world
     */
    function registerPlaceFunction(namedID: string|number, func: PlaceFunction): void;

    /**
     * Sets block box shape
     * @param id block numeric id
     * @param pos1 block lower corner position, in voxels (1/16 of the block)
     * @param pos2 block upper conner position, in voxels (1/16 of the block)
     * @param data block data
     */
    function setBlockShape(id: number, pos1: Vector, pos2: Vector, data: number): void;

    /**
     * Same as [[Block.setBlockShape]], but accepts coordinates as scalar 
     * params, not objects
     * @param id block numeric id
     * @param data  block data
     */
    function setShape(id: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, data: number): void;

    /**
     * Creates a new special type using specified params and registers it by 
     * name
     * @param description special type properties
     * @param nameKey string name to register the special type
     */
    function createSpecialType(description: SpecialType, nameKey: string): number;

    /**
     * @deprecated No longer supported
     */
    function setPrototype(namedID: string|number, Prototype: any): number;

    /**
     * Makes block invoke callback randomly depending on game speed
     * @param id block id to register for random ticks
     * @param callback function to be called on random block tick
     */
    function setRandomTickCallback(id: number, callback: RandomTickFunction): number;

    /**
     * Makes block invoke callback randomly depending on game speed. Occurs more 
     * often then [[Block.setRandomTickCallback]] and only if the block is not
     * far away from player
     * @param id block id to register
     * @param callback function to be called 
     */
    function setAnimateTickCallback(id: number, callback: AnimateTickFunction): number;


    /**
     * Special types are used to set properties to the block. Unlike items, 
     * blocks properties are defined using special types, due to old Inner 
     * Core's block ids limitations 
     */
    interface SpecialType {
        /**
         * Unique string identifier of the SpecialType
         */
        name?: string,

        /**
         * Vanilla block ID to inherit some of the properties. Default is 0
         */
        base?: number,

        /**
         * Block material constant. Default is 3
         */
        material?: number,

        /**
         * If true, the block is not transparent. Default is false
         */
        solid?: boolean,

        /**
         * If true, all block faces are rendered, otherwise back faces are not
         * rendered (for optimization purposes). Default is false
         */
        renderallfaces?: boolean,

        /**
         * Sets render type of the block. Default is 0 (full block), use other 
         * values to change block's shape
         */
        rendertype?: number,

        /**
         * Specifies the layer that is used to render the block. Default is 4
         */
        renderlayer?: number,

        /**
         * If non-zero value is used, the block emits light of that value. 
         * Default is false, use values from 1 to 15 to set light level
         */
        lightlevel?: number,

        /**
         * Specifies how opaque the block is. Default is 0 (solid), use values 
         * from 1 to 15 to make the block opaque
         */
        lightopacity?: number,

        /**
         * Specifies how block resists to the explosions. Default value is 3
         */
        explosionres?: number,

        /**
         * Specifies how player walks on this block. The higher the friction is,
         * the more difficult it is to change speed and direction. Default value
         * is 0.6000000238418579
         */
        friction?: number,

        /**
         * Specifies the time required to destroy the block, in ticks
         */
        destroytime?: number,

        /**
         * Detirmines the way the light passes through the block, if it is not
         * opaque
         */
        translucency?: number,
    }


    /**
     * Object used to represent single block variation
     */
    interface BlockVariation {
        /**
         * Variation name, displayed as item name everywhere. Default value is
         * *"Unknown Block"*
         */
        name?: string,

        /**
         * Variation textures, array containing pairs of texture name and data.
         * Texture file should be located in items-opaque folder and its name
         * should be in the format: *name_data*, e.g. if the file name is 
         * *ignot_copper_0*, you should specifiy an array 
         * ```js 
         * ["ignot_copper", 0]
         * ```
         * There should be from one to six texture 
         * pairs in the array, if less then six variations are specified, the 
         * last texture is used for missing textures. The sides go in the 
         * following order:
         * ```js 
         * texture: [
         *   ["название1", индекс1], // bottom
         *   ["название2", индекс2], // top
         *   ["название3", индекс3], // back
         *   ["название4", индекс4], // front
         *   ["название5", индекс5], // left
         *   ["название6", индекс6]  // right
         * ]
         * ```
         */
        textures: [string, number][]

        /**
         * If true, block variation will be added to creative inventory
         */
        inCreative?: boolean,
    }

    /**
     * Function used to determine block drop
     * @param blockCoords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param blockID numeric tile id
     * @param blockData block data value
     * @param diggingLevel level of the tool the block was digged with
     * @returns block drop, the array of arrays, each containing three values: 
     * id, count and data respectively
     */
    interface DropFunction {
        (blockCoords: Callback.ItemUseCoordinates, blockID: number, blockData: number, diggingLevel: number): [number, number, number][]
    }

    /**
     * Function used to determine when block is broken by
     * environment (explosions, pistons, etc.)
     * @param blockCoords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param block information about block that is broken
     * @param f unknown floating-point param
     * @param i unknown integer param
     */
    interface PopResourcesFunction {
        (blockCoords: Vector, block: Tile, f: number, i: number): void
    }


    /**
     * Function used to determine when block is placed in the world
     * @param coords set of all coordinate values that can be useful to write 
     * custom use logics
     * @param item item that was in the player's hand when he touched the block
     * @param block block that was touched
     * @returns coordinates where to actually place the block, or void for 
     * default placement
     */
    interface PlaceFunction {
        (coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile): Vector|void
    }


    /**
     * Function used to track random block ticks
     * @param x x coordinate of the block that ticked
     * @param y y coordinate of the block that ticked
     * @param z z coordinate of the block that ticked
     * @param id block id
     * @param data block data
     */
    interface RandomTickFunction {
        (x: number, y: number, z: number, id: number, data: number): void
    }


    /**
     * Function used to track random block animation ticks
     * @param x x coordinate of the block that should be updated
     * @param y y coordinate of the block that should be updated
     * @param z z coordinate of the block that should be updated
     * @param id block id
     * @param data block data
     */
    interface AnimateTickFunction {
        (x: number, y: number, z: number, id: number, data: number): void
    }
}
/**
 * Module used to handle in-game events. When some native event occurs, all 
 * callback functions registered for this event are called. Also you can invoke
 * callback with any name manually using [[Callback.invokeCallback]] function.
 * 
 * All pre-defined callbacks with their functions interfaces are listed below.
 * If no function interface is provided, use a function with no params and 
 * return value:
 * 
 * **UI callbacks:**
 * 
 * *ContainerOpened* occurs when user opens some container. See 
 * [[ContainerOpenedFunction]] for details
 * 
 * *ContainerClosed* occurs when some container is closed. See
 * [[ContainerClosedFunction]] for details
 * 
 * *CustomWindowOpened* occurs when every single window is opened. Called for 
 * every window and subwindow. Examples of subwindows include standard 
 * inventory, window title, main window, etc. See [[CustomWindowOpenedFunction]]
 * for details
 * 
 * *CustomWindowClosed* occurs when every single window is closed. See 
 * [[CustomWindowClosedFunction]] for details
 * 
 * 
 * **Workbench callbacks:**
 * 
 * *CraftRecipePreProvided* occurs befor crafting is performed. See 
 * [[CraftRecipePreProvidedFunction]] for details
 * 
 * *CraftRecipeProvided* occurs afrer crafting recipe result is determined. See 
 * [[CraftRecipeProvidedFunction]] for details
 * 
 * *VanillaWorkbenchCraft* occurs just before adding crafting recipe result to 
 * player's inventory. See [[VanillaWorkbenchCraftFunction]] for details
 * 
 * *VanillaWorkbenchPostCraft* occurs after adding crafting recipe result to 
 * player's inventory. See [[VanillaWorkbenchCraftFunction]] for details
 * 
 * *VanillaWorkbenchRecipeSelected* occurs when player selects recipe in the 
 * workbench. See [[VanillaWorkbenchRecipeSelectedFunction]] for details
 * 
 * 
 * **Inner Core and Core Engine callbacks:**
 * 
 * *CoreConfigured* occurs when Inner Core default configuration file is loaded. 
 * See [[CoreConfiguredFunction]] for details
 * 
 * *PreLoaded* occurs directly after "CoreConfigured" callback
 * 
 * *APILoaded* occurs directly after "PreLoaded" callback
 * 
 * *ModsLoaded* occurs directly after "APILoaded" callback
 * 
 * *PostLoaded* occurs directly after "ModsLoaded" callback. Last of the loading
 * callbacks
 * 
 * *AppSuspended* occurs when Minecraft application is paused
 * 
 * *NativeGuiChanged* occurs when vanilla screen changes. See 
 * [[NativeGuiChangedFunction]] for details
 * 
 * *ReadSaves* occurs when reading saves from global scope. See 
 * [[SavesFunction]] for details
 * 
 * *WriteSaves* occurs when writing saves to global scope. See 
 * [[SavesFunction]] for details
 * 
 * 
 * **Worlds and dimensions callbacks:**
 * 
 * *tick* is main game tick. This callback is called 20 times per second and is
 * used to define all dynamic events in the game. Avoid overloading tick 
 * functions and use [[Updatable]]s and [[TileEntity]]s when posssible
 * 
 * *LevelSelected* occurs when the level is selected and will be loaded. See 
 * [[LevelSelectedFunction]] for details
 * 
 * *LevelCreated* occurs when level is created in the memory of the device
 * 
 * *LevelDisplayed* occurs when level is displayed to the player
 * 
 * *LevelPreLoaded* occurs before some level initialization
 * 
 * *LevelLoaded* occurs when level is completely loaded and is ready to be 
 * displayed to the player
 * 
 * *DimensionLoaded* occurs when vanilla or custom dimension is loaded. See 
 * [[DimensionLoadedFunction]] for details
 * 
 * *LevelPreLeft* occurs when player starts leaving world
 *  
 * *LevelLeft* occurs when player completes leaving world
 * 
 * *PreBlocksDefined* occurs before saving block data while loading world
 * 
 * *BlocksDefined* occurs after saving block data while loading world
 * 
 * 
 * **Player actions callbacks:**
 * 
 * *DestroyBlock* occurs when player breaks block. See [[DestroyBlockFunction]]
 * for details
 * 
 * *DestroyBlockStart* occurs when player starts breaking block. Has the same 
 * parameters as "DestroyBlock" callback, see [[DestroyBlockFunction]] for 
 * details
 * 
 * *DestroyBlockContinue* occurs when player continues breaking block. Occurs 
 * several times during one block breaking. See [[DestroyBlockContinueFunction]] 
 * for details
 * 
 * *BuildBlock* occurs when player places block somewhere in the world. See 
 * [[BuildBlockFunction]] for details
 * 
 * *BlockChanged* occurs when block changes in the world. To capture this event 
 * you should register blocks that you need to watch using 
 * [[World.setBlockChangeCallbackEnabled]] method. All block changes that are 
 * related to the registered blocks trigger this event. See 
 * [[BlockChangedFunction]] for details
 * 
 * *ItemUse* occurs when player uses item on some block. Doesn't work if vanilla
 * container is opened (e.g. chest, workbench, etc.). Use "ItemUseLocalServer" 
 * to track such events instead. See [[ItemUseFunction]] for details
 * 
 * *ItemUseLocalServer* occurs when player uses some item on the local server. 
 * Can be used to prevent vanilla container from opening. See 
 * [[ItemUseFunction]] for details
 * 
 * *FoodEaten* occurs when player eats food. See [[FoodEatenFunction]] for 
 * details
 * 
 * *ExpAdd* occurs when player gains some experience. See [[ExpAddFunciton]]
 * for details
 * 
 * *ExpLevelAdd* occurs when player gains some experience levels. See 
 * [[ExpLevelAddFunciton]] for details
 * 
 * *NativeCommand* occurs when player enters some command. See 
 * [[NativeCommandFunciton]] for details
 * 
 * *PlayerAttack* occurs when player attacks some entity. See 
 * [[PlayerAttackFunction]] for details
 * 
 * *EntityInteract* occurs when player longclick some entity (interacts with 
 * it). See [[EntityInteractFunction]] for details
 * 
 * *ItemUseNoTarget* occurs when an item is used in the air. See 
 * [[ItemUseNoTargetFunction]] for details
 * 
 * *ItemUsingReleased* occurs when player doesn't complete using item that has 
 * maximum use time set with [[Item.setMaxUseDuration]] funciton. See 
 * [[ItemUsingReleasedFunction]] for details
 * 
 * *ItemUsingComplete* when player completes using item that has maximum use 
 * time set with [[Item.setMaxUseDuration]] funciton. See 
 * [[ItemUsingCompleteFunction]] for details
 * 
 * 
 * **Entities and environment callbacks:**
 * 
 * *Explosion* occurs when something is exploded in the world. See 
 * [[ExplosionFunction]] for details
 * 
 * *EntityAdded* occurs when an entity is added in the world. See 
 * [[EntityAddedFunction]] for details
 * 
 * *EntityRemoved* occurs when an entity is removed from the world. See 
 * [[EntityRemovedFunction]] for details
 * 
 * *EntityDeath* occurs when an entity dies. See [[EntityDeathFunction]] for
 * details
 * 
 * *EntityHurt* occurs when an entity is hurt. See [[EntityHurtFunction]] for 
 * details
 * 
 * *ProjectileHit* occurs when a projectile entity hits entity or block. See
 * [[ProjectileHitFunction]] for details
 * 
 * 
 * **Items and blocks callbacks:**
 * 
 * *RedstoneSignal* occurs when redstone signal changes on the specified 
 * coordinates. To register block as redstone consumer, use 
 * [[Block.setRedstoneTile]] function. See [[RedstoneSignalFunction]] for 
 * details
 * 
 * *PopBlockResources* occurs when block is desroyed somehow (not by player).
 * See [[PopBlockResourcesFunction]] for details
 * 
 * *CustomBlockTessellation*
 * 
 * *ItemIconOverride* occurs when displaying item somewhere to override item's 
 * icon. You can use it to change item's icon depending on some item state. See
 * [[ItemIconOverrideFunction]] for details
 * 
 * *ItemNameOverride* occurs when displaying item name to override it. You can 
 * use it to display item charge, status, etc. See [[ItemNameOverrideFunction]] 
 * for details
 * 
 * *ItemDispensed* occurs when an item is dispenced using dispenser. See 
 * [ItemDispensedFunction]] for details
 * 
 * 
 * **Generation callbacks:**
 * 
 * *GenerateChunk* occurs when generating chunk in overworld. Shoud be
 * used for all generation process. See [[GenerateChunkFunction]] for details
 * 
 * *GenerateChunkUnderground* occurs when generating chunk's underground in 
 * overworld. Can be used for all underground generation process (though it is 
 * OK to use "GenerateChunk" for it as well). See [[GenerateChunkFunction]] for 
 * details
 * 
 * *GenerateNetherChunk* occurs when generating chunk in neather world. 
 * See [[GenerateChunkFunction]] for details
 * 
 * *GenerateEndChunk* occurs when generating chunk in end world. See
 * [[GenerateChunkFunction]] for details
 * 
 */
declare namespace Callback {

    /**
     * Adds callback function for the specified callback name. Most of native 
     * events can be prevented using [[Game.prevent]] call.
     * @param name callback name, should be one of the pre-defined or a custom
     * name if invoked via [[Callback.invokeCallback]]
     * @param func function to be called when an event occures
     */
    function addCallback(name: string, func: Function): void;

    /**
     * Invokes callback with any name and up to 10 additional parameters. You
     * should not generally call pre-defined callbacks until you really need to 
     * do so. If you want to trigger some event in your mode, use your own 
     * callback names
     * @param name callback name
     */
    function invokeCallback(name: string, o1?: any, o2?: any, o3?: any, o4?: any, o5?: any, o6?: any, o7?: any, o8?: any, o9?: any, o10?: any): void;


    /**
     * Function used in "CraftRecipePreProvided" callback
     * @param recipe object containing recipe information
     * @param field object containing crafting field information
     */
    interface CraftRecipePreProvidedFunction {
        (recipe: Recipes.WorkbenchRecipe, field: Recipes.WorkbenchField): void
    }

    /**
     * Function used in "CraftRecipeProvided" callback
     * @param recipe object containing recipe information
     * @param field object containing crafting field information
     * @param isPrevented if true, recipe was prevented by craft function
     */
    interface CraftRecipeProvidedFunction {
        (recipe: Recipes.WorkbenchRecipe, field: Recipes.WorkbenchField, isPrevented: boolean): void
    }


    /**
     * Function used in "VanillaWorkbenchCraft" and "VanillaWorkbenchPostCraft" 
     * callbacks
     * @param result recipe result item
     * @param workbenchContainer workbench container instance
     */
    interface VanillaWorkbenchCraftFunction {
        (result: ItemInstance, workbenchContainer: UI.Container): void
    }


    /**
     * Function used in "VanillaWorkbenchRecipeSelected" callback
     * @param recipe object containing recipe information
     * @param result recipe result item
     * @param workbenchContainer workbench container instance
     */
    interface VanillaWorkbenchRecipeSelectedFunction {
        (recipe: Recipes.WorkbenchRecipe, result: ItemInstance, workbenchContainer: UI.Container)
    }


    /**
     * Function used in "ContainerClosed" callback
     * @param container container that was closed
     * @param window window that was loaded in the container
     * @param byUser if true, container was closed by user, from the code 
     * otherwise
     */
    interface ContainerClosedFunction {
        (container: UI.Container, window: UI.IWindow, byUser: boolean): void
    }


    /**
     * Function used in "ContainerOpened" callback
     * @param container container that was opened
     * @param window window that was loaded in the container
     */
    interface ContainerOpenedFunction {
        (container: UI.Container, window: UI.IWindow): void
    }


    /**
     * Funciton used in "CustomWindowOpened" callback
     * @param window window that was opened
     */
    interface CustomWindowOpenedFunction {
        (window: UI.IWindow): void;
    }

    
    /**
     * Funciton used in "CustomWindowClosed" callback
     * @param window window that was closed
     */
    interface CustomWindowClosedFunction {
        (window: UI.IWindow): void;
    }


    /**
     * Function used in "CoreConfigured" callback
     * @param config Inner Core default config instance
     */
    interface CoreConfiguredFunction {
        (config: Config): void;
    }


    /**
     * Function used in "LevelSelected" callback
     * @param worldName name of the selected world
     * @param worldDir name of the directory where the world is stored. Worlds
     * directories are located at games/horizon/minecraftWorlds/
     */
    interface LevelSelectedFunction {
        (worldName: string, worldDir: string): void
    }


    /**
     * Function used in "DimensionLoaded" callback
     * @param dimension vanilla dimension id, one of the [[Native.Dimension]]
     * values, or custom dimension id
     */
    interface DimensionLoadedFunction {
        (dimension: number): void
    }


    /**
     * Function used in "DestroyBlock" and "DestroyBlockStart" callbacks
     * @param coords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param block block that is destroyed
     * @param player player entity unique numeric id
     */
    interface DestroyBlockFunction {
        (coords: ItemUseCoordinates, block: Tile, player: number): void
    }


    /**
     * Function used in "DestroyBlockContinue" callback 
     * @param coords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param block block that is destroyed
     * @param progress current fraction of breaking progress
     */
    interface DestroyBlockContinueFunction {
        (coords: ItemUseCoordinates, block: Tile, progress: number): void
    }


    /**
     * Function used in "BuildBlock" callback
     * @param coords coordinates where the block is placed and side from
     * where it is placed
     * @param block block that is placed
     * @param player player entity unique numeric id
     */
    interface BuildBlockFunction {
        (coords: ItemUseCoordinates, block: Tile, player: number): void
    }

    /**
     * Function used in "BlockChanged" callback
     * @param coords coordinates where block change occured
     * @param oldBlock the block that is being replaced 
     * @param newBlock replacement block
     * @param i1 some integer
     * @param i2 some integer
     */
    interface BlockChangedFunction {
        (coords: Vector, oldBlock: Tile, newBlock: Tile, i1: number, i2: number): void
    }


    /**
     * Function used in "ItemUse" and "ItemUseLocalServer" callbacks
     * @param coords set of all coordinate values that can be useful to write 
     * custom use logics
     * @param item item that was in the player's hand when he touched the block
     * @param block block that was touched
     * @param isExternal if true, the event was triggerd by the remote player,
     * else by local player
     */
    interface ItemUseFunction {
        (coords: ItemUseCoordinates, item: ItemInstance, block: Tile, isExternal: boolean|undefined): void
    }

    /**
     * Function used in "Explosion" callback
     * @param coords coordinates of the explosion
     * @param params additional explosion data
     * @param params.power explosion power
     * @param params.entity if explosion is produced by an entity, entity unique
     * id, -1 otherwise
     * @param onFire if true, explosion produced the fire
     * @param someBool some boolean value
     * @param someFloat some floating point value
     */
    interface ExplosionFunction {
        (coords: Vector, params: {power: number, entity: number, onFire: boolean, someBool: boolean, someFloat: number}): void
    }

    /**
     * Function used in the "FoodEaten" callback. You can use 
     * [[Player.getCarriedItem]] to get info about food item
     * @param food food amount produced by eaten food
     * @param ratio saturation ratio produced by food
     */
    interface FoodEatenFunction {
        (food: number, ratio: number): void
    }

    /**
     * Function used in "ExpAdd" callback
     * @param exp amount of experience to be added 
     */
    interface ExpAddFunciton {
        (exp: number): void
    }

    /**
     * Function used in "ExpLevelAdd" callback
     * @param level amount of levels to be added 
     */
    interface ExpLevelAddFunciton {
        (level: number): void
    }

    /**
     * Function used in "NativeCommand" callback
     * @param command command that was entered or null if no command was 
     * provided
     */
    interface NativeCommandFunciton {
        (command: string|null): void
    }

    /**
     * Function used in "PlayerAttack" callback
     * @param attacker player entity unique id
     * @param victim attacked entity unique id
     */
    interface PlayerAttackFunction {
        (attacker: number, victim: number): void
    }

    /**
     * Function used in "EntityAdded" callback
     * @param entity entity unique id
     */
    interface EntityAddedFunction {
        (entity: number): void
    }


    /**
     * Function used in "EntityRemoved" callback
     * @param entity entity unique id
     */
    interface EntityRemovedFunction {
        (entity: number): void
    }

    /**
     * Function used in "EntityDeath" callback
     * @param entity entity that is dead
     * @param attacker if the entity was killed by another entity, attacker's 
     * entity unique id, -1 otherwise
     * @param damageType damage source id
     */
    interface EntityDeathFunction {
        (entity: number, attacker: number, damageType: number): void
    }

    
    /**
     * Function used in "EntityHurt" callback
     * @param attacker if an entity was hurt by another entity, attacker's 
     * unique id, -1 otherwise
     * @param entity entity that is hurt
     * @param damageValue amount of damage produced to entity
     * @param damageType damage source id
     * @param someBool1 some boolean value
     * @param someBool2 some boolean value
     */
    interface EntityHurtFunction {
        (attacker: number, entity: number, damageValue: number, damageType: number, someBool1: boolean, someBool2: boolean): void
    }


    /**
     * Function used in "EntityInteract" callback
     * @param entity entity unique id
     * @param player player entity unique id
     */
    interface EntityInteractFunction {
        (entity: number, player: number): void
    }


    /**
     * Function used in "ProjectileHit" callback
     * @param projectile projectile entity unique ID
     * @param item projectile item
     * @param target object containing hit coordinates and information about 
     * hit entity/block
     */
    interface ProjectileHitFunction {
        (projectile: number, item: ItemInstance, target: ProjectileHitTarget): void
    }


    /**
     * Function used in "RedstoneSignal" callback
     * @param coords coordinates where redstone signal changed
     * @param params information about redstone signal
     * @param params.power redstone signal power
     * @param params.signal same as params.power
     * @param params.onLoad always true
     * @param block information aboit the block on the specified coordinates
     */
    interface RedstoneSignalFunction {
        (coords: Vector, params: {power: number, signal: number, onLoad: boolean}, block: Tile): void
    }

    
    /**
     * Funciton used in "PopBlockResources" callback
     * @param coords coordinates of the block that was broken
     * @param block information about the block that was broken
     * @param f some floating point value
     * @param i some integer value
     */
    interface PopBlockResourcesFunction {
        (coords: Vector, block: Tile, f: number, i: number): void
    }


    /**
     * Function used in "ItemIconOverride" callback
     * @param item information about item that is used in override function
     * @returns void if used in callback, [[Item.TextureData]] if used in item 
     * override function to return texture that will be used for the item
     */
    interface ItemIconOverrideFunction {
        (item: ItemInstance): void|Item.TextureData
    }


    /**
     * Function used in "ItemNameOverride" callback
     * @param item information about item that is used in override function
     * @param translation translated item name
     * @param name original item name
     * @returns void if used in callback, string if used in item override 
     * function to return new name that will be displayed
     */
    interface ItemNameOverrideFunction {
        (item: ItemInstance, translation: string, name: string): void|string;
    }    


    /**
     * Function used in "ItemUseNoTarget" callback
     * @param item item that was in the player's hand when the event occured
     * @param ticks amount of ticks player kept touching screen
     */
    interface ItemUseNoTargetFunction {
        (item: ItemInstance, ticks: number): void
    }


    /**
     * Function used in "ItemUsingReleased" callback
     * @param item item that was in the player's hand when the event occured
     * @param ticks amount of ticks left to the specified max use duration value
     */
    interface ItemUsingReleasedFunction {
        (item: ItemInstance, ticks: number): void
    }


    /**
     * Function used in "ItemUsingComplete" callback
     * @param item item that was in the player's hand when the event occured
     */
    interface ItemUsingCompleteFunction {
        (item: ItemInstance): void
    }


    /**
     * Function used in "ItemDispensed" callback
     * @param coords coordinates of the spawned drop item entity
     * @param item item that was dispensed
     */
    interface ItemDispensedFunction {
        (coords: ItemUseCoordinates, item: ItemInstance): void
    }


    /**
     * Function used in "NativeGuiChanged" callback
     * @param name current screen name
     * @param lastName previous screen name
     * @param isPushEvent if true, the new screen was pushed on the Minecraft 
     * screens stack, poped from the stack otherwise
     */
    interface NativeGuiChangedFunction {
        (name: string, lastName: string, isPushEvent: string): void
    }


    /**
     * Function used in all generation callbacks
     * @param chunkX chunk X coordinate. Multiply by 16 to receive corner block 
     * coordinates
     * @param chunkY chunk Y coordinate. Multiply by 16 to receive corner block 
     * coordinates
     * @param random java.util.Random object that should be used for generation
     * process. Already seeded by appropriate values
     */
    interface GenerateChunkFunction {
        (chunkX: number, chunkZ: number, random: java.util.Random): void
    }


    /**
     * Function used in "ReadSaves" and "WriteSaves" callbacks
     * Avoid modifying values directly, consider using [[Saver]] instead
     */
    interface SavesFunction {
        (globalScope: object): void
    }


    /**
     * Object containing hit coordinates and information about hit entity/block
     */
    interface ProjectileHitTarget {
        /**
         * Exact hit position x 
         */
        x: number, 
        /**
         * Exact hit position y
         */
        y: number, 
        /**
         * Exact hit position z
         */
        z: number,
        /**
         * If an entity was hit, entity unique id, -1 otherwise
         */
        entity: number,
        /**
         * Coordinates and side of the hit block or null if an entity was hit
         */
        coords: null|ItemUseCoordinates
    } 
    
    /**
     * Object used in some callbacks for coordinate set with side information 
     * and relative coordinates set
     */
    interface ItemUseCoordinates extends BlockPosition {
        /**
         * Relative coordinates, coordinates of the block to the specified side 
         * of current block
         */
        relative: Vector,
        /**
         * Exact touch point, absolute point coordinates. Used only in "ItemUse"
         * callback
         */
        vec?: Vector
    }
}

/**
 * Namespace used to manipulate minecraft commands
 */
declare namespace Commands {
    /**
     * Executes specified command
     * @param command command to be executed
     * @returns error message or null if the command was run successfully 
     */
    function exec(command: string): string|null;

    /**
     * Executes specified command using specified coordinates as command 
     * location for all relative calculations
     * @param command command to be executed
     * @returns error message or null if the command was run successfully 
     */
    function execAt(command: string, x: number, y: number, z: number): string|null;
}
/**
 * Json configuration file reading/writing utility
 */
declare class Config {
    /**
     * Creates new Config instance using specified file
     * @param path path to configuration file
     */
    public constructor(path: string);
    
    /**
     * Creates new Config instance using specified file
     * @param path java.io.File instance of the file to use
     */
    public constructor(file: java.io.File);

    /**
     * Writes configuration JSON to the file
     */
    public save(): void;

    /**
     * @returns java.util.ArrayList instance containing all the names in the 
     * current config file 
     */
    public getNames(): java.util.ArrayList<string>;
    
    /**
     * Gets property from the config
     * 
     * Example: 
     * ```ts
     * config.get("generation.ore_copper.max_height");
     * ```
     * 
     * @param name option name, supports multi-layer calls, separated by '.'
     * @returns [[Config]] instance with current config as parent if the 
     * property is object, org.json.JSONArray instance if the property is an 
     * array, raw type if the property is of that raw type, null otherwise
     */
    public get(name: string): Config|org.json.JSONArray|boolean|number|string|null;

    /**
     * Same as [[Config.get]]
     */
    public access(name: string): Config|org.json.JSONArray|boolean|number|string|null;

    /**
     * @param name option name, supports multi-layer calls, separated by '.'
     * @return boolean config value specified in config or false if no value was
     * specified
     */
    public getBool(name: string): boolean;

    /**
     * @param name option name, supports multi-layer calls, separated by '.'
     * @return number config value specified in config or 0 if no value was
     * specified
     */
    public getNumber(name: string): number;

    /**
     * @param name option name, supports multi-layer calls, separated by '.'
     * @return string config value specified in config or null if no value was
     * specified
     */
    public getString(name: string): string|null;

    /**
     * Sets config value. Do not use org.json.JSONObject instances to create 
     * nested objects, consider using dot-separated names instead
     * @param name option name, supports multi-layer calls, separated by '.'
     * @param value value, may be org.json.JSONArray instance, 
     * org.json.JSONObject instance or raw data type
     */
    public set(name: string, value: org.json.JSONObject|boolean|number|string): boolean;

    /**
     * @param name option name, supports multi-layer calls, separated by '.'
     * @returns editable [[Config.ConfigValue]] instance that can be used to 
     * manipulate this config option separately
     */
    public getValue(name: string): Config.ConfigValue;

    /**
     * Ensures that config has all the properties the data pattern contains, if
     * not, puts default values to match the pattern
     * @param data string representation of data pattern
     */
    public checkAndRestore(data: string): void;

    /**
     * Ensures that config has all the properties the data pattern contains, if
     * not, puts default values to match the pattern
     * @param data javascript object representing the data patterncheckAndRestore
     */
    public checkAndRestore(data: object): void;

    /**
     * Ensures that config has all the properties the data pattern contains, if
     * not, puts default values to match the pattern
     * @param data org.json.JSONObject instance to be used as data pattern
     */
    public checkAndRestore(data: org.json.JSONObject): void;
}


declare namespace Config {
    /**
     * Class representing config value with its path withing Config object
     */
    class ConfigValue {
        /**
         * Sets config value and saves configuration file
         * @param value value, may be org.json.JSONArray instance, 
         * org.json.JSONObject instance or raw data type
         */
        public set(value: org.json.JSONObject|boolean|number|string): void;

        /**
         * @returns config value, result is the same as the result of 
         * [[Config.get]] call
         */
        public get(): Config|org.json.JSONObject|boolean|number|string|null;

        /**
         * @returns readable config value name representation along with class 
         * name
         */
        public toString(): string;
    }
}
declare namespace TileEntity {
    namespace tileEntityPrototypes {}
    namespace tileEntityList {}

    function resetEngine(): any;

    function registerPrototype(blockID: any, customPrototype: any): any;

    function getPrototype(blockID: any): any;

    function isTileEntityBlock(blockID: any): any;

    function createTileEntityForPrototype(Prototype: any, addToUpdate: any): any;

    function addTileEntity(x: number, y: number, z: number): any;

    function addUpdatableAsTileEntity(updatable: any): any;

    function getTileEntity(x: number, y: number, z: number): any;

    function destroyTileEntity(tileEntity: number): any;

    function destroyTileEntityAtCoords(x: number, y: number, z: number): any;

    function isTileEntityLoaded(tileEntity: number): any;

    function checkTileEntityForIndex(index: number): any;

    function CheckTileEntities(): any;

    function DeployDestroyChecker(tileEntity: number): any;
}
declare namespace MobRegistry {
    namespace customEntities {}
    namespace loadedEntities {}

    function registerEntity(name: any): any;

    function registerUpdatableAsEntity(updatable: any): any;

    function spawnEntityAsPrototype(typeName: any, coords: any, extraData: any): any;

    function getEntityUpdatable(entity: number): any;

    function registerNativeEntity(entity: number): any;

    function registerEntityRemove(entity: number): any;

    function resetEngine(): any;
}
declare namespace MobSpawnRegistry {
    namespace spawnData {}

    function registerSpawn(entityType: any, rarity: number, condition: any, denyNaturalDespawn: any): any;

    function getRandomSpawn(rarityMultiplier: any): any;

    function getRandPosition(): any;

    function executeSpawn(spawn: any, position: any): any;
    var counter: number;

    function tick(): any;

    function onChunkGenerated(x: number, z: number): any;
}
declare function GameObject(name: any, Prototype: any): any;
declare namespace GameObjectRegistry {
    namespace gameObjectTypes {}
    namespace activeGameObjects {}

    function genUniqueName(name: any): any;

    function registerClass(gameObjectClass: any): any;

    function deployGameObject(gameobject: any): any;

    function addGameObject(gameobject: any): any;

    function removeGameObject(gameobject: any): any;

    function resetEngine(): any;

    function getAllByType(type: any, clone: any): any;

    function callForType(): any;

    function callForTypeSafe(): any;
}
declare function Render(params: any): any;
declare class Texture {}
declare function EntityModel(parentModel: any): any;
declare function EntityModelWatcher(entity: number, model: any): any;
declare function EntityAIWatcher(customPrototype: any): any;

declare namespace Animation {
    function base(x: number, y: number, z: number): any;

    function Base(x: number, y: number, z: number): any;

    function item(x: number, y: number, z: number): any;

    function Item(x: number, y: number, z: number): any;
}
declare namespace Particles {}
declare namespace IDRegistry {}
declare namespace IDData {
    namespace item {}
    namespace block {}
}
declare namespace BlockRenderer {}
declare namespace ICRender {}
declare namespace LiquidRegistry {
    var liquidStorageSaverId: number;
    namespace liquids {
        namespace water {
            var key: string;
            var name: string;
            namespace uiTextures {}
            namespace uiCache {}
            namespace modelTextures {}

            function addUITexture(name: any): any;

            function addModelTexture(name: any): any;
        }
        namespace lava {
            var key: string;
            var name: string;
            namespace uiTextures {}
            namespace uiCache {}
            namespace modelTextures {}

            function addUITexture(name: any): any;

            function addModelTexture(name: any): any;
        }
        namespace milk {
            var key: string;
            var name: string;
            namespace uiTextures {}
            namespace uiCache {}
            namespace modelTextures {}

            function addUITexture(name: any): any;

            function addModelTexture(name: any): any;
        }
    }

    function registerLiquid(key: number, name: any, uiTextures: any, modelTextures: any): any;

    function getLiquidData(key: number): any;

    function isExists(key: number): any;

    function getLiquidName(key: number): any;

    function getLiquidUITexture(key: number, width: any, height: any): any;

    function getLiquidUIBitmap(key: number, width: any, height: any): any;
    namespace FullByEmpty {}
    namespace EmptyByFull {}

    function registerItem(liquid: any, empty: number, full: any): any;

    function getEmptyItem(id: number, data: number): any;

    function getItemLiquid(id: number, data: number): any;

    function getFullItem(id: number, data: number, liquid: any): any;

    function Storage(tileEntity: number): any;
}
declare function ItemExtraData(): any;
declare function RenderMesh(): any;
/**
 * Empty function used to verify Rhino functionality. Should not be called by 
 * hand
 */
declare function __debug_typecheck__(): void;

/**
 * Runs custom source in the specified context by its name. Define custom 
 * sources using *"sourceType": "custom"* for the source in your *build.config*.
 * @param name path to the executable. Can be built the way built-in source 
 * types are built
 * @param scope additional scope to be added to the current context
 */
declare function runCustomSource(name: string, scope?: object): void;

/**
 * Object containing string custom block string ids as keys and their numeric
 * ids as values
 */
declare const BlockID: object;

/**
 * Object containing string custom block string ids as keys and their numeric
 * ids as values
 */
declare const ItemID: object;

/**
 * Same as [[IMPORT]], consider using [[IMPORT]] instead 
 */
declare function importLib(name: string, value?: string): void;

/**
 * Imports library dependency. Libraries should be stored in the *"libraryDir"* 
 * directory, specified in your *build.config*. You can either import the whole
 * library or single function/value using value parameter
 * @param name library name specified in the library's EXPORT declaration
 * @param value name of the function or value you wish to import, or "*" to 
 * import the whole library. Defaults to importing the whole library
 */
declare function IMPORT(name: string, value?: string): void;

/**
 * Injects methods from C++ into the target object to use in the mod
 * @param name name of the module, as registered from native code
 * @param target target object, where all the methods from native module will be 
 * injected
 */
declare function IMPORT_NATIVE(name: string, target: object): any;

/**
 * Allows to create new JS modules imported from C++ code and use it in the mod
 * @param name name of the module, as registered from native code
 * @returns js module, implemented in native (C++) code 
 */
declare function WRAP_NATIVE(name: string): object;

/**
 * @returns current Core Engine API level
 */
declare function getCoreAPILevel(): number;

/**
 * Runs specified funciton in the main thread
 * @param func function to be run in the main thread
 */
declare function runOnMainThread(func: () => void): void;

/**
 * @returns minecraft version information in some readable form
 * 
 */
declare function getMCPEVersion(): 
/**
 * @param str string version representation, three dot-separated numbers
 * @param array array containing three version numbers
 * @param main version number, calculated as *array[0] * 17 + array[1]*
 */
{str: string, array: number[], main: number};

/**
 * 
 * @param arg 
 */
declare function alert(arg: string): any;


declare function LIBRARY(description: object): void;


declare function EXPORT(name: string, lib: any): void;
/**
 * Defines some useful methods for debugging
 */
declare namespace Debug {
    /**
     * @returns current system time in milliseconds
     */
    function sysTime(): number;

    /**
     * Spawns vanilla debug particle on the specified coordinates
     * @param id particle type id, should be one of the [[Native.ParticleType]]
     * @param vx x velocity
     * @param vy y velocity
     * @param vz y velocity
     * @param data additional particles data
     */
    function addParticle(id: number, x: number, y: number, z: number, vx: number, vy: number, vz: number, data: number): void;

    /**
     * Writes general debug message (in green) to the chat
     * @param message message to be displayed
     */
    function message(message: string): void;

    /**
     * Writes warning debug message (in gold) to the chat
     * @param message message to be displayed
     */
    function warning(message: string): void;

    /**
     * Writes error debug message (in red) to the chat
     * @param message message to be displayed
     */
    function error(message: string): void;

    /**
     * Writes several comma-separated values to the chat as a general debug 
     * message, serializing javascript objects if possible
     * @param args message to be displayed
     */
    function m(...args: any[]): void;

    /**
     * Diaplays an AlertDialog with given title and bitmap
     * @param bitmap android.graphics.Bitmap object of the bitmap to be 
     * displayed
     * @param title title of the AlertDialog
     */
    function bitmap(bitmap: android.graphics.Bitmap, title: string): void;
}

/**
 * Type used to mark Java bytes
 */
type jbyte = number;

/**
 * Object representing the set of coordinates in the three-dimensional world
 */
interface Vector {
    x: number,
    y: number,
    z: number
}

/**
 * Object representing coordinate set with side data
 */
interface BlockPosition extends Vector {
    /**
     * Side of the block, one of the [[Native.BlockSide]] constants
     */
    side: number
}

/**
 * Object representing RGB color
 */
interface Color {
    r: number,
    g: number,
    b: number
}

/**
 * Object representing pitch/yaw angle set
 */
interface LookAngle {
    pitch: number,
    yaw: number
}

/**
 * Object representing item instance in the inventory
 */
interface ItemInstance {
    id: number,
    count: number, 
    /**
     * Item data value. Generally specifies some property of the item, e.g. 
     * color, material, etc. Defaults to 0, in many cases -1 means "any data 
     * value"
     */
    data: number,

    /**
     * Item extra data. Contains some additional item data such as enchants, 
     * custom item name or some additional properties
     */
    extra?: ItemExtra
}

/**
 * Array of theee elements representing item id, count and data respectively. 
 * Used in many old functions and when extra data is not required
 */
type ItemInstanceArray = number[];

/**
 * Class representing item extra data
 */
declare class ItemExtra {

}

/**
 * Object representing block in the world
 */
interface Tile {
    id: number,
    data: number
}

/**
 * Object representing current weather in the world
 */
interface Weather {
    /**
     * Current rain level, from 0 (no rain) to 10 (heavy rain)
     */
    rain: number,
    /**
     * Current lightning level, from 0 (no ligntning) to 10
     */
    thunder: number
}

/**
 * Class representing TileEntity in the worls
 */
declare class TileEntity {

}

declare class NativeTileEntity {

}

declare class CustomEntity {

}

/**
 * Namespace used to create and manipulate custom dimensions
 */
declare namespace Dimensions {
    /**
     * Class representing custom dimension
     */
    class CustomDimension {
        /**
         * Constructs a new dimension with specified name and preffered 
         * @param name dimension name, can be used to get dimension via 
         * [[CustomDimension.getDimensionByName]] call
         * @param preferedId prefered dimension id. If id is already occupied 
         * by some another dimension, constructor will look for the next empty
         * dimension id and assign it to the current dimension
         */
        constructor(name: string, preferedId: number);

        /**
         * Custom dimension id
         */
        id: number;

        /**
         * Sets custom landscape generator
         * @param generator custom landscape generator used for current 
         * dimension
         * @returns reference to itself to be used in sequential calls
         */
        setGenerator(generator: CustomGenerator): CustomDimension;

        /**
         * Specifies whether the sky produces light (like in overworld) or not 
         * (like in the End or Nether). By default this value is true
         * @param hasSkyLight if true, the sky produces light in the dimension
         * @returns reference to itself to be used in sequential calls
         */
        setHasSkyLight(hasSkyLight: boolean): CustomDimension;

        /**
         * @returns whether the sky produces light in the current dimension
         */
        hasSkyLight(): boolean;

        /**
         * Sets sky color for the dimension in the RGB format. Default 
         * color is as in the Overworld
         * @param r red color component, value from 0 to 1
         * @param g green color component, value from 0 to 1
         * @param b blue color component, value from 0 to 1
         * @returns reference to itself to be used in sequential calls
         */
        setSkyColor(r: number, g: number, b: number): CustomDimension;

        /**
         * Resets sky color to the default value
         * @returns reference to itself to be used in sequential calls
         */
        resetSkyColor(): CustomDimension;

        /**
         * Sets fog color for the dimension in the RGB format. Default 
         * color is as in the Overworld
         * @param r red color component, value from 0 to 1
         * @param g green color component, value from 0 to 1
         * @param b blue color component, value from 0 to 1
         * @returns reference to itself to be used in sequential calls
         */
        setFogColor(r: number, g: number, b: number): CustomDimension;

        /**
         * Resets fog color to the default value
         * @returns reference to itself to be used in sequential calls
         */
        resetFogColor(): CustomDimension;

        /**
         * Sets clouds color for the dimension in the RGB format. Default 
         * color is as in the Overworld
         * @param r red color component, value from 0 to 1
         * @param g green color component, value from 0 to 1
         * @param b blue color component, value from 0 to 1
         * @returns reference to itself to be used in sequential calls
         */
        setCloudColor(r: number, g: number, b: number): CustomDimension;

        /**
         * Resets clouds color to the default value
         * @returns reference to itself to be used in sequential calls
         */
        resetCloudColor(): CustomDimension;

        /**
         * Sets sunset sky color for the dimension in the RGB format. Default 
         * color is as in the Overworld
         * @param r red color component, value from 0 to 1
         * @param g green color component, value from 0 to 1
         * @param b blue color component, value from 0 to 1
         * @returns reference to itself to be used in sequential calls
         */
        setSunsetColor(r: number, g: number, b: number): CustomDimension;

        /**
         * Resets sunset sky color to the default value
         * @returns reference to itself to be used in sequential calls
         */
        resetSunsetColor(): CustomDimension;
    }

    /**
     * Class representing landscape generator used for the dimension
     */
    class CustomGenerator {
        /**
         * Creates a new [[CustomGenerator]] instance using specified base type
         * @param baseType base generator type constant, can be from 0 to 4. 0 
         * and 1 represent overworld generator, 2 represents flat world 
         * generator, 3 represents nether generator and 4 represents end 
         * generator
         */
        constructor(baseType: number);

        /**
         * Specifies whether to use vanilla biome surface cover blocks (grass, 
         * sand, podzol, etc.)
         * @param value if true, vanilla surface will be generated, default 
         * value is false
         * @returns reference to itself to be used in sequential calls
         */
        setBuildVanillaSurfaces(value: boolean): CustomGenerator;

        /**
         * Specifies whether to generate minecraft vanilla structures
         * @param value if true, vanilla structures will be generated, default
         * value is false
         * @returns reference to itself to be used in sequential calls
         */
        setGenerateVanillaStructures(value: boolean): CustomGenerator;

        /**
         * Specifies whether to use mod's generation callbacks
         * @param value if true, mod generation will be used, default
         * value is true
         * @returns reference to itself to be used in sequential calls
         */
        setGenerateModStructures(value: boolean): CustomGenerator;

        /**
         * Sets terrain generator object used for the landscape generation
         * @param generator terrain generator to be used with current landscape 
         * generator or removes terrain generator, if the value is null
         * @returns reference to itself to be used in sequential calls
         */
        setTerrainGenerator(generator: AbstractTerrainGenerator|null): CustomGenerator;
        
    }

    interface AbstractTerrainGenerator {

    }

    /**
     * Class representing terrain that consists of single biome
     */
    class MonoBiomeTerrainGenerator implements AbstractTerrainGenerator {
        /**
         * Constructs new [[MonoBiomeTerrainGenerator]] instance with no terrain
         * layers
         */
        constructor();

        addTerrainLayer(minY: number, maxY: number): TerrainLayer;

        /**
         * Sets base biome for the current terrain 
         * @param id id of the biome to be used as a single biome of the terrain
         * layer
         */
        setBaseBiome(id: number): MonoBiomeTerrainGenerator;
    }

    /**
     * Class representing single terrain layer that may consist of several noise 
     * layers
     */
    interface TerrainLayer {
        addNewMaterial(generator: NoiseGenerator, priority: number): TerrainMaterial;

        setHeightmapNoise(generator: NoiseGenerator): TerrainLayer;

        setMainNoise(generator: NoiseGenerator): TerrainLayer;

        setYConversion(conversion: NoiseConversion): TerrainLayer;

        getMainMaterial(): TerrainMaterial;
    }

    interface TerrainMaterial {

        setBase(id: number, data: number): TerrainMaterial; 

        setCover(id: number, data: number): TerrainMaterial; 

        setSurface(width: number, id: number, data: number): TerrainMaterial; 

        setFilling(width: number, id: number, data: number): TerrainMaterial; 

        setDiffuse(value: number): TerrainMaterial;
    }

    class NoiseConversion {
        constructor();

        addNode(x: number, y: number): NoiseConversion;
    }

    class NoiseGenerator {
        constructor();

        addLayer(layer: NoiseLayer): NoiseGenerator;

        setConversion(conversion: NoiseConversion): NoiseGenerator;
    }

    class NoiseLayer {
        constructor();

        addOctave(octave: NoiseOctave): NoiseLayer;

        setConversion(conversion: NoiseConversion): NoiseLayer;
    }

    class NoiseOctave {
        constructor(type?: number);

        setTranslate(x: number, y: number, z: number): NoiseOctave;

        setScale(x: number, y: number, z: number): NoiseOctave;

        setWeight(weight: number): NoiseOctave;

        setSeed(x: number, y: number, z: number): NoiseOctave;

        setConversion(conversion: NoiseConversion): NoiseOctave;
    }

    /**
     * Overrides default generator of vanilla dimension
     * @param id vanilla dimension id, one of the [[Native.Dimension]] 
     * values
     * @param generator custom landscape generator used for vanilla 
     * dimension
     */
    function overrideGeneratorForVanillaDimension(id: number, generator: CustomGenerator): void;


    /**
     * @param name dimension name
     * @returns dimension by its string name specified in 
     * [[CustomDimension.constructor]]
     */
    function getDimensionByName(name: string): CustomDimension;


    /**
     * @param id dimension id
     * @returns custom dimension by its numeric id
     */
    function getDimensionById(id: number): CustomDimension;


    /**
     * @param id dimension id
     * @returns true, if dimension is a limbo dimension. Limbo dimension is 
     * created by Horizon automatically if you try to teleport the player to
     * non-existing dimension
     */
    function isLimboId(id: number): boolean;

    /**
     * Transferes specified entity to the dimension with specified id
     * @param entity numeric id of the 
     * @param dimensionId numeric id of the dimension to transfer the entity to
     */
    function transfer(entity: number, dimensionId: number): void;

}
/**
 * Module used to manipulate entities (mobs, drop, arrows, etc.) in the world.
 * Every entity has its unique numeric id which is often used across this module 
 * as the first function parameter
 */
declare namespace Entity {
    /**
     * @returns an array of all loaded entities ids
     */
    function getAll(): number[];

    /**
     * @returns an array of all loaded entities ids
     * @deprecated Consider using [[Entity.getAll]] instead
     */
    function getAllJS(): number[];

    /** 
     * @deprecated No longer supported
     */
    function getExtra(ent: number, name: string): null;

    /** 
     * @deprecated No longer supported
     */
    function putExtra(ent: number, name: string, extra?: ItemExtra): void;

    /**
     * @deprecated No longer supported
     */
    function getExtraJson(ent: number, name: string): object;

    /**
     * @deprecated No longer supported
     */
    function putExtraJson(ent: number, name: string, obj: object): void;

    /**
     * Adds an effect to the mob
     * @param effectId effect id, should be one of the [[Native.PotionEffect]]
     * values
     * @param effectData effect amplifier
     * @param effectTime effect time in ticks
     * @param ambience if true, particles are ambiant
     * @param particles if true, particles are not displayed
     */
    function addEffect(ent: number, effectId: number, effectData: number, effectTime: number, ambiance?: boolean, particles?: boolean): void;

    /**
     * Clears effect, applied to the mob
     * @param id effect id, should be one of the [[Native.PotionEffect]]
     */
    function clearEffect(ent: number, id: number): void;

    /**
     * Clears all effects of the mob
     */
    function clearEffects(ent: number): void;

    /**
     * Damages entity
     * @param damage damage value
     * @param cause if specified, can be used as callback cause param
     * @param params additional params for the damage
     * @param params.attacker entity that caused damage, can be used as callback
     * cause param
     * @param params.bool1 unknown param
     * @param params.bool2 unknown param
     */
    function damageEntity(ent: number, damage: number, cause?: number, params?: {attacker?: number, bool1?: boolean, bool2?: boolean}): void;

    /**
     * Adds specified health amount to the entity
     * @param heal health to be added to entity, in half-hearts
     */
    function healEntity(ent: number, heal: number): void;

    /**
     * @returns numeric entity type, one of the [[Native.EntityType]]
     */
    function getType(ent: number): number;

    /**
     * Sets hitbox to the entity. Hitboxes define entities collisions
     * @param w hitbox width and length
     * @param h hitbox height
     */
    function setHitbox(ent: number, w: number, h: number): void;

    /**
     * @returns true if specified entity id is valid and entity with this id 
     * exists in the world
     */
    function isExist(ent: number): boolean;

    /**
     * Spawns vanilla entity on the specified coordinates
     * @param type numeric entity type, one of the [[Native.EntityType]]
     * @param skin skin to set for the entity. Leave empty or null to use 
     * default skin of the mob
     * @returns numeric id of spawn entity or -1 if entity was not created
     */
    function spawn(x: number, y: number, z: number, type: number, skin?: string|null): number;

    /**
     * Spawns custom entity on the specified coords. Allows to pass some values 
     * to controllers via extra param
     * @param name custom entity string id
     * @param extra object that contains some data for the controllers
     */
    function spawnCustom(name: string, x: number, y: number, z: number, extra?: object): CustomEntity;

    /**
     * Same as [[Entity.spawnCustom]], but uses [[Vector]] object to represent 
     * coordinates
     */
    function spawnCustomAtCoords(name: string, coords: Vector, extra?: any): CustomEntity;

    /**
     * Same as [[Entity.spawn]], but uses [[Vector]] object to represent 
     * coordinates
     */
    function spawnAtCoords(coords: Vector, type: number, skin?: string): void;

    /**
     * Removes entity from the world
     */
    function remove(ent: number): void;

    /**
     * Returns custom entity object by its numeric entity id
     */
    function getCustom(ent: number): CustomEntity;

    /**
     * @deprecated No longer supported
     */
    function getAge(ent: number): number;

    /**
     * @deprecated No longer supported
     */
    function setAge(ent: number, age: any): void;

    /**
     * @deprecated No longer supported
     */
    function getSkin(ent: number): string;

    /**
     * Sets mob skin
     * @param skin skin name, full path in the resourcepack (mod assets)
     */
    function setSkin(ent: number, skin: string): void;

    /**
     * Sets mob skin, uses [[Texture]] object to support animations
     * @param texture 
     */
    function setTexture(ent: number, texture: Texture): void;

    /**
     * @returns entity render type, should be one of the 
     * [[Native.MobRenderType]] values
     */
    function getRender(ent: number): number;

    /**
     * Sets entity render type
     * @param render entity render type, should be one of the 
     * [[Native.MobRenderType]] values
     */
    function setRender(ent: number, render: number): void;

    /**
     * Makes rider ride entity
     * @param entity ridden entity
     * @param rider rider entity
     */
    function rideAnimal(entity: number, rider: number): void;

    /**
     * @returns entity custom name tag
     */
    function getNameTag(ent: number): string;

    /**
     * Sets custom entity tag. Custom entity tags are displayed above the 
     * entities and can be set by player using label
     * @param tag name tag to be set to the entity
     */
    function setNameTag(ent: number, tag: string): void;

    /**
     * @deprecated No longer supported
     */
    function getTarget(ent: number): void;

    /**
     * @deprecated No longer supported
     */
    function setTarget(ent: number, target: any): void;

    /**
     * @returns true, if entity was immobilized
     */
    function getMobile(ent: number): boolean;

    /**
     * Sets entity's immobile state
     * @param mobile if true, entity is immobilized, otherwise it can move
     */
    function setMobile(ent: number, mobile: boolean): void;

    /**
     * @returns true if entity is sneaking, false otherwise
     */
    function getSneaking(ent: number): boolean;

    /**
     * Sets entity's sneaking state
     * @param sneak if true, entity becomes sneaking, else not
     */
    function setSneaking(ent: number, sneak: any): void;

    /**
     * @returns entity that is riding the specified entity
     */
    function getRider(ent: number): number;

    /**
     * @returns entity that is ridden by specified entity
     */
    function getRiding(ent: number): void;

    /**
     * Puts entity on fire
     * @param fire duration (in ticks) of the fire
     * @param force should always be true
     */
    function setFire(ent: number, fire: number, force: boolean): void;

    /**
     * @returns an object that allows to manipulate entity health
     * @deprecated Consider using [[Entity.getHealth]], [[Entity.setHealth]],
     * [[Entity.getMaxHealth]] and [[Entity.setMaxHealth]] instead
     */
    function health(ent: number): EntityHealth;

    /**
     * @returns entity's current health value
     */
    function getHealth(ent: number): number;

    /**
     * Sets entity's current health value
     * @param health health value to be set
     */
    function setHealth(ent: number, health: any): void;

    /**
     * @returns entity's maximum health value
     */
    function getMaxHealth(ent: number): number;

    /**
     * Sets entity's maximum health value
     * @param maxHealth 
     */
    function setMaxHealth(ent: number, health: any): void;

    /**
     * Sets the specified coordinates as a new position for the entity. No 
     * checks are performed
     */
    function setPosition(ent: number, x: number, y: number, z: number): void;

    /**
     * @returns entity position
     */
    function getPosition(ent: number): Vector;

    /**
     * Updates current entity position by specified coordinates
     */
    function addPosition(ent: number, x: number, y: number, z: number): void;

    /**
     * Set current entity's velocity using velocity vector
     * @param x velocity
     * @param y velocity
     * @param z velocity
     */
    function setVelocity(ent: number, x: number, y: number, z: number): void;

    /**
     * Get current entity's velocity using velocity vector
     * @returns [[Vector]] containing current entity's velocity
     */
    function getVelocity(ent: number): Vector;

    /**
     * Updates current entity's velocity by specified valus
     */
    function addVelocity(ent: number, x: number, y: number, z: number): void;

    /**
     * @returns distance in blocks between the two coordinate sets
     */
    function getDistanceBetweenCoords(coords1: Vector, coords2: Vector): number;

    /**
     * @returns distance between specified entity and a fixed coordinate set
     */
    function getDistanceToCoords(ent: number, coords: any): void;

    /**
     * @returns distance in blocks between two entities
     */
    function getDistanceToEntity(ent1: any, ent2: any): void;

    /**
     * @returns distance between player and entity, counting only x and z values
     * (y value is ignored)
     */
    function getXZPlayerDis(ent: number): void;

    /**
     * @returns entity's look angle in radians
     */
    function getLookAngle(ent: number): LookAngle;

    /**
     * Sets specified pitch and yaw as look angle for the entity
     * @param yaw look angle yaw in radians
     * @param pitch look angle pitch in radians
     */
    function setLookAngle(ent: number, yaw: any, pitch: any): void;

    /**
     * Transforms look angle into look vector
     * @param angle look angle to transform into [[Vector]]
     * @returns transformation result
     */
    function getLookVectorByAngle(angle: LookAngle): Vector;

    /**
     * @returns look vector for the entity
     */
    function getLookVector(ent: number): Vector;

    /**
     * @returns look angle between entity and static coordinates
     */
    function getLookAt(ent: number, x: number, y: number, z: number): LookAngle;

    /**
     * Sets entity look angle to look at specified coordinates
     */
    function lookAt(ent: number, x: number, y: number, z: number): void;

    /**
     * Same as [[Entity.lookAt]] but uses Vector as param type
     * @param coords 
     */
    function lookAtCoords(ent: number, coords: Vector): void;

    /**
     * Makes entity move to the target corodinates
     * @param params additional move parameters
     */
    function moveToTarget(ent: number, target: Vector, params: MoveParams): void;

    /**
     * Makes entity move using pitch/yaw angle to determine direction
     * @param angle angle to define entity's direction
     * @param params additional move parameters
     */
    function moveToAngle(ent: number, angle: LookAngle, params: MoveParams): void;

    /**
     * Makes entity move towords its current look angle
     * @param params additional move parameters
     */
    function moveToLook(ent: number, params: MoveParams): void;

    /**
     * Retrieves entity's current movement information
     * @returns object that contains normalized moving vector, moving speed and
     * moving xz speed (with no Y coordinate)
     */
    function getMovingVector(ent: number): MovingVector;

    /**
     * Retrieves entity look angle in the form of pitch/yaw angle. No other 
     * information included to the resulting object
     */
    function getMovingAngle(ent: number): LookAngle;

    /**
     * @deprecated No longer supported
     */
    function getMovingAngleByPositions(pos1: any, pos2: any): void;

    /**
     * Retreives nearest to the coordinates entity of the specified entity type
     * @param coords search range center coordinates
     * @param type entity type ID. Parameter is no longer supported and should 
     * be 0 in all cases
     * @param maxRange if specified, determines search radius
     */
    function findNearest(coords: Vector, type?: number, maxRange?: number): number|null;

    /**
     * 
     * @param coords search range center coordinates
     * @param maxRange determines search radius
     * @param type entity type ID. Parameter is no longer supported and should 
     * not be used
     */
    function getAllInRange(coords: any, maxRange: any, type?: any): void;

    /**
     * @deprecated No longer supported
     */
    function getInventory(ent: number, handleNames: any, handleEnchant: any): void;

    /**
     * @param slot armor slot id, should be one of the [[Native.ArmorType]] 
     * values
     * @returns armor slot contents for entity
     */
    function getArmorSlot(ent: number, slot: number): ItemInstance;

    /**
     * Sets armor slot contents for the entity
     * @param slot armor slot id, should be one of the [[Native.ArmorType]] 
     * values
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setArmorSlot(ent: number, slot: number, id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * @param bool1 parameter is no longer supported and should not be used
     * @param bool2 parameter is no longer supported and should not be used
     * @returns entity's current carried item information
     */
    function getCarriedItem(ent: number, bool1?: boolean, bool2?: boolean): ItemInstance;

    /**
     * Sets currena carried item for the entity
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setCarriedItem(ent: number, id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * Gets item from specified drop entity
     * @returns [[ItemInstance]] that is in the dropped item
     */
    function getDroppedItem(ent: number): ItemInstance;

    /**
     * Sets item to the specified drop entity
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setDroppedItem(ent: number, id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * @deprecated No longer supported
     */
    function getProjectileItem(projectile: number): ItemInstance;
    
    /**
     * Class used to manipulate entity's health
     * @deprecated Consider using [[Entity.getHealth]], [[Entity.setHealth]],
     * [[Entity.getMaxHealth]] and [[Entity.setMaxHealth]] instead
     */
    class EntityHealth {
        /**
         * @returns entity's current health value
         */
        public get(): number;

        /**
         * Sets entity's current health value
         * @param health health value to be set
         */
        public set(health: number): void;

        /**
         * @returns entity's maximum health value
         */
        public getMax(): number;

        /**
         * Sets entity's maximum health value
         * @param maxHealth 
         */
        public setMax(maxHealth: number): void;
    }

    /**
     * Interface used to specify how entity should move
     */
    interface MoveParams {
        /**
         * Movement speed
         */
        speed?: number,

        /**
         * If true, entity won't change its Y velocity
         */
        denyY?: boolean,

        /**
         * Y velocity (jump speed)
         */
        jumpVel?: number
    }

    /**
     * Interface used to return entity's current moving vector and some 
     * additional data
     */
    interface MovingVector {
        /**
         * Normalized vector X coordinate
         */
        x: number,

        /**
         * Normalized vector Y coordinate
         */
        y: number,

        /**
         * Normalized vector Z coordinate
         */
        z: number,

        /**
         * Vector real length
         */
        size: number,

        /**
         * Vector real length excluding Y corrdinate
         */
        xzsize: number
    }
}


/**
 * Class used to create new entity AI types
 */
declare class EntityAIClass implements EntityAIClass.EntityAIPrototype {
    /**
     * Creates new entity AI type
     * @param customPrototype AI type prototype
     */
    public constructor(customPrototype: EntityAIClass.EntityAIPrototype);

    /**
     * Sets execution timer time in ticks. AI will be executed specified 
     * number of ticks
     * @param timer execution time in ticks
     */
    public setExecutionTimer(timer: number): void;

    /**
     * Resets execution timer so that AI is executed with no time limits
     */
    public removeExecutionTimer(): void;

    
    /**
     * If set to true, it is an instance of AI type, else the pattern 
     * (pattern should not be modified directly, AI controller calls 
     * instantiate to create instances of AI type)
     * 
     * TODO: add link to AI controller type
     */
    public isInstance: boolean;

    /**
     * TODO: determine type
     */
    public parent: any|null;

    /**
     * Id of the entity that uses this AI type instance or null if it is 
     * the pattern
     */
    public entity: number|null;

    /**
     * Method that is called to create AI type instance using current 
     * instance as pattern
     */
    public instantiate(parent: any, name: string): EntityAIClass;

    /**
     * Occurs when entity this instance is assigned to this AI type 
     * instance, if you override this method, be sure to assign entity 
     * parameter to [[EntityAIClass.EntityAIPrototype.entity]] field
     */
    public aiEntityChanged(entity: number): void;

    /**
     * Finishes AI execution and disables it in parent controller
     */
    public finishExecution(): void;

    /**
     * Changes own priority in parent's controller
     */
    public changeSelfPriority(priority: number): void;

    /**
     * Enables any AI by its name in the controller
     * @param name AI name to be enables
     * @param priority priority to be set to the enabled AI
     * @param extra some extra data passed to 
     */
    public enableAI(name: string, priority: number, extra: any): void;
    
    /**
     * Disables any AI by its name in the controller
     * @param name AI name to be disabled
     */
    public disableAI(name: string): void;

    /**
     * Sets any AI priority by its name in the controller
     * @param name AI name to change priority
     * @param pripority priority to be set to the AI
     */
    public setPriority(name: string, pripority: number): void;

    /**
     * Gets any AI object by its name from the current controller
     * @param name AI name
     */
    public getAI(name: string): EntityAIClass;

    /**
     * Gets any AI priority from the current controller by AI name
     * @param name AI name
     */
    public getPriority(name: string): number;
    
    /**
     * @returns AI type's default name
     */
    public setParams(params: object): void;

    /**
     * All the parameters of the AI instance
     */
    params: object;

    /**
     * Object containing the state of the AI type
     */
    data: object;
}

declare namespace EntityAIClass {
    /**
     * Object used to register entity AI prototypes
     */
    interface EntityAIPrototype {
        /**
         * @returns AI type's default priority
         */
        getDefaultPriority?(): number,

        /**
         * @returns AI type's default name
         */
        getDefaultName?(): string,

        /**
         * Default parameters set
         */
        params?: object,

        /**
         * Called when AI type execution starts
         * @param extra additional data passed from [[EntityAIClass.enableAI]] 
         * method 
         */
        executionStarted?(extra?: any): void,

        /**
         * Called when AI type execution ends
         */
        executionEnded?(): void,

        /**
         * Called when AI type execution is paused
         */
        executionPaused?(): void,

        /**
         * Called when AI type execution is resumed
         */
        executionResumed?(): void,

        /**
         * Defines main logic of the AI type
         */
        execute?(): void,

        /**
         * Object containing the state of the AI type
         */
        data?: object,
        
        /**
         * Called when entity is attacked by player
         * @param entity player that attacked this entity
         */
        attackedBy?(attacker: number): void;

        /**
         * Called when entity gets hurt
         * @param attacker entity that damaged this entity, or -1 if damage 
         * source is not an entity
         * @param damage amount of damage
         */
        hurtBy?(attacker: number, damage: number): void;

        /**
         * Called when a projectile hits the entity
         * @param projectile projectile entity id
         */
        projectileHit?(projectile: number): void;

        /**
         * Called when entity is dead
         * @param attacker entity that damaged this entity, or -1 if damage 
         * source is not an entity
         */
        death?(attacker: number): void;
    }
}

/**
 * A set of predefined entity AI types
 */
declare namespace EntityAI {
    /**
     * Simple idle AI type, entity just does nothing
     */
    const Idle: EntityAIClass;

    /**
     * Follow AI type, entity follows its target. Use another AI type to set 
     * target for this AI type
     * 
     * @params **speed:** *number* entity movement speed when AI is executed
     * @params **jumpVel:** *number* jump (y) velocity
     * @params **rotateSpeed:** *number* entity rotation speed
     * @params **rotateRatio:** *number* how long will be the rotation path
     * @params **rotateHead:** *boolean* if true, entity turns its head to the target
     * @params **denyY:** *boolean* if true, entity won't change its Y velocity
     * 
     * @data **target:** [[Vector]] coordinates used as a target
     * @data **targetEntity:** *number* entity used as a target. If specified, 
     * target data is ignored
     */
    const Follow: EntityAIClass;

    /**
     * Panic AI type, entity jsut rushes around
     * 
     * @params **speed:** *number* entity movement speed when AI is executed
     * @params **angular_speed:** *number* entity speed when turning
     * 
     */
    const Panic: EntityAIClass;

    /**
     * Wander AI type, entity walks around making pauses
     * 
     * @params **speed:** *number* entity movement speed when AI is executed
     * @params **angular_speed:** *number* entity speed when turning
     * @params **delay_weight:** *number* part of the time entity is making 
     * pause
     * 
     */
    const Wander: EntityAIClass;

    /**
     * Attack AI type, entity causes damage to the target entity
     * 
     * @params **attack_damage:** *number* damage amount
     * @params **attack_range:** *number* damage radius
     * @params **attack_rate:** *number* time between to attacks in ticks
     * 
     * @data **target:** target entity
     */
    const Attack: EntityAIClass;

    /**
     * Swim AI type, if the entity is in water, it swims
     * 
     * @params **velocity:** *number* swimming speed
     */
    const Swim: EntityAIClass;
    
    /**
     * Panic AI watcher type, controls entity panic behavior after getting hurt
     * 
     * @params **panic_time:** *number* time the entity will be in panic
     * @params **priority_panic:** *number* panic AI priority when entity should
     * be in panic
     * @params **priority_default:** *number* panic AI priority when entity
     * should not be in panic
     * @params **name:** *number* name of the panic AI controller
     */
    const PanicWatcher: EntityAIClass;
}
/**
 * Module that provides methods to work with android file system
 */
declare namespace FileTools {
    /**
     * Defines path to android /mnt direcory
     */
    const mntdir: string;

    /**
     * Defines user directory path, ends with "/"
     */
    const root: string;

    /**
     * Defines mods folder path, ends with "/"
     */
    const moddir: string;

    /**
     * Creates directory by its home-relative or absolute path, if one of the 
     * parent directories doesn't exist, creates them
     * @param dir path to the new directory
     */
    function mkdir(dir: string): void;

    /**
     * Creates CoreEngine working directories. Called by CoreEngine and should 
     * not be called by end user
     */
    function mkworkdirs(): void;

    /**
     * Converts home-relative path to absolute
     * @param path input path
     * @returns input string if input string is an absolute path, an absolute 
     * path if input string is a home-relative path
     */
    function getFullPath(path: string): string;

    /**
     * Verifies if specified home-relative or absolute path exists
     * @param path path to be verified
     * @returns true, if specified path exists, false otherwise
     */
    function isExists(path: string): boolean;

    /**
     * Writes text to the file
     * @param file home-relative or absolute path to the file
     * @param text text to be written to the file
     * @param add if true, appends text to the file, overrides it otherwise. 
     * Default value is false
     */
    function WriteText(file: string, text: string, add?: boolean): void;

    /**
     * Reads text from file
     * @param file home-relative or absolute path to the file
     * @returns file contents or null if file does not exist or not accessible
     */
    function ReadText(file: any): string|null;

    /**
     * Writes bitmap to png file
     * @param file home-relative or absolute path to the file
     * @param bitmap android.graphics.Bitmap object of the bitmup to be wriiten
     * to the file
     */
    function WriteImage(file: string, bitmap: android.graphics.Bitmap): void;

    /**
     * Reads bitmap from file
     * @param file home-relative or absolute path to the file
     * @returns android.graphics.Bitmap object of the bitmup that was read from
     * file or null if file does not exist or is not accessible
     */
    function ReadImage(file: string): android.graphics.Bitmap|null;

    /**
     * Reads string from asset by its full name
     * @param name asset name
     * @returns asset contents or null if asset doesn't exist
     */
    function ReadTextAsset(name: string): string;

    /**
     * Reads bitmap from asset by its full name
     * @param name asset name
     * @returns android.graphics.Bitmap object of the bitmup that was read from
     * asset or null, if asset doesn't exist
     */
    function ReadImageAsset(name: string): android.graphics.Bitmap|null;

    /**
     * Reads bytes array from assets
     * @param name asset name
     * @returns java array of bytes read from assets or null if asset doesn't 
     * exist
     */
    function ReadBytesAsset(name: string): native.Array<jbyte>;

    /**
     * Lists children directories for the specified path
     * @param path home-relative or absolute path to the file
     * @returns array of java.io.File instances of listed directories
     */
    function GetListOfDirs(path: string): java.io.File[];

    /**
     * Lists files in the specified directory
     * @param path path to directory to look for files in
     * @param ext extension of the files to include to the output. Use empty 
     * string to include all files
     * @returns array of java.io.File instances that match specified extension
     */
    function GetListOfFiles(path: string, ext: string): java.io.File[];

    /**
     * Reads file as key:value pairs
     * @param dir home-relative or absolute path to the file
     * @param specialSeparator separator between key and value, ":" by default
     * @returns object containing key:value pairs from file
     */
    function ReadKeyValueFile(dir: string, specialSeparator?: string): object;

    /**
     * Writes key:value pairs to the file
     * @param dir home-relative or absolute path to the file
     * @param data object to be written to the file as a set of key:value pairs
     * @param specialSeparator separator between key and value, ":" by default
     */
    function WriteKeyValueFile(dir: string, data: object, specialSeparator: string): void;

    /**
     * Reads file as JSON
     * @param dir home-relative or absolute path to the file
     * @returns value read from JSON file
     */
    function ReadJSON(dir: string): any;

    /**
     * Writes object to file as JSON
     * @param dir home-relative or absolute path to the file
     * @param obj object to be written to the file as JSON
     * @param beautify if true, output JSON is beautified
     */
    function WriteJSON(dir: string, obj: any, beautify: boolean): void;
}
/**
 * Module that provides some general game-related functions
 */
declare namespace Game {
    /**
     * Prevents current callblack function from being called in Minecraft.
     * For most callbacks it prevents default game behaviour
     */
    function prevent(): void;

    /**
     * Writes message to the chat. Message can be formatted using 
     * [[Native.ChatColor]] values
     * @param msg message to be displayed
     */
    function message(msg: string): void;

    /**
     * Writes message above the hot bar. Message can be formatted using 
     * [[Native.ChatColor]] values
     * @param msg message to be displayed
     */
    function tipMessage(msg: string): void;

    /**
     * Displays android AlertDialog with given message and dialog title
     * @param message message to be displayed
     * @param title title of the AlertDialog
     */
    function dialogMessage(message: string, title: string): void;

    /**
     * Sets game difficulty, one of [[Native.GameDifficulty]] values
     * @param difficulty game difficulty to be set
     */
    function setDifficulty(difficulty: number): void;

    /**
     * @returns current game difficulty, one of the [[Native.GameDifficulty]] 
     * values
     */
    function getDifficulty(): number;
    
    /**
     * Sets current level game mode
     * @param gameMode new game mode, should be one of the [[Native.GameMode]]
     * values
     */
    function setGameMode(gameMode: number): void;

    /**
     * @returns current level game mode, one of the [[Native.GameMode]] values
     */
    function getGameMode(): number;

    /**
     * @returns string containing current Minecraft version
     */
    function getMinecraftVersion(): string;

    /**
     * @returns string containing current Core Engine version
     */
    function getEngineVersion(): string;
}
/**
 * Module used to simplify generation tasks in mods logic
 */
declare namespace GenerationUtils {
    /**
     * @param id numeric tile id
     * @returns true if block is solid and light blocking block, false otherwise
     */
    function isTerrainBlock(id: number): void;

    /**
     * @param id numeric tile id
     * @returns true if block is transparent, false otherwise
     */
    function isTransparentBlock(id: number): void;

    /**
     * @returns true, if one can see sky from the specified position, false 
     * othrwise
     */
    function canSeeSky(x: number, y: number, z: number): void;

    /**
     * Generates random x and z coordinates inside specified chunk
     * @param cx chunk x coordinate
     * @param cz chunk z coordinate
     */
    function randomXZ(cx: number, cz: number): {x: number, z: number};

    /**
     * Generates random coordinates inside specified chunk
     * @param cx chunk x coordinate
     * @param cz chunk z coordinate
     * @param lowest lowest possible y coordinate. Default is 0
     * @param highest highest possible y coordinate. Default is 128
     */
    function randomCoords(cx: number, cz: number, lowest?: number, highest?: number): Vector;

    /**
     * Finds nearest to the specified y coordinate empty space on the specified 
     * x and z coordinates
     */
    function findSurface(x: number, y: number, z: number): void;

    /**
     * Finds nearest to y=128 coordinate empty space on the specified x and z 
     * coordinates
     */
    function findHighSurface(x: number, z: number): void;

    /**
     * Finds nearest to y=64 coordinate empty space on the specified x and z 
     * coordinates
     */
    function findLowSurface(x: number, z: number): void;

    function lockInBlock(id: number, data: number, checkerTile: any, checkerMode: any): void;

    function setLockedBlock(x: number, y: number, z: number): void;

    /**
     * Generates ore vein on the specified coordinates using specified params
     * @deprecated Consider using [[GenerationUtils.generateOre]] instead
     * @param params generation params
     * @param params.id ore tile id
     * @param params.data ore data
     * @param params.noStoneCheck if true, no check for stone is performed so 
     * the ore may be generated in the air. Use this to debug ore generation in 
     * the superflat worlds
     * @param params.amount amount of the ore to be generated
     * @param params.ratio if amount is not specified, used to calculate amount
     * @param params.size if amount is not specified, used to calculate amount, 
     * using simple formula
     * ```
     * size * ratio * 3
     * ```
     */
    function genMinable(x: number, y: number, z: number, params: {id: number, data: number, noStoneCheck: number, amount?: number, ratio?: number,  size?: number}): void;

    /**
     * Generates ore vein on the specified coordinates
     * @param id ore tile id
     * @param data ore data
     * @param amount ore amount, use number at least 6 to be able to find 
     * generated ore. Note that amount doesn't mean blocks count, it is just an 
     * input value for generation algorithm
     * @param noStoneCheck if true, no check for stone is performed so the ore 
     * may be generated in the air. Use this to debug ore generation in the 
     * superflat worlds
     */
    function generateOre(x: number, y: number, z: number, id: number, data: number, amount: number, noStoneCheck: boolean): void;
}
/**
 * Module used to define items and their properties
 */
declare namespace Item {
    /**
     * @param id string id of the item
     * @returns item numeric id by its string id or just returns its numeric id 
     * if input was a numeric id
     */
    function getNumericId(id: string|number): number;

    /**
     * Gets NativeItem instance that can be used to apply some properties to the
     * item
     * @param id string id of the item
     * @returns NativeItem instance associated with this item
     */
    function getItemById(id: string): NativeItem;

    /**
     * Creates new item using specified parameters
     * @param namedID string id of the item. You should register it via 
     * [[IDRegistry.genItemID]] call first
     * @param name item name in English. Add translations to the name using
     * [[Translation]] module, all translation to the item and block names are
     * applied automatically
     * @param texture texture data used to create item
     * @param params additional item parameters
     * @param params.stack maximum item stack size. Default value is 64
     * @param params.isTech if true, the item will not be added to creative. 
     * Default value is false
     */
    function createItem(namedID: string, name: string, texture: TextureData, params?: {stack?: number, isTech?: boolean}): NativeItem;

    /**
     * Creates eatable item using specified parameters
     * @param namedID string id of the item. You should register it via 
     * [[IDRegistry.genItemID]] call first
     * @param name item name in English. Add translations to the name using
     * [[Translation]] module, all translation to the item and block names are
     * applied automatically
     * @param texture texture data used to create item
     * @param params additional item parameters
     * @param params.stack maximum item stack size. Default value is 64
     * @param params.isTech if true, the item will not be added to creative. 
     * Default value is false 
     * @param params.food amount of hunger restored by this food. Default value
     * is 1
     */
    function createFoodItem(namedID: string, name: string, texture: TextureData, params?: {stack?: number, isTech?: boolean, food?: number}): NativeItem;

    /**
     * @deprecated Use [[Item.createItem]] and [[RecipeRegistry.addFurnaceFuel]]
     * instead
     */
    function createFuelItem(namedID: string, name: string, texture: TextureData, params: object): void;

    /**
     * Creates armor item using specified parameters
     * @param namedID string id of the item. You should register it via 
     * [[IDRegistry.genItemID]] call first
     * @param name item name in English. Add translations to the name using
     * [[Translation]] module, all translation to the item and block names are
     * applied automatically
     * @param texture texture data used to create item
     * @param params additional item parameters
     * @param params.isTech if true, the item will not be added to creative. 
     * Default value is false 
     * @param params.durability armor durability, the more it is, the longer the 
     * armor will last. Default value is 1
     * @param params.armor armor protection. Default vaule is 0
     * @param params.texture armor model texture path (in the assets), default
     * value is 'textures/logo.png'
     * @param params.type armor type, should be one of the 'helmet', 
     * 'chestplate', 'leggings' or 'boots'
     */
    function createArmorItem(namedID: string, name: string, texture: TextureData, params: {durability: number, armor: number, texture: string, type: string}): void;

    /**
     * Creates throwable item using specified parameters
     * @param namedID string id of the item. You should register it via 
     * [[IDRegistry.genItemID]] call first
     * @param name item name in English. Add translations to the name using
     * [[Translation]] module, all translation to the item and block names are
     * applied automatically
     * @param texture texture data used to create item
     * @param params additional item parameters
     * @param params.stack maximum item stack size. Default value is 64
     * @param params.isTech if true, the item will not be added to creative. 
     * Default value is false 
     */
    function createThrowableItem(namedID: string, name: string, texture: TextureData, params: any): void;

    /**
     * @param id numeric item id
     * @returns true if given item is vanilla item, false otherwise
     */
    function isNativeItem(id: number): boolean;

    /**
     * @param id numeric item id
     * @returns maximum damage value for the specified item
     */
    function getMaxDamage(id: number): number;

    /**
     * @param id numeric item id
     * @returns maximum stack size for the specified item
     */
    function getMaxStack(id: number): number;

    /**
     * @param id numeric item id
     * @param data item data
     * @param encode no longer supported, do not use this parameter
     * @returns current item name
     */
    function getName(id: number, data: number, encode?: any): string;

    /**
     * @param id numeric item id
     * @param data no longer supported, do not use this parameter
     * @returns true, if an item with such id exists, false otherwise
     */
    function isValid(id: number, data: number): boolean;

    /**
     * Adds item to creative inventory
     * @param id string or numeric item id
     * @param count amount of the item to be added, generally should be 1
     * @param data item data
     */
    function addToCreative(id: number|string, count: number, data: number): void;

    /**
     * Applies several properties via one method call
     * @deprecated Consider using appropiate setters instead
     * @param numericID numeric item id
     * @param description 
     */
    function describeItem(numericID: number, description: {
        category?
    }): void;

    /**
     * Sets item creative category
     * @param id string or numeric item id
     * @param category item category, should be one of the 
     * [[Native.ItemCategory]] values
     */
    function setCategory(id: number|string, category: number): void;

    /**
     * Specifies how the item can be enchanted
     * @param id string or numeric item id
     * @param enchant enchant type defining whan enchants can or cannot be 
     * applied to this item, one of the [[Native.EnchantType]]
     * @param value quality of the enchants that are applied, the higher this 
     * value is, the better enchants you get with the same level
     */
    function setEnchantType(id: number|string, enchant: number, value: number): void;

    /**
     * Specifies what items can be used to repair this item in the envil
     * @param id string or numeric item id
     * @param items array of numeric item ids to be used as repair items
     */
    function addRepairItemIds(id: number|string, items: number[]): void;

    /**
     * Specifies how the player should hold the item
     * @param id string or numeric item id
     * @param enabled if true, player holds the item as a tool, not as a simple
     * item
     */
    function setToolRender(id: number|string, enabled: boolean): void;

    /**
     * Sets item maximum data value
     * @param id string or numeric item id
     * @param maxdamage maximum data value for the item
     */
    function setMaxDamage(id: number|string, maxdamage: number): void;

    /**
     * Sets item as glint (like enchanted tools or golden apple)
     * @param id string or numeric item id
     * @param enabled if true, the item will be displayed as glint item
     */
    function setGlint(id: number|string, enabled: boolean): void;

    /**
     * 
     * @param id string or numeric item id
     * @param enabled 
     */
    function setLiquidClip(id: number|string, enabled: boolean): void;

    /** 
     * @deprecated No longer supported
     */
    function setStackedByData(id: number|string, enabled: boolean): void;

    /**
     * Sets additional properties for the item, uses Minecraft mechanisms to
     * set them. Full list of properties is currently unavailable 
     * @param id string or numeric item id
     * @param props JSON string containing some of the properties
     */
    function setProperties(id: number|string, props: string): void;

    /**
     * Sets animation type for the item
     * @param id string or numeric item id
     * @param animType use animation type, one of the [[Native.ItemAnimation]] 
     * values
     */
    function setUseAnimation(id: number|string, animType: number): void;

    /**
     * Limits maximum use duration. This is useful to create such items as bows
     * @param id string or numeric item id
     * @param duration maximum use duration in ticks
     */
    function setMaxUseDuration(id: number|string, duration: number): void;

    /**
     * Same as [[Item.refisterUseFunction]], but supports numeric ids only
     */
    function registerUseFunctionForID(numericID: number, useFunc: Callback.ItemUseFunction): void;

    /**
     * Registers function that is called when user touches some block in the 
     * world with specified item
     * @param namedID string or numeric id of the item
     * @param useFunc function that is called when such an event occures
     */
    function registerUseFunction(namedID: string|number, useFunc: Callback.ItemUseFunction): void;

    /**
     * Same as [[Item.registerThrowableFunction]], but supports numeric ids only
     */
    function registerThrowableFunctionForID(numericID: number, useFunc: Callback.ProjectileHitFunction): void;

    /**
     * Registers function that is called when throwable item with specified id
     * hits block or entity
     * @param namedID string or numeric id of the item
     * @param useFunc function that is called when such an event occures
     */
    function registerThrowableFunction(namedID: string|number, useFunc: Callback.ProjectileHitFunction): void;

    /**
     * Registers item id as requiring item icon override and registers function 
     * to perform such an override
     * @param namedID string or numeric id of the item
     * @param func function that is called to override item icon. Should return 
     * [[Item.TextureData]] object to be used for the item. See 
     * [[Callback.ItemIconOverrideFunction]] documentation for details
     */
    function registerIconOverrideFunction(namedID: string|number, func: Callback.ItemIconOverrideFunction): void;

    /**
     * Registers function to perform item name override
     * @param namedID string or numeric id of the item
     * @param func function that is called to override item name. Should return 
     * string to be used as new item name
     */
    function registerNameOverrideFunction(nameID: string|number, func: Callback.ItemNameOverrideFunction): void;

    /**
     * Registers function to be called when player uses item in the air (not on
     * the block)
     * @param nameID string or numeric id of the item
     * @param func function that is called when such an event occures
     */
    function registerNoTargetUseFunction(nameID: string|number, func: Callback.ItemUseNoTargetFunction): void;

    /**
     * Registers function to be called when player doesn't complete using item 
     * that has maximum use time set with [[Item.setMaxUseDuration]] funciton.
     * Vanilla bow uses this function with max use duration of 72000 ticks
     * @param nameID string or numeric id of the item
     * @param func function that is called when such an event occures
     */
    function registerUsingReleasedFunction(nameID: string|number, func: Callback.ItemUsingReleasedFunction): void;

    /**
     * Registers function to be called when player completes using item 
     * that has maximum use time set with [[Item.setMaxUseDuration]] funciton
     * @param nameID string or numeric id of the item
     * @param func function that is called when such an event occures
     */
    function registerUsingCompleteFunction(nameID: string|number, func: Callback.ItemUsingCompleteFunction): void;

    /**
     * Registers function to be called when item is dispensed from dispenser. 
     * @param nameID string or numeric id of the item
     * @param func function that is called when such an event occures
     */
    function registerDispenseFunction(nameID: string|number, func: Callback.ItemDispensedFunction): void;

    /**
     * @deprecated Should not be used in new mods, consider using [[Item]] 
     * properties setters instead
     */
    function setPrototype(namedID: any, Prototype: any): void;

    /**
     * Class representing item used to set its properties
     */
    class NativeItem {

    }

    /**
     * Represents item texture data. For example, if 'items-opaque' folder 
     * contains file *nugget_iron_0.png*, you should pass *nugget_iron* as 
     * texture name and 0 as texture index. _N suffix can be ommited, but it is 
     * generally not recommended
     */
    interface TextureData {
        /**
         * Texture name, name of the file stored in the 'items-opaque' asset
         * folder without extension and _N suffixes
         */
        name: string,

        /**
         * Texture index defined by _N texture suffix. Default value id 0
         */
        data?: number,

        /**
         * @deprecated same as data, so data is preferred in all cases
         */
        meta?: number
    }

}
/**
 * Module used to log messages to Inner Core log and android log
 */
declare namespace Logger {
    /**
     * Writes message to the log, using specified log prefix
     * @param message message to be logged
     * @param prefix prefix of the message, can be used to filter log
     */
    function Log(message: string, prefix: string): void;

    /**
     * Logs java Throwable with full stack trace to 
     * @param error java Throwable to be logged
     */
    function LogError(error: java.lang.Throwable): void;

    /**
     * Writes logger content to file and clears all buffers
     */
    function Flush(): void;
}
/**
 * Module used to share mods' APIs
 */
declare namespace ModAPI {
    /**
     * Registers new API for the mod and invokes mod API callback
     * @param name API name used to import it in the other mods
     * @param api object that is shared with the other mods. May contain other 
     * objects, methods, variables, etc. Sometimes it is useful to provide the 
     * ability to run third party code in your own mod, you can create a method
     * that provides such possibility: 
     * ```ts
     * requireGlobal: function(command){
	 *     return eval(command);
	 * }
     * ``` 
     * @param descr simple documentation for the mod API
     * @param descr.name full name of the API, if not specified, name parameter 
     * value is used
     * @param descr.props object containing descriptions of methods and 
     * properties of the API, where keys are methods and properties names and 
     * values are their descriptions
     */
    function registerAPI(name: string, api: object, descr?: {name?: string, props?: object}): void;

    /**
     * Gets API by its name. The best approach is to call this method in the
     * function passed as the second parameter of [[ModAPI.addAPICallback]].
     * 
     * Example:
     * ```ts
     * // importing API registered by IndustrialCraft PE
     * var ICore;
     * ModAPI.addAPICallback("ICore", function(api){
     *     ICore = api;
     * });
     * ```
     * 
     * When using ICore variable from the example, be sure to check it for null
     * because Industrial Craft PE may not be installed on the user's phone
     * @param name API name
     * @returns API object if an API with specified was previously registered,
     * null otherwise
     */
    function requireAPI(name: string): object|null;

    /**
     * Executes string in Core Engine's global context. Can be used to get 
     * functions and objects directly from AdaptedScriptAPI.
     * @param name string to be executed in Core Engine's global context
     */
    function requireGlobal(name: string): any;

    /**
     * @param name API name
     * @returns documentation for the specified mod API
     */
    function requireAPIdoc(name: string): ModDocumentation;

    /**
     * Fetches information about the method or property of mod API
     * @param name API name
     * @param prop property or method name
     * @returns string description of the method or null if no description was
     * provided by API vendor
     */
    function requireAPIPropertyDoc(name: string, prop: string): string|null;

    /**
     * @deprecated No longer supported
     */
    function getModByName(modName: string): void;

    /**
     * @deprecated No longer supported
     */
    function isModLoaded(modName: string): void;

    /**
     * Adds callback for the specified mod API
     * @param apiName API name
     * @param func callback that is called when API is loaded
     */
    function addAPICallback(apiName: string, func: 
        /**
         * @param api shared mod API
         */
        (api: object) => void): void;

    /**
     * @deprecated No longer supported
     */
    function addModCallback(modName: string, func: any): void;

    /**
     * @deprecated No longer supported
     */
    function getModList(): void;

    /**
     * @deprecated No longer supported
     */
    function getModPEList(): void;

    /**
     * @deprecated No longer supported
     */
    function addTexturePack(path: any): void;

    /**
     * Recursively opies (duplicates) the object to the new one
     * @param api an object to be copied
     * @param deep if true, copies the object recursively
     * @returns a copy of the object
     */
    function cloneAPI(api: object, deep: boolean): object;

    /**
     * Ensures target object has all the properties the source object has, if 
     * not, copies them from source to target object. 
     * @param source object to copy missing values from
     * @param target object to copy missing values to
     */
    function inheritPrototypes(source: object, target: object): object;

    /**
     * Recursively clones object to the new one counting call depth and 
     * interrupting copying after 7th recursion call
     * @param source an object to be cloned
     * @param deep if true, copies the object recursively
     * @param rec current recursion state, if > 6, recursion stops. Default 
     * value is 0
     * @returns cloned object, all the properties that are less then then 8 in
     * depth, get copied
     */
    function cloneObject(source: any, deep: any, rec?: number): object;

    /**
     * @returns same as [[ModAPI.cloneObject]], but if call depth is more then
     * 6, returns "stackoverflow" string value
     */
    function debugCloneObject(source: any, deep: any, rec?: number): object|string;


    /**
     * Objects used to represent mod API documentation
     */
    interface ModDocumentation {
        /**
         * full name of the API
         */
        name: string,

        /**
         * object containing descriptions of methods and properties of the API, 
         * where keys are methods and properties names and 
         * values are their descriptions
         */
        props: object
    }
}
/**
 * Module containing enums that can make user code more readable
 */
declare namespace Native {
    /**
     * Defines armor type and armor slot index in player's inventory
     */
    enum ArmorType {
        boots = 3,
        chestplate = 1,
        helmet = 0,
        leggings = 2,
    }

    /**
     * Defines item category in creative inventory
     */
    enum ItemCategory {
        DECORATION = 2,
        FOOD = 4,
        INTERNAL = 0,
        MATERIAL = 1,
        TOOL = 3,
    }
    
    /**
     * Defines all existing vanilla particles
     */
    enum ParticleType {
        angryVillager = 32,
        bubble = 1,
        cloud = 4,
        crit = 2,
        dripLava = 24,
        dripWater = 23,
        enchantmenttable = 32,
        fallingDust = 26,
        flame = 7,
        happyVillager = 33,
        heart = 17,
        hugeexplosion = 14,
        hugeexplosionSeed = 15,
        ink = 25,
        itemBreak = 12,
        largeexplode = 5,
        lava = 8,
        mobFlame = 16,
        note = 36,
        portal = 20,
        rainSplash = 21,
        redstone = 10,
        slime = 30,
        smoke = 4,
        smoke2 = 9,
        snowballpoof = 13,
        spell = 29,
        spell2 = 28,
        spell3 = 27,
        splash = 22,
        suspendedTown = 19,
        terrain = 16,
        waterWake = 31,
    }

    /**
     * Defines text colors and font styles for chat and tip messages
     */
    enum Color {
        AQUA = "§b",
        BEGIN = "§",
        BLACK = "§0",
        BLUE = "§9",
        BOLD = "§l",
        DARK_AQUA = "§3",
        DARK_BLUE = "§1",
        DARK_GRAY = "§8",
        DARK_GREEN = "§2",
        DARK_PURPLE = "§5",
        DARK_RED = "§4",
        GOLD = "§6",
        GRAY = "§7",
        GREEN = "§a",
        ITALIC = "§o",
        LIGHT_PURPLE = "§d",
        OBFUSCATED = "§k",
        RED = "§c",
        RESET = "§r",
        STRIKETHROUGH = "§m",
        UNDERLINE = "§n",
        WHITE = "§f",
        YELLOW = "§e",
    }
    
    /**
     * Defines all vanilla entity type ids
     */
    enum EntityType {
        AREA_EFFECT_CLOUD = 95,
        ARMOR_STAND = 61,
        ARROW = 80,
        BAT = 19,
        BLAZE = 43,
        BOAT = 90,
        CAT = 75,
        CAVE_SPIDER = 40,
        CHEST_MINECART = 98,
        CHICKEN = 10,
        COD = 112,
        COMMAND_BLOCK_MINECART = 100,
        COW = 11,
        CREEPER = 33,
        DOLPHIN = 31,
        DONKEY = 24,
        DRAGON_FIREBOLL = 79,
        DROWNED = 110,
        EGG = 82,
        ENDERMAN = 38,
        ENDERMITE = 55,
        ENDER_CRYSTAL = 71,
        ENDER_DRAGON = 53,
        ENDER_GUARDIAN = 50,
        ENDER_GUARDIAN_GHOST = 120,
        ENDER_PEARL = 87,
        EVOCATION_FANG = 103,
        EVOCATION_ILLAGER = 104,
        EXPERIENCE_ORB = 69,
        EXPERIENCE_POTION = 68,
        EYE_OF_ENDER_SIGNAL = 70,
        FALLING_BLOCK = 66,
        FIREBALL = 85,
        FIREWORKS_ROCKET = 72,
        FISHING_HOOK = 77,
        GHAST = 41,
        GUARDIAN = 49,
        HOPPER_MINECART = 96,
        HORSE = 23,
        HUSK = 47,
        IRON_GOLEM = 20,
        ITEM = 64,
        LAVA_SLIME = 42,
        LEASH_KNOT = 88,
        LIGHTNING_BOLT = 93,
        LINGERING_POTION = 101,
        LLAMA = 29,
        LLAMA_SPLIT = 102,
        MINECART = 84,
        MOVING_BLOCK = 67,
        MULE = 25,
        MUSHROOM_COW = 16,
        OCELOT = 22,
        PAINTING = 83,
        PANDA = 113,
        PARROT = 30,
        PHANTOM = 58,
        PIG = 12,
        PIG_ZOMBIE = 36,
        PILLAGER = 114,
        PLAYER = 63,
        POLAR_BEAR = 28,
        PRIMED_TNT = 65,
        PUFFERFISH = 108,
        RABBIT = 18,
        RAVAGER = 59,
        SALMON = 109,
        SHEEP = 13,
        SHIELD = 117,
        SHULKER = 54,
        SHULKER_BULLET = 76,
        SILVERFISH = 39,
        SKELETON = 34,
        SKELETON_HORSE = 26,
        SLIME = 37,
        SMALL_FIREBALL = 94,
        SNOWBALL = 81,
        SNOW_GOLEM = 21,
        SPIDER = 35,
        SQUID = 17,
        STRAY = 46,
        THROWN_POTION = 86,
        THROWN_TRIDENT = 73,
        TNT_COMMAND = 97,
        TROPICALFISH = 111,
        TURTLE = 74,
        VEX = 105,
        VILLAGER = 15,
        VILLAGER_V2 = 115,
        VINDICATOR = 57,
        WANDERING_TRADER = 118,
        WHITCH = 45,
        WHITHER = 52,
        WHITHER_SKELETON = 48,
        WHITHER_SKULL = 89,
        WHITHER_SKULL_DANGEROUS = 91,
        WOLF = 14,
        ZOMBIE = 32,
        ZOMBIE_HORSE = 27,
        ZOMBIE_VILLAGER = 44,
        ZOMBIE_VILLAGE_V2 = 116,
    }
    
    /**
     * Defines vanilla mob rendertypes
     */
    enum MobRenderType {
        arrow = 25,
        bat = 10,
        blaze = 18,
        boat = 35,
        camera = 48,
        chicken = 5,
        cow = 6,
        creeper = 22,
        egg = 28,
        enderman = 24,
        expPotion = 45,
        experienceOrb = 40,
        fallingTile = 33,
        fireball = 37,
        fishHook = 26,
        ghast = 17,
        human = 3,
        ironGolem = 42,
        item = 4,
        lavaSlime = 16,
        lightningBolt = 41,
        map = 50,
        minecart = 34,
        mushroomCow = 7,
        ocelot = 43,
        painting = 32,
        pig = 8,
        player = 27,
        rabbit = 46,
        sheep = 9,
        silverfish = 21,
        skeleton = 19,
        slime = 23,
        smallFireball = 38,
        snowGolem = 44,
        snowball = 29,
        spider = 20,
        squid = 36,
        thrownPotion = 31,
        tnt = 2,
        unknownItem = 30,
        villager = 12,
        villagerZombie = 39,
        witch = 47,
        wolf = 11,
        zombie = 14,
        zombiePigman = 15,
    }

    /**
     * Defines vanilla posion effects
     */
    enum PotionEffect {
        absorption = 22,
        bad_omen = 28,
        blindness = 15,
        conduit_power = 26,
        confusion = 9,
        damageBoost = 5,
        damageResistance = 11,
        digSlowdown = 4,
        digSpeed = 3,
        fatal_poison = 25,
        fireResistance = 12,
        harm = 7,
        heal = 6,
        healthBoost = 21,
        hunger = 17,
        invisibility = 14,
        jump = 8,
        levitation = 24,
        movementSlowdown = 2,
        movementSpeed = 1,
        nightVision = 16,
        poison = 19,
        regeneration = 10,
        saturation = 23,
        slow_falling = 27,
        village_hero = 29,
        waterBreathing = 13,
        weakness = 18,
        wither = 20,
    }
    
    /**
     * Defines the three dimensions currently available for player 
     */
    enum Dimension {
        END = 2,
        NETHER = 1,
        NORMAL = 0,
    }
    
    /**
     * Defines item animation types
     */
    enum ItemAnimation {
        bow = 4,
        normal = 0,
    }
    
    /**
     * Defines numeric representation for each block side
     */
    enum BlockSide {
        DOWN = 0,
        EAST = 5,
        NORTH = 2,
        SOUTH = 3,
        UP = 1,
        WEST = 4,
    }
    
    /**
     * Defines numeric ids of all vanilla enchantments
     */
    enum Enchantment {
        AQUA_AFFINITY = 7,
        BANE_OF_ARTHROPODS = 11,
        BINDING_CURSE = 27,
        BLAST_PROTECTION = 3,
        CHANNELING = 32,
        DEPTH_STRIDER = 8,
        EFFICIENCY = 15,
        FEATHER_FALLING = 2,
        FIRE_ASPECT = 13,
        FIRE_PROTECTION = 1,
        FLAME = 21,
        FORTUNE = 18,
        FROST_WALKER = 25,
        IMPALING = 29,
        INFINITY = 22,
        KNOCKBACK = 12,
        LOOTING = 14,
        LOYALTY = 31,
        LUCK_OF_THE_SEA = 23,
        LURE = 24,
        MENDING = 26,
        POWER = 19,
        PROJECTILE_PROTECTION = 4,
        PROTECTION = 0,
        PUNCH = 20,
        RESPIRATION = 6,
        RIPTIDE = 30,
        SHARPNESS = 9,
        SILK_TOUCH = 16,
        SMITE = 10,
        THORNS = 5,
        UNBREAKING = 17,
        VANISHING_CURSE = 28,
    }
    
    /**
     * Defines what enchantments can or cannot be applied to every instrument 
     * type
     */
    enum EnchantType {
        all = 16383,
        axe = 512,
        book = 16383,
        boots = 4,
        bow = 32,
        chestplate = 8,
        fishingRod = 4096,
        flintAndSteel = 256,
        helmet = 1,
        hoe = 64,
        leggings = 2,
        pickaxe = 1024,
        shears = 128,
        shovel = 2048,
        weapon = 16,
    }
    
    /**
     * Defines possible render layers (display methods) for blocks
     */
    enum BlockRenderLayer {
        alpha = 4099,
        alpha_seasons = 5,
        alpha_single_side = 4,
        blend = 6,
        doubleside = 2,
        far = 9,
        opaque = 0,
        opaque_seasons = 1,
        seasons_far = 10,
        seasons_far_alpha = 11,
        water = 7,
    }   
    
    /**
     * Defines possible game difficulty
     */
    enum GameDifficulty {
        PEACEFUL = 0,
        EASY = 1,
        NORMAL = 2,
        HARD = 3,
    }

    /**
     * Defines possible game modes
     */
    enum GameMode {
        SURVIVAL = 0,
        CREATIVE = 1,
        ADVENTURE = 2,
        SPECTATOR = 3,
    }
}
/**
 * Module used to manipulate player. Player is also an entity in Minecraft, so 
 * you can use all the functions from [[Entity]] module as well. To get player's 
 * entity id, call [[Player.get]] function
 */
declare namespace Player {
    /**
     * @returns player's entity id that can be used with most of [[Entity]] 
     * function
     */
    function get(): number;

    /**
     * @deprecated No longer supported
     */
    function getNameForEnt(ent: number): string;

    /**
     * @deprecated No longer supported
     */
    function getName(): void;

    /**
     * @returns current dimension numeric id, one of the [[Native.Dimension]] 
     * values or custom dimension id
     */
    function getDimension(): number;

    /**
     * @returns true if specified entity is of player type, false otherwise
     */
    function isPlayer(ent: number): boolean;

    /**
     * Fetches information about the objects player is currently pointing
     */
    function getPointed(): 
    /**
     * @param pos pointed block position
     * @param vec look vector
     * @param block pointed block data, if player doesn't look at the block, air
     * block is returned ({id: 0, data: 0})
     * @param entity pointed entity, if no entity's pointed, returns -1
     */
    {pos: BlockPosition, vec: Vector, block: Tile, entity: number};

    /**
     * @deprecated No longer supported
     */
    function getInventory(loadPart: any, handleEnchant: any, handleNames: any): void;

    /**
     * Adds items to player's inventory, stacking them if possible
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     * @param boolean if set to false, function drops items that could not be 
     * added to player's inventory, destroys them otherwise
     */
    function addItemToInventory(id: number, count: number, data: number, extra?: ItemExtra, preventDrop?: boolean): void;

    /**
     * @param handleEnchant No longer supported and should not be passed
     * @param handleNames No longer supported and should not be passed
     * @returns item in player's hand 
     */
    function getCarriedItem(handleEnchant: boolean, handleNames: boolean): ItemInstance;

    /**
     * Sets item in player's hand
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setCarriedItem(id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * Decreases carried item count by specified number
     * @param count amount of items to decrease carried item by, default value 
     * is 1
     */
    function decreaseCarriedItem(count?: number): void;

    /**
     * @param slot slot id, from 0 to 36
     * @returns information about item in the specified inventory slot
     */
    function getInventorySlot(slot: number): ItemInstance;

    /**
     * Sets contents of the specified inventory slot
     * @param slot slot id, from 0 to 36
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setInventorySlot(slot: number, id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * @param slot armor slot id, should be one of the [[Native.ArmorType]] 
     * values
     * @returns information about item in the specified armor slot
     */
    function getArmorSlot(slot: number): ItemInstance;

    /**
     * Sets contents of the specified armor slot
     * @param slot armor slot id, should be one of the [[Native.ArmorType]] 
     * values
     * @param id item id
     * @param count item count
     * @param data item data
     * @param extra item extra
     */
    function setArmorSlot(slot: number, id: number, count: number, data: number, extra?: ItemExtra): void;

    /**
     * @returns currently selected inventory slot, from 0 to 8
     */
    function getSelectedSlotId(): void;

    /**
     * Selects currently selected inventory slot
     * @param slot slot id to be selected, from 0 to 8
     */
    function setSelectedSlotId(slot: number): void;

    /**
     * Sets specified coordinates as player's position
     */
    function setPosition(x: number, y: number, z: number): void;

    /**
     * @returns current player's position
     */
    function getPosition(): Vector;

    /**
     * Changes current player position by specified vector
     */
    function addPosition(x: number, y: number, z: number): void;

    /**
     * Set player's velocity using velocity vector
     * @param x velocity
     * @param y velocity
     * @param z velocity
     */
    function setVelocity(x: number, y: number, z: number): void;

    /**
     * Get player's velocity
     * @returns [[Vector]] containing player's velocity
     */
    function getVelocity(): void;

    /**
     * Updates current entity's velocity by specified valus
     */
    function addVelocity(x: number, y: number, z: number): void;

    /**
     * @returns an object that allows to manipulate player experience
     * @deprecated Consider using [[Player.getExperience]], 
     * [[Player.setExperience]], [[Player.addExperience]]
     */
    function experience(): PlayerExperience;

    /**
     * @returns player's current experience
     */
    function getExperience(): number;

    /**
     * Sets player's experience
     * @param exp experience value to be set
     */
    function setExperience(exp: number): void;

    /**
     * Adds specified amount of experience to the current value
     * @param exp amount to be added
     */
    function addExperience(exp: number): void;

    /**
     * @returns an object that allows to manipulate player level
     * @deprecated Consider using [[Player.getLevel]], 
     * [[Player.setLevel]], [[Player.addLevel]]
     */
    function level(): PlayerLevel;

    /**
     * @returns player's current level
     */
    function getLevel(): void;

    /**
     * Sets player's level
     * @param level level value to be set
     */
    function setLevel(level: number): void;

    /**
     * Adds specified amount of level to the current value
     * @param level amount to be added
     */
    function addLevel(level: number): void;

    /**
     * @returns an object that allows to manipulate player flying ability and
     * state
     * @deprecated Consider using [[Player.getFlyingEnabled]], 
     * [[Player.setFlyingEnabled]], [[Player.getFlying]], [[Player.setFlying]]
     */
    function flying(): PlayerFlying;

    /**
     * @returns true if player is allowed to fly, false otherwise
     */
    function getFlyingEnabled(): boolean;

    /**
     * Enables or disables player's ability to fly
     * @param enabled whether the player can fly or not
     */
    function setFlyingEnabled(enabled: boolean): void;

    /**
     * @returns true if player is flying, false otherwise
     */
    function getFlying(): boolean;

    /**
     * Changes player's current flying state, call [[Player.setFlyingEnabled]]
     * to be able to set this property to true
     * @param enabled whether the player should fly or not
     */
    function setFlying(enabled: boolean): void;

    /**
     * @returns an object that allows to manipulate player's exhaustion
     * @deprecated Consider using [[Player.getExhaustion]] and
     * [[Player.setExhaustion]]
     */
    function exhaustion(): PlayerExhaustion;

    /**
     * @returns player's current exhaustion
     */
    function getExhaustion(): number;

    /**
     * Sets player's exhaustion
     * @param value exhaustion value to be set
     */
    function setExhaustion(value: number): void;

    /**
     * @returns an object that allows to manipulate player's exhaustion
     * @deprecated Consider using [[Player.getHunger]] and
     * [[Player.setHunger]]
     */
    function hunger(): PlayerHunger;
    
    /**
     * @returns player's current hunger
     */
    function getHunger(): void;

    /**
     * Sets player's hunger
     * @param value hunger value to be set
     */
    function setHunger(value: number): void;

    /**
     * @returns an object that allows to manipulate player's saturation
     * @deprecated Consider using [[Player.getSaturation]] and
     * [[Player.setSaturation]]
     */
    function saturation(): PlayerSaturation;
    
    /**
     * @returns player's current saturation
     */
    function getSaturation(): number;

    /**
     * Sets player's saturation
     * @param value saturation value to be set
     */
    function setSaturation(value: number): void;

    /**
     * @returns an object that allows to manipulate player's health
     * @deprecated Consider using [[Player.getHealth]] and
     * [[Player.setHealth]]
     */
    function health(): PlayerHealth;

    /**
     * @returns player's current health
     */
    function getHealth(): number;

    /**
     * Sets player's health
     * @param value health value to be set
     */
    function setHealth(value: number): void;

    /**
     * @returns an object that allows to manipulate player's score
     * @deprecated Consider using [[Player.getScore]]
     */
    function score(): PlayerScore;

    /**
     * @returns player's current score
     */
    function getScore(): number;

    /**
     * Sets view zoom, to reset value call [[Player.resetFov]]
     * @param fov view zoom, default zoom is about 70
     */
    function setFov(fov: number): void;

    /**
     * Resets view zoom to the default value
     */
    function resetFov(): void;

    /**
     * Sets player's camera to the specified entity
     * @param ent entity id
     */
    function setCameraEntity(ent: number): void;

    /**
     * Resets player's camera if it was previously set to another entity
     */
    function resetCameraEntity(): void;

    /**
     * Class used to manipulate player's experience
     * @deprecated Consider using [[Player.getExperience]], 
     * [[Player.setExperience]], [[Player.addExperience]]
     */
    class PlayerExperience {
        /**
         * @returns player's current experience
         */
        public get(): number;

        /**
         * Sets player's experience
         * @param exp experience value to be set
         */
        public set(exp: number): void;

        /**
         * Adds specified amount of experience to the current value
         * @param exp amount to be added
         */
        public add(exp: number): void;
    }

    /**
     * Class used to manipulate player's level
     * @deprecated Consider using [[Player.getLevel]], 
     * [[Player.setLevel]], [[Player.addLevel]]
     */
    class PlayerLevel {
        /**
         * @returns player's current level
         */
        public get(): number;

        /**
         * Sets player's level
         * @param level level value to be set
         */
        public set(level: number): void;

        /**
         * Adds specified amount of level to the current value
         * @param level amount to be added
         */
        public add(level: number): void;
    }

    /**
     * Class used to manipulate player's flying ability and state
     * @deprecated Consider using [[Player.getFlyingEnabled]], 
     * [[Player.setFlyingEnabled]], [[Player.getFlying]], [[Player.setFlying]]
     */
    class PlayerFlying {
        /**
         * @returns true if player is flying, false otherwise
         */
        public get(): boolean;

        /**
         * Changes player's current flying state, call 
         * [[Player.PlayerFlying.setEnabled]] to be able to set this property to 
         * true
         * @param enabled whether the player should fly or not
         */
        public set(enabled: boolean): void;
            
        /**
         * @returns true if player is allowed to fly, false otherwise
         */
        public getEnabled(): boolean;

        /**
         * Enables or disables player's ability to fly
         * @param enabled whether the player can fly or not
         */
        public setEnabled(enabled: boolean): void;
    }

    /**
     * Class used to manipulate player's exhaustion
     * @deprecated Consider using [[Player.getExhaustion]] and
     * [[Player.setExhaustion]]
     */
    class PlayerExhaustion {
        /**
         * @returns player's current exhaustion
         */
        public get(): number;

        /**
         * Sets player's exhaustion
         * @param value exhaustion value to be set
         */
        public set(value: number): void;
    }

    /**
     * Class used to manipulate player's hunger
     * @deprecated Consider using [[Player.getHunger]] and
     * [[Player.setHunger]]
     */
    class PlayerHunger {
        /**
         * @returns player's current hunger
         */
        public get(): number;

        /**
         * Sets player's hunger
         * @param value hunger value to be set
         */
        public set(value: number): void;
    }
    
    /**
     * Class used to manipulate player's saturation
     * @deprecated Consider using [[Player.getSaturation]] and
     * [[Player.setSaturation]]
     */
    class PlayerSaturation {
        /**
         * @returns player's current saturation
         */
        public get(): number;

        /**
         * Sets player's saturation
         * @param value saturation value to be set
         */
        public set(value: number): void;
    }
    
    /**
     * Class used to manipulate player's health
     * @deprecated Consider using [[Player.getHealth]] and
     * [[Player.setHealth]]
     */
    class PlayerHealth {
        /**
         * @returns player's current health
         */
        public get(): number;

        /**
         * Sets player's health
         * @param value health value to be set
         */
        public set(value: number): void;
    }
    
    /**
     * Class used to manipulate player's score
     * @deprecated Consider using [[Player.getScore]]
     */
    class PlayerScore {
        /**
         * @returns player's current score
         */
        public get(): number;
    }
}
/**
 * Module used to manipulate crafring recipes for vanilla and custom workbenches
 */
declare namespace Recipes {
    /**
     * Adds new shaped crafting recipe. For example:
     * 
     * Simple example:
     * 
     * ```ts
     * Recipes.addShaped({id: 264, count: 1, data: 0}, [
     *     "ax", 
     *     "xa", 
     *     "ax"
     * ], ['x', 265, 0, 'a', 266, 0]); 
     * ```
     * 
     * @param result recipe result item
     * @param mask recipe shape, up to three string corresponding to the three 
     * crafting field rows. Each character means one item in the field. 
     * E.g. the pickaxe recipe should look like this:
     * 
     * ```
     * "+++"
     * " | "
     * " | "
     * ```
     * 
     * Do not use empty lines or line endings, if the recipe can be placed 
     * within less then three rows or cols. E.g. to craft plates, you can use 
     * a shape like this: 
     * 
     * ```
     * "--"
     * ```
     * 
     * @param data an array explaining the meaning of each character within 
     * mask. The array should contain three values for each symbol: the symbol
     * itself, item id and item data. 
     * @param func function to be called when the craft is processed
     * @param prefix recipe prefix. Use a non-empty values to register recipes
     * for custom workbenches
     */
    function addShaped(result: ItemInstance, mask: string[], data: (string|number)[], func?: CraftingFunction, prefix?: string): void;

    /**
     * Same as [[Recipes.addShaped]], but you can specifiy result as three 
     * separate values corresponding to id, count and data
     */
    function addShaped2(id: number, count: number, aux: number, mask: string[], data: (string|number)[], func?: CraftingFunction, prefix?: string): void;

    /**
     * Adds new shapeless crafting recipe. For example: 
     * 
     * ```ts
     * Recipes.addShapeless({id: 264, count: 1, data: 0}, 
     *     [{id: 265, data: 0}, {id: 265, data: 0}, {id: 265, data: 0}, 
     *     {id: 266, data: 0}, {id: 266, data: 0}, {id: 266, data: 0}]);
     * ```
     * 
     * @param result recipe result item
     * @param data crafting ingregients, an array of objects representing item 
     * id and data
     * @param func function to be called when the craft is processed
     * @param prefix recipe prefix. Use a non-empty values to register recipes
     * for custom workbenches
     */
    function addShapeless(result: ItemInstance, data: {id: number, data: number}[], func?: CraftingFunction, prefix?: string): void;

    /**
     * Deletes recipe by its result 
     * @param result recipe result
     */
    function deleteRecipe(result: ItemInstance): void;
    
    /**
     * Removes recipe by result id, count and data
     */
    function removeWorkbenchRecipe(id: number, count: number, data: number): void;
    
    /**
     * Gets all available recipes for the recipe result
     * @returns java.util.Collection object containing [[WorkbenchRecipe]]s
     */
    function getWorkbenchRecipesByResult(id: number, count: number, data: number): java.util.Collection<WorkbenchRecipe>;

    /**
     * Gets all avaliable recipes containing an ingredient
     * @returns java.util.Collection object containing [[WorkbenchRecipe]]s
     */
    function getWorkbenchRecipesByIngredient(id: number, data: number): java.util.Collection<WorkbenchRecipe>;

    /**
     * Gets recipe by the field and prefix
     * @param field [[WorkbenchField]] object containing crafting field 
     * information
     * @param prefix recipe prefix, defaults to empty string (vanilla workbench)
     * @returns [[WorkbenchRecipe]] instance, containing useful methods and 
     * recipe information
     */
    function getRecipeByField(field: WorkbenchField, prefix?: string): WorkbenchRecipe|null;

    /**
     * Gets recipe result item by the field and recipe prefix
     * @param field [[WorkbenchField]] object containing crafting field 
     * information
     * @param prefix recipe prefix, defaults to empty string (vanilla workbench)
     */
    function getRecipeResult(field: WorkbenchField, prefix?: string): ItemInstance|null;

    /**
     * Performs crafting by the field contents and recipe prefix
     * @param field [[WorkbenchField]] object containing crafting field 
     * information
     * @param prefix recipe prefix, defaults to empty string (vanilla workbench)
     */
    function provideRecipe(field: WorkbenchField, prefix?: string): ItemInstance|null;

    /**
     * Adds new furnace recipe
     * @param sourceId source item id
     * @param sourceData source item data
     * @param resultId resulting item id
     * @param resultData resulting item data
     * @param prefix prefix, used to create recipes for non-vanilla furnaces
     */
    function addFurnace(sourceId: number, sourceData: number, resultId: number, resultData: number, prefix?: string): void;

    /**
     * Adds new furnace recipe with no need to manually specify input item data
     * (it defaults to -1)
     * @param sourceId source item id
     * @param resultId result item id
     * @param resultData resulting item data
     * @param prefix prefix, used to create recipes for non-vanilla furnaces. If
     * the prefix is not empty and some recipes for this source exist for 
     * vanilla furnace, they are removed
     */
    function addFurnace(sourceId: number, resultId: number, resultData: number, prefix?: string): void
    
    /**
     * Removes furnace recipes by source item
     * @param sourceId source item id
     * @param sourceData source item data
     */
    function removeFurnaceRecipe(sourceId: number, sourceData: number): void;

    /**
     * Adds fuel that can be used in the furnace
     * @param id fuel item id
     * @param data fuel item data
     * @param time burning time in ticks
     */
    function addFurnaceFuel(id: number, data: number, time: number): void;

    /**
     * Removes furnace fuel by fuel item id and data
     */
    function removeFurnaceFuel(id: number, data: number): void;

    /**
     * @param prefix recipe prefix used for non-vanilla furnaces
     * @returns furnace recipe resulting item
     */
    function getFurnaceRecipeResult(id: number, data: number, prefix?: string): ItemInstance;

    /**
     * @returns fuel burn duration by fuel item id and data
     */
    function getFuelBurnDuration(id: number, data: number): number;

    /**
     * Gets furnace recipes by result and custom prefix
     * @param resultId result item id
     * @param resultData result item data
     * @param prefix recipe prefix used for non-vanilla furnaces
     * @returns java.util.Collection of 
     */
    function getFurnaceRecipesByResult(resultId: number, resultData: number, prefix: string): java.util.Collection<FurnaceRecipe>;

    /**
     * Class used to simplify creation of custom workbenches
     */
    class WorkbenchUIHandler {

        /**
         * Constructs a new Workbench UI handler
         * @param target target [[WindowContent.elements]] section
         * @param targetCon target container
         * @param field workbench field
         */
        constructor(target: UI.UIElementSet, targetCon: UI.Container, field: WorkbenchField);

        /**
         * Sets custom workbench prefix
         * @param prefix custom workbench prefix
         */
        setPrefix(prefix: string): void;

        /**
         * Refreshes all the recipes in the workbench
         * @returns amount of recipes displayed
         */
        refresh(): number;

        /**
         * Runs recipes refresh in the ticking thread delaying refresh process 
         * for a tick. To get recipes count use 
         * [[WorkbenchUIHandler.setOnRefreshListener]]
         */
        refreshAsync(): void;

        /**
         * Registers listener to be notified when some recipe is selected
         * @param listener recipe selection listener
         */
        setOnSelectionListener(listener: {onRecipeSelected: (recipe: WorkbenchRecipe) => void}): void;

        /**
         * Registers listener to be notified when the workbench starts and 
         * completes refreshing
         * @param listener workbench refresh listener
         */
        setOnRefreshListener(listener: {onRefreshCompleted: (count: number) => void, onRefreshStarted: () => void}): void;

        /**
         * Deselects current recipe (asynchronuously)
         */
        deselectCurrentRecipe(): void;

        /**
         * Sets workbench recipes displaying limit. By default it is 250
         * @param count count of the recipes to show
         */
        setMaximumRecipesToShow(count: number): void;
    }


    /**
     * Object representing workbench recipe
     */
    interface WorkbenchRecipe extends java.lang.Object {
        /**
         * @returns true, if the recipe is valid, false otherwise
         */
        isValid(): boolean;

        /**
         * @param c recipe entry character
         * @returns recipe entry by entry character
         */
        getEntry(c: string): RecipeEntry;
        
        /**
         * @returns resulting item instance
         */
        getResult(): ItemInstance;

        /**
         * @returns true if specified item is recipe's result, false otherwise
         */
        isMatchingResult(id: number, count: number, data: number): boolean;

        /**
         * @returns recipe unique mask identifier
         */
        getRecipeMask(): string;
        
        /**
         * @param field workbench field to compare with
         * @returns true if the field contains this recipe, false otherwise
         */
        isMatchingField(field: WorkbenchField): boolean;

        /**
         * @returns all recipe's entries in a java array
         */
        getSortedEntries(): native.Array<RecipeEntry>;
        
        /**
         * Tries to fill workbench field with current recipe
         * @param field workbench field to fill
         */
        putIntoTheField(field: WorkbenchField): void;

        /**
         * @returns recipe prefix. Defaults to empty string
         */
        getPrefix(): string;

        /**
         * Sets prefix value for the recipe
         * @param prefix new prefix value
         */
        setPrefix(prefix: string): void;

        /**
         * Compares current recipe's prefix with given one
         * @param prefix prefix value to compare with
         * @returns true, if current recipe's prefix is the same as given one,
         * false otherwise
         */
        isMatchingPrefix(prefix: string): boolean;

        /**
         * Sets craft function for the recipe
         * @param callback function to be called on item craft
         */
        setCallback(callback: CraftingFunction): void;

        /**
         * @returns current crafting function or null if no one was specified
         */
        getCallback(): CraftingFunction|null;

    }


    /**
     * Object representing furnace recipe
     */
    interface FurnaceRecipe extends java.lang.Object {
        /**
         * @returns true, if the recipe is valid, false otherwise
         */
        isValid(): boolean;
        
        /**
         * @returns resulting item instance
         */
        getResult(): ItemInstance;

        /**
         * @returns recipe prefix. Defaults to empty string
         */
        getPrefix(): string;

        /**
         * Sets prefix value for the recipe
         * @param prefix new prefix value
         */
        setPrefix(prefix: string): void;

        /**
         * Compares current recipe's prefix with given one
         * @param prefix prefix value to compare with
         * @returns true, if current recipe's prefix is the same as given one,
         * false otherwise
         */
        isMatchingPrefix(prefix: string): boolean;
    }


    /**
     * Function called when the craft is in progress
     * @param api object used to perform simple recipe manipulations and to prevent 
     * crafting
     * @param field array containing all slots of the crafting field
     * @param result recipe result item instance
     */
    interface CraftingFunction{
        (api: WorkbenchFieldAPI, field: UI.Slot[], result: ItemInstance): void
    }

    /**
     * Object representing workbench field
     */
    interface WorkbenchField {
        /**
         * @param slot slot index
         * @returns workbench slot instance by slot index
         */
        getFieldSlot(slot: number): UI.Slot,

        /**
         * @returns js array of all slots
         */
        asScriptableField(): UI.Slot[]
    }


    /**
     * Object used to work with workbench field in the craft function
     */
    interface WorkbenchFieldAPI {

        /**
         * @param slot slot index
         * @returns workbench slot instance by slot index
         */
        getFieldSlot(slot: number): UI.Slot;

        /**
         * Decreases item count in the specified slot, if possible
         * @param slot slot index
         */
        decreaseFieldSlot(slot: number): void;

        /**
         * Prevents crafting event
         */
        prevent(): void;
        
        /**
         * @returns true, if crafting event was prevented, false otherwise
         */
        isPrevented(): boolean;
    }

    
    /**
     * Crafting recipe entry
     */
    interface RecipeEntry extends java.lang.Object {

        /**
         * @param slot slot to compare with
         * @returns true if recipe entry matches the slot
         */
        isMatching(slot: UI.Slot): boolean;

        /**
         * @param entry entry to compare with
         * @returns true if recipe entry matches another entry
         */
        isMatching(entry: RecipeEntry): boolean;
    }
}


/** 
 * An interface of the object that is used as [[Render.constructor]] parameter 
 * */
interface RenderParameters {
    /** Name of the cached Render object to be used */
    name?: string;
    /** Item ID for Item Sprite render type */
    item?: number;
    /** Relative path to the texture used by render */
    skin?: string;
    /** Render scale multiplier */
    scale?: number;
    /** If set to true, a humanoid render is constructed, empty otherwise */
    raw?: boolean;
}

/** An interface of the object that is used as [[Render.addPart]] parameter*/
interface PartParameters {

}

interface PartObject {

}

/**
 * Class that is used to give mobs, animations and blocks custom shape.
 */
declare class Render {
    /**
     * Creates a new Render instance with specified parameters
     * @param {RenderParameters | number | string} parameters specifies all the 
     * properties of the object. If it is a number, vanilla render id is used,
     * if it is a string, used as [[RenderParameters.name]] name property
     */
    constructor(parameters?: RenderParameters | string | number);

    /** 
     * Returns render id that can be used to set render to the mob, animation 
     * or block.
     */
    getID(): number;
    /**
     * Same as [[getId]]
     */
    getId(): number;
    /**
     * Same as [[getId]]
     */
    getRenderType(): number;

    /** Returns render's model that defines its visual shape. */
    getModel(): Model;

    /** 
     * Returns a part of the render by its full name. By default, there are six 
     * parts available to the user. However, you can create your own parts that 
     * suit your needs and get them by their names.
     * @param partName full name of the part separated by "."
     * @returns part of the render with specified full name
     */
    getPart(partName: string): ModelPart;

    /**
     * Adds a part to the render by its full name. The part should be descendent 
     * of one of the six default parts, see [[ModelPart]] for details.
     * @param partName full name of the part separated by "."
     * @param partParams specifies all the parameters of the part
     * @returns newly created part
     */
    addPart(partName: string, partParams?: PartParameters): ModelPart;

    /**
     * Sets all the properties of the part by its full name. 
     * @param partName full name of the part separated by "."
     * @param partParams specifies all the parameters of the part
     */
    setPartParams(partName: string, partParams?: PartParameters): never;

    /**
     * Sets the content and all properties of the part by its full name.
     * @param name full name of the part separated by "."
     * @param data array of part data objects to be applied to the part
     * @param params specifies all the parameters of the part
     */
    setPart(name: string, data: PartObject[], params: PartParameters): never;
    
}

declare class Model {

}

declare class ModelPart {

}
/**
 * Module used to save data between world sessions
 */
declare namespace Saver {
    /**
     * Creates saves scope, a universal data storage container. This storage 
     * container should be used whenever you need to save some data between 
     * world sessions. If you want to store primitives, use an object to wrap 
     * them
     * 
     * Example:
     * ```ts
     * var thirst = 20;
     * Saver.addSavesScope("thirst", 
     *     function read(scope){
     *         thirst = scope? scope.thirst: 20;
     *     },
     *     
     *     function save(){
     *         return {"value": thirst};
     *     }
     * );
     * ```
     * @param name saves scope name
     * @param loadFunc function used to load saved data
     * @param saveFunc function used to save data
     */
    function addSavesScope(name: string, loadFunc: LoadScopeFunc, saveFunc: SaveScopeFunc): void;

    /**
     * Registers object as scope saver
     * @param name saves scope name
     * @param saver object that implements [[Scope.ScopeSaver]] interface and 
     * can be loaded and saved via its functions calls
     */
    function registerScopeSaver(name: string, saver: any): ScopeSaver;

    function registerObjectSaver(name: string, saver: any): void;

    function registerObject(obj: any, saverId: any): void;

    function setObjectIgnored(obj: any, ignore: any): void;

    /**
     * Function that returns object representing created scope. No 
     * primitives are allowed as return value
     */
    type SaveScopeFunc = 
    /**
     * @returns saved data
     */
    () => object;

    /**
     * Function that loads data from scope
     */
    type LoadScopeFunc = 
    /**
     * @param scope data 
     */
    (scope: object|null) => void;

    /**
     * Interface that should be implemented to pass the object as 
     * [[Saver.registerScopeSaver]] parameter
     */
    interface ScopeSaver {
        /**
         * Function used to load saved data
         */
        read: LoadScopeFunc,

        /**
         * Function used to save data
         */
        save: SaveScopeFunc
    }
}
/**
 * Module used to create and manipulate threads. Threads let you execute 
 * time-consuming tasks without blocking current execution thread
 */
declare namespace Threading {
    /**
     * Function used to format error messages in a custom way
     */
    type ErrorMessageFormatFunction = 
    /**
     * @param error java.lang.Throwable instance or javascript exception
     * @param priority current thread priority
     */
    (error: any, priority: number) => string;


    /**
     * Function used to create formatted error message with the full debug
     * information about exception in one of the threads. Usually called by Core 
     * Engine
     * @param error java.lang.Throwable instance or javascript exception
     * @param name thread name used to localize errors if there are any
     * @param priority current thread priority
     * @param formatFunc function that formats the exception itself
     */
    function formatFatalErrorMessage(error: any, name: string, priority: number, formatFunc: ErrorMessageFormatFunction): string;

    /**
     * Creates and runs new thread with specified function as a task
     * @param name thread name used to localize errors if there are any
     * @param func function that runs in the new thread. Usually it is some 
     * time-consuming task, that is executed in the new thread to avoid blocking
     * user interfaces
     * @param priority priority of the thread (integer value). The higher 
     * priority is, the quicker the task will be executed. Default value is 0
     * @param isErrorFatal if true, all errors in the thread are considered 
     * fatal and lead to fatal error AlertDialog, formatted with [[formatFunc]]
     * @param formatFunc function that formats exceptions in the thread to 
     * display in fatal error AlertDialog
     * @return java.lang.Thread instance representing created thread
     */
    function initThread(name: string, func: () => void, priority?: number, isErrorFatal?: boolean, formatFunc?: ErrorMessageFormatFunction): java.lang.Thread;

    /**
     * Gets thread by its name
     * @param name name of the thread
     * @return java.lang.Thread instance representing the thread
     */
    function getThread(name: string): java.lang.Thread;
}
/**
 * Module used to manage block and tools material and create tools with all
 * required properties
 */
declare namespace ToolAPI {

    /**
     * Creates new material with specified breaking speed multiplier. Some of 
     * the materials are already registered: 
     * 
     * *stone* - used for pickaxes
     * 
     * *wood* - used for axes
     * 
     * *dirt* - used for shovels
     * 
     * *plant* - used for all plants (no vanilla tool supports this material)
     * 
     * *fibre* - used for swords (to break web)
     * 
     * *cobweb* - currently not used
     * 
     * *unbreaking* - used for unbreaking blocks, liquids, end portal, etc.
     * 
     * @param name new (or existing) material name
     * @param breakingMultiplier multiplier used to calculate block breaking 
     * speed. 1 is a default value for dirt and 3 is a default value for stone
     */
    function addBlockMaterial(name: string, breakingMultiplier: number): void;

    /**
     * Creates new tool material with specified parameters. Some of the tool 
     * materials are already registered:
     * 
     * *wood* - used for wooden instruments
     * 
     * *stone* - used for stone instruments
     * 
     * *iron* - used for iron instruments
     * 
     * *golden* - used for golden instruments
     * 
     * *diamond* - used for diamond instruments
     * 
     * @param name new (or existing) material name
     * @param material parameters describing material properties
     */
    function addToolMaterial(name: string, material: ToolMaterial): void;

    /**
     * Registers item as a tool
     * @param id numeric item id
     * @param toolMaterial registered tool material name or tool material object
     * used to register the tool
     * @param blockMaterials block material names that can be broken with this 
     * instrument. For example, you can use *["stone"]* for the pickaxes
     * @param params additional tool parameters
     */
    function registerTool(id: number, toolMaterial: string|ToolMaterial, blockMaterials: string[], params?: ToolParams): void;

    /**
     * Registers item as a sword
     * @param id numeric item id
     * @param toolMaterial registered tool material name or tool material object
     * used to register the sword
     * @param params additional tool parameters
     */
    function registerSword(id: number, toolMaterial: string|ToolMaterial, params?: ToolParams): void;

    /**
     * Registers material and digging level for the specified block
     * @param uid numeric tile id
     * @param materialName material name
     * @param level block's digging level
     * @param isNative used to mark vanilla blocks data. Generally used within 
     * Core Engine code and should not be used within mods until you really 
     * know what you're doing
     */
    function registerBlockMaterial(uid: number, materialName: string, level?: number, isNative?: boolean): void;

    /**
     * Sets digging level for block. If digging level of tool is higher then 
     * block's one, the block is dropped
     * @param uid numeric tile id
     * @param level block's digging level
     */
    function registerBlockDiggingLevel(uid: number, level: number): void;

    /**
     * Registers material and digging level for the specified blocks
     * @param materialName material name
     * @param UIDs an array of numeric tiles ids 
     * @param isNative used to mark vanilla blocks data. Generally used within 
     * Core Engine code and should not be used within mods until you really 
     * know what you're doing
     */
    function registerBlockMaterialAsArray(materialName: string, UIDs: number[], isNative: boolean): void;

    /** 
     * @deprecated No longer supported
     */
    function refresh(): void;

    /**
     * @param blockID numeric tile id
     * @returns object containing ToolAPI block data or undefined if no block 
     * data was specified for this block
     */
    function getBlockData(blockID: number): BlockData|undefined;

    /**
     * @param blockID numeric tile id
     * @returns object containing block material information or null, if no 
     * block data was specified for this block
     */
    function getBlockMaterial(blockID: any): BlockMaterial|null;

    /**
     * @param blockID numeric tile id
     * @returns destroy level of the block with specified id or 0, if no block 
     * data was specified for this block
     */
    function getBlockDestroyLevel(blockID: any): number;

    /**
     * @param extra item extra instance, if not specified, method uses carried
     * item's extra
     * @returns enchant data object, containing enchants used for blocks
     * destroy speeed calculations
     */
    function getEnchantExtraData(extra?: ItemExtra): EnchantData;

    /**
     * Applies fortune drop modifier to the drop array
     * @param drop drop array containing number of the arrays
     * @param level enchantment level
     */
    function fortuneDropModifier(drop: ItemInstanceArray[], level: number): ItemInstanceArray[];

    /**
     * Calculates destroy time for the block that is being broken with specefied 
     * tool at the specified coords. Used mostly by Core Engine to apply break
     * time
     * @param ignoreNative if block and item are native items, and this 
     * parameter is set to true, all the calculations will still be performed
     */
    function getDestroyTimeViaTool(fullBlock: Tile, toolItem: ItemInstance, coords: Callback.ItemUseCoordinates, ignoreNative?: boolean): void;

    /**
     * @param itemID numeric item id
     * @returns tool information stored in slightly modified 
     * [[ToolAPI.ToolParams]] object or null if no tool data was specified
     */
    function getToolData(itemID: number): ToolParams|null;

    /**
     * @param itemID numeric item id
     * @returns tool's breaking level or 0 if no tool data was provided
     */
    function getToolLevel(itemID: number): number;

    /**
     * @param itemID numeric item id
     * @param blockID numeric tile id
     * @returns digging level if specified tool can mine specified block, 0 if
     * data for the tool or for the block was not specified or if specified tool
     * cannot mine specified block
     */
    function getToolLevelViaBlock(itemID: number, blockID: number): void;

    /**
     * @returns carried tool information stored in slightly modified 
     * [[ToolAPI.ToolParams]] object or null if no tool data was specified
     */
    function getCarriedToolData(): void;

    /**
     * @returns carried tool's breaking level or 0 if no tool data was provided
     */
    function getCarriedToolLevel(): void;

    /**
     * Resets ToolAPI engine state
     */
    function resetEngine(): void;

    /**
     * Spawns experience orbs on the specified coordinate
     * @param value amount of experience to spawn
     */
    function dropExpOrbs(x: number, y: number, z: number, value: number): void;

    /**
     * Spawns random amount of experience on the specified block coordinates
     * @param coords block coordinates
     * @param minVal minimum amount of orbs to be spawned
     * @param maxVal maximum amount of orbs to be spawned
     * @param modifier additional experiences, usually passed from 
     * [[ToolAPI.EnchantData.experience]] field
     */
    function dropOreExp(coords: Vector, minVal: any, maxVal: any, modifier: any): void;

    /**
     * @param blockID numeric tile id
     * @returns 
     */
    function getBlockMaterialName(blockID: number): string|null;


    /**
     * Object used to describe tool material type
     */
    interface ToolMaterial {
        /**
         * Devidor used to calculate block breaking
         * speed. 2 is a default value for wooden instruments and 12 is a default 
         * value for golden instruments
         */
        efficiency?: number, 

        /**
         * Additional damage for the instruments, this value
         * is added to the base tool damage. If damage is not integer, it is rounded
         * to the higher integer with the chance of the fractional part, e.g. if 
         * the value is *3.3*, the damage will be 4 with the chance of 30%
         */
        damage?: number, 

        /**
         * Durability of the tool, 33 is a default value 
         * for golden tools and 1562 is a default value for diamond tools
         */
        durability?: number, 

        /**
         * Block breaking level, 1 is wooden instruments, 4 is diamond 
         * instruments. If block's breaking level is less or equal to the tool's
         * level, block will be dropped when broken
         */
        level?: number
    }


    /**
     * Object used to describe block material
     */
    interface BlockMaterial {
        /**
         * Multiplier used to calculate block breaking speed
         */
        multiplier: number,

        /**
         * Block material name
         */
        name: string
    }

    
    /**
     * Object used to store all of the ToolAPI block data
     */
    interface BlockData {
        /**
         * Material data used for this block
         */
        material: BlockMaterial,

        /**
         * Digging level of the block. If digging level of tool is higher then 
         * block's one, the block is dropped
         */
        level: number,

        /**
         * Specifies whether the block was added as vanilla item or as a custom
         * block. True, if the block is vanilla, false if the block is custom. 
         * Should not generally be changed
         */
        isNative: boolean
    }


    /**
     * Object containing additional parameters and functions used by Core Engine 
     * to work with the tool
     */
    interface ToolParams {
        /**
         * Numeric id of the item that replaces tool item when it's broken. 
         * By default it is 0 (the tool disappears)
         */
        brokenId?: number, 

        /**
         * Base damage of the instrument, is added to the material damage to 
         * calculate the tool's final damage. Default is 0
         */
        damage?: number, 

        /**
         * Function used to recalculate block destroy time based on some custom 
         * logic
         * @param tool tool item
         * @param coords coordinates where the block is being broken
         * @param block the block that is being broken
         * @param timeData some time properties that can be used to calculate 
         * destroy time for the tool and block
         * @param timeData.base base destroy time of the block
         * @param timeData.devider tool material devidor
         * @param timeData.modifier devider applied due to efficiency enchantment
         * @param defaultTime default block destroy time, calculated as 
         * *base / devider / modifier*
         * @param enchantData tool's enchant data
         */
        calcDestroyTime?: (tool: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, timeData: {base: number, devider: number, modifier: number}, defaultTime: number, enchantData?: EnchantData) => number, 

        /**
         * If true, the tool is vanilla Minecraft tool. Generally used within 
         * Core Engine code and should not be used within mods until you really 
         * know what you're doing
         */
        isNative?: boolean,

        /**
         * Function that is called when the block is destroyed
         * @param item tool item
         * @param coords coordinates where the block is destroyed
         * @param block the block that is destroyed
         * @returns true if default damage should not be applied to the instrument,
         * false otherwise
         */
        onDestroy?: (item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile) => boolean,

        /**
         * Function that is called when players attacks some entity with the tool
         * @param item tool item
         * @param victim unique numeric id of the entity that is attacked
         * @returns true if default damage should not be applied to the instrument,
         * false otherwise
         */
        onAttack?: (item: ItemInstance, victim: number) => boolean,

        /**
         * If true, breaking blocks with this tool makes it break 2x faster
         */
        isWeapon?: boolean,

        /**
         * Funciton that is called when the instument is broken
         * @param item tool item
         * @returns true if default breaking behavior (replacing by *brokenId* item) 
         * should not be applied 
         */
        onBroke?: (item: ItemInstance) => boolean,

        /**
         * Function that is used to change enchant data object before all the 
         * calculations. Can be used to add some enchantment properties, such as 
         * silk touch, efficiency, unbreaking or fortune
         * @param enchantData tool's enchant data
         * @param item tool item
         * @param coords coordinates where the block is being broken. Passed only if
         * the block is destroyed
         * @param block destroyed block data. Passed only if the block is destroyed
         */
        modifyEnchant?: (enchantData: EnchantData, item: ItemInstance, coords?: Callback.ItemUseCoordinates, block?: Tile) => void,

        /**
         * Function that is called when the block that has a destroy function is 
         * destroyed
         * @param coords coordinates where the block is destroyed
         * @param carried an item in player's hand
         * @param fullTile block that was destroyed
         */
        onMineBlock?: (coords: Callback.ItemUseCoordinates, carried: ItemInstance, fullTile: Tile) => void
    }


    /**
     * Object containing some of the enchants that are used to calculate block 
     * destroy time
     */
    interface EnchantData {
        /**
         * If true, the item has Silk Touch enchantment
         */
        silk: boolean,

        /**
         * Specifies the level of Fortune enchantment, or 0 if the item doesn't
         * have this enchant
         */
        fortune: number,

        /**
         * Specifies the level of Efficiency enchantment, or 0 if the item 
         * doesn't have this enchant
         */
        efficiency: number,

        /**
         * Specifies the level of Unbreaking enchantment, or 0 if the item 
         * doesn't have this enchant
         */
        unbreaking: number,

        /**
         * Specifies the amount of additional experience that is dropped when 
         * player breaks block with specified item
         */
        experience: number
    }
}
/**
 * Module that can be used to localize mods
 * All default strings (e.g. item names, windows titles, etc.) in the mod should 
 * be in English. Add translations to theese strings using 
 * [[Translation.addTranslation]]. For items and blocks translations are applied 
 * automatically. For the other strings, use [[Translation.translate]]
 */
declare namespace Translation {
    /**
     * Adds translations for specified object in several languages
     * @param name default string in English
     * @param localization object containing two-letter language codes as keys
     * and localized strings in the specified language as values
     */
    function addTranslation(name: string, localization: object): void;
    
    /**
     * Translates string from English to current game language (if available). 
     * Add translations via [[Translation.addTranslation]] to apply them 
     * @param name default string in English
     * @returns string in the current game language or input string if 
     * translation is not available
     */
    function translate(name: string): string;
    
    /**
     * @returns two-letter language code for current game language
     */
    function getLanguage(): string;
}
declare namespace UI {
    /**
     * Containers are used to properly manipulate windows and save slots 
     * contents and windows state between window opens. Every [[TileEntity]] has 
     * a built-in container that can be accessed as [[TileEntity.container]]
     */
    class Container implements Recipes.WorkbenchField{
        /**
         * Creates a new instance of [[Container]]
         */
        constructor();

        /**
         * Creates a new instance of [[Container]] and initializes its parent. 
         * See [[Container.setParent]] for details
         */
        constructor(parent: TileEntity|null|any);


        /**
         * If container is a part of [[TileEntity]], this field stores reference 
         * to it, otherwise null. You can also assign any value of any type to
         * it using [[Container.setParent]] method or using constructor 
         * parameter. Consider using [[TileEntity.getParent]] instead of direct 
         * field access
         */
        parent: TileEntity|null|any;

        /**
         * Same as [[Container.parent]]
         */
        tileEntity: TileEntity|null|any;

        /**
         * Sets container's parent object, for [[TileEntity]]'s container it 
         * should be a [[TileEntity]] reference, otherwise you can pass any 
         * value to be used in your code later
         * @param parent an object to be set as container's parent
         */
        setParent(parent: TileEntity|null|any): void;

        /**
         * Getter for [[Container.parent]] field
         */
        getParent(): TileEntity|null|any;

        /**
         * Gets the slot by its name. If a slot with specified name doesn't 
         * exists, creates an empty one with specified name
         * @param name slot name
         * @returns contents of the slot in a [[Slot]] object. You can modify it
         * to change the contents of the slot
         */
        getSlot(name: string): Slot;

        /**
         * Gets the slot by its name. If a slot with specified name doesn't 
         * exists, creates an empty one with specified name
         * @param name slot name
         * @returns contents of the slot in a [[FullSlot]] object containing 
         * more useful methods for slot manipulation
         */
        getFullSlot(name: string): FullSlot;

        /**
         * Set slot's content by its name. If a slot with specified name doesn't 
         * exists, creates an empty one with specified name and item
         * @param name slot name
         */
        setSlot(name: string, id: number, count: number, data: number): void;

        /**
         * Set slot's content by its name. If a slot with specified name doesn't 
         * exists, creates an empty one with specified name and item
         * @param name slot name
         * @param extra item extra value. Note that it should be an instance of
         * ItemExtra and not its numeric id
         */
        setSlot(name: string, id: number, count: number, data: number, extra: ItemExtra): void;

        /**
         * Validates slot contents. If the data value is less then 0, it becomes
         * 0, if id is 0 or count is less then or equals to zero, slot is reset 
         * to an empty one
         * @param name slot name
         */
        validateSlot(name: string): void;

        /**
         * Clears slot's contents
         * @param name slot name
         */
        clearSlot(name: string): void;

        /**
         * Drops slot's contents on the specified coordinates and clears the 
         * slot
         * @param name slot name
         */
        dropSlot(name: string, x: number, y: number, z: number): void;

        /**
         * Drops the contents of all the slots in the container on the specified
         * coordinates and clears them
         */
        dropAt(x: number, y: number, z: number): void;

        /**
         * Validates all the slots in the container
         */
        validateAll(): void;

        /**
         * @returns currently opened [[IWindow]] or null if no window is currently 
         * opened in the container
         */
        getWindow(): IWindow|null;

        /**
         * Opens [[IWindow]] object in the container
         * @param window [[IWindow]] object to be opened
         */
        openAs(window: IWindow): void;

        /**
         * Closes currently opened window 
         */
        close(): void;

        /**
         * Sets an object to be notified when the window is closed
         * @param listener object to be notified when the window is closed
         */
        setOnCloseListener(listener: {
            /**
             * @param container [[Container]] the window was opened in
             * @param window an instance of [[IWindow]] that was opened
             */
            onClose: (container: Container, window: IWindow) => void
        }): void;
    
        /**
         * @returns true, if some window is opened in the container
         */
        isOpened(): boolean;

        /**
         * Same as [[Container.getWindow]]
         */
        getGuiScreen(): IWindow|null;

        /**
         * @returns window's content object (usually specified in the window's 
         * constructor) if a window was opened in the container, null otherwise
         */
        getGuiContent(): WindowContent|null;

        /**
         * Returns window's element by its name
         * @param name element name
         */
        getElement(name: string): Element;

        /**
         * Passes any value to the element
         * @param elementName element name
         * @param bindingName binding name, you can access the value from the 
         * element by this name
         * @param value value to be passed to the element
         */
        setBinding(elementName: string, bindingName: string, value: any): void;
        
        /**
         * Gets any value from the element
         * @param elementName element name
         * @param bindingName binding name, you can access the value from the 
         * element by this name. Some binding names are reserved for additional
         * element information, e.g. "element_obj" contains pointer to the
         * current object and "element_rect" contains android.graphics.Rect 
         * object containing drawing rectangle 
         * @returns value that was get from the element or null if the element 
         * doesn't exist
         */
        getBinding(elementName: string, bindingName: string): any;
        
        /**
         * Sets "value" binding value for the element. Used to set scales values
         * @param name element name
         * @param value value to be set for the element
         */
        setScale(name: string, value: number): void;

        /**
         * @param name element name
         * @returns "value" binding value, e.g. scale value, or null if no 
         * element with specified name exist
         */
        getValue(name: string): number|null;

        /**
         * Sets "text" binding value for the element. Used to set element's text
         * @param name element name
         * @param value value to be set for the element
         */
        setText(name: string, value: string): void;

        /**
         * 
         * @param name element name
         * @returns "text" binding value, usually the text displayed on the 
         * element, or null if no element with specified name exist
         */
        getText(name: string): string|null;

        /**
         * @param name element name
         * @returns true if the element is currently touched
         */
        isElementTouched(name: string): boolean;

        /**
         * Forces ui elements of the window to refresh
         * @param onCurrentThread if true, the elements will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateUIElements(onCurrentThread?: boolean): void;

        /**
         * Forces ui drawables of the window to refresh
         * @param onCurrentThread if true, the drawables will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateUIDrawing(onCurrentThread?: boolean): void;

        /**
         * Forces ui elements and drawables of the window to refresh
         * @param onCurrentThread if true, the elements drawables will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateUI(onCurrentThread?: boolean): void;
        
        /**
         * @deprecated No longer supported
         */
        refreshSlots(): void;

        /**
         * @deprecated No longer supported
         */
        applyChanges(): void;

        /**
         * If the container is a custom workbench, you can set the slot prefix
         * via this method call. [[Container.getFieldSlot]] will get field slot
         * by *prefix + slot* name
         * @param prefix custom workbench slot prefix
         */
        setWbSlotNamePrefix(prefix: string): void;

        /**
         * @param slot slot index
         * @returns workbench slot instance by slot index
         */
        getFieldSlot(slot: number): UI.Slot;

        /**
         * @returns js array of all slots
         */
        asScriptableField(): UI.Slot[];

    }


    interface IWindow {
        /**
         * Opens window wihout container. It is usually mor
         */
        open(): void;

        /**
         * Closes window without container. Use only if the window was opened 
         * without container
         */
        close(): void;

        /**
         * Called up to 66 times a second to update window's content
         * @param time current time in milliseconds
         */
        frame(time: number): void;

        /**
         * Forces ui elements of the window to refresh
         * @param onCurrentThread if true, the elements will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateElements(onCurrentThread: boolean): void;

        /**
         * Forces ui drawables of the window to refresh
         * @param onCurrentThread if true, the drawables will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateDrawing(onCurrentThread: boolean): void;

        /**
         * @returns true if the window is opened, false otherwise
         */
        isOpened(): boolean;

        /**
         * @returns true if the window has an inventory that should be updated
         */
        isInventoryNeeded(): boolean;

        /**
         * @returns true if the window can change its contents position
         */
        isDynamic(): boolean;

        /**
         * Gets all the elements in the window
         * @returns java.util.HashMap containing string element name as keys and
         * [[Element]] instances as values
         */
        getElements(): java.util.HashMap<string, Element>;

        /**
         * @returns window's content object (usually specified in the window's 
         * constructor)
         */
        getContent(): WindowContent;

        /**
         * @returns object containing current style of the window
         */
        getStyle(): Style;

        /**
         * @returns [[Container]] that was used to open this window or null, if
         * the window wasn't opened in container
         */
        getContainer(): Container|null;

        /**
         * Sets container for the current window. Be careful when calling it 
         * manually. You should prefer opening the window via 
         * [[Container.openAs]] call
         * @param container [[Container]] to be associated with current window
         * or null to associate no container with current window
         */
        setContainer(container: Container|null): void;

        /**
         * Turns debug mode for the window on and off
         * @param enabled if true, additional debug information will be drawn on
         * the window canvas
         */
        setDebugEnabled(enabled: boolean): void;
    }


    /**
     * Represents window of required size that can be opened in container to 
     * provide any required UI facilities
     */
    class Window implements IWindow {

        /**
         * Constructs new [[Window]] object with specified bounds
         * @param location object containing window's bounds. Note that the 
         * bounds change the width of the window, but the full width of the 
         * window becomes 1000 units.
         */
        constructor(location: UI.WindowLocation);

        /**
         * Constructs new [[Window]] object with specified content
         * @param content window's content
         */
        constructor(content: WindowContent);

        /**
         * Constructs new empty [[Window]] object
         */
        constructor();

        /**
         * Opens window wihout container. It is usually mor
         */
        open(): void;

        /**
         * Adds another window as adjacent window, so that several windows open
         * at the same time. This allows to devide window into separate parts 
         * and treat them separately. 
         * @param window another window to be added as adjacent
         */
        addAdjacentWindow(window: UI.Window): void;

        /**
         * Removes adjacent window from the adjacent windows list
         * @param window another window that was added as adjacent
         */
        removeAdjacentWindow(window: UI.Window): void;

        /**
         * Closes window without container. Use only if the window was opened 
         * without container
         */
        close(): void;

        /**
         * Called up to 66 times a second to update window's content
         * @param time current time in milliseconds
         */
        frame(time: number): void;

        /**
         * Forces ui elements of the window to refresh
         * @param onCurrentThread if true, the elements will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateElements(onCurrentThread: boolean): void;

        /**
         * Forces ui drawables of the window to refresh
         * @param onCurrentThread if true, the drawables will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateDrawing(onCurrentThread: boolean): void;

        /**
         * @returns true if the window is opened, false otherwise
         */
        isOpened(): boolean;

        /**
         * @returns true if the window has an inventory that should be updated
         */
        isInventoryNeeded(): boolean;

        /**
         * @returns true if the window can change its contents position
         */
        isDynamic(): boolean;

        /**
         * Gets all the elements in the window
         * @returns java.util.HashMap containing string element name as keys and
         * [[Element]] instances as values
         */
        getElements(): java.util.HashMap<string, Element>;

        /**
         * @returns window's content object (usually specified in the window's 
         * constructor)
         */
        getContent(): WindowContent;

        /**
         * @returns object containing current style of the window
         */
        getStyle(): Style;

        /**
         * @returns [[Container]] that was used to open this window or null, if
         * the window wasn't opened in container
         */
        getContainer(): Container|null;

        /**
         * Sets container for the current window. Be careful when calling it 
         * manually. You should prefer opening the window via 
         * [[Container.openAs]] call
         * @param container [[Container]] to be associated with current window
         * or null to associate no container with current window
         */
        setContainer(container: Container|null): void;

        /**
         * Turns debug mode for the window on and off
         * @param enabled if true, additional debug information will be drawn on
         * the window canvas
         */
        setDebugEnabled(enabled: boolean): void;

        /**
         * Specifies whether touch events should be handled by this window or 
         * passed to underlying windows (to the game). By default all windows 
         * are touchable
         * @param touchable pass true if the window should handle touch events, 
         * false otherwise
         */
        setTouchable(touchable: boolean): void;

        /**
         * @returns true if the window is touchable, false otherwise
         */
        isTouchable(): boolean;

        /**
         * Specifies whether the window should darken and block background. 
         * Default value is false
         * @param blockingBackground pass true if you want the window to block 
         * background
         */
        setBlockingBackground(blockingBackground: boolean): void;

        /**
         * @returns true if window blocks background
         */
        isBlockingBackground(): boolean;

        /**
         * Allows window to be displayed as game overlay without blocking 
         * Minecraft sounds. Note that this drops window's FPS. Default value is
         * false
         * @param inGameOverlay if true, the window is opened in PopupWindow 
         * to avoid blocking Minecraft sounds
         */
        setAsGameOverlay(inGameOverlay: boolean): void;

        /**
         * @returns true if the window is game overlay, false otherwise
         */
        isNotFocusable(): void;

        /**
         * Specifies the content of the window
         * @param content content object to be applied to the window
         */
        setContent(content: WindowContent): void;
    
        /**
         * @param dynamic specify true, if the window contains dynamic 
         * (animated) elements, false otherwise. By default all windows are 
         * dynamic. Make them static for better performance
         */
        setDynamic(dynamic: boolean): void;

        /**
         * @param inventoryNeeded specify true if the window requires player's 
         * inventoty. Default value is false
         */
        setInventoryNeeded(inventoryNeeded: boolean): void;

        /**
         * @returns window's current location object
         */
        getLocation(): WindowLocation;

        /**
         * @returns unit size (in pixel) in the window's bounds
         */
        getScale(): number;

        /**
         * Overrides style properties of the current style by the values 
         * specified in the style parameter
         * @param style js object where keys represent binding names and values
         * represent texture gui names
         */
        setStyle(style: BindingsSet): void;

        /**
         * Sets new style object as current window's style. If the new style is
         * a different object then an old one, forces window invalidation
         * @param style [[Style]] object to be used as style for the window
         */
        setStyle(style: Style): void;

        /**
         * Gets custom property by its name. Custom properties can be used to
         * store some values containing window's current state. Note that these 
         * properties are not saved between Inner Core launches
         * @param name custom property name
         * @returns value set by [[Window.setProperty]] or null if no value was
         * specified for this name
         */
        getProperty(name: string): any|null;
        
        /**
         * Sets custom property value
         * @param name custom property name
         * @param value custom property value
         */
        putProperty(name: string, value: any): void;

        /**
         * Sets any window as current window's parent. If current window closes,
         * parent window closes too
         * @param window window to be used as parent window for the current 
         * window
         */
        setParentWindow(window: IWindow): void;

        /**
         * @returns current window's parent window
         */
        getParentWindow(): IWindow;

        /**
         * Sets listener to be notified about window opening/closing events
         */
        setEventListener(listener: WindowEventListener): void;

        /**
         * Writes debug information about current window to the log
         */
        debug(): void;
    }


    /**
     * Class representing several windows opened at the same. For example, 
     * [[StandartWindow]] is a window group that consists of several separate
     * windows
     */
    class WindowGroup implements IWindow{
        /**
         * Constructs new [[WindowGroup]] instance
         */
        constructor();

        /**
         * Removes window from group by its name
         * @param name window name
         */
        removeWindow(name: string): void;

        /**
         * Adds window instance with specified name to the group
         * @param name window name
         * @param window window to be added to the group
         */
        addWindowInstance(name: string, window: Window): void;

        /**
         * Creates a new window using provided description and adds it to the 
         * group
         * @param name window name
         * @param content window descripion object
         * @returns created [[Window]] object
         */
        addWindow(name: string, content: WindowContent): Window;

        /**
         * @param name window name
         * @returns window from the group by its name or null if no window with 
         * such a name was added
         */
        getWindow(name: string): Window|null;

        /**
         * @param name window name
         * @returns window's description object if a window with specified name 
         * exists or null otherwise
         */
        getWindowContent(name: string): WindowContent|null;

        /**
         * Sets content for the window by its name
         * @param name window name
         * @param content content pbkect 
         */
        setWindowContent(name: string, content: WindowContent): void;

        /**
         * @returns java.util.Collection object containing all the [[Window]]s 
         * in the group
         */
        getAllWindows(): java.util.Collection<Window>;

        /**
         * @returns java.util.Collection object containing string names of the 
         * windows in the group
         */
        getWindowNames(): java.util.Collection<string>;

        /**
         * Forces window refresh by its name
         * @param name name of the window to refresh
         */
        refreshWindow(name: string): void;

        /**
         * Forces refresh for all windows
         */
        refreshAll(): void;

        /**
         * Moves window with specified name to the top of the group
         * @param name window name
         */
        moveOnTop(name: string): void;
/**
         * Opens window wihout container. It is usually mor
         */
        open(): void;

        /**
         * Closes window without container. Use only if the window was opened 
         * without container
         */
        close(): void;

        /**
         * Called up to 66 times a second to update window's content
         * @param time current time in milliseconds
         */
        frame(time: number): void;

        /**
         * Forces ui elements of the window to refresh
         * @param onCurrentThread if true, the elements will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateElements(onCurrentThread: boolean): void;

        /**
         * Forces ui drawables of the window to refresh
         * @param onCurrentThread if true, the drawables will be refreshed 
         * immediately, otherwise refresh event will be posted. Default value 
         * if false. Ensure you are in the UI thread if you pass true as the 
         * parameter
         */
        invalidateDrawing(onCurrentThread: boolean): void;

        /**
         * @returns true if the window is opened, false otherwise
         */
        isOpened(): boolean;

        /**
         * @returns true if the window has an inventory that should be updated
         */
        isInventoryNeeded(): boolean;

        /**
         * @returns true if the window can change its contents position
         */
        isDynamic(): boolean;

        /**
         * Gets all the elements in the window
         * @returns java.util.HashMap containing string element name as keys and
         * [[Element]] instances as values
         */
        getElements(): java.util.HashMap<string, Element>;

        /**
         * @returns window's content object (usually specified in the window's 
         * constructor)
         */
        getContent(): WindowContent;

        /**
         * @returns object containing current style of the window
         */
        getStyle(): Style;

        /**
         * @returns [[Container]] that was used to open this window or null, if
         * the window wasn't opened in container
         */
        getContainer(): Container|null;

        /**
         * Sets container for the current window. Be careful when calling it 
         * manually. You should prefer opening the window via 
         * [[Container.openAs]] call
         * @param container [[Container]] to be associated with current window
         * or null to associate no container with current window
         */
        setContainer(container: Container|null): void;

        /**
         * Turns debug mode for the window on and off
         * @param enabled if true, additional debug information will be drawn on
         * the window canvas
         */
        setDebugEnabled(enabled: boolean): void;
    }


    /**
     * Class used to create standart ui for the mod's machines. 
     * [[StandartWindow]] is a [[WindowGroup]] that has three windows with names
     * *"main"*, *"inventory"* and *"header"*. They represent custom window 
     * contents, player's inventoty and winow's header respectively
     */
    class StandartWindow extends WindowGroup {
        /**
         * Constructs new [[StandartWindow]] with specified content. 
         * Content is applied to the main window, header and inventory remain
         * the same
         * @param content object containing window description
         */
        constructor(content: WindowContent);
    }


    // class AdaptiveWindow extends WindowGroup {
    //     /**
    //      * Constructs a new empty [[AdaptiveWindow]]
    //      */
    //     constructor();

    //     /**
    //      * Constructs new [[AdaptiveWindow]] with specified content
    //      * @param content object containing window description
    //      */
    //     constructor(content: WindowContent);
        
    //     /**
    //      * Sets style profile for the current [[AdaptiveWindow]]
    //      * @param profile 0 for classic profile, 1 for default profile
    //      */
    //     setProfile(profile: number): void;

    //     /**
    //      * Forces [[AdaptiveWindow]] to be displayed using some profile
    //      * @param profile 0 for classic profile, 1 for default profile or -1 not
    //      * to force any profile. By default forced profile is -1
    //      */
    //     setForcedProfile(profile: number): void;
    // }


    /**
     * Class used to create windows with multiple tabs
     */
    class TabbedWindow extends WindowGroup {
        /**
         * Constructs new [[TabbedWindow]] with specified location
         * @param location location to be used for the tabbed window
         */
        constructor(location: WindowLocation);

        /**
         * Constructs new [[TabbedWindow]] with specified content
         * @param content object containing window description
         */
        constructor(content: WindowContent);

        /**
         * Sets window location (bounds) to draw window within
         * @param location location to be used for the tabbed window
         */
        setLocation(location: WindowLocation): void;

        /**
         * @returns tab content window width in units
         */
        getInnerWindowWidth(): number;

        /**
         * @returns tab content window height in units
         */
        getInnerWindowHeight(): number;

        /**
         * @returns tab selector window width in units
         */
        getWindowTabSize(): number;

        /**
         * @returns tab selector window width in global units
         */
        getGlobalTabSize(): number;

        /**
         * Sets content of the tab
         * @param index index of the tab. There are 12 tabs available, from 0 to
         * 11. The location of the tabs is as follows:
         * ```0    6
         * 1    7
         * 2    8
         * 3    9
         * 4    10
         * 5    11
         * ```
         * @param tabOverlay content of the tab selector
         * @param tabContent content of the window to be created for the tab
         * @param isAlwaysSelected if true, tab is always displayed as selected.
         * Default value is false
         */
        setTab(index: number, tabOverlay: UIElementSet, tabContent: WindowContent, isAlwaysSelected?: boolean): void;

        /**
         * Creates fake tab with no content
         * @param index index of the tab, see [[TabbedWindow.setTab]] for 
         * details
         * @param tabOverlay content of the tab selector
         */
        setFakeTab(index: number, tabOverlay: UIElementSet): void;

        /**
         * @param index index of the tab
         * @returns [[Window]] instance created for the specified tab or null if
         * no window was created for specified window
         */
        getWindowForTab(index: number): Window|null;
        
        /**
         * Specifies whether the window should darken and block background. 
         * Default value is false
         * @param blockingBackground pass true if you want the window to block 
         * background
         */
        setBlockingBackground(blockingBackground: boolean): void;

        /**
         * @returns current default tab index. If no default tab was specified 
         * via [[TabbedWindow.setDefaultTab]], the first tab added becomes 
         * default
         */
        getDefaultTab(): number;

        /**
         * Sets default tab index
         * @param tab index of the tab to be opened by default
         */
        setDefaultTab(tab: number): number;
        
        /**
         * Overrides style properties of the current style by the values 
         * specified in the style parameter
         * @param style js object where keys represent binding names and values
         * represent texture gui names
         */
        setStyle(style: BindingsSet): void;

        /**
         * Sets new style object as current window's style. If the new style is
         * a different object then an old one, forces window invalidation
         * @param style [[Style]] object to be used as style for the window
         */
        setStyle(style: Style): void;
    }


    /**
     * Class representing font used in the UI
     */
    class Font {
        /**
         * Aligns text to the start of the element (left for English locale)
         */
        static ALIGN_DEFAULT: number;

        /**
         * Aligns text to the center of the element
         */
        static ALIGN_CENTER: number;

        /**
         * Aligns text to the end of the element (right for English locale)
         */
        static ALIGN_END: number;

        /**
         * Constructs new instance of the font with specified parameters
         * @param color font color, android integer color value (produced by
         * android.graphics.Color)
         * @param size font size
         * @param shadow shadow offset
         */
        constructor(color: number, size: number, shadow: number);

        /**
         * Constructs new instance of the font with specified parameters
         * @param params parameters of the font
         */
        constructor(params: FontParams);

        /**
         * Draws text on the canvas using created font
         * @param canvas android.graphics.Canvas instance to draw the text on
         * @param x x coordinate of the text in pixels
         * @param y x coordinate of the text in pixels
         * @param text text string to draw
         * @param scale additional scale to apply to the text
         */
        drawText(canvas: android.graphics.Canvas, x: number, y: number, text: string, scale: number): void;

        /**
         * Calculates bounds of the text given text position, text string and 
         * additional scale
         * @returns android.graphics.Rect object containing calculated bounds of 
         * the text
         */
        getBounds(text: string, x: number, y: number, scale: number): android.graphics.Rect;

        /**
         * Calculates text width given text string and additional scale
         * @returns width of the specified string when painted with specified 
         * scale
         */
        getTextWidth(text: string, scale: number): number;

        /**
         * Calculates text height given text string and additional scale
         * @returns height of the specified string when painted with specified 
         * scale
         */
        getTextHeight(text: string, scale: number): number;

        /**
         * Converts current [[Font]] object to scriptable font description
         */
        asScriptable(): FontParams;

        /**
         * Sets listener to be notified about window opening/closing events
         */
        setEventListener(listener: WindowEventListener): void;

        /**
         * Sets listener to be notified about tab with specidied index 
         * opening/closing events
         * @param tab tab index
         * @param listener object to be notified about the events
         */
        setTabEventListener(tab: number, listener: WindowEventListener): void;
    }


    /**
     * Object used to handle windows opening and closing events
     */
    interface WindowEventListener {
        /**
         * Called when the window is opened
         * @param window current [[Window]] object
         */
        onOpen: (window: Window) => void,
        /**
         * Called when the window is closed
         * @param window current [[Window]] object
         */
        onClose: (window: Window) => void
    }


    /**
     * Class used to visualize configuration file contents in a simple way
     */
    class ConfigVisualizer {
        /**
         * Constructs new [[ConfigVisualizer]] instance with default elements 
         * names prefix (*config_vis*)
         * @param config configuration file to be loaded
         */
        constructor(config: Config);

        /**
         * Constructs new [[ConfigVisualizer]] instance with specified elements 
         * names prefix
         * @param config configuration file to be loaded
         * @param prefix elements names prefix used for this visualizer
         */
        constructor(config: Config, prefix: string);

        /**
         * Removes all elements with current element name prefix. In other 
         * words, removes all elements that were created by this 
         * [[ConfigVisualizer]] instance
         * @param elements target [[WindowContent.elements]] section
         */
        clearVisualContent(elements: UIElementSet): void;

        /**
         * Creates elements in the window to visualize configuration file
         * @param elements target [[WindowContent.elements]] section
         * @param pos top left position of the first element. Default position 
         * is (0, 0, 0)
         */
        createVisualContent(elements: UIElementSet, pos?: {x?: number, y?: number, z?: number}): void;
    }


    /**
     * Namespace containing method to get [[FrameTexture]] instances
     */
    namespace FrameTextureSource {
        /**
         * 
         * @param name gui texture name of the frame
         */
        function get(name: string): FrameTexture;
    }


    /**
     * Object used to manipulate frame textures. Frame texture allows to 
     */
    interface FrameTexture {
        /**
         * Expands side of the texture by specified amount of pixels
         * @param side side of the texture, one of the 
         * [[FrameTexture.SIDE_LEFT]], [[FrameTexture.SIDE_RIGHT]], 
         * [[FrameTexture.SIDE_UP]], [[FrameTexture.SIDE_DOWN]] constants
         * @returns expanded android.graphics.Bitmap instance with the frame
         */
        expandSide(side: number, pixels: number): android.graphics.Bitmap;

        /**
         * Expands texture to the specified side, filling the middle with 
         * specified color
         * @param color integer color value produced by android.graphics.Color 
         * class
         * @param sides array of booleans marking whether the side should be 
         * expanded or not. The order of the sides is
         * [[FrameTexture.SIDE_LEFT]], [[FrameTexture.SIDE_RIGHT]], 
         * [[FrameTexture.SIDE_UP]], [[FrameTexture.SIDE_DOWN]]
         * @returns expanded android.graphics.Bitmap instance with the frame
         */
        expand(width: number, height: number, color: number, sides: native.Array<boolean>): android.graphics.Bitmap;

        /**
         * Expands texture to the specified side, filling the middle with 
         * specified color
         * @param scale scale of the created bitmap
         * @param color integer color value produced by android.graphics.Color 
         * class
         * @param sides array of booleans marking whether the side should be 
         * expanded or not. See FrameTexture.expand parameters for details. 
         * Default behavior is to scale all sides
         * @returns expanded and scaled android.graphics.Bitmap instance with
         */
        expandAndScale(width: number, height: number, scale: number, color: number, sides?: native.Array<boolean>): android.graphics.Bitmap;

        /**
         * @returns original frame texture source stored in 
         * android.graphics.Bitmap instance
         */
        getSource(): android.graphics.Bitmap;

        /**
         * @param side side of the texture, one of the 
         * [[FrameTexture.SIDE_LEFT]], [[FrameTexture.SIDE_RIGHT]], 
         * [[FrameTexture.SIDE_UP]], [[FrameTexture.SIDE_DOWN]] constants
         * @returns texture side source extracted from the original frame 
         * texture source stored in android.graphics.Bitmap instance
         */
        getSideSource(side: number): android.graphics.Bitmap;

        /**
         * @returns android.graphics.Color integer color value of the central
         * pixel of the source texture
         */
        getCentralColor(): number;
    }

    /**
     * Namespace containing methods used to get and add gui textures
     */
    namespace TextureSource {
        /**
         * @param name gui texture name
         * @returns android.graphics.Bitmap instance with the ui texture, if it 
         * was loaded, with "*missing_texture*" texture otherwise
         */
        function get(name: string): android.graphics.Bitmap;

        /**
         * 
         * @param name gui texture name
         * @returns android.graphics.Bitmap instance with the ui texture, if it 
         * was loaded, null otherwise
         */
        function getNullable(name: string): android.graphics.Bitmap|null;

        /**
         * Adds any bitmap as a gui texture with specified name
         * @param name gui texture name
         * @param bitmap android.graphics.Bitmap instance to be used as
         * gui texture
         */
        function put(name: string, bitmap: android.graphics.Bitmap): void;
    }

    namespace FrameTexture {
        /**
         * Specifies left side of the frame
         */
        const SIDE_LEFT: number;

        /**
         * Specifies right side of the frame
         */
        const SIDE_RIGHT: number;

        /**
         * Specifies top side of the frame
         */
        const SIDE_UP: number;

        /**
         * Specifies bottom side of the frame
         */
        const SIDE_DOWN: number; 
    }

    /**
     * Same as [[UI.getScreenHeight]]
     */
    function getScreenRelativeHeight(): number;

    /**
     * @returns screen height in units
     */
    function getScreenHeight(): number;

    /**
     * @returns current android.app.Activity instance that can be used as 
     * android.content.Context wherever required
     */
    function getContext(): android.app.Activity;

    /**
     * Object containing font parameters. If no color, size and shadow are 
     * specified, default values are ignored and white font with text size 20,
     * white color and 0.45 shadow is created
     */
    interface FontParams {

        /**
         * Font color, android integer color value (produced by
         * android.graphics.Color). Default value is black
         */
        color?: number,

        /**
         * Font size. Default value is 20
         */
        size?: number,

        /**
         * Font shadow offset. Default value is 0, witch produces no shadow
         */
        shadow?: number,

        /**
         * Font alignment, one of the [[Font.ALIGN_DEFAULT]],
         * [[Font.ALIGN_CENTER]], [[Font.ALIGN_END]] constants
         */
        alignment?: number,

        /**
         * Same as [[FontParams.alignment]]
         */
        align?: number,

        /**
         * If true, the font is bold, false otherwise. Default value is false
         */
        bold?: boolean,

        /**
         * If true, the font is italic, false otherwise. Default value is false
         */
        cursive?: boolean,
        
        /**
         * If true, the font is undelined, false otherwise. Default value is false
         */
        underline?: boolean
    }


    /**
     * Object representing window location used in window content object and 
     * [[WindowLocation]] constructor
     */
    interface WindowLocationParams {
        /**
         * X coordinate of the window in units, 0 by default
         */
        x?: number,

        /**
         * Y coordinate of the window in units, 0 by default
         */
        y?: number,

        /**
         * Width of the window in units, by default calculated to match right
         * screen bound
         */
        width?: number,

        /**
         * Height of the window in units, by default calculated to match bottom
         * screen bound
         */
        height?: number,

        /**
         * Paddings are distances from the window bounds to the elements in the
         * window
         */
        padding?: {
            top?: number,
            bottom?: number,
            left?: number,
            right?: number
        },

        /**
         * Defines scrollable window size along the X axis
         */
        scrollX?: number,

        /**
         * Defines scrollable window size along the Y axis
         */
        scrollY?: number,
    }


    /**
     * Class representing window's location. All coordinates are defined in 
     * units (given screen's widht is 1000 units)
     */
    class WindowLocation {
        /**
         * Constructs new [[WindowLocation]] instance with default position and 
         * size (fullscreen window)
         */
        constructor();

        /**
         * Constructs new [[WindowLocation]] instance with specified parameters
         * @param params 
         */
        constructor(params: WindowLocationParams);

        /**
         * Sets scrollable window size. Should be greater then window 
         * width/height for the changes to take effect
         * @param x scrollable window size along the X axis
         * @param y scrollable window size along the Y axis
         */
        setScroll(x: number, y: number): void;

        /**
         * Sets the size of the window 
         * @param x window's width
         * @param y window's height
         */
        setSize(x: number, y: number): void;

        /**
         * @returns window location as a js object. Note that paddings are not 
         * included into the object
         */
        asScriptable(): WindowLocationParams;

        /**
         * Creates a copy of current [[WindowLocation]] object
         * @returns newly created copy of the object
         */
        copy(): WindowLocation;

        /**
         * Sets window location parameters
         * @param x X coordinate of the window
         * @param y Y coordinate of the window
         * @param width width of the window
         * @param height height of the window
         */
        set(x: number, y: number, width: number, height: number): void;

        /**
         * Sets window location parameters from another [[WindowLocation]]. 
         * Note that paddings are not copied
         * instance
         * @param location another [[WindowLocation]] instance to copy 
         * parameters from
         */
        set(location: WindowLocation): void;

        /**
         * Sets window's scroll size to the windows size to remove scroll
         */
        removeScroll(): void;

        /**
         * Constant used to represent top padding
         */
        PADDING_TOP: number;

        /**
         * Constant used to represent bottom padding
         */
        PADDING_BOTTOM: number;

        /**
         * Constant used to represent left padding
         */
        PADDING_LEFT: number;

        /**
         * Constant used to represent right padding
         */
        PADDING_RIGHT: number;

        /**
         * Sets padding of the window
         * @param padding one of the [[WindowLocation.PADDING_TOP]], 
         * [[WindowLocation.PADDING_BOTTOM]], [[WindowLocation.PADDING_LEFT]],
         * [[WindowLocation.PADDING_RIGHT]] constants
         * @param value value of the padding to be assigned to appropriate 
         * window bound
         */
        setPadding(padding: number, value: number): void;

        /**
         * Sets the four paddings of the window for the appropriate bounds
         */
        setPadding(top: number, bottom: number, left: number, right: number): void;

        /**
         * @returns unit size (in pixels) in the fullscreen context (*screen width / 1000*)
         */
        getScale(): number;

        /**
         * @returns unit size (in pixels) in the window's bounds
         */
        getDrawingScale(): number;

        /**
         * @returns window's rectangle in the android.graphics.Rect object
         */
        getRect(): android.graphics.Rect;

        /**
         * Sets window's Z index. Z index determines how the window will be 
         * displayed when several windows are open
         * @param z window Z index
         */
        setZ(z: number): void;

        /**
         * @returns window's width in units (always 1000 by definition of the 
         * unit)
         */
        getWindowWidth(): number;
    
        /**
         * @returns window's height in units
         */
        getWindowHeight(): number;

        /**
         * Transforms dimension in fullscreen units to the dimension within
         * window's bounds
         * @param val value to be transformed
         */
        globalToWindow(val: number): number;

        /**
         * Transforms dimension within window's bounds to the dimension in 
         * fullscreen units
         * @param val value to be transformed
         */
        windowToGlobal(val: number): number;
    }


    /**
     * Class representing static or animated texture
     */
    class Texture {
        /**
         * Constructs new static [[Texture]] with specified bitmap
         * @param bitmap android.graphics.Bitmap instance
         */
        constructor(bitmap: android.graphics.Bitmap);

        /**
         * Constructs new animated [[Texture]] with specified frames
         * @param bitmaps an array of android.graphics.Bitmap instances to be 
         * used as animation frames
         */
        constructor(bitmaps: native.Array<android.graphics.Bitmap>);

        /**
         * Constructs new static or animated [[Texture]] with specified frames
         * @param obj texture name or array of texture names for animated 
         * textures. Accespts raw gui textures names and style bindings 
         * (formatted as "style:binding_name"). 
         * @param style [[Style]] object to look for style bindings. If not 
         * specified, default style is used
         */
        constructor(obj: string|string[], style?: Style);

        /**
         * Sets texture offsets in pixels from the upper left bound of the 
         * bitmap
         */
        readOffset(offset: {x: number, y: number}): void;

        /**
         * @returns frame number of the animation corresponding to current 
         * system time
         */
        getFrame(): number;

        /**
         * @param frame frame number
         * @returns android.graphics.bitmap object containing animation frame 
         * for the corresponding frame number
         */
        getBitmap(frame: number): android.graphics.Bitmap;

        /**
         * @returns width of the texture in pixels
         */
        getWidth(): number;

        /**
         * @returns height of the texture in pixels
         */
        getHeight(): number;

        /**
         * Resizes all the frames of the texture to the specified size
         * @param x 
         * @param y 
         */
        resizeAll(x: number, y: number): void;

        /**
         * Resizes all the frames by constant scale multiplier
         * @param scale scale to modify the frames by
         */
        rescaleAll(scale: number): void;

        /**
         * Resizes all the frames to match the first one
         */
        fitAllToOneSize(): void;
        
        /**
         * Releases all allocated resources, should be called when the texture 
         * is not longer needed 
         */
        release(): void;
    }

    
    /**
     * Object representing window's slot
     */
    interface Slot {
        id: number,
        count: number,
        data: number,
        extra: ItemInstance
    }

    /**
     * Java object representing window's slot with some additional useful 
     * methods
     */
    interface FullSlot extends Slot {
        /**
         * Sets the contents of the slot. Extra value is null by default
         */
        set(id: number, count: number, data: number): void,

        /**
         * Sets the contents of the slot with extra value
         * @param extra item extra value. Note that it should be an instance of
         * ItemExtra and not its numeric id
         */
        set(id: number, count: number, data: number, extra: ItemExtra): void,

        /**
         * Puts any property to the js object that is wrapped by [[FullSlot]] 
         * java object
         * @param name property name
         * @param property property value
         */
        put(name: string, value: any): void,

        /**
         * Gets integer value from the js object by its name
         * @param name property name
         * @returns property value or -1 if no value was provided
         */
        getInt(name: string): number,

        /**
         * Validates slot contents. If the data value is less then 0, it becomes
         * 0, if id is 0 or count is less then or equals to zero, slot is reset 
         * to an empty one
         */
        validate(): void,

        /**
         * Drops slot's contents on the specified coordinates and clears the 
         * slot
         */
        drop(x: number, y: number, z: number): void,

        /**
         * @returns underlying Slot instance
         */
        getTarget(): Slot,

        /**
         * @returns item id
         */
        getId(): number,

        /**
         * @returns item count
         */
        getCount(): number,

        /**
         * @returns item data value
         */
        getData(): number,

        /**
         * @returns item extra's numeric id
         */
        getExtraValue(): number,

        /**
         * @returns item extra object
         */
        getExtra(): ItemExtra,
        
        /**
         * @returns new [[FullSlot]] instance created from the current one
         */
        save(): FullSlot
    }

    interface Element {
        /**
         * Creates a new [[Texture]] instance with specified [[Style]] applied.
         * See [[Texture.constructor]] for parameters description
         */
        createTexture(texture: android.graphics.Bitmap|string|string[]): Texture;

        /**
         * Sets element's position in the window's unit coordinates
         * @param x x position
         * @param y y position
         */
        setPosition(x: number, y: number): void;

        /**
         * Sets element's size in the window's unit coordinates
         * @param width element's width 
         * @param height element's height
         */
        setSize(width: number, height: number): void;

        /**
         * Passes any value to the element
         * @param bindingName binding name, you can access the value from the 
         * element by this name
         * @param value value to be passed to the element
         */
        setBinding(bindingName: string, value: any): void;

        /**
         * Gets any value from the element
         * @param bindingName binding name, you can access the value from the 
         * element by this name. Some binding names are reserved for additional
         * element information, e.g. "element_obj" contains pointer to the
         * current object and "element_rect" contains android.graphics.Rect 
         * object containing drawing rectangle 
         * @returns value that was get from the element or null if the element 
         * doesn't exist
         */
        getBinding(bindingName: string): any;

    }

    /**
     * Object representing window style. Window styles allows to customize the 
     * way your windows look like
     */
    interface Style {
        /**
         * Default windows style
         */
        DEFAULT: UI.Style,

        /**
         * Classic (0.16.*-like) windows style
         */
        CLASSIC: UI.Style

        /**
         * Adds gui texture name to use for the specified window part
         * @param name binding name
         * @param value gui texture name
         */
        addBinding(name: string, value: string): void;

        /**
         * Gets texture binding bt its name. Searches first in the additional 
         * styles, then in the current style, then in all its parents
         * @param name binding name
         * @param fallback value to return on binding failure
         * @returns gui texture name if current object, additional styles or one 
         * of the parents contains such a binding name, fallback otherwise. 
         */
        getBinding(name: string, fallback: string): string;

        /**
         * Adds an additional style object to the current style
         * @param style additional style object to be added
         */
        addStyle(style: UI.Style): void;

        /**
         * @returns a copy of the current style. Only style bindings of the 
         * current style are copied, no parent/additional styles are copied
         */
        copy(): UI.Style;

        /**
         * Specifies parent style object for the current style
         * @param style style to be set as parent
         */
        inherit(style: UI.Style): void;

        /**
         * Adds all values from the js object as bindings
         * @param style js object where keys represent binding names and values
         * represent texture gui names
         */
        addAllBindings(style: BindingsSet): void;

        /**
         * @returns java.util.Collection<String> containing all binding names
         * from the current style object
         */
        getAllBindingNames(): java.util.Collection<string>;

        /**
         * If name is a style value (starts with "style:"), returns 
         * corresponding gui texture name, else returns input string
         * @param name style value or bitmap name
         */
        getBitmapName(name: string): string;
    }

    /**
     * Specifies contents and additional parameters for all types of windows
     */
    interface WindowContent {
        /**
         * Specifies window's location, used for [[Window]], [[TabbedWindow]]
         * and [[StandartWindow]]
         */
        location?: WindowLocationParams,

        /**
         * Specifies window's style, an object containing keys as style binding 
         * names and values as gui texture names correspinding to the binding
         */
        style?: BindingsSet,

        /**
         * If [[WindowContent.style]] is not specified, this argument is used 
         * instead
         */
        params?: BindingsSet,

        /**
         * Used for [[StandartWindow]]s. Specifies additional parameters for 
         * standart windows
         */
        standart?: {
            /**
             * Specifies minimum contents window height. If actual height is 
             * less then desired, scrolling is used
             */
            minHeight?: number,

            /**
             * Specifies background properties
             */
            background?: {
                /**
                 * If true, default window is created
                 */
                standart?: boolean,

                /**
                 * Background color integer value, produced by 
                 * android.graphics.Color class. Default is white
                 */
                color?: number,

                /**
                 * Background bitmap texture name. If the bitmap's size doesn't 
                 * match the screen size, bitmap will be streched to fit
                 */
                bitmap?: string,

                /**
                 * Specifies window's frame parameters
                 */
                frame?: {
                    /**
                     * Frame bitmap scale. Default value is 3
                     */
                    scale?: number,

                    /**
                     * Frame bitmap gui texture name. Defaults to *"frame"* 
                     * style binding or, if not specified, to 
                     * *"default_frame_8"* gui texture
                     */
                    bitmap?: string
                }
            }

            /**
             * Specifies additional parameters for standart window's header
             */
            header?: {
                /**
                 * Specifies whether the header should have shadow or not. If 
                 * true, the shadow is not displayed. Default is false
                 */
                hideShadow?: boolean,

                /**
                 * Specifies header height in units. Defaults to 80
                 */
                height?: number,

                /**
                 * If [[height]] is not specified, used to specify header height
                 * in units
                 */
                width?: number,

                /**
                 * Frame bitmap gui texture name. Defaults to *"headerFrame"* 
                 * style binding or, if not specified, to 
                 * *"default_frame_7"* gui texture
                 */
                frame?: string,

                /**
                 * Header background color integer value, produced by 
                 * android.graphics.Color class. Default is 
                 * *Color.rgb(0x72, 0x6a, 0x70)*
                 */
                color?: number,

                /**
                 * Specifies header text styles and value
                 */
                text?: {
                    /**
                     * Specifies header text. Defaults to *"No Title"*
                     */
                    text?: string,

                    /**
                     * Specifies font params for the header text. Only 
                     * [[FontParams.size]], [[FontParams.color]] and
                     * [[FontParams.shadow]] properties are used
                     */
                    font?: FontParams,

                    /**
                     * If [[font]] is not specified, used as [[FontParams.size]]
                     * value
                     */
                    size?: number,

                    /**
                     * If [[font]] is not specified, used as [[FontParams.color]]
                     * value
                     */
                    color?: number,

                    /**
                     * If [[font]] is not specified, used as [[FontParams.shadow]]
                     * value
                     */
                    shadow?: number
                },

                /**
                 * If true, close button is not displayed. Defaults to false
                 */
                hideButton?: boolean
            },

            /**
             * Specifies parameters for standart inventory window
             */
            inventory?: {
                /**
                 * Inventory width in units. Defaults to 300 units
                 */
                width?: number,

                /**
                 * Specifies additional padding for the inventory in units. 
                 * Defaults to 20 units
                 */
                padding?: number
            }
        }

        /**
         * Array of [[DrawingElement]] instances to be used as drawing 
         * components for the window
         */
        drawing?: DrawingElement[],

        /**
         * Object containing keys as gui elements names and [[UIElements]] 
         * instances as values. Gui elements are interactive components that are
         * used to create interfaces functionality
         */
        elements: UIElementSet,
    }

    interface DrawingElement {

    }

    interface UIElement {

    }


    /**
     * Object containing ui elements with key as the name and value as the 
     * [[UIElement]] instance to be used
     */
    interface UIElementSet { 
        [key: string]: UIElement
    }


    /**
     * Object containing binding names as keys and string values as gui textures
     * names
     */
    interface BindingsSet {
        [key: string]: string
    }
}
/**
 * Module used to create and manage Updatables. Updatables provide the proper
 * way to manage objects that update their state every tick. Updatables may not 
 * be notified every tick, if there are too many, to avoid user interface 
 * freezes
 */
declare namespace Updatable {
    /**
     * Adds object to updatables list
     * @param obj object to be added to updatables list
     */
    function addUpdatable(obj: Updatable): any;

    /**
     * @returns java.util.ArrayList instance containing all defined 
     * [[Updatable]] objects
     */
    function getAll(): java.util.ArrayList<Updatable>;

    /**
     * @returns current thread tick number
     */
    function getSyncTime(): number;
}

/**
 * Updatable is an object that is notified every tick via its 
 * [[Updatable.update]] method call
 */
interface Updatable {
    /**
     * Called every tick
     */
    update(): () => void,

    /**
     * Once true, the object will be removed from updatables list and will no 
     * longer receive update calls
     */
    remove?: boolean
}

/**
 * Numeric IDs of vanilla blocks in the inventory
 */
declare enum VanillaBlockID{
    element_117 = -128,
    element_115 = -126,
    element_114 = -125,
    element_113 = -124,
    element_111 = -122,
    element_110 = -121,
    element_116 = -127,
    element_109 = -120,
    element_106 = -117,
    element_105 = -116,
    element_101 = -112,
    element_103 = -114,
    element_99 = -110,
    element_97 = -108,
    tallgrass = 31,
    beacon = 138,
    element_79 = -90,
    nether_wart = 372,
    element_7 = -18,
    barrel = -203,
    element_57 = -68,
    element_55 = -66,
    element_102 = -113,
    element_10 = -21,
    skull = 397,
    brown_mushroom_block = 99,
    element_27 = -38,
    cake = 354,
    blast_furnace = -196,
    element_25 = -36,
    element_21 = -32,
    element_100 = -111,
    element_69 = -80,
    iron_door = 330,
    element_51 = -62,
    sapling = 6,
    element_108 = -119,
    wooden_door = 324,
    element_84 = -95,
    element_12 = -23,
    element_76 = -87,
    element_16 = -27,
    element_40 = -51,
    jungle_door = 429,
    element_19 = -30,
    carpet = 171,
    spruce_door = 427,
    colored_torch_bp = 204,
    element_90 = -101,
    cauldron = 380,
    element_78 = -89,
    element_50 = -61,
    element_74 = -85,
    element_81 = -92,
    coral_fan = -133,
    element_95 = -106,
    element_73 = -84,
    element_87 = -98,
    element_60 = -71,
    element_67 = -78,
    brewing_stand = 379,
    double_plant = 175,
    hopper = 410,
    element_20 = -31,
    element_32 = -43,
    piston = 33,
    element_118 = -129,
    element_53 = -64,
    sand = 12,
    dark_oak_door = 431,
    element_49 = -60,
    flower_pot = 390,
    log = 17,
    element_24 = -35,
    fletching_table = -201,
    wheat = 296,
    planks = 5,
    element_66 = -77,
    element_2 = -13,
    element_68 = -79,
    composter = -213,
    element_70 = -81,
    turtle_egg = -159,
    sandstone = 24,
    smithing_table = -202,
    acacia_door = 430,
    element_88 = -99,
    bell = -206,
    element_89 = -100,
    leaves2 = 161,
    fence = 85,
    element_112 = -123,
    element_64 = -75,
    element_34 = -45,
    element_30 = -41,
    element_98 = -109,
    element_44 = -55,
    element_45 = -56,
    undyed_shulker_box = 205,
    anvil = 145,
    colored_torch_rg = 202,
    element_58 = -69,
    element_11 = -22,
    element_15 = -26,
    element_1 = -12,
    dirt = 3,
    campfire = 720,
    element_31 = -42,
    wool = 35,
    stonebrick = 98,
    coral_block = -132,
    double_stone_slab = 44,
    element_38 = -49,
    element_42 = -53,
    stained_hardened_clay = 159,
    double_stone_slab2 = 182,
    element_77 = -88,
    element_104 = -115,
    double_stone_slab4 = -166,
    element_13 = -24,
    leaves = 18,
    element_5 = -16,
    red_sandstone = 179,
    monster_egg = 97,
    quartz_block = 155,
    lantern = -208,
    tnt = 46,
    beetroot = 457,
    sea_pickle = -156,
    yellow_flower = 37,
    red_flower = 38,
    waterlily = 111,
    sponge = 19,
    grindstone = -195,
    snow_layer = 78,
    element_17 = -28,
    element_28 = -39,
    purpur_block = 201,
    cobblestone_wall = 139,
    coral = -131,
    seagrass = -130,
    red_mushroom_block = 100,
    element_61 = -72,
    log2 = 162,
    element_26 = -37,
    end_portal_frame = 120,
    element_43 = -54,
    conduit = -157,
    prismarine = 168,
    wooden_slab = 158,
    sealantern = 169,
    concrete = 236,
    element_72 = -83,
    magma = 213,
    stained_glass = 241,
    shulker_box = 218,
    element_18 = -29,
    sticky_piston = 29,
    stained_glass_pane = 160,
    bamboo = -163,
    scaffolding = -165,
    smoker = -198,
    loom = -204,
    element_47 = -58,
    cartography_table = -200,
    wood = -212,
    element_71 = -82,
    element_107 = -118,
    frame = 389,
    chemistry_table = 238,
    kelp = 335,
    element_75 = -86,
    hard_stained_glass = 254,
    hard_stained_glass_pane = 191,
    element_4 = -15,
    element_3 = -14,
    element_6 = -17,
    stone = 1,
    element_8 = -19,
    element_9 = -20,
    element_14 = -25,
    element_22 = -33,
    element_23 = -34,
    element_29 = -40,
    air = -158,
    double_stone_slab3 = -162,
    element_33 = -44,
    element_35 = -46,
    element_37 = -48,
    element_39 = -50,
    element_41 = -52,
    bed = 355,
    birch_door = 428,
    element_46 = -57,
    element_48 = -59,
    coral_fan_dead = -134,
    element_52 = -63,
    element_54 = -65,
    element_0 = 36,
    element_56 = -67,
    element_59 = -70,
    element_62 = -73,
    element_63 = -74,
    element_80 = -91,
    reeds = 338,
    element_82 = -93,
    element_65 = -76,
    element_83 = -94,
    element_85 = -96,
    element_86 = -97,
    element_91 = -102,
    element_92 = -103,
    element_36 = -47,
    element_93 = -104,
    element_94 = -105,
    element_96 = -107,
    lit_blast_furnace = -214,
    jigsaw = -211,
    sweet_berry_bush = -207,
    lit_smoker = -199,
    lectern = -194,
    darkoak_wall_sign = -193,
    darkoak_standing_sign = -192,
    acacia_wall_sign = -191,
    acacia_standing_sign = -190,
    jungle_wall_sign = -189,
    birch_wall_sign = -187,
    birch_standing_sign = -186,
    spruce_wall_sign = -182,
    red_nether_brick_stairs = -184,
    smooth_stone = -183,
    spruce_standing_sign = -181,
    normal_stone_stairs = -180,
    mossy_cobblestone_stairs = -179,
    end_brick_stairs = -178,
    polished_diorite_stairs = -173,
    andesite_stairs = -171,
    diorite_stairs = -170,
    chorus_flower = 200,
    grass_path = 198,
    redstone_ore = 73,
    dark_oak_trapdoor = -147,
    chain_command_block = 189,
    acacia_fence_gate = 187,
    standing_banner = 176,
    jungle_trapdoor = -148,
    powered_repeater = 94,
    daylight_detector_inverted = 178,
    slime = 165,
    melon_stem = 105,
    netherrack = 87,
    double_wooden_slab = 157,
    quartz_stairs = 156,
    emerald_ore = 129,
    ender_chest = 130,
    smooth_red_sandstone_stairs = -176,
    stripped_oak_log = -10,
    powered_comparator = 150,
    quartz_ore = 153,
    light_weighted_pressure_plate = 147,
    smooth_quartz_stairs = -185,
    info_update2 = 249,
    carrots = 141,
    command_block = 137,
    jungle_stairs = 136,
    packed_ice = 174,
    birch_stairs = 135,
    tripwire = 132,
    gold_ore = 14,
    spruce_stairs = 134,
    dark_oak_stairs = 164,
    redstone_lamp = 123,
    purple_glazed_terracotta = 219,
    enchanting_table = 116,
    dragon_egg = 122,
    wall_banner = 177,
    nether_brick_fence = 113,
    snow = 80,
    mycelium = 110,
    fence_gate = 107,
    iron_trapdoor = 167,
    pumpkin_stem = 104,
    melon_block = 103,
    redstone_block = 152,
    iron_bars = 101,
    diamond_ore = 56,
    chorus_plant = 240,
    hardened_clay = 172,
    invisiblebedrock = 95,
    magenta_glazed_terracotta = 222,
    activator_rail = 126,
    torch = 50,
    stripped_jungle_log = -7,
    acacia_button = -140,
    deadbush = 32,
    repeating_command_block = 188,
    dropper = 125,
    heavy_weighted_pressure_plate = 148,
    iron_ore = 15,
    barrier = -161,
    glass_pane = 102,
    jukebox = 84,
    stripped_birch_log = -6,
    brown_mushroom = 39,
    brick_block = 45,
    wooden_pressure_plate = 72,
    cocoa = 127,
    redstone_torch = 76,
    nether_brick = 112,
    hay_block = 170,
    stonecutter = 245,
    potatoes = 142,
    noteblock = 25,
    mossy_stone_brick_stairs = -175,
    green_glazed_terracotta = 233,
    wall_sign = 68,
    vine = 106,
    portal = 90,
    unlit_redstone_torch = 75,
    dispenser = 23,
    water = 9,
    grass = 2,
    smooth_sandstone_stairs = -177,
    detector_rail = 28,
    end_stone = 121,
    spruce_trapdoor = -149,
    oak_stairs = 53,
    red_sandstone_stairs = 180,
    emerald_block = 133,
    lapis_ore = 21,
    stone_pressure_plate = 70,
    red_mushroom = 40,
    bookshelf = 47,
    crafting_table = 58,
    chest = 54,
    yellow_glazed_terracotta = 224,
    lava = 11,
    obsidian = 49,
    lit_furnace = 62,
    lit_redstone_lamp = 124,
    coal_ore = 16,
    gravel = 13,
    gold_block = 41,
    acacia_stairs = 163,
    iron_block = 42,
    acacia_pressure_plate = -150,
    glass = 20,
    golden_rail = 27,
    lit_pumpkin = 91,
    stone_brick_stairs = 109,
    redstone_wire = 55,
    rail = 66,
    mob_spawner = 52,
    dark_oak_pressure_plate = -152,
    diamond_block = 57,
    furnace = 61,
    standing_sign = 63,
    stone_stairs = 67,
    wooden_button = 143,
    pistonarmcollision = 34,
    coal_block = 173,
    ice = 79,
    soul_sand = 88,
    jungle_standing_sign = -188,
    brick_stairs = 108,
    lapis_block = 22,
    glowstone = 89,
    birch_trapdoor = -146,
    cactus = 81,
    gray_glazed_terracotta = 227,
    clay = 82,
    unpowered_comparator = 149,
    bedrock = 7,
    observer = 251,
    daylight_detector = 151,
    underwater_torch = 239,
    pumpkin = 86,
    ladder = 65,
    coral_fan_hang3 = -137,
    cyan_glazed_terracotta = 229,
    unpowered_repeater = 93,
    cobblestone = 4,
    red_nether_brick = 215,
    purpur_stairs = 203,
    trapdoor = 96,
    stone_button = 77,
    frosted_ice = 207,
    end_rod = 208,
    jungle_fence_gate = 185,
    end_gateway = 209,
    bone_block = 216,
    white_glazed_terracotta = 220,
    orange_glazed_terracotta = 221,
    flowing_water = 8,
    flowing_lava = 10,
    light_blue_glazed_terracotta = 223,
    carved_pumpkin = -155,
    lime_glazed_terracotta = 225,
    pink_glazed_terracotta = 226,
    blue_glazed_terracotta = 231,
    brown_glazed_terracotta = 232,
    red_glazed_terracotta = 234,
    web = 30,
    lever = 69,
    black_glazed_terracotta = 235,
    sandstone_stairs = 128,
    podzol = 243,
    stonecutter_block = -197,
    glowingobsidian = 246,
    dark_oak_fence_gate = 186,
    netherreactor = 247,
    info_update = 248,
    movingblock = 250,
    nether_brick_stairs = 114,
    structure_block = 252,
    reserved6 = 255,
    prismarine_stairs = -2,
    acacia_trapdoor = -145,
    dark_prismarine_stairs = -3,
    prismarine_bricks_stairs = -4,
    stripped_spruce_log = -5,
    stripped_dark_oak_log = -9,
    polished_granite_stairs = -172,
    tripwire_hook = 131,
    blue_ice = -11,
    fire = 51,
    dark_oak_button = -142,
    birch_button = -141,
    hard_glass_pane = 190,
    chemical_heat = 192,
    trapped_chest = 146,
    polished_andesite_stairs = -174,
    lava_cauldron = -210,
    hard_glass = 253,
    lit_redstone_ore = 74,
    bamboo_sapling = -164,
    farmland = 60,
    granite_stairs = -169,
    spruce_fence_gate = 183,
    nether_wart_block = 214,
    stripped_acacia_log = -8,
    silver_glazed_terracotta = 228,
    coral_fan_hang = -135,
    coral_fan_hang2 = -136,
    dried_kelp_block = -139,
    mossy_cobblestone = 48,
    birch_fence_gate = 184,
    jungle_button = -143,
    end_bricks = 206,
    spruce_button = -144,
    end_portal = 119,
    birch_pressure_plate = -151,
    jungle_pressure_plate = -153,
    spruce_pressure_plate = -154,
    bubble_column = -160,
}

/**
 * Numeric IDs of vanilla items
 */
declare enum VanillaItemID{
    record_11 = 510,
    record_ward = 509,
    cooked_rabbit = 412,
    record_stal = 507,
    record_blocks = 502,
    hopper_minecart = 408,
    enchanted_book = 403,
    rabbit_hide = 415,
    iron_boots = 309,
    beetroot_soup = 459,
    fireball = 385,
    netherstar = 399,
    spawn_egg = 383,
    writable_book = 386,
    speckled_melon = 382,
    ender_eye = 381,
    glass_bottle = 374,
    quartz = 406,
    baked_potato = 393,
    potion = 373,
    ender_pearl = 368,
    record_cat = 501,
    shears = 359,
    map = 358,
    bone = 352,
    fishing_rod = 346,
    redstone = 331,
    slime_ball = 341,
    clay_ball = 337,
    horsearmorleather = 416,
    pumpkin_seeds = 361,
    experience_bottle = 384,
    brick = 336,
    boat = 333,
    minecart = 328,
    sign = 323,
    flint = 318,
    saddle = 329,
    iron_chestplate = 307,
    bread = 297,
    totem = 450,
    shield = 513,
    end_crystal = 426,
    iron_axe = 258,
    book = 340,
    armor_stand = 425,
    wooden_sword = 268,
    stick = 280,
    muttonraw = 423,
    flint_and_steel = 259,
    trident = 455,
    golden_leggings = 316,
    chainmail_boots = 305,
    netherbrick = 405,
    wooden_hoe = 290,
    melon_seeds = 362,
    gold_nugget = 371,
    chicken = 365,
    poisonous_potato = 394,
    emptymap = 395,
    wooden_pickaxe = 270,
    string = 287,
    clownfish = 461,
    golden_carrot = 396,
    paper = 339,
    potato = 392,
    comparator = 404,
    banner = 446,
    carrotonastick = 398,
    beetroot_seeds = 458,
    emerald = 388,
    rabbit = 411,
    ghast_tear = 370,
    appleenchanted = 466,
    dragon_breath = 437,
    bucket = 325,
    gunpowder = 289,
    mushroom_stew = 282,
    iron_pickaxe = 257,
    carrot = 391,
    chest_minecart = 342,
    record_chirp = 503,
    prismarine_crystals = 422,
    dye = 351,
    golden_apple = 322,
    diamond_sword = 276,
    chainmail_helmet = 302,
    record_far = 504,
    record_mall = 505,
    repeater = 356,
    pufferfish = 462,
    iron_ingot = 265,
    record_strad = 508,
    beef = 363,
    cooked_chicken = 366,
    iron_helmet = 306,
    muttoncooked = 424,
    leather_boots = 301,
    snowball = 332,
    cooked_salmon = 463,
    lead = 420,
    dried_kelp = 464,
    diamond_hoe = 293,
    sweet_berries = 477,
    cookie = 357,
    stone_pickaxe = 274,
    melon = 360,
    diamond_leggings = 312,
    record_13 = 500,
    wooden_shovel = 269,
    cooked_beef = 364,
    stone_hoe = 291,
    record_wait = 511,
    jungle_sign = 474,
    golden_chestplate = 315,
    rotten_flesh = 367,
    diamond = 264,
    horsearmoriron = 417,
    leather_leggings = 300,
    bow = 261,
    sugar = 353,
    leather = 334,
    rapid_fertilizer = 449,
    stone_shovel = 273,
    apple = 260,
    stone_axe = 275,
    rabbit_foot = 414,
    magma_cream = 378,
    porkchop = 319,
    diamond_axe = 279,
    fireworkscharge = 402,
    bowl = 281,
    blaze_powder = 377,
    clock = 347,
    gold_ingot = 266,
    golden_sword = 283,
    cooked_fish = 350,
    golden_hoe = 294,
    record_mellohi = 506,
    iron_leggings = 308,
    cooked_porkchop = 320,
    diamond_chestplate = 311,
    feather = 288,
    wooden_axe = 271,
    iron_hoe = 292,
    painting = 321,
    ice_bomb = 453,
    arrow = 262,
    stone_sword = 272,
    diamond_helmet = 310,
    iron_shovel = 256,
    diamond_pickaxe = 278,
    leather_chestplate = 299,
    salmon = 460,
    splash_potion = 438,
    written_book = 387,
    golden_shovel = 284,
    golden_helmet = 314,
    diamond_boots = 313,
    golden_boots = 317,
    prismarine_shard = 409,
    chorus_fruit = 432,
    chorus_fruit_popped = 433,
    iron_sword = 267,
    lingering_potion = 441,
    command_block_minecart = 443,
    elytra = 444,
    fish = 349,
    shulker_shell = 445,
    iron_nugget = 452,
    nautilus_shell = 465,
    darkoak_sign = 476,
    heart_of_the_sea = 467,
    turtle_shell_piece = 468,
    turtle_helmet = 469,
    phantom_membrane = 470,
    crossbow = 471,
    birch_sign = 473,
    fireworks = 401,
    acacia_sign = 475,
    wheat_seeds = 295,
    banner_pattern = 434,
    compound = 499,
    bleach = 451,
    balloon = 448,
    medicine = 447,
    name_tag = 421,
    sparkler = 442,
    golden_pickaxe = 285,
    glow_stick = 166,
    egg = 344,
    fermented_spider_eye = 376,
    real_double_stone_slab2 = 181,
    compass = 345,
    real_double_stone_slab3 = -167,
    real_double_stone_slab4 = -168,
    horsearmorgold = 418,
    spruce_sign = 472,
    concrete_powder = 237,
    horsearmordiamond = 419,
    tnt_minecart = 407,
    glowstone_dust = 348,
    leather_helmet = 298,
    pumpkin_pie = 400,
    chainmail_leggings = 304,
    rabbit_stew = 413,
    chainmail_chestplate = 303,
    blaze_rod = 369,
    diamond_shovel = 277,
    brewingstandblock = 117,
    coal = 263,
    spider_eye = 375,
    golden_axe = 286,
    real_double_stone_slab = 43,
}

/**
 * Numeric IDs of vanilla blocks placed in the world
 */
declare enum VanillaTileID{
    lit_blast_furnace = 469,
    wood = 467,
    jigsaw = 466,
    sweet_berry_bush = 462,
    barrel = 458,
    smithing_table = 457,
    cartography_table = 455,
    lit_smoker = 454,
    smoker = 453,
    grindstone = 450,
    lectern = 449,
    darkoak_wall_sign = 448,
    darkoak_standing_sign = 447,
    acacia_wall_sign = 446,
    acacia_standing_sign = 445,
    jungle_wall_sign = 444,
    birch_wall_sign = 442,
    birch_standing_sign = 441,
    spruce_wall_sign = 437,
    red_nether_brick_stairs = 439,
    smooth_stone = 438,
    spruce_standing_sign = 436,
    normal_stone_stairs = 435,
    mossy_cobblestone_stairs = 434,
    bell = 461,
    end_brick_stairs = 433,
    polished_diorite_stairs = 428,
    andesite_stairs = 426,
    diorite_stairs = 425,
    stone_slab4 = 421,
    stone_slab3 = 417,
    undyed_shulker_box = 205,
    chorus_flower = 200,
    element_70 = 336,
    grass_path = 198,
    acacia_door = 196,
    dark_oak_door = 197,
    redstone_ore = 73,
    jungle_door = 195,
    dark_oak_trapdoor = 402,
    chain_command_block = 189,
    acacia_fence_gate = 187,
    standing_banner = 176,
    jungle_trapdoor = 403,
    element_88 = 354,
    stone_slab2 = 182,
    element_23 = 289,
    red_sandstone = 179,
    powered_repeater = 94,
    element_73 = 339,
    daylight_detector_inverted = 178,
    element_78 = 344,
    double_plant = 175,
    slime = 165,
    cobblestone_wall = 139,
    log2 = 162,
    element_26 = 292,
    stained_hardened_clay = 159,
    double_stone_slab2 = 181,
    melon_stem = 105,
    netherrack = 87,
    double_wooden_slab = 157,
    quartz_stairs = 156,
    emerald_ore = 129,
    ender_chest = 130,
    smooth_red_sandstone_stairs = 431,
    stripped_oak_log = 265,
    element_44 = 310,
    powered_comparator = 150,
    blast_furnace = 451,
    quartz_ore = 153,
    light_weighted_pressure_plate = 147,
    smooth_quartz_stairs = 440,
    skull = 144,
    brown_mushroom_block = 99,
    bamboo = 418,
    stained_glass_pane = 160,
    info_update2 = 249,
    carrots = 141,
    beacon = 138,
    monster_egg = 97,
    command_block = 137,
    log = 17,
    composter = 468,
    jungle_stairs = 136,
    packed_ice = 174,
    birch_stairs = 135,
    tripwire = 132,
    gold_ore = 14,
    element_45 = 311,
    flower_pot = 140,
    spruce_stairs = 134,
    dark_oak_stairs = 164,
    anvil = 145,
    redstone_lamp = 123,
    purple_glazed_terracotta = 219,
    concrete = 236,
    element_72 = 338,
    end_portal_frame = 120,
    element_43 = 309,
    cauldron = 118,
    brewing_stand = 117,
    enchanting_table = 116,
    spruce_door = 193,
    dragon_egg = 122,
    nether_wart = 115,
    element_7 = 273,
    wall_banner = 177,
    nether_brick_fence = 113,
    snow = 80,
    element_67 = 333,
    waterlily = 111,
    lantern = 463,
    quartz_block = 155,
    stone_slab = 44,
    mycelium = 110,
    conduit = 412,
    fence_gate = 107,
    iron_trapdoor = 167,
    element_95 = 361,
    pumpkin_stem = 104,
    element_94 = 360,
    melon_block = 103,
    element_57 = 323,
    red_mushroom_block = 100,
    element_61 = 327,
    stonebrick = 98,
    redstone_block = 152,
    iron_bars = 101,
    diamond_ore = 56,
    coral_block = 387,
    red_flower = 38,
    scaffolding = 420,
    chorus_plant = 240,
    wool = 35,
    hardened_clay = 172,
    invisiblebedrock = 95,
    magenta_glazed_terracotta = 222,
    activator_rail = 126,
    torch = 50,
    stripped_jungle_log = 262,
    element_21 = 287,
    acacia_button = 395,
    deadbush = 32,
    purpur_block = 201,
    repeating_command_block = 188,
    dropper = 125,
    prismarine = 168,
    heavy_weighted_pressure_plate = 148,
    sandstone = 24,
    element_11 = 277,
    iron_ore = 15,
    iron_door = 71,
    barrier = 416,
    element_51 = 317,
    glass_pane = 102,
    jukebox = 84,
    element_1 = 267,
    dirt = 3,
    stripped_birch_log = 261,
    brown_mushroom = 39,
    element_63 = 329,
    loom = 459,
    brick_block = 45,
    wooden_pressure_plate = 72,
    cocoa = 127,
    redstone_torch = 76,
    nether_brick = 112,
    hay_block = 170,
    stonecutter = 245,
    potatoes = 142,
    noteblock = 25,
    mossy_stone_brick_stairs = 430,
    green_glazed_terracotta = 233,
    tnt = 46,
    sealantern = 169,
    wooden_slab = 158,
    sand = 12,
    wall_sign = 68,
    vine = 106,
    portal = 90,
    sponge = 19,
    unlit_redstone_torch = 75,
    carpet = 171,
    dispenser = 23,
    water = 9,
    element_29 = 295,
    grass = 2,
    element_101 = 367,
    smooth_sandstone_stairs = 432,
    element_20 = 286,
    element_31 = 297,
    sapling = 6,
    detector_rail = 28,
    end_stone = 121,
    element_92 = 358,
    spruce_trapdoor = 404,
    sticky_piston = 29,
    oak_stairs = 53,
    red_sandstone_stairs = 180,
    element_75 = 341,
    emerald_block = 133,
    kelp = 393,
    lapis_ore = 21,
    element_66 = 332,
    stone_pressure_plate = 70,
    red_mushroom = 40,
    element_108 = 374,
    wooden_door = 64,
    bookshelf = 47,
    element_84 = 350,
    crafting_table = 58,
    chest = 54,
    yellow_glazed_terracotta = 224,
    lava = 11,
    obsidian = 49,
    stained_glass = 241,
    lit_furnace = 62,
    lit_redstone_lamp = 124,
    coal_ore = 16,
    gravel = 13,
    element_58 = 324,
    colored_torch_rg = 202,
    colored_torch_bp = 204,
    gold_block = 41,
    acacia_stairs = 163,
    piston = 33,
    iron_block = 42,
    acacia_pressure_plate = 405,
    glass = 20,
    golden_rail = 27,
    lit_pumpkin = 91,
    stone_brick_stairs = 109,
    tallgrass = 31,
    redstone_wire = 55,
    rail = 66,
    cake = 92,
    mob_spawner = 52,
    dark_oak_pressure_plate = 407,
    diamond_block = 57,
    element_71 = 337,
    wheat = 59,
    element_111 = 377,
    furnace = 61,
    standing_sign = 63,
    stone_stairs = 67,
    wooden_button = 143,
    element_105 = 371,
    pistonarmcollision = 34,
    double_stone_slab = 43,
    element_38 = 304,
    element_42 = 308,
    coal_block = 173,
    element_41 = 307,
    ice = 79,
    soul_sand = 88,
    jungle_standing_sign = 443,
    brick_stairs = 108,
    element_96 = 362,
    lapis_block = 22,
    shulker_box = 218,
    element_18 = 284,
    snow_layer = 78,
    glowstone = 89,
    element_17 = 283,
    leaves2 = 161,
    birch_trapdoor = 401,
    cactus = 81,
    gray_glazed_terracotta = 227,
    clay = 82,
    element_48 = 314,
    unpowered_comparator = 149,
    double_stone_slab3 = 422,
    air = 0,
    element_33 = 299,
    bedrock = 7,
    element_5 = 271,
    observer = 251,
    daylight_detector = 151,
    underwater_torch = 239,
    pumpkin = 86,
    ladder = 65,
    fence = 85,
    element_112 = 378,
    element_64 = 330,
    coral_fan_hang3 = 392,
    birch_door = 194,
    element_46 = 312,
    bed = 26,
    cyan_glazed_terracotta = 229,
    unpowered_repeater = 93,
    cobblestone = 4,
    red_nether_brick = 215,
    purpur_stairs = 203,
    trapdoor = 96,
    coral_fan = 388,
    stone_button = 77,
    frosted_ice = 207,
    end_rod = 208,
    jungle_fence_gate = 185,
    end_gateway = 209,
    magma = 213,
    coral = 386,
    bone_block = 216,
    white_glazed_terracotta = 220,
    element_28 = 294,
    orange_glazed_terracotta = 221,
    flowing_water = 8,
    flowing_lava = 10,
    element_14 = 280,
    light_blue_glazed_terracotta = 223,
    carved_pumpkin = 410,
    lime_glazed_terracotta = 225,
    element_2 = 268,
    pink_glazed_terracotta = 226,
    blue_glazed_terracotta = 231,
    brown_glazed_terracotta = 232,
    red_glazed_terracotta = 234,
    element_15 = 281,
    web = 30,
    lever = 69,
    black_glazed_terracotta = 235,
    sandstone_stairs = 128,
    concretepowder = 237,
    podzol = 243,
    element_90 = 356,
    turtle_egg = 414,
    stonecutter_block = 452,
    element_79 = 345,
    glowingobsidian = 246,
    dark_oak_fence_gate = 186,
    netherreactor = 247,
    info_update = 248,
    movingblock = 250,
    nether_brick_stairs = 114,
    structure_block = 252,
    leaves = 18,
    reserved6 = 255,
    prismarine_stairs = 257,
    acacia_trapdoor = 400,
    dark_prismarine_stairs = 258,
    prismarine_bricks_stairs = 259,
    element_86 = 352,
    element_118 = 384,
    stripped_spruce_log = 260,
    element_10 = 276,
    stripped_dark_oak_log = 264,
    polished_granite_stairs = 427,
    tripwire_hook = 131,
    element_53 = 319,
    blue_ice = 266,
    fire = 51,
    campfire = 464,
    dark_oak_button = 397,
    birch_button = 396,
    hard_stained_glass = 254,
    element_83 = 349,
    element_65 = 331,
    element_97 = 363,
    planks = 5,
    hard_glass_pane = 190,
    hard_stained_glass_pane = 191,
    chemical_heat = 192,
    element_16 = 282,
    element_49 = 315,
    element_3 = 269,
    element_4 = 270,
    trapped_chest = 146,
    element_6 = 272,
    stone = 1,
    element_8 = 274,
    element_9 = 275,
    element_12 = 278,
    element_76 = 342,
    polished_andesite_stairs = 429,
    element_13 = 279,
    element_113 = 379,
    element_19 = 285,
    lava_cauldron = 465,
    element_22 = 288,
    fletching_table = 456,
    element_24 = 290,
    element_25 = 291,
    hard_glass = 253,
    element_30 = 296,
    element_32 = 298,
    element_34 = 300,
    element_35 = 301,
    element_37 = 303,
    lit_redstone_ore = 74,
    element_39 = 305,
    element_40 = 306,
    element_47 = 313,
    bamboo_sapling = 419,
    element_50 = 316,
    farmland = 60,
    element_74 = 340,
    element_81 = 347,
    element_54 = 320,
    element_55 = 321,
    element_0 = 36,
    element_56 = 322,
    element_59 = 325,
    element_62 = 328,
    element_68 = 334,
    granite_stairs = 424,
    spruce_fence_gate = 183,
    element_77 = 343,
    element_80 = 346,
    reeds = 83,
    element_82 = 348,
    element_85 = 351,
    element_60 = 326,
    element_87 = 353,
    element_89 = 355,
    element_91 = 357,
    element_36 = 302,
    nether_wart_block = 214,
    element_93 = 359,
    element_98 = 364,
    element_99 = 365,
    element_103 = 369,
    element_69 = 335,
    element_100 = 366,
    element_102 = 368,
    double_stone_slab4 = 423,
    element_104 = 370,
    yellow_flower = 37,
    beetroot = 244,
    sea_pickle = 411,
    element_106 = 372,
    frame = 199,
    chemistry_table = 238,
    element_107 = 373,
    element_116 = 382,
    element_109 = 375,
    stripped_acacia_log = 263,
    element_110 = 376,
    element_114 = 380,
    element_115 = 381,
    silver_glazed_terracotta = 228,
    element_117 = 383,
    element_52 = 318,
    coral_fan_dead = 389,
    coral_fan_hang = 390,
    coral_fan_hang2 = 391,
    dried_kelp_block = 394,
    mossy_cobblestone = 48,
    seagrass = 385,
    birch_fence_gate = 184,
    jungle_button = 398,
    end_bricks = 206,
    spruce_button = 399,
    end_portal = 119,
    birch_pressure_plate = 406,
    hopper = 154,
    jungle_pressure_plate = 408,
    element_27 = 293,
    spruce_pressure_plate = 409,
    bubble_column = 415,
}

/**
 * Java object of the mod, contains some useful values and methonds
 */
declare var __mod__: java.lang.Object;

/**
 * Mod name
 */
declare var __name__: string;

/**
 * Full path to the mod's directory, ends with "/"
 */
declare var __dir__: string;

/**
 * Main mod configuration manager, settings are stored in config.json file
 */
declare var __config__: Config;

/**
 * Full path to current Horizon pack directory
 */
declare var __packdir__: string;

/**
 * Module that allows to work with current Minecraft world
 */
declare namespace World {
    /**
     * Setups the module to work properly with the world. Usually called by 
     * Core Engine, so you generally shouldn't call it yourself
     * @param isLoaded whether the world is loaded or not
     */
    function setLoaded(isLoaded: boolean): void;

    /**
     * @returns whether the world is loaded or not
     */
    function isWorldLoaded(): boolean;

    /**
     * Returns current tick number since the player joined the world
     */
    function getThreadTime(): number;

    /**
     * Retrieves coordinates relative to the block. For example, the following code
     * will return coordinates of the block above the specified:
     * ```ts
     * World.getRelativeCoords(x, y, z, Native.BlockSide.UP);
     * ```
     * @param side block side
     * @returns relative coordinates
     */
    function getRelativeCoords(x: number, y: number, z: number, side: number): Vector;
   
    /**
     * Sets block in the world using its tile id and data
     * @param id block tile id
     * @param data block data
     * @deprecated Consider using [[World.setBlock]] instead
     */
    function nativeSetBlock(x: number, y: number, z: number, id: number, data: number): void;

    /**
     * @returns tile id of the block located on the specified coordinates
     * @deprecated Consider using [[World.getBlockID]] instead
     */
    function nativeGetBlockID(x: number, y: number, z: number): number;

    /**
     * @returns data of the block located on the specified coordinates 
     * @deprecated Consider using [[World.getBlockData]] instead
     */
    function nativeGetBlockData(x: number, y: number, z: number): number;

    /**
     * Sets block in the world using its tile id and data
     * @param id block tile id
     * @param data block data
     */
    function setBlock(x: number, y: number, z: number, id: number, data: number): void;

    /**
     * Sets block in the world using specified [[Tile]] object
     * @param fullTile object containing id and data of the tile
     */
    function setFullBlock(x: number, y: number, z: number, fullTile: Tile): void;

    /**
     * @returns [[Tile]] object containing tile id and data of the block located 
     * on the specified coordinates
     */
    function getBlock(x: number, y: number, z: number): Tile;

    /**
     * @returns tile id of the block located on the specified coordinates
     */
    function getBlockID(x: number, y: number, z: number): number;

    /**
     * @returns data of the block located on the specified coordinates
     */
    function getBlockData(x: number, y: number, z: number): number;

    /**
     * Destroys block on the specified coordinates producing appropriate drop
     * and particles. Do not use for massive tasks due to particles being 
     * producesd
     * @param drop whenther to provide drop for the block or not
     */
    function destroyBlock(x: number, y: number, z: number, drop: boolean): void;

    /**
     * @returns light level on the specified coordinates, from 0 to 15
     */
    function getLightLevel(x: number, y: number, z: number): number;

    /**
     * @param x chunk coordinate
     * @param z chunk coordinate
     * @returns whether the chunk with specified coodinates is loaded or not
     */
    function isChunkLoaded(x: number, z: number): boolean;

    /**
     * @param x block coordinate
     * @param y block coordinate
     * @param z block coordinate
     * @returns whether the chunk containing specified block coordinates is 
     * loaded or not
     */
    function isChunkLoadedAt(x: number, y: number, z: number): any;

    /**
     * @returns [[TileEntity]] located on the specified coordinates
     */
    function getTileEntity(x: number, y: number, z: number): TileEntity;

    /**
     * If the block on the specified coordinates is a TileEntity block and is 
     * not initialized, initializes it and returns created [[TileEntity]] object
     * @returns [[TileEntity]] if one was created, void otherwise
     */
    function addTileEntity(x: number, y: number, z: number): TileEntity|void;

    /**
     * If the block on the specified coordinates is a [[TileEntity]], destroys 
     * it, dropping its container
     * @returns true if the [[TileEntity]] was destroyed successfully, false 
     * otherwise
     */
    function removeTileEntity(x: number, y: number, z: number): boolean;

    /**
     * @returns if the block on the specified coordinates is a [[TileEntity]], returns
     * its container, if the block is a [[NativeTileEntity]], returns it, if 
     * none of above, returns null
     */
    function getContainer(x: number, y: number, z: number): NativeTileEntity|UI.Container|null;

    /**
     * @returns current world's time in ticks 
     */
    function getWorldTime(): number;

    /**
     * Sets current world time
     * @param time time in ticks
     */
    function setWorldTime(time: number): number;

    /**
     * Sets current time to day or night
     * @param day if true, sets time to 10000 (day), else to 13000 (night)
     * @deprecated Consider using [[World.setWorldTime]] instead
     */
    function setDayMode(day: boolean): void;

    /**
     * Sets current time to day or night
     * @param day if true, sets time to 13000 (night), else to 10000 (day)
     * @deprecated Consider using [[World.setWorldTime]] instead
     */
    function setNightMode(night: boolean): void;

    /**
     * Returns current weather object. This value should not be edited, call 
     * [[World.setWeather]] to change current weather
     * @returns current weather object
     */
    function getWeather(): Weather;

    /**
     * Sets current weather in the world
     * @param weather [[Weather]] object to be used as current weather value
     */
    function setWeather(weather: Weather): void;

    /**
     * Drops item or block with specified id, cound, data and extra on the 
     * specified coordinates. For blocks, be sure to use block id, not the tile
     * id
     * @returns created drop entity id
     */
    function drop(x: number, y: number, z: number, id: number, count: number, data: number, extra?: ItemExtra): number;

    /**
     * Creates an explosion on the sepcified coordinates
     * @param power defines how many blocks can the explosion destroy and what
     * blocks can or cannot be destroyed
     * @param fire if true, puts the crater on fire
     */
    function explode(x: number, y: number, z: number, power: number, fire: boolean): void;

    /**
     * @returns biome id on the specified coordinates
     */
    function getBiome(x: number, z: number): number;

    /**
     * @returns biome name on the specified coordinates
     * @deprecated This method will return "Unknown" for all the biomes
     */
    function getBiomeName(x: number, z: number): string;

    /**
     * @returns grass color for specified coordinates, uses android integer
     * color model
     */
    function getGrassColor(x: number, z: number): number;

    /**
     * Sets grass color on the specified coordinates, uses android integer color
     * model
     * @param color grass color to be set for the specified coordinates
     */
    function setGrassColor(x: number, z: number, color: number): void;

    /**
     * @returns grass color for specified coordinates, uses rgb color model
     */
    function getGrassColorRGB(x: number, z: number): Color;

    /**
     * Sets grass color on the specified coordinates, uses rgb color model
     * @param color grass color to be set for the specified coordinates
     */
    function setGrassColorRGB(x: number, z: number, rgb: Color): void;

    /**
     * @returns true, if one can see sky from the specified position, false 
     * othrwise
     */
    function canSeeSky(x: number, y: number, z: number): boolean;

    /**
     * Plays standart Minecraft sound on the specified coordinates
     * @param name sound name
     * @param volume sound volume from 0 to 1
     * @param pitch sound pitch, from 0 to 1, 0.5 is default value
     */
    function playSound(x: number, y: number, z: number, name: string, volume: number, pitch: number): void;

    /**
     * Plays standart Minecraft sound from the specified entity
     * @param name sound name
     * @param volume sound volume from 0 to 1
     * @param pitch sound pitch, from 0 to 1, 0.5 is default value
     */
    function playSoundAtEntity(entity: number, name: string, volume: number, pitch: number): void;

    /**
     * Enables "BlockChanged" event for the block id. Event occurs when either
     * old block or new block is registered using this method
     * @param id numeric tile id
     * @param enabled if true, the block will be watched
     */
    function setBlockChangeCallbackEnabled(id: number, enabled: boolean): void;

    /**
     * Enables "BlockChanged" event for specified block ids and registers 
     * callback function for the ids
     * @param ids string or numeric tile id, or an array of string and/or 
     * numeric tile ids
     * @param callback function that will be called when "BlockChanged" callback 
     * occurs involving one of the blocks. **Warning!** If both old and new 
     * blocks are in the ids list, callback funciton will be called twice.
     */
    function registerBlockChangeCallback(ids: number|string|(string|number)[], callback: Callback.BlockChangedFunction): void;
}