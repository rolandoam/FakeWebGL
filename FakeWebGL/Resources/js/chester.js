'use strict';function f(a) {
  throw a;
}
var j = !0, l = null, m = !1;
function aa(a) {
  return function() {
    return this[a]
  }
}
var o, ba = this;
Math.floor(2147483648 * Math.random()).toString(36);
function p(a, b) {
  var c = a.split("."), d = ba;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var e;c.length && (e = c.shift());) {
    !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
}
function r(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.D = b.prototype;
  a.prototype = new c
}
;function ga(a, b) {
  this.width = a;
  this.height = b
}
ga.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
ga.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
function t(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
t.prototype.BYTES_PER_ELEMENT = 8;
t.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
t.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (t.BYTES_PER_ELEMENT = 8, t.prototype.BYTES_PER_ELEMENT = t.prototype.BYTES_PER_ELEMENT, t.prototype.set = t.prototype.set, t.prototype.toString = t.prototype.toString, p("Float64Array", t));
function A(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
A.prototype.BYTES_PER_ELEMENT = 4;
A.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
A.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (A.BYTES_PER_ELEMENT = 4, A.prototype.BYTES_PER_ELEMENT = A.prototype.BYTES_PER_ELEMENT, A.prototype.set = A.prototype.set, A.prototype.toString = A.prototype.toString, p("Float32Array", A));
function ha(a) {
  var b = new Float32Array(3);
  ia(b, a);
  return b
}
function ja(a, b, c, d) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  return a
}
function ia(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2]
}
function ka(a, b) {
  var c = a[0], d = a[1], e = a[2], c = 1 / Math.sqrt(c * c + d * d + e * e);
  b[0] = a[0] * c;
  b[1] = a[1] * c;
  b[2] = a[2] * c
}
function la(a, b, c) {
  var d = a[0], e = a[1], a = a[2], g = b[0], h = b[1], b = b[2];
  c[0] = e * b - a * h;
  c[1] = a * g - d * b;
  c[2] = d * h - e * g
}
;function ma(a) {
  var b = new Float32Array(4);
  na(b, a);
  return b
}
function na(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  a[3] = b[3]
}
;function oa(a, b, c, d, e, g, h, i, k, n, s, q, w, x, u, y, v) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = h;
  a[6] = i;
  a[7] = k;
  a[8] = n;
  a[9] = s;
  a[10] = q;
  a[11] = w;
  a[12] = x;
  a[13] = u;
  a[14] = y;
  a[15] = v;
  return a
}
function pa(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function qa(a) {
  a[0] = 1;
  a[1] = 0;
  a[2] = 0;
  a[3] = 0;
  a[4] = 0;
  a[5] = 1;
  a[6] = 0;
  a[7] = 0;
  a[8] = 0;
  a[9] = 0;
  a[10] = 1;
  a[11] = 0;
  a[12] = 0;
  a[13] = 0;
  a[14] = 0;
  a[15] = 1;
  return a
}
function ra(a, b, c) {
  var d = a[0], e = a[1], g = a[2], h = a[3], i = a[4], k = a[5], n = a[6], s = a[7], q = a[8], w = a[9], x = a[10], u = a[11], y = a[12], v = a[13], z = a[14], a = a[15], B = b[0], C = b[1], E = b[2], I = b[3], G = b[4], H = b[5], M = b[6], N = b[7], ca = b[8], da = b[9], ea = b[10], fa = b[11], D = b[12], Ra = b[13], Sa = b[14], b = b[15];
  c[0] = d * B + i * C + q * E + y * I;
  c[1] = e * B + k * C + w * E + v * I;
  c[2] = g * B + n * C + x * E + z * I;
  c[3] = h * B + s * C + u * E + a * I;
  c[4] = d * G + i * H + q * M + y * N;
  c[5] = e * G + k * H + w * M + v * N;
  c[6] = g * G + n * H + x * M + z * N;
  c[7] = h * G + s * H + u * M + a * N;
  c[8] = d * ca + i * da + q * ea + y * fa;
  c[9] = e * ca + k * da + w * ea + v * fa;
  c[10] = g * ca + n * da + x * ea + z * fa;
  c[11] = h * ca + s * da + u * ea + a * fa;
  c[12] = d * D + i * Ra + q * Sa + y * b;
  c[13] = e * D + k * Ra + w * Sa + v * b;
  c[14] = g * D + n * Ra + x * Sa + z * b;
  c[15] = h * D + s * Ra + u * Sa + a * b;
  return c
}
function sa(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14];
  return c
}
function ta(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], h = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = h;
  return a
}
function ua(a, b, c, d) {
  return oa(a, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * c, a[5] * c, a[6] * c, a[7] * c, a[8] * d, a[9] * d, a[10] * d, a[11] * d, a[12], a[13], a[14], a[15])
}
function va(a, b, c, d, e) {
  var g = a[0], h = a[1], i = a[2], k = a[3], n = a[4], s = a[5], q = a[6], w = a[7], x = a[8], u = a[9], y = a[10], v = a[11], z = Math.cos(b), B = Math.sin(b), C = 1 - z, b = c * c * C + z, E = c * d * C + e * B, I = c * e * C - d * B, G = c * d * C - e * B, H = d * d * C + z, M = d * e * C + c * B, N = c * e * C + d * B, c = d * e * C - c * B, e = e * e * C + z;
  return oa(a, g * b + n * E + x * I, h * b + s * E + u * I, i * b + q * E + y * I, k * b + w * E + v * I, g * G + n * H + x * M, h * G + s * H + u * M, i * G + q * H + y * M, k * G + w * H + v * M, g * N + n * c + x * e, h * N + s * c + u * e, i * N + q * c + y * e, k * N + w * c + v * e, a[12], a[13], a[14], a[15])
}
new Float64Array(3);
new Float64Array(3);
var wa = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function xa(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
xa.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function ya(a, b) {
  this.x = a;
  this.y = b
}
r(ya, xa);
var za;
HTMLCanvasElement.nb = new ya(0, 0);
function Aa(a) {
  var b = F, c = HTMLCanvasElement.nb, d = Ba ? b.height / za : b.height;
  c.x = 0;
  c.y = 0;
  "undefined" === typeof b.__offset && (b.__offset = $(b).offset());
  a.changedTouches && (a = a.changedTouches[0]);
  c.x = a.pageX - b.__offset.left;
  c.y = d - (a.pageY - b.__offset.top);
  return c
}
var Ca = window;
"undefined" === typeof Ca.requestAnimationFrame && ("undefined" !== typeof Ca.webkitRequestAnimationFrame ? Ca.requestAnimationFrame = Ca.webkitRequestAnimationFrame : "undefined" !== typeof mozRequestAnimationFrame ? Ca.requestAnimationFrame = Ca.mozRequestAnimationFrame : "undefined" !== typeof msRequestAnimationFrame ? Ca.requestAnimationFrame = Ca.msRequestAnimationFrame : "undefined" !== typeof oRequestAnimationFrame ? Ca.requestAnimationFrame = Ca.oRequestAnimationFrame : (console.log("using setTimeout as requestAnimationFrame"), 
Ca.requestAnimationFrame = function(a) {
  window.setTimeout(a, 1E3 / 60)
}));
function Da(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var Ea = m;
"undefined" !== typeof runScript && (Ea = j, ra = _mat4mul, sa = _mat4mulvec3, ta = _mat4translate, va = _mat4rotate, ua = _mat4scale);
var Fa = {useGoogleAnalytics:m, projection:"3d", webglMode:j, usesOffscreenBuffer:m, basePath:""}, Ga = "3d", J = j, Ha = "", K = l, Ia = m, Ja = {}, Ka = l, La = l, Ma = l, F = l, Na = m, Ba = m, L = {}, Oa = {}, Pa = {}, Qa = {}, Ta = Date.now(), Ua = 0, Va = {Tb:0, Wb:1, Xb:2, Ub:3, Vb:4}, Wa = l, O = [];
function Xa(a) {
  var b = Ja[a], c = K;
  if(a != Ka) {
    Ka = a;
    c.validateProgram(b);
    c.useProgram(b);
    for(var d in b.a) {
      c.enableVertexAttribArray(b.a[d])
    }
  }
  return b
}
function Ya(a, b) {
  var c = K, d = Za(a, "frag"), e = Za(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  if(c.getShaderParameter(g, c.COMPILE_STATUS)) {
    d = c.createShader(c.VERTEX_SHADER);
    c.shaderSource(d, e);
    c.compileShader(d);
    if(c.getShaderParameter(d, c.COMPILE_STATUS)) {
      c = K;
      e = c.createProgram();
      c.attachShader(e, g);
      c.attachShader(e, d);
      c.linkProgram(e);
      c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
      Ja[a] = e;
      b && b(e)
    }else {
      console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
    }
  }else {
    console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
  }
}
function Za(a, b) {
  var c = "", d = new XMLHttpRequest;
  d.open("GET", Ha + "shaders/" + a + "." + b, m);
  d.onreadystatechange = function() {
    d.readyState == 4 && d.status == 200 ? c = d.responseText : d.readyState == 4 && console.log("error getting the shader data")
  };
  d.send();
  return c
}
function P(a, b, c, d) {
  b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url, qa:b.qa || m} : {url:b, name:c || b};
  L[a] || (L[a] = {});
  c = RegExp("@" + za + "x\\..+$");
  if(Ba && !b.qa && b.url.match(c) === l) {
    if((c = b.url.match(/(\..+$)/)) && Ba) {
      b.url = b.url.replace(/(\..+$)/, "@" + za + "x$1")
    }
  }
  var c = L[a], e = b.name;
  if(c[e]) {
    if(c[e].status == "loading") {
      d && c[e].ea.push(d)
    }else {
      if(c[e].status == "loaded") {
        d && d(c[e].data)
      }else {
        if(c[e].status == "try") {
          c[e].status = "loading";
          if(Pa[a]) {
            Pa[a](a, b)
          }else {
            Pa["default"](a, b)
          }
          d && c[e].ea.push(d)
        }
      }
    }
  }else {
    c[e] = {data:l, name:e, status:"try", ea:[]};
    d && c[e].ea.push(d);
    P(a, b)
  }
}
function $a(a, b) {
  var c = Qa[a], d, e;
  if(!c) {
    Qa[a] = [];
    c = Qa[a]
  }
  b && c.push(b);
  var g = j;
  if(a == "all") {
    for(var h in L) {
      d = L[h];
      for(e in d) {
        if(d[e].status != "loaded") {
          g = m;
          break
        }
      }
      if(!g) {
        break
      }
    }
  }else {
    d = L[a];
    for(e in d) {
      if(d[e].status != "loaded") {
        g = m;
        break
      }
    }
  }
  if(g) {
    for(;d = c.shift();) {
      d()
    }
  }
}
function ab(a, b) {
  return b ? L[a][b].data : l
}
function bb(a, b) {
  return b ? b in L[a] : m
}
function cb(a) {
  var b = K, c = j;
  try {
    var d = 0;
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, a.M);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
    d = b.getError();
    if(d !== 0) {
      console.log("gl error " + d);
      c = m
    }
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.bindTexture(b.TEXTURE_2D, l)
  }catch(e) {
    console.log("got some error: " + e);
    c = m
  }
  return c
}
function db(a, b, c) {
  L[c][a.name].data = b;
  return j
}
function eb(a, b) {
  if(J && !b.M) {
    b.M = K.createTexture()
  }
  L.texture[a.name].data = b;
  return J ? cb(b) : j
}
function fb(a, b) {
  var c = new Image, d = b.url, e = b.name, g = RegExp("@" + za + "x\\..+$");
  c.src = "";
  c.addEventListener("load", function() {
    var h = L.texture[e];
    if(Oa[a](b, c)) {
      h.status = "loaded";
      h.Bb = d.match(g) && Ba;
      for(var i;i = h.ea.shift();) {
        i(h.data)
      }
      $a(a);
      $a("all")
    }else {
      h.status = "try";
      P(a, b)
    }
  }, m);
  c.addEventListener("error", function(a) {
    if(a.type === "error" && Ba && d.match(g)) {
      a = L.texture[e];
      b.url = d.replace("@" + za + "x", "");
      b.qa = j;
      a.status = "try";
      P("texture", b)
    }
  }, j);
  if(d.match(/^http(s)?:/)) {
    c.crossOrigin = "anonymous";
    c.src = d
  }else {
    c.src = d.match(/^data:/) ? d : Ha + d
  }
}
function gb(a, b) {
  var c = b.url, d = c, e = b.name, g = RegExp("@" + za + "x\\..+$");
  c.match(/^http(s)?:\/\//) || (d = Ha + c);
  var h = new XMLHttpRequest;
  h.open("GET", d);
  h.withCredentials = j;
  h.onreadystatechange = function() {
    var d = L[a][e];
    if(h.readyState == 4 && h.status == 200) {
      if((Oa[a] || Oa["default"])(b, h.response, a)) {
        d.status = "loaded";
        for(var k;k = d.ea.shift();) {
          k(d.data)
        }
        $a(a);
        $a("all")
      }else {
        d.status = "try";
        P(a, b)
      }
    }else {
      if(h.readyState == 4) {
        if(h.status == 404 && Ba && c.match(g)) {
          b.url = c.replace("@" + za + "x", "");
          b.qa = j;
          d.status = "try";
          P(a, b)
        }else {
          console.log("Error loading asset " + c)
        }
      }
    }
  };
  h.send()
}
function hb() {
  var a = K;
  if(J) {
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
  }else {
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.fillRect(0, 0, a.za, a.ka)
  }
  if(Ma) {
    Ma.F();
    if(!Ma.da) {
      Ma.onEnterScene()
    }
  }
  a = Date.now();
  Ua = a - Ta;
  Ta = a
}
var ib = new Float32Array(3);
function jb(a) {
  var a = Aa(a), b = 0, c = O.length;
  for(ib.set([a.x, a.y, 0]);b < c;b++) {
    O[b](ib, 0)
  }
}
function kb(a) {
  var a = Aa(a), b = 0, c = O.length;
  for(ib.set([a.x, a.y, 0]);b < c;b++) {
    O[b](ib, 1)
  }
}
function lb(a) {
  var a = Aa(a), b = 0, c = O.length;
  for(ib.set([a.x, a.y, 0]);b < c;b++) {
    O[b](ib, 2)
  }
}
function mb(a) {
  var a = Aa(a), b = 0, c = O.length;
  for(ib.set([a.x, a.y, 0]);b < c;b++) {
    O[b](ib, 3)
  }
}
function nb(a) {
  var a = Aa(a), b = 0, c = O.length;
  for(ib.set([a.x, a.y, 0]);b < c;b++) {
    O[b](ib, 4)
  }
}
function ob() {
  if(!Ia) {
    requestAnimationFrame(ob, F);
    Wa && Wa.begin();
    hb();
    Q.Ob(Ua);
    Wa && Wa.end()
  }
}
function R() {
  return Math.random() * 2 - 1
}
p("chesterGL.version", "0.3");
p("chesterGL.settings", Fa);
p("chesterGL.mouseEvents", Va);
p("chesterGL.onFakeWebGL", Ea);
Va.UP = 2;
Va.DOWN = 0;
Va.MOVE = 1;
Va.ENTER = 3;
Va.LEAVE = 4;
p("chesterGL.viewportSize", function() {
  return new ga(K.za, K.ka)
});
p("chesterGL.setup", function(a) {
  a = Ea ? new ChesterCanvas(innerWidth, innerHeight) : document.getElementById(a);
  Ga = Fa.projection;
  J = Fa.webglMode;
  Ha = Fa.basePath;
  var b = 0, c = 0;
  try {
    if(window.devicePixelRatio && window.devicePixelRatio > 1) {
      var d = window.devicePixelRatio;
      console.log("using HighDPI resolution (devicePixelRatio: " + d + ")");
      b = a.width;
      c = a.height;
      a.style.width = a.width + "px";
      a.style.height = a.height + "px";
      a.width = a.clientWidth * d;
      a.height = a.clientHeight * d;
      Ba = j;
      za = window.devicePixelRatio
    }else {
      b = a.width;
      c = a.height
    }
    F = a;
    if(J) {
      if((K = a.getContext("experimental-webgl", {alpha:m, antialias:m, preserveDrawingBuffer:j})) && typeof WebGLDebugUtils !== "undefined") {
        console.log("installing debug context");
        K = WebGLDebugUtils.makeDebugContext(K, Da)
      }
    }
  }catch(e) {
    console.log("ERROR: " + e)
  }
  if(!K) {
    (K = a.getContext("2d")) || f("Error initializing graphic context!");
    J = Fa.webglMode = m
  }
  K.za = b;
  K.ka = c;
  if(Ea) {
    _touchBeganListeners.push(jb);
    _touchMovedListeners.push(kb);
    _touchEndedListeners.push(lb)
  }else {
    if(typeof navigator !== "undefined" && navigator.platform.match(/iPhone|iPad/)) {
      document.addEventListener("touchstart", jb, m);
      document.addEventListener("touchmove", function(a) {
        kb(a);
        a.preventDefault()
      }, m);
      document.addEventListener("touchend", lb, m)
    }else {
      $(F).mousedown(jb);
      $(F).mousemove(kb);
      $(F).mouseup(lb);
      $(F).mouseenter(mb);
      $(F).mouseleave(nb)
    }
  }
  if(J) {
    var g = K;
    Ya("default", function(a) {
      a.C = g.getUniformLocation(a, "uMVPMatrix");
      a.a = {vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:g.getAttribLocation(a, "aVertexColor")};
      a.mvpMatrixUniform = a.C;
      a.attribs = a.a
    });
    Ya("texture", function(a) {
      a.C = g.getUniformLocation(a, "uMVPMatrix");
      a.Na = g.getUniformLocation(a, "uSampler");
      a.a = {vertexColorAttribute:g.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:g.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition")};
      a.mvpMatrixUniform = a.C;
      a.samplerUniform = a.Na;
      a.attribs = a.a
    })
  }
  if(!Ea) {
    var d = window.location.search.substring(1).split("&"), h;
    for(h in d) {
      a = d[h].split("=");
      if(a[0] == "_cdbg" && a[1] == "1") {
        Na = j;
        console.log("debug mode on")
      }
    }
  }
  Oa.texture = eb;
  Oa["default"] = db;
  Pa.texture = fb;
  Pa["default"] = gb;
  if(typeof Stats !== "undefined") {
    console.log("chesterGL: adding stats");
    Wa = new Stats;
    Wa.setMode(1);
    if(!Ea) {
      Wa.domElement.style.position = "absolute";
      Wa.domElement.style.left = "0px";
      Wa.domElement.style.top = "0px";
      document.body.appendChild(Wa.domElement)
    }
    p("chesterGL.stats", Wa)
  }
});
p("chesterGL.canvasResized", function() {
  var a = F;
  K.za = a.width;
  K.ka = a.height
});
p("chesterGL.initShader", Ya);
p("chesterGL.registerAssetHandler", function(a, b) {
  Oa[a] = b
});
p("chesterGL.loadAsset", P);
p("chesterGL.assetsLoaded", $a);
p("chesterGL.getAsset", ab);
p("chesterGL.hasAsset", bb);
p("chesterGL.setupPerspective", function() {
  var a = K;
  if(J) {
    a.clearColor(0, 0, 0, 1);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.za, c = a.ka;
    a.viewport(0, 0, F.width, F.height);
    La = new Float32Array(16);
    if(Ga == "2d") {
      console.log("setting up 2d projection (" + b + "," + c + ")");
      oa(La, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
    }else {
      if(Ga == "3d") {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = new Float32Array(16), e = b / c, g = 60 * Math.PI / 180 / 2, h = Math.sin(g);
        if(!(h == 0 || e == 0)) {
          g = Math.cos(g) / h;
          a = oa(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0)
        }
        d = [b / 2, c / 2, d];
        e = [b / 2, c / 2, 0];
        b = new Float32Array(16);
        c = wa[0];
        c[0] = e[0] - d[0];
        c[1] = e[1] - d[1];
        c[2] = e[2] - d[2];
        ka(c, c);
        c[3] = 0;
        e = wa[1];
        la(c, [0, 1, 0], e);
        ka(e, e);
        e[3] = 0;
        g = wa[2];
        la(e, c, g);
        ka(g, g);
        g[3] = 0;
        c[0] = -c[0];
        c[1] = -c[1];
        c[2] = -c[2];
        pa(b, 0, e);
        pa(b, 1, g);
        pa(b, 2, c);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[15] = 1;
        ta(b, -d[0], -d[1], -d[2]);
        ra(a, b, La)
      }else {
        f("Invalid projection: " + Ga)
      }
    }
  }
});
p("chesterGL.setRunningScene", function(a) {
  if(Ma && Ma != a) {
    Ma.onExitScene()
  }
  a.type == S.SCENE && (Ma = a)
});
p("chesterGL.drawScene", hb);
p("chesterGL.run", ob);
p("chesterGL.togglePause", function() {
  if(Ia) {
    Ia = m;
    Ta = Date.now();
    ob()
  }else {
    Ia = j
  }
});
p("chesterGL.isPaused", function() {
  return Ia
});
p("chesterGL.setPause", function(a) {
  if(Ia && !a) {
    Ia = a;
    Ta = Date.now();
    ob()
  }else {
    Ia = a
  }
});
p("chesterGL.getCurrentContext", function() {
  return K
});
p("chesterGL.addMouseHandler", function(a) {
  O.indexOf(a) == -1 && O.push(a)
});
p("chesterGL.removeMouseHandler", function(a) {
  a = O.indexOf(a);
  a >= 0 && O.splice(a, 1)
});
function T(a, b, c) {
  this.type = b || S.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.i = U.DEFAULT;
  this.ha(0, 0);
  this.type == S.STANDALONE && this.Oa([1, 1, 1, 1]);
  a && ("string" === typeof a && bb("texture", a) ? this.Z(a) : this.W(a));
  this.X(0, 0, 0);
  this.ga(0.5, 0.5);
  if(J && (!c || c.type != S.BLOCKGROUP)) {
    this.o = K.createBuffer(), this.m = new Float32Array(36)
  }
  this.d = new Float32Array(16);
  this.u = new Float32Array(16);
  this.d = qa(new Float32Array(16));
  this.Aa = [];
  this.N = []
}
var U = {DEFAULT:0, TEXTURE:1}, pb = ["default", "texture"], S = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, qb = Math.PI / 180, rb = 180 / Math.PI, sb = 1 * qb, tb = new Float32Array(4);
tb[0] = 0;
tb[1] = 0;
tb[2] = 1;
tb[3] = 1;
var ub = new ga(0, 0);
o = T.prototype;
o.title = "";
o.ab = m;
o.d = l;
o.u = l;
o.visible = j;
o.da = m;
o.f = m;
o.G = m;
o.H = m;
o.la = 0;
o.o = l;
o.m = l;
o.position = l;
o.n = l;
o.g = l;
o.color = l;
o.c = l;
o.rotation = 0;
o.V = 1;
o.ya = 1;
o.update = l;
o.frame = l;
o.parent = l;
o.children = l;
o.Aa = l;
o.N = l;
o.q = m;
o.Gb = function() {
  this.da = j;
  for(var a in this.children) {
    this.children[a].onEnterScene()
  }
};
o.Hb = function() {
  this.da = m;
  for(var a in this.children) {
    this.children[a].onExitScene()
  }
};
o.W = function(a) {
  if("string" === typeof a) {
    var b = vb.ra(a);
    b || f("Invalid frame name: " + a);
    a = b.frame;
    this.Z(b.c)
  }
  this.frame ? na(this.frame, a) : this.frame = ma(a);
  Ba && this.c && L.texture[this.c].Bb ? this.ha(a[2] / za, a[3] / za) : this.ha(a[2], a[3]);
  this.H = j
};
o.ra = aa("frame");
o.ha = function(a, b) {
  this.g = new ga(a, b);
  this.H = j
};
o.wb = aa("g");
o.Qa = function(a, b) {
  this.V = a;
  this.ya = 2 == arguments.length ? b : this.V;
  this.f = j
};
o.zb = aa("V");
o.Oa = function(a) {
  this.color ? na(this.color, a) : this.color = ma(a);
  this.G = j
};
o.vb = aa("color");
o.X = function(a, b, c) {
  if(this.position) {
    1 == arguments.length ? ia(this.position, a) : ja(this.position, a, b, c)
  }else {
    var d;
    1 == arguments.length ? d = ha(a) : (d = new Float32Array(3), ja(d, a, b, c));
    this.position = d
  }
  this.f = j
};
o.ga = function(a, b) {
  this.n = new ya(a, b)
};
o.tb = aa("n");
o.xb = aa("position");
o.sb = function() {
  for(var a = this.parent, b = ha(this.position);a;) {
    sa(a.d, b, b), a = a.parent
  }
  return b
};
var V = [];
o = T.prototype;
o.Pb = function(a, b) {
  b = b || a;
  var c = this.d, d = c[0], e = c[1], g = c[2], h = c[3], i = c[4], k = c[5], n = c[6], s = c[7], q = c[8], w = c[9], x = c[10], u = c[11], y = c[12], v = c[13], z = c[14], c = c[15], B = d * k - e * i, C = d * n - g * i, E = d * s - h * i, I = e * n - g * k, G = e * s - h * k, H = g * s - h * n, M = q * v - w * y, N = q * z - x * y, ca = q * c - u * y, da = w * z - x * v, ea = w * c - u * v, fa = x * c - u * z, D = B * fa - C * ea + E * da + I * ca - G * N + H * M;
  0 != D && (D = 1 / D, V[0] = (k * fa - n * ea + s * da) * D, V[1] = (-e * fa + g * ea - h * da) * D, V[2] = (v * H - z * G + c * I) * D, V[3] = (-w * H + x * G - u * I) * D, V[4] = (-i * fa + n * ca - s * N) * D, V[5] = (d * fa - g * ca + h * N) * D, V[6] = (-y * H + z * E - c * C) * D, V[7] = (q * H - x * E + u * C) * D, V[8] = (i * ea - k * ca + s * M) * D, V[9] = (-d * ea + e * ca - h * M) * D, V[10] = (y * G - v * E + c * B) * D, V[11] = (-q * G + w * E - u * B) * D, V[12] = (-i * da + k * 
  N - n * M) * D, V[13] = (d * da - e * N + g * M) * D, V[14] = (-y * I + v * C - z * B) * D, V[15] = (q * I - w * C + x * B) * D);
  sa(V, a, b);
  b[0] += this.g.width * this.n.x;
  b[1] += this.g.height * this.n.y;
  return b
};
o.ub = function() {
  var a = this.position, b = this.frame[2], c = this.frame[3];
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
o.Z = function(a) {
  this.c = a;
  this.i = U.TEXTURE;
  var b = this;
  P("texture", a, l, function(a) {
    b.frame || b.W([0, 0, a.width, a.height])
  })
};
o.Ab = aa("c");
o.Pa = function(a) {
  this.rotation = a;
  this.f = j
};
o.yb = aa("rotation");
o.jb = function(a) {
  this.update = a
};
o.Nb = function(a) {
  this.visible = a
};
o.Eb = aa("visible");
o.v = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent && f("can't add a block twice!");
    this.q ? this.Aa.push(c) : (this.children.push(c), c.parent = this);
    if(this.da) {
      c.onEnterScene()
    }
  }
};
o.removeChild = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.q) {
    this.N.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = l)
  }
  if(this.da) {
    a.onExitScene()
  }
};
o.xa = function() {
  if(this.q) {
    this.N.push("all")
  }else {
    for(var a = 0, a = 0;a < this.children.length;a++) {
      this.children[a].parent = l
    }
    this.children.length = 0
  }
};
var wb = [new Float32Array(3), new Float32Array(3), new Float32Array(3), new Float32Array(3)];
T.prototype.transform = function() {
  var a = K, b, c, d = this.parent && this.parent.type == S.BLOCKGROUP, e = this.g ? (0.5 - this.n.x) * this.g.width : 0, g = this.g ? (0.5 - this.n.y) * this.g.height : 0;
  if(this.f || this.parent && this.parent.f) {
    this.f = j, b = this.position[0], c = this.position[1], qa(this.d), ta(this.d, b, c, this.position[2]), va(this.d, -1 * this.rotation, 0, 0, 1), ua(this.d, this.V, this.ya, 1), (b = this.parent ? this.parent.d : l) && !d && ra(b, this.d, this.d)
  }
  if(!(this.type == S.BLOCKGROUP || this.type == S.PRIMITIVE)) {
    if(b = this.m, J) {
      !d && (this.H || this.G) && a.bindBuffer(a.ARRAY_BUFFER, this.o);
      if(this.H || this.f) {
        var h = 0.5 * this.g.width, i = 0.5 * this.g.height, k = this.position[2];
        c = 36 * this.la;
        if(d) {
          var n = ja(wb[0], h + e, i + g, k), s = ja(wb[1], -h + e, i + g, k), q = ja(wb[2], h + e, -i + g, k), e = ja(wb[3], -h + e, -i + g, k);
          sa(this.d, n, n);
          sa(this.d, s, s);
          sa(this.d, e, e);
          sa(this.d, q, q);
          b[c] = e[0];
          b[c + 1] = e[1];
          b[c + 2] = k;
          b[c + 9] = s[0];
          b[c + 1 + 9] = s[1];
          b[c + 2 + 9] = k;
          b[c + 18] = q[0];
          b[c + 1 + 18] = q[1];
          b[c + 2 + 18] = k;
          b[c + 27] = n[0];
          b[c + 1 + 27] = n[1]
        }else {
          b[c] = -h + e, b[c + 1] = -i + g, b[c + 2] = k, b[c + 9] = -h + e, b[c + 1 + 9] = i + g, b[c + 2 + 9] = k, b[c + 18] = h + e, b[c + 1 + 18] = -i + g, b[c + 2 + 18] = k, b[c + 27] = h + e, b[c + 1 + 27] = i + g
        }
        b[c + 2 + 27] = k;
        this.i == U.TEXTURE && (e = ab("texture", this.c), k = e.width, n = e.height, e = this.frame[0] / k, g = this.frame[1] / n, k = this.frame[2] / k, n = this.frame[3] / n, c += 3, b[c] = e, b[c + 1] = g + n, b[c + 9] = e, b[c + 1 + 9] = g, b[c + 18] = e + k, b[c + 1 + 18] = g + n, b[c + 27] = e + k, b[c + 1 + 27] = g)
      }
      if(this.G) {
        c = 5 + 36 * this.la;
        e = this.color;
        for(g = 0;4 > g;g++) {
          b[c + 9 * g] = e[0], b[c + 1 + 9 * g] = e[1], b[c + 2 + 9 * g] = e[2], b[c + 3 + 9 * g] = e[3]
        }
      }
      J && (!d && (this.H || this.G)) && a.bufferData(a.ARRAY_BUFFER, this.m, a.STATIC_DRAW)
    }
  }
};
T.prototype.F = function() {
  this.q = j;
  if(Na && !this.ab) {
    if(0 < this.g.width) {
      var a = new W(1, 1);
      this.v(a);
      a.Db = this.parent.type == S.BLOCKGROUP ? 1 : 0;
      a.jb(function() {
        var a = this.parent.g, b = a.width / 2, a = a.height / 2, b = [[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]];
        this.Db ? this.na(b, [1, 0, 0, 1], j) : this.na(b, [1, 1, 1, 1], j)
      })
    }
    this.ab = j
  }
  this.update && this.update(Ua);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != S.BLOCKGROUP) && this.U();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].F()
    }
    for(this.q = this.H = this.G = this.f = m;a = this.Aa.shift();) {
      this.v(a)
    }
    for(;a = this.N.shift();) {
      "all" === a ? this.xa() : this.removeChild(a)
    }
  }else {
    this.q = m
  }
};
T.prototype.U = function() {
  if(this.type != S.SCENE) {
    var a, b;
    if(J) {
      a = K;
      var c = Xa(pb[this.i]);
      a.bindBuffer(a.ARRAY_BUFFER, this.o);
      a.vertexAttribPointer(c.a.vertexPositionAttribute, 3, a.FLOAT, m, 36, 0);
      a.vertexAttribPointer(c.a.vertexColorAttribute, 4, a.FLOAT, m, 36, 20);
      this.i != U.DEFAULT && this.i == U.TEXTURE && (b = ab("texture", this.c), a.vertexAttribPointer(c.a.textureCoordAttribute, 2, a.FLOAT, m, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.M), a.uniform1i(c.Na, 0));
      (this.f || this.parent && this.parent.f) && ra(La, this.d, this.u);
      a.uniformMatrix4fv(c.C, m, this.u);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      a = K;
      b = this.d;
      var d = c = 0;
      this.g && (c = this.g.width, d = this.g.height);
      a.globalAlpha = this.color[3];
      a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.n.x) * c, a.ka - (b[13] + (0.5 - this.n.y) * d));
      if(1 == this.i) {
        b = ab("texture", this.c);
        var e = this.frame;
        a.drawImage(b, e[0], b.height - (e[1] + d), e[2], e[3], -c / 2, -d / 2, c, d)
      }else {
        b = [];
        for(e = 0;4 > e;e++) {
          b[e] = 255 * this.color[e]
        }
        a.fillStyle = "rgba(" + b.join(",") + ")";
        a.fillRect(-c / 2, -d / 2, c, d)
      }
    }
  }
};
p("chesterGL.Block", T);
p("chesterGL.Block.FullFrame", tb);
p("chesterGL.Block.SizeZero", ub);
p("chesterGL.Block.TYPE", S);
p("chesterGL.Block.PROGRAM", U);
p("chesterGL.Block.PROGRAM_NAME", pb);
p("chesterGL.Block.DEG_TO_RAD", qb);
p("chesterGL.Block.RAD_TO_DEG", rb);
p("chesterGL.Block.ONE_DEG", sb);
T.prototype.title = T.prototype.title;
T.prototype.onEnterScene = T.prototype.Gb;
T.prototype.onExitScene = T.prototype.Hb;
T.prototype.children = T.prototype.children;
T.prototype.addChild = T.prototype.v;
T.prototype.removeChild = T.prototype.removeChild;
T.prototype.removeAllChildren = T.prototype.xa;
T.prototype.getBoundingBox = T.prototype.ub;
T.prototype.setPosition = T.prototype.X;
T.prototype.getPosition = T.prototype.xb;
T.prototype.toLocal = T.prototype.Pb;
T.prototype.setAnchorPoint = T.prototype.ga;
T.prototype.getAnchorPoint = T.prototype.tb;
T.prototype.getAbsolutePosition = T.prototype.sb;
T.prototype.setRotation = T.prototype.Pa;
T.prototype.getRotation = T.prototype.yb;
T.prototype.setColor = T.prototype.Oa;
T.prototype.getColor = T.prototype.vb;
T.prototype.setFrame = T.prototype.W;
T.prototype.getFrame = T.prototype.ra;
T.prototype.setContentSize = T.prototype.ha;
T.prototype.getContentSize = T.prototype.wb;
T.prototype.setTexture = T.prototype.Z;
T.prototype.getTexture = T.prototype.Ab;
T.prototype.setScale = T.prototype.Qa;
T.prototype.getScale = T.prototype.zb;
T.prototype.setUpdate = T.prototype.jb;
T.prototype.setVisible = T.prototype.Nb;
T.prototype.isVisible = T.prototype.Eb;
function X(a, b) {
  J || f("BlockGroup only works on WebGL mode");
  T.call(this, l, S.BLOCKGROUP);
  a ? (this.c = a, this.i = U.TEXTURE) : this.i = U.DEFAULT;
  this.S = b || 10;
  xb(this)
}
r(X, T);
o = X.prototype;
o.S = 0;
o.ta = m;
o.sa = l;
o.s = l;
function xb(a, b, c) {
  var d = K;
  a.o || (a.o = d.createBuffer());
  a.sa || (a.sa = d.createBuffer());
  var d = new Float32Array(36 * a.S), e = new Uint16Array(6 * a.S);
  b && d.set(b);
  c && e.set(c);
  a.m = d;
  a.s = e
}
o.Ca = function(a) {
  a = new T(a, S.STANDALONE, this);
  this.c && a.Z(this.c);
  return a
};
o.v = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
    this.children.length >= this.S && (this.S *= 2, xb(this, this.m, this.s));
    this.c ? this.c != c.c && f("Invalid child: only can add child with the same texture") : this.c = c.c;
    this.children.push(c);
    c.la = this.children.length - 1;
    c.m = this.m;
    this.ta = j
  }
};
o.removeChild = function(a) {
  a.parent != this && f("Invalid child");
  if(this.q) {
    this.N.push(a)
  }else {
    var b = this.children.indexOf(a);
    if(0 < b) {
      a = this.children.splice(b, 1);
      for(a[0].parent = l;b < this.Yb;b++) {
        a = this.children[b], a.la = b, a.f = j, a.G = j
      }
    }
    this.ta = j
  }
};
o.F = function() {
  this.q = j;
  this.update && this.update(Ua);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].F()
    }
    a = K;
    a.bindBuffer(a.ARRAY_BUFFER, this.o);
    a.bufferData(a.ARRAY_BUFFER, this.m, a.STATIC_DRAW);
    if(this.ta) {
      var d, a = (this.s[-1] || -1) + 1;
      d = d || Math.max(this.children.length, 1);
      for(b = 0;b < d;b++) {
        c = 6 * b, this.s[c + 0] = a, this.s[c + 1] = a + 1, this.s[c + 2] = a + 2, this.s[c + 3] = a + 2, this.s[c + 4] = a + 1, this.s[c + 5] = a + 3, a += 4
      }
      d = K;
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.sa);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.s, d.STATIC_DRAW);
      this.ta = m
    }
    this.U();
    for(this.q = this.H = this.G = this.f = m;d = this.N.shift();) {
      "all" === d ? this.xa() : this.removeChild(d)
    }
  }else {
    this.q = m
  }
};
o.U = function(a) {
  var b = K, c = Xa(pb[this.i]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.o);
  b.vertexAttribPointer(c.a.vertexPositionAttribute, 3, b.FLOAT, m, 36, 0);
  if(this.i != U.DEFAULT && this.i == U.TEXTURE) {
    var d = ab("texture", this.c);
    b.vertexAttribPointer(c.a.textureCoordAttribute, 2, b.FLOAT, m, 36, 12);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, d.M);
    b.uniform1i(c.Na, 0)
  }
  b.vertexAttribPointer(c.a.vertexColorAttribute, 4, b.FLOAT, m, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.sa);
  (this.f || this.parent && this.parent.f) && ra(La, this.d, this.u);
  b.uniformMatrix4fv(c.C, m, this.u);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
