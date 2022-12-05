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
    this.load.image("star", "assets/star.png");  
    this.load.image("tint","assets/tint.jpg");
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
        //  var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "back");

  


        this.player = this.physics.add.sprite(this.player.x, this.player.y, 'Sunako').play(this.player.facing)
       

         this.player.setCollideWorldBounds(true);
         this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)
         
         window.player = this.player

        this.physics.world.bounds.width = this.FloorLayer.width
        this.physics.world.bounds.height = this.FloorLayer.height

       // this.physics.add.overlap(this.player,this.monster,this.overlap,null,this)
        
        /////collider
        this.FloorLayer.setCollisionByProperty({ wall : true })
        this.DoorLayer.setCollisionByProperty({ shelf : true })
        this.WallLayer.setCollisionByProperty({ stair : true })


        this.physics.add.collider(this.FloorLayer, this.player)
        this.physics.add.collider(this.DoorLayer, this.player)
        this.physics.add.collider(this.WallLayer, this.player)
         
         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

         const image = this.add.image(0,0, "tint").setScale(1000);
         image.setAlpha(0.6)

           // Add text 
  this.add.text(650,-30, 'HALLWAY 1', {
    font: '30px Courier',
    fill: '#FFFFFF'
});

        
    }

    update() {

      ///////classroom_1///////
      if (this.player.x > 270 && this.player.x < 308 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom1_lv1();
     }

      ///////classroom_2///////
      if (this.player.x > 598 && this.player.x < 622 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom2_lv1();
     }

       ///////classroom_3///////
      if (this.player.x > 915 && this.player.x < 942 && this.player.y < 208 ) {
        console.log("Door 1")
        this.classroom3_lv1();
     }

      ///////hallway2///////
      if (this.player.x > 1187 && this.player.x < 1254 && this.player.y > 287 ) {
        console.log("Door 1")
        this.hallway2();
     }


        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play("left", true);
            window.attack = false // walk left
            
          } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play("right", true);
            window.attack = false
           
          } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("back", true);
            window.attack = false

          } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("front", true);
            window.attack = false

           } else if (this.cursors.space.isDown) { //this.cursors.left.isDown && 
              this.player.body.setVelocityX(0);
              this.player.body.setVelocityY(0);
              this.player.anims.play("attack", true);
              console.log("attack");
              window.attack = true;

          } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
            window.attack = false
            //console.log('idle');
          }
    }

 //Function to jump to classroom1_lv1
 classroom1_lv1(player,tile) {
  console.log("classroom1_lv1 function");
  this.scene.start("classroom1_lv1")

}

classroom2_lv1(player,tile) {
  console.log("classroom2_lv1 function");
  this.scene.start("classroom2_lv1")

}

classroom3_lv1(player,tile) {
  console.log("classroom3_lv1 function");
  this.scene.start("classroom3_lv1")

}
//////jump to hallway 2/////
hallway2(player,tile) {
  console.log("hallway2 function");
  let playerPos={}
  playerPos.x=1217
  playerPos.y=63
  playerPos.facing="front"
  this.scene.start("hallway2",{player:playerPos})}

  /////gameover////
  // overlap(){
  //   console.log("monster touch player")
  //   this.cameras.main.shake(100)
  //   this.scene.start("gameover")

  // }


  // /////attack///////
  // attack (player, monster){
  //   if (this.cursors.space.isDown){
  //     console.log("attack monster")
  //     monster.disableBody(true, true);

  //   } else if (this.cursors.space.isDown == false) {
  //     console.log("gameover function")
  //     this.scene.start("gameover")
  //     this.cameras.main.shake(300);
  //   }
  // }

    

}
