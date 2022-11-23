class classroom1_lv2 extends Phaser.Scene {

    constructor() {
        super({ key: 'classroom1_lv2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
     // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("classroom1_lv2","assets/Classroom.tmj")
    // Step 2 : Preload any images here
    this.load.image("SchoolImg", "assets/tilests32x32.png");
    this.load.image("ClassroomImg", "assets/school_tileset.png");
    this.load.spritesheet('monster', 'assets/monster.png', { frameWidth: 128, frameHeight: 64 });
    }

    create() {
        console.log('*** classroom1_lv2 scene');

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "classroom1_lv2" })

        let SchoolTiles = map.addTilesetImage("tilests32x32", "SchoolImg");
        let ClassroomTiles = map.addTilesetImage("school_tileset", "ClassroomImg");

        let tilesArray = [
            SchoolTiles,
            ClassroomTiles,
          ];

          this.LayoutLayer = map.createLayer("Layout",tilesArray,0,0);
          this.WallFloorLayer = map.createLayer("WallFloor",tilesArray,0,0);
          this.TableLayer = map.createLayer("Table",tilesArray,0,0);
          this.ChairLayer = map.createLayer("Chair",tilesArray,0,0);

        //Object layers
         var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "start");

         this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("left")
         this.monster = this.physics.add.sprite(22, 290, "monster").play("right_m")

         this.player.setCollideWorldBounds(true);
         this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)
         
         window.player = this.player

       
        
        /////collider
        this.LayoutLayer.setCollisionByExclusion(-1, true)
        this.WallFloorLayer.setCollisionByProperty({ wall : true })
        this.TableLayer.setCollisionByProperty({ item : true })
        this.ChairLayer.setCollisionByProperty({ item : true })
        
        

        this.physics.add.collider(this.LayoutLayer, this.player)
        this.physics.add.collider(this.WallFloorLayer, this.player)
        this.physics.add.collider(this.TableLayer, this.player)
        this.physics.add.collider(this.ChairLayer, this.player)
        this.physics.add.collider(this.TableLayer, this.monster)
        

         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

        
    }

    update() {
         ///////enemy chase//////
         this.physics.moveToObject( this.monster, this.player, 30, 3000);

      if (this.player.x > 902 && this.player.y > 257 && this.player.y < 287 ) {
        console.log("classroom1 exit")
        this.hallway2();
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
// //Function to jump back to hallway
hallway2(player,tile) {
  console.log("hallway2 function");

  let playerPos={}
  playerPos.x=285
  playerPos.y=221
  playerPos.facing="front"
  this.scene.start("hallway2",{player:playerPos})}
    

}

