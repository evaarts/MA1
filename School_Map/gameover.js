class gameover extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameover'
        });

        // Put global variable here
    }

    preload() {
       
        this.load.image("gameover", "assets/gameover.png")
        this.load.audio("gameoverbgm", 'assets/gameover.mp3');

    }

    create() {

        console.log('*** gameover scene');

        window.bgmSnd3 = this.sound.add("gameoverbgm", {loop: true}).setVolume(0.5)
        window.bgmSnd3.play();
        window.bgmSnd3.loop = true;

        //this.music.play()
        //window.music = this.music
        this.add.image(0, 0, 'gameover').setOrigin(0, 0);

        

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to world scene');
            window.bgmSnd3.stop();
            this.scene.start('story4',
                // Optional parameters
                {

                }
            );
        }, this);


        // this.add.text(90, 850, 'gameover', {
        //     font: '30px Courier',
        //     fill: '#FFFFFF'
        // });


        // Create all the game animations here

    }


}