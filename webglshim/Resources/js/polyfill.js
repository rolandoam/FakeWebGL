//
//  polyfill.js
//  webglshim
//
//  Created by Rolando Abarca on 10/5/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.


/**
 * what is this?
 *
 * This is a simple wrapper around missing things in the webglshim implementation, basically most of
 * of the stuff to be found here is related to DOM, Ajax, Images, input handling, etc.
 */

_touchBeganListeners = [];
_touchMovedListeners = [];
_touchEndedListeners = [];

_touchesBegan = function (event) {
	// log("got touches began: ");
	// log("  " + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY);
	for (var i in _touchBeganListeners) {
		var listener = _touchBeganListeners[i];
		listener.call(null, event);
	}
};
_touchesMoved = function (event) {
	// log("got touches moved: ");
	// log("  " + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY);
	for (var i in _touchMovedListeners) {
		var listener = _touchMovedListeners[i];
		listener.call(null, event);
	}
};
_touchesEnded = function (event) {
	// log("got touches ended: ");
	// log("  " + event.changedTouches[0].pageX + "," + event.changedTouches[0].pageY);
	for (var i in _touchEndedListeners) {
		var listener = _touchEndedListeners[i];
		listener.call(null, event);
	}
};

var fakeHTML = true;

if (fakeHTML) {
	window = this;

	window.navigator = {
		platform: "iPhoneOS"
	};

	window.location = {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		search: ""
	};

	window.requestAnimationFrame = requestAnimationFrame;

	// Set up a "fake" HTMLElement
	window.HTMLElement = function( tagName ){
		this.tagName = tagName;
		this.children = [];
	};

	window.HTMLElement.prototype.appendChild = function( element ) {
		this.children.push( element );

		// If the child is a script element, begin to load it
		if( element.tagName == 'script' ) {
			ej.setTimeout( function(){
				ej.require( element.src );
				if( element.onload ) {
					element.onload();
				}
			}, 1);
		}
	};

	var script = new HTMLElement('script');

	document = {
		// dummy DOM
		body: new HTMLElement('body'),
		getElementById: function (domId) {
			if (domId == "webgl") {
				// create a canvas the full size of the window
				return new ChesterCanvas(window.innerWidth, window.innerHeight);
			} else {
				throw "invalid canvas id!";
			}
		},
		getElementsByTagName: function (tag) {
			if (tag === "script") {
				return [script];
			}
		},
		addEventListener: function (event, callback, useCapture) {
			if (event === "touchstart") {
				_touchBeganListeners.push(callback);
			} else if (event === "touchmove") {
				_touchMovedListeners.push(callback);
			} else if (event === "touchend") {
				_touchEndedListeners.push(callback);
			} else {
				throw "invalid event";
			}
		}
	};

	script.getAttribute = function (attr) {
		if (attr === "data-main") {
			return "js/main-built.js";
		}
	};
	script.parentNode = document.body;
}

console = {
	log: log,
	info: log,
	error: log,
	warn: log
};

// simple replacement for Stats.js
// https://github.com/mrdoob/stats.js
Stats = function () {
	var startTime = Date.now(), prevTime = startTime;
	var ms = 0, msMin = Infinity, msMax = 0;
	var fps = 0, fpsMin = Infinity, fpsMax = 0;
	var frames = 0, mode = 0;
	var theElement = {
		style: {}
	};

	return {
		REVISION: 11,
		domElement: theElement,
		setMode: function () {},
		begin: function () {
			startTime = Date.now();
		},
		end: function () {
				var time = Date.now();

				ms = time - startTime;
				msMin = Math.min( msMin, ms );
				msMax = Math.max( msMax, ms );

				frames ++;

				if ( time > prevTime + 2000 ) {

					fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
					fpsMin = Math.min( fpsMin, fps );
					fpsMax = Math.max( fpsMax, fps );

					console.log(fps + ' FPS (' + fpsMin + '-' + fpsMax + ')');

					prevTime = time;
					frames = 0;

				}

				return time;
		},
		update: function () {}
	};
};

HTMLCanvasElement = ChesterCanvas;

ChesterCanvas.prototype.__offset = {
	top: 0,
	left: 0
};

Image = PNGImage;
Image.prototype.addEventListener = function PNGImage_addEventListener(event, callback) {
	if (event == "load") {
		this.onload = callback;
	} else {
		throw "invalid event";
	}
};

// dummy implementation :)
setTimeout = function FN_setTimeout(callback, delay) {
	callback();
};

