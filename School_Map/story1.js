class story1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'story1'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("story1", "assets/story1.png")
        this.load.audio('bang', 'assets/bang.mp3');

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** story1 scene');

        this.bgMusic = this.sound.add("bang", {loop: false}).setVolume(0.8)
        this.bgMusic.stop();
        this.bgMusic.play();


        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'story1').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to story2 scene');

            this.scene.start('story2',
                // Optional parameters
                {

                }
            );
        }, this);


        // Add any text in the main page
        // this.add.text(90, 600, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}