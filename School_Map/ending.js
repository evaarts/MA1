class ending extends Phaser.Scene {

    constructor() {
        super({
            key: 'ending'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("ending", "assets/ending.jpg")
      

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** ending scene');

        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'ending').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to main scene');

            this.scene.start('main',
                // Optional parameters
                {

                }
            );
        }, this);


        this.add.text(90, 850, 'Press spacebar to menu screen', {
            font: '30px Courier',
            fill: '#FFFFFF'
        });


        // Create all the game animations here

    }


}