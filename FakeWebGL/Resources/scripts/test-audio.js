requirejs.config({
	shim: {
		'chester': {
			exports: 'chesterGL'
		}
	},
	nodeRequire: runScript
});

require(["require", "chester", "buttons"], function (require) {
	chesterGL.settings['useGoogleAnalytics'] = false;
	chesterGL.setup("webgl");
	
	console.log("1");
	chesterGL.BMFontLabelBlock.loadFont("fonts/port_lligat");
	console.log("2");
	chesterGL.assetsLoaded("all", function () {
	    console.log("3");
		var buttons = require("buttons");

		// just test the Audio API
		var a = new Audio();
		if (a.canPlayType("audio/mpeg").match(/maybe/)) {
			console.log("plays mp3!");
		}
		if (a.canPlayType("audio/wav").match(/maybe/)) {
			console.log("plays wav!");
		}
		if (a.canPlayType("audio/ogg").match(/maybe/)) {
			console.log("plays ogg!");
		}

		var scene = new chesterGL.Block(null, chesterGL.Block.TYPE.SCENE),
			but1 = new buttons.BMFontButton("play music", "fonts/port_lligat"),
			but2 = new buttons.BMFontButton("pause music", "fonts/port_lligat"),
			but3 = new buttons.BMFontButton("play sfx", "fonts/port_lligat"),
			menu = new buttons.Menu(),
			copyrightLabel = new BMFontLabelBlock("fonts/port_lligat", "Minstrel Guild - Kevin MacLeod (incompetech.com)");

		copyrightLabel.setPosition(0, 20, 0);

		// audio files
		var bgMusic = new Audio();
		bgMusic.loop = true;
		bgMusic.preload = true;
		bgMusic.src = "audio/Minstrel Guild.mp3";
		bgMusic.addEventListener("ended", function () {
			console.log("audio: " + this.src  + " has ended");
		});
		var sfx = new Audio();
		sfx.preload = true;
		sfx.src = "audio/sfx.mp3";

		but1.action = function () {
			bgMusic.play();
		};
		but2.action = function () {
			bgMusic.pause();
		};
		but2.action = function () {
			sfx.play();
		};

		menu.addChild(but1, but2, but3);
		menu.alignItems(buttons.Menu.ORDER.VERTICAL);
		scene.addChild(menu, copyrightLabel);
		chesterGL.setRunningScene(scene);
	});
});
