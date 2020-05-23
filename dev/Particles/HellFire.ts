var HELL_FIRE_PARTICLE = Particles.registerParticleType({
    texture: "hell_fire",
    size: [1, 1.5],
    lifetime: [20, 30],
    render: 2,
    isUsingBlockLight: false, 
    animators: {
        alpha: {
            fadeIn: .12,
            fadeOut: 1,
            start: 0,
            end: .1
        },
        icon: {
			start: 0,
			end: 1,
			period: 48,
			fadeIn: 1,
		}
    }
});