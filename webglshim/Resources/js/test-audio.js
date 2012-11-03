var testAudio = function () {
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

	var b = new Audio("audio/bgm.mp3");
	b.play();
};

testAudio();
