class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
     // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("room1","assets/Corridoor.tmj")
    // Step 2 : Preload any images here
    this.load.image("SchoolImg", "assets/tilests32x32.png");

    }

    create() {
        console.log('*** room1 scene');

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "room1" })

        let SchoolTiles = map.addTilesetImage("tilests32x32", "SchoolImg");

        let tilesArray = [
            SchoolTiles,
          ];

          this.FloorLayer = map.createLayer("Floor",tilesArray,0,0);
          this.WallLayer = map.createLayer("Wall",tilesArray,0,0);
          this.DoorLayer = map.createLayer("Door",tilesArray,0,0);

        //Object layers
         var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "start");

         this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("back")
         this.player.setCollideWorldBounds(true);
         
         window.player = this.player

        this.physics.world.bounds.width = this.FloorLayer.width
        this.physics.world.bounds.height = this.FloorLayer.height
      
         
         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

        
    }

    update() {

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play("left", true); // walk left
            
          } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play("right", true);
           
          } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("back", true);
            //console.log('up');
          } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("front", true);
            //console.log('down');
          } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
            //console.log('idle');
          }
    }

    

}
