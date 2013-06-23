function setupGame() {
	chesterGL.settings.useGoogleAnalytics = false;
	chesterGL.setup("webgl");
	var size = chesterGL.viewportSize();

	chesterGL.loadAsset("texture", "images/ship.png");
	chesterGL.loadAsset("texture", "images/ship_non_hdpi.png");
	chesterGL.BMFontLabelBlock.loadFont("fonts/arial_demo");
	chesterGL.assetsLoaded("all", function () {
		// $("#loading").html("Test Single Block");
		// finish with the setup and run the game
		chesterGL.setupPerspective();

		var sceneBlock = new chesterGL.Block(null, chesterGL.Block.TYPE['SCENE']);
		sceneBlock.title = "Test::HighDPI";
		chesterGL.setRunningScene(sceneBlock);

		// create a block
		var retinaShip = new chesterGL.Block();
		retinaShip.setTexture("images/ship.png");
		// someBlock.rotateBy(-45);
		retinaShip.setPosition(size.width/2, size.height/2 - 100, 0);

		var nonRetinaShip = new chesterGL.Block();
		nonRetinaShip.setTexture("images/ship_non_hdpi.png");
		nonRetinaShip.setPosition(size.width/2, size.height/2 + 100, 0);

		var label = new chesterGL.BMFontLabelBlock("walala", "fonts/arial_demo");
		label.setPosition(20, 10, 0);
		sceneBlock.append(retinaShip, nonRetinaShip, label);

		chesterGL.run();
		// draw a single frame (for debug purposes)
		// chesterGL.drawScene();
	});
} // setupGame()

setupGame();
