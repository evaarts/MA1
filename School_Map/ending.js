class ending extends Phaser.Scene {

    constructor() {
        super({
            key: 'ending'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("ending", "assets/ending.jpg")
        this.load.audio("endingbgm", 'assets/ending.mp3');
      

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** ending scene');

    
        window.bgmSnd2 = this.sound.add("endingbgm", {loop: true}).setVolume(0.5)
        window.bgmSnd2.play();
        window.bgmSnd2.loop = true;



        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'ending').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to main scene');
            window.bgmSnd2.stop();
            this.scene.start('main',
                // Optional parameters
                {

                }
            );
        }, this);


        // Create all the game animations here

    }


}