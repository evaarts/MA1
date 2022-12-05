class gate extends Phaser.Scene {

    constructor() {
        super({ key: 'gate' });
       
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
     // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("gate","assets/gate.tmj")
    // Step 2 : Preload any images here
    this.load.image("SchoolImg", "assets/tilests32x32.png");
    this.load.spritesheet('monster', 'assets/monster.png', { frameWidth: 128, frameHeight: 64 });
    this.load.image("tint","assets/tint.jpg");

    }

    create() {
        console.log('*** gate scene');

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "gate" })

        let SchoolTiles = map.addTilesetImage("tilests32x32", "SchoolImg");

        let tilesArray = [
            SchoolTiles,
          ];

          this.FloorLayer = map.createLayer("Floor",tilesArray,0,0);
          this.WallLayer = map.createLayer("Wall",tilesArray,0,0);
          this.ItemLayer = map.createLayer("Item",tilesArray,0,0);

        //Object layers
         var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "start");


         //mon ANI
         this.anims.create({
          key: 'right_m',
          frames: this.anims.generateFrameNumbers('monster', { start: 3, end: 5 }),
          frameRate: 6,
          repeat: -1
      });
      
        

         this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("front")
         this.monster = this.physics.add.sprite(-100, 290, "monster").play("right_m").setScale(2);
         this.player.setCollideWorldBounds(true);
         this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)
         
         window.player = this.player

        this.physics.world.bounds.width = this.FloorLayer.width
        this.physics.world.bounds.height = this.FloorLayer.height
        this.physics.add.overlap(this.player,this.monster,this.overlap,null,this)
        
        /////collider
        this.WallLayer.setCollisionByProperty({ wall : true })
        this.ItemLayer.setCollisionByProperty({ object : true })
        


        this.physics.add.collider(this.WallLayer, this.player)
        this.physics.add.collider(this.ItemLayer, this.player)
       
         
         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

         const image = this.add.image(0,0, "tint").setScale(1000);
         image.setAlpha(0.6)
        
        // Add text 
        this.add.text(610,-30, 'GATE', {
            font: '30px Courier',
            fill: '#FFFFFF'
        });

    }

    update() {

      ///////enemy chase//////
      this.physics.moveToObject( this.monster, this.player, 30, 5000);

        ////////go back to hallway2////
     if (this.player.x > 1184 && this.player.x < 1241 && this.player.y < 31 ) {
      console.log("back hallway2")
      this.hallway2();
   }

        ////////ending scene ///
        if (this.player.x > 623 && this.player.x < 663 && this.player.y < 188 && window.paper == 5 && window.key == 1) {
          console.log("to ending")
          this.ending();
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

          } else if (this.cursors.space.isDown) { //this.cursors.left.isDown && 
            this.player.body.setVelocityX(0);
            this.player.body.setVelocityY(0);
            this.player.anims.play("attack", true);
            console.log("attack");
            window.attack = true;

          } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
            //console.log('idle');
          }
    }

 //Function to jump to hallway2
 hallway2(player,tile) {
  console.log("hallway2 function");
  let playerPos={}
  playerPos.x=1215
  playerPos.y=224
  playerPos.facing="back"
  this.scene.start("hallway2",{player:playerPos})}

  /////ending/////
  ending(player,tile) {
    console.log("ending function");
    window.bgmSnd1.stop();
    this.scene.start("ending")
   
  
  }

   /////gameover////
   overlap(){
    console.log("monster touch player")
    window.bgmSnd1.stop();
    window.paper= 0
    window.key= 0
    this.cameras.main.shake(100)
    this.scene.start("gameover")

  }

}
