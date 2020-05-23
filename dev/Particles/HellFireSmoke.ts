var HELL_FIRE_SMOKE_PARTICLE =Particles.registerParticleType({
    texture: "blood_fog",
    size: [6, 7],
    color: [.7,.4,.3,.6],
    lifetime: [20, 30],
    velocity: [0, .05, 0],
    render: 2,
    isUsingBlockLight: true, 
    animators: {
        alpha: {
            fadeIn: .5,
            fadeOut: .6,
            start: .1,
            end: 0
        },
        size: {
            fadeIn: .05,
            fadeOut: .98,
            start: .1,
            end: 1
        }
    }
});