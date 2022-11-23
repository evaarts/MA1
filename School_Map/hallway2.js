class hallway2 extends Phaser.Scene {

    constructor() {
        super({ key: 'hallway2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
     // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("hallway2","assets/Corridoor1.tmj")
    // Step 2 : Preload any images here
    this.load.image("SchoolImg", "assets/tilests32x32.png");

    }

    create() {
        console.log('*** hallway2 scene');

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "hallway2" })

        let SchoolTiles = map.addTilesetImage("tilests32x32", "SchoolImg");

        let tilesArray = [
            SchoolTiles,
          ];

          this.FloorLayer = map.createLayer("Floor",tilesArray,0,0);
          this.WallLayer = map.createLayer("Wall",tilesArray,0,0);
          this.DoorLayer = map.createLayer("Door",tilesArray,0,0);

        //Object layers
         var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "start");
        
         //this.player = this.physics.add.sprite(this.player.x, this.player.y, 'Sunako').play(this.player.facing)
         this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("front")
         this.player.setCollideWorldBounds(true);
         this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)
         
         window.player = this.player

        this.physics.world.bounds.width = this.FloorLayer.width
        this.physics.world.bounds.height = this.FloorLayer.height
        
        /////collider
        this.FloorLayer.setCollisionByProperty({ wall : true })
        this.DoorLayer.setCollisionByProperty({ shelf : true })
        


        this.physics.add.collider(this.FloorLayer, this.player)
        this.physics.add.collider(this.DoorLayer, this.player)
       
         
         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

        
    }

    update() {
      ///////classroom_1///////
      if (this.player.x > 270 && this.player.x < 308 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom1_lv2();
     }

     ///////classroom_2///////
      if (this.player.x > 598 && this.player.x < 622 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom2_lv2();
     }

     ///////classroom_3///////
      if (this.player.x > 915 && this.player.x < 942 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom3_lv2();
     }
      ////////go back to room1////
     if (this.player.x > 1184 && this.player.x < 1241 && this.player.y < 31 ) {
      console.log("back room1")
      this.room1();
   }

     ////////go to gate////
     if (this.player.x > 1187 && this.player.x < 1254 && this.player.y > 287 ) {
      console.log("Door 1")
      this.gate();
   }

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

 //Function to jump to classroom1_lv1
 classroom1_lv2(player,tile) {
  console.log("classroom1_lv2 function");
  this.scene.start("classroom1_lv2")

}

classroom2_lv2(player,tile) {
  console.log("classroom2_lv2 function");
  this.scene.start("classroom2_lv2")

}

classroom3_lv2(player,tile) {
  console.log("classroom3_lv2 function");
  this.scene.start("classroom3_lv2")

}

//Fuction go back to room1
room1(player,tile) {
  console.log("room1 function");
  let playerPos={}
  playerPos.x=1215
  playerPos.y=224
  playerPos.facing="back"
  this.scene.start("room1",{player:playerPos})}

//Fuction go to gate
gate(player,tile) {
  console.log("gate function");
  this.scene.start("gate")

}
    

}
