function setupGame() {
	chesterGL.settings.useGoogleAnalytics = false;
	chesterGL.setup("webgl");
	var size = chesterGL.viewportSize();

	chesterGL.loadAsset("texture", "images/ship.png");
	chesterGL.loadAsset("texture", "images/ship_non_hdpi.png");
	chesterGL.assetsLoaded("texture", function () {
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

		sceneBlock.addChild(retinaShip, nonRetinaShip);

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
