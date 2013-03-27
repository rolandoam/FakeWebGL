'use strict';function f(a) {
  throw a;
}
var i = !0, j = null, k = !1;
function aa(a) {
  return function() {
    return this[a]
  }
}
var m, ba = this;
Math.floor(2147483648 * Math.random()).toString(36);
function o(a, b) {
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
  a.G = b.prototype;
  a.prototype = new c
}
;function ca(a, b) {
  this.width = a;
  this.height = b
}
ca.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
ca.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
function s(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
s.prototype.BYTES_PER_ELEMENT = 8;
s.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
s.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (s.BYTES_PER_ELEMENT = 8, s.prototype.BYTES_PER_ELEMENT = s.prototype.BYTES_PER_ELEMENT, s.prototype.set = s.prototype.set, s.prototype.toString = s.prototype.toString, o("Float64Array", s));
function y(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
y.prototype.BYTES_PER_ELEMENT = 4;
y.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
y.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (y.BYTES_PER_ELEMENT = 4, y.prototype.BYTES_PER_ELEMENT = y.prototype.BYTES_PER_ELEMENT, y.prototype.set = y.prototype.set, y.prototype.toString = y.prototype.toString, o("Float32Array", y));
function da(a) {
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
;function oa() {
  return new Float32Array(16)
}
function pa(a, b, c, d, e, g, h, l, n, p, q, t, w, u, A, B, v) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = h;
  a[6] = l;
  a[7] = n;
  a[8] = p;
  a[9] = q;
  a[10] = t;
  a[11] = w;
  a[12] = u;
  a[13] = A;
  a[14] = B;
  a[15] = v;
  return a
}
function qa(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function ra(a) {
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
function sa(a, b, c) {
  var d = a[0], e = a[1], g = a[2], h = a[3], l = a[4], n = a[5], p = a[6], q = a[7], t = a[8], w = a[9], u = a[10], A = a[11], B = a[12], v = a[13], C = a[14], a = a[15], z = b[0], x = b[1], F = b[2], H = b[3], I = b[4], M = b[5], J = b[6], K = b[7], ea = b[8], fa = b[9], ga = b[10], ha = b[11], E = b[12], Va = b[13], Wa = b[14], b = b[15];
  c[0] = d * z + l * x + t * F + B * H;
  c[1] = e * z + n * x + w * F + v * H;
  c[2] = g * z + p * x + u * F + C * H;
  c[3] = h * z + q * x + A * F + a * H;
  c[4] = d * I + l * M + t * J + B * K;
  c[5] = e * I + n * M + w * J + v * K;
  c[6] = g * I + p * M + u * J + C * K;
  c[7] = h * I + q * M + A * J + a * K;
  c[8] = d * ea + l * fa + t * ga + B * ha;
  c[9] = e * ea + n * fa + w * ga + v * ha;
  c[10] = g * ea + p * fa + u * ga + C * ha;
  c[11] = h * ea + q * fa + A * ga + a * ha;
  c[12] = d * E + l * Va + t * Wa + B * b;
  c[13] = e * E + n * Va + w * Wa + v * b;
  c[14] = g * E + p * Va + u * Wa + C * b;
  c[15] = h * E + q * Va + A * Wa + a * b;
  return c
}
function ta(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14];
  return c
}
function ua(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], h = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = h;
  return a
}
function va(a, b, c, d) {
  return pa(a, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * c, a[5] * c, a[6] * c, a[7] * c, a[8] * d, a[9] * d, a[10] * d, a[11] * d, a[12], a[13], a[14], a[15])
}
function wa(a, b, c, d, e) {
  var g = a[0], h = a[1], l = a[2], n = a[3], p = a[4], q = a[5], t = a[6], w = a[7], u = a[8], A = a[9], B = a[10], v = a[11], C = Math.cos(b), z = Math.sin(b), x = 1 - C, b = c * c * x + C, F = c * d * x + e * z, H = c * e * x - d * z, I = c * d * x - e * z, M = d * d * x + C, J = d * e * x + c * z, K = c * e * x + d * z, c = d * e * x - c * z, e = e * e * x + C;
  return pa(a, g * b + p * F + u * H, h * b + q * F + A * H, l * b + t * F + B * H, n * b + w * F + v * H, g * I + p * M + u * J, h * I + q * M + A * J, l * I + t * M + B * J, n * I + w * M + v * J, g * K + p * c + u * e, h * K + q * c + A * e, l * K + t * c + B * e, n * K + w * c + v * e, a[12], a[13], a[14], a[15])
}
new Float64Array(3);
new Float64Array(3);
var xa = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function ya(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
ya.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function za(a, b) {
  this.x = a;
  this.y = b
}
r(za, ya);
var Aa;
HTMLCanvasElement.tb = new za(0, 0);
function Ba(a) {
  var b = Ca, c = b.getBoundingClientRect(), b = Da && !Ea ? b.height / Aa : b.height, d = HTMLCanvasElement.tb;
  a.changedTouches && (a = a.changedTouches[0]);
  d.x = a.clientX - c.left;
  d.y = b - (a.clientY - c.top);
  return d
}
var Fa = window;
"undefined" === typeof Fa.requestAnimationFrame && ("undefined" !== typeof Fa.webkitRequestAnimationFrame ? Fa.requestAnimationFrame = Fa.webkitRequestAnimationFrame : "undefined" !== typeof mozRequestAnimationFrame ? Fa.requestAnimationFrame = Fa.mozRequestAnimationFrame : "undefined" !== typeof msRequestAnimationFrame ? Fa.requestAnimationFrame = Fa.msRequestAnimationFrame : "undefined" !== typeof oRequestAnimationFrame ? Fa.requestAnimationFrame = Fa.oRequestAnimationFrame : (console.log("using setTimeout as requestAnimationFrame"), 
Fa.requestAnimationFrame = function(a) {
  window.setTimeout(a, 1E3 / 60)
}));
function Ga(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var Ea = k;
"undefined" !== typeof runScript && (Ea = i, sa = _mat4mul, ta = _mat4mulvec3, ua = _mat4translate, wa = _mat4rotate, va = _mat4scale);
var Ha = {useGoogleAnalytics:k, projection:"3d", webglMode:i, usesOffscreenBuffer:k, basePath:"", canvasOriginTopLeft:k, backgroundColor:[0, 0, 0, 1]}, Ia = "3d", D = i, Ja = "", Ka = k, G = ma([0, 0, 0, 1]), L = j, La = k, Ma = {}, Na = j, Oa = j, Pa = j, Ca = j, Qa = k, Da = k, N = {}, Ra = {}, Sa = {}, Ta = {}, Ua = Date.now(), Xa = 0, Ya = {Zb:0, bc:1, cc:2, $b:3, ac:4}, Za = j, O = [];
function $a(a) {
  var b = Ma[a], c = L;
  if(a != Na) {
    Na = a;
    c.useProgram(b);
    for(var d in b.b) {
      c.enableVertexAttribArray(b.b[d])
    }
  }
  return b
}
function ab(a, b) {
  var c = L, d = bb(a, "frag"), e = bb(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  if(c.getShaderParameter(g, c.COMPILE_STATUS)) {
    d = c.createShader(c.VERTEX_SHADER);
    c.shaderSource(d, e);
    c.compileShader(d);
    if(c.getShaderParameter(d, c.COMPILE_STATUS)) {
      c = L;
      e = c.createProgram();
      c.attachShader(e, g);
      c.attachShader(e, d);
      c.linkProgram(e);
      c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
      Ma[a] = e;
      b && b(e)
    }else {
      console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
    }
  }else {
    console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
  }
}
function bb(a, b) {
  var c = "", d = new XMLHttpRequest;
  d.open("GET", Ja + "shaders/" + a + "." + b, k);
  d.onreadystatechange = function() {
    d.readyState == 4 && d.status == 200 ? c = d.responseText : d.readyState == 4 && console.log("error getting the shader data")
  };
  d.send();
  return c
}
function P(a, b, c, d) {
  if(typeof c == "function") {
    d = c;
    c = j
  }
  b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url, sa:b.sa || k} : {url:b, name:c || b};
  N[a] || (N[a] = {});
  c = RegExp("@" + Aa + "x\\..+$");
  if(Da && !b.sa && b.url.match(c) === j) {
    if((c = b.url.match(/(\..+$)/)) && Da) {
      b.url = b.url.replace(/(\..+$)/, "@" + Aa + "x$1")
    }
  }
  var c = N[a], e = b.name;
  if(c[e]) {
    if(c[e].status == "loading") {
      d && c[e].L.push(d)
    }else {
      if(c[e].status == "loaded") {
        d && d(j, c[e].data)
      }else {
        if(c[e].status == "try") {
          c[e].status = "loading";
          if(Sa[a]) {
            Sa[a](a, b)
          }else {
            Sa["default"](a, b)
          }
          d && c[e].L.push(d)
        }
      }
    }
  }else {
    c[e] = {data:j, name:e, status:"try", L:[]};
    d && c[e].L.push(d);
    P(a, b)
  }
}
function cb(a, b) {
  var c = Ta[a], d, e;
  if(!c) {
    Ta[a] = [];
    c = Ta[a]
  }
  b && c.push(b);
  var g = i;
  if(a == "all") {
    for(var h in N) {
      d = N[h];
      for(e in d) {
        if(d[e].status != "loaded") {
          g = k;
          break
        }
      }
      if(!g) {
        break
      }
    }
  }else {
    d = N[a];
    for(e in d) {
      if(d[e].status != "loaded") {
        g = k;
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
function db(a, b) {
  return b ? N[a][b].data : j
}
function eb(a, b) {
  return b ? b in N[a] : k
}
function fb(a) {
  var b = L, c = i;
  try {
    var d = 0;
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, a.O);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
    d = b.getError();
    if(d !== 0) {
      console.log("gl error " + d);
      c = k
    }
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.bindTexture(b.TEXTURE_2D, j)
  }catch(e) {
    console.log("got some error: " + e);
    c = k
  }
  return c
}
function gb(a, b, c) {
  N[c][a.name].data = b;
  return i
}
function hb(a, b) {
  if(D && !b.O) {
    b.O = L.createTexture()
  }
  N.texture[a.name].data = b;
  return D ? fb(b) : i
}
function ib(a, b) {
  var c = new Image, d = b.url, e = b.name, g = RegExp("@" + Aa + "x\\..+$");
  c.src = "";
  c.addEventListener("load", function() {
    var h = N.texture[e];
    if(Ra[a](b, c)) {
      h.status = "loaded";
      h.jb = d.match(g) && Da;
      for(var l;l = h.L.shift();) {
        l(j, h.data)
      }
      cb(a);
      cb("all")
    }else {
      h.status = "try";
      P(a, b)
    }
  }, k);
  c.addEventListener("error", function(a) {
    var c = N.texture[e];
    if(a.type === "error" && Da && d.match(g)) {
      b.url = d.replace("@" + Aa + "x", "");
      b.sa = i;
      c.status = "try";
      P("texture", b)
    }else {
      c.status = "error";
      for(var n;n = c.L.shift();) {
        n({url:e, type:a.type}, c.data)
      }
    }
  }, i);
  if(d.match(/^http(s)?:/)) {
    c.crossOrigin = "anonymous";
    c.src = d
  }else {
    c.src = d.match(/^data:/) ? d : Ja + d
  }
}
function jb(a, b) {
  var c = b.url, d = c, e = b.name, g = RegExp("@" + Aa + "x\\..+$");
  c.match(/^http(s)?:\/\//) || (d = Ja + c);
  var h = new XMLHttpRequest;
  h.open("GET", d);
  h.withCredentials = i;
  h.onreadystatechange = function() {
    var d = N[a][e];
    if(h.readyState == 4 && h.status == 200) {
      if((Ra[a] || Ra["default"])(b, h.response, a)) {
        d.status = "loaded";
        for(var n;n = d.L.shift();) {
          n(j, d.data)
        }
        cb(a);
        cb("all")
      }else {
        d.status = "try";
        P(a, b)
      }
    }else {
      if(h.readyState == 4) {
        if(h.status == 404 && Da && c.match(g)) {
          b.url = c.replace("@" + Aa + "x", "");
          b.sa = i;
          d.status = "try";
          P(a, b)
        }else {
          for(console.log("Error loading asset " + c);n = d.L.shift();) {
            n({url:c, type:h.status}, d.data)
          }
        }
      }
    }
  };
  h.send()
}
function kb() {
  var a = L;
  if(D) {
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
  }else {
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.fillStyle = G;
    a.clearRect(0, 0, a.ma, a.P);
    a.fillRect(0, 0, a.ma, a.P)
  }
  if(Pa) {
    Pa.H();
    if(!Pa.ha) {
      Pa.onEnterScene()
    }
  }
  a = Date.now();
  Xa = a - Ua;
  Ua = a
}
var lb = new Float32Array(3);
function mb(a, b) {
  lb[0] = a;
  lb[1] = b;
  lb[2] = 0
}
function nb(a) {
  var a = Ba(a), b = O.length;
  mb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === O[a].call(j, lb, 0)) {
      break
    }
  }
}
function ob(a) {
  var a = Ba(a), b = O.length;
  mb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === O[a].call(j, lb, 1)) {
      break
    }
  }
}
function pb(a) {
  var a = Ba(a), b = O.length;
  mb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === O[a].call(j, lb, 2)) {
      break
    }
  }
}
function qb(a) {
  var a = Ba(a), b = O.length;
  mb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === O[a].call(j, lb, 3)) {
      break
    }
  }
}
function rb(a) {
  var a = Ba(a), b = O.length;
  mb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === O[a].call(j, lb, 4)) {
      break
    }
  }
}
function sb() {
  if(!La) {
    requestAnimationFrame(sb, Ca);
    Za && Za.begin();
    kb();
    Q.Vb(Xa);
    Za && Za.end()
  }
}
function R() {
  return Math.random() * 2 - 1
}
function tb(a) {
  if(D) {
    na(G, a);
    L.clearColor(G[0], G[1], G[2], G[3])
  }else {
    G = "rgba(" + a[0] * 255 + ", " + a[1] * 255 + ", " + a[2] * 255 + ", " + a[3] + ")"
  }
}
o("chesterGL.version", "0.3");
o("chesterGL.settings", Ha);
o("chesterGL.mouseEvents", Ya);
o("chesterGL.onFakeWebGL", Ea);
Ya.UP = 2;
Ya.DOWN = 0;
Ya.MOVE = 1;
Ya.ENTER = 3;
Ya.LEAVE = 4;
o("chesterGL.viewportSize", function() {
  return new ca(L.ma, L.P)
});
o("chesterGL.setup", function(a) {
  a = Ea ? new FakeCanvas(innerWidth, innerHeight) : document.getElementById(a);
  Ia = Ha.projection;
  D = Ha.webglMode;
  Ja = Ha.basePath;
  Ka = Ha.canvasOriginTopLeft;
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
      Da = i;
      Aa = window.devicePixelRatio
    }else {
      b = a.width;
      c = a.height
    }
    Ca = a;
    if(D) {
      if((L = a.getContext("experimental-webgl", {alpha:i, antialias:k, preserveDrawingBuffer:i, premultipliedAlpha:k})) && typeof WebGLDebugUtils !== "undefined") {
        console.log("installing debug context");
        L = WebGLDebugUtils.makeDebugContext(L, Ga)
      }
    }
  }catch(e) {
    console.log("ERROR: " + e)
  }
  if(!L) {
    (L = a.getContext("2d")) || f("Error initializing graphic context!");
    D = Ha.webglMode = k
  }
  L.ma = b;
  L.P = c;
  if(Ea) {
    _touchBeganListeners.push(nb);
    _touchMovedListeners.push(ob);
    _touchEndedListeners.push(pb)
  }else {
    if(typeof navigator !== "undefined" && navigator.platform.match(/iPhone|iPad/)) {
      document.addEventListener("touchstart", nb, k);
      document.addEventListener("touchmove", function(a) {
        ob(a);
        a.preventDefault()
      }, k);
      document.addEventListener("touchend", pb, k)
    }else {
      $(Ca).mousedown(nb);
      $(Ca).mousemove(ob);
      $(Ca).mouseup(pb);
      $(Ca).mouseenter(qb);
      $(Ca).mouseleave(rb)
    }
  }
  if(D) {
    var g = L;
    ab("default", function(a) {
      a.F = g.getUniformLocation(a, "uMVPMatrix");
      a.b = {vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:g.getAttribLocation(a, "aVertexColor")};
      a.mvpMatrixUniform = a.F;
      a.attribs = a.b
    });
    ab("texture", function(a) {
      a.F = g.getUniformLocation(a, "uMVPMatrix");
      a.Ra = g.getUniformLocation(a, "uSampler");
      a.b = {vertexColorAttribute:g.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:g.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition")};
      a.mvpMatrixUniform = a.F;
      a.samplerUniform = a.Ra;
      a.attribs = a.b
    })
  }
  tb(Ha.backgroundColor);
  if(!Ea) {
    var d = window.location.search.substring(1).split("&"), h;
    for(h in d) {
      a = d[h].split("=");
      if(a[0] == "_cdbg" && a[1] == "1") {
        Qa = i;
        console.log("debug mode on")
      }
    }
  }
  Ra.texture = hb;
  Ra["default"] = gb;
  Sa.texture = ib;
  Sa["default"] = jb;
  if(typeof Stats !== "undefined") {
    console.log("chesterGL: adding stats");
    Za = new Stats;
    Za.setMode(1);
    if(!Ea) {
      Za.domElement.style.position = "absolute";
      Za.domElement.style.left = "0px";
      Za.domElement.style.top = "0px";
      document.body.appendChild(Za.domElement)
    }
    o("chesterGL.stats", Za)
  }
});
o("chesterGL.canvasResized", function() {
  var a = Ca;
  L.ma = a.width;
  L.P = a.height
});
o("chesterGL.initShader", ab);
o("chesterGL.registerAssetHandler", function(a, b) {
  Ra[a] = b
});
o("chesterGL.loadAsset", P);
o("chesterGL.assetsLoaded", cb);
o("chesterGL.getAsset", db);
o("chesterGL.hasAsset", eb);
o("chesterGL.setupPerspective", function() {
  var a = L;
  if(D) {
    a.clearColor(G[0], G[1], G[2], G[3]);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.ma, c = a.P;
    a.viewport(0, 0, Ca.width, Ca.height);
    Oa = oa();
    if(Ia == "2d") {
      console.log("setting up 2d projection (" + b + "," + c + ")");
      pa(Oa, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
    }else {
      if(Ia == "3d") {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = oa(), e = b / c, g = 60 * Math.PI / 180 / 2, h = Math.sin(g);
        if(!(h == 0 || e == 0)) {
          g = Math.cos(g) / h;
          a = pa(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0)
        }
        d = [b / 2, c / 2, d];
        e = [b / 2, c / 2, 0];
        b = oa();
        c = xa[0];
        c[0] = e[0] - d[0];
        c[1] = e[1] - d[1];
        c[2] = e[2] - d[2];
        ka(c, c);
        c[3] = 0;
        e = xa[1];
        la(c, [0, 1, 0], e);
        ka(e, e);
        e[3] = 0;
        g = xa[2];
        la(e, c, g);
        ka(g, g);
        g[3] = 0;
        c[0] = -c[0];
        c[1] = -c[1];
        c[2] = -c[2];
        qa(b, 0, e);
        qa(b, 1, g);
        qa(b, 2, c);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[15] = 1;
        ua(b, -d[0], -d[1], -d[2]);
        sa(a, b, Oa)
      }else {
        f("Invalid projection: " + Ia)
      }
    }
  }
});
o("chesterGL.setRunningScene", function(a) {
  if(Pa && Pa != a) {
    Pa.onExitScene()
  }
  a.type == S.SCENE && (Pa = a)
});
o("chesterGL.drawScene", kb);
o("chesterGL.run", sb);
o("chesterGL.togglePause", function() {
  if(La) {
    La = k;
    Ua = Date.now();
    sb()
  }else {
    La = i
  }
});
o("chesterGL.isPaused", function() {
  return La
});
o("chesterGL.setPause", function(a) {
  if(La && !a) {
    La = a;
    Ua = Date.now();
    sb()
  }else {
    La = a
  }
});
o("chesterGL.getRunningScene", function() {
  return Pa
});
o("chesterGL.getCurrentContext", function() {
  return L
});
o("chesterGL.addMouseHandler", function(a) {
  O.indexOf(a) == -1 && O.push(a)
});
o("chesterGL.removeMouseHandler", function(a) {
  a = O.indexOf(a);
  a >= 0 && O.splice(a, 1)
});
o("chesterGL.setBackgroundColor", tb);
o("chesterGL.getBackgroundColor", function() {
  return G
});
function T(a, b, c) {
  this.type = b || S.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.k = U.DEFAULT;
  this.Z(0, 0);
  this.type == S.STANDALONE && this.Sa([1, 1, 1, 1]);
  a && ("string" === typeof a && eb("texture", a) ? this.ca(a) : this.$(a));
  this.aa(0, 0, 0);
  this.ja(0.5, 0.5);
  if(D && (!c || c.type != S.BLOCKGROUP)) {
    this.o = L.createBuffer(), this.n = new Float32Array(36)
  }
  this.d = oa();
  this.v = oa();
  this.d = ra(oa());
  this.Ca = [];
  this.Q = []
}
var U = {DEFAULT:0, TEXTURE:1}, ub = ["default", "texture"], S = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, vb = Math.PI / 180, wb = 180 / Math.PI, xb = 1 * vb, yb = new Float32Array(4);
yb[0] = 0;
yb[1] = 0;
yb[2] = 1;
yb[3] = 1;
var zb = new ca(0, 0);
m = T.prototype;
m.title = "";
m.fb = k;
m.d = j;
m.v = j;
m.visible = i;
m.ha = k;
m.g = k;
m.D = k;
m.J = k;
m.na = 0;
m.o = j;
m.n = j;
m.position = j;
m.m = j;
m.f = j;
m.color = j;
m.c = j;
m.rotation = 0;
m.Y = 1;
m.Aa = 1;
m.update = j;
m.frame = j;
m.parent = j;
m.children = j;
m.Ca = j;
m.Q = j;
m.r = k;
m.Nb = function() {
  this.ha = i;
  for(var a in this.children) {
    this.children[a].onEnterScene()
  }
};
m.Ob = function() {
  this.ha = k;
  for(var a in this.children) {
    this.children[a].onExitScene()
  }
  for(var b in Q.z) {
    a = Q.z[b], a.a == this && Q.sb(a.I)
  }
};
m.$ = function(a, b) {
  if("string" === typeof a) {
    var c = Ab.ta(a);
    c || f("Invalid frame name: " + a);
    a = c.frame;
    this.ca(c.c, a)
  }else {
    this.frame ? na(this.frame, a) : this.frame = ma(a), b ? this.Z(a[2] / Aa, a[3] / Aa) : this.Z(a[2], a[3])
  }
  this.J = i;
  return this
};
m.ta = aa("frame");
m.Z = function(a, b) {
  this.f = new ca(a, b);
  this.J = i;
  return this
};
m.Eb = aa("f");
m.Ua = function(a, b) {
  this.Y = a;
  this.Aa = 2 == arguments.length ? b : this.Y;
  this.g = i;
  return this
};
m.Hb = aa("Y");
m.Sa = function(a) {
  this.color ? na(this.color, a) : this.color = ma(a);
  this.D = i;
  return this
};
m.Db = aa("color");
m.Ab = function() {
  return this.color[3]
};
m.Sb = function(a) {
  this.color || f("Need to set the color before alpha");
  this.color[3] = a;
  this.D = i;
  return this
};
m.aa = function(a, b, c) {
  if(this.position) {
    1 == arguments.length ? ia(this.position, a) : ja(this.position, a, b, c)
  }else {
    var d;
    1 == arguments.length ? d = da(a) : (d = new Float32Array(3), ja(d, a, b, c));
    this.position = d
  }
  this.g = i;
  return this
};
m.ub = function(a, b, c) {
  this.position || f("call setPosition before adjusting it!");
  this.position[0] += a || 0;
  this.position[1] += b || 0;
  this.position[2] += c || 0;
  this.g = i
};
m.ja = function(a, b) {
  this.m = new za(a, b);
  return this
};
m.Bb = aa("m");
m.Fb = aa("position");
m.zb = function() {
  var a = da(this.position), b = this.d, c = oa();
  c[0] = b[0];
  c[1] = b[1];
  c[2] = b[2];
  c[3] = b[3];
  c[4] = b[4];
  c[5] = b[5];
  c[6] = b[6];
  c[7] = b[7];
  c[8] = b[8];
  c[9] = b[9];
  c[10] = b[10];
  c[11] = b[11];
  c[12] = b[12];
  c[13] = b[13];
  c[14] = b[14];
  c[15] = b[15];
  for(b = this.parent;b;) {
    sa(b.d, c, c), b = b.parent
  }
  ta(c, a, a);
  return a
};
var V = new Float32Array(16);
m = T.prototype;
m.Wb = function(a, b) {
  b = b || a;
  var c = this.d, d = c[0], e = c[1], g = c[2], h = c[3], l = c[4], n = c[5], p = c[6], q = c[7], t = c[8], w = c[9], u = c[10], A = c[11], B = c[12], v = c[13], C = c[14], c = c[15], z = d * n - e * l, x = d * p - g * l, F = d * q - h * l, H = e * p - g * n, I = e * q - h * n, M = g * q - h * p, J = t * v - w * B, K = t * C - u * B, ea = t * c - A * B, fa = w * C - u * v, ga = w * c - A * v, ha = u * c - A * C, E = z * ha - x * ga + F * fa + H * ea - I * K + M * J;
  0 != E && (E = 1 / E, V[0] = (n * ha - p * ga + q * fa) * E, V[1] = (-e * ha + g * ga - h * fa) * E, V[2] = (v * M - C * I + c * H) * E, V[3] = (-w * M + u * I - A * H) * E, V[4] = (-l * ha + p * ea - q * K) * E, V[5] = (d * ha - g * ea + h * K) * E, V[6] = (-B * M + C * F - c * x) * E, V[7] = (t * M - u * F + A * x) * E, V[8] = (l * ga - n * ea + q * J) * E, V[9] = (-d * ga + e * ea - h * J) * E, V[10] = (B * I - v * F + c * z) * E, V[11] = (-t * I + w * F - A * z) * E, V[12] = (-l * fa + n * 
  K - p * J) * E, V[13] = (d * fa - e * K + g * J) * E, V[14] = (-B * H + v * x - C * z) * E, V[15] = (t * H - w * x + u * z) * E);
  ta(V, a, b);
  b[0] += this.f.width * this.m.x;
  b[1] += this.f.height * this.m.y;
  return b
};
m.Cb = function() {
  var a = this.position, b = this.f.width, c = this.f.height;
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
m.ca = function(a, b) {
  if(a == this.c && (!b || this.frame == b)) {
    return this
  }
  this.c = a;
  this.k = U.TEXTURE;
  P("texture", a, j, function(a, d) {
    this.$(b || [0, 0, d.width, d.height], Da && N.texture[this.c].jb)
  }.bind(this));
  return this
};
m.Ib = aa("c");
m.Ta = function(a) {
  this.rotation = a;
  this.g = i;
  return this
};
m.Gb = aa("rotation");
m.ob = function(a) {
  this.update = a;
  return this
};
m.Ub = function(a) {
  this.visible = a;
  return this
};
m.Lb = aa("visible");
m.append = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent && f("can't add a block twice!");
    this.r ? this.Ca.push(c) : (this.children.push(c), c.parent = this);
    if(this.ha) {
      c.onEnterScene()
    }
  }
  return this
};
m.remove = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.r) {
    this.Q.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = j)
  }
  if(this.ha) {
    a.onExitScene()
  }
  return this
};
m.detach = function() {
  this.parent && this.parent.remove(this)
};
m.za = function() {
  if(this.r) {
    this.Q.push("all")
  }else {
    for(var a = 0, a = 0;a < this.children.length;a++) {
      this.children[a].parent = j
    }
    this.children.length = 0
  }
};
var Bb = [new Float32Array(3), new Float32Array(3), new Float32Array(3), new Float32Array(3)];
T.prototype.transform = function() {
  var a = L, b, c, d = this.parent && this.parent.type == S.BLOCKGROUP, e = this.f ? (0.5 - this.m.x) * this.f.width : 0, g = this.f ? (0.5 - this.m.y) * this.f.height : 0;
  if(this.g || this.parent && this.parent.g) {
    this.g = i, b = this.position[0], c = this.position[1], D && Ka && (c = a.P / 2 - c), ra(this.d), ua(this.d, b, c, this.position[2]), wa(this.d, -1 * this.rotation, 0, 0, 1), va(this.d, this.Y, this.Aa, 1), (b = this.parent ? this.parent.d : j) && !d && sa(b, this.d, this.d)
  }
  if(!(this.type == S.BLOCKGROUP || this.type == S.PRIMITIVE)) {
    if(b = this.n, D) {
      !d && (this.J || this.D) && a.bindBuffer(a.ARRAY_BUFFER, this.o);
      if(this.J || this.g) {
        var h = 0.5 * this.f.width, l = 0.5 * this.f.height, n = this.position[2];
        c = 36 * this.na;
        if(d) {
          var p = ja(Bb[0], h + e, l + g, n), q = ja(Bb[1], -h + e, l + g, n), t = ja(Bb[2], h + e, -l + g, n), e = ja(Bb[3], -h + e, -l + g, n);
          ta(this.d, p, p);
          ta(this.d, q, q);
          ta(this.d, e, e);
          ta(this.d, t, t);
          b[c] = e[0];
          b[c + 1] = e[1];
          b[c + 2] = n;
          b[c + 9] = q[0];
          b[c + 1 + 9] = q[1];
          b[c + 2 + 9] = n;
          b[c + 18] = t[0];
          b[c + 1 + 18] = t[1];
          b[c + 2 + 18] = n;
          b[c + 27] = p[0];
          b[c + 1 + 27] = p[1]
        }else {
          b[c] = -h + e, b[c + 1] = -l + g, b[c + 2] = n, b[c + 9] = -h + e, b[c + 1 + 9] = l + g, b[c + 2 + 9] = n, b[c + 18] = h + e, b[c + 1 + 18] = -l + g, b[c + 2 + 18] = n, b[c + 27] = h + e, b[c + 1 + 27] = l + g
        }
        b[c + 2 + 27] = n;
        this.k == U.TEXTURE && (e = db("texture", this.c), n = e.width, p = e.height, e = this.frame[0] / n, g = this.frame[1] / p, n = this.frame[2] / n, p = this.frame[3] / p, c += 3, b[c] = e, b[c + 1] = g + p, b[c + 9] = e, b[c + 1 + 9] = g, b[c + 18] = e + n, b[c + 1 + 18] = g + p, b[c + 27] = e + n, b[c + 1 + 27] = g)
      }
      if(this.D) {
        c = 5 + 36 * this.na;
        e = this.color;
        for(g = 0;4 > g;g++) {
          b[c + 9 * g] = e[0], b[c + 1 + 9 * g] = e[1], b[c + 2 + 9 * g] = e[2], b[c + 3 + 9 * g] = e[3]
        }
      }
      D && (!d && (this.J || this.D)) && a.bufferData(a.ARRAY_BUFFER, this.n, a.STATIC_DRAW)
    }
  }
};
T.prototype.H = function() {
  this.r = i;
  if(Qa && !this.fb) {
    if(0 < this.f.width) {
      var a = new W(1, 1);
      this.append(a);
      a.Kb = this.parent && this.parent.type == S.BLOCKGROUP ? 1 : 0;
      a.ob(function() {
        var a = this.parent.f, b = a.width / 2, a = a.height / 2, b = [[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]];
        this.Kb ? this.pa(b, [1, 0, 0, 1], i) : this.pa(b, [1, 1, 1, 1], i)
      })
    }
    this.fb = i
  }
  this.update && this.update(Xa);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != S.BLOCKGROUP) && this.X();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].H()
    }
    for(this.r = this.J = this.D = this.g = k;a = this.Ca.shift();) {
      this.append(a)
    }
    for(;a = this.Q.shift();) {
      "all" === a ? this.za() : this.remove(a)
    }
  }else {
    this.r = k
  }
};
T.prototype.X = function() {
  if(this.type != S.SCENE) {
    var a, b;
    if(D) {
      a = L;
      var c = $a(ub[this.k]);
      a.bindBuffer(a.ARRAY_BUFFER, this.o);
      a.vertexAttribPointer(c.b.vertexPositionAttribute, 3, a.FLOAT, k, 36, 0);
      a.vertexAttribPointer(c.b.vertexColorAttribute, 4, a.FLOAT, k, 36, 20);
      this.k != U.DEFAULT && this.k == U.TEXTURE && (b = db("texture", this.c), a.vertexAttribPointer(c.b.textureCoordAttribute, 2, a.FLOAT, k, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.O), a.uniform1i(c.Ra, 0));
      (this.g || this.parent && this.parent.g) && sa(Oa, this.d, this.v);
      a.uniformMatrix4fv(c.F, k, this.v);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      a = L;
      b = this.d;
      var d = c = 0;
      this.f && (c = this.f.width, d = this.f.height);
      a.globalAlpha = this.color[3];
      Ka ? a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.m.x) * c, b[13] + (0.5 - this.m.y) * d) : a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.m.x) * c, a.P - (b[13] + (0.5 - this.m.y) * d));
      if(1 == this.k) {
        b = db("texture", this.c);
        var e = this.frame;
        a.drawImage(b, e[0], e[1], e[2], e[3], -c / 2, -d / 2, c, d)
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
o("chesterGL.Block", T);
o("chesterGL.Block.FullFrame", yb);
o("chesterGL.Block.SizeZero", zb);
o("chesterGL.Block.TYPE", S);
o("chesterGL.Block.PROGRAM", U);
o("chesterGL.Block.PROGRAM_NAME", ub);
o("chesterGL.Block.DEG_TO_RAD", vb);
o("chesterGL.Block.RAD_TO_DEG", wb);
o("chesterGL.Block.ONE_DEG", xb);
T.prototype.title = T.prototype.title;
T.prototype.onEnterScene = T.prototype.Nb;
T.prototype.onExitScene = T.prototype.Ob;
T.prototype.children = T.prototype.children;
T.prototype.append = T.prototype.append;
T.prototype.remove = T.prototype.remove;
T.prototype.removeAll = T.prototype.za;
T.prototype.detach = T.prototype.detach;
T.prototype.getBoundingBox = T.prototype.Cb;
T.prototype.setPosition = T.prototype.aa;
T.prototype.getPosition = T.prototype.Fb;
T.prototype.adjustPosition = T.prototype.ub;
T.prototype.toLocal = T.prototype.Wb;
T.prototype.setAnchorPoint = T.prototype.ja;
T.prototype.getAnchorPoint = T.prototype.Bb;
T.prototype.getAbsolutePosition = T.prototype.zb;
T.prototype.setRotation = T.prototype.Ta;
T.prototype.getRotation = T.prototype.Gb;
T.prototype.setColor = T.prototype.Sa;
T.prototype.getColor = T.prototype.Db;
T.prototype.getAlpha = T.prototype.Ab;
T.prototype.setAlpha = T.prototype.Sb;
T.prototype.setFrame = T.prototype.$;
T.prototype.getFrame = T.prototype.ta;
T.prototype.setContentSize = T.prototype.Z;
T.prototype.getContentSize = T.prototype.Eb;
T.prototype.setTexture = T.prototype.ca;
T.prototype.getTexture = T.prototype.Ib;
T.prototype.setScale = T.prototype.Ua;
T.prototype.getScale = T.prototype.Hb;
T.prototype.setUpdate = T.prototype.ob;
T.prototype.setVisible = T.prototype.Ub;
T.prototype.isVisible = T.prototype.Lb;
function X(a, b) {
  D || f("BlockGroup only works on WebGL mode");
  T.call(this, j, S.BLOCKGROUP);
  a ? (this.c = a, this.k = U.TEXTURE) : this.k = U.DEFAULT;
  this.V = b || 10;
  Cb(this)
}
r(X, T);
m = X.prototype;
m.V = 0;
m.va = k;
m.ua = j;
m.t = j;
function Cb(a, b, c) {
  var d = L;
  a.o || (a.o = d.createBuffer());
  a.ua || (a.ua = d.createBuffer());
  var d = new Float32Array(36 * a.V), e = new Uint16Array(6 * a.V);
  b && d.set(b);
  c && e.set(c);
  a.n = d;
  a.t = e
}
m.Fa = function(a) {
  var b = new T(a, S.STANDALONE, this);
  this.c && b.ca(this.c, a);
  return b
};
m.append = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
    this.children.length >= this.V && (this.V *= 2, Cb(this, this.n, this.t));
    this.c ? this.c != c.c && f("Invalid child: only can add child with the same texture") : this.c = c.c;
    this.children.push(c);
    c.na = this.children.length - 1;
    c.n = this.n;
    this.va = i
  }
  return this
};
m.remove = function(a) {
  a.parent != this && f("Invalid child");
  if(this.r) {
    this.Q.push(a)
  }else {
    var b = this.children.indexOf(a);
    if(0 < b) {
      a = this.children.splice(b, 1);
      for(a[0].parent = j;b < this.dc;b++) {
        a = this.children[b], a.na = b, a.g = i, a.D = i
      }
    }
    this.va = i
  }
  return this
};
m.H = function() {
  this.r = i;
  this.update && this.update(Xa);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].H()
    }
    a = L;
    a.bindBuffer(a.ARRAY_BUFFER, this.o);
    a.bufferData(a.ARRAY_BUFFER, this.n, a.STATIC_DRAW);
    if(this.va) {
      var d, a = (this.t[-1] || -1) + 1;
      d = d || Math.max(this.children.length, 1);
      for(b = 0;b < d;b++) {
        c = 6 * b, this.t[c + 0] = a, this.t[c + 1] = a + 1, this.t[c + 2] = a + 2, this.t[c + 3] = a + 2, this.t[c + 4] = a + 1, this.t[c + 5] = a + 3, a += 4
      }
      d = L;
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.ua);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.t, d.STATIC_DRAW);
      this.va = k
    }
    this.X();
    for(this.r = this.J = this.D = this.g = k;d = this.Q.shift();) {
      "all" === d ? this.za() : this.remove(d)
    }
  }else {
    this.r = k
  }
};
m.X = function(a) {
  var b = L, c = $a(ub[this.k]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.o);
  b.vertexAttribPointer(c.b.vertexPositionAttribute, 3, b.FLOAT, k, 36, 0);
  if(this.k != U.DEFAULT && this.k == U.TEXTURE) {
    var d = db("texture", this.c);
    b.vertexAttribPointer(c.b.textureCoordAttribute, 2, b.FLOAT, k, 36, 12);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, d.O);
    b.uniform1i(c.Ra, 0)
  }
  b.vertexAttribPointer(c.b.vertexColorAttribute, 4, b.FLOAT, k, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.ua);
  (this.g || this.parent && this.parent.g) && sa(Oa, this.d, this.v);
  b.uniformMatrix4fv(c.F, k, this.v);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
o("chesterGL.BlockGroup", X);
X.prototype.createBlock = X.prototype.Fa;
X.prototype.append = X.prototype.append;
X.prototype.remove = X.prototype.remove;
function Db(a, b) {
  a = a || "";
  X.call(this, b + ".png", Math.max(100, a.length));
  this.Sa([0, 0, 0, 0]);
  var c, d = db("txt", b + ".fnt").split(/\n|\r/), e, g, h;
  this.da = {};
  this.K = {};
  for(e in d) {
    if(c = d[e].match(/chars count=(\d+)/), !c) {
      if(c = d[e].split(/\s+/), "common" === c[0]) {
        var l = {};
        for(g = 1;g < c.length;g++) {
          h = c[g].split("="), 2 == h.length && (l[h[0]] = parseInt(h[1], 10))
        }
        this.Pb = l
      }else {
        if("char" === c[0]) {
          l = {};
          for(g = 1;g < c.length;g++) {
            h = c[g].split("="), 2 == h.length && (l[h[0]] = parseInt(h[1], 10))
          }
          l.id ? this.da[l.id] = l : console.log("BMFontLabel: invalid char at line " + (e + 1))
        }else {
          if("kerning" === c[0]) {
            l = {};
            for(g = 1;g < c.length;g++) {
              h = c[g].split("="), 2 == h.length && (l[h[0]] = parseInt(h[1], 10))
            }
            this.K[l.first] = this.K[l.first] || {};
            this.K[l.first][l.second] = l.amount
          }
        }
      }
    }
  }
  this.ba(a)
}
r(Db, X);
Db.prototype.ja = function(a, b) {
  Db.G.ja.call(this, a, b);
  this.ba(this.text);
  return this
};
Db.prototype.ba = function(a) {
  var b, c;
  if(!(a === j || void 0 === a)) {
    this.text = a;
    this.za();
    b = a;
    var d = 0, e = 0;
    c = 1;
    var g, h = 0;
    for(g = 0;g < b.length;g++) {
      var l = b.charCodeAt(g);
      if(10 == l || 13 == l) {
        d = Math.max(d, e), e = 0, c++
      }else {
        if(this.da[l]) {
          var n = this.da[l], p = 0;
          0 < h && this.K[h] && (p = this.K[h][l] || 0);
          e += n.xadvance + p;
          h = l
        }
      }
    }
    b = d = Math.max(d, e);
    d = this.Pb.lineHeight;
    p = 0;
    g = -b * this.m.x;
    h = -(c * d * this.m.y);
    a = a.split(/\n|\r/).reverse().join("\n");
    for(e = 0;e < a.length;e++) {
      if(l = a.charCodeAt(e), 10 == l || 13 == l) {
        g = -b * this.m.x, h += d
      }else {
        if(this.da[l]) {
          n = 0;
          0 < p && this.K[p] && (n = this.K[p][l] || 0);
          var p = this.da[l], q = this.Fa([p.x, p.y, p.width, p.height]);
          q.aa(~~(g + p.xoffset + 0.5 * p.width + n), ~~(h + (d - p.yoffset) - 0.5 * p.height), 0);
          g += p.xadvance + n;
          this.append(q)
        }else {
          f("Invalid charcode " + l + " for text " + a)
        }
        p = l
      }
    }
    Da && N.texture[this.c].jb ? this.Z(b, c * d / Aa) : this.Z(b, c * d)
  }
};
o("chesterGL.BMFontLabelBlock", Db);
o("chesterGL.BMFontLabelBlock.loadFont", function(a) {
  P("texture", a + ".png");
  P("txt", a + ".fnt")
});
Db.prototype.setText = Db.prototype.ba;
Db.prototype.setAnchorPoint = Db.prototype.ja;
function Eb(a) {
  T.call(this, j, 4);
  var b = this;
  P("texture", a.texture, j, function() {
    b.lb(a)
  })
}
r(Eb, T);
var Fb = k;
function Gb() {
  ab("particles", function(a) {
    var b = L;
    a.F = b.getUniformLocation(a, "uMVPMatrix");
    a.Xb = b.getUniformLocation(a, "uSampler");
    a.Yb = b.getUniformLocation(a, "u_time");
    a.b = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.bb = k;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  Fb = i
}
m = Eb.prototype;
m.q = i;
m.mb = j;
m.gb = 0;
m.S = 0;
m.N = 0;
m.M = 0;
m.duration = 0;
m.Ka = 0;
m.kb = 0;
m.ka = j;
m.la = j;
m.ya = j;
m.ea = j;
m.fa = j;
m.wa = j;
m.xa = j;
m.qb = 0;
m.rb = 0;
m.hb = 0;
m.ib = 0;
m.Pa = k;
m.elapsedTime = 0;
m.Ea = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
m.lb = function(a) {
  this.k = -1;
  Fb || Gb();
  this.mb = a.texture;
  this.M = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.Ka = 1E3 * parseFloat(a.lifetime);
  this.kb = 1E3 * parseFloat(a.lifetimeVariance);
  this.ka = ma(a.startColor);
  this.la = ma(a.startColorVariance);
  this.ea = ma(a.endColor);
  this.fa = ma(a.endColorVariance);
  this.ya = da(a.positionVariance);
  this.wa = da(a.speed);
  this.xa = da(a.speedVariance);
  this.qb = parseFloat(a.startSize);
  this.rb = parseFloat(a.startSizeVariance);
  this.hb = parseFloat(a.endSize);
  this.ib = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.Ea = a.blendOptions.slice(0);
  this.q = i;
  this.o || (this.o = L.createBuffer());
  this.n = new Float32Array(18 * this.M);
  for(var a = $a("particles"), b = L, c = 0;c < this.M;c++) {
    Hb(this, c)
  }
  b.uniform1i(a.Xb, 0);
  Ib(this, a);
  this.N = this.S = this.elapsedTime = 0;
  this.gb = this.M / Math.abs(this.Ka)
};
function Hb(a, b, c, d) {
  var e = a.n;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.qb + a.rb * R();
  e[18 * b + 3] = a.hb + a.ib * R();
  e[18 * b + 4] = a.wa[0] + a.xa[0] * R();
  e[18 * b + 5] = a.wa[1] + a.xa[1] * R();
  e[18 * b + 6] = a.wa[2] + a.xa[2] * R();
  e[18 * b + 7] = R() * a.ya[0];
  e[18 * b + 8] = R() * a.ya[1];
  e[18 * b + 9] = R() * a.ya[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.ka[0] + R() * a.la[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.ka[1] + R() * a.la[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.ka[2] + R() * a.la[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.ka[3] + R() * a.la[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.ea[0] + R() * a.fa[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.ea[1] + R() * a.fa[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.ea[2] + R() * a.fa[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.ea[3] + R() * a.fa[3]))
}
function Ib(a, b) {
  var c = L;
  c.bindBuffer(c.ARRAY_BUFFER, a.o);
  b.bb || (c.vertexAttribPointer(b.b.a_lifetime, 1, c.FLOAT, k, 72, 0), c.vertexAttribPointer(b.b.a_startTime, 1, c.FLOAT, k, 72, 4), c.vertexAttribPointer(b.b.a_startSize, 1, c.FLOAT, k, 72, 8), c.vertexAttribPointer(b.b.a_endSize, 1, c.FLOAT, k, 72, 12), c.vertexAttribPointer(b.b.a_speed, 3, c.FLOAT, k, 72, 16), c.vertexAttribPointer(b.b.a_startPosition, 3, c.FLOAT, k, 72, 28), c.vertexAttribPointer(b.b.a_startColor, 4, c.FLOAT, k, 72, 40), c.vertexAttribPointer(b.b.a_endColor, 4, c.FLOAT, k, 72, 
  56), b.bb = i);
  c.bufferData(c.ARRAY_BUFFER, a.n, c.STATIC_DRAW)
}
var Jb = new Float32Array(18);
Eb.prototype.update = function(a) {
  if($a("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.gb;
    for(this.S += a;this.N < this.M && this.S > b && this.q;) {
      a = Math.abs(this.Ka + this.kb * R()), Hb(this, this.N++, a, this.elapsedTime), this.Pa = i, this.S -= b
    }
    for(b = 0;b < this.M;b++) {
      var a = this.n, c = 18 * b;
      if(0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.N - 1) {
        var d = a.subarray(c, c + 18);
        Jb.set(d);
        Jb[0] = -1;
        d = a.subarray(c + 18, 18 * this.N);
        a.set(d, c);
        a.set(Jb, 18 * (this.N - 1));
        this.N--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.q = k)
  }
};
Eb.prototype.X = function() {
  var a = $a("particles");
  if(a) {
    var b = L, c = db("texture", this.mb);
    b.blendFunc(b[this.Ea[0]], b[this.Ea[1]]);
    b.uniform1f(a.Yb, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.O);
    this.Pa ? (Ib(this, a), this.Pa = k) : b.bindBuffer(b.ARRAY_BUFFER, this.o);
    (this.g || this.parent && this.parent.g) && sa(Oa, this.d, this.v);
    b.uniformMatrix4fv(a.F, k, this.v);
    b.drawArrays(b.POINTS, 0, this.M);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
o("chesterGL.GPUParticleSystem", Eb);
Eb.loadShaders = Gb;
Eb.prototype.loadProperties = Eb.prototype.lb;
function Y(a, b) {
  this.totalTime = a;
  this.a = b;
  this.j = 0
}
m = Y.prototype;
m.I = 0;
m.a = j;
m.totalTime = 0;
m.j = 0;
m.s = k;
m.q = k;
m.update = function(a) {
  this.j += a;
  0 <= this.totalTime && this.j >= this.totalTime && this.stop()
};
m.Tb = function(a) {
  this.q || (this.totalTime = a)
};
m.e = function() {
  this.q = i
};
m.stop = function() {
  this.s = i;
  this.q = k
};
m.pause = function() {
  this.q = k
};
m.Qa = function() {
  this.q = i
};
m.reset = function() {
  this.s = this.q = k;
  this.j = 0
};
function Z(a, b, c, d) {
  Y.call(this, b, d);
  this.oa = da(a);
  this.U = void 0 !== c ? c === i : i;
  this.Va = new Float32Array(3);
  this.ga = new Float32Array(3)
}
r(Z, Y);
Z.prototype.oa = j;
Z.prototype.ga = j;
Z.prototype.U = i;
Z.prototype.Va = j;
var Kb = new Float32Array(3);
Z.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = this.a, b = Math.min(1, this.j / this.totalTime), c = this.Va, d = this.ga, e = c[0], g = c[1], c = c[2];
  Kb[0] = (d[0] - e) * b + e;
  Kb[1] = (d[1] - g) * b + g;
  Kb[2] = (d[2] - c) * b + c;
  a.aa(Kb[0], Kb[1], Kb[2])
};
Z.prototype.e = function() {
  Y.prototype.e.call(this);
  this.a || f("invalid move action! - no block");
  if(this.U) {
    var a = this.oa, b = this.a.position, c = this.ga;
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2]
  }else {
    ia(this.ga, this.oa)
  }
  ia(this.Va, this.a.position)
};
Z.prototype.stop = function() {
  Y.prototype.stop.call(this);
  this.j >= this.totalTime && this.a.aa(this.ga)
};
Z.prototype.reverse = function() {
  this.U || f("This only works on relative movements");
  var a = [], b = this.oa;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new Z(a, this.totalTime, i)
};
function Lb(a, b, c, d, e) {
  Y.call(this, c, e);
  this.U = d;
  this.Ga = a;
  this.Ha = b;
  this.Xa = this.Wa = this.ra = this.qa = 0
}
r(Lb, Y);
m = Lb.prototype;
m.e = function() {
  Lb.G.e.call(this);
  this.a || f("invalid scale action - no block provided");
  this.U ? (this.qa = this.a.Y + this.Ga, this.ra = this.a.Aa + this.Ha) : (this.qa = this.Ga, this.ra = this.Ha);
  this.Wa = this.a.Y;
  this.Xa = this.a.Aa
};
m.update = function(a) {
  Lb.G.update.call(this, a);
  var a = this.a, b = Math.min(1, this.j / this.totalTime);
  a.Ua(this.Wa + b * (this.qa - this.Wa), this.Xa + b * (this.ra - this.Xa))
};
m.stop = function() {
  Lb.G.stop.call(this);
  this.j >= this.totalTime && this.a.Ua(this.qa, this.ra)
};
m.reset = function() {
  Lb.G.reset.call(this)
};
m.reverse = function() {
  this.U || f("This only works on relative movements");
  return new Lb(-this.Ga, -this.Ha, this.totalTime, i)
};
function Mb(a, b, c) {
  this.cb = a;
  this.ab = c;
  Y.call(this, b || 0)
}
r(Mb, Y);
Mb.prototype.cb = j;
Mb.prototype.ab = j;
Mb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.s && this.cb.call(j, this.ab)
};
function Nb(a) {
  1 > arguments.length && f("you need at least one action to create a sequence");
  var b = 0;
  this.l = [];
  for(var c in arguments) {
    b += arguments[c].totalTime, this.l.push(arguments[c])
  }
  this.ia = this.l[0].totalTime;
  Y.call(this, b)
}
r(Nb, Y);
m = Nb.prototype;
m.l = j;
m.A = 0;
m.e = function() {
  Nb.G.e.call(this);
  this.ia = this.l[0].totalTime;
  this.l[0].a = this.a;
  this.l[0].e()
};
m.reset = function() {
  Nb.G.reset.call(this);
  this.A = 0;
  this.ia = this.l[0].totalTime;
  for(var a = this.totalTime = 0;a < this.l.length;a++) {
    this.l[a].reset(), this.totalTime += this.l[a].totalTime
  }
};
m.update = function(a) {
  Nb.G.update.call(this, a);
  var b = this.l[this.A];
  b.update(a);
  if(this.j >= this.ia) {
    b.s || b.update(1E3);
    for(this.A++;this.A < this.l.length;) {
      b = this.l[this.A];
      b.a = this.a;
      b.e();
      this.ia += b.totalTime;
      if(0 < b.totalTime) {
        break
      }
      b.update(1);
      if(0 === this.A) {
        break
      }
      this.A += 1
    }
  }
};
function Ob(a, b) {
  this.Na = b || 1;
  this.Za = 0;
  this.action = a;
  Y.call(this, a.totalTime)
}
r(Ob, Y);
m = Ob.prototype;
m.Na = 0;
m.Za = 0;
m.action = j;
m.e = function() {
  Y.prototype.e.call(this);
  this.action.a = this.a;
  this.action.e()
};
m.update = function(a) {
  Y.prototype.update.call(this, a);
  this.action.update(a);
  if(this.s && this.action.s && (0 > this.Na || this.Za < this.Na)) {
    this.Za++, this.reset(), this.action.reset(), this.e()
  }
};
function Pb(a, b, c, d) {
  Y.call(this, c, d);
  this.param = a;
  this.Ba = b;
  this.T = "object" === typeof a
}
r(Pb, Y);
Pb.prototype.e = function() {
  Y.prototype.e.call(this);
  if(this.T) {
    this.p = this.a[this.param.getter]()
  }else {
    var a = this.a[this.param];
    a || f("Invalid ElasticAction param!");
    this.p = a
  }
};
Pb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var b = Math.min(1, this.j / this.totalTime), a = this.a, b = this.p + b * (this.Ba - this.p);
  this.T ? a[this.param.setter].call(a, b) : a[this.param] = b
};
function Qb(a, b, c, d) {
  Y.call(this, c, d);
  this.param = a;
  this.Ba = b;
  this.T = "object" === typeof a
}
r(Qb, Y);
Qb.prototype.e = function() {
  Y.prototype.e.call(this);
  var a;
  this.T ? a = this.a[this.param.getter]() : (a = this.a[this.param]) || f("Invalid ElasticAction param!");
  this.Da = k;
  a instanceof Array ? (this.p = a.slice(0), this.Da = i) : a instanceof Float32Array ? (this.p = new Float32Array(a), this.Da = i) : this.p = a
};
Qb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = Math.min(1, this.j / this.totalTime), b = 0.5 * Math.pow(1 - a, 3) + 0.06 * 3 * Math.pow(1 - a, 2) * a + 2.2 * 3 * (1 - a) * Math.pow(a, 2) + 1.5 * Math.pow(a, 3) - 0.5, a = this.a;
  if(this.Da) {
    for(var c = [], d = this.p.length, e = 0;e < d;e++) {
      c[e] = this.p[e] + b * (this.Ba[e] - this.p[e])
    }
    this.T ? a[this.param.setter].apply(a, c) : a[this.param] = c
  }else {
    b = this.p + b * (this.Ba - this.p), this.T ? a[this.param.setter].call(a, b) : a[this.param] = b
  }
};
function Rb(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === i && (a = -1);
  Y.call(this, a, d);
  this.pb = c === i;
  this.frames = b.slice(0)
}
r(Rb, Y);
m = Rb.prototype;
m.R = 0;
m.delay = 0;
m.frames = j;
m.pb = k;
m.update = function(a) {
  Y.prototype.update.call(this, a);
  a = this.a;
  this.s ? (this.R = this.frames.length - 1, a.$(this.frames[this.R])) : this.j >= this.delay * this.R && (a.$(this.frames[this.R++]), this.R == this.frames.length && (this.pb ? this.j = this.R = 0 : this.s = i))
};
function Sb(a, b, c, d) {
  this.$a = a;
  this.eb = b;
  Y.call(this, c, d)
}
r(Sb, Y);
Sb.prototype.$a = 0;
Sb.prototype.eb = 0;
Sb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.s ? this.a.Ta(0) : this.a.Ta(this.$a * Math.sin(2 * (this.j / 1E3 * this.eb) * Math.PI / (this.totalTime / 1E3)))
};
var Q = {z:{}, Jb:0, nb:function(a) {
  if(!a.I || !Q.z.hasOwnProperty(a.I)) {
    a.I = Q.Jb++, Q.z[a.I] = a
  }
  a.e();
  return a.I
}, sb:function(a) {
  Q.z.hasOwnProperty(a) && delete Q.z[a]
}, Vb:function(a) {
  if(!Q.paused) {
    for(var b in Q.z) {
      var c = Q.z[b];
      c.q && c.update(a);
      c.s && delete Q.z[c.I]
    }
  }
}, pause:function() {
  Q.paused = i
}, Qa:function() {
  Q.paused = k
}};
T.prototype.Rb = function(a) {
  a.a = this;
  return Q.nb(a)
};
o("chesterGL.ActionManager", Q);
o("chesterGL.MoveAction", Z);
o("chesterGL.ScaleAction", Lb);
o("chesterGL.CallbackAction", Mb);
o("chesterGL.SequenceAction", Nb);
o("chesterGL.RepeatAction", Ob);
o("chesterGL.AnimateAction", Rb);
o("chesterGL.WiggleAction", Sb);
o("chesterGL.ElasticAction", Qb);
o("chesterGL.ParametricAction", Pb);
Q.scheduleAction = Q.nb;
Q.unscheduleAction = Q.sb;
Q.pause = Q.pause;
Q.resume = Q.Qa;
T.prototype.runAction = T.prototype.Rb;
Y.prototype.stop = Y.prototype.stop;
Y.prototype.reset = Y.prototype.reset;
Y.prototype.begin = Y.prototype.e;
Y.prototype.pause = Y.prototype.pause;
Y.prototype.resume = Y.prototype.Qa;
Y.prototype.setTotalTime = Y.prototype.Tb;
Z.prototype.reverse = Z.prototype.reverse;
Lb.prototype.reverse = Lb.prototype.reverse;
var Ab = {frames:{}, Qb:function(a) {
  "string" === typeof a && (a = JSON.parse(a));
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    P("texture", b, j, function() {
      var c = a.frames, d;
      for(d in c) {
        var e = c[d], g = {frame:{}, c:""};
        g.frame = [e.frame.x, e.frame.y, e.frame.w, e.frame.h];
        e.sourceSize && (g.sourceSize = {width:e.sourceSize.w, height:e.sourceSize.h});
        g.c = b;
        Ab.frames[d] = g
      }
    })
  }else {
    f("Unkown json data")
  }
}, yb:function(a, b) {
  N.frameset[a.name].data = b;
  return i
}, ta:function(a) {
  return Ab.frames[a]
}, Mb:function(a) {
  console.log("loadFrames: will fetch " + a);
  P("frameset", {url:a, dataType:"json"}, j, function(a, c) {
    Ab.Qb(c)
  })
}};
Ra.frameset = Ab.yb;
o("chesterGL.BlockFrames", Ab);
Ab.getFrame = Ab.ta;
Ab.loadFrames = Ab.Mb;
function W(a, b) {
  D || f("PrimitiveBlock only works on WebGL mode");
  this.Ma = a || 500;
  this.La = b || 500;
  T.call(this, j, S.PRIMITIVE);
  var c = L;
  this.Ja = c.createBuffer();
  this.u = new Float32Array(7 * this.Ma);
  this.Ia = c.createBuffer();
  this.i = new Float32Array(14 * this.La);
  this.k = U.DEFAULT
}
r(W, T);
m = W.prototype;
m.Ja = j;
m.u = j;
m.Ia = j;
m.i = j;
m.La = 0;
m.B = 0;
m.Ma = 0;
m.C = 0;
m.W = [];
m.wb = function(a, b, c) {
  if(this.C < this.Ma) {
    var d = 7 * this.C, c = c || [1, 1, 1, 1];
    this.u[d + 0] = a;
    this.u[d + 1] = b;
    this.u[d + 2] = 0;
    this.u[d + 3] = c[0];
    this.u[d + 4] = c[1];
    this.u[d + 5] = c[2];
    this.u[d + 6] = c[3];
    this.C++
  }else {
    f("too many points!")
  }
};
m.vb = function(a, b, c, d, e) {
  if(this.B < this.La) {
    var g = 14 * this.B, e = e || [1, 1, 1, 1];
    this.i[g + 0] = a;
    this.i[g + 1] = b;
    this.i[g + 2] = 0;
    this.i[g + 3] = e[0];
    this.i[g + 4] = e[1];
    this.i[g + 5] = e[2];
    this.i[g + 6] = e[3];
    this.i[g + 7] = c;
    this.i[g + 8] = d;
    this.i[g + 9] = 0;
    this.i[g + 10] = e[0];
    this.i[g + 11] = e[1];
    this.i[g + 12] = e[2];
    this.i[g + 13] = e[3];
    this.B++
  }else {
    f("too many lines!")
  }
};
m.pa = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || k, d = d || k, e = a.length, g = L, h = new Float32Array(7 * a.length), l = g.createBuffer(), n = 0;n < e;n++) {
    var p = a[n];
    h[7 * n + 0] = p[0];
    h[7 * n + 1] = p[1];
    h[7 * n + 2] = p[2];
    h[7 * n + 3] = b[0];
    h[7 * n + 4] = b[1];
    h[7 * n + 5] = b[2];
    h[7 * n + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, l);
  g.bufferData(g.ARRAY_BUFFER, h, g.STATIC_DRAW);
  this.W.unshift([h, l, c, d])
};
m.xb = function(a, b, c, d, e, g) {
  c /= 2;
  d /= 2;
  this.pa([[a - c, b - d, 0], [a - c, b + d, 0], [a + c, b + d, 0], [a + c, b - d, 0]], e, i, g)
};
m.H = function() {
  this.B = this.C = 0;
  0 < this.W.length && (this.W = []);
  T.prototype.H.call(this)
};
m.X = function() {
  var a = L, b = $a(ub[this.k]);
  if(0 < this.C || 0 < this.B || 0 < this.W.length) {
    sa(Oa, this.d, this.v), a.uniformMatrix4fv(b.F, k, this.v)
  }
  if(0 < this.C) {
    var c = L, d = 7 * this.C;
    c.bindBuffer(c.ARRAY_BUFFER, this.Ja);
    c.bufferData(c.ARRAY_BUFFER, this.u.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.Ja);
    a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
    a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
    a.drawArrays(a.POINTS, 0, this.C)
  }
  0 < this.B && (c = L, d = 14 * this.B, c.bindBuffer(c.ARRAY_BUFFER, this.Ia), c.bufferData(c.ARRAY_BUFFER, this.i.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.Ia), a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0), a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.B));
  c = this.W.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.W[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
      a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
o("chesterGL.PrimitiveBlock", W);
W.prototype.drawPoint = W.prototype.wb;
W.prototype.drawLine = W.prototype.vb;
W.prototype.drawPolygon = W.prototype.pa;
W.prototype.drawRectangle = W.prototype.xb;
var Tb, Ub, Vb, Wb;
function Xb() {
  return ba.navigator ? ba.navigator.userAgent : j
}
Wb = Vb = Ub = Tb = k;
var Yb;
if(Yb = Xb()) {
  var Zb = ba.navigator;
  Tb = 0 == Yb.indexOf("Opera");
  Ub = !Tb && -1 != Yb.indexOf("MSIE");
  Vb = !Tb && -1 != Yb.indexOf("WebKit");
  Wb = !Tb && !Vb && "Gecko" == Zb.product
}
var $b = Ub, ac = Wb, bc = Vb;
var cc;
if(Tb && ba.opera) {
  var dc = ba.opera.version;
  "function" == typeof dc && dc()
}else {
  ac ? cc = /rv\:([^\);]+)(\)|;)/ : $b ? cc = /MSIE\s+([^\);]+)(\)|;)/ : bc && (cc = /WebKit\/(\S+)/), cc && cc.exec(Xb())
}
;var ec = j, fc = j;
function gc(a) {
  (a = hc[a]) || f("Invalid map - make sure you call loadTMX first");
  T.call(this, j, S.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = D ? new X(j, c.blocks.length) : new T, e = j, g = 0;g < c.blocks.length;g++) {
      var h = c.blocks[g];
      e || (e = ic(a.tilesets, h.gid), d.ca(e.texture));
      var l;
      D ? l = d.Fa(h.frame) : (l = new T(h.frame), l.ca(e.texture));
      l.aa(h.position);
      d.append(l)
    }
    this.append(d)
  }
}
r(gc, T);
gc.prototype.X = function() {
};
var hc = {};
function ic(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
Ra.tmx = function(a, b) {
  N.tmx[a.name].data = b;
  return i
};
o("chesterGL.TMXBlock", gc);
gc.loadTMX = function(a) {
  P("tmx", {url:a, dataType:"xml"}, j, function(b, c) {
    var d = {}, e = $(c).find("map"), g = e.attr("orientation");
    d.tilesets = [];
    e.find("tileset").each(function(a, b) {
      var c = $(b);
      if("obstruction" != c.attr("name")) {
        var e = {};
        e.tileSize = new ca(parseInt(c.attr("tilewidth"), 10), parseInt(c.attr("tileheight"), 10));
        c.attr("spacing") && (e.spacing = parseInt(c.attr("spacing"), 10));
        c.attr("margin") && (e.margin = parseInt(c.attr("margin"), 10));
        var g = c.find("image").first();
        e.imgSize = new ca(parseInt(g.attr("width"), 10), parseInt(g.attr("height"), 10));
        e.texture = g.attr("source");
        e.firstgid = parseInt(c.attr("firstgid"), 10);
        d.tilesets.push(e)
      }
    });
    d.mapTileSize = new ca(parseInt(e.attr("tilewidth"), 10), parseInt(e.attr("tileheight"), 10));
    d.layers = [];
    e.find("layer").each(function(a, b) {
      if("0" != $(b).attr("visible")) {
        var c = {blocks:[]}, e = new ca(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), q = $(b).find("data").first();
        if(q) {
          ("base64" != q.attr("encoding") || q.attr("compression")) && f("Invalid TMX Data");
          var t = q.text().trim();
          if(!ec) {
            ec = {};
            fc = {};
            for(q = 0;65 > q;q++) {
              ec[q] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q), fc[ec[q]] = q
            }
          }
          for(var w = fc, q = [], u = 0;u < t.length;) {
            var A = w[t.charAt(u++)], B = u < t.length ? w[t.charAt(u)] : 0;
            ++u;
            var v = u < t.length ? w[t.charAt(u)] : 0;
            ++u;
            var C = u < t.length ? w[t.charAt(u)] : 0;
            ++u;
            (A == j || B == j || v == j || C == j) && f(Error());
            q.push(A << 2 | B >> 4);
            64 != v && (q.push(B << 4 & 240 | v >> 2), 64 != C && q.push(v << 6 & 192 | C))
          }
          t = 0;
          w = j;
          for(u = 0;u < e.height;u++) {
            for(A = 0;A < e.width;A++) {
              var z = q[t + 3] << 24 | q[t + 2] << 16 | q[t + 1] << 8 | q[t + 0] >>> 0;
              if(0 !== z) {
                w || (w = ic(d.tilesets, z));
                B = {};
                B.gid = z;
                var x = w.margin || 0, F = w.spacing || 0, v = w.tileSize, H = w.imgSize, C = d.mapTileSize, I = parseInt((H.width - 2 * x + F) / (v.width + F), 10), z = z - w.firstgid, M = z % I * (v.width + F) + x, H = H.height - v.height - x - F - parseInt(z / I, 10) * (v.height + F) + x, I = v.width, F = v.height, x = z = new Float32Array(4);
                x[0] = M;
                x[1] = H;
                x[2] = I;
                x[3] = F;
                B.frame = z;
                var J, K;
                "orthogonal" == g ? (J = A * C.width + v.width / 2, K = (e.height - u - 1) * C.height + v.height / 2) : "isometric" == g ? (J = C.width / 2 * (e.width + A - u - 1) + v.width / 2, K = C.height / 2 * (2 * e.height - A - u - 2) + v.height / 2) : f("Invalid orientation");
                B.position = [J, K, 0];
                c.blocks.push(B)
              }
              t += 4
            }
          }
        }else {
          f("No data for layer!")
        }
        d.layers.push(c)
      }
    });
    hc[a] = d
  })
};
function jc(a, b, c) {
  var b = b || "20px sans-serif", c = c || "White", d = document.createElement("canvas");
  this.canvas = d;
  this.context = d.getContext("2d");
  this.context.textBaseline = "bottom";
  this.font = b;
  this.fillStyle = c;
  (b = b.match(/(\d+)px/)) ? this.Ya = parseInt(b[1], 10) : f("Invalid text height - use the form NNpx");
  this.c = Math.random() + ".canvas";
  N.texture || (N.texture = {});
  N.texture[this.c] = d;
  T.call(this, kc(this, a));
  this.ba(a, k);
  this.k = U.TEXTURE
}
r(jc, T);
m = jc.prototype;
m.canvas = j;
m.context = j;
m.Oa = k;
m.text = "";
m.Ya = 0;
m.font = "";
m.fillStyle = "";
m.ba = function(a, b) {
  this.text = a;
  lc(this);
  b || (this.$(kc(this)), this.Oa = i)
};
function lc(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, c.height);
  c.O || (c.O = L.createTexture(), N.texture[a.c].data = c);
  fb(c);
  a.Oa = k
}
function kc(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.Ya;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  c.textBaseline = "bottom";
  return[0, 0, e, a.Ya]
}
m.H = function() {
  this.Oa && lc(this);
  T.prototype.H.call(this)
};
o("chesterGL.LabelBlock", jc);
jc.prototype.setText = jc.prototype.ba;

//@ sourceMappingURL=chester.js.map
