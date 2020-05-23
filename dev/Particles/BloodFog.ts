var BLOOD_FOG_PARTICLE = Particles.registerParticleType({
    texture: "blood_fog",
    size: [3,5],
    lifetime: [90, 100],
    render: 2,
    color: [1, .1, .1, 1],
    collision: true,
    keepVelocityAfterImpact: false,
    isUsingBlockLight: true,
    animators: {
        alpha: {
            fadeIn: 0,
            fadeOut: .98,
            start: 1,
            end: .1
        }
    }
});