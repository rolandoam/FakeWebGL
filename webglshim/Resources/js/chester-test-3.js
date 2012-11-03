function setupGame() {
	chesterGL.settings.useGoogleAnalytics = false;
	chesterGL.setup("webgl");
	var size = chesterGL.viewportSize();

	chesterGL.BMFontLabelBlock.loadFont("fonts/port_lligat");
	chesterGL.loadAsset("texture", "images/star.png");
	chesterGL.assetsLoaded("all", function () {
	// finish with the setup and run the game
	chesterGL.setupPerspective();

	var sceneBlock = new chesterGL.Block(null, chesterGL.Block.TYPE['SCENE']);
	sceneBlock.title = "Test::BMFonts";
	chesterGL.setRunningScene(sceneBlock);

	var group = new chesterGL.Block();
	group.setPosition(100, 100, 0);

	// create a block
	var label = new chesterGL.BMFontLabelBlock("fonts/port_lligat", "This is a BM Label");
	label.setRotation(Math.PI / 4);
	label.setPosition(size.width/2, size.height / 2, 0);

	// group.addChild(someBlock);

	// other test for atlas
	var atlas = new chesterGL.BlockGroup("images/star.png"),
	c1 = atlas.createBlock(),
	c2 = atlas.createBlock();
	c1.setPosition(40, 100, 0);
	c2.setPosition(40, 180, 0);
	atlas.addChild(c1, c2);
	group.addChild(atlas);

	// add some action
	var dz = 10,
		oneDeg = Math.PI / 180.0;
//	label.setUpdate(function () {
//		this.setRotation(this.rotation + oneDeg);
//		this.setPosition([this.position[0], this.position[1], this.position[2] + dz]);
//		if (this.position[2] >=  200) { dz = -dz; }
//		if (this.position[2] <= -200) { dz = -dz; }
//	});

	sceneBlock.addChild(group, label);
	// sceneBlock.addChild(someBlock);
	chesterGL.run();
	// draw a single frame (for debug purposes)
	// chesterGL.drawScene();
   });
} // setupGame()

try {
	setupGame();
} catch (e) {
	console.log(e);
}
