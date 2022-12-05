class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {
        this.load.image("main", "assets/mainPage.png")

        // Preload all the assets here

        // Preload any images here

        // Preload any sound and music here
       

        this.load.audio("menu", 'assets/Menubgm.mp3');
    }

    create() {

        console.log('*** main scene');

        window.bgmSnd = this.sound.add("menu", {loop: true}).setVolume(0.5)
        window.bgmSnd.play();
        window.bgmSnd.loop = true;

        // Add image and detect spacebar keypress
        this.add.image(0, 0, 'main').setOrigin(0, 0);

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to story1 scene');
         
            this.scene.start('story1',);
    
        }, this);


        // Add any text in the main page
        // this.add.text(90, 600, 'Press spacebar to continue', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}