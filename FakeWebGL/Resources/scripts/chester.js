'use strict';function f(a) {
  throw a;
}
var i = !0, j = null, k = !1;
function aa(a) {
  return function() {
    return this[a]
  }
}
var l, ba = this;
Math.floor(2147483648 * Math.random()).toString(36);
function n(a, b) {
  var c = a.split("."), d = ba;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var e;c.length && (e = c.shift());) {
    !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
}
function o(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.Ya = b.prototype;
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
function da(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
da.prototype.BYTES_PER_ELEMENT = 8;
da.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
da.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (da.BYTES_PER_ELEMENT = 8, da.prototype.BYTES_PER_ELEMENT = da.prototype.BYTES_PER_ELEMENT, da.prototype.set = da.prototype.set, da.prototype.toString = da.prototype.toString, n("Float64Array", da));
function ea(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
ea.prototype.BYTES_PER_ELEMENT = 4;
ea.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
ea.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (ea.BYTES_PER_ELEMENT = 4, ea.prototype.BYTES_PER_ELEMENT = ea.prototype.BYTES_PER_ELEMENT, ea.prototype.set = ea.prototype.set, ea.prototype.toString = ea.prototype.toString, n("Float32Array", ea));
function ja(a) {
  var b = new Float32Array(3);
  ka(b, a);
  return b
}
function la(a, b, c, d) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  return a
}
function ka(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2]
}
function ma(a, b) {
  var c = a[0], d = a[1], e = a[2], c = 1 / Math.sqrt(c * c + d * d + e * e);
  b[0] = a[0] * c;
  b[1] = a[1] * c;
  b[2] = a[2] * c
}
function na(a, b, c) {
  var d = a[0], e = a[1], a = a[2], g = b[0], h = b[1], b = b[2];
  c[0] = e * b - a * h;
  c[1] = a * g - d * b;
  c[2] = d * h - e * g
}
;function oa(a) {
  var b = new Float32Array(4);
  pa(b, a);
  return b
}
function pa(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  a[3] = b[3]
}
;function qa() {
  return new Float32Array(16)
}
function ra(a, b, c, d, e, g, h, p, m, r, q, s, v, u, A, B, w) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = h;
  a[6] = p;
  a[7] = m;
  a[8] = r;
  a[9] = q;
  a[10] = s;
  a[11] = v;
  a[12] = u;
  a[13] = A;
  a[14] = B;
  a[15] = w;
  return a
}
function sa(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function ta(a) {
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
function ua(a, b, c) {
  var d = a[0], e = a[1], g = a[2], h = a[3], p = a[4], m = a[5], r = a[6], q = a[7], s = a[8], v = a[9], u = a[10], A = a[11], B = a[12], w = a[13], C = a[14], a = a[15], z = b[0], y = b[1], F = b[2], H = b[3], I = b[4], M = b[5], J = b[6], K = b[7], fa = b[8], ga = b[9], ha = b[10], ia = b[11], E = b[12], Wa = b[13], Xa = b[14], b = b[15];
  c[0] = d * z + p * y + s * F + B * H;
  c[1] = e * z + m * y + v * F + w * H;
  c[2] = g * z + r * y + u * F + C * H;
  c[3] = h * z + q * y + A * F + a * H;
  c[4] = d * I + p * M + s * J + B * K;
  c[5] = e * I + m * M + v * J + w * K;
  c[6] = g * I + r * M + u * J + C * K;
  c[7] = h * I + q * M + A * J + a * K;
  c[8] = d * fa + p * ga + s * ha + B * ia;
  c[9] = e * fa + m * ga + v * ha + w * ia;
  c[10] = g * fa + r * ga + u * ha + C * ia;
  c[11] = h * fa + q * ga + A * ha + a * ia;
  c[12] = d * E + p * Wa + s * Xa + B * b;
  c[13] = e * E + m * Wa + v * Xa + w * b;
  c[14] = g * E + r * Wa + u * Xa + C * b;
  c[15] = h * E + q * Wa + A * Xa + a * b;
  return c
}
function va(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14];
  return c
}
function wa(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], h = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = h;
  return a
}
function xa(a, b, c, d) {
  return ra(a, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * c, a[5] * c, a[6] * c, a[7] * c, a[8] * d, a[9] * d, a[10] * d, a[11] * d, a[12], a[13], a[14], a[15])
}
function ya(a, b, c, d, e) {
  var g = a[0], h = a[1], p = a[2], m = a[3], r = a[4], q = a[5], s = a[6], v = a[7], u = a[8], A = a[9], B = a[10], w = a[11], C = Math.cos(b), z = Math.sin(b), y = 1 - C, b = c * c * y + C, F = c * d * y + e * z, H = c * e * y - d * z, I = c * d * y - e * z, M = d * d * y + C, J = d * e * y + c * z, K = c * e * y + d * z, c = d * e * y - c * z, e = e * e * y + C;
  return ra(a, g * b + r * F + u * H, h * b + q * F + A * H, p * b + s * F + B * H, m * b + v * F + w * H, g * I + r * M + u * J, h * I + q * M + A * J, p * I + s * M + B * J, m * I + v * M + w * J, g * K + r * c + u * e, h * K + q * c + A * e, p * K + s * c + B * e, m * K + v * c + w * e, a[12], a[13], a[14], a[15])
}
new Float64Array(3);
new Float64Array(3);
var za = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function Aa(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
Aa.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function Ba(a, b) {
  this.x = a;
  this.y = b
}
o(Ba, Aa);
var t;
HTMLCanvasElement.wb = new Ba(0, 0);
function Ca(a) {
  var b = Da, c = b.getBoundingClientRect(), b = Ea && !Fa ? b.height / t : b.height, d = HTMLCanvasElement.wb;
  a.changedTouches && (a = a.changedTouches[0]);
  d.x = a.clientX - c.left;
  d.y = b - (a.clientY - c.top);
  return d
}
var Ga = window;
"undefined" === typeof Ga.requestAnimationFrame && ("undefined" !== typeof Ga.webkitRequestAnimationFrame ? Ga.requestAnimationFrame = Ga.webkitRequestAnimationFrame : "undefined" !== typeof mozRequestAnimationFrame ? Ga.requestAnimationFrame = Ga.mozRequestAnimationFrame : "undefined" !== typeof msRequestAnimationFrame ? Ga.requestAnimationFrame = Ga.msRequestAnimationFrame : "undefined" !== typeof oRequestAnimationFrame ? Ga.requestAnimationFrame = Ga.oRequestAnimationFrame : (console.log("using setTimeout as requestAnimationFrame"), 
Ga.requestAnimationFrame = function(a) {
  window.setTimeout(a, 1E3 / 60)
}));
function Ha(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var Fa = k;
"undefined" !== typeof runScript && (Fa = i, ua = _mat4mul, va = _mat4mulvec3, wa = _mat4translate, ya = _mat4rotate, xa = _mat4scale);
var Ia = {useGoogleAnalytics:k, projection:"3d", webglMode:i, usesOffscreenBuffer:k, basePath:"", canvasOriginTopLeft:k, backgroundColor:[0, 0, 0, 1]}, Ja = "3d", x = i, Ka = "", La = k, D = oa([0, 0, 0, 1]), G = j, Ma = k, Na = {}, Oa = j, Pa = j, Qa = j, Da = j, Ra = k, Ea = k, L = {}, Sa = {}, Ta = {}, Ua = {}, Va = Date.now(), Ya = 0, Za = {bc:0, ec:1, fc:2, cc:3, dc:4}, $a = j, N = [];
function ab(a) {
  var b = Na[a], c = G;
  if(a != Oa) {
    Oa = a;
    c.useProgram(b);
    for(var d in b.b) {
      c.enableVertexAttribArray(b.b[d])
    }
  }
  return b
}
function bb(a, b) {
  var c = G, d = cb(a, "frag"), e = cb(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  if(c.getShaderParameter(g, c.COMPILE_STATUS)) {
    d = c.createShader(c.VERTEX_SHADER);
    c.shaderSource(d, e);
    c.compileShader(d);
    if(c.getShaderParameter(d, c.COMPILE_STATUS)) {
      c = G;
      e = c.createProgram();
      c.attachShader(e, g);
      c.attachShader(e, d);
      c.linkProgram(e);
      c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
      Na[a] = e;
      b && b(e)
    }else {
      console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
    }
  }else {
    console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
  }
}
function cb(a, b) {
  var c = "", d = new XMLHttpRequest;
  d.open("GET", Ka + "shaders/" + a + "." + b, k);
  d.onreadystatechange = function() {
    d.readyState == 4 && d.status == 200 ? c = d.responseText : d.readyState == 4 && console.log("error getting the shader data")
  };
  d.send();
  return c
}
function O(a, b, c, d) {
  if(typeof c == "function") {
    d = c;
    c = j
  }
  b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url, sa:b.sa || k} : {url:b, name:c || b};
  L[a] || (L[a] = {});
  c = RegExp("@" + t + "x\\..+$");
  if(Ea && !b.sa && b.url.match(c) === j) {
    if((c = b.url.match(/(\..+$)/)) && Ea) {
      b.url = b.url.replace(/(\..+$)/, "@" + t + "x$1")
    }
  }
  var c = L[a], e = b.name;
  if(c[e]) {
    if(c[e].status == "loading") {
      d && c[e].K.push(d)
    }else {
      if(c[e].status == "loaded") {
        d && d(j, c[e].data)
      }else {
        if(c[e].status == "try") {
          c[e].status = "loading";
          if(Ta[a]) {
            Ta[a](a, b)
          }else {
            Ta["default"](a, b)
          }
          d && c[e].K.push(d)
        }
      }
    }
  }else {
    c[e] = {data:j, name:e, status:"try", K:[]};
    d && c[e].K.push(d);
    O(a, b)
  }
}
function db(a, b) {
  var c = Ua[a], d, e;
  if(!c) {
    Ua[a] = [];
    c = Ua[a]
  }
  b && c.push(b);
  var g = i;
  if(a == "all") {
    for(var h in L) {
      d = L[h];
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
    d = L[a];
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
function eb(a, b) {
  return b ? L[a][b].data : j
}
function fb(a, b) {
  return b ? b in L[a] : k
}
function gb(a) {
  var b = G, c = i;
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
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
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
function hb(a, b, c) {
  L[c][a.name].data = b;
  return i
}
function ib(a, b) {
  if(x && !b.O) {
    b.O = G.createTexture()
  }
  L.texture[a.name].data = b;
  return x ? gb(b) : i
}
function jb(a, b) {
  var c = new Image, d = b.url, e = b.name, g = RegExp("@" + t + "x\\..+$");
  c.src = "";
  c.addEventListener("load", function() {
    var h = L.texture[e];
    if(Sa[a](b, c)) {
      h.status = "loaded";
      h.lb = !(!d.match(g) || !Ea);
      for(var p;p = h.K.shift();) {
        p(j, h.data)
      }
      db(a);
      db("all")
    }else {
      h.status = "try";
      O(a, b)
    }
  }, k);
  c.addEventListener("error", function(a) {
    var c = L.texture[e];
    if(a.type === "error" && Ea && d.match(g)) {
      b.url = d.replace("@" + t + "x", "");
      b.sa = i;
      c.status = "try";
      O("texture", b)
    }else {
      c.status = "error";
      for(var m;m = c.K.shift();) {
        m({url:e, type:a.type}, c.data)
      }
    }
  }, i);
  if(d.match(/^http(s)?:/)) {
    c.crossOrigin = "anonymous";
    c.src = d
  }else {
    c.src = d.match(/^data:/) ? d : Ka + d
  }
}
function kb(a, b) {
  var c = b.url, d = c, e = b.name, g = RegExp("@" + t + "x\\..+$");
  c.match(/^http(s)?:\/\//) || (d = Ka + c);
  var h = new XMLHttpRequest;
  h.open("GET", d);
  h.withCredentials = i;
  h.onreadystatechange = function() {
    var d = L[a][e];
    if(h.readyState == 4 && h.status == 200) {
      if((Sa[a] || Sa["default"])(b, h.response, a)) {
        d.status = "loaded";
        for(var m;m = d.K.shift();) {
          m(j, d.data)
        }
        db(a);
        db("all")
      }else {
        d.status = "try";
        O(a, b)
      }
    }else {
      if(h.readyState == 4) {
        if(h.status == 404 && Ea && c.match(g)) {
          b.url = c.replace("@" + t + "x", "");
          b.sa = i;
          d.status = "try";
          O(a, b)
        }else {
          for(console.log("Error loading asset " + c);m = d.K.shift();) {
            m({url:c, type:h.status}, d.data)
          }
        }
      }
    }
  };
  h.send()
}
function lb() {
  var a = G;
  if(x) {
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
  }else {
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.fillStyle = D;
    a.clearRect(0, 0, a.ma, a.P);
    a.fillRect(0, 0, a.ma, a.P)
  }
  if(Qa) {
    Qa.G();
    if(!Qa.I) {
      Qa.onEnterScene()
    }
  }
  a = Date.now();
  Ya = a - Va;
  Va = a
}
var mb = new Float32Array(3);
function nb(a, b) {
  mb[0] = a;
  mb[1] = b;
  mb[2] = 0
}
function ob(a) {
  var a = Ca(a), b = N.length;
  nb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === N[a].call(j, mb, 0)) {
      break
    }
  }
}
function pb(a) {
  var a = Ca(a), b = N.length;
  nb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === N[a].call(j, mb, 1)) {
      break
    }
  }
}
function qb(a) {
  var a = Ca(a), b = N.length;
  nb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === N[a].call(j, mb, 2)) {
      break
    }
  }
}
function rb(a) {
  var a = Ca(a), b = N.length;
  nb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === N[a].call(j, mb, 3)) {
      break
    }
  }
}
function sb(a) {
  var a = Ca(a), b = N.length;
  nb(a.x, a.y);
  for(a = b - 1;a >= 0;a--) {
    if(i === N[a].call(j, mb, 4)) {
      break
    }
  }
}
function tb() {
  if(!Ma) {
    requestAnimationFrame(tb, Da);
    $a && $a.begin();
    lb();
    P.Yb(Ya);
    $a && $a.end()
  }
}
function Q() {
  return Math.random() * 2 - 1
}
function ub(a) {
  if(x) {
    pa(D, a);
    G.clearColor(D[0], D[1], D[2], D[3])
  }else {
    D = "rgba(" + a[0] * 255 + ", " + a[1] * 255 + ", " + a[2] * 255 + ", " + a[3] + ")"
  }
}
n("chesterGL.version", "0.3");
n("chesterGL.settings", Ia);
n("chesterGL.mouseEvents", Za);
n("chesterGL.onFakeWebGL", Fa);
Za.UP = 2;
Za.DOWN = 0;
Za.MOVE = 1;
Za.ENTER = 3;
Za.LEAVE = 4;
n("chesterGL.viewportSize", function() {
  return new ca(G.ma, G.P)
});
n("chesterGL.setup", function(a) {
  a = Fa ? new FakeCanvas(innerWidth, innerHeight) : document.getElementById(a);
  Ja = Ia.projection;
  x = Ia.webglMode;
  Ka = Ia.basePath;
  La = Ia.canvasOriginTopLeft;
  var b = 0, c = 0;
  try {
    if(window.devicePixelRatio && window.devicePixelRatio > 1) {
      var d = window.devicePixelRatio, b = a.width, c = a.height;
      console.log("canvas width: " + a.width);
      a.style.width = a.width + "px";
      a.style.height = a.height + "px";
      a.width = a.clientWidth * d;
      a.height = a.clientHeight * d;
      Ea = i;
      t = window.devicePixelRatio;
      console.log("using HighDPI resolution (devicePixelRatio: " + d + ")");
      console.log("  canvas size: " + a.width + "," + a.height)
    }else {
      b = a.width;
      c = a.height
    }
    Da = a;
    if(x) {
      if((G = a.getContext("experimental-webgl", {alpha:i, antialias:k, preserveDrawingBuffer:i, premultipliedAlpha:k})) && typeof WebGLDebugUtils !== "undefined") {
        console.log("installing debug context");
        G = WebGLDebugUtils.makeDebugContext(G, Ha)
      }
    }
  }catch(e) {
    console.log("ERROR: " + e)
  }
  if(!G) {
    (G = a.getContext("2d")) || f("Error initializing graphic context!");
    x = Ia.webglMode = k
  }
  G.ma = b;
  G.P = c;
  if(Fa) {
    _touchBeganListeners.push(ob);
    _touchMovedListeners.push(pb);
    _touchEndedListeners.push(qb)
  }else {
    if(typeof navigator !== "undefined" && navigator.platform.match(/iPhone|iPad/)) {
      document.addEventListener("touchstart", ob, k);
      document.addEventListener("touchmove", function(a) {
        pb(a);
        a.preventDefault()
      }, k);
      document.addEventListener("touchend", qb, k)
    }else {
      $(Da).mousedown(ob);
      $(Da).mousemove(pb);
      $(Da).mouseup(qb);
      $(Da).mouseenter(rb);
      $(Da).mouseleave(sb)
    }
  }
  if(x) {
    var g = G;
    bb("default", function(a) {
      a.F = g.getUniformLocation(a, "uMVPMatrix");
      a.b = {vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:g.getAttribLocation(a, "aVertexColor")};
      a.mvpMatrixUniform = a.F;
      a.attribs = a.b
    });
    bb("texture", function(a) {
      a.F = g.getUniformLocation(a, "uMVPMatrix");
      a.Sa = g.getUniformLocation(a, "uSampler");
      a.b = {vertexColorAttribute:g.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:g.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:g.getAttribLocation(a, "aVertexPosition")};
      a.mvpMatrixUniform = a.F;
      a.samplerUniform = a.Sa;
      a.attribs = a.b
    })
  }
  ub(Ia.backgroundColor);
  if(!Fa) {
    var d = window.location.search.substring(1).split("&"), h;
    for(h in d) {
      a = d[h].split("=");
      if(a[0] == "_cdbg" && a[1] == "1") {
        Ra = i;
        console.log("debug mode on")
      }
    }
  }
  Sa.texture = ib;
  Sa["default"] = hb;
  Ta.texture = jb;
  Ta["default"] = kb;
  if(typeof Stats !== "undefined") {
    console.log("chesterGL: adding stats");
    $a = new Stats;
    $a.setMode(1);
    if(!Fa) {
      $a.domElement.style.position = "absolute";
      $a.domElement.style.left = "0px";
      $a.domElement.style.top = "0px";
      document.body.appendChild($a.domElement)
    }
    n("chesterGL.stats", $a)
  }
});
n("chesterGL.canvasResized", function() {
  var a = Da;
  G.ma = a.width;
  G.P = a.height
});
n("chesterGL.initShader", bb);
n("chesterGL.registerAssetHandler", function(a, b) {
  Sa[a] = b
});
n("chesterGL.loadAsset", O);
n("chesterGL.assetsLoaded", db);
n("chesterGL.getAsset", eb);
n("chesterGL.hasAsset", fb);
n("chesterGL.setupPerspective", function() {
  var a = G;
  if(x) {
    a.clearColor(D[0], D[1], D[2], D[3]);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.ma, c = a.P;
    a.viewport(0, 0, Da.width, Da.height);
    Pa = qa();
    Ja = Ia.projection;
    if(Ja == "2d") {
      console.log("setting up 2d projection (" + b + "," + c + ")");
      ra(Pa, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
    }else {
      if(Ja == "3d") {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = qa(), e = b / c, g = 60 * Math.PI / 180 / 2, h = Math.sin(g);
        if(!(h == 0 || e == 0)) {
          g = Math.cos(g) / h;
          a = ra(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0)
        }
        d = [b / 2, c / 2, d];
        e = [b / 2, c / 2, 0];
        b = qa();
        c = za[0];
        c[0] = e[0] - d[0];
        c[1] = e[1] - d[1];
        c[2] = e[2] - d[2];
        ma(c, c);
        c[3] = 0;
        e = za[1];
        na(c, [0, 1, 0], e);
        ma(e, e);
        e[3] = 0;
        g = za[2];
        na(e, c, g);
        ma(g, g);
        g[3] = 0;
        c[0] = -c[0];
        c[1] = -c[1];
        c[2] = -c[2];
        sa(b, 0, e);
        sa(b, 1, g);
        sa(b, 2, c);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[15] = 1;
        wa(b, -d[0], -d[1], -d[2]);
        ua(a, b, Pa)
      }else {
        f("Invalid projection: " + Ja)
      }
    }
  }
});
n("chesterGL.setRunningScene", function(a) {
  if(Qa && Qa != a) {
    Qa.onExitScene()
  }
  a.type == R.SCENE && (Qa = a)
});
n("chesterGL.drawScene", lb);
n("chesterGL.run", tb);
n("chesterGL.togglePause", function() {
  if(Ma) {
    Ma = k;
    Va = Date.now();
    tb()
  }else {
    Ma = i
  }
});
n("chesterGL.isPaused", function() {
  return Ma
});
n("chesterGL.setPause", function(a) {
  if(Ma && !a) {
    Ma = a;
    Va = Date.now();
    tb()
  }else {
    Ma = a
  }
});
n("chesterGL.getRunningScene", function() {
  return Qa
});
n("chesterGL.getCurrentContext", function() {
  return G
});
n("chesterGL.addMouseHandler", function(a) {
  N.indexOf(a) == -1 && N.push(a)
});
n("chesterGL.removeMouseHandler", function(a) {
  a = N.indexOf(a);
  a >= 0 && N.splice(a, 1)
});
n("chesterGL.setBackgroundColor", ub);
n("chesterGL.getBackgroundColor", function() {
  return D
});
function S(a, b, c) {
  this.type = b || R.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.k = T.DEFAULT;
  this.$(0, 0);
  this.type == R.STANDALONE && this.Ta([1, 1, 1, 1]);
  a && ("string" === typeof a && fb("texture", a) ? this.ca(a) : this.aa(a));
  this.N(0, 0, 0);
  this.ia(0.5, 0.5);
  if(x && (!c || c.type != R.BLOCKGROUP)) {
    this.p = G.createBuffer(), this.o = new Float32Array(36)
  }
  this.d = qa();
  this.v = qa();
  this.d = ta(qa());
  this.Ca = [];
  this.Q = []
}
var T = {DEFAULT:0, TEXTURE:1}, vb = ["default", "texture"], R = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, wb = Math.PI / 180, xb = 180 / Math.PI, yb = 1 * wb, zb = new Float32Array(4);
zb[0] = 0;
zb[1] = 0;
zb[2] = 1;
zb[3] = 1;
var Ab = new ca(0, 0);
l = S.prototype;
l.title = "";
l.gb = k;
l.d = j;
l.v = j;
l.visible = i;
l.I = k;
l.g = k;
l.D = k;
l.H = k;
l.na = 0;
l.p = j;
l.o = j;
l.position = j;
l.m = j;
l.f = j;
l.color = j;
l.c = j;
l.rotation = 0;
l.Z = 1;
l.Aa = 1;
l.update = j;
l.frame = j;
l.parent = j;
l.children = j;
l.Ca = j;
l.Q = j;
l.r = k;
l.Qb = function() {
  this.I = i;
  for(var a in this.children) {
    this.children[a].onEnterScene()
  }
};
l.Rb = function() {
  this.I = k;
  for(var a in this.children) {
    this.children[a].onExitScene()
  }
  for(var b in P.z) {
    P.z[b].a == this && P.vb(b)
  }
};
l.aa = function(a, b) {
  if("string" === typeof a) {
    var c = Bb.ta(a);
    c || f("Invalid frame name: " + a);
    a = c.frame;
    this.ca(c.c, a)
  }else {
    this.frame ? pa(this.frame, a) : this.frame = oa(a), b ? this.$(a[2] / t, a[3] / t) : this.$(a[2], a[3])
  }
  this.H = i;
  return this
};
l.ta = aa("frame");
l.$ = function(a, b) {
  this.f = new ca(a, b);
  this.H = i;
  return this
};
l.Hb = aa("f");
l.ja = function(a, b) {
  this.Z = a;
  this.Aa = 2 == arguments.length ? b : this.Z;
  this.g = i;
  return this
};
l.Kb = aa("Z");
l.Ta = function(a) {
  this.color ? pa(this.color, a) : this.color = oa(a);
  this.D = i;
  return this
};
l.Gb = aa("color");
l.Db = function() {
  return this.color[3]
};
l.Ub = function(a) {
  this.color || f("Need to set the color before alpha");
  this.color[3] = a;
  this.D = i;
  return this
};
l.N = function(a, b, c) {
  if(this.position) {
    1 == arguments.length ? ka(this.position, a) : la(this.position, a, b, c)
  }else {
    var d;
    1 == arguments.length ? d = ja(a) : (d = new Float32Array(3), la(d, a, b, c));
    this.position = d
  }
  this.g = i;
  return this
};
l.xb = function(a, b, c) {
  this.position || f("call setPosition before adjusting it!");
  this.position[0] += a || 0;
  this.position[1] += b || 0;
  this.position[2] += c || 0;
  this.g = i
};
l.ia = function(a, b) {
  this.m = new Ba(a, b);
  return this
};
l.Eb = aa("m");
l.Ib = aa("position");
l.Cb = function() {
  var a = ja(this.position), b = this.d, c = qa();
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
    ua(b.d, c, c), b = b.parent
  }
  va(c, a, a);
  return a
};
var U = new Float32Array(16);
l = S.prototype;
l.Zb = function(a, b) {
  b = b || a;
  var c = this.d, d = c[0], e = c[1], g = c[2], h = c[3], p = c[4], m = c[5], r = c[6], q = c[7], s = c[8], v = c[9], u = c[10], A = c[11], B = c[12], w = c[13], C = c[14], c = c[15], z = d * m - e * p, y = d * r - g * p, F = d * q - h * p, H = e * r - g * m, I = e * q - h * m, M = g * q - h * r, J = s * w - v * B, K = s * C - u * B, fa = s * c - A * B, ga = v * C - u * w, ha = v * c - A * w, ia = u * c - A * C, E = z * ia - y * ha + F * ga + H * fa - I * K + M * J;
  0 != E && (E = 1 / E, U[0] = (m * ia - r * ha + q * ga) * E, U[1] = (-e * ia + g * ha - h * ga) * E, U[2] = (w * M - C * I + c * H) * E, U[3] = (-v * M + u * I - A * H) * E, U[4] = (-p * ia + r * fa - q * K) * E, U[5] = (d * ia - g * fa + h * K) * E, U[6] = (-B * M + C * F - c * y) * E, U[7] = (s * M - u * F + A * y) * E, U[8] = (p * ha - m * fa + q * J) * E, U[9] = (-d * ha + e * fa - h * J) * E, U[10] = (B * I - w * F + c * z) * E, U[11] = (-s * I + v * F - A * z) * E, U[12] = (-p * ga + m * 
  K - r * J) * E, U[13] = (d * ga - e * K + g * J) * E, U[14] = (-B * H + w * y - C * z) * E, U[15] = (s * H - v * y + u * z) * E);
  va(U, a, b);
  b[0] += this.f.width * this.m.x;
  b[1] += this.f.height * this.m.y;
  return b
};
l.Fb = function() {
  var a = this.position, b = this.f.width, c = this.f.height;
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
l.ca = function(a, b) {
  if(a == this.c && (!b || this.frame == b)) {
    return this
  }
  this.c = a;
  this.k = T.TEXTURE;
  O("texture", a, j, function(a, d) {
    this.aa(b || [0, 0, d.width, d.height], Ea && L.texture[this.c].lb)
  }.bind(this));
  return this
};
l.Lb = aa("c");
l.Ua = function(a) {
  this.rotation = a;
  this.g = i;
  return this
};
l.Jb = aa("rotation");
l.rb = function(a) {
  this.update = a;
  return this
};
l.Xb = function(a) {
  this.visible = a;
  return this
};
l.Ob = aa("visible");
l.append = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent && f("can't add a block twice!");
    this.r ? this.Ca.push(c) : (this.children.push(c), c.parent = this);
    if(this.I) {
      c.onEnterScene()
    }
  }
  return this
};
l.remove = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.r) {
    this.Q.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = j)
  }
  if(this.I) {
    a.onExitScene()
  }
  return this
};
l.detach = function() {
  this.parent && this.parent.remove(this)
};
l.za = function() {
  if(this.r) {
    this.Q.push("all")
  }else {
    for(var a = 0, a = 0;a < this.children.length;a++) {
      this.children[a].parent = j
    }
    this.children.length = 0
  }
};
var Cb = [new Float32Array(3), new Float32Array(3), new Float32Array(3), new Float32Array(3)];
S.prototype.transform = function() {
  var a = G, b, c, d = this.parent && this.parent.type == R.BLOCKGROUP, e = this.f ? (0.5 - this.m.x) * this.f.width : 0, g = this.f ? (0.5 - this.m.y) * this.f.height : 0;
  if(this.g || this.parent && this.parent.g) {
    this.g = i, b = this.position[0], c = this.position[1], x && La && (c = a.P / 2 - c), ta(this.d), wa(this.d, b, c, this.position[2]), ya(this.d, -1 * this.rotation, 0, 0, 1), xa(this.d, this.Z, this.Aa, 1), (b = this.parent ? this.parent.d : j) && !d && ua(b, this.d, this.d)
  }
  if(!(this.type == R.BLOCKGROUP || this.type == R.PRIMITIVE)) {
    if(b = this.o, x) {
      !d && (this.H || this.D) && a.bindBuffer(a.ARRAY_BUFFER, this.p);
      if(this.H || this.g) {
        var h = 0.5 * this.f.width, p = 0.5 * this.f.height, m = this.position[2];
        c = 36 * this.na;
        if(d) {
          var r = la(Cb[0], h + e, p + g, m), q = la(Cb[1], -h + e, p + g, m), s = la(Cb[2], h + e, -p + g, m), e = la(Cb[3], -h + e, -p + g, m);
          va(this.d, r, r);
          va(this.d, q, q);
          va(this.d, e, e);
          va(this.d, s, s);
          b[c] = e[0];
          b[c + 1] = e[1];
          b[c + 2] = m;
          b[c + 9] = q[0];
          b[c + 1 + 9] = q[1];
          b[c + 2 + 9] = m;
          b[c + 18] = s[0];
          b[c + 1 + 18] = s[1];
          b[c + 2 + 18] = m;
          b[c + 27] = r[0];
          b[c + 1 + 27] = r[1]
        }else {
          b[c] = -h + e, b[c + 1] = -p + g, b[c + 2] = m, b[c + 9] = -h + e, b[c + 1 + 9] = p + g, b[c + 2 + 9] = m, b[c + 18] = h + e, b[c + 1 + 18] = -p + g, b[c + 2 + 18] = m, b[c + 27] = h + e, b[c + 1 + 27] = p + g
        }
        b[c + 2 + 27] = m;
        this.k == T.TEXTURE && (e = eb("texture", this.c), m = e.width, r = e.height, e = this.frame[0] / m, g = this.frame[1] / r, m = this.frame[2] / m, r = this.frame[3] / r, c += 3, b[c] = e, b[c + 1] = g + r, b[c + 9] = e, b[c + 1 + 9] = g, b[c + 18] = e + m, b[c + 1 + 18] = g + r, b[c + 27] = e + m, b[c + 1 + 27] = g)
      }
      if(this.D) {
        c = 5 + 36 * this.na;
        e = this.color;
        for(g = 0;4 > g;g++) {
          b[c + 9 * g] = e[0], b[c + 1 + 9 * g] = e[1], b[c + 2 + 9 * g] = e[2], b[c + 3 + 9 * g] = e[3]
        }
      }
      x && (!d && (this.H || this.D)) && a.bufferData(a.ARRAY_BUFFER, this.o, a.STATIC_DRAW)
    }
  }
};
S.prototype.G = function() {
  this.r = i;
  if(Ra && !this.gb) {
    if(0 < this.f.width) {
      var a = new V(1, 1);
      this.append(a);
      a.Nb = this.parent && this.parent.type == R.BLOCKGROUP ? 1 : 0;
      a.rb(function() {
        var a = this.parent.f, b = a.width / 2, a = a.height / 2, b = [[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]];
        this.Nb ? this.pa(b, [1, 0, 0, 1], i) : this.pa(b, [1, 1, 1, 1], i)
      })
    }
    this.gb = i
  }
  this.update && this.update(Ya);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != R.BLOCKGROUP) && this.Y();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].G()
    }
    for(this.r = this.H = this.D = this.g = k;a = this.Ca.shift();) {
      this.append(a)
    }
    for(;a = this.Q.shift();) {
      "all" === a ? this.za() : this.remove(a)
    }
  }else {
    this.r = k
  }
};
S.prototype.Y = function() {
  if(this.type != R.SCENE) {
    var a, b;
    if(x) {
      a = G;
      var c = ab(vb[this.k]);
      a.bindBuffer(a.ARRAY_BUFFER, this.p);
      a.vertexAttribPointer(c.b.vertexPositionAttribute, 3, a.FLOAT, k, 36, 0);
      a.vertexAttribPointer(c.b.vertexColorAttribute, 4, a.FLOAT, k, 36, 20);
      this.k != T.DEFAULT && this.k == T.TEXTURE && (b = eb("texture", this.c), a.vertexAttribPointer(c.b.textureCoordAttribute, 2, a.FLOAT, k, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.O), a.uniform1i(c.Sa, 0));
      (this.g || this.parent && this.parent.g) && ua(Pa, this.d, this.v);
      a.uniformMatrix4fv(c.F, k, this.v);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      a = G;
      b = this.d;
      var d = c = 0;
      this.f && (c = this.f.width, d = this.f.height);
      a.globalAlpha = this.color[3];
      La ? a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.m.x) * c, b[13] + (0.5 - this.m.y) * d) : a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.m.x) * c, a.P - (b[13] + (0.5 - this.m.y) * d));
      if(1 == this.k) {
        b = eb("texture", this.c);
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
n("chesterGL.Block", S);
n("chesterGL.Block.FullFrame", zb);
n("chesterGL.Block.SizeZero", Ab);
n("chesterGL.Block.TYPE", R);
n("chesterGL.Block.PROGRAM", T);
n("chesterGL.Block.PROGRAM_NAME", vb);
n("chesterGL.Block.DEG_TO_RAD", wb);
n("chesterGL.Block.RAD_TO_DEG", xb);
n("chesterGL.Block.ONE_DEG", yb);
S.prototype.title = S.prototype.title;
S.prototype.onEnterScene = S.prototype.Qb;
S.prototype.onExitScene = S.prototype.Rb;
S.prototype.children = S.prototype.children;
S.prototype.append = S.prototype.append;
S.prototype.remove = S.prototype.remove;
S.prototype.removeAll = S.prototype.za;
S.prototype.detach = S.prototype.detach;
S.prototype.getBoundingBox = S.prototype.Fb;
S.prototype.setPosition = S.prototype.N;
S.prototype.getPosition = S.prototype.Ib;
S.prototype.adjustPosition = S.prototype.xb;
S.prototype.toLocal = S.prototype.Zb;
S.prototype.setAnchorPoint = S.prototype.ia;
S.prototype.getAnchorPoint = S.prototype.Eb;
S.prototype.getAbsolutePosition = S.prototype.Cb;
S.prototype.setRotation = S.prototype.Ua;
S.prototype.getRotation = S.prototype.Jb;
S.prototype.setColor = S.prototype.Ta;
S.prototype.getColor = S.prototype.Gb;
S.prototype.getAlpha = S.prototype.Db;
S.prototype.setAlpha = S.prototype.Ub;
S.prototype.setFrame = S.prototype.aa;
S.prototype.getFrame = S.prototype.ta;
S.prototype.setContentSize = S.prototype.$;
S.prototype.getContentSize = S.prototype.Hb;
S.prototype.setTexture = S.prototype.ca;
S.prototype.getTexture = S.prototype.Lb;
S.prototype.setScale = S.prototype.ja;
S.prototype.getScale = S.prototype.Kb;
S.prototype.setUpdate = S.prototype.rb;
S.prototype.setVisible = S.prototype.Xb;
S.prototype.isVisible = S.prototype.Ob;
function W(a, b) {
  x || f("BlockGroup only works on WebGL mode");
  S.call(this, j, R.BLOCKGROUP);
  a ? (this.c = a, this.k = T.TEXTURE) : this.k = T.DEFAULT;
  this.W = b || 10;
  Db(this)
}
o(W, S);
l = W.prototype;
l.W = 0;
l.va = k;
l.ua = j;
l.t = j;
function Db(a, b, c) {
  var d = G;
  a.p || (a.p = d.createBuffer());
  a.ua || (a.ua = d.createBuffer());
  var d = new Float32Array(36 * a.W), e = new Uint16Array(6 * a.W);
  b && d.set(b);
  c && e.set(c);
  a.o = d;
  a.t = e
}
l.Fa = function(a) {
  var b = new S(a, R.STANDALONE, this);
  this.c && b.ca(this.c, a);
  return b
};
l.append = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
    this.children.length >= this.W && (this.W *= 2, Db(this, this.o, this.t));
    this.c ? this.c != c.c && f("Invalid child: only can add child with the same texture") : this.c = c.c;
    this.children.push(c);
    c.na = this.children.length - 1;
    c.o = this.o;
    this.va = i
  }
  return this
};
l.remove = function(a) {
  a.parent != this && f("Invalid child");
  if(this.r) {
    this.Q.push(a)
  }else {
    var b = this.children.indexOf(a);
    if(0 < b) {
      a = this.children.splice(b, 1);
      for(a[0].parent = j;b < this.gc;b++) {
        a = this.children[b], a.na = b, a.g = i, a.D = i
      }
    }
    this.va = i
  }
  return this
};
l.G = function() {
  this.r = i;
  this.update && this.update(Ya);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].G()
    }
    a = G;
    a.bindBuffer(a.ARRAY_BUFFER, this.p);
    a.bufferData(a.ARRAY_BUFFER, this.o, a.STATIC_DRAW);
    if(this.va) {
      var d, a = (this.t[-1] || -1) + 1;
      d = d || Math.max(this.children.length, 1);
      for(b = 0;b < d;b++) {
        c = 6 * b, this.t[c + 0] = a, this.t[c + 1] = a + 1, this.t[c + 2] = a + 2, this.t[c + 3] = a + 2, this.t[c + 4] = a + 1, this.t[c + 5] = a + 3, a += 4
      }
      d = G;
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.ua);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.t, d.STATIC_DRAW);
      this.va = k
    }
    this.Y();
    for(this.r = this.H = this.D = this.g = k;d = this.Q.shift();) {
      "all" === d ? this.za() : this.remove(d)
    }
  }else {
    this.r = k
  }
};
l.Y = function(a) {
  var b = G, c = ab(vb[this.k]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.p);
  b.vertexAttribPointer(c.b.vertexPositionAttribute, 3, b.FLOAT, k, 36, 0);
  if(this.k != T.DEFAULT && this.k == T.TEXTURE) {
    var d = eb("texture", this.c);
    b.vertexAttribPointer(c.b.textureCoordAttribute, 2, b.FLOAT, k, 36, 12);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, d.O);
    b.uniform1i(c.Sa, 0)
  }
  b.vertexAttribPointer(c.b.vertexColorAttribute, 4, b.FLOAT, k, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.ua);
  (this.g || this.parent && this.parent.g) && ua(Pa, this.d, this.v);
  b.uniformMatrix4fv(c.F, k, this.v);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
n("chesterGL.BlockGroup", W);
W.prototype.createBlock = W.prototype.Fa;
W.prototype.append = W.prototype.append;
W.prototype.remove = W.prototype.remove;
function X(a, b, c) {
  a = a || "";
  W.call(this, b + ".png", Math.max(255, a.length));
  this.maxWidth = c || 0;
  this.Ta([0, 0, 0, 0]);
  var c = L.texture[b + ".png"], b = eb("txt", b + ".fnt").split(/\n|\r/), d, e, g;
  this.R = {};
  this.J = {};
  this.Ka = c.lb;
  for(d in b) {
    if(c = b[d].match(/chars count=(\d+)/), !c) {
      if(c = b[d].split(/\s+/), "common" === c[0]) {
        var h = {};
        for(e = 1;e < c.length;e++) {
          g = c[e].split("="), 2 == g.length && (h[g[0]] = parseInt(g[1], 10))
        }
        this.Sb = h
      }else {
        if("char" === c[0]) {
          h = {};
          for(e = 1;e < c.length;e++) {
            g = c[e].split("="), 2 == g.length && (h[g[0]] = parseInt(g[1], 10))
          }
          h.id ? this.R[h.id] = h : console.log("BMFontLabel: invalid char at line " + (d + 1))
        }else {
          if("kerning" === c[0]) {
            h = {};
            for(e = 1;e < c.length;e++) {
              g = c[e].split("="), 2 == g.length && (h[g[0]] = parseInt(g[1], 10))
            }
            this.J[h.first] = this.J[h.first] || {};
            this.J[h.first][h.second] = h.amount
          }
        }
      }
    }
  }
  this.ba(a)
}
o(X, W);
X.prototype.ia = function(a, b) {
  X.Ya.ia.call(this, a, b);
  this.ba(this.text);
  return this
};
X.prototype.kb = function(a) {
  "string" === typeof a && (a = a.charCodeAt(0));
  var b = this.R[a];
  if(b) {
    return[b.x, b.y, b.width, b.height]
  }
  f("Invalid character '" + a + "' for BMFont")
};
X.prototype.ba = function(a) {
  var b, c;
  if(!(a === j || void 0 === a)) {
    this.text = a;
    this.za();
    b = a;
    var d = 0, e = 0;
    c = 1;
    var g, h = 0;
    for(g = 0;g < b.length;g++) {
      var p = b.charCodeAt(g);
      if(10 == p || 13 == p) {
        d = Math.max(d, e), e = 0, c++
      }else {
        if(this.R[p]) {
          var m = this.R[p], r = 0;
          0 < h && this.J[h] && (r = this.J[h][p] || 0);
          h = m.xadvance + r;
          e += this.Ka ? h / t : h;
          h = p
        }
      }
    }
    b = d = Math.max(d, e);
    d = this.Sb.lineHeight;
    r = 0;
    g = -b * this.m.x;
    p = -(c * d * this.m.y);
    0 < this.maxWidth && b > this.maxWidth ? this.ja(this.maxWidth / b) : this.ja(1);
    a = a.split(/\n|\r/).reverse().join("\n");
    for(e = 0;e < a.length;e++) {
      if(h = a.charCodeAt(e), 10 == h || 13 == h) {
        g = -b * this.m.x, p += d
      }else {
        if(this.R[h]) {
          m = 0;
          0 < r && this.J[r] && (m = this.J[r][h] || 0);
          var q = this.kb(h), r = this.R[h], q = this.Fa(q), s = p + (d - r.yoffset) - 0.5 * r.height, v = g + r.xoffset + 0.5 * r.width + m;
          this.Ka ? q.N(~~(v / t), ~~(s / t), 0) : q.N(~~v, ~~s, 0);
          g += r.xadvance + m;
          this.append(q)
        }else {
          f("Invalid charcode " + h + " for text " + a + " (" + a.length + ")")
        }
        r = h
      }
    }
    this.Ka ? this.$(b, c * d / t) : this.$(b, c * d)
  }
};
n("chesterGL.BMFontLabelBlock", X);
n("chesterGL.BMFontLabelBlock.loadFont", function(a) {
  O("txt", a + ".fnt");
  O("texture", a + ".png")
});
X.prototype.setText = X.prototype.ba;
X.prototype.setAnchorPoint = X.prototype.ia;
X.prototype.getFrameForChar = X.prototype.kb;
function Eb(a) {
  S.call(this, j, 4);
  var b = this;
  O("texture", a.texture, j, function() {
    b.nb(a)
  })
}
o(Eb, S);
var Fb = k;
function Gb() {
  bb("particles", function(a) {
    var b = G;
    a.F = b.getUniformLocation(a, "uMVPMatrix");
    a.$b = b.getUniformLocation(a, "uSampler");
    a.ac = b.getUniformLocation(a, "u_time");
    a.b = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.cb = k;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  Fb = i
}
l = Eb.prototype;
l.n = i;
l.ob = j;
l.hb = 0;
l.T = 0;
l.M = 0;
l.L = 0;
l.duration = 0;
l.La = 0;
l.mb = 0;
l.ka = j;
l.la = j;
l.ya = j;
l.ea = j;
l.fa = j;
l.wa = j;
l.xa = j;
l.tb = 0;
l.ub = 0;
l.ib = 0;
l.jb = 0;
l.Qa = k;
l.elapsedTime = 0;
l.Ea = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
l.nb = function(a) {
  this.k = -1;
  Fb || Gb();
  this.ob = a.texture;
  this.L = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.La = 1E3 * parseFloat(a.lifetime);
  this.mb = 1E3 * parseFloat(a.lifetimeVariance);
  this.ka = oa(a.startColor);
  this.la = oa(a.startColorVariance);
  this.ea = oa(a.endColor);
  this.fa = oa(a.endColorVariance);
  this.ya = ja(a.positionVariance);
  this.wa = ja(a.speed);
  this.xa = ja(a.speedVariance);
  this.tb = parseFloat(a.startSize);
  this.ub = parseFloat(a.startSizeVariance);
  this.ib = parseFloat(a.endSize);
  this.jb = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.Ea = a.blendOptions.slice(0);
  this.n = i;
  this.p || (this.p = G.createBuffer());
  this.o = new Float32Array(18 * this.L);
  for(var a = ab("particles"), b = G, c = 0;c < this.L;c++) {
    Hb(this, c)
  }
  b.uniform1i(a.$b, 0);
  Ib(this, a);
  this.M = this.T = this.elapsedTime = 0;
  this.hb = this.L / Math.abs(this.La)
};
function Hb(a, b, c, d) {
  var e = a.o;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.tb + a.ub * Q();
  e[18 * b + 3] = a.ib + a.jb * Q();
  e[18 * b + 4] = a.wa[0] + a.xa[0] * Q();
  e[18 * b + 5] = a.wa[1] + a.xa[1] * Q();
  e[18 * b + 6] = a.wa[2] + a.xa[2] * Q();
  e[18 * b + 7] = Q() * a.ya[0];
  e[18 * b + 8] = Q() * a.ya[1];
  e[18 * b + 9] = Q() * a.ya[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.ka[0] + Q() * a.la[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.ka[1] + Q() * a.la[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.ka[2] + Q() * a.la[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.ka[3] + Q() * a.la[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.ea[0] + Q() * a.fa[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.ea[1] + Q() * a.fa[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.ea[2] + Q() * a.fa[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.ea[3] + Q() * a.fa[3]))
}
function Ib(a, b) {
  var c = G;
  c.bindBuffer(c.ARRAY_BUFFER, a.p);
  b.cb || (c.vertexAttribPointer(b.b.a_lifetime, 1, c.FLOAT, k, 72, 0), c.vertexAttribPointer(b.b.a_startTime, 1, c.FLOAT, k, 72, 4), c.vertexAttribPointer(b.b.a_startSize, 1, c.FLOAT, k, 72, 8), c.vertexAttribPointer(b.b.a_endSize, 1, c.FLOAT, k, 72, 12), c.vertexAttribPointer(b.b.a_speed, 3, c.FLOAT, k, 72, 16), c.vertexAttribPointer(b.b.a_startPosition, 3, c.FLOAT, k, 72, 28), c.vertexAttribPointer(b.b.a_startColor, 4, c.FLOAT, k, 72, 40), c.vertexAttribPointer(b.b.a_endColor, 4, c.FLOAT, k, 72, 
  56), b.cb = i);
  c.bufferData(c.ARRAY_BUFFER, a.o, c.STATIC_DRAW)
}
var Jb = new Float32Array(18);
Eb.prototype.update = function(a) {
  if(ab("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.hb;
    for(this.T += a;this.M < this.L && this.T > b && this.n;) {
      a = Math.abs(this.La + this.mb * Q()), Hb(this, this.M++, a, this.elapsedTime), this.Qa = i, this.T -= b
    }
    for(b = 0;b < this.L;b++) {
      var a = this.o, c = 18 * b;
      if(0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.M - 1) {
        var d = a.subarray(c, c + 18);
        Jb.set(d);
        Jb[0] = -1;
        d = a.subarray(c + 18, 18 * this.M);
        a.set(d, c);
        a.set(Jb, 18 * (this.M - 1));
        this.M--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.n = k)
  }
};
Eb.prototype.Y = function() {
  var a = ab("particles");
  if(a) {
    var b = G, c = eb("texture", this.ob);
    b.blendFunc(b[this.Ea[0]], b[this.Ea[1]]);
    b.uniform1f(a.ac, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.O);
    this.Qa ? (Ib(this, a), this.Qa = k) : b.bindBuffer(b.ARRAY_BUFFER, this.p);
    (this.g || this.parent && this.parent.g) && ua(Pa, this.d, this.v);
    b.uniformMatrix4fv(a.F, k, this.v);
    b.drawArrays(b.POINTS, 0, this.L);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
n("chesterGL.GPUParticleSystem", Eb);
Eb.loadShaders = Gb;
Eb.prototype.loadProperties = Eb.prototype.nb;
function Y(a, b) {
  this.totalTime = a;
  this.a = b;
  this.j = 0
}
l = Y.prototype;
l.da = 0;
l.a = j;
l.totalTime = 0;
l.j = 0;
l.s = k;
l.n = k;
l.next = j;
l.update = function(a) {
  this.n && (this.j += a, 0 <= this.totalTime && this.j >= this.totalTime && (this.stop(), this.next && this.a.pb(this.next)))
};
l.Vb = function(a) {
  return this.next = a
};
l.Wb = function(a) {
  this.n || (this.totalTime = a)
};
l.e = function() {
  this.n = i
};
l.stop = function() {
  this.s = i;
  this.n = k
};
l.pause = function() {
  this.n = k
};
l.Ra = function() {
  this.n = i
};
l.I = function() {
  return this.n === i
};
l.reset = function() {
  this.s = this.n = k;
  this.j = 0
};
function Z(a, b, c, d) {
  Y.call(this, b, d);
  this.oa = ja(a);
  this.V = void 0 !== c ? c === i : i;
  this.Va = new Float32Array(3);
  this.ga = new Float32Array(3)
}
o(Z, Y);
Z.prototype.oa = j;
Z.prototype.ga = j;
Z.prototype.V = i;
Z.prototype.Va = j;
var Kb = new Float32Array(3);
Z.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = this.a, b = Math.min(1, this.j / this.totalTime), c = this.Va, d = this.ga, e = c[0], g = c[1], c = c[2];
  Kb[0] = (d[0] - e) * b + e;
  Kb[1] = (d[1] - g) * b + g;
  Kb[2] = (d[2] - c) * b + c;
  a.N(Kb[0], Kb[1], Kb[2])
};
Z.prototype.e = function() {
  Y.prototype.e.call(this);
  this.a || f("invalid move action! - no block");
  if(this.V) {
    var a = this.oa, b = this.a.position, c = this.ga;
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2]
  }else {
    ka(this.ga, this.oa)
  }
  ka(this.Va, this.a.position)
};
Z.prototype.stop = function() {
  Y.prototype.stop.call(this);
  this.j >= this.totalTime && this.a.N(this.ga)
};
Z.prototype.reverse = function() {
  this.V || f("This only works on relative movements");
  var a = [], b = this.oa;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new Z(a, this.totalTime, i)
};
function Lb(a, b, c, d, e) {
  Y.call(this, c, e);
  this.V = d;
  this.Ga = a;
  this.Ha = b;
  this.Xa = this.Wa = this.ra = this.qa = 0
}
o(Lb, Y);
Lb.prototype.e = function() {
  Y.prototype.e.call(this);
  this.a || f("invalid scale action - no block provided");
  this.V ? (this.qa = this.a.Z + this.Ga, this.ra = this.a.Aa + this.Ha) : (this.qa = this.Ga, this.ra = this.Ha);
  this.Wa = this.a.Z;
  this.Xa = this.a.Aa
};
Lb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = this.a, b = Math.min(1, this.j / this.totalTime);
  a.ja(this.Wa + b * (this.qa - this.Wa), this.Xa + b * (this.ra - this.Xa))
};
Lb.prototype.stop = function() {
  Y.prototype.stop.call(this);
  this.j >= this.totalTime && this.a.ja(this.qa, this.ra)
};
Lb.prototype.reverse = function() {
  this.V || f("This only works on relative movements");
  return new Lb(-this.Ga, -this.Ha, this.totalTime, i)
};
function Mb(a, b, c) {
  this.eb = a;
  this.bb = c;
  Y.call(this, b || 0)
}
o(Mb, Y);
Mb.prototype.eb = j;
Mb.prototype.bb = j;
Mb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.s && this.eb.call(j, this.bb)
};
function Nb(a) {
  1 > arguments.length && f("you need at least one action to create a sequence");
  var b = 0;
  this.l = [];
  for(var c in arguments) {
    b += arguments[c].totalTime, this.l.push(arguments[c])
  }
  this.ha = this.l[0].totalTime;
  Y.call(this, b)
}
o(Nb, Y);
l = Nb.prototype;
l.l = j;
l.A = 0;
l.e = function() {
  Y.prototype.e.call(this);
  this.ha = this.l[0].totalTime;
  this.l[0].a = this.a;
  this.l[0].e()
};
l.reset = function() {
  Nb.Ya.reset.call(this);
  this.A = 0;
  this.ha = this.l[0].totalTime;
  for(var a = this.totalTime = 0;a < this.l.length;a++) {
    this.l[a].reset(), this.totalTime += this.l[a].totalTime
  }
};
l.update = function(a) {
  Nb.Ya.update.call(this, a);
  var b = this.l[this.A];
  b.update(a);
  if(this.j >= this.ha) {
    b.s || b.update(1E3);
    for(this.A++;this.A < this.l.length;) {
      b = this.l[this.A];
      b.a = this.a;
      b.e();
      this.ha += b.totalTime;
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
  this.Oa = b || 1;
  this.$a = 0;
  this.action = a;
  Y.call(this, a.totalTime)
}
o(Ob, Y);
l = Ob.prototype;
l.Oa = 0;
l.$a = 0;
l.action = j;
l.e = function() {
  Y.prototype.e.call(this);
  this.action.a = this.a;
  this.action.e()
};
l.update = function(a) {
  Y.prototype.update.call(this, a);
  this.action.update(a);
  if(this.s && this.action.s && (0 > this.Oa || this.$a < this.Oa)) {
    this.$a++, this.reset(), this.action.reset(), this.e()
  }
};
function Pb(a, b, c, d) {
  Y.call(this, c, d);
  this.param = a;
  this.Ba = b;
  this.U = "object" === typeof a
}
o(Pb, Y);
Pb.prototype.e = function() {
  Y.prototype.e.call(this);
  if(this.U) {
    this.q = "string" === typeof this.param.getter ? this.a[this.param.getter]() : this.param.getter.call(this.a)
  }else {
    var a = this.a[this.param];
    a || f("Invalid ElasticAction param!");
    this.q = a
  }
};
Pb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var b = Math.min(1, this.j / this.totalTime), a = this.a, b = this.q + b * (this.Ba - this.q);
  this.U ? "string" === typeof this.param.setter ? a[this.param.setter].call(a, b) : this.param.setter.call(a, b) : a[this.param] = b
};
function Qb(a, b, c, d) {
  Y.call(this, c, d);
  this.param = a;
  this.Ba = b;
  this.U = "object" === typeof a
}
o(Qb, Y);
Qb.prototype.e = function() {
  Y.prototype.e.call(this);
  var a;
  this.U ? a = this.a[this.param.getter]() : (a = this.a[this.param]) || f("Invalid ElasticAction param!");
  this.Da = k;
  a instanceof Array ? (this.q = a.slice(0), this.Da = i) : a instanceof Float32Array ? (this.q = new Float32Array(a), this.Da = i) : this.q = a
};
Qb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  var a = Math.min(1, this.j / this.totalTime), b = 0.5 * Math.pow(1 - a, 3) + 0.06 * 3 * Math.pow(1 - a, 2) * a + 2.2 * 3 * (1 - a) * Math.pow(a, 2) + 1.5 * Math.pow(a, 3) - 0.5, a = this.a;
  if(this.Da) {
    for(var c = [], d = this.q.length, e = 0;e < d;e++) {
      c[e] = this.q[e] + b * (this.Ba[e] - this.q[e])
    }
    this.U ? a[this.param.setter].apply(a, c) : a[this.param] = c
  }else {
    b = this.q + b * (this.Ba - this.q), this.U ? a[this.param.setter].call(a, b) : a[this.param] = b
  }
};
function Rb(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === i && (a = -1);
  Y.call(this, a, d);
  this.sb = c === i;
  this.frames = b.slice(0)
}
o(Rb, Y);
l = Rb.prototype;
l.S = 0;
l.delay = 0;
l.frames = j;
l.sb = k;
l.update = function(a) {
  Y.prototype.update.call(this, a);
  a = this.a;
  this.s ? (this.S = this.frames.length - 1, a.aa(this.frames[this.S])) : this.j >= this.delay * this.S && (a.aa(this.frames[this.S++]), this.S == this.frames.length && (this.sb ? this.j = this.S = 0 : this.s = i))
};
function Sb(a, b, c, d) {
  this.ab = a;
  this.fb = b;
  Y.call(this, c, d)
}
o(Sb, Y);
Sb.prototype.ab = 0;
Sb.prototype.fb = 0;
Sb.prototype.update = function(a) {
  Y.prototype.update.call(this, a);
  this.s ? this.a.Ua(0) : this.a.Ua(this.ab * Math.sin(2 * (this.j / 1E3 * this.fb) * Math.PI / (this.totalTime / 1E3)))
};
var P = {z:{}, Mb:0, qb:function(a) {
  if(!a.da || !P.z.hasOwnProperty(a.da)) {
    a.da = P.Mb++, P.z[a.da] = a
  }
  a.e();
  return a.da
}, vb:function(a) {
  P.z.hasOwnProperty(a) && delete P.z[a]
}, Yb:function(a) {
  if(!P.paused) {
    for(var b in P.z) {
      var c = P.z[b];
      c.n && c.update(a);
      c.s && delete P.z[b]
    }
  }
}, pause:function() {
  P.paused = i
}, Ra:function() {
  P.paused = k
}};
S.prototype.pb = function(a) {
  a.a = this;
  return P.qb(a)
};
n("chesterGL.ActionManager", P);
n("chesterGL.MoveAction", Z);
n("chesterGL.ScaleAction", Lb);
n("chesterGL.CallbackAction", Mb);
n("chesterGL.SequenceAction", Nb);
n("chesterGL.RepeatAction", Ob);
n("chesterGL.AnimateAction", Rb);
n("chesterGL.WiggleAction", Sb);
n("chesterGL.ElasticAction", Qb);
n("chesterGL.ParametricAction", Pb);
P.scheduleAction = P.qb;
P.unscheduleAction = P.vb;
P.pause = P.pause;
P.resume = P.Ra;
S.prototype.runAction = S.prototype.pb;
Y.prototype.setNext = Y.prototype.Vb;
Y.prototype.stop = Y.prototype.stop;
Y.prototype.reset = Y.prototype.reset;
Y.prototype.begin = Y.prototype.e;
Y.prototype.pause = Y.prototype.pause;
Y.prototype.resume = Y.prototype.Ra;
Y.prototype.setTotalTime = Y.prototype.Wb;
Y.prototype.isRunning = Y.prototype.I;
Z.prototype.reverse = Z.prototype.reverse;
Lb.prototype.reverse = Lb.prototype.reverse;
var Bb = {frames:{}, Tb:function(a) {
  "string" === typeof a && (a = JSON.parse(a));
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    O("texture", b, j, function() {
      var c = a.frames, d;
      for(d in c) {
        var e = c[d], g = {frame:{}, c:""};
        g.frame = [e.frame.x, e.frame.y, e.frame.w, e.frame.h];
        e.sourceSize && (g.sourceSize = {width:e.sourceSize.w, height:e.sourceSize.h});
        g.c = b;
        Bb.frames[d] = g
      }
    })
  }else {
    f("Unkown json data")
  }
}, Bb:function(a, b) {
  L.frameset[a.name].data = b;
  return i
}, ta:function(a) {
  return Bb.frames[a]
}, Pb:function(a) {
  O("frameset", {url:a, dataType:"json"}, j, function(a, c) {
    Bb.Tb(c)
  })
}};
Sa.frameset = Bb.Bb;
n("chesterGL.BlockFrames", Bb);
Bb.getFrame = Bb.ta;
Bb.loadFrames = Bb.Pb;
function V(a, b) {
  x || f("PrimitiveBlock only works on WebGL mode");
  this.Na = a || 500;
  this.Ma = b || 500;
  S.call(this, j, R.PRIMITIVE);
  var c = G;
  this.Ja = c.createBuffer();
  this.u = new Float32Array(7 * this.Na);
  this.Ia = c.createBuffer();
  this.i = new Float32Array(14 * this.Ma);
  this.k = T.DEFAULT
}
o(V, S);
l = V.prototype;
l.Ja = j;
l.u = j;
l.Ia = j;
l.i = j;
l.Ma = 0;
l.B = 0;
l.Na = 0;
l.C = 0;
l.X = [];
l.zb = function(a, b, c) {
  if(this.C < this.Na) {
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
l.yb = function(a, b, c, d, e) {
  if(this.B < this.Ma) {
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
l.pa = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || k, d = d || k, e = a.length, g = G, h = new Float32Array(7 * a.length), p = g.createBuffer(), m = 0;m < e;m++) {
    var r = a[m];
    h[7 * m + 0] = r[0];
    h[7 * m + 1] = r[1];
    h[7 * m + 2] = r[2];
    h[7 * m + 3] = b[0];
    h[7 * m + 4] = b[1];
    h[7 * m + 5] = b[2];
    h[7 * m + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, p);
  g.bufferData(g.ARRAY_BUFFER, h, g.STATIC_DRAW);
  this.X.unshift([h, p, c, d])
};
l.Ab = function(a, b, c, d, e, g) {
  c /= 2;
  d /= 2;
  this.pa([[a - c, b - d, 0], [a - c, b + d, 0], [a + c, b + d, 0], [a + c, b - d, 0]], e, i, g)
};
l.G = function() {
  this.B = this.C = 0;
  0 < this.X.length && (this.X = []);
  S.prototype.G.call(this)
};
l.Y = function() {
  var a = G, b = ab(vb[this.k]);
  if(0 < this.C || 0 < this.B || 0 < this.X.length) {
    ua(Pa, this.d, this.v), a.uniformMatrix4fv(b.F, k, this.v)
  }
  if(0 < this.C) {
    var c = G, d = 7 * this.C;
    c.bindBuffer(c.ARRAY_BUFFER, this.Ja);
    c.bufferData(c.ARRAY_BUFFER, this.u.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.Ja);
    a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
    a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
    a.drawArrays(a.POINTS, 0, this.C)
  }
  0 < this.B && (c = G, d = 14 * this.B, c.bindBuffer(c.ARRAY_BUFFER, this.Ia), c.bufferData(c.ARRAY_BUFFER, this.i.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.Ia), a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0), a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.B));
  c = this.X.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.X[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.b.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
      a.vertexAttribPointer(b.b.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
n("chesterGL.PrimitiveBlock", V);
V.prototype.drawPoint = V.prototype.zb;
V.prototype.drawLine = V.prototype.yb;
V.prototype.drawPolygon = V.prototype.pa;
V.prototype.drawRectangle = V.prototype.Ab;
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
  S.call(this, j, R.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = x ? new W(j, c.blocks.length) : new S, e = j, g = 0;g < c.blocks.length;g++) {
      var h = c.blocks[g];
      e || (e = ic(a.tilesets, h.gid), d.ca(e.texture));
      var p;
      x ? p = d.Fa(h.frame) : (p = new S(h.frame), p.ca(e.texture));
      p.N(h.position);
      d.append(p)
    }
    this.append(d)
  }
}
o(gc, S);
gc.prototype.Y = function() {
};
var hc = {};
function ic(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
Sa.tmx = function(a, b) {
  L.tmx[a.name].data = b;
  return i
};
n("chesterGL.TMXBlock", gc);
gc.loadTMX = function(a) {
  O("tmx", {url:a, dataType:"xml"}, j, function(b, c) {
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
          var s = q.text().trim();
          if(!ec) {
            ec = {};
            fc = {};
            for(q = 0;65 > q;q++) {
              ec[q] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q), fc[ec[q]] = q
            }
          }
          for(var v = fc, q = [], u = 0;u < s.length;) {
            var A = v[s.charAt(u++)], B = u < s.length ? v[s.charAt(u)] : 0;
            ++u;
            var w = u < s.length ? v[s.charAt(u)] : 0;
            ++u;
            var C = u < s.length ? v[s.charAt(u)] : 0;
            ++u;
            (A == j || B == j || w == j || C == j) && f(Error());
            q.push(A << 2 | B >> 4);
            64 != w && (q.push(B << 4 & 240 | w >> 2), 64 != C && q.push(w << 6 & 192 | C))
          }
          s = 0;
          v = j;
          for(u = 0;u < e.height;u++) {
            for(A = 0;A < e.width;A++) {
              var z = q[s + 3] << 24 | q[s + 2] << 16 | q[s + 1] << 8 | q[s + 0] >>> 0;
              if(0 !== z) {
                v || (v = ic(d.tilesets, z));
                B = {};
                B.gid = z;
                var y = v.margin || 0, F = v.spacing || 0, w = v.tileSize, H = v.imgSize, C = d.mapTileSize, I = parseInt((H.width - 2 * y + F) / (w.width + F), 10), z = z - v.firstgid, M = z % I * (w.width + F) + y, H = H.height - w.height - y - F - parseInt(z / I, 10) * (w.height + F) + y, I = w.width, F = w.height, y = z = new Float32Array(4);
                y[0] = M;
                y[1] = H;
                y[2] = I;
                y[3] = F;
                B.frame = z;
                var J, K;
                "orthogonal" == g ? (J = A * C.width + w.width / 2, K = (e.height - u - 1) * C.height + w.height / 2) : "isometric" == g ? (J = C.width / 2 * (e.width + A - u - 1) + w.width / 2, K = C.height / 2 * (2 * e.height - A - u - 2) + w.height / 2) : f("Invalid orientation");
                B.position = [J, K, 0];
                c.blocks.push(B)
              }
              s += 4
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
  (b = b.match(/(\d+)px/)) ? this.Za = parseInt(b[1], 10) : f("Invalid text height - use the form NNpx");
  this.c = Math.random() + ".canvas";
  L.texture || (L.texture = {});
  L.texture[this.c] = d;
  S.call(this, kc(this, a));
  this.ba(a, k);
  this.k = T.TEXTURE
}
o(jc, S);
l = jc.prototype;
l.canvas = j;
l.context = j;
l.Pa = k;
l.text = "";
l.Za = 0;
l.font = "";
l.fillStyle = "";
l.ba = function(a, b) {
  this.text = a;
  lc(this);
  b || (this.aa(kc(this)), this.Pa = i)
};
function lc(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, c.height);
  c.O || (c.O = G.createTexture(), L.texture[a.c].data = c);
  gb(c);
  a.Pa = k
}
function kc(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.Za;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  c.textBaseline = "bottom";
  return[0, 0, e, a.Za]
}
l.G = function() {
  this.Pa && lc(this);
  S.prototype.G.call(this)
};
n("chesterGL.LabelBlock", jc);
jc.prototype.setText = jc.prototype.ba;

//@ sourceMappingURL=chester.js.map