p("chesterGL.BlockGroup", X);
X.prototype.createBlock = X.prototype.Ca;
X.prototype.addChild = X.prototype.v;
X.prototype.removeChild = X.prototype.removeChild;
function yb(a, b) {
  X.call(this, a + ".png", Math.max(100, b.length));
  this.Oa([0, 0, 0, 0]);
  var c, d = ab("txt", a + ".fnt").split(/\n|\r/), e, g, h;
  this.$ = {};
  this.I = {};
  for(e in d) {
    if(c = d[e].match(/chars count=(\d+)/), !c) {
      if(c = d[e].split(/\s+/), "common" === c[0]) {
        var i = {};
        for(g = 1;g < c.length;g++) {
          h = c[g].split("="), 2 == h.length && (i[h[0]] = parseInt(h[1], 10))
        }
        this.Ib = i
      }else {
        if("char" === c[0]) {
          i = {};
          for(g = 1;g < c.length;g++) {
            h = c[g].split("="), 2 == h.length && (i[h[0]] = parseInt(h[1], 10))
          }
          i.id ? this.$[i.id] = i : console.log("BMFontLabel: invalid char at line " + (e + 1))
        }else {
          if("kerning" === c[0]) {
            i = {};
            for(g = 1;g < c.length;g++) {
              h = c[g].split("="), 2 == h.length && (i[h[0]] = parseInt(h[1], 10))
            }
            this.I[i.first] = this.I[i.first] || {};
            this.I[i.first][i.second] = i.amount
          }
        }
      }
    }
  }
  this.Y(b)
}
r(yb, X);
yb.prototype.ga = function(a, b) {
  yb.D.ga.call(this, a, b);
  this.Y(this.text)
};
yb.prototype.Y = function(a) {
  var b, c;
  if(!(a === l || void 0 === a)) {
    this.text = a;
    this.xa();
    b = a;
    var d = 0, e = 0;
    c = 0;
    var g, h = 0;
    for(g = 0;g < b.length;g++) {
      var i = b.charCodeAt(g);
      if(10 == i || 13 == i) {
        d = Math.max(d, e), e = 0, c++
      }else {
        if(this.$[i]) {
          var k = this.$[i], n = 0;
          0 < h && this.I[h] && (n = this.I[h][i] || 0);
          e += k.xadvance + n;
          h = i
        }
      }
    }
    b = d = Math.max(d, e);
    d = this.Ib.lineHeight;
    n = 0;
    g = -b * this.n.x;
    h = -(c * d * this.n.y);
    a = a.split(/\n|\r/).reverse().join("\n");
    for(e = 0;e < a.length;e++) {
      if(i = a.charCodeAt(e), 10 == i || 13 == i) {
        g = -b * this.n.x, h += d
      }else {
        if(this.$[i]) {
          k = 0;
          0 < n && this.I[n] && (k = this.I[n][i] || 0);
          var n = this.$[i], s = this.Ca([n.x, n.y, n.width, n.height]);
          s.X(~~(g + n.xoffset + 0.5 * n.width + k), ~~(h + (d - n.yoffset) - 0.5 * n.height), 0);
          g += n.xadvance + k;
          this.v(s)
        }else {
          f("Invalid charcode " + i + " for text " + a)
        }
        n = i
      }
    }
    this.ha(b, c * d)
  }
};
p("chesterGL.BMFontLabelBlock", yb);
p("chesterGL.BMFontLabelBlock.loadFont", function(a) {
  P("texture", a + ".png");
  P("txt", a + ".fnt")
});
yb.prototype.setText = yb.prototype.Y;
yb.prototype.setAnchorPoint = yb.prototype.ga;
function zb(a) {
  T.call(this, l, 4);
  var b = this;
  P("texture", a.texture, l, function() {
    b.gb(a)
  })
}
r(zb, T);
var Ab = m;
function Bb() {
  Ya("particles", function(a) {
    var b = K;
    a.C = b.getUniformLocation(a, "uMVPMatrix");
    a.Qb = b.getUniformLocation(a, "uSampler");
    a.Rb = b.getUniformLocation(a, "u_time");
    a.a = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.Ya = m;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  Ab = j
}
o = zb.prototype;
o.p = j;
o.hb = l;
o.bb = 0;
o.Q = 0;
o.K = 0;
o.J = 0;
o.duration = 0;
o.Ha = 0;
o.fb = 0;
o.ia = l;
o.ja = l;
o.wa = l;
o.aa = l;
o.ba = l;
o.ua = l;
o.va = l;
o.lb = 0;
o.mb = 0;
o.cb = 0;
o.eb = 0;
o.Ma = m;
o.elapsedTime = 0;
o.Ba = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
o.gb = function(a) {
  this.i = -1;
  Ab || Bb();
  this.hb = a.texture;
  this.J = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.Ha = 1E3 * parseFloat(a.lifetime);
  this.fb = 1E3 * parseFloat(a.lifetimeVariance);
  this.ia = ma(a.startColor);
  this.ja = ma(a.startColorVariance);
  this.aa = ma(a.endColor);
  this.ba = ma(a.endColorVariance);
  this.wa = ha(a.positionVariance);
  this.ua = ha(a.speed);
  this.va = ha(a.speedVariance);
  this.lb = parseFloat(a.startSize);
  this.mb = parseFloat(a.startSizeVariance);
  this.cb = parseFloat(a.endSize);
  this.eb = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.Ba = a.blendOptions.slice(0);
  this.p = j;
  this.o || (this.o = K.createBuffer());
  this.m = new Float32Array(18 * this.J);
  for(var a = Xa("particles"), b = K, c = 0;c < this.J;c++) {
    Cb(this, c)
  }
  b.uniform1i(a.Qb, 0);
  Db(this, a);
  this.K = this.Q = this.elapsedTime = 0;
  this.bb = this.J / Math.abs(this.Ha)
};
function Cb(a, b, c, d) {
  var e = a.m;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.lb + a.mb * R();
  e[18 * b + 3] = a.cb + a.eb * R();
  e[18 * b + 4] = a.ua[0] + a.va[0] * R();
  e[18 * b + 5] = a.ua[1] + a.va[1] * R();
  e[18 * b + 6] = a.ua[2] + a.va[2] * R();
  e[18 * b + 7] = R() * a.wa[0];
  e[18 * b + 8] = R() * a.wa[1];
  e[18 * b + 9] = R() * a.wa[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.ia[0] + R() * a.ja[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.ia[1] + R() * a.ja[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.ia[2] + R() * a.ja[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.ia[3] + R() * a.ja[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.aa[0] + R() * a.ba[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.aa[1] + R() * a.ba[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.aa[2] + R() * a.ba[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.aa[3] + R() * a.ba[3]))
}
function Db(a, b) {
  var c = K;
  c.bindBuffer(c.ARRAY_BUFFER, a.o);
  b.Ya || (c.vertexAttribPointer(b.a.a_lifetime, 1, c.FLOAT, m, 72, 0), c.vertexAttribPointer(b.a.a_startTime, 1, c.FLOAT, m, 72, 4), c.vertexAttribPointer(b.a.a_startSize, 1, c.FLOAT, m, 72, 8), c.vertexAttribPointer(b.a.a_endSize, 1, c.FLOAT, m, 72, 12), c.vertexAttribPointer(b.a.a_speed, 3, c.FLOAT, m, 72, 16), c.vertexAttribPointer(b.a.a_startPosition, 3, c.FLOAT, m, 72, 28), c.vertexAttribPointer(b.a.a_startColor, 4, c.FLOAT, m, 72, 40), c.vertexAttribPointer(b.a.a_endColor, 4, c.FLOAT, m, 72, 
  56), b.Ya = j);
  c.bufferData(c.ARRAY_BUFFER, a.m, c.STATIC_DRAW)
}
var Eb = new Float32Array(18);
zb.prototype.update = function(a) {
  if(Xa("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.bb;
    for(this.Q += a;this.K < this.J && this.Q > b && this.p;) {
      a = Math.abs(this.Ha + this.fb * R()), Cb(this, this.K++, a, this.elapsedTime), this.Ma = j, this.Q -= b
    }
    for(b = 0;b < this.J;b++) {
      var a = this.m, c = 18 * b;
      if(0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.K - 1) {
        var d = a.subarray(c, c + 18);
        Eb.set(d);
        Eb[0] = -1;
        d = a.subarray(c + 18, 18 * this.K);
        a.set(d, c);
        a.set(Eb, 18 * (this.K - 1));
        this.K--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.p = m)
  }
};
zb.prototype.U = function() {
  var a = Xa("particles");
  if(a) {
    var b = K, c = ab("texture", this.hb);
    b.blendFunc(b[this.Ba[0]], b[this.Ba[1]]);
    b.uniform1f(a.Rb, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.M);
    this.Ma ? (Db(this, a), this.Ma = m) : b.bindBuffer(b.ARRAY_BUFFER, this.o);
    (this.f || this.parent && this.parent.f) && ra(La, this.d, this.u);
    b.uniformMatrix4fv(a.C, m, this.u);
    b.drawArrays(b.POINTS, 0, this.J);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
p("chesterGL.GPUParticleSystem", zb);
zb.loadShaders = Bb;
zb.prototype.loadProperties = zb.prototype.gb;
function Y(a, b) {
  this.totalTime = a;
  this.b = b;
  this.l = 0
}
o = Y.prototype;
o.O = 0;
o.b = l;
o.totalTime = 0;
o.l = 0;
o.r = m;
o.p = m;
o.update = function(a) {
  this.l += a;
  0 <= this.totalTime && this.l >= this.totalTime && this.stop()
};
o.Mb = function(a) {
  this.p || (this.totalTime = a)
};
o.j = function() {
  this.p = j
};
o.stop = function() {
  this.r = j;
  this.p = m
};
o.pause = function() {
  this.p = m
};
o.Kb = function() {
  this.p = j
};
o.reset = function() {
  this.r = this.p = m;
  this.l = 0
};
function Z(a, b, c, d) {
  Y.call(this, b, d);
  this.ma = ha(a);
  this.R = void 0 !== c ? c === j : j;
  this.Ra = new Float32Array(3);
  this.ca = new Float32Array(3)
}
r(Z, Y);
Z.prototype.ma = l;
Z.prototype.ca = l;
Z.prototype.R = j;
Z.prototype.Ra = l;
var Fb = new Float32Array(3);
Z.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = this.b, b = Math.min(1, this.l / this.totalTime), c = this.Ra, d = this.ca, e = c[0], g = c[1], c = c[2];
  Fb[0] = (d[0] - e) * b + e;
  Fb[1] = (d[1] - g) * b + g;
  Fb[2] = (d[2] - c) * b + c;
  a.X(Fb[0], Fb[1], Fb[2])
};
Z.prototype.j = function() {
  Y.prototype.j.call(this);
  this.b || f("invalid move action! - no block");
  if(this.R) {
    var a = this.ma, b = this.b.position, c = this.ca;
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2]
  }else {
    ia(this.ca, this.ma)
  }
  ia(this.Ra, this.b.position)
};
Z.prototype.stop = function() {
  Y.prototype.stop.call(this);
  this.l >= this.totalTime && this.b.X(this.ca)
};
Z.prototype.reverse = function() {
  this.R || f("This only works on relative movements");
  var a = [], b = this.ma;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new Z(a, this.totalTime, j)
};
function Gb(a, b, c, d, e) {
  Y.call(this, c, e);
  this.R = d;
  this.Da = a;
  this.Ea = b;
  this.Ta = this.Sa = this.pa = this.oa = 0
}
r(Gb, Y);
o = Gb.prototype;
o.j = function() {
  Gb.D.j.call(this);
  this.b || f("invalid scale action - no block provided");
  this.R ? (this.oa = this.b.V + this.Da, this.pa = this.b.ya + this.Ea) : (this.oa = this.Da, this.pa = this.Ea);
  this.Sa = this.b.V;
  this.Ta = this.b.ya
};
o.update = function(a) {
  Gb.D.update.call(this, a);
  var a = this.b, b = Math.min(1, this.l / this.totalTime);
  a.Qa(this.Sa + b * (this.oa - this.Sa), this.Ta + b * (this.pa - this.Ta))
};
o.stop = function() {
  Gb.D.stop.call(this);
  this.l >= this.totalTime && this.b.Qa(this.oa, this.pa)
};
o.reset = function() {
  Gb.D.reset.call(this)
};
o.reverse = function() {
  this.R || f("This only works on relative movements");
  return new Gb(-this.Da, -this.Ea, this.totalTime, j)
};
function Hb(a, b, c) {
  this.Za = a;
  this.Xa = c;
  Y.call(this, b || 0)
}
r(Hb, Y);
Hb.prototype.Za = l;
Hb.prototype.Xa = l;
Hb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.r && this.Za.call(l, this.Xa)
};
function Ib(a) {
  1 > arguments.length && f("you need at least one action to create a sequence");
  var b = 0;
  this.k = [];
  for(var c in arguments) {
    b += arguments[c].totalTime, this.k.push(arguments[c])
  }
  this.fa = this.k[0].totalTime;
  Y.call(this, b)
}
r(Ib, Y);
o = Ib.prototype;
o.k = l;
o.z = 0;
o.j = function() {
  Ib.D.j.call(this);
  this.fa = this.k[0].totalTime;
  this.k[0].b = this.b;
  this.k[0].j()
};
o.reset = function() {
  Ib.D.reset.call(this);
  this.z = 0;
  this.fa = this.k[0].totalTime;
  for(var a = this.totalTime = 0;a < this.k.length;a++) {
    this.k[a].reset(), this.totalTime += this.k[a].totalTime
  }
};
o.update = function(a) {
  Ib.D.update.call(this, a);
  var b = this.k[this.z];
  b.update(a);
  if(this.l >= this.fa) {
    b.r || b.update(1E3);
    for(this.z++;this.z < this.k.length;) {
      b = this.k[this.z];
      b.b = this.b;
      b.j();
      this.fa += b.totalTime;
      if(0 < b.totalTime) {
        break
      }
      b.update(1);
      if(0 === this.z) {
        break
      }
      this.z += 1
    }
  }
};
function Jb(a, b) {
  this.Ka = b || 1;
  this.Va = 0;
  this.action = a;
  Y.call(this, a.totalTime)
}
r(Jb, Y);
o = Jb.prototype;
o.Ka = 0;
o.Va = 0;
o.action = l;
o.j = function() {
  Y.prototype.j.call(this);
  this.action.b = this.b;
  this.action.j()
};
o.update = function(a) {
  Y.prototype.update.call(this, a);
  this.action.update(a);
  if(this.r && this.action.r && (0 > this.Ka || this.Va < this.Ka)) {
    this.Va++, this.reset(), this.action.reset(), this.j()
  }
};
function Kb(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === j && (a = -1);
  Y.call(this, a, d);
  this.kb = c === j;
  this.frames = b.slice(0)
}
r(Kb, Y);
o = Kb.prototype;
o.P = 0;
o.delay = 0;
o.frames = l;
o.kb = m;
o.update = function(a) {
  Y.prototype.update.call(this, a);
  a = this.b;
  this.r ? (this.P = this.frames.length - 1, a.W(this.frames[this.P])) : this.l >= this.delay * this.P && (a.W(this.frames[this.P++]), this.P == this.frames.length && (this.kb ? this.l = this.P = 0 : this.r = j))
};
function Lb(a, b, c, d) {
  this.Wa = a;
  this.$a = b;
  Y.call(this, c, d)
}
r(Lb, Y);
Lb.prototype.Wa = 0;
Lb.prototype.$a = 0;
Lb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.r ? this.b.Pa(0) : this.b.Pa(this.Wa * Math.sin(2 * (this.l / 1E3 * this.$a) * Math.PI / (this.totalTime / 1E3)))
};
var Q = {L:{}, Cb:0, ib:function(a) {
  if(!a.O || !Q.L.hasOwnProperty(a.O)) {
    a.O = Q.Cb++, Q.L[a.O] = a
  }
  a.j();
  return a.O
}, Sb:function(a) {
  Q.L.hasOwnProperty(a) && delete Q.L[a]
}, Ob:function(a) {
  for(var b in Q.L) {
    var c = Q.L[b];
    c.p && c.update(a);
    c.r && delete Q.L[c.O]
  }
}};
T.prototype.Lb = function(a) {
  a.b = this;
  return Q.ib(a)
};
p("chesterGL.ActionManager", Q);
p("chesterGL.MoveAction", Z);
p("chesterGL.ScaleAction", Gb);
p("chesterGL.CallbackAction", Hb);
p("chesterGL.SequenceAction", Ib);
p("chesterGL.RepeatAction", Jb);
p("chesterGL.AnimateAction", Kb);
p("chesterGL.WiggleAction", Lb);
Q.scheduleAction = Q.ib;
Q.unscheduleAction = Q.Sb;
T.prototype.runAction = T.prototype.Lb;
Y.prototype.stop = Y.prototype.stop;
Y.prototype.reset = Y.prototype.reset;
Y.prototype.begin = Y.prototype.j;
Y.prototype.pause = Y.prototype.pause;
Y.prototype.resume = Y.prototype.Kb;
Y.prototype.setTotalTime = Y.prototype.Mb;
Z.prototype.reverse = Z.prototype.reverse;
Gb.prototype.reverse = Gb.prototype.reverse;
var vb = {frames:{}, Jb:function(a) {
  "string" === typeof a && (a = JSON.parse(a));
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    P("texture", b, l, function() {
      var c = a.frames, d;
      for(d in c) {
        var e = c[d], g = {frame:{}, c:""};
        g.frame = [e.frame.x, e.frame.y, e.frame.w, e.frame.h];
        g.c = b;
        vb.frames[d] = g
      }
    })
  }else {
    f("Unkown json data")
  }
}, rb:function(a, b) {
  L.frameset[a.name].data = b;
  return j
}, ra:function(a) {
  return vb.frames[a]
}, Fb:function(a) {
  console.log("loadFrames: will fetch " + a);
  P("frameset", {url:a, dataType:"json"}, l, function(a) {
    vb.Jb(a)
  })
}};
Oa.frameset = vb.rb;
p("chesterGL.BlockFrames", vb);
vb.getFrame = vb.ra;
vb.loadFrames = vb.Fb;
function W(a, b) {
  J || f("PrimitiveBlock only works on WebGL mode");
  this.Ja = a || 500;
  this.Ia = b || 500;
  T.call(this, l, S.PRIMITIVE);
  var c = K;
  this.Ga = c.createBuffer();
  this.t = new Float32Array(7 * this.Ja);
  this.Fa = c.createBuffer();
  this.e = new Float32Array(14 * this.Ia);
  this.i = U.DEFAULT
}
r(W, T);
o = W.prototype;
o.Ga = l;
o.t = l;
o.Fa = l;
o.e = l;
o.Ia = 0;
o.A = 0;
o.Ja = 0;
o.B = 0;
o.T = [];
o.pb = function(a, b, c) {
  if(this.B < this.Ja) {
    var d = 7 * this.B, c = c || [1, 1, 1, 1];
    this.t[d + 0] = a;
    this.t[d + 1] = b;
    this.t[d + 2] = 0;
    this.t[d + 3] = c[0];
    this.t[d + 4] = c[1];
    this.t[d + 5] = c[2];
    this.t[d + 6] = c[3];
    this.B++
  }else {
    f("too many points!")
  }
};
o.ob = function(a, b, c, d, e) {
  if(this.A < this.Ia) {
    var g = 14 * this.A, e = e || [1, 1, 1, 1];
    this.e[g + 0] = a;
    this.e[g + 1] = b;
    this.e[g + 2] = 0;
    this.e[g + 3] = e[0];
    this.e[g + 4] = e[1];
    this.e[g + 5] = e[2];
    this.e[g + 6] = e[3];
    this.e[g + 7] = c;
    this.e[g + 8] = d;
    this.e[g + 9] = 0;
    this.e[g + 10] = e[0];
    this.e[g + 11] = e[1];
    this.e[g + 12] = e[2];
    this.e[g + 13] = e[3];
    this.A++
  }else {
    f("too many lines!")
  }
};
o.na = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || m, d = d || m, e = a.length, g = K, h = new Float32Array(7 * a.length), i = g.createBuffer(), k = 0;k < e;k++) {
    var n = a[k];
    h[7 * k + 0] = n[0];
    h[7 * k + 1] = n[1];
    h[7 * k + 2] = n[2];
    h[7 * k + 3] = b[0];
    h[7 * k + 4] = b[1];
    h[7 * k + 5] = b[2];
    h[7 * k + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, i);
  g.bufferData(g.ARRAY_BUFFER, h, g.STATIC_DRAW);
  this.T.unshift([h, i, c, d])
};
o.qb = function(a, b, c, d, e, g) {
  c /= 2;
  d /= 2;
  this.na([[a - c, b - d, 0], [a - c, b + d, 0], [a + c, b + d, 0], [a + c, b - d, 0]], e, j, g)
};
o.F = function() {
  this.A = this.B = 0;
  0 < this.T.length && (this.T = []);
  T.prototype.F.call(this)
};
o.U = function() {
  var a = K, b = Xa(pb[this.i]);
  if(0 < this.B || 0 < this.A || 0 < this.T.length) {
    ra(La, this.d, this.u), a.uniformMatrix4fv(b.C, m, this.u)
  }
  if(0 < this.B) {
    var c = K, d = 7 * this.B;
    c.bindBuffer(c.ARRAY_BUFFER, this.Ga);
    c.bufferData(c.ARRAY_BUFFER, this.t.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.Ga);
    a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0);
    a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, m, 28, 12);
    a.drawArrays(a.POINTS, 0, this.B)
  }
  0 < this.A && (c = K, d = 14 * this.A, c.bindBuffer(c.ARRAY_BUFFER, this.Fa), c.bufferData(c.ARRAY_BUFFER, this.e.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.Fa), a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0), a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, m, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.A));
  c = this.T.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.T[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, m, 28, 0);
      a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, m, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
p("chesterGL.PrimitiveBlock", W);
W.prototype.drawPoint = W.prototype.pb;
W.prototype.drawLine = W.prototype.ob;
W.prototype.drawPolygon = W.prototype.na;
W.prototype.drawRectangle = W.prototype.qb;
var Mb, Nb, Ob, Pb;
function Qb() {
  return ba.navigator ? ba.navigator.userAgent : l
}
Pb = Ob = Nb = Mb = m;
var Rb;
if(Rb = Qb()) {
  var Sb = ba.navigator;
  Mb = 0 == Rb.indexOf("Opera");
  Nb = !Mb && -1 != Rb.indexOf("MSIE");
  Ob = !Mb && -1 != Rb.indexOf("WebKit");
  Pb = !Mb && !Ob && "Gecko" == Sb.product
}
var Tb = Nb, Ub = Pb, Vb = Ob;
var Wb;
if(Mb && ba.opera) {
  var Xb = ba.opera.version;
  "function" == typeof Xb && Xb()
}else {
  Ub ? Wb = /rv\:([^\);]+)(\)|;)/ : Tb ? Wb = /MSIE\s+([^\);]+)(\)|;)/ : Vb && (Wb = /WebKit\/(\S+)/), Wb && Wb.exec(Qb())
}
;var Yb = l, Zb = l;
function $b(a) {
  (a = ac[a]) || f("Invalid map - make sure you call loadTMX first");
  T.call(this, l, S.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = J ? new X(l, c.blocks.length) : new T, e = l, g = 0;g < c.blocks.length;g++) {
      var h = c.blocks[g];
      e || (e = bc(a.tilesets, h.gid), d.Z(e.texture));
      var i;
      J ? i = d.Ca(h.frame) : (i = new T(h.frame), i.Z(e.texture));
      i.X(h.position);
      d.v(i)
    }
    this.v(d)
  }
}
r($b, T);
$b.prototype.U = function() {
};
var ac = {};
function bc(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
Oa.tmx = function(a, b) {
  L.tmx[a.name].data = b;
  return j
};
p("chesterGL.TMXBlock", $b);
$b.loadTMX = function(a) {
  P("tmx", {url:a, dataType:"xml"}, l, function(b) {
    var c = {}, b = $(b).find("map"), d = b.attr("orientation");
    c.tilesets = [];
    b.find("tileset").each(function(a, b) {
      var d = $(b);
      if("obstruction" != d.attr("name")) {
        var i = {};
        i.tileSize = new ga(parseInt(d.attr("tilewidth"), 10), parseInt(d.attr("tileheight"), 10));
        d.attr("spacing") && (i.spacing = parseInt(d.attr("spacing"), 10));
        d.attr("margin") && (i.margin = parseInt(d.attr("margin"), 10));
        var k = d.find("image").first();
        i.imgSize = new ga(parseInt(k.attr("width"), 10), parseInt(k.attr("height"), 10));
        i.texture = k.attr("source");
        i.firstgid = parseInt(d.attr("firstgid"), 10);
        c.tilesets.push(i)
      }
    });
    c.mapTileSize = new ga(parseInt(b.attr("tilewidth"), 10), parseInt(b.attr("tileheight"), 10));
    c.layers = [];
    b.find("layer").each(function(a, b) {
      if("0" != $(b).attr("visible")) {
        var h = {blocks:[]}, i = new ga(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), k = $(b).find("data").first();
        if(k) {
          ("base64" != k.attr("encoding") || k.attr("compression")) && f("Invalid TMX Data");
          var n = k.text().trim();
          if(!Yb) {
            Yb = {};
            Zb = {};
            for(k = 0;65 > k;k++) {
              Yb[k] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k), Zb[Yb[k]] = k
            }
          }
          for(var s = Zb, k = [], q = 0;q < n.length;) {
            var w = s[n.charAt(q++)], x = q < n.length ? s[n.charAt(q)] : 0;
            ++q;
            var u = q < n.length ? s[n.charAt(q)] : 0;
            ++q;
            var y = q < n.length ? s[n.charAt(q)] : 0;
            ++q;
            (w == l || x == l || u == l || y == l) && f(Error());
            k.push(w << 2 | x >> 4);
            64 != u && (k.push(x << 4 & 240 | u >> 2), 64 != y && k.push(u << 6 & 192 | y))
          }
          n = 0;
          s = l;
          for(q = 0;q < i.height;q++) {
            for(w = 0;w < i.width;w++) {
              var v = k[n + 3] << 24 | k[n + 2] << 16 | k[n + 1] << 8 | k[n + 0] >>> 0;
              if(0 !== v) {
                s || (s = bc(c.tilesets, v));
                x = {};
                x.gid = v;
                var z = s.margin || 0, B = s.spacing || 0, u = s.tileSize, C = s.imgSize, y = c.mapTileSize, E = parseInt((C.width - 2 * z + B) / (u.width + B), 10), v = v - s.firstgid, I = v % E * (u.width + B) + z, C = C.height - u.height - z - B - parseInt(v / E, 10) * (u.height + B) + z, E = u.width, B = u.height, z = v = new Float32Array(4);
                z[0] = I;
                z[1] = C;
                z[2] = E;
                z[3] = B;
                x.frame = v;
                var G, H;
                "orthogonal" == d ? (G = w * y.width + u.width / 2, H = (i.height - q - 1) * y.height + u.height / 2) : "isometric" == d ? (G = y.width / 2 * (i.width + w - q - 1) + u.width / 2, H = y.height / 2 * (2 * i.height - w - q - 2) + u.height / 2) : f("Invalid orientation");
                x.position = [G, H, 0];
                h.blocks.push(x)
              }
              n += 4
            }
          }
        }else {
          f("No data for layer!")
        }
        c.layers.push(h)
      }
    });
    ac[a] = c
  })
};
function cc(a, b, c) {
  var b = b || "20px sans-serif", c = c || "White", d = document.createElement("canvas");
  this.canvas = d;
  this.context = d.getContext("2d");
  this.context.textBaseline = "bottom";
  this.font = b;
  this.fillStyle = c;
  (b = b.match(/(\d+)px/)) ? this.Ua = parseInt(b[1], 10) : f("Invalid text height - use the form NNpx");
  this.c = Math.random() + ".canvas";
  L.texture || (L.texture = {});
  L.texture[this.c] = d;
  T.call(this, dc(this, a));
  this.Y(a, m);
  this.i = U.TEXTURE
}
r(cc, T);
o = cc.prototype;
o.canvas = l;
o.context = l;
o.La = m;
o.text = "";
o.Ua = 0;
o.font = "";
o.fillStyle = "";
o.Y = function(a, b) {
  this.text = a;
  ec(this);
  b || (this.W(dc(this)), this.La = j)
};
function ec(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, c.height);
  c.M || (c.M = K.createTexture(), L.texture[a.c].data = c);
  cb(c);
  a.La = m
}
function dc(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.Ua;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  c.textBaseline = "bottom";
  return[0, 0, e, a.Ua]
}
o.F = function() {
  this.La && ec(this);
  T.prototype.F.call(this)
};
p("chesterGL.LabelBlock", cc);
cc.prototype.setText = cc.prototype.Y;

//@ sourceMappingURL=chester.js.map
