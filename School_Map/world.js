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


   

  }

  create() {
    console.log("*** world scene");

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
this.ItemLayer.setCollisionByExclusion(-1, true)

this.physics.add.collider(this.ItemLayer, this.player)
this.physics.add.collider(this.StallLayer, this.player)
this.physics.add.collider(this.FloorWallLayer, this.player)
this.physics.add.collider(this.LayoutLayer, this.player)

this.cursors = this.input.keyboard.createCursorKeys();

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {

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
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
      //console.log('idle');
    }
  } /////////////////// end of update //////////////////////////////

  //Function to jump to room1
  room1(player,tile) {
    console.log("room1 function");
    this.scene.start("room1")

  }

} //////////// end of class world ////////////////////////
