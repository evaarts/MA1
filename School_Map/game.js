var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 30,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    backgroundColor: '#3d2943',
    pixelArt: true,
    scene: [main, Introduction, world, room1, classroom1_lv1, classroom2_lv1, classroom3_lv1, hallway2, classroom1_lv2, classroom2_lv2, classroom3_lv2, gate, gameover, story1, story2, story3, story4, ending]
};

var game = new Phaser.Game(config);
 window.monster1 = false
window.paper = 0
window.key = 0
 