IDRegistry.genBlockID("hell_octacle");
Block.createBlock("hell_octacle", [{
	name: "Hell octacle",
	texture: [
		["glass", 0]
	],
	inCreative: true
}]);
Translation.addTranslation("Hell octacle", {
	ru: "Адский октакль"
});

Block.setShape(BlockID["hell_octacle"], 0, 0, 0, 1, 1 / 16, 1);
var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.hell_octacle, 0, render);
var model = BlockRenderer.createModel();
render.addEntry(model);

let BLOOD_FOG_LIFETIME = 60;
let HELL_OCTACLE_RADIUS = 1.37631;

TileEntity.registerPrototype(BlockID["hell_octacle"], {
	defaultValues: {

	},
	loadAnimation: function () {
		this.octacleAnim = new Animation.Base(this.x, this.y + .01, this.z);
		this.octacleAnim.describe({
			mesh: new RenderMesh(__dir__ + "res/model/quad.obj", "obj", {
				scale: [HELL_OCTACLE_RADIUS, 1, HELL_OCTACLE_RADIUS],
				translate: [.5, 0, .5]
			}),
			skin: "model/octacle",
			material: "octacle_normal"
		});
		this.octacleAnim.load();
	},
	setFireOctacle: function () {
		this.octacleAnim.describe({
			mesh: new RenderMesh(__dir__ + "res/model/quad.obj", "obj", {
				scale: [HELL_OCTACLE_RADIUS, 1, HELL_OCTACLE_RADIUS],
				translate: [.5, 0, .5]
			}),
			skin: "model/octacle",
			material: "octacle_fired"
		});
	},
	polarToCartesian: function (coord: Geometry.Vector2): Geometry.Vector2 {
		return new Geometry.Vector2(coord.y * Math.cos(coord.x), coord.y * Math.sin(coord.x));
	},
	emitBloodFog: function (pos: Geometry.Vector3, count: number): void {
		let targets = Array < Geometry.Vector3 > (count);

		for (let i = 0; i < count; i++) {
			// Calculating target positions and speed
			let coord = this.polarToCartesian(new Geometry.Vector2(Math.PI * 2 * Math.random(), Math.sqrt(Math.random()) * HELL_OCTACLE_RADIUS));
			targets[i] = new Geometry.Vector3(
				(coord.x + this.x + .5 - pos.x) / BLOOD_FOG_LIFETIME,
				(this.y - pos.y) / BLOOD_FOG_LIFETIME,
				(coord.y + this.z + .5 - pos.z) / BLOOD_FOG_LIFETIME
			);
		}

		for (let i = 0; i < count; i++) {
			Particles.addParticle(BLOOD_FOG_PARTICLE, pos.x, pos.y, pos.z, targets[i].x, targets[i].y, targets[i].z);
		}
	},
	startRitual: function (pos: Geometry.Vector3) {
		this.emitBloodFog(pos, 200);
		let cor = new Coroutine(function () {
			this.data.setFireOctacle();
			this.data.startHellFire();
		}, 70, false);
		cor.data = this;
		this.controller.addCoroutine(cor);

		cor = new Coroutine(function () {
			if(this.time>170){
				for(let i =0; i<1; i++){
					let coord = this.data.polarToCartesian(new Geometry.Vector2(Math.PI * 2 * Math.random(), .7 * HELL_OCTACLE_RADIUS));
					Particles.addParticle(HELL_SMOKE_PARTICLE, this.data.x+coord.x+.5,  this.data.y+1/16, this.data.z+coord.y+.5, 0, .05, 0);
				}
			}
		}, 1, true);
		cor.data = this;
		this.controller.addCoroutine(cor);
		
		cor = new Coroutine(function () {
			if(this.time>180&&Math.random()>.7){
					let coord = this.data.polarToCartesian(new Geometry.Vector2(Math.PI * 2 * Math.random(), .1 * HELL_OCTACLE_RADIUS));
					Particles.addParticle(HELL_FIRE_SMOKE_PARTICLE, this.data.x+coord.x+.5,  this.data.y+1/16, this.data.z+coord.y+.5, 0, .05, 0);
			}
			if(this.time>180&&Math.random()>.7){
					let coord = this.data.polarToCartesian(new Geometry.Vector2(Math.PI * 2 * Math.random(), .1 * HELL_OCTACLE_RADIUS));
					Particles.addParticle(Native.ParticleType.lava, this.data.x+coord.x+.5,  this.data.y+.5, this.data.z+coord.y+.5, 0, .1, 0);
					Particles.addParticle(Native.ParticleType.lava, this.data.x+coord.x+.5,  this.data.y+.5, this.data.z+coord.y+.5, 0, .1, 0);
			}
		}, 1, true);
		cor.data = this;
		this.controller.addCoroutine(cor);
	},
	setFireOnLineInCircle: function (a: Geometry.Vector2, b: Geometry.Vector2): Coroutine {
		let cor = new Coroutine(function () {
			if (this.time % 2 == 0 && this.time < 100) {
				let pos = Geometry.Vector3.lerp(this.data.dep, this.data.dest, this.time / 100);
				Particles.addParticle(HELL_FIRE_PARTICLE, pos.x, pos.y, pos.z, 0, 0, 0);
			}
			let count =  Math.min(this.time / 100, 1) * 2;
			for (let i = 0; i < count; i++) {
				let pos = Geometry.Vector3.lerp(this.data.dep, this.data.dest, Math.random() * Math.min(this.time / 100, 1));
				Particles.addParticle(HELL_FIRE_PARTICLE, pos.x, pos.y, pos.z, 0, 0, 0);
			}
			//return this.time > 300;
		}, 1, true);
		let coord = this.polarToCartesian(a);
		cor.data = {};
		cor.data.dep = new Geometry.Vector3(coord.x + this.x + .5, this.y + 1 / 32, coord.y + this.z + .5);
		coord = this.polarToCartesian(b);
		cor.data.dest = new Geometry.Vector3(coord.x + this.x + .5, this.y + 1 / 32, coord.y + this.z + .5);
		return cor;
	},
	setFireOnArcInCircle: function (a: Geometry.Vector2, b: Geometry.Vector2): Coroutine {
		let cor = new Coroutine(function () {
			if (this.time % 2 == 0 && this.time < 40) {
				let pos = this.data.polarToCartesian(Geometry.Vector2.lerp(this.data.dep,this.data.dest,this.time/40));
				Particles.addParticle(HELL_FIRE_PARTICLE, pos.x+this.data.tpos.x+.5, this.data.tpos.y+1/32, pos.y+this.data.tpos.z+.5, 0, 0, 0);
			}
			let count = Math.min(this.time / 20, 1) * 1;
			for (let i = 0; i < count; i++) {
				let pos = this.data.polarToCartesian(Geometry.Vector2.lerp(this.data.dep,this.data.dest,Math.random()*Math.min(this.time / 20, 1)));
				Particles.addParticle(HELL_FIRE_PARTICLE, pos.x+this.data.tpos.x+.5, this.data.tpos.y+1/32, pos.y+this.data.tpos.z+.5, 0, 0, 0);
			}
			//return this.time > 300;
		}, 1, true);
		cor.data = {};
		cor.data.dep = a;
		cor.data.dest = b;
		cor.data.polarToCartesian = this.polarToCartesian;
		cor.data.tpos = this;
		return cor;
	},
	startHellFire: function () {
		for (let i = 0; i < 4; i++) {
			this.controller.addCoroutine(this.setFireOnLineInCircle(
				new Geometry.Vector2(i / 2 * Math.PI, 1),
				new Geometry.Vector2((0.75 + i / 2) * Math.PI, 1)
			));
			this.controller.addCoroutine(this.setFireOnLineInCircle(
				new Geometry.Vector2(i / 2 * Math.PI, 1),
				new Geometry.Vector2((1.25 + i / 2) * Math.PI, 1)
			));
			this.controller.addCoroutine(this.setFireOnArcInCircle(
				new Geometry.Vector2(i / 2 * Math.PI, 1),
				new Geometry.Vector2((i / 2+1/4) * Math.PI, 1)
			));
			this.controller.addCoroutine(this.setFireOnArcInCircle(
				new Geometry.Vector2(i / 2 * Math.PI, 1),
				new Geometry.Vector2((i / 2-1/4) * Math.PI, 1)
			));
		}
	},
	init: function () {
		this.loadAnimation();
		this.controller = new CoroutineController();
	},
	tick: function () {
		this.controller.update();
	}
});

