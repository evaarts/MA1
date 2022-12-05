class story2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'story2'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("story2", "assets/story2.png")
        this.load.audio('laugh', 'assets/laugh.mp3');
      

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** story2 scene');

        this.bgMusic = this.sound.add("laugh", {loop: false}).setVolume(0.8)
        this.bgMusic.stop();
        this.bgMusic.play();



        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'story2').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to story3 scene');

            this.scene.start('story3',
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