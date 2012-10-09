'use strict';function f(a) {
  throw a;
}
var i = !0, j = null, k = !1;
function n(a) {
  return function() {
    return this[a]
  }
}
var o, aa = this;
Math.floor(2147483648 * Math.random()).toString(36);
function q(a, b) {
  var c = a.split("."), d = aa;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var e;c.length && (e = c.shift());) {
    !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
}
function u(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.B = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
}
;function ba(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
ba.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function da(a, b) {
  this.x = a;
  this.y = b
}
u(da, ba);
var ea, fa, ga;
HTMLCanvasElement.nb = new da(0, 0);
function ha(a) {
  var b = v, c = HTMLCanvasElement.nb;
  c.x = 0;
  c.y = 0;
  void 0 === b.W && (b.W = $(b).offset(), b.Qa = b.height);
  a.changedTouches && (a = a.changedTouches[0]);
  c.x = a.pageX - b.W.left;
  c.y = b.Qa - (a.pageY - b.W.top);
  return c
}
for(var ia = 0, ja = ["ms", "moz", "webkit", "o"], ka = 0;ka < ja.length && !window.requestAnimationFrame;++ka) {
  window.requestAnimationFrame = window[ja[ka] + "RequestAnimationFrame"], window.Va = window[ja[ka] + "CancelAnimationFrame"] || window[ja[ka] + "CancelRequestAnimationFrame"]
}
window.requestAnimationFrame || (console.log("using setTimeout"), window.requestAnimationFrame = function(a) {
  var b = Date.now(), c = Math.max(0, 16 - (b - ia)), d = window.setTimeout(function() {
    a(b + c)
  }, c);
  ia = b + c;
  return d
});
window.Va || (window.Va = function(a) {
  clearTimeout(a)
});
function la(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var ma = window.Stats || j, na = {useGoogleAnalytics:k, projection:"3d", webglMode:i, usesOffscreenBuffer:k, basePath:""}, oa = "3d", B = i, pa = k, qa = "", C = j, ra = k, sa = {}, ta = j, ua = j, D = j, v = j, va = k, E = {}, wa = {}, xa = {}, ya = {}, za = Date.now(), Aa = 0, Ba = {Mb:0, Pb:1, Qb:2, Nb:3, Ob:4}, F = j, H = [];
function Ca(a) {
  var b = sa[a], c = C;
  if(a != ta) {
    ta = a;
    c.validateProgram(b);
    c.useProgram(b);
    for(var d in b.a) {
      c.enableVertexAttribArray(b.a[d])
    }
  }
  return b
}
function Da() {
  var a = v;
  C.fa = a.width;
  C.V = a.height
}
function Ea(a, b) {
  var c = C, d = Fa(a, "frag"), e = Fa(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  if(c.getShaderParameter(g, c.COMPILE_STATUS)) {
    d = c.createShader(c.VERTEX_SHADER);
    c.shaderSource(d, e);
    c.compileShader(d);
    if(c.getShaderParameter(d, c.COMPILE_STATUS)) {
      c = C;
      e = c.createProgram();
      c.attachShader(e, g);
      c.attachShader(e, d);
      c.linkProgram(e);
      c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
      sa[a] = e;
      b && b(e)
    }else {
      console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
    }
  }else {
    console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
  }
}
function Fa(a, b) {
  var c = "", d = new XMLHttpRequest;
  d.open("GET", qa + "shaders/" + a + "." + b, k);
  d.onreadystatechange = function() {
    d.readyState == 4 && d.status == 200 ? c = d.responseText : f("Error while getting the shader data")
  };
  d.send();
  return c
}
function Ga(a, b, c, d) {
  b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url} : {url:b, name:c || b};
  E[a] || (E[a] = {});
  var c = E[a], e = b.name;
  if(c[e]) {
    if(c[e].status == "loading") {
      d && c[e].ba.push(d)
    }else {
      if(c[e].status == "loaded") {
        d && d(c[e].data)
      }else {
        if(c[e].status == "try") {
          c[e].status = "loading";
          if(xa[a]) {
            xa[a](a, b)
          }else {
            xa["default"](a, b)
          }
          d && c[e].ba.push(d)
        }
      }
    }
  }else {
    c[e] = {data:j, name:e, status:"try", ba:[]};
    d && c[e].ba.push(d);
    Ga(a, b)
  }
}
function Ha(a, b) {
  var c = ya[a], d, e;
  if(!c) {
    ya[a] = [];
    c = ya[a]
  }
  b && c.push(b);
  var g = i;
  if(a == "all") {
    for(var h in E) {
      d = E[h];
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
    d = E[a];
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
function Ia(a, b) {
  return b ? E[a][b].data : j
}
function Ja(a, b) {
  return b ? b in E[a] : k
}
function Ka(a) {
  var b = C, c = i;
  try {
    var d = 0;
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, a.K);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
    d = b.getError();
    if(d !== 0) {
      console.log("[prepareWebGLTexture] GL error " + d);
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
function La(a, b, c) {
  E[c][a.name].data = b;
  return i
}
function Ma(a, b) {
  if(B && !b.K) {
    b.K = C.createTexture()
  }
  E.texture[a.name].data = b;
  return B ? Ka(b) : i
}
function Xa(a, b) {
  var c = new Image, d = b.url, e = b.name;
  c.src = "";
  c.addEventListener("load", function() {
    var d = E.texture[e];
    if(wa[a](b, c)) {
      d.status = "loaded";
      for(var h;h = d.ba.shift();) {
        h(d.data)
      }
      Ha(a);
      Ha("all")
    }else {
      d.status = "try";
      Ga(a, b)
    }
  }, k);
  if(d.match(/^http(s)?:/)) {
    c.crossOrigin = "anonymous";
    c.src = d
  }else {
    c.src = d.match(/^data:/) ? d : qa + d
  }
}
function Ya(a, b) {
  var c = b.url, d = c, e = b.name;
  c.match(/^http(s)?:\/\//) || (d = qa + c);
  var g = new XMLHttpRequest;
  g.open("GET", d);
  g.withCredentials = i;
  g.onreadystatechange = function() {
    if(g.readyState == 4 && g.status == 200) {
      var d = E[a][e], m = wa[a] || wa["default"], l = b.dataType == "json" ? JSON.parse(g.responseText) : g.responseText;
      if(m(b, l, a)) {
        for(d.status = "loaded";m = d.ba.shift();) {
          m(d.data)
        }
        Ha(a);
        Ha("all")
      }else {
        d.status = "try";
        Ga(a, b)
      }
    }else {
      g.readyState == 4 && console.log("Error loading asset " + c)
    }
  };
  g.send()
}
function Za() {
  var a;
  if(B) {
    a = C;
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
  }else {
    a = fa;
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.fillRect(0, 0, a.fa, a.V)
  }
  if(D) {
    D.C();
    if(!D.aa) {
      D.onEnterScene()
    }
  }
  if(!B && pa) {
    a.fillRect(0, 0, a.fa, a.V);
    a.drawImage(ea, 0, 0)
  }
  a = Date.now();
  Aa = a - za;
  za = a
}
var I = new Float32Array(3);
function $a(a) {
  var a = ha(a), b = 0, c = H.length;
  for(I.set([a.x, a.y, 0]);b < c;b++) {
    H[b](I, 0)
  }
}
function ab(a) {
  var a = ha(a), b = 0, c = H.length;
  for(I.set([a.x, a.y, 0]);b < c;b++) {
    H[b](I, 1)
  }
}
function bb(a) {
  var a = ha(a), b = 0, c = H.length;
  for(I.set([a.x, a.y, 0]);b < c;b++) {
    H[b](I, 2)
  }
}
function cb(a) {
  var a = ha(a), b = 0, c = H.length;
  for(I.set([a.x, a.y, 0]);b < c;b++) {
    H[b](I, 3)
  }
}
function db(a) {
  var a = ha(a), b = 0, c = H.length;
  for(I.set([a.x, a.y, 0]);b < c;b++) {
    H[b](I, 4)
  }
}
function eb() {
  if(!ra) {
    window.requestAnimationFrame(eb, v);
    F && F.begin();
    Za();
    J.Jb(Aa);
    F && F.end()
  }
}
function M() {
  return Math.random() * 2 - 1
}
q("chesterGL.version", "0.3");
q("chesterGL.settings", na);
q("chesterGL.mouseEvents", Ba);
Ba.UP = 2;
Ba.DOWN = 0;
Ba.MOVE = 1;
Ba.ENTER = 3;
Ba.LEAVE = 4;
q("chesterGL.viewportSize", function() {
  return new fb(C.fa, C.V)
});
q("chesterGL.setup", function(a) {
  a = document.getElementById(a);
  oa = na.projection;
  B = na.webglMode;
  pa = na.usesOffscreenBuffer;
  qa = na.basePath;
  try {
    v = a;
    if(B) {
      if((C = a.getContext("experimental-webgl", {alpha:k, antialias:k, preserveDrawingBuffer:i})) && window.WebGLDebugUtils) {
        console.log("installing debug context");
        C = WebGLDebugUtils.makeDebugContext(C, la)
      }
    }
  }catch(b) {
    console.log("ERROR: " + b)
  }
  if(!C) {
    C = a.getContext("2d");
    if(pa) {
      ea = document.createElement("canvas");
      ea.width = a.width;
      ea.height = a.height;
      fa = ea.getContext("2d");
      fa.fa = a.width;
      fa.V = a.height
    }else {
      fa = C
    }
    (!C || !fa) && f("Error initializing graphic context!");
    B = na.webglMode = k
  }
  ga = window.devicePixelRatio;
  Da();
  if(window.navigator.platform.match(/iPhone|iPad/)) {
    document.addEventListener("touchstart", $a, k);
    document.addEventListener("touchmove", function(a) {
      ab(a);
      a.preventDefault()
    }, k);
    document.addEventListener("touchend", bb, k)
  }else {
    $(v).mousedown($a);
    $(v).mousemove(ab);
    $(v).mouseup(bb);
    $(v).mouseenter(cb);
    $(v).mouseleave(db)
  }
  if(B) {
    var c = C;
    Ea("default", function(a) {
      a.z = c.getUniformLocation(a, "uMVPMatrix");
      a.a = {vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:c.getAttribLocation(a, "aVertexColor")};
      a.mvpMatrixUniform = a.z;
      a.attribs = a.a
    });
    Ea("texture", function(a) {
      a.z = c.getUniformLocation(a, "uMVPMatrix");
      a.Ha = c.getUniformLocation(a, "uSampler");
      a.a = {vertexColorAttribute:c.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:c.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition")};
      a.mvpMatrixUniform = a.z;
      a.samplerUniform = a.Ha;
      a.attribs = a.a
    })
  }
  var a = window.location.search.substring(1).split("&"), d;
  for(d in a) {
    var e = a[d].split("=");
    if(e[0] == "_cdbg" && e[1] == "1") {
      va = i;
      console.log("debug mode on")
    }
  }
  wa.texture = Ma;
  wa["default"] = La;
  xa.texture = Xa;
  xa["default"] = Ya;
  if(ma) {
    console.log("chesterGL: adding stats");
    F = new ma;
    F.setMode(1);
    F.domElement.style.position = "absolute";
    F.domElement.style.left = "0px";
    F.domElement.style.top = "0px";
    q("chesterGL.stats", F);
    document.body.appendChild(F.domElement)
  }
});
q("chesterGL.canvasResized", Da);
q("chesterGL.initShader", Ea);
q("chesterGL.registerAssetHandler", function(a, b) {
  wa[a] = b
});
q("chesterGL.loadAsset", Ga);
q("chesterGL.assetsLoaded", Ha);
q("chesterGL.getAsset", Ia);
q("chesterGL.hasAsset", Ja);
q("chesterGL.setupPerspective", function() {
  var a = C;
  if(B) {
    a.clearColor(0, 0, 0, 1);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.fa, c = a.V;
    a.viewport(0, 0, b, c);
    ua = new Float32Array(16);
    if(oa == "2d") {
      console.log("setting up 2d projection (" + b + "," + c + ")");
      gb(ua, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
    }else {
      if(oa == "3d") {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = new Float32Array(16), e = b / c, g = 60 * Math.PI / 180 / 2, h = Math.sin(g);
        if(!(h == 0 || e == 0)) {
          g = Math.cos(g) / h;
          a = gb(a, g / e, 0, 0, 0, 0, g, 0, 0, 0, 0, -1500.5 / 1499.5, -1, 0, 0, -1500 / 1499.5, 0)
        }
        d = [b / 2, c / 2, d];
        e = [b / 2, c / 2, 0];
        b = new Float32Array(16);
        c = hb[0];
        c[0] = e[0] - d[0];
        c[1] = e[1] - d[1];
        c[2] = e[2] - d[2];
        ib(c, c);
        c[3] = 0;
        e = hb[1];
        jb(c, [0, 1, 0], e);
        ib(e, e);
        e[3] = 0;
        g = hb[2];
        jb(e, c, g);
        ib(g, g);
        g[3] = 0;
        c[0] = -c[0];
        c[1] = -c[1];
        c[2] = -c[2];
        kb(b, 0, e);
        kb(b, 1, g);
        kb(b, 2, c);
        b[3] = 0;
        b[7] = 0;
        b[11] = 0;
        b[15] = 1;
        lb(b, -d[0], -d[1], -d[2]);
        mb(a, b, ua);
        if(ga) {
          b = ga;
          console.log("using a pixel ratio of: " + b);
          nb(ua, b, b)
        }
      }else {
        f("Invalid projection: " + oa)
      }
    }
  }
});
q("chesterGL.setRunningScene", function(a) {
  if(D && D != a) {
    D.onExitScene()
  }
  D = j;
  a.type == P.SCENE && (D = a)
});
q("chesterGL.drawScene", Za);
q("chesterGL.run", eb);
q("chesterGL.togglePause", function() {
  if(ra) {
    ra = k;
    za = Date.now();
    eb()
  }else {
    ra = i
  }
});
q("chesterGL.isPaused", function() {
  return ra
});
q("chesterGL.setPause", function(a) {
  if(ra && !a) {
    ra = a;
    za = Date.now();
    eb()
  }else {
    ra = a
  }
});
q("chesterGL.addMouseHandler", function(a) {
  H.indexOf(a) == -1 && H.push(a)
});
q("chesterGL.removeMouseHandler", function(a) {
  a = H.indexOf(a);
  a >= 0 && H.splice(a, 1)
});
q("goog.inherits", u);
q("goog.base", function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.B) {
    return d.B.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), g = k, h = a.constructor;h;h = h.B && h.B.constructor) {
    if(h.prototype[b] === d) {
      g = i
    }else {
      if(g) {
        return h.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  f(Error("goog.base called from a method of one name to a method of a different name"))
});
function fb(a, b) {
  this.width = a;
  this.height = b
}
fb.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
fb.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
function Q(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
Q.prototype.BYTES_PER_ELEMENT = 8;
Q.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
Q.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (Q.BYTES_PER_ELEMENT = 8, Q.prototype.BYTES_PER_ELEMENT = Q.prototype.BYTES_PER_ELEMENT, Q.prototype.set = Q.prototype.set, Q.prototype.toString = Q.prototype.toString, q("Float64Array", Q));
function R(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
R.prototype.BYTES_PER_ELEMENT = 4;
R.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
R.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (R.BYTES_PER_ELEMENT = 4, R.prototype.BYTES_PER_ELEMENT = R.prototype.BYTES_PER_ELEMENT, R.prototype.set = R.prototype.set, R.prototype.toString = R.prototype.toString, q("Float32Array", R));
function ob(a) {
  var b = new Float32Array(3);
  pb(b, a);
  return b
}
function pb(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2]
}
function ib(a, b) {
  var c = a[0], d = a[1], e = a[2], c = 1 / Math.sqrt(c * c + d * d + e * e);
  b[0] = a[0] * c;
  b[1] = a[1] * c;
  b[2] = a[2] * c
}
function jb(a, b, c) {
  var d = a[0], e = a[1], a = a[2], g = b[0], h = b[1], b = b[2];
  c[0] = e * b - a * h;
  c[1] = a * g - d * b;
  c[2] = d * h - e * g
}
;function qb(a) {
  var b = new Float32Array(4);
  rb(b, a);
  return b
}
function sb(a, b, c, d) {
  var e = new Float32Array(4);
  e[0] = a;
  e[1] = b;
  e[2] = c;
  e[3] = d;
  return e
}
function rb(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  a[3] = b[3]
}
;function gb(a, b, c, d, e, g, h, m, l, p, r, s, y, z, w, x, t) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = h;
  a[6] = m;
  a[7] = l;
  a[8] = p;
  a[9] = r;
  a[10] = s;
  a[11] = y;
  a[12] = z;
  a[13] = w;
  a[14] = x;
  a[15] = t;
  return a
}
function kb(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function tb(a) {
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
function mb(a, b, c) {
  var d = a[0], e = a[1], g = a[2], h = a[3], m = a[4], l = a[5], p = a[6], r = a[7], s = a[8], y = a[9], z = a[10], w = a[11], x = a[12], t = a[13], A = a[14], a = a[15], G = b[0], N = b[1], O = b[2], K = b[3], L = b[4], ca = b[5], Na = b[6], Oa = b[7], Pa = b[8], Qa = b[9], Ra = b[10], Sa = b[11], Ta = b[12], Ua = b[13], Wa = b[14], b = b[15];
  c[0] = d * G + m * N + s * O + x * K;
  c[1] = e * G + l * N + y * O + t * K;
  c[2] = g * G + p * N + z * O + A * K;
  c[3] = h * G + r * N + w * O + a * K;
  c[4] = d * L + m * ca + s * Na + x * Oa;
  c[5] = e * L + l * ca + y * Na + t * Oa;
  c[6] = g * L + p * ca + z * Na + A * Oa;
  c[7] = h * L + r * ca + w * Na + a * Oa;
  c[8] = d * Pa + m * Qa + s * Ra + x * Sa;
  c[9] = e * Pa + l * Qa + y * Ra + t * Sa;
  c[10] = g * Pa + p * Qa + z * Ra + A * Sa;
  c[11] = h * Pa + r * Qa + w * Ra + a * Sa;
  c[12] = d * Ta + m * Ua + s * Wa + x * b;
  c[13] = e * Ta + l * Ua + y * Wa + t * b;
  c[14] = g * Ta + p * Ua + z * Wa + A * b;
  c[15] = h * Ta + r * Ua + w * Wa + a * b
}
function ub(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14]
}
function lb(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], h = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = h
}
function nb(a, b, c) {
  gb(a, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * c, a[5] * c, a[6] * c, a[7] * c, 1 * a[8], 1 * a[9], 1 * a[10], 1 * a[11], a[12], a[13], a[14], a[15])
}
new Float64Array(3);
new Float64Array(3);
var hb = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function S(a, b, c) {
  this.type = b || P.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.g = T.DEFAULT;
  this.ra(0, 0);
  this.type == P.STANDALONE && this.gb([1, 1, 1, 1]);
  a && ("string" === typeof a && Ja("texture", a) ? this.U(a) : this.T(a));
  this.ca(0, 0, 0);
  this.fb(0.5, 0.5);
  if(B && (!c || c.type != P.BLOCKGROUP)) {
    this.l = C.createBuffer(), this.k = new Float32Array(36)
  }
  this.d = new Float32Array(16);
  this.r = new Float32Array(16);
  this.d = tb(new Float32Array(16));
  this.sa = [];
  this.X = []
}
var T = {DEFAULT:0, TEXTURE:1}, vb = ["default", "texture"], P = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, wb = Math.PI / 180, xb = 180 / Math.PI, yb = 1 * wb, zb = sb(0, 0, 1, 1), Ab = new fb(0, 0);
o = S.prototype;
o.title = "";
o.ob = k;
o.d = j;
o.r = j;
o.visible = i;
o.aa = k;
o.f = k;
o.F = k;
o.G = k;
o.ga = 0;
o.l = j;
o.k = j;
o.position = j;
o.L = j;
o.i = j;
o.color = j;
o.c = j;
o.rotation = 0;
o.S = 1;
o.qa = 1;
o.update = j;
o.frame = j;
o.parent = j;
o.children = j;
o.sa = j;
o.X = j;
o.o = k;
o.Fb = function() {
  this.aa = i;
  for(var a in this.children) {
    this.children[a].onEnterScene()
  }
};
o.Gb = function() {
  this.aa = k;
  for(var a in this.children) {
    this.children[a].onExitScene()
  }
};
o.T = function(a) {
  if("string" === typeof a) {
    var b = U.ka(a);
    b || f("Invalid frame name: " + a);
    a = b.frame;
    this.U(b.c)
  }
  this.frame ? rb(this.frame, a) : this.frame = qb(a);
  this.ra(a[2], a[3]);
  this.G = i
};
o.ka = n("frame");
o.ra = function(a, b) {
  this.i = new fb(a, b);
  this.G = i
};
o.xb = n("i");
o.Ja = function(a, b) {
  this.S = a;
  this.qa = 2 == arguments.length ? b : this.S;
  this.f = i
};
o.Ab = n("S");
o.gb = function(a) {
  this.color ? rb(this.color, a) : this.color = qb(a);
  this.F = i
};
o.wb = n("color");
o.ca = function(a, b, c) {
  if(this.position) {
    if(1 == arguments.length) {
      pb(this.position, a)
    }else {
      var d = this.position;
      d[0] = a;
      d[1] = b;
      d[2] = c
    }
  }else {
    1 == arguments.length ? d = ob(a) : (d = new Float32Array(3), d[0] = a, d[1] = b, d[2] = c), this.position = d
  }
  this.f = i
};
o.fb = function(a, b) {
  this.L = new da(a, b)
};
o.ub = n("L");
o.yb = n("position");
o.tb = function(a) {
  for(var b = this.parent, a = ob(a || this.position);b;) {
    ub(b.d, a, a), b = b.parent
  }
  return a
};
o.vb = function() {
  var a = this.position, b = this.frame[2], c = this.frame[3];
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
o.U = function(a) {
  this.c = a;
  this.g = T.TEXTURE;
  if(va) {
    if(this.g == T.TEXTURE) {
      var b = new V(1, 1);
      this.D(b);
      b.ib(function() {
        var a = this.parent.i, b = a.width / 2, a = a.height / 2;
        this.va([[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]], [1, 1, 1, 1], i)
      })
    }
    this.ob = i
  }
  var c = this;
  Ga("texture", a, j, function(a) {
    c.i || c.ra(a.width, a.height);
    c.frame || c.T([0, 0, a.width, a.height])
  })
};
o.Bb = n("c");
o.Ia = function(a) {
  this.rotation = a;
  this.f = i
};
o.zb = n("rotation");
o.ib = function(a) {
  this.update = a
};
o.Ib = function(a) {
  this.visible = a
};
o.Db = n("visible");
o.D = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent && f("can't add a block twice!");
    this.o ? this.sa.push(c) : (this.children.push(c), c.parent = this);
    if(this.aa) {
      c.onEnterScene()
    }
  }
};
o.removeChild = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.o) {
    this.X.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = j)
  }
  if(this.aa) {
    a.onExitScene()
  }
};
o.transform = function() {
  var a = C, b, c;
  if(this.f || this.parent && this.parent.f) {
    this.f = i;
    b = this.position[0];
    c = this.position[1];
    tb(this.d);
    lb(this.d, b, c, this.position[2]);
    b = this.d;
    var d = -1 * this.rotation;
    c = b[0];
    var e = b[1], g = b[2], h = b[3], m = b[4], l = b[5], p = b[6], r = b[7], s = b[8], y = b[9], z = b[10], w = b[11], x = Math.cos(d), t = Math.sin(d), A = 1 - x, d = 0 * A + x, G = 0 * A + 1 * t, N = 0 * A - 0 * t, O = 0 * A - 1 * t, K = 0 * A + x, L = 0 * A + 0 * t, ca = 0 * A + 0 * t, t = 0 * A - 0 * t, x = 1 * A + x;
    gb(b, c * d + m * G + s * N, e * d + l * G + y * N, g * d + p * G + z * N, h * d + r * G + w * N, c * O + m * K + s * L, e * O + l * K + y * L, g * O + p * K + z * L, h * O + r * K + w * L, c * ca + m * t + s * x, e * ca + l * t + y * x, g * ca + p * t + z * x, h * ca + r * t + w * x, b[12], b[13], b[14], b[15]);
    nb(this.d, this.S, this.qa);
    (b = this.parent ? this.parent.d : j) && mb(b, this.d, this.d)
  }
  if(!(this.type == P.BLOCKGROUP || this.type == P.PRIMITIVE)) {
    if(b = this.k, c = this.parent && this.parent.type == P.BLOCKGROUP, B) {
      !c && (this.G || this.F) && a.bindBuffer(a.ARRAY_BUFFER, this.l);
      if(this.G || this.f) {
        if(h = 0.5 * this.i.width, m = 0.5 * this.i.height, g = this.position[2], e = 36 * this.ga, c ? (l = [h, m, 0], p = [-h, m, 0], r = [h, -m, 0], h = [-h, -m, 0], ub(this.d, l, l), ub(this.d, p, p), ub(this.d, h, h), ub(this.d, r, r), b[e] = h[0], b[e + 1] = h[1], b[e + 2] = g, b[e + 9] = p[0], b[e + 1 + 9] = p[1], b[e + 2 + 9] = g, b[e + 18] = r[0], b[e + 1 + 18] = r[1], b[e + 2 + 18] = g, b[e + 27] = l[0], b[e + 1 + 27] = l[1]) : (l = this.i ? (0.5 - this.L.x) * this.i.width : 0, p = this.i ? 
        (0.5 - this.L.y) * this.i.height : 0, b[e] = -h + l, b[e + 1] = -m + p, b[e + 2] = g, b[e + 9] = -h + l, b[e + 1 + 9] = m + p, b[e + 2 + 9] = g, b[e + 18] = h + l, b[e + 1 + 18] = -m + p, b[e + 2 + 18] = g, b[e + 27] = h + l, b[e + 1 + 27] = m + p), b[e + 2 + 27] = g, this.g == T.TEXTURE) {
          g = Ia("texture", this.c), m = g.width, l = g.height, g = this.frame[0] / m + 0.0010, h = this.frame[1] / l + 0.0010, m = this.frame[2] / m - 0.0020, l = this.frame[3] / l - 0.0020, e += 3, b[e] = g, b[e + 1] = h, b[e + 9] = g, b[e + 1 + 9] = h + l, b[e + 18] = g + m, b[e + 1 + 18] = h, b[e + 27] = g + m, b[e + 1 + 27] = h + l
        }
      }
      if(this.F) {
        e = 5 + 36 * this.ga;
        g = this.color;
        for(h = 0;4 > h;h++) {
          b[e + 9 * h] = g[0], b[e + 1 + 9 * h] = g[1], b[e + 2 + 9 * h] = g[2], b[e + 3 + 9 * h] = g[3]
        }
      }
      B && (!c && (this.G || this.F)) && a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW)
    }
  }
};
o.C = function() {
  this.o = i;
  this.update && this.update(Aa);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != P.BLOCKGROUP) && this.R();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].C()
    }
    for(this.o = this.G = this.F = this.f = k;a = this.sa.shift();) {
      this.D(a)
    }
    for(;a = this.X.shift();) {
      this.removeChild(a)
    }
  }else {
    this.o = k
  }
};
o.R = function() {
  this.type == P.BLOCKGROUP && f("Cannot call render on a BlockGroup block!");
  if(this.type != P.SCENE) {
    var a, b;
    if(B) {
      a = C;
      var c = Ca(vb[this.g]);
      a.bindBuffer(a.ARRAY_BUFFER, this.l);
      a.vertexAttribPointer(c.a.vertexPositionAttribute, 3, a.FLOAT, k, 36, 0);
      a.vertexAttribPointer(c.a.vertexColorAttribute, 4, a.FLOAT, k, 36, 20);
      this.g != T.DEFAULT && this.g == T.TEXTURE && (b = Ia("texture", this.c), a.vertexAttribPointer(c.a.textureCoordAttribute, 2, a.FLOAT, k, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.K), a.uniform1i(c.Ha, 0));
      (this.f || this.parent && this.parent.f) && mb(ua, this.d, this.r);
      a.uniformMatrix4fv(c.z, k, this.r);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      a = fa;
      b = this.d;
      var d = c = 0;
      this.i && (c = this.i.width, d = this.i.height);
      a.globalAlpha = this.color[3];
      a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.L.x) * c, a.V - (b[13] + (0.5 - this.L.y) * d));
      if(1 == this.g) {
        b = Ia("texture", this.c);
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
q("chesterGL.Block", S);
q("chesterGL.Block.FullFrame", zb);
q("chesterGL.Block.SizeZero", Ab);
q("chesterGL.Block.TYPE", P);
q("chesterGL.Block.PROGRAM", T);
q("chesterGL.Block.PROGRAM_NAME", vb);
q("chesterGL.Block.DEG_TO_RAD", wb);
q("chesterGL.Block.RAD_TO_DEG", xb);
q("chesterGL.Block.ONE_DEG", yb);
S.prototype.title = S.prototype.title;
S.prototype.onEnterScene = S.prototype.Fb;
S.prototype.onExitScene = S.prototype.Gb;
S.prototype.children = S.prototype.children;
S.prototype.addChild = S.prototype.D;
S.prototype.removeChild = S.prototype.removeChild;
S.prototype.getBoundingBox = S.prototype.vb;
S.prototype.setPosition = S.prototype.ca;
S.prototype.getPosition = S.prototype.yb;
S.prototype.setAnchorPoint = S.prototype.fb;
S.prototype.getAnchorPoint = S.prototype.ub;
S.prototype.getAbsolutePosition = S.prototype.tb;
S.prototype.setRotation = S.prototype.Ia;
S.prototype.getRotation = S.prototype.zb;
S.prototype.setColor = S.prototype.gb;
S.prototype.getColor = S.prototype.wb;
S.prototype.setFrame = S.prototype.T;
S.prototype.getFrame = S.prototype.ka;
S.prototype.setContentSize = S.prototype.ra;
S.prototype.getContentSize = S.prototype.xb;
S.prototype.setTexture = S.prototype.U;
S.prototype.getTexture = S.prototype.Bb;
S.prototype.setScale = S.prototype.Ja;
S.prototype.getScale = S.prototype.Ab;
S.prototype.setUpdate = S.prototype.ib;
S.prototype.setVisible = S.prototype.Ib;
S.prototype.isVisible = S.prototype.Db;
function Bb(a) {
  S.call(this, j, 4);
  var b = this;
  Ga("texture", a.texture, j, function() {
    b.bb(a)
  })
}
u(Bb, S);
var Cb = k;
function Db() {
  Ea("particles", function(a) {
    var b = C;
    a.z = b.getUniformLocation(a, "uMVPMatrix");
    a.Kb = b.getUniformLocation(a, "uSampler");
    a.Lb = b.getUniformLocation(a, "u_time");
    a.a = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.Ta = k;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  Cb = i
}
o = Bb.prototype;
o.A = i;
o.cb = j;
o.Ya = 0;
o.N = 0;
o.I = 0;
o.H = 0;
o.duration = 0;
o.Aa = 0;
o.ab = 0;
o.da = j;
o.ea = j;
o.pa = j;
o.Y = j;
o.Z = j;
o.na = j;
o.oa = j;
o.lb = 0;
o.mb = 0;
o.Za = 0;
o.$a = 0;
o.Fa = k;
o.elapsedTime = 0;
o.ta = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
o.bb = function(a) {
  this.g = -1;
  Cb || Db();
  this.cb = a.texture;
  this.H = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.Aa = 1E3 * parseFloat(a.lifetime);
  this.ab = 1E3 * parseFloat(a.lifetimeVariance);
  this.da = qb(a.startColor);
  this.ea = qb(a.startColorVariance);
  this.Y = qb(a.endColor);
  this.Z = qb(a.endColorVariance);
  this.pa = ob(a.positionVariance);
  this.na = ob(a.speed);
  this.oa = ob(a.speedVariance);
  this.lb = parseFloat(a.startSize);
  this.mb = parseFloat(a.startSizeVariance);
  this.Za = parseFloat(a.endSize);
  this.$a = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.ta = a.blendOptions.slice(0);
  this.A = i;
  this.l || (this.l = C.createBuffer());
  this.k = new Float32Array(18 * this.H);
  for(var a = Ca("particles"), b = C, c = 0;c < this.H;c++) {
    Eb(this, c)
  }
  b.uniform1i(a.Kb, 0);
  Fb(this, a);
  this.I = this.N = this.elapsedTime = 0;
  this.Ya = this.H / Math.abs(this.Aa)
};
function Eb(a, b, c, d) {
  var e = a.k;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.lb + a.mb * M();
  e[18 * b + 3] = a.Za + a.$a * M();
  e[18 * b + 4] = a.na[0] + a.oa[0] * M();
  e[18 * b + 5] = a.na[1] + a.oa[1] * M();
  e[18 * b + 6] = a.na[2] + a.oa[2] * M();
  e[18 * b + 7] = M() * a.pa[0];
  e[18 * b + 8] = M() * a.pa[1];
  e[18 * b + 9] = M() * a.pa[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.da[0] + M() * a.ea[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.da[1] + M() * a.ea[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.da[2] + M() * a.ea[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.da[3] + M() * a.ea[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.Y[0] + M() * a.Z[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.Y[1] + M() * a.Z[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.Y[2] + M() * a.Z[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.Y[3] + M() * a.Z[3]))
}
function Fb(a, b) {
  var c = C;
  c.bindBuffer(c.ARRAY_BUFFER, a.l);
  b.Ta || (c.vertexAttribPointer(b.a.a_lifetime, 1, c.FLOAT, k, 72, 0), c.vertexAttribPointer(b.a.a_startTime, 1, c.FLOAT, k, 72, 4), c.vertexAttribPointer(b.a.a_startSize, 1, c.FLOAT, k, 72, 8), c.vertexAttribPointer(b.a.a_endSize, 1, c.FLOAT, k, 72, 12), c.vertexAttribPointer(b.a.a_speed, 3, c.FLOAT, k, 72, 16), c.vertexAttribPointer(b.a.a_startPosition, 3, c.FLOAT, k, 72, 28), c.vertexAttribPointer(b.a.a_startColor, 4, c.FLOAT, k, 72, 40), c.vertexAttribPointer(b.a.a_endColor, 4, c.FLOAT, k, 72, 
  56), b.Ta = i);
  c.bufferData(c.ARRAY_BUFFER, a.k, c.STATIC_DRAW)
}
var Gb = new Float32Array(18);
Bb.prototype.update = function(a) {
  if(Ca("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.Ya;
    for(this.N += a;this.I < this.H && this.N > b && this.A;) {
      a = Math.abs(this.Aa + this.ab * M()), Eb(this, this.I++, a, this.elapsedTime), this.Fa = i, this.N -= b
    }
    for(b = 0;b < this.H;b++) {
      var a = this.k, c = 18 * b;
      if(0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.I - 1) {
        var d = a.subarray(c, c + 18);
        Gb.set(d);
        Gb[0] = -1;
        d = a.subarray(c + 18, 18 * this.I);
        a.set(d, c);
        a.set(Gb, 18 * (this.I - 1));
        this.I--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.A = k)
  }
};
Bb.prototype.R = function() {
  var a = Ca("particles");
  if(a) {
    var b = C, c = Ia("texture", this.cb);
    b.blendFunc(b[this.ta[0]], b[this.ta[1]]);
    b.uniform1f(a.Lb, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.K);
    this.Fa ? (Fb(this, a), this.Fa = k) : b.bindBuffer(b.ARRAY_BUFFER, this.l);
    (this.f || this.parent && this.parent.f) && mb(ua, this.d, this.r);
    b.uniformMatrix4fv(a.z, k, this.r);
    b.drawArrays(b.POINTS, 0, this.H);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
q("chesterGL.GPUParticleSystem", Bb);
Bb.loadShaders = Db;
Bb.prototype.loadProperties = Bb.prototype.bb;
function W(a, b) {
  this.totalTime = a;
  this.b = b;
  this.j = 0
}
o = W.prototype;
o.s = 0;
o.b = j;
o.totalTime = 0;
o.j = 0;
o.v = k;
o.A = k;
o.update = function(a) {
  this.j += a;
  0 < this.totalTime && this.j >= this.totalTime && this.stop()
};
o.m = function() {
  this.A = i
};
o.stop = function() {
  this.v = i;
  this.A = k
};
o.reset = function() {
  this.v = this.A = k;
  this.j = 0
};
function X(a, b, c, d) {
  W.call(this, b, d);
  this.ha = ob(a);
  this.O = void 0 !== c ? c === i : i;
  this.Ka = new Float32Array(3);
  this.$ = new Float32Array(3)
}
u(X, W);
X.prototype.ha = j;
X.prototype.$ = j;
X.prototype.O = i;
X.prototype.Ka = j;
var Hb = new Float32Array(3);
X.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  var a = this.b, b = Math.min(1, this.j / this.totalTime), c = this.Ka, d = this.$, e = c[0], g = c[1], c = c[2];
  Hb[0] = (d[0] - e) * b + e;
  Hb[1] = (d[1] - g) * b + g;
  Hb[2] = (d[2] - c) * b + c;
  a.ca(Hb[0], Hb[1], Hb[2])
};
X.prototype.m = function() {
  W.prototype.m.call(this);
  this.b || f("invalid move action! - no block");
  if(this.O) {
    var a = this.ha, b = this.b.position, c = this.$;
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2]
  }else {
    pb(this.$, this.ha)
  }
  pb(this.Ka, this.b.position)
};
X.prototype.stop = function() {
  W.prototype.stop.call(this);
  this.j >= this.totalTime && this.b.ca(this.$)
};
X.prototype.reverse = function() {
  this.O || f("This only works on relative movements");
  var a = [], b = this.ha;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new X(a, this.totalTime, i)
};
function Y(a, b, c, d, e) {
  W.call(this, c, e);
  this.O = d;
  this.wa = a;
  this.xa = b;
  this.Ma = this.La = this.ja = this.ia = 0
}
u(Y, W);
o = Y.prototype;
o.m = function() {
  Y.B.m.call(this);
  this.b || f("invalid scale action - no block provided");
  this.O ? (this.ia = this.b.S + this.wa, this.ja = this.b.qa + this.xa) : (this.ia = this.wa, this.ja = this.xa);
  this.La = this.b.S;
  this.Ma = this.b.qa
};
o.update = function(a) {
  Y.B.update.call(this, a);
  var a = this.b, b = Math.min(1, this.j / this.totalTime);
  a.Ja(this.La + b * (this.ia - this.La), this.Ma + b * (this.ja - this.Ma))
};
o.stop = function() {
  Y.B.stop.call(this);
  this.j >= this.totalTime && this.b.Ja(this.ia, this.ja)
};
o.reset = function() {
  Y.B.reset.call(this)
};
o.reverse = function() {
  this.O || f("This only works on relative movements");
  return new Y(-this.wa, -this.xa, this.totalTime, i)
};
function Ib(a, b, c) {
  this.Ua = a;
  this.Sa = c;
  W.call(this, b || 1)
}
u(Ib, W);
Ib.prototype.Ua = j;
Ib.prototype.Sa = j;
Ib.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  this.v && this.Ua.call(j, this.Sa)
};
function Jb(a, b) {
  W.call(this, a.totalTime + b.totalTime);
  this.p = [a, b]
}
u(Jb, W);
o = Jb.prototype;
o.p = j;
o.ua = 0;
o.kb = 0;
o.m = function() {
  W.prototype.m.call(this);
  this.kb = this.p[0].totalTime;
  this.b.Ga(this.p[0])
};
o.reset = function() {
  W.prototype.reset.call(this);
  this.ua = 0;
  this.p[0].reset();
  this.p[1].reset();
  J.Pa(this.p[0].s);
  J.Pa(this.p[1].s)
};
o.update = function(a) {
  W.prototype.update.call(this, a);
  0 === this.ua && this.j >= this.kb && (this.p[0].stop(), this.ua = 1, this.b.Ga(this.p[1]))
};
function Kb(a, b) {
  this.Da = b || 1;
  this.Oa = 0;
  this.action = a;
  W.call(this, a.totalTime)
}
u(Kb, W);
o = Kb.prototype;
o.Da = 0;
o.Oa = 0;
o.action = j;
o.m = function() {
  W.prototype.m.call(this);
  this.action.b = this.b
};
o.update = function(a) {
  W.prototype.update.call(this, a);
  this.action.update(a);
  if(this.v && (0 > this.Da || this.Oa < this.Da)) {
    this.Oa++, this.reset(), this.action.reset(), this.m()
  }
};
function Lb(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === i && (a = -1);
  W.call(this, a, d);
  this.jb = c === i;
  this.frames = b.slice(0)
}
u(Lb, W);
o = Lb.prototype;
o.M = 0;
o.delay = 0;
o.frames = j;
o.jb = k;
o.update = function(a) {
  W.prototype.update.call(this, a);
  a = this.b;
  this.v ? (this.M = this.frames.length - 1, a.T(this.frames[this.M])) : this.j >= this.delay * this.M && (a.T(this.frames[this.M++]), this.M == this.frames.length && (this.jb ? this.j = this.M = 0 : this.v = i))
};
function Mb(a, b, c, d) {
  this.Ra = a;
  this.Xa = b;
  W.call(this, c, d)
}
u(Mb, W);
Mb.prototype.Ra = 0;
Mb.prototype.Xa = 0;
Mb.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  this.v ? this.b.Ia(0) : this.b.Ia(this.Ra * Math.sin(2 * (this.j / 1E3 * this.Xa) * Math.PI / (this.totalTime / 1E3)))
};
var J = {J:{}, Cb:0, eb:function(a) {
  if(!a.s || !J.J.hasOwnProperty(a.s)) {
    a.s = J.Cb++, J.J[a.s] = a
  }
  a.m();
  return a.s
}, Pa:function(a) {
  J.J.hasOwnProperty(a) && delete J.J[a]
}, Jb:function(a) {
  for(var b in J.J) {
    var c = J.J[b];
    c.A && c.update(a);
    c.v && delete J.J[c.s]
  }
}};
S.prototype.Ga = function(a) {
  a.b = this;
  return J.eb(a)
};
q("chesterGL.ActionManager", J);
q("chesterGL.MoveAction", X);
q("chesterGL.ScaleAction", Y);
q("chesterGL.CallbackAction", Ib);
q("chesterGL.SequenceAction", Jb);
q("chesterGL.RepeatAction", Kb);
q("chesterGL.AnimateAction", Lb);
q("chesterGL.WiggleAction", Mb);
J.scheduleAction = J.eb;
J.unscheduleAction = J.Pa;
Jb.createSequence = function(a) {
  0 === arguments.length && f("Needs at least one action to create a sequence!");
  for(var b = arguments[0], c = 1;c < arguments.length;c++) {
    b = new Jb(b, arguments[c])
  }
  return b
};
S.prototype.runAction = S.prototype.Ga;
W.prototype.stop = W.prototype.stop;
X.prototype.stop = X.prototype.stop;
Y.prototype.stop = Y.prototype.stop;
Jb.prototype.stop = Jb.prototype.stop;
Kb.prototype.stop = Kb.prototype.stop;
X.prototype.reverse = X.prototype.reverse;
Y.prototype.reverse = Y.prototype.reverse;
var U = {frames:{}, Hb:function(a) {
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    Ga("texture", b, j, function(c) {
      var c = c.height, d = a.frames, e;
      for(e in d) {
        var g = d[e], h = {frame:{}, c:""};
        h.frame = sb(g.frame.x, c - (g.frame.y + g.frame.h), g.frame.w, g.frame.h);
        h.c = b;
        U.frames[e] = h
      }
    })
  }else {
    f("Unkown json data")
  }
}, sb:function(a, b) {
  E.frameset[a.name].data = b;
  return i
}, ka:function(a) {
  return U.frames[a]
}, Eb:function(a) {
  console.log("loadFrames: will fetch " + a);
  Ga("frameset", {url:a, dataType:"json"}, j, function(a) {
    U.Hb(a)
  })
}};
wa.frameset = U.sb;
q("chesterGL.BlockFrames", U);
U.getFrame = U.ka;
U.loadFrames = U.Eb;
function V(a, b) {
  B || f("PrimitiveBlock only works on WebGL mode");
  this.Ca = a || 500;
  this.Ba = b || 500;
  S.call(this, j, P.PRIMITIVE);
  var c = C;
  this.za = c.createBuffer();
  this.q = new Float32Array(7 * this.Ca);
  this.ya = c.createBuffer();
  this.e = new Float32Array(14 * this.Ba);
  this.g = T.DEFAULT
}
u(V, S);
o = V.prototype;
o.za = j;
o.q = j;
o.ya = j;
o.e = j;
o.Ba = 0;
o.t = 0;
o.Ca = 0;
o.u = 0;
o.Q = [];
o.qb = function(a, b, c) {
  if(this.u < this.Ca) {
    var d = 7 * this.u, c = c || [1, 1, 1, 1];
    this.q[d + 0] = a;
    this.q[d + 1] = b;
    this.q[d + 2] = 0;
    this.q[d + 3] = c[0];
    this.q[d + 4] = c[1];
    this.q[d + 5] = c[2];
    this.q[d + 6] = c[3];
    this.u++
  }else {
    f("too many points!")
  }
};
o.pb = function(a, b, c, d, e) {
  if(this.t < this.Ba) {
    var g = 14 * this.t, e = e || [1, 1, 1, 1];
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
    this.t++
  }else {
    f("too many lines!")
  }
};
o.va = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || k, d = d || k, e = a.length, g = C, h = new Float32Array(7 * a.length), m = g.createBuffer(), l = 0;l < e;l++) {
    var p = a[l];
    h[7 * l + 0] = p[0];
    h[7 * l + 1] = p[1];
    h[7 * l + 2] = p[2];
    h[7 * l + 3] = b[0];
    h[7 * l + 4] = b[1];
    h[7 * l + 5] = b[2];
    h[7 * l + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, m);
  g.bufferData(g.ARRAY_BUFFER, h, g.STATIC_DRAW);
  this.Q.unshift([h, m, c, d])
};
o.rb = function(a, b, c, d, e, g) {
  c /= 2;
  d /= 2;
  this.va([[a - c, b - d, 0], [a - c, b + d, 0], [a + c, b + d, 0], [a + c, b - d, 0]], e, i, g)
};
o.C = function() {
  this.t = this.u = 0;
  0 < this.Q.length && (this.Q = []);
  S.prototype.C.call(this)
};
o.R = function() {
  var a = C, b = Ca(vb[this.g]);
  if(0 < this.u || 0 < this.t || 0 < this.Q.length) {
    mb(ua, this.d, this.r), a.uniformMatrix4fv(b.z, k, this.r)
  }
  if(0 < this.u) {
    var c = C, d = 7 * this.u;
    c.bindBuffer(c.ARRAY_BUFFER, this.za);
    c.bufferData(c.ARRAY_BUFFER, this.q.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.za);
    a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
    a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
    a.drawArrays(a.POINTS, 0, this.u)
  }
  0 < this.t && (c = C, d = 14 * this.t, c.bindBuffer(c.ARRAY_BUFFER, this.ya), c.bufferData(c.ARRAY_BUFFER, this.e.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.ya), a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0), a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.t));
  c = this.Q.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.Q[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, k, 28, 0);
      a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, k, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
q("chesterGL.PrimitiveBlock", V);
V.prototype.drawPoint = V.prototype.qb;
V.prototype.drawLine = V.prototype.pb;
V.prototype.drawPolygon = V.prototype.va;
V.prototype.drawRectangle = V.prototype.rb;
var Nb, Ob, Pb, Qb;
function Rb() {
  return aa.navigator ? aa.navigator.userAgent : j
}
Qb = Pb = Ob = Nb = k;
var Sb;
if(Sb = Rb()) {
  var Tb = aa.navigator;
  Nb = 0 == Sb.indexOf("Opera");
  Ob = !Nb && -1 != Sb.indexOf("MSIE");
  Pb = !Nb && -1 != Sb.indexOf("WebKit");
  Qb = !Nb && !Pb && "Gecko" == Tb.product
}
var Ub = Ob, Vb = Qb, Wb = Pb;
var Xb;
if(Nb && aa.opera) {
  var Yb = aa.opera.version;
  "function" == typeof Yb && Yb()
}else {
  Vb ? Xb = /rv\:([^\);]+)(\)|;)/ : Ub ? Xb = /MSIE\s+([^\);]+)(\)|;)/ : Wb && (Xb = /WebKit\/(\S+)/), Xb && Xb.exec(Rb())
}
;var Zb = j, $b = j;
function ac(a) {
  (a = bc[a]) || f("Invalid map - make sure you call loadTMX first");
  S.call(this, j, P.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = B ? new Z(j, c.blocks.length) : new S, e = j, g = 0;g < c.blocks.length;g++) {
      var h = c.blocks[g];
      e || (e = cc(a.tilesets, h.gid), d.U(e.texture));
      var m;
      B ? m = d.Wa(h.frame) : (m = new S(h.frame), m.U(e.texture));
      m.ca(h.position);
      d.D(m)
    }
    this.D(d)
  }
}
u(ac, S);
ac.prototype.R = function() {
};
var bc = {};
function cc(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
wa.tmx = function(a, b) {
  E.tmx[a.name].data = b;
  return i
};
q("chesterGL.TMXBlock", ac);
ac.loadTMX = function(a) {
  Ga("tmx", {url:a, dataType:"xml"}, j, function(b) {
    var c = {}, b = $(b).find("map"), d = b.attr("orientation");
    c.tilesets = [];
    b.find("tileset").each(function(a, b) {
      var d = $(b);
      if("obstruction" != d.attr("name")) {
        var m = {};
        m.tileSize = new fb(parseInt(d.attr("tilewidth"), 10), parseInt(d.attr("tileheight"), 10));
        d.attr("spacing") && (m.spacing = parseInt(d.attr("spacing"), 10));
        d.attr("margin") && (m.margin = parseInt(d.attr("margin"), 10));
        var l = d.find("image").first();
        m.imgSize = new fb(parseInt(l.attr("width"), 10), parseInt(l.attr("height"), 10));
        m.texture = l.attr("source");
        m.firstgid = parseInt(d.attr("firstgid"), 10);
        c.tilesets.push(m)
      }
    });
    c.mapTileSize = new fb(parseInt(b.attr("tilewidth"), 10), parseInt(b.attr("tileheight"), 10));
    c.layers = [];
    b.find("layer").each(function(a, b) {
      if("0" != $(b).attr("visible")) {
        var h = {blocks:[]}, m = new fb(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), l = $(b).find("data").first();
        if(l) {
          ("base64" != l.attr("encoding") || l.attr("compression")) && f("Invalid TMX Data");
          var p = l.text().trim();
          if(!Zb) {
            Zb = {};
            $b = {};
            for(l = 0;65 > l;l++) {
              Zb[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l), $b[Zb[l]] = l
            }
          }
          for(var r = $b, l = [], s = 0;s < p.length;) {
            var y = r[p.charAt(s++)], z = s < p.length ? r[p.charAt(s)] : 0;
            ++s;
            var w = s < p.length ? r[p.charAt(s)] : 0;
            ++s;
            var x = s < p.length ? r[p.charAt(s)] : 0;
            ++s;
            (y == j || z == j || w == j || x == j) && f(Error());
            l.push(y << 2 | z >> 4);
            64 != w && (l.push(z << 4 & 240 | w >> 2), 64 != x && l.push(w << 6 & 192 | x))
          }
          p = 0;
          r = j;
          for(s = 0;s < m.height;s++) {
            for(y = 0;y < m.width;y++) {
              var t = l[p + 3] << 24 | l[p + 2] << 16 | l[p + 1] << 8 | l[p + 0] >>> 0;
              if(0 !== t) {
                r || (r = cc(c.tilesets, t));
                z = {};
                z.gid = t;
                var A = r.margin || 0, G = r.spacing || 0, w = r.tileSize, N = r.imgSize, x = c.mapTileSize, O = parseInt((N.width - 2 * A + G) / (w.width + G), 10), t = t - r.firstgid, t = sb(t % O * (w.width + G) + A, N.height - w.height - A - G - parseInt(t / O, 10) * (w.height + G) + A, w.width, w.height);
                z.frame = t;
                var K, L;
                "orthogonal" == d ? (K = y * x.width + w.width / 2, L = (m.height - s - 1) * x.height + w.height / 2) : "isometric" == d ? (K = x.width / 2 * (m.width + y - s - 1) + w.width / 2, L = x.height / 2 * (2 * m.height - y - s - 2) + w.height / 2) : f("Invalid orientation");
                z.position = [K, L, 0];
                h.blocks.push(z)
              }
              p += 4
            }
          }
        }else {
          f("No data for layer!")
        }
        c.layers.push(h)
      }
    });
    bc[a] = c
  })
};
function dc(a, b, c) {
  var b = b || "20px sans-serif", c = c || "White", d = document.createElement("canvas");
  this.canvas = d;
  this.context = d.getContext("2d");
  this.context.textBaseline = "bottom";
  this.font = b;
  this.fillStyle = c;
  (b = b.match(/^(\d+)px/)) ? this.Na = parseInt(b[1], 10) : f("Invalid text height - use the form NNpx");
  this.c = Math.random() + ".canvas";
  E.texture || (E.texture = {});
  E.texture[this.c] = d;
  S.call(this, ec(this, a));
  this.hb(a, k);
  this.g = T.TEXTURE
}
u(dc, S);
o = dc.prototype;
o.canvas = j;
o.context = j;
o.Ea = k;
o.text = "";
o.Na = 0;
o.font = "";
o.fillStyle = "";
o.hb = function(a, b) {
  this.text = a;
  fc(this);
  b || (this.T(ec(this)), this.Ea = i)
};
function fc(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, c.height);
  c.K || (c.K = C.createTexture(), E.texture[a.c].data = c);
  Ka(c);
  a.Ea = k
}
function ec(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.Na;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  c.textBaseline = "bottom";
  return[0, 0, e, a.Na]
}
o.C = function() {
  this.Ea && fc(this);
  S.prototype.C.call(this)
};
q("chesterGL.LabelBlock", dc);
dc.prototype.setText = dc.prototype.hb;
function Z(a, b) {
  B || f("BlockGroup only works on WebGL mode");
  S.call(this, j, P.BLOCKGROUP);
  a ? (this.c = a, this.g = T.TEXTURE) : this.g = T.DEFAULT;
  this.P = b || 10;
  gc(this)
}
u(Z, S);
o = Z.prototype;
o.P = 0;
o.ma = k;
o.la = j;
o.n = j;
function gc(a, b, c) {
  var d = C;
  a.l || (a.l = d.createBuffer());
  a.la || (a.la = d.createBuffer());
  var d = new Float32Array(36 * a.P), e = new Uint16Array(6 * a.P);
  b && d.set(b);
  c && e.set(c);
  a.k = d;
  a.n = e
}
o.Wa = function(a) {
  a = new S(a, P.STANDALONE, this);
  this.c && a.U(this.c);
  return a
};
o.D = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
    this.children.length >= this.P && (this.P *= 2, gc(this, this.k, this.n));
    this.c ? this.c != c.c && f("Invalid child: only can add child with the same texture") : this.c = c.c;
    this.children.push(c);
    c.ga = this.children.length - 1;
    c.k = this.k;
    this.ma = i
  }
};
o.removeChild = function(a) {
  a.parent != this && f("Invalid child");
  if(this.o) {
    this.X.push(a)
  }else {
    a = this.children.indexOf(a);
    if(0 < a) {
      for(this.children.splice(a, 1);a < this.Rb;a++) {
        var b = this.children[a];
        b.ga = a;
        b.f = i;
        b.F = i
      }
    }
    this.ma = i
  }
};
o.C = function() {
  this.o = i;
  this.update && this.update(Aa);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].C()
    }
    a = C;
    a.bindBuffer(a.ARRAY_BUFFER, this.l);
    a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW);
    if(this.ma) {
      var d, a = (this.n[-1] || -1) + 1;
      d = d || Math.max(this.children.length, 1);
      for(b = 0;b < d;b++) {
        c = 6 * b, this.n[c + 0] = a, this.n[c + 1] = a + 1, this.n[c + 2] = a + 2, this.n[c + 3] = a + 2, this.n[c + 4] = a + 1, this.n[c + 5] = a + 3, a += 4
      }
      d = C;
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.la);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.n, d.STATIC_DRAW);
      this.ma = k
    }
    this.R();
    for(this.o = this.G = this.F = this.f = k;d = this.X.shift();) {
      this.removeChild(d)
    }
  }else {
    this.o = k
  }
};
o.R = function(a) {
  var b = C, c = Ca(vb[this.g]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.l);
  b.vertexAttribPointer(c.a.vertexPositionAttribute, 3, b.FLOAT, k, 36, 0);
  if(this.g != T.DEFAULT && this.g == T.TEXTURE) {
    var d = Ia("texture", this.c);
    b.vertexAttribPointer(c.a.textureCoordAttribute, 2, b.FLOAT, k, 36, 12);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, d.K);
    b.uniform1i(c.Ha, 0)
  }
  b.vertexAttribPointer(c.a.vertexColorAttribute, 4, b.FLOAT, k, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.la);
  (this.f || this.parent && this.parent.f) && mb(ua, this.d, this.r);
  b.uniformMatrix4fv(c.z, k, this.r);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
q("chesterGL.BlockGroup", Z);
Z.prototype.createBlock = Z.prototype.Wa;
Z.prototype.addChild = Z.prototype.D;
Z.prototype.removeChild = Z.prototype.removeChild;

//@ sourceMappingURL=chester.js.map
