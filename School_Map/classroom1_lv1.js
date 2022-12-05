class classroom1_lv1 extends Phaser.Scene {


    constructor() {
        super({ key: 'classroom1_lv1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
     // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("classroom1_lv1","assets/Classroom.tmj")
    // Step 2 : Preload any images here
    this.load.image("SchoolImg", "assets/tilests32x32.png");
    this.load.image("ClassroomImg", "assets/school_tileset.png");
    this.load.spritesheet('paper', 'assets/paper.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image("tint","assets/tint.jpg");
    this.load.audio("paper", 'assets/paper.mp3');
    this.load.spritesheet('monster', 'assets/monster.png', { frameWidth: 128, frameHeight: 64 });

    }

    create() {
        console.log('*** classroom1_lv1 scene');

        this.paperSnd = this.sound.add('paper');

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "classroom1_lv1" })

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

          ////monster ani
          this.anims.create({
            key: 'right_m',
            frames: this.anims.generateFrameNumbers('monster', { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

          /////////paper ANI//////////
this.anims.create({
  key: 'aniPaper',
  frames: this.anims.generateFrameNumbers('paper', { start: 0, end: 1 }),
  frameRate: 3,
  repeat: -1
});

        //Object layers
        var startPoint = map.findObject("ObjectLayer",(obj) => obj.name === "start");
        
      
      
        this.monster = this.physics.add.sprite(534, 188, "monster").play("right_m")
         this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("left")
         this.paper = this.physics.add.sprite(209, 268, "paper").play("aniPaper")

         this.player.setCollideWorldBounds(true);
         this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)
         
         window.player = this.player

         this.physics.add.overlap(this.player,this.monster,this.overlap,null,this)


         this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp,
            callbackScope: this,
            loop: false,
         });
       
        
        /////collider
        this.LayoutLayer.setCollisionByExclusion(-1, true)
        this.WallFloorLayer.setCollisionByProperty({ wall : true })
        this.TableLayer.setCollisionByProperty({ item : true })
        this.ChairLayer.setCollisionByProperty({ item : true })
        
        

        this.physics.add.collider(this.LayoutLayer, this.player)
        this.physics.add.collider(this.WallFloorLayer, this.player)
        this.physics.add.collider(this.TableLayer, this.player)
        this.physics.add.collider(this.ChairLayer, this.player)
        


        this.physics.add.overlap(this.player,this.paper, this.collectPaper, null, this);

         this.cursors = this.input.keyboard.createCursorKeys();
         this.cameras.main.startFollow(this.player);

        
         const image = this.add.image(0,0, "tint").setScale(1000);
         image.setAlpha(0.6)
        
    }

    update() {

      if (this.player.x > 902 && this.player.y > 257 && this.player.y < 287 ) {
        console.log("classroom1 exit")
        this.room1();
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
room1(player,tile) {
  console.log("room1 function");
window.monster1=true
  let playerPos={}
  playerPos.x=285
  playerPos.y=221
  playerPos.facing="front"
  this.scene.start("room1",{player:playerPos})}

  //////function to collect item/////
collectPaper (player, paper)
{
  console.log("collect paper");
  window.paper ++
    this.paperSnd.play();
    paper.disableBody(true, true);
    
  
}

//////enemy down up/////
moveDownUp() {
  console.log("moveDownUp")
  this.tweens.timeline({
    targets: this.monster,
    ease:"Linear",
    loop: -1,
    duration: 4000,
    tweens: [
      {
        y:515,
      },
      {
        y:188,
      },
    ],
  });
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