alert = function FN_alert(txt) {
	log(txt);
};

// adapted from https://gist.github.com/763999
WebGLRenderingContext.prototype.ACTIVE_ATTRIBUTES = 35721;
WebGLRenderingContext.prototype.ACTIVE_ATTRIBUTE_MAX_LENGTH = 35722;
WebGLRenderingContext.prototype.ACTIVE_TEXTURE = 34016;
WebGLRenderingContext.prototype.ACTIVE_UNIFORMS = 35718;
WebGLRenderingContext.prototype.ACTIVE_UNIFORM_MAX_LENGTH = 35719;
WebGLRenderingContext.prototype.ALIASED_LINE_WIDTH_RANGE = 33902;
WebGLRenderingContext.prototype.ALIASED_POINT_SIZE_RANGE = 33901;
WebGLRenderingContext.prototype.ALPHA = 6406;
WebGLRenderingContext.prototype.ALPHA_BITS = 3413;
WebGLRenderingContext.prototype.ALWAYS = 519;
WebGLRenderingContext.prototype.ARRAY_BUFFER = 34962;
WebGLRenderingContext.prototype.ARRAY_BUFFER_BINDING = 34964;
WebGLRenderingContext.prototype.ATTACHED_SHADERS = 35717;
WebGLRenderingContext.prototype.BACK = 1029;
WebGLRenderingContext.prototype.BLEND = 3042;
WebGLRenderingContext.prototype.BLEND_COLOR = 32773;
WebGLRenderingContext.prototype.BLEND_DST_ALPHA = 32970;
WebGLRenderingContext.prototype.BLEND_DST_RGB = 32968;
WebGLRenderingContext.prototype.BLEND_EQUATION = 32777;
WebGLRenderingContext.prototype.BLEND_EQUATION_ALPHA = 34877;
WebGLRenderingContext.prototype.BLEND_EQUATION_RGB = 32777;
WebGLRenderingContext.prototype.BLEND_SRC_ALPHA = 32971;
WebGLRenderingContext.prototype.BLEND_SRC_RGB = 32969;
WebGLRenderingContext.prototype.BLUE_BITS = 3412;
WebGLRenderingContext.prototype.BOOL = 35670;
WebGLRenderingContext.prototype.BOOL_VEC2 = 35671;
WebGLRenderingContext.prototype.BOOL_VEC3 = 35672;
WebGLRenderingContext.prototype.BOOL_VEC4 = 35673;
WebGLRenderingContext.prototype.BROWSER_DEFAULT_WEBGL = 37444;
WebGLRenderingContext.prototype.BUFFER_SIZE = 34660;
WebGLRenderingContext.prototype.BUFFER_USAGE = 34661;
WebGLRenderingContext.prototype.BYTE = 5120;
WebGLRenderingContext.prototype.CCW = 2305;
WebGLRenderingContext.prototype.CLAMP_TO_EDGE = 33071;
WebGLRenderingContext.prototype.COLOR_ATTACHMENT0 = 36064;
WebGLRenderingContext.prototype.COLOR_BUFFER_BIT = 16384;
WebGLRenderingContext.prototype.COLOR_CLEAR_VALUE = 3106;
WebGLRenderingContext.prototype.COLOR_WRITEMASK = 3107;
WebGLRenderingContext.prototype.COMPILE_STATUS = 35713;
WebGLRenderingContext.prototype.COMPRESSED_TEXTURE_FORMATS = 34467;
WebGLRenderingContext.prototype.CONSTANT_ALPHA = 32771;
WebGLRenderingContext.prototype.CONSTANT_COLOR = 32769;
WebGLRenderingContext.prototype.CONTEXT_LOST_WEBGL = 37442;
WebGLRenderingContext.prototype.CULL_FACE = 2884;
WebGLRenderingContext.prototype.CULL_FACE_MODE = 2885;
WebGLRenderingContext.prototype.CURRENT_PROGRAM = 35725;
WebGLRenderingContext.prototype.CURRENT_VERTEX_ATTRIB = 34342;
WebGLRenderingContext.prototype.CW = 2304;
WebGLRenderingContext.prototype.DECR = 7683;
WebGLRenderingContext.prototype.DECR_WRAP = 34056;
WebGLRenderingContext.prototype.DELETE_STATUS = 35712;
WebGLRenderingContext.prototype.DEPTH_ATTACHMENT = 36096;
WebGLRenderingContext.prototype.DEPTH_BITS = 3414;
WebGLRenderingContext.prototype.DEPTH_BUFFER_BIT = 256;
WebGLRenderingContext.prototype.DEPTH_CLEAR_VALUE = 2931;
WebGLRenderingContext.prototype.DEPTH_COMPONENT = 6402;
WebGLRenderingContext.prototype.DEPTH_COMPONENT16 = 33189;
WebGLRenderingContext.prototype.DEPTH_FUNC = 2932;
WebGLRenderingContext.prototype.DEPTH_RANGE = 2928;
WebGLRenderingContext.prototype.DEPTH_STENCIL = 34041;
WebGLRenderingContext.prototype.DEPTH_STENCIL_ATTACHMENT = 33306;
WebGLRenderingContext.prototype.DEPTH_TEST = 2929;
WebGLRenderingContext.prototype.DEPTH_WRITEMASK = 2930;
WebGLRenderingContext.prototype.DITHER = 3024;
WebGLRenderingContext.prototype.DONT_CARE = 4352;
WebGLRenderingContext.prototype.DST_ALPHA = 772;
WebGLRenderingContext.prototype.DST_COLOR = 774;
WebGLRenderingContext.prototype.DYNAMIC_DRAW = 35048;
WebGLRenderingContext.prototype.ELEMENT_ARRAY_BUFFER = 34963;
WebGLRenderingContext.prototype.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
WebGLRenderingContext.prototype.EQUAL = 514;
WebGLRenderingContext.prototype.FASTEST = 4353;
WebGLRenderingContext.prototype.FLOAT = 5126;
WebGLRenderingContext.prototype.FLOAT_MAT2 = 35674;
WebGLRenderingContext.prototype.FLOAT_MAT3 = 35675;
WebGLRenderingContext.prototype.FLOAT_MAT4 = 35676;
WebGLRenderingContext.prototype.FLOAT_VEC2 = 35664;
WebGLRenderingContext.prototype.FLOAT_VEC3 = 35665;
WebGLRenderingContext.prototype.FLOAT_VEC4 = 35666;
WebGLRenderingContext.prototype.FRAGMENT_SHADER = 35632;
WebGLRenderingContext.prototype.FRAMEBUFFER = 36160;
WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
WebGLRenderingContext.prototype.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
WebGLRenderingContext.prototype.FRAMEBUFFER_BINDING = 36006;
WebGLRenderingContext.prototype.FRAMEBUFFER_COMPLETE = 36053;
WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
WebGLRenderingContext.prototype.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
WebGLRenderingContext.prototype.FRAMEBUFFER_UNSUPPORTED = 36061;
WebGLRenderingContext.prototype.FRONT = 1028;
WebGLRenderingContext.prototype.FRONT_AND_BACK = 1032;
WebGLRenderingContext.prototype.FRONT_FACE = 2886;
WebGLRenderingContext.prototype.FUNC_ADD = 32774;
WebGLRenderingContext.prototype.FUNC_REVERSE_SUBTRACT = 32779;
WebGLRenderingContext.prototype.FUNC_SUBTRACT = 32778;
WebGLRenderingContext.prototype.GENERATE_MIPMAP_HINT = 33170;
WebGLRenderingContext.prototype.GEQUAL = 518;
WebGLRenderingContext.prototype.GREATER = 516;
WebGLRenderingContext.prototype.GREEN_BITS = 3411;
WebGLRenderingContext.prototype.HIGH_FLOAT = 36338;
WebGLRenderingContext.prototype.HIGH_INT = 36341;
WebGLRenderingContext.prototype.INCR = 7682;
WebGLRenderingContext.prototype.INCR_WRAP = 34055;
WebGLRenderingContext.prototype.INFO_LOG_LENGTH = 35716;
WebGLRenderingContext.prototype.INT = 5124;
WebGLRenderingContext.prototype.INT_VEC2 = 35667;
WebGLRenderingContext.prototype.INT_VEC3 = 35668;
WebGLRenderingContext.prototype.INT_VEC4 = 35669;
WebGLRenderingContext.prototype.INVALID_ENUM = 1280;
WebGLRenderingContext.prototype.INVALID_FRAMEBUFFER_OPERATION = 1286;
WebGLRenderingContext.prototype.INVALID_OPERATION = 1282;
WebGLRenderingContext.prototype.INVALID_VALUE = 1281;
WebGLRenderingContext.prototype.INVERT = 5386;
WebGLRenderingContext.prototype.KEEP = 7680;
WebGLRenderingContext.prototype.LEQUAL = 515;
WebGLRenderingContext.prototype.LESS = 513;
WebGLRenderingContext.prototype.LINEAR = 9729;
WebGLRenderingContext.prototype.LINEAR_MIPMAP_LINEAR = 9987;
WebGLRenderingContext.prototype.LINEAR_MIPMAP_NEAREST = 9985;
WebGLRenderingContext.prototype.LINES = 1;
WebGLRenderingContext.prototype.LINE_LOOP = 2;
WebGLRenderingContext.prototype.LINE_STRIP = 3;
WebGLRenderingContext.prototype.LINE_WIDTH = 2849;
WebGLRenderingContext.prototype.LINK_STATUS = 35714;
WebGLRenderingContext.prototype.LOW_FLOAT = 36336;
WebGLRenderingContext.prototype.LOW_INT = 36339;
WebGLRenderingContext.prototype.LUMINANCE = 6409;
WebGLRenderingContext.prototype.LUMINANCE_ALPHA = 6410;
WebGLRenderingContext.prototype.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
WebGLRenderingContext.prototype.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
WebGLRenderingContext.prototype.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
WebGLRenderingContext.prototype.MAX_RENDERBUFFER_SIZE = 34024;
WebGLRenderingContext.prototype.MAX_TEXTURE_IMAGE_UNITS = 34930;
WebGLRenderingContext.prototype.MAX_TEXTURE_SIZE = 3379;
WebGLRenderingContext.prototype.MAX_VARYING_VECTORS = 36348;
WebGLRenderingContext.prototype.MAX_VERTEX_ATTRIBS = 34921;
WebGLRenderingContext.prototype.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
WebGLRenderingContext.prototype.MAX_VERTEX_UNIFORM_VECTORS = 36347;
WebGLRenderingContext.prototype.MAX_VIEWPORT_DIMS = 3386;
WebGLRenderingContext.prototype.MEDIUM_FLOAT = 36337;
WebGLRenderingContext.prototype.MEDIUM_INT = 36340;
WebGLRenderingContext.prototype.MIRRORED_REPEAT = 33648;
WebGLRenderingContext.prototype.NEAREST = 9728;
WebGLRenderingContext.prototype.NEAREST_MIPMAP_LINEAR = 9986;
WebGLRenderingContext.prototype.NEAREST_MIPMAP_NEAREST = 9984;
WebGLRenderingContext.prototype.NEVER = 512;
WebGLRenderingContext.prototype.NICEST = 4354;
WebGLRenderingContext.prototype.NONE = 0;
WebGLRenderingContext.prototype.NOTEQUAL = 517;
WebGLRenderingContext.prototype.NO_ERROR = 0;
WebGLRenderingContext.prototype.NUM_COMPRESSED_TEXTURE_FORMATS = 34466;
WebGLRenderingContext.prototype.ONE = 1;
WebGLRenderingContext.prototype.ONE_MINUS_CONSTANT_ALPHA = 32772;
WebGLRenderingContext.prototype.ONE_MINUS_CONSTANT_COLOR = 32770;
WebGLRenderingContext.prototype.ONE_MINUS_DST_ALPHA = 773;
WebGLRenderingContext.prototype.ONE_MINUS_DST_COLOR = 775;
WebGLRenderingContext.prototype.ONE_MINUS_SRC_ALPHA = 771;
WebGLRenderingContext.prototype.ONE_MINUS_SRC_COLOR = 769;
WebGLRenderingContext.prototype.OUT_OF_MEMORY = 1285;
WebGLRenderingContext.prototype.PACK_ALIGNMENT = 3333;
WebGLRenderingContext.prototype.POINTS = 0;
WebGLRenderingContext.prototype.POLYGON_OFFSET_FACTOR = 32824;
WebGLRenderingContext.prototype.POLYGON_OFFSET_FILL = 32823;
WebGLRenderingContext.prototype.POLYGON_OFFSET_UNITS = 10752;
WebGLRenderingContext.prototype.RED_BITS = 3410;
WebGLRenderingContext.prototype.RENDERBUFFER = 36161;
WebGLRenderingContext.prototype.RENDERBUFFER_ALPHA_SIZE = 36179;
WebGLRenderingContext.prototype.RENDERBUFFER_BINDING = 36007;
WebGLRenderingContext.prototype.RENDERBUFFER_BLUE_SIZE = 36178;
WebGLRenderingContext.prototype.RENDERBUFFER_DEPTH_SIZE = 36180;
WebGLRenderingContext.prototype.RENDERBUFFER_GREEN_SIZE = 36177;
WebGLRenderingContext.prototype.RENDERBUFFER_HEIGHT = 36163;
WebGLRenderingContext.prototype.RENDERBUFFER_INTERNAL_FORMAT = 36164;
WebGLRenderingContext.prototype.RENDERBUFFER_RED_SIZE = 36176;
WebGLRenderingContext.prototype.RENDERBUFFER_STENCIL_SIZE = 36181;
WebGLRenderingContext.prototype.RENDERBUFFER_WIDTH = 36162;
WebGLRenderingContext.prototype.RENDERER = 7937;
WebGLRenderingContext.prototype.REPEAT = 10497;
WebGLRenderingContext.prototype.REPLACE = 7681;
WebGLRenderingContext.prototype.RGB = 6407;
WebGLRenderingContext.prototype.RGB5_A1 = 32855;
WebGLRenderingContext.prototype.RGB565 = 36194;
WebGLRenderingContext.prototype.RGBA = 6408;
WebGLRenderingContext.prototype.RGBA4 = 32854;
WebGLRenderingContext.prototype.SAMPLER_2D = 35678;
WebGLRenderingContext.prototype.SAMPLER_CUBE = 35680;
WebGLRenderingContext.prototype.SAMPLES = 32937;
WebGLRenderingContext.prototype.SAMPLE_ALPHA_TO_COVERAGE = 32926;
WebGLRenderingContext.prototype.SAMPLE_BUFFERS = 32936;
WebGLRenderingContext.prototype.SAMPLE_COVERAGE = 32928;
WebGLRenderingContext.prototype.SAMPLE_COVERAGE_INVERT = 32939;
WebGLRenderingContext.prototype.SAMPLE_COVERAGE_VALUE = 32938;
WebGLRenderingContext.prototype.SCISSOR_BOX = 3088;
WebGLRenderingContext.prototype.SCISSOR_TEST = 3089;
WebGLRenderingContext.prototype.SHADER_COMPILER = 36346;
WebGLRenderingContext.prototype.SHADER_SOURCE_LENGTH = 35720;
WebGLRenderingContext.prototype.SHADER_TYPE = 35663;
WebGLRenderingContext.prototype.SHADING_LANGUAGE_VERSION = 35724;
WebGLRenderingContext.prototype.SHORT = 5122;
WebGLRenderingContext.prototype.SRC_ALPHA = 770;
WebGLRenderingContext.prototype.SRC_ALPHA_SATURATE = 776;
WebGLRenderingContext.prototype.SRC_COLOR = 768;
WebGLRenderingContext.prototype.STATIC_DRAW = 35044;
WebGLRenderingContext.prototype.STENCIL_ATTACHMENT = 36128;
WebGLRenderingContext.prototype.STENCIL_BACK_FAIL = 34817;
WebGLRenderingContext.prototype.STENCIL_BACK_FUNC = 34816;
WebGLRenderingContext.prototype.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
WebGLRenderingContext.prototype.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
WebGLRenderingContext.prototype.STENCIL_BACK_REF = 36003;
WebGLRenderingContext.prototype.STENCIL_BACK_VALUE_MASK = 36004;
WebGLRenderingContext.prototype.STENCIL_BACK_WRITEMASK = 36005;
WebGLRenderingContext.prototype.STENCIL_BITS = 3415;
WebGLRenderingContext.prototype.STENCIL_BUFFER_BIT = 1024;
WebGLRenderingContext.prototype.STENCIL_CLEAR_VALUE = 2961;
WebGLRenderingContext.prototype.STENCIL_FAIL = 2964;
WebGLRenderingContext.prototype.STENCIL_FUNC = 2962;
WebGLRenderingContext.prototype.STENCIL_INDEX = 6401;
WebGLRenderingContext.prototype.STENCIL_INDEX8 = 36168;
WebGLRenderingContext.prototype.STENCIL_PASS_DEPTH_FAIL = 2965;
WebGLRenderingContext.prototype.STENCIL_PASS_DEPTH_PASS = 2966;
WebGLRenderingContext.prototype.STENCIL_REF = 2967;
WebGLRenderingContext.prototype.STENCIL_TEST = 2960;
WebGLRenderingContext.prototype.STENCIL_VALUE_MASK = 2963;
WebGLRenderingContext.prototype.STENCIL_WRITEMASK = 2968;
WebGLRenderingContext.prototype.STREAM_DRAW = 35040;
WebGLRenderingContext.prototype.SUBPIXEL_BITS = 3408;
WebGLRenderingContext.prototype.TEXTURE = 5890;
WebGLRenderingContext.prototype.TEXTURE0 = 33984;
WebGLRenderingContext.prototype.TEXTURE1 = 33985;
WebGLRenderingContext.prototype.TEXTURE2 = 33986;
WebGLRenderingContext.prototype.TEXTURE3 = 33987;
WebGLRenderingContext.prototype.TEXTURE4 = 33988;
WebGLRenderingContext.prototype.TEXTURE5 = 33989;
WebGLRenderingContext.prototype.TEXTURE6 = 33990;
WebGLRenderingContext.prototype.TEXTURE7 = 33991;
WebGLRenderingContext.prototype.TEXTURE8 = 33992;
WebGLRenderingContext.prototype.TEXTURE9 = 33993;
WebGLRenderingContext.prototype.TEXTURE10 = 33994;
WebGLRenderingContext.prototype.TEXTURE11 = 33995;
WebGLRenderingContext.prototype.TEXTURE12 = 33996;
WebGLRenderingContext.prototype.TEXTURE13 = 33997;
WebGLRenderingContext.prototype.TEXTURE14 = 33998;
WebGLRenderingContext.prototype.TEXTURE15 = 33999;
WebGLRenderingContext.prototype.TEXTURE16 = 34000;
WebGLRenderingContext.prototype.TEXTURE17 = 34001;
WebGLRenderingContext.prototype.TEXTURE18 = 34002;
WebGLRenderingContext.prototype.TEXTURE19 = 34003;
WebGLRenderingContext.prototype.TEXTURE20 = 34004;
WebGLRenderingContext.prototype.TEXTURE21 = 34005;
WebGLRenderingContext.prototype.TEXTURE22 = 34006;
WebGLRenderingContext.prototype.TEXTURE23 = 34007;
WebGLRenderingContext.prototype.TEXTURE24 = 34008;
WebGLRenderingContext.prototype.TEXTURE25 = 34009;
WebGLRenderingContext.prototype.TEXTURE26 = 34010;
WebGLRenderingContext.prototype.TEXTURE27 = 34011;
WebGLRenderingContext.prototype.TEXTURE28 = 34012;
WebGLRenderingContext.prototype.TEXTURE29 = 34013;
WebGLRenderingContext.prototype.TEXTURE30 = 34014;
WebGLRenderingContext.prototype.TEXTURE31 = 34015;
WebGLRenderingContext.prototype.TEXTURE_2D = 3553;
WebGLRenderingContext.prototype.TEXTURE_BINDING_2D = 32873;
WebGLRenderingContext.prototype.TEXTURE_BINDING_CUBE_MAP = 34068;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP = 34067;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
WebGLRenderingContext.prototype.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
WebGLRenderingContext.prototype.TEXTURE_MAG_FILTER = 10240;
WebGLRenderingContext.prototype.TEXTURE_MIN_FILTER = 10241;
WebGLRenderingContext.prototype.TEXTURE_WRAP_S = 10242;
WebGLRenderingContext.prototype.TEXTURE_WRAP_T = 10243;
WebGLRenderingContext.prototype.TRIANGLES = 4;
WebGLRenderingContext.prototype.TRIANGLE_FAN = 6;
WebGLRenderingContext.prototype.TRIANGLE_STRIP = 5;
WebGLRenderingContext.prototype.UNPACK_ALIGNMENT = 3317;
WebGLRenderingContext.prototype.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
WebGLRenderingContext.prototype.UNPACK_FLIP_Y_WEBGL = 37440;
WebGLRenderingContext.prototype.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
WebGLRenderingContext.prototype.UNSIGNED_BYTE = 5121;
WebGLRenderingContext.prototype.UNSIGNED_INT = 5125;
WebGLRenderingContext.prototype.UNSIGNED_SHORT = 5123;
WebGLRenderingContext.prototype.UNSIGNED_SHORT_4_4_4_4 = 32819;
WebGLRenderingContext.prototype.UNSIGNED_SHORT_5_5_5_1 = 32820;
WebGLRenderingContext.prototype.UNSIGNED_SHORT_5_6_5 = 33635;
WebGLRenderingContext.prototype.VALIDATE_STATUS = 35715;
WebGLRenderingContext.prototype.VENDOR = 7936;
WebGLRenderingContext.prototype.VERSION = 7938;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
WebGLRenderingContext.prototype.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
WebGLRenderingContext.prototype.VERTEX_SHADER = 35633;
WebGLRenderingContext.prototype.VIEWPORT = 2978;
WebGLRenderingContext.prototype.ZERO = 0;
