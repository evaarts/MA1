var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 30,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#3d2943',
    pixelArt: true,
    scene: [main, Introduction, world, room1, classroom1_lv1, classroom2_lv1, classroom3_lv1, hallway2, classroom1_lv2, classroom2_lv2, classroom3_lv2, gate, ending]
};

var game = new Phaser.Game(config);