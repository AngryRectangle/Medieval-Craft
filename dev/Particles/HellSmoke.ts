var HELL_SMOKE_PARTICLE =Particles.registerParticleType({
    texture: "blood_fog",
    size: [6, 7],
    color: [.3,.3,.3,1],
    lifetime: [70, 100],
    velocity: [0, .05, 0],
    render: 2,
    isUsingBlockLight: true, 
    animators: {
        alpha: {
            fadeIn: .12,
            fadeOut: .98,
            start: 0,
            end: .1
        },
        size: {
            fadeIn: .05,
            fadeOut: .98,
            start: .1,
            end: 1
        }
    }
});