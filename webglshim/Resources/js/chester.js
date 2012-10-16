function f(a) {
  throw a;
}
var h = !0, i = null, j = !1;
function n(a) {
  return function() {
    return this[a]
  }
}
var o, aa = this;
Math.floor(2147483648 * Math.random()).toString(36);
function p(a, b) {
  var c = a.split("."), d = aa;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var e;c.length && (e = c.shift());) {
    !c.length && void 0 !== b ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
}
function r(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.qa = b.prototype;
  a.prototype = new c
}
;function ba(a, b) {
  this.x = void 0 !== a ? a : 0;
  this.y = void 0 !== b ? b : 0
}
ba.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function ea(a, b) {
  this.x = a;
  this.y = b
}
r(ea, ba);
var fa, ga;
HTMLCanvasElement.kb = new ea(0, 0);
function ha(a) {
  var b = t, c = HTMLCanvasElement.kb;
  c.x = 0;
  c.y = 0;
  "undefined" === typeof b.__offset && (b.__offset = $(b).offset());
  a.changedTouches && (a = a.changedTouches[0]);
  c.x = a.pageX - b.__offset.left;
  c.y = b.height - (a.pageY - b.__offset.top);
  return c
}
"undefined" === typeof requestAnimationFrame && ("undefined" !== typeof webkitRequestAnimationFrame ? requestAnimationFrame = webkitRequestAnimationFrame : "undefined" !== typeof mozRequestAnimationFrame ? requestAnimationFrame = mozRequestAnimationFrame : "undefined" !== typeof msRequestAnimationFrame ? requestAnimationFrame = msRequestAnimationFrame : "undefined" !== typeof oRequestAnimationFrame ? requestAnimationFrame = oRequestAnimationFrame : f("No valid RequestAnimationFrame function available"));
function ia(a, b) {
  console.log(WebGLDebugUtils.glEnumToString(a) + " was caused by call to " + b)
}
var ja = j;
"undefined" !== typeof runScript && (ja = h, ka = _mat4mul, la = _mat4mulvec3, ma = _mat4translate, na = _mat4rotate, oa = _mat4scale);
var pa = {useGoogleAnalytics:j, projection:"3d", webglMode:h, usesOffscreenBuffer:j, basePath:""}, qa = "3d", D = h, ra = j, sa = "", E = i, ta = j, ua = {}, va = i, wa = i, xa = i, t = i, ya = j, F = {}, za = {}, Aa = {}, Ba = {}, Ca = Date.now(), Da = 0, Ea = {Kb:0, Nb:1, Ob:2, Lb:3, Mb:4}, G = i, H = [];
function Fa(a) {
  var b = ua[a], c = E;
  if(a != va) {
    va = a;
    c.validateProgram(b);
    c.useProgram(b);
    for(var d in b.a) {
      c.enableVertexAttribArray(b.a[d])
    }
  }
  return b
}
function Ga() {
  var a = t;
  E.da = a.width;
  E.U = a.height
}
function Ha(a, b) {
  var c = E, d = Ia(a, "frag"), e = Ia(a, "vert"), g = c.createShader(c.FRAGMENT_SHADER);
  c.shaderSource(g, d);
  c.compileShader(g);
  if(c.getShaderParameter(g, c.COMPILE_STATUS)) {
    d = c.createShader(c.VERTEX_SHADER);
    c.shaderSource(d, e);
    c.compileShader(d);
    if(c.getShaderParameter(d, c.COMPILE_STATUS)) {
      c = E;
      e = c.createProgram();
      c.attachShader(e, g);
      c.attachShader(e, d);
      c.linkProgram(e);
      c.getProgramParameter(e, c.LINK_STATUS) || console.log("problem linking shader");
      ua[a] = e;
      b && b(e)
    }else {
      console.log("problem compiling vertex shader " + a + "(" + c.getShaderInfoLog(d) + "):\n" + e)
    }
  }else {
    console.log("problem compiling fragment shader " + a + "(" + c.getShaderInfoLog(g) + "):\n" + d)
  }
}
function Ia(a, b) {
  var c = "", d = new XMLHttpRequest;
  d.open("GET", sa + "shaders/" + a + "." + b, j);
  d.onreadystatechange = function() {
    d.readyState == 4 && d.status == 200 ? c = d.responseText : d.readyState == 4 && console.log("error getting the shader data")
  };
  d.send();
  return c
}
function Ja(a, b, c, d) {
  b = typeof b == "object" ? {dataType:b.dataType, url:b.url, name:b.name || b.url} : {url:b, name:c || b};
  F[a] || (F[a] = {});
  var c = F[a], e = b.name;
  if(c[e]) {
    if(c[e].status == "loading") {
      d && c[e].$.push(d)
    }else {
      if(c[e].status == "loaded") {
        d && d(c[e].data)
      }else {
        if(c[e].status == "try") {
          c[e].status = "loading";
          if(Aa[a]) {
            Aa[a](a, b)
          }else {
            Aa["default"](a, b)
          }
          d && c[e].$.push(d)
        }
      }
    }
  }else {
    c[e] = {data:i, name:e, status:"try", $:[]};
    d && c[e].$.push(d);
    Ja(a, b)
  }
}
function Ka(a, b) {
  var c = Ba[a], d, e;
  if(!c) {
    Ba[a] = [];
    c = Ba[a]
  }
  b && c.push(b);
  var g = h;
  if(a == "all") {
    for(var k in F) {
      d = F[k];
      for(e in d) {
        if(d[e].status != "loaded") {
          g = j;
          break
        }
      }
      if(!g) {
        break
      }
    }
  }else {
    d = F[a];
    for(e in d) {
      if(d[e].status != "loaded") {
        g = j;
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
function La(a, b) {
  return b ? F[a][b].data : i
}
function Ma(a, b) {
  return b ? b in F[a] : j
}
function Na(a) {
  var b = E, c = h;
  try {
    var d = 0;
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, a.J);
    b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a);
    d = b.getError();
    if(d !== 0) {
      console.log("gl error " + d);
      c = j
    }
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
    b.bindTexture(b.TEXTURE_2D, i)
  }catch(e) {
    console.log("got some error: " + e);
    c = j
  }
  return c
}
function Oa(a, b, c) {
  F[c][a.name].data = b;
  return h
}
function Pa(a, b) {
  if(D && !b.J) {
    b.J = E.createTexture()
  }
  F.texture[a.name].data = b;
  return D ? Na(b) : h
}
function Xa(a, b) {
  var c = new Image, d = b.url, e = b.name;
  c.src = "";
  c.addEventListener("load", function() {
    var d = F.texture[e];
    if(za[a](b, c)) {
      d.status = "loaded";
      for(var k;k = d.$.shift();) {
        k(d.data)
      }
      Ka(a);
      Ka("all")
    }else {
      d.status = "try";
      Ja(a, b)
    }
  }, j);
  if(d.match(/^http(s)?:/)) {
    c.crossOrigin = "anonymous";
    c.src = d
  }else {
    c.src = d.match(/^data:/) ? d : sa + d
  }
}
function Ya(a, b) {
  var c = b.url, d = c, e = b.name;
  c.match(/^http(s)?:\/\//) || (d = sa + c);
  var g = new XMLHttpRequest;
  g.open("GET", d);
  g.withCredentials = h;
  g.onreadystatechange = function() {
    if(g.readyState == 4 && g.status == 200) {
      var d = F[a][e];
      if((za[a] || za["default"])(b, g.response, a)) {
        d.status = "loaded";
        for(var m;m = d.$.shift();) {
          m(d.data)
        }
        Ka(a);
        Ka("all")
      }else {
        d.status = "try";
        Ja(a, b)
      }
    }else {
      g.readyState == 4 && console.log("Error loading asset " + c)
    }
  };
  g.send()
}
function Za() {
  var a;
  if(D) {
    a = E;
    a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT)
  }else {
    a = ga;
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.fillRect(0, 0, a.da, a.U)
  }
  if(xa) {
    xa.B();
    if(!xa.Z) {
      xa.onEnterScene()
    }
  }
  if(!D && ra) {
    a.fillRect(0, 0, a.da, a.U);
    a.drawImage(fa, 0, 0)
  }
  a = Date.now();
  Da = a - Ca;
  Ca = a
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
  if(!ta) {
    requestAnimationFrame(eb, t);
    G && G.begin();
    Za();
    J.Hb(Da);
    G && G.end()
  }
}
function L() {
  return Math.random() * 2 - 1
}
p("chesterGL.version", "0.3");
p("chesterGL.settings", pa);
p("chesterGL.mouseEvents", Ea);
Ea.UP = 2;
Ea.DOWN = 0;
Ea.MOVE = 1;
Ea.ENTER = 3;
Ea.LEAVE = 4;
p("chesterGL.viewportSize", function() {
  return new fb(E.da, E.U)
});
p("chesterGL.setup", function(a) {
  a = ja ? new ChesterCanvas(innerWidth, innerHeight) : document.getElementById(a);
  qa = pa.projection;
  D = pa.webglMode;
  ra = pa.usesOffscreenBuffer;
  sa = pa.basePath;
  try {
    t = a;
    if(D) {
      if((E = a.getContext("experimental-webgl", {alpha:j, antialias:j, preserveDrawingBuffer:h})) && typeof WebGLDebugUtils !== "undefined") {
        console.log("installing debug context");
        E = WebGLDebugUtils.makeDebugContext(E, ia)
      }
    }
  }catch(b) {
    console.log("ERROR: " + b)
  }
  if(!E) {
    E = a.getContext("2d");
    if(ra) {
      fa = document.createElement("canvas");
      fa.width = a.width;
      fa.height = a.height;
      ga = fa.getContext("2d");
      ga.da = a.width;
      ga.U = a.height
    }else {
      ga = E
    }
    (!E || !ga) && f("Error initializing graphic context!");
    D = pa.webglMode = j
  }
  Ga();
  if(ja) {
    _touchBeganListeners.push($a);
    _touchMovedListeners.push(ab);
    _touchEndedListeners.push(bb)
  }else {
    if(typeof navigator !== "undefined" && navigator.platform.match(/iPhone|iPad/)) {
      document.addEventListener("touchstart", $a, j);
      document.addEventListener("touchmove", function(a) {
        ab(a);
        a.preventDefault()
      }, j);
      document.addEventListener("touchend", bb, j)
    }else {
      $(t).mousedown($a);
      $(t).mousemove(ab);
      $(t).mouseup(bb);
      $(t).mouseenter(cb);
      $(t).mouseleave(db)
    }
  }
  if(D) {
    var c = E;
    Ha("default", function(a) {
      a.A = c.getUniformLocation(a, "uMVPMatrix");
      a.a = {vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition"), vertexColorAttribute:c.getAttribLocation(a, "aVertexColor")};
      a.mvpMatrixUniform = a.A;
      a.attribs = a.a
    });
    Ha("texture", function(a) {
      a.A = c.getUniformLocation(a, "uMVPMatrix");
      a.Ga = c.getUniformLocation(a, "uSampler");
      a.a = {vertexColorAttribute:c.getAttribLocation(a, "aVertexColor"), textureCoordAttribute:c.getAttribLocation(a, "aTextureCoord"), vertexPositionAttribute:c.getAttribLocation(a, "aVertexPosition")};
      a.mvpMatrixUniform = a.A;
      a.samplerUniform = a.Ga;
      a.attribs = a.a
    })
  }
  if(!ja) {
    var a = window.location.search.substring(1).split("&"), d;
    for(d in a) {
      var e = a[d].split("=");
      if(e[0] == "_cdbg" && e[1] == "1") {
        ya = h;
        console.log("debug mode on")
      }
    }
  }
  za.texture = Pa;
  za["default"] = Oa;
  Aa.texture = Xa;
  Aa["default"] = Ya;
  if(typeof Stats !== "undefined") {
    console.log("chesterGL: adding stats");
    G = new Stats;
    G.setMode(1);
    if(!ja) {
      G.domElement.style.position = "absolute";
      G.domElement.style.left = "0px";
      G.domElement.style.top = "0px";
      document.body.appendChild(G.domElement)
    }
    p("chesterGL.stats", G)
  }
});
p("chesterGL.canvasResized", Ga);
p("chesterGL.initShader", Ha);
p("chesterGL.registerAssetHandler", function(a, b) {
  za[a] = b
});
p("chesterGL.loadAsset", Ja);
p("chesterGL.assetsLoaded", Ka);
p("chesterGL.getAsset", La);
p("chesterGL.hasAsset", Ma);
p("chesterGL.setupPerspective", function() {
  var a = E;
  if(D) {
    a.clearColor(0, 0, 0, 1);
    a.blendFunc(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA);
    a.enable(a.BLEND);
    a.disable(a.DEPTH_TEST);
    var b = a.da, c = a.U;
    a.viewport(0, 0, b, c);
    wa = new Float32Array(16);
    if(qa == "2d") {
      console.log("setting up 2d projection (" + b + "," + c + ")");
      gb(wa, 2 / (b - 0), 0, 0, 0, 0, 2 / (c - 0), 0, 0, 0, 0, -2 / 2048, 0, -(b + 0) / (b - 0), -(c + 0) / (c - 0), -0, 1)
    }else {
      if(qa == "3d") {
        console.log("setting up 3d projection (" + b + "," + c + ")");
        var d = c / 1.1566;
        var a = new Float32Array(16), e = b / c, g = 60 * Math.PI / 180 / 2, k = Math.sin(g);
        if(!(k == 0 || e == 0)) {
          g = Math.cos(g) / k;
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
        ma(b, -d[0], -d[1], -d[2]);
        ka(a, b, wa)
      }else {
        f("Invalid projection: " + qa)
      }
    }
  }
});
p("chesterGL.setRunningScene", function(a) {
  if(xa && xa != a) {
    xa.onExitScene()
  }
  a.type == O.SCENE && (xa = a)
});
p("chesterGL.drawScene", Za);
p("chesterGL.run", eb);
p("chesterGL.togglePause", function() {
  if(ta) {
    ta = j;
    Ca = Date.now();
    eb()
  }else {
    ta = h
  }
});
p("chesterGL.isPaused", function() {
  return ta
});
p("chesterGL.setPause", function(a) {
  if(ta && !a) {
    ta = a;
    Ca = Date.now();
    eb()
  }else {
    ta = a
  }
});
p("chesterGL.addMouseHandler", function(a) {
  H.indexOf(a) == -1 && H.push(a)
});
p("chesterGL.removeMouseHandler", function(a) {
  a = H.indexOf(a);
  a >= 0 && H.splice(a, 1)
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
function P(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
P.prototype.BYTES_PER_ELEMENT = 8;
P.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
P.prototype.toString = Array.prototype.join;
"undefined" == typeof Float64Array && (P.BYTES_PER_ELEMENT = 8, P.prototype.BYTES_PER_ELEMENT = P.prototype.BYTES_PER_ELEMENT, P.prototype.set = P.prototype.set, P.prototype.toString = P.prototype.toString, p("Float64Array", P));
function Q(a) {
  this.length = a.length || a;
  for(var b = 0;b < this.length;b++) {
    this[b] = a[b] || 0
  }
}
Q.prototype.BYTES_PER_ELEMENT = 4;
Q.prototype.set = function(a, b) {
  for(var b = b || 0, c = 0;c < a.length && b + c < this.length;c++) {
    this[b + c] = a[c]
  }
};
Q.prototype.toString = Array.prototype.join;
"undefined" == typeof Float32Array && (Q.BYTES_PER_ELEMENT = 4, Q.prototype.BYTES_PER_ELEMENT = Q.prototype.BYTES_PER_ELEMENT, Q.prototype.set = Q.prototype.set, Q.prototype.toString = Q.prototype.toString, p("Float32Array", Q));
function lb(a) {
  var b = new Float32Array(3);
  mb(b, a);
  return b
}
function nb(a, b, c, d) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  return a
}
function mb(a, b) {
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
  var d = a[0], e = a[1], a = a[2], g = b[0], k = b[1], b = b[2];
  c[0] = e * b - a * k;
  c[1] = a * g - d * b;
  c[2] = d * k - e * g
}
;function ob(a) {
  var b = new Float32Array(4);
  pb(b, a);
  return b
}
function pb(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  a[3] = b[3]
}
;function gb(a, b, c, d, e, g, k, m, l, q, v, s, x, y, u, z, w) {
  a[0] = b;
  a[1] = c;
  a[2] = d;
  a[3] = e;
  a[4] = g;
  a[5] = k;
  a[6] = m;
  a[7] = l;
  a[8] = q;
  a[9] = v;
  a[10] = s;
  a[11] = x;
  a[12] = y;
  a[13] = u;
  a[14] = z;
  a[15] = w;
  return a
}
function kb(a, b, c) {
  a[b] = c[0];
  a[b + 4] = c[1];
  a[b + 8] = c[2];
  a[b + 12] = c[3]
}
function qb(a) {
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
function ka(a, b, c) {
  var d = a[0], e = a[1], g = a[2], k = a[3], m = a[4], l = a[5], q = a[6], v = a[7], s = a[8], x = a[9], y = a[10], u = a[11], z = a[12], w = a[13], A = a[14], a = a[15], B = b[0], C = b[1], K = b[2], U = b[3], M = b[4], N = b[5], ca = b[6], da = b[7], Qa = b[8], Ra = b[9], Sa = b[10], Ta = b[11], Ua = b[12], Va = b[13], Wa = b[14], b = b[15];
  c[0] = d * B + m * C + s * K + z * U;
  c[1] = e * B + l * C + x * K + w * U;
  c[2] = g * B + q * C + y * K + A * U;
  c[3] = k * B + v * C + u * K + a * U;
  c[4] = d * M + m * N + s * ca + z * da;
  c[5] = e * M + l * N + x * ca + w * da;
  c[6] = g * M + q * N + y * ca + A * da;
  c[7] = k * M + v * N + u * ca + a * da;
  c[8] = d * Qa + m * Ra + s * Sa + z * Ta;
  c[9] = e * Qa + l * Ra + x * Sa + w * Ta;
  c[10] = g * Qa + q * Ra + y * Sa + A * Ta;
  c[11] = k * Qa + v * Ra + u * Sa + a * Ta;
  c[12] = d * Ua + m * Va + s * Wa + z * b;
  c[13] = e * Ua + l * Va + x * Wa + w * b;
  c[14] = g * Ua + q * Va + y * Wa + A * b;
  c[15] = k * Ua + v * Va + u * Wa + a * b;
  return c
}
function la(a, b, c) {
  var d = b[0], e = b[1], b = b[2];
  c[0] = d * a[0] + e * a[4] + b * a[8] + a[12];
  c[1] = d * a[1] + e * a[5] + b * a[9] + a[13];
  c[2] = d * a[2] + e * a[6] + b * a[10] + a[14];
  return c
}
function ma(a, b, c, d) {
  var e = a[1] * b + a[5] * c + a[9] * d + a[13], g = a[2] * b + a[6] * c + a[10] * d + a[14], k = a[3] * b + a[7] * c + a[11] * d + a[15];
  a[12] = a[0] * b + a[4] * c + a[8] * d + a[12];
  a[13] = e;
  a[14] = g;
  a[15] = k;
  return a
}
function oa(a, b, c, d) {
  return gb(a, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * c, a[5] * c, a[6] * c, a[7] * c, a[8] * d, a[9] * d, a[10] * d, a[11] * d, a[12], a[13], a[14], a[15])
}
function na(a, b, c, d, e) {
  var g = a[0], k = a[1], m = a[2], l = a[3], q = a[4], v = a[5], s = a[6], x = a[7], y = a[8], u = a[9], z = a[10], w = a[11], A = Math.cos(b), B = Math.sin(b), C = 1 - A, b = c * c * C + A, K = c * d * C + e * B, U = c * e * C - d * B, M = c * d * C - e * B, N = d * d * C + A, ca = d * e * C + c * B, da = c * e * C + d * B, c = d * e * C - c * B, e = e * e * C + A;
  return gb(a, g * b + q * K + y * U, k * b + v * K + u * U, m * b + s * K + z * U, l * b + x * K + w * U, g * M + q * N + y * ca, k * M + v * N + u * ca, m * M + s * N + z * ca, l * M + x * N + w * ca, g * da + q * c + y * e, k * da + v * c + u * e, m * da + s * c + z * e, l * da + x * c + w * e, a[12], a[13], a[14], a[15])
}
new Float64Array(3);
new Float64Array(3);
var hb = [new Float64Array(4), new Float64Array(4), new Float64Array(4)];
new Float64Array(16);
function R(a, b, c) {
  this.type = b || O.STANDALONE;
  c && (this.parent = c);
  this.children = [];
  this.g = S.DEFAULT;
  this.pa(0, 0);
  this.type == O.STANDALONE && this.cb([1, 1, 1, 1]);
  a && ("string" === typeof a && Ma("texture", a) ? this.T(a) : this.S(a));
  this.aa(0, 0, 0);
  this.bb(0.5, 0.5);
  if(D && (!c || c.type != O.BLOCKGROUP)) {
    this.l = E.createBuffer(), this.k = new Float32Array(36)
  }
  this.d = new Float32Array(16);
  this.r = new Float32Array(16);
  this.d = qb(new Float32Array(16));
  this.ra = [];
  this.V = []
}
var S = {DEFAULT:0, TEXTURE:1}, rb = ["default", "texture"], O = {STANDALONE:0, BLOCKGROUP:1, SCENE:2, TMXBLOCK:3, PARTICLE:4, PRIMITIVE:5}, sb = Math.PI / 180, tb = 180 / Math.PI, ub = 1 * sb, vb = new Float32Array(4);
vb[0] = 0;
vb[1] = 0;
vb[2] = 1;
vb[3] = 1;
var wb = new fb(0, 0);
o = R.prototype;
o.title = "";
o.lb = j;
o.d = i;
o.r = i;
o.visible = h;
o.Z = j;
o.f = j;
o.D = j;
o.F = j;
o.ea = 0;
o.l = i;
o.k = i;
o.position = i;
o.K = i;
o.i = i;
o.color = i;
o.c = i;
o.rotation = 0;
o.R = 1;
o.oa = 1;
o.update = i;
o.frame = i;
o.parent = i;
o.children = i;
o.ra = i;
o.V = i;
o.o = j;
o.Cb = function() {
  this.Z = h;
  for(var a in this.children) {
    this.children[a].onEnterScene()
  }
};
o.Db = function() {
  this.Z = j;
  for(var a in this.children) {
    this.children[a].onExitScene()
  }
};
o.S = function(a) {
  if("string" === typeof a) {
    var b = T.ia(a);
    b || f("Invalid frame name: " + a);
    a = b.frame;
    this.T(b.c)
  }
  this.frame ? pb(this.frame, a) : this.frame = ob(a);
  this.pa(a[2], a[3]);
  this.F = h
};
o.ia = n("frame");
o.pa = function(a, b) {
  this.i = new fb(a, b);
  this.F = h
};
o.ub = n("i");
o.Ia = function(a, b) {
  this.R = a;
  this.oa = 2 == arguments.length ? b : this.R;
  this.f = h
};
o.xb = n("R");
o.cb = function(a) {
  this.color ? pb(this.color, a) : this.color = ob(a);
  this.D = h
};
o.tb = n("color");
o.aa = function(a, b, c) {
  if(this.position) {
    1 == arguments.length ? mb(this.position, a) : nb(this.position, a, b, c)
  }else {
    var d;
    1 == arguments.length ? d = lb(a) : (d = new Float32Array(3), nb(d, a, b, c));
    this.position = d
  }
  this.f = h
};
o.bb = function(a, b) {
  this.K = new ea(a, b)
};
o.rb = n("K");
o.vb = n("position");
o.qb = function() {
  for(var a = this.parent, b = lb(this.position);a;) {
    la(a.d, b, b), a = a.parent
  }
  return b
};
o.sb = function() {
  var a = this.position, b = this.frame[2], c = this.frame[3];
  return[a[0] - b / 2, a[1] - c / 2, b, c]
};
o.T = function(a) {
  this.c = a;
  this.g = S.TEXTURE;
  if(ya) {
    if(this.g == S.TEXTURE) {
      var b = new V(1, 1);
      this.C(b);
      b.fb(function() {
        var a = this.parent.i, b = a.width / 2, a = a.height / 2;
        this.ua([[-b, -a, 0], [-b, a, 0], [b, a, 0], [b, -a, 0]], [1, 1, 1, 1], h)
      })
    }
    this.lb = h
  }
  var c = this;
  Ja("texture", a, i, function(a) {
    c.i || c.pa(a.width, a.height);
    c.frame || c.S([0, 0, a.width, a.height])
  })
};
o.yb = n("c");
o.Ha = function(a) {
  this.rotation = a;
  this.f = h
};
o.wb = n("rotation");
o.fb = function(a) {
  this.update = a
};
o.Gb = function(a) {
  this.visible = a
};
o.Ab = n("visible");
o.C = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent && f("can't add a block twice!");
    this.o ? this.ra.push(c) : (this.children.push(c), c.parent = this);
    if(this.Z) {
      c.onEnterScene()
    }
  }
};
o.removeChild = function(a) {
  (!a.parent || a.parent != this) && f("not our child!");
  if(this.o) {
    this.V.push(a)
  }else {
    var b = this.children.indexOf(a);
    0 <= b && (this.children.splice(b, 1), a.parent = i)
  }
  if(this.Z) {
    a.onExitScene()
  }
};
var xb = [new Float32Array(3), new Float32Array(3), new Float32Array(3), new Float32Array(3)];
R.prototype.transform = function() {
  var a = E, b, c;
  if(this.f || this.parent && this.parent.f) {
    this.f = h, b = this.position[0], c = this.position[1], qb(this.d), ma(this.d, b, c, this.position[2]), na(this.d, -1 * this.rotation, 0, 0, 1), oa(this.d, this.R, this.oa, 1), (b = this.parent ? this.parent.d : i) && ka(b, this.d, this.d)
  }
  if(!(this.type == O.BLOCKGROUP || this.type == O.PRIMITIVE)) {
    if(b = this.k, c = this.parent && this.parent.type == O.BLOCKGROUP, D) {
      var d;
      !c && (this.F || this.D) && a.bindBuffer(a.ARRAY_BUFFER, this.l);
      if(this.F || this.f) {
        var e = 0.5 * this.i.width, g = 0.5 * this.i.height, k = this.position[2];
        d = 36 * this.ea;
        if(c) {
          var m = nb(xb[0], e, g, 0), l = nb(xb[1], -e, g, 0), q = nb(xb[2], e, -g, 0), e = nb(xb[3], -e, -g, 0);
          la(this.d, m, m);
          la(this.d, l, l);
          la(this.d, e, e);
          la(this.d, q, q);
          b[d] = e[0];
          b[d + 1] = e[1];
          b[d + 2] = k;
          b[d + 9] = l[0];
          b[d + 1 + 9] = l[1];
          b[d + 2 + 9] = k;
          b[d + 18] = q[0];
          b[d + 1 + 18] = q[1];
          b[d + 2 + 18] = k;
          b[d + 27] = m[0];
          b[d + 1 + 27] = m[1]
        }else {
          m = this.i ? (0.5 - this.K.x) * this.i.width : 0, l = this.i ? (0.5 - this.K.y) * this.i.height : 0, b[d] = -e + m, b[d + 1] = -g + l, b[d + 2] = k, b[d + 9] = -e + m, b[d + 1 + 9] = g + l, b[d + 2 + 9] = k, b[d + 18] = e + m, b[d + 1 + 18] = -g + l, b[d + 2 + 18] = k, b[d + 27] = e + m, b[d + 1 + 27] = g + l
        }
        b[d + 2 + 27] = k;
        this.g == S.TEXTURE && (k = La("texture", this.c), g = k.width, m = k.height, k = this.frame[0] / g, e = this.frame[1] / m, g = this.frame[2] / g, m = this.frame[3] / m, d += 3, b[d] = k, b[d + 1] = e + m, b[d + 9] = k, b[d + 1 + 9] = e, b[d + 18] = k + g, b[d + 1 + 18] = e + m, b[d + 27] = k + g, b[d + 1 + 27] = e)
      }
      if(this.D) {
        d = 5 + 36 * this.ea;
        k = this.color;
        for(e = 0;4 > e;e++) {
          b[d + 9 * e] = k[0], b[d + 1 + 9 * e] = k[1], b[d + 2 + 9 * e] = k[2], b[d + 3 + 9 * e] = k[3]
        }
      }
      D && (!c && (this.F || this.D)) && a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW)
    }
  }
};
R.prototype.B = function() {
  this.o = h;
  this.update && this.update(Da);
  if(this.visible) {
    this.transform();
    (!this.parent || this.parent.type != O.BLOCKGROUP) && this.Q();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].B()
    }
    for(this.o = this.F = this.D = this.f = j;a = this.ra.shift();) {
      this.C(a)
    }
    for(;a = this.V.shift();) {
      this.removeChild(a)
    }
  }else {
    this.o = j
  }
};
R.prototype.Q = function() {
  this.type == O.BLOCKGROUP && f("Cannot call render on a BlockGroup block!");
  if(this.type != O.SCENE) {
    var a, b;
    if(D) {
      a = E;
      var c = Fa(rb[this.g]);
      a.bindBuffer(a.ARRAY_BUFFER, this.l);
      a.vertexAttribPointer(c.a.vertexPositionAttribute, 3, a.FLOAT, j, 36, 0);
      a.vertexAttribPointer(c.a.vertexColorAttribute, 4, a.FLOAT, j, 36, 20);
      this.g != S.DEFAULT && this.g == S.TEXTURE && (b = La("texture", this.c), a.vertexAttribPointer(c.a.textureCoordAttribute, 2, a.FLOAT, j, 36, 12), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, b.J), a.uniform1i(c.Ga, 0));
      (this.f || this.parent && this.parent.f) && ka(wa, this.d, this.r);
      a.uniformMatrix4fv(c.A, j, this.r);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    }else {
      a = ga;
      b = this.d;
      var d = c = 0;
      this.i && (c = this.i.width, d = this.i.height);
      a.globalAlpha = this.color[3];
      a.setTransform(b[0], b[4], b[1], b[5], b[12] + (0.5 - this.K.x) * c, a.U - (b[13] + (0.5 - this.K.y) * d));
      if(1 == this.g) {
        b = La("texture", this.c);
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
p("chesterGL.Block", R);
p("chesterGL.Block.FullFrame", vb);
p("chesterGL.Block.SizeZero", wb);
p("chesterGL.Block.TYPE", O);
p("chesterGL.Block.PROGRAM", S);
p("chesterGL.Block.PROGRAM_NAME", rb);
p("chesterGL.Block.DEG_TO_RAD", sb);
p("chesterGL.Block.RAD_TO_DEG", tb);
p("chesterGL.Block.ONE_DEG", ub);
R.prototype.title = R.prototype.title;
R.prototype.onEnterScene = R.prototype.Cb;
R.prototype.onExitScene = R.prototype.Db;
R.prototype.children = R.prototype.children;
R.prototype.addChild = R.prototype.C;
R.prototype.removeChild = R.prototype.removeChild;
R.prototype.getBoundingBox = R.prototype.sb;
R.prototype.setPosition = R.prototype.aa;
R.prototype.getPosition = R.prototype.vb;
R.prototype.setAnchorPoint = R.prototype.bb;
R.prototype.getAnchorPoint = R.prototype.rb;
R.prototype.getAbsolutePosition = R.prototype.qb;
R.prototype.setRotation = R.prototype.Ha;
R.prototype.getRotation = R.prototype.wb;
R.prototype.setColor = R.prototype.cb;
R.prototype.getColor = R.prototype.tb;
R.prototype.setFrame = R.prototype.S;
R.prototype.getFrame = R.prototype.ia;
R.prototype.setContentSize = R.prototype.pa;
R.prototype.getContentSize = R.prototype.ub;
R.prototype.setTexture = R.prototype.T;
R.prototype.getTexture = R.prototype.yb;
R.prototype.setScale = R.prototype.Ia;
R.prototype.getScale = R.prototype.xb;
R.prototype.setUpdate = R.prototype.fb;
R.prototype.setVisible = R.prototype.Gb;
R.prototype.isVisible = R.prototype.Ab;
function yb(a) {
  R.call(this, i, 4);
  var b = this;
  Ja("texture", a.texture, i, function() {
    b.Za(a)
  })
}
r(yb, R);
var zb = j;
function Ab() {
  Ha("particles", function(a) {
    var b = E;
    a.A = b.getUniformLocation(a, "uMVPMatrix");
    a.Ib = b.getUniformLocation(a, "uSampler");
    a.Jb = b.getUniformLocation(a, "u_time");
    a.a = {a_startPosition:b.getAttribLocation(a, "a_startPosition"), a_lifetime:b.getAttribLocation(a, "a_lifetime"), a_startTime:b.getAttribLocation(a, "a_startTime"), a_startSize:b.getAttribLocation(a, "a_startSize"), a_endSize:b.getAttribLocation(a, "a_endSize"), a_speed:b.getAttribLocation(a, "a_speed"), a_startColor:b.getAttribLocation(a, "a_startColor"), a_endColor:b.getAttribLocation(a, "a_endColor")};
    a.Ra = j;
    a = b.getError();
    0 !== a && console.log("gl error: " + a)
  });
  zb = h
}
o = yb.prototype;
o.s = h;
o.$a = i;
o.Va = 0;
o.M = 0;
o.H = 0;
o.G = 0;
o.duration = 0;
o.za = 0;
o.Ya = 0;
o.ba = i;
o.ca = i;
o.na = i;
o.W = i;
o.X = i;
o.la = i;
o.ma = i;
o.ib = 0;
o.jb = 0;
o.Wa = 0;
o.Xa = 0;
o.Ea = j;
o.elapsedTime = 0;
o.sa = ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"];
o.Za = function(a) {
  this.g = -1;
  zb || Ab();
  this.$a = a.texture;
  this.G = a.maxParticles;
  this.duration = 1E3 * parseFloat(a.duration);
  this.za = 1E3 * parseFloat(a.lifetime);
  this.Ya = 1E3 * parseFloat(a.lifetimeVariance);
  this.ba = ob(a.startColor);
  this.ca = ob(a.startColorVariance);
  this.W = ob(a.endColor);
  this.X = ob(a.endColorVariance);
  this.na = lb(a.positionVariance);
  this.la = lb(a.speed);
  this.ma = lb(a.speedVariance);
  this.ib = parseFloat(a.startSize);
  this.jb = parseFloat(a.startSizeVariance);
  this.Wa = parseFloat(a.endSize);
  this.Xa = parseFloat(a.endSizeVariance);
  this.elapsedTime = 0;
  this.sa = a.blendOptions.slice(0);
  this.s = h;
  this.l || (this.l = E.createBuffer());
  this.k = new Float32Array(18 * this.G);
  for(var a = Fa("particles"), b = E, c = 0;c < this.G;c++) {
    Bb(this, c)
  }
  b.uniform1i(a.Ib, 0);
  Cb(this, a);
  this.H = this.M = this.elapsedTime = 0;
  this.Va = this.G / Math.abs(this.za)
};
function Bb(a, b, c, d) {
  var e = a.k;
  e[18 * b + 0] = c || -1;
  e[18 * b + 1] = d || 0;
  e[18 * b + 2] = a.ib + a.jb * L();
  e[18 * b + 3] = a.Wa + a.Xa * L();
  e[18 * b + 4] = a.la[0] + a.ma[0] * L();
  e[18 * b + 5] = a.la[1] + a.ma[1] * L();
  e[18 * b + 6] = a.la[2] + a.ma[2] * L();
  e[18 * b + 7] = L() * a.na[0];
  e[18 * b + 8] = L() * a.na[1];
  e[18 * b + 9] = L() * a.na[2];
  e[18 * b + 10] = Math.max(0, Math.min(1, a.ba[0] + L() * a.ca[0]));
  e[18 * b + 11] = Math.max(0, Math.min(1, a.ba[1] + L() * a.ca[1]));
  e[18 * b + 12] = Math.max(0, Math.min(1, a.ba[2] + L() * a.ca[2]));
  e[18 * b + 13] = Math.max(0, Math.min(1, a.ba[3] + L() * a.ca[3]));
  e[18 * b + 14] = Math.max(0, Math.min(1, a.W[0] + L() * a.X[0]));
  e[18 * b + 15] = Math.max(0, Math.min(1, a.W[1] + L() * a.X[1]));
  e[18 * b + 16] = Math.max(0, Math.min(1, a.W[2] + L() * a.X[2]));
  e[18 * b + 17] = Math.max(0, Math.min(1, a.W[3] + L() * a.X[3]))
}
function Cb(a, b) {
  var c = E;
  c.bindBuffer(c.ARRAY_BUFFER, a.l);
  b.Ra || (c.vertexAttribPointer(b.a.a_lifetime, 1, c.FLOAT, j, 72, 0), c.vertexAttribPointer(b.a.a_startTime, 1, c.FLOAT, j, 72, 4), c.vertexAttribPointer(b.a.a_startSize, 1, c.FLOAT, j, 72, 8), c.vertexAttribPointer(b.a.a_endSize, 1, c.FLOAT, j, 72, 12), c.vertexAttribPointer(b.a.a_speed, 3, c.FLOAT, j, 72, 16), c.vertexAttribPointer(b.a.a_startPosition, 3, c.FLOAT, j, 72, 28), c.vertexAttribPointer(b.a.a_startColor, 4, c.FLOAT, j, 72, 40), c.vertexAttribPointer(b.a.a_endColor, 4, c.FLOAT, j, 72, 
  56), b.Ra = h);
  c.bufferData(c.ARRAY_BUFFER, a.k, c.STATIC_DRAW)
}
var Db = new Float32Array(18);
yb.prototype.update = function(a) {
  if(Fa("particles")) {
    this.elapsedTime += a;
    var b = 1 / this.Va;
    for(this.M += a;this.H < this.G && this.M > b && this.s;) {
      a = Math.abs(this.za + this.Ya * L()), Bb(this, this.H++, a, this.elapsedTime), this.Ea = h, this.M -= b
    }
    for(b = 0;b < this.G;b++) {
      var a = this.k, c = 18 * b;
      if(0 < a[c] && a[c] + a[c + 1] <= this.elapsedTime && b != this.H - 1) {
        var d = a.subarray(c, c + 18);
        Db.set(d);
        Db[0] = -1;
        d = a.subarray(c + 18, 18 * this.H);
        a.set(d, c);
        a.set(Db, 18 * (this.H - 1));
        this.H--
      }
    }
    0 < this.duration && this.elapsedTime > this.duration && (this.s = j)
  }
};
yb.prototype.Q = function() {
  var a = Fa("particles");
  if(a) {
    var b = E, c = La("texture", this.$a);
    b.blendFunc(b[this.sa[0]], b[this.sa[1]]);
    b.uniform1f(a.Jb, this.elapsedTime);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, c.J);
    this.Ea ? (Cb(this, a), this.Ea = j) : b.bindBuffer(b.ARRAY_BUFFER, this.l);
    (this.f || this.parent && this.parent.f) && ka(wa, this.d, this.r);
    b.uniformMatrix4fv(a.A, j, this.r);
    b.drawArrays(b.POINTS, 0, this.G);
    b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA)
  }
};
p("chesterGL.GPUParticleSystem", yb);
yb.loadShaders = Ab;
yb.prototype.loadProperties = yb.prototype.Za;
function W(a, b) {
  this.totalTime = a;
  this.b = b;
  this.j = 0
}
o = W.prototype;
o.t = 0;
o.b = i;
o.totalTime = 0;
o.j = 0;
o.z = j;
o.s = j;
o.update = function(a) {
  this.j += a;
  0 < this.totalTime && this.j >= this.totalTime && this.stop()
};
o.Fb = function(a) {
  this.s || (this.totalTime = a)
};
o.m = function() {
  this.s = h
};
o.stop = function() {
  this.z = h;
  this.s = j
};
o.reset = function() {
  this.z = this.s = j;
  this.j = 0
};
function X(a, b, c, d) {
  W.call(this, b, d);
  this.fa = lb(a);
  this.N = void 0 !== c ? c === h : h;
  this.Ja = new Float32Array(3);
  this.Y = new Float32Array(3)
}
r(X, W);
X.prototype.fa = i;
X.prototype.Y = i;
X.prototype.N = h;
X.prototype.Ja = i;
var Eb = new Float32Array(3);
X.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  var a = this.b, b = Math.min(1, this.j / this.totalTime), c = this.Ja, d = this.Y, e = c[0], g = c[1], c = c[2];
  Eb[0] = (d[0] - e) * b + e;
  Eb[1] = (d[1] - g) * b + g;
  Eb[2] = (d[2] - c) * b + c;
  a.aa(Eb[0], Eb[1], Eb[2])
};
X.prototype.m = function() {
  W.prototype.m.call(this);
  this.b || f("invalid move action! - no block");
  if(this.N) {
    var a = this.fa, b = this.b.position, c = this.Y;
    c[0] = a[0] + b[0];
    c[1] = a[1] + b[1];
    c[2] = a[2] + b[2]
  }else {
    mb(this.Y, this.fa)
  }
  mb(this.Ja, this.b.position)
};
X.prototype.stop = function() {
  W.prototype.stop.call(this);
  this.j >= this.totalTime && this.b.aa(this.Y)
};
X.prototype.reverse = function() {
  this.N || f("This only works on relative movements");
  var a = [], b = this.fa;
  a[0] = -b[0];
  a[1] = -b[1];
  a[2] = -b[2];
  return new X(a, this.totalTime, h)
};
function Y(a, b, c, d, e) {
  W.call(this, c, e);
  this.N = d;
  this.va = a;
  this.wa = b;
  this.La = this.Ka = this.ha = this.ga = 0
}
r(Y, W);
o = Y.prototype;
o.m = function() {
  Y.qa.m.call(this);
  this.b || f("invalid scale action - no block provided");
  this.N ? (this.ga = this.b.R + this.va, this.ha = this.b.oa + this.wa) : (this.ga = this.va, this.ha = this.wa);
  this.Ka = this.b.R;
  this.La = this.b.oa
};
o.update = function(a) {
  Y.qa.update.call(this, a);
  var a = this.b, b = Math.min(1, this.j / this.totalTime);
  a.Ia(this.Ka + b * (this.ga - this.Ka), this.La + b * (this.ha - this.La))
};
o.stop = function() {
  Y.qa.stop.call(this);
  this.j >= this.totalTime && this.b.Ia(this.ga, this.ha)
};
o.reset = function() {
  Y.qa.reset.call(this)
};
o.reverse = function() {
  this.N || f("This only works on relative movements");
  return new Y(-this.va, -this.wa, this.totalTime, h)
};
function Fb(a, b, c) {
  this.Sa = a;
  this.Qa = c;
  W.call(this, b || 1)
}
r(Fb, W);
Fb.prototype.Sa = i;
Fb.prototype.Qa = i;
Fb.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  this.z && this.Sa.call(i, this.Qa)
};
function Gb(a, b) {
  W.call(this, a.totalTime + b.totalTime);
  this.p = [a, b]
}
r(Gb, W);
o = Gb.prototype;
o.p = i;
o.ta = 0;
o.hb = 0;
o.m = function() {
  W.prototype.m.call(this);
  this.hb = this.p[0].totalTime;
  this.b.Fa(this.p[0])
};
o.reset = function() {
  W.prototype.reset.call(this);
  this.ta = 0;
  this.p[0].reset();
  this.p[1].reset();
  J.Oa(this.p[0].t);
  J.Oa(this.p[1].t)
};
o.update = function(a) {
  W.prototype.update.call(this, a);
  0 === this.ta && this.j >= this.hb && (this.p[0].stop(), this.ta = 1, this.b.Fa(this.p[1]))
};
function Hb(a, b) {
  this.Ca = b || 1;
  this.Na = 0;
  this.action = a;
  W.call(this, a.totalTime)
}
r(Hb, W);
o = Hb.prototype;
o.Ca = 0;
o.Na = 0;
o.action = i;
o.m = function() {
  W.prototype.m.call(this);
  this.action.b = this.b
};
o.update = function(a) {
  W.prototype.update.call(this, a);
  this.action.update(a);
  if(this.z && (0 > this.Ca || this.Na < this.Ca)) {
    this.Na++, this.reset(), this.action.reset(), this.m()
  }
};
function Ib(a, b, c, d) {
  this.delay = a;
  a *= b.length;
  c === h && (a = -1);
  W.call(this, a, d);
  this.gb = c === h;
  this.frames = b.slice(0)
}
r(Ib, W);
o = Ib.prototype;
o.L = 0;
o.delay = 0;
o.frames = i;
o.gb = j;
o.update = function(a) {
  W.prototype.update.call(this, a);
  a = this.b;
  this.z ? (this.L = this.frames.length - 1, a.S(this.frames[this.L])) : this.j >= this.delay * this.L && (a.S(this.frames[this.L++]), this.L == this.frames.length && (this.gb ? this.j = this.L = 0 : this.z = h))
};
function Jb(a, b, c, d) {
  this.Pa = a;
  this.Ua = b;
  W.call(this, c, d)
}
r(Jb, W);
Jb.prototype.Pa = 0;
Jb.prototype.Ua = 0;
Jb.prototype.update = function(a) {
  W.prototype.update.call(this, a);
  this.z ? this.b.Ha(0) : this.b.Ha(this.Pa * Math.sin(2 * (this.j / 1E3 * this.Ua) * Math.PI / (this.totalTime / 1E3)))
};
var J = {I:{}, zb:0, ab:function(a) {
  if(!a.t || !J.I.hasOwnProperty(a.t)) {
    a.t = J.zb++, J.I[a.t] = a
  }
  a.m();
  return a.t
}, Oa:function(a) {
  J.I.hasOwnProperty(a) && delete J.I[a]
}, Hb:function(a) {
  for(var b in J.I) {
    var c = J.I[b];
    c.s && c.update(a);
    c.z && delete J.I[c.t]
  }
}};
R.prototype.Fa = function(a) {
  a.b = this;
  return J.ab(a)
};
p("chesterGL.ActionManager", J);
p("chesterGL.MoveAction", X);
p("chesterGL.ScaleAction", Y);
p("chesterGL.CallbackAction", Fb);
p("chesterGL.SequenceAction", Gb);
p("chesterGL.RepeatAction", Hb);
p("chesterGL.AnimateAction", Ib);
p("chesterGL.WiggleAction", Jb);
J.scheduleAction = J.ab;
J.unscheduleAction = J.Oa;
Gb.createSequence = function(a) {
  0 === arguments.length && f("Needs at least one action to create a sequence!");
  for(var b = arguments[0], c = 1;c < arguments.length;c++) {
    b = new Gb(b, arguments[c])
  }
  return b
};
R.prototype.runAction = R.prototype.Fa;
W.prototype.stop = W.prototype.stop;
W.prototype.setTotalTime = W.prototype.Fb;
X.prototype.stop = X.prototype.stop;
Y.prototype.stop = Y.prototype.stop;
Gb.prototype.stop = Gb.prototype.stop;
Hb.prototype.stop = Hb.prototype.stop;
X.prototype.reverse = X.prototype.reverse;
Y.prototype.reverse = Y.prototype.reverse;
var T = {frames:{}, Eb:function(a) {
  "string" === typeof a && (a = JSON.parse(a));
  if(a.meta && "1.0" == a.meta.version) {
    var b = a.meta.image;
    Ja("texture", b, i, function() {
      var c = a.frames, d;
      for(d in c) {
        var e = c[d], g = {frame:{}, c:""};
        g.frame = [e.frame.x, e.frame.y, e.frame.w, e.frame.h];
        g.c = b;
        T.frames[d] = g
      }
    })
  }else {
    f("Unkown json data")
  }
}, pb:function(a, b) {
  F.frameset[a.name].data = b;
  return h
}, ia:function(a) {
  return T.frames[a]
}, Bb:function(a) {
  console.log("loadFrames: will fetch " + a);
  Ja("frameset", {url:a, dataType:"json"}, i, function(a) {
    T.Eb(a)
  })
}};
za.frameset = T.pb;
p("chesterGL.BlockFrames", T);
T.getFrame = T.ia;
T.loadFrames = T.Bb;
function V(a, b) {
  D || f("PrimitiveBlock only works on WebGL mode");
  this.Ba = a || 500;
  this.Aa = b || 500;
  R.call(this, i, O.PRIMITIVE);
  var c = E;
  this.ya = c.createBuffer();
  this.q = new Float32Array(7 * this.Ba);
  this.xa = c.createBuffer();
  this.e = new Float32Array(14 * this.Aa);
  this.g = S.DEFAULT
}
r(V, R);
o = V.prototype;
o.ya = i;
o.q = i;
o.xa = i;
o.e = i;
o.Aa = 0;
o.u = 0;
o.Ba = 0;
o.v = 0;
o.P = [];
o.nb = function(a, b, c) {
  if(this.v < this.Ba) {
    var d = 7 * this.v, c = c || [1, 1, 1, 1];
    this.q[d + 0] = a;
    this.q[d + 1] = b;
    this.q[d + 2] = 0;
    this.q[d + 3] = c[0];
    this.q[d + 4] = c[1];
    this.q[d + 5] = c[2];
    this.q[d + 6] = c[3];
    this.v++
  }else {
    f("too many points!")
  }
};
o.mb = function(a, b, c, d, e) {
  if(this.u < this.Aa) {
    var g = 14 * this.u, e = e || [1, 1, 1, 1];
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
    this.u++
  }else {
    f("too many lines!")
  }
};
o.ua = function(a, b, c, d) {
  for(var b = b || [1, 1, 1, 1], c = c || j, d = d || j, e = a.length, g = E, k = new Float32Array(7 * a.length), m = g.createBuffer(), l = 0;l < e;l++) {
    var q = a[l];
    k[7 * l + 0] = q[0];
    k[7 * l + 1] = q[1];
    k[7 * l + 2] = q[2];
    k[7 * l + 3] = b[0];
    k[7 * l + 4] = b[1];
    k[7 * l + 5] = b[2];
    k[7 * l + 6] = b[3]
  }
  g.bindBuffer(g.ARRAY_BUFFER, m);
  g.bufferData(g.ARRAY_BUFFER, k, g.STATIC_DRAW);
  this.P.unshift([k, m, c, d])
};
o.ob = function(a, b, c, d, e, g) {
  c /= 2;
  d /= 2;
  this.ua([[a - c, b - d, 0], [a - c, b + d, 0], [a + c, b + d, 0], [a + c, b - d, 0]], e, h, g)
};
o.B = function() {
  this.u = this.v = 0;
  0 < this.P.length && (this.P = []);
  R.prototype.B.call(this)
};
o.Q = function() {
  var a = E, b = Fa(rb[this.g]);
  if(0 < this.v || 0 < this.u || 0 < this.P.length) {
    ka(wa, this.d, this.r), a.uniformMatrix4fv(b.A, j, this.r)
  }
  if(0 < this.v) {
    var c = E, d = 7 * this.v;
    c.bindBuffer(c.ARRAY_BUFFER, this.ya);
    c.bufferData(c.ARRAY_BUFFER, this.q.subarray(0, d), c.STATIC_DRAW);
    a.bindBuffer(a.ARRAY_BUFFER, this.ya);
    a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, j, 28, 0);
    a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, j, 28, 12);
    a.drawArrays(a.POINTS, 0, this.v)
  }
  0 < this.u && (c = E, d = 14 * this.u, c.bindBuffer(c.ARRAY_BUFFER, this.xa), c.bufferData(c.ARRAY_BUFFER, this.e.subarray(0, d), c.STATIC_DRAW), a.bindBuffer(a.ARRAY_BUFFER, this.xa), a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, j, 28, 0), a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, j, 28, 12), a.drawArrays(a.LINES, 0, 2 * this.u));
  c = this.P.length;
  if(0 < c) {
    for(d = 0;d < c;d++) {
      var e = this.P[d];
      a.bindBuffer(a.ARRAY_BUFFER, e[1]);
      a.vertexAttribPointer(b.a.vertexPositionAttribute, 3, a.FLOAT, j, 28, 0);
      a.vertexAttribPointer(b.a.vertexColorAttribute, 4, a.FLOAT, j, 28, 12);
      e[2] ? a.drawArrays(a.LINE_LOOP, 0, e[0].length / 7) : a.drawArrays(a.LINE_STRIP, 0, e[0].length / 7)
    }
  }
};
p("chesterGL.PrimitiveBlock", V);
V.prototype.drawPoint = V.prototype.nb;
V.prototype.drawLine = V.prototype.mb;
V.prototype.drawPolygon = V.prototype.ua;
V.prototype.drawRectangle = V.prototype.ob;
var Kb, Lb, Mb, Nb;
function Ob() {
  return aa.navigator ? aa.navigator.userAgent : i
}
Nb = Mb = Lb = Kb = j;
var Pb;
if(Pb = Ob()) {
  var Qb = aa.navigator;
  Kb = 0 == Pb.indexOf("Opera");
  Lb = !Kb && -1 != Pb.indexOf("MSIE");
  Mb = !Kb && -1 != Pb.indexOf("WebKit");
  Nb = !Kb && !Mb && "Gecko" == Qb.product
}
var Rb = Lb, Sb = Nb, Tb = Mb;
var Ub;
if(Kb && aa.opera) {
  var Vb = aa.opera.version;
  "function" == typeof Vb && Vb()
}else {
  Sb ? Ub = /rv\:([^\);]+)(\)|;)/ : Rb ? Ub = /MSIE\s+([^\);]+)(\)|;)/ : Tb && (Ub = /WebKit\/(\S+)/), Ub && Ub.exec(Ob())
}
;var Wb = i, Xb = i;
function Yb(a) {
  (a = Zb[a]) || f("Invalid map - make sure you call loadTMX first");
  R.call(this, i, O.TMXBLOCK);
  for(var b = 0;b < a.layers.length;b++) {
    for(var c = a.layers[b], d = D ? new Z(i, c.blocks.length) : new R, e = i, g = 0;g < c.blocks.length;g++) {
      var k = c.blocks[g];
      e || (e = $b(a.tilesets, k.gid), d.T(e.texture));
      var m;
      D ? m = d.Ta(k.frame) : (m = new R(k.frame), m.T(e.texture));
      m.aa(k.position);
      d.C(m)
    }
    this.C(d)
  }
}
r(Yb, R);
Yb.prototype.Q = function() {
};
var Zb = {};
function $b(a, b) {
  for(var c = a[0], d = 1;d < a.length;d++) {
    var e = a[d];
    b >= e.firstgid && (c = e)
  }
  return c
}
za.tmx = function(a, b) {
  F.tmx[a.name].data = b;
  return h
};
p("chesterGL.TMXBlock", Yb);
Yb.loadTMX = function(a) {
  Ja("tmx", {url:a, dataType:"xml"}, i, function(b) {
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
        var k = {blocks:[]}, m = new fb(parseInt($(b).attr("width"), 10), parseInt($(b).attr("height"), 10)), l = $(b).find("data").first();
        if(l) {
          ("base64" != l.attr("encoding") || l.attr("compression")) && f("Invalid TMX Data");
          var q = l.text().trim();
          if(!Wb) {
            Wb = {};
            Xb = {};
            for(l = 0;65 > l;l++) {
              Wb[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l), Xb[Wb[l]] = l
            }
          }
          for(var v = Xb, l = [], s = 0;s < q.length;) {
            var x = v[q.charAt(s++)], y = s < q.length ? v[q.charAt(s)] : 0;
            ++s;
            var u = s < q.length ? v[q.charAt(s)] : 0;
            ++s;
            var z = s < q.length ? v[q.charAt(s)] : 0;
            ++s;
            (x == i || y == i || u == i || z == i) && f(Error());
            l.push(x << 2 | y >> 4);
            64 != u && (l.push(y << 4 & 240 | u >> 2), 64 != z && l.push(u << 6 & 192 | z))
          }
          q = 0;
          v = i;
          for(s = 0;s < m.height;s++) {
            for(x = 0;x < m.width;x++) {
              var w = l[q + 3] << 24 | l[q + 2] << 16 | l[q + 1] << 8 | l[q + 0] >>> 0;
              if(0 !== w) {
                v || (v = $b(c.tilesets, w));
                y = {};
                y.gid = w;
                var A = v.margin || 0, B = v.spacing || 0, u = v.tileSize, C = v.imgSize, z = c.mapTileSize, K = parseInt((C.width - 2 * A + B) / (u.width + B), 10), w = w - v.firstgid, U = w % K * (u.width + B) + A, C = C.height - u.height - A - B - parseInt(w / K, 10) * (u.height + B) + A, K = u.width, B = u.height, A = w = new Float32Array(4);
                A[0] = U;
                A[1] = C;
                A[2] = K;
                A[3] = B;
                y.frame = w;
                var M, N;
                "orthogonal" == d ? (M = x * z.width + u.width / 2, N = (m.height - s - 1) * z.height + u.height / 2) : "isometric" == d ? (M = z.width / 2 * (m.width + x - s - 1) + u.width / 2, N = z.height / 2 * (2 * m.height - x - s - 2) + u.height / 2) : f("Invalid orientation");
                y.position = [M, N, 0];
                k.blocks.push(y)
              }
              q += 4
            }
          }
        }else {
          f("No data for layer!")
        }
        c.layers.push(k)
      }
    });
    Zb[a] = c
  })
};
function ac(a, b, c) {
  var b = b || "20px sans-serif", c = c || "White", d = document.createElement("canvas");
  this.canvas = d;
  this.context = d.getContext("2d");
  this.context.textBaseline = "bottom";
  this.font = b;
  this.fillStyle = c;
  (b = b.match(/(\d+)px/)) ? this.Ma = parseInt(b[1], 10) : f("Invalid text height - use the form NNpx");
  this.c = Math.random() + ".canvas";
  F.texture || (F.texture = {});
  F.texture[this.c] = d;
  R.call(this, bc(this, a));
  this.eb(a, j);
  this.g = S.TEXTURE
}
r(ac, R);
o = ac.prototype;
o.canvas = i;
o.context = i;
o.Da = j;
o.text = "";
o.Ma = 0;
o.font = "";
o.fillStyle = "";
o.eb = function(a, b) {
  this.text = a;
  cc(this);
  b || (this.S(bc(this)), this.Da = h)
};
function cc(a) {
  var b = a.context, c = a.canvas;
  b.clearRect(0, 0, c.width, c.height);
  b.fillText(a.text, 0, c.height);
  c.J || (c.J = E.createTexture(), F.texture[a.c].data = c);
  Na(c);
  a.Da = j
}
function bc(a, b) {
  var c = a.context, d = a.canvas;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  b && (a.text = b);
  var e = c.measureText(a.text).width;
  d.width = e;
  d.height = a.Ma;
  c.font = a.font;
  c.fillStyle = a.fillStyle;
  c.textBaseline = "bottom";
  return[0, 0, e, a.Ma]
}
o.B = function() {
  this.Da && cc(this);
  R.prototype.B.call(this)
};
p("chesterGL.LabelBlock", ac);
ac.prototype.setText = ac.prototype.eb;
function Z(a, b) {
  D || f("BlockGroup only works on WebGL mode");
  R.call(this, i, O.BLOCKGROUP);
  a ? (this.c = a, this.g = S.TEXTURE) : this.g = S.DEFAULT;
  this.O = b || 10;
  dc(this)
}
r(Z, R);
o = Z.prototype;
o.O = 0;
o.ka = j;
o.ja = i;
o.n = i;
function dc(a, b, c) {
  var d = E;
  a.l || (a.l = d.createBuffer());
  a.ja || (a.ja = d.createBuffer());
  var d = new Float32Array(36 * a.O), e = new Uint16Array(6 * a.O);
  b && d.set(b);
  c && e.set(c);
  a.k = d;
  a.n = e
}
o.Ta = function(a) {
  a = new R(a, O.STANDALONE, this);
  this.c && a.T(this.c);
  return a
};
o.C = function(a) {
  for(var b in arguments) {
    var c = arguments[b];
    c.parent != this && f("Invalid child: can only add children created with BlockGroup.create");
    this.children.length >= this.O && (this.O *= 2, dc(this, this.k, this.n));
    this.c ? this.c != c.c && f("Invalid child: only can add child with the same texture") : this.c = c.c;
    this.children.push(c);
    c.ea = this.children.length - 1;
    c.k = this.k;
    this.ka = h
  }
};
o.removeChild = function(a) {
  a.parent != this && f("Invalid child");
  if(this.o) {
    this.V.push(a)
  }else {
    a = this.children.indexOf(a);
    if(0 < a) {
      for(this.children.splice(a, 1);a < this.Pb;a++) {
        var b = this.children[a];
        b.ea = a;
        b.f = h;
        b.D = h
      }
    }
    this.ka = h
  }
};
o.B = function() {
  this.o = h;
  this.update && this.update(Da);
  if(this.visible) {
    this.transform();
    for(var a = this.children, b = a.length, c = 0;c < b;c++) {
      a[c].B()
    }
    a = E;
    a.bindBuffer(a.ARRAY_BUFFER, this.l);
    a.bufferData(a.ARRAY_BUFFER, this.k, a.STATIC_DRAW);
    if(this.ka) {
      var d, a = (this.n[-1] || -1) + 1;
      d = d || Math.max(this.children.length, 1);
      for(b = 0;b < d;b++) {
        c = 6 * b, this.n[c + 0] = a, this.n[c + 1] = a + 1, this.n[c + 2] = a + 2, this.n[c + 3] = a + 2, this.n[c + 4] = a + 1, this.n[c + 5] = a + 3, a += 4
      }
      d = E;
      d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, this.ja);
      d.bufferData(d.ELEMENT_ARRAY_BUFFER, this.n, d.STATIC_DRAW);
      this.ka = j
    }
    this.Q();
    for(this.o = this.F = this.D = this.f = j;d = this.V.shift();) {
      this.removeChild(d)
    }
  }else {
    this.o = j
  }
};
o.Q = function(a) {
  var b = E, c = Fa(rb[this.g]), a = a || this.children.length;
  b.bindBuffer(b.ARRAY_BUFFER, this.l);
  b.vertexAttribPointer(c.a.vertexPositionAttribute, 3, b.FLOAT, j, 36, 0);
  if(this.g != S.DEFAULT && this.g == S.TEXTURE) {
    var d = La("texture", this.c);
    b.vertexAttribPointer(c.a.textureCoordAttribute, 2, b.FLOAT, j, 36, 12);
    b.activeTexture(b.TEXTURE0);
    b.bindTexture(b.TEXTURE_2D, d.J);
    b.uniform1i(c.Ga, 0)
  }
  b.vertexAttribPointer(c.a.vertexColorAttribute, 4, b.FLOAT, j, 36, 20);
  b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.ja);
  (this.f || this.parent && this.parent.f) && ka(wa, this.d, this.r);
  b.uniformMatrix4fv(c.A, j, this.r);
  b.drawElements(b.TRIANGLES, 6 * a, b.UNSIGNED_SHORT, 0)
};
p("chesterGL.BlockGroup", Z);
Z.prototype.createBlock = Z.prototype.Ta;
Z.prototype.addChild = Z.prototype.C;
Z.prototype.removeChild = Z.prototype.removeChild;

//@ sourceMappingURL=chester.js.map
