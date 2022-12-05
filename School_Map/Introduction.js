class Introduction extends Phaser.Scene {

    constructor() {
        super({
            key: 'Introduction'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("intro", "assets/intro.jpg")

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** main scene');

        //this.music.play()
        //window.music = this.music


        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to story4 scene');
            window.bgmSnd.stop();
            this.scene.start('story4');
    
        }, this);


        // Add any text in the main page
        // this.add.text(90, 850, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}