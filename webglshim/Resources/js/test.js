var a = "foo";

var baz = function (bar) {
	debugger;
	var j = Math.random();
	log(bar + ": " + a);
};

baz("asdf");
baz(Math.random());