Callback.addCallback('EntityDeath', function (entity, attacker, damageType) {
	let pos = Entity.getPosition(entity);
	if (World.getBlockID(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z)) == BlockID["hell_octacle"]){
		TileEntity.getTileEntity(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z)).startRitual(new Geometry.Vector3(pos.x, pos.y + .3, pos.z));
	}
});

IDRegistry.genBlockID("candle");
Block.createBlock("candle", [
    {
        name: "Candle",
        texture: [["light_candle", 0]],
        inCreative: true
    }], {lightlevel:7});
Block.setShape(BlockID.candle,0,0,0,1,1/16,1);

var render = new ICRender.Model();
BlockRenderer.setStaticICRender (BlockID.candle, 0, render);

var model = BlockRenderer.createModel();
model.addBox (6.5/16, 0, 6.5/16, 9.5/16, 5/16, 9.5/16,  BlockID.candle, 0);
model.addBox (7.8/16, 5/16, 7.8/16, 8.2/16, 5.5/16, 8.2/16,  173, 0);
render.addEntry(model);

TileEntity.registerPrototype(BlockID.candle, {

	tick:function(){
		this.controller.update();
	},
	init: function(){
		this.controller = new CoroutineController();
		let cor = new Coroutine(function(){
			Particles.addParticle(HELL_SMOKE_PARTICLE, this.data.x+.5, this.data.y+6/16, this.data.z+.5, 0, 0, 0);
		}, 1, false);
		cor.data = this;
		this.controller.addCoroutine(cor);
		cor = new Coroutine(function(){
			if(this.time%20==0&&this.time>300){
				Particles.addParticle(HELL_FIRE_PARTICLE, this.data.x+.5, this.data.y+6/16, this.data.z+.5, 0, 0, 0);
			}
		}, 1, true)
		cor.data = this;
		this.controller.addCoroutine(cor);
	}
});