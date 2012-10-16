function setupGame() {
	chesterGL.settings.useGoogleAnalytics = false;
	chesterGL.setup("webgl");
	var size = chesterGL.viewportSize();
	var totalBlocks = 60;

	chesterGL.loadAsset("texture", "images/star.png");
	chesterGL.assetsLoaded("texture", function () {
		// finish with the setup and run the game
		chesterGL.setupPerspective();

		var sceneBlock = new chesterGL.Block(null, chesterGL.Block.TYPE.SCENE);
		sceneBlock.title = "Test::BlockGroup";
		chesterGL.setRunningScene(sceneBlock);

		var group = new chesterGL.BlockGroup("images/star.png", totalBlocks);

		// add lots of blocks
		console.log("adding " + totalBlocks + " stars");
		for (var i=0; i < totalBlocks; i++) {
			var b = group.createBlock();
			b.setPosition([Math.random() * size.width, Math.random() * size.height, 0]);
			b.speed = [Math.random() * 10 - 5, Math.random() * 10 - 5, 0];
			b.setUpdate(function () {
				this.setPosition([this.position[0] + this.speed[0], this.position[1] + this.speed[1], this.position[2] + this.speed[2]]);
				if (this.position[0] >= size.width  || this.position[0] <= 0) { this.speed[0] = -this.speed[0]; }
				if (this.position[1] >= size.height || this.position[1] <= 0) { this.speed[1] = -this.speed[1]; }
			});
			group.addChild(b);
		}

		sceneBlock.addChild(group);
		chesterGL.run();
		// draw a single frame (for debug purposes)
		// chesterGL.drawScene();
	});
} // setupGame()
