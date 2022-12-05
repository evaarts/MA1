class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");
    this.load.tilemapTiledJSON("world1","assets/Toilet.tmj")
    // Step 2 : Preload any images here
    this.load.image("DirtImg", "assets/Dirt.png");
    this.load.image("SchoolImg", "assets/tilests32x32.png");
    this.load.image("ToiletStallImg","assets/toiletstall.png")

    this.load.spritesheet('Sunako', 'assets/Sunako.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image("tint","assets/tint.jpg");

  


    //this.load.audio("gamebgm","assets/Gamebgm.mp3")

   

  }

  create() {
    console.log("*** world scene");
    // this.bgMusic = this.sound.add("gamebgm", {loop: true}).setVolume(0.2)

    //Step 3 - Create the map from main
   
    let map = this.make.tilemap({ key: "world1" })

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");
    
    let DirtTiles = map.addTilesetImage("dirt", "DirtImg")
    let SchoolTiles = map.addTilesetImage("tilests32x32", "SchoolImg");
    let ToiletStallTiles = map.addTilesetImage("toiletstall","ToiletStallImg")

    // Step 5  create an array of tiles
    let tilesArray = [
      DirtTiles,
      SchoolTiles,
      ToiletStallTiles
    ];

    // Step 6  Load in layers by layers
   
    this.FloorWallLayer = map.createLayer("FloorWall",tilesArray,0,0);

    this.LayoutLayer = map.createLayer("Layout",tilesArray,0,0);

    this.StallLayer = map.createLayer("Stall",tilesArray,0,0);

    this.ItemLayer = map.createLayer("Item",tilesArray,0,0);

    this.DirtLayer = map.createLayer("Dirt",tilesArray,0,0);

    //Object layers

    var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");

    // Add main player here with physics.add.sprite
  

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('Sunako', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'back',
      frames: this.anims.generateFrameNumbers('Sunako', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'front',
    frames: this.anims.generateFrameNumbers('Sunako', { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('Sunako', { start: 12, end: 15 }),
  frameRate: 10,
  repeat: -1
});



this.player = this.physics.add.sprite(startPoint.x, startPoint.y, 'Sunako').play("front")


this.player.setCollideWorldBounds(true);
this.player.body.setSize(this.player.width*0.7,this.player.height*0.9)

window.player = this.player




this.LayoutLayer.setCollisionByExclusion(-1, true)
this.FloorWallLayer.setCollisionByProperty({ wall : true }) 
this.StallLayer.setCollisionByProperty({ toilet : true }) 
this.ItemLayer.setCollisionByProperty({ item : true }) 

this.physics.add.collider(this.ItemLayer, this.player)
this.physics.add.collider(this.StallLayer, this.player)
this.physics.add.collider(this.FloorWallLayer, this.player)
this.physics.add.collider(this.LayoutLayer, this.player)




this.cursors = this.input.keyboard.createCursorKeys();
this.cameras.main.startFollow(this.player);

/////add light////
const image = this.add.image(0,0, "tint").setScale(1000);
image.setAlpha(0.6)

// this.FloorWallLayer.setPipeline("Light2D").setAlpha(0.1)
// this.LayoutLayer.setPipeline("Light2D").setAlpha(0.1)
// this.StallLayer.setPipeline("Light2D").setAlpha(0.1)
// this.ItemLayer.setPipeline("Light2D").setAlpha(0.1)
// this.DirtLayer.setPipeline("Light2D").setAlpha(0.1)

// this.lights.enable();
// this.lights.setAmbientColor(0x080808);
// this.spotlight=this.lights.addLight(this.player.x, this.player.y).setRadius(150,150).setIntensity(5);        


 
  } /////////////////// end of create //////////////////////////////

  update() {
    // this.spotlight.x=this.player.x
    // this.spotlight.y=this.player.y




   if (this.player.x < 95 && this.player.y > 390 && this.player.y < 412) {
      console.log("Door 1")
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

    // } else if (this.cursors.space.isDown) { 
    //   this.player.body.setVelocityX(0);
    //   this.player.body.setVelocityY(0);
    //   // this.star.disableBody(true,false)
    //   this.player.anims.play("attack", true);
    //   console.log("attack");
    //   window.attack = true;

      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }
  } /////////////////// end of update //////////////////////////////

//   killmonster(star,monster){
// console.log("hitmonster")

//   }
  //Function to jump to room1
  room1(player,tile) {
    console.log("room1 function");

     let playerPos={}
  playerPos.x=45
  playerPos.y=267
  playerPos.facing="right"
  this.scene.start("room1",{player:playerPos})
}



  }

//////////// end of class world /////////////////////
