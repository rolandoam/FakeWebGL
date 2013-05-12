# What is this?

This is the WebGL layer that Apple didn't want you to use :)

In reallity, it's a very thin, non-secure WebGL implementation. This has no
knowledge of DOM or anything related. You can think of this as
[Ejecta](http://impactjs.com/ejecta) but for WebGL.

UPDATE: Ejecta now actually has a WebGL mode, so you can think of this as
Ejecta, for WebGL and written in C++ instead of Objective-C, and also using
Spidermonkey instead of JavaScriptCore. The fact that is written in C++ and
using Spidermonkey means that this (sometime in the near future) will run also
on Android.

## Non-secure?

When I say non-secure I mean that I'm not doing the same type-checking or
verification process that your browser is doing when evaluating WebGL code. I
assume you know what you're doing, and basically that the JS code that you're
running is safe.

## What works?

Right now this works:

* up to [lesson 5](http://learningwebgl.com/blog/?p=507) of the
  [WebGL lessons](http://learningwebgl.com/blog/?page_id=1217)
* some Three.js samples (check the
  [AppDelegate.mm](https://github.com/funkaster/FakeWebGL/blob/master/FakeWebGL/AppDelegate.mm#L123))
* touch input (only when touch is supported on the js side, we're not emulating
  mouse input)
* PNG support (non-compressed PNGs)
* XMLHttpRequest, sort of... support async mode is coming soon.
* audio (similar API to HTML5 Audio tag)

Not working:

* js debugger (in the works)
* proper highDPI support (somewhat working)

## Will this work in the iOS store?

I'm not Apple, but AFAIK, this complies will all the requirements. I'm using a
non-jitted Spidermonkey version for the JS engine. This is better than using
JavaScriptCore, because the license in JSC would require you to release your
`.o` files to the public. Spidermonkey is released under the Mozilla Public
License, which is more reasonable.

## Can I help?

Yes please!

If you want, you can keep adding WebGL/OpenGL-ES methods to the code, just look
into `WebGLRenderingContext.cpp` and `WebGLRenderingContext.hpp`. It should be
really straight-forward.

We also need to work on the Android support for this :)

## How can I add my own classes to javascript?

That also should be easy. Just look at the implementation of the
XMLHttpRequest. There are several macros there that will help you go through
it. At some point I'll write documentation :) - Although I keep saying that all
the time...
