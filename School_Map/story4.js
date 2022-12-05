class story4 extends Phaser.Scene {

    constructor() {
        super({
            key: 'story4'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("story4", "assets/story4.png")
        this.load.audio("Gamebgm", 'assets/Gamebgm.mp3');
    }

    create() {

        console.log('*** story4 scene');

        window.bgmSnd1 = this.sound.add("Gamebgm", {loop: true}).setVolume(1)
        window.bgmSnd1.play();
        window.bgmSnd1.loop = true;


        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'story4').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');

            this.scene.start('world',
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