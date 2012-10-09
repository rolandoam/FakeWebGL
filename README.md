# What is this?

This is the WebGL layer that Apple didn't want you to use :)

In reallity, it's a very thin, non-secure WebGL implementation. This has no knowledge of DOM or
anything related. You can think of this as [Ejecta](http://impactjs.com/ejecta) but for WebGL.

## Non-secure?

When I say non-secure I mean that I'm not doing the same type-checking or verification process that
your browser is doing when evaluating WebGL code. I assume you know what you're doing, and basically
that the JS code that you're running is safe.

## What works?

Right now this works:

* up to [lesson 5](http://learningwebgl.com/blog/?p=507) of the [WebGL lessons](http://learningwebgl.com/blog/?page_id=1217)
* touch input
* PNG support (non-compressed PNGs)
* XMLHttpRequest, sort of... just working for local requests, and it's non-async :)

Not working:

* sound (HTML5 Sound API-like in the works)
* js debugger (in the works)
* proper retina support

## Will this work in the iOS store?

I'm not Apple, but AFAIK, this complies will all the requirements. I'm using a non-jitted
Spidermonkey version for the JS engine. This is better than using JavaScriptCore, because the
license in JSC would require you to release your `.o` files to the public. Spidermonkey is released
under the Mozilla Public License, which is more reasonable.

## Can I help?

Yes please!

If you want, you can keep adding WebGL/OpenGL-ES methods to the code, just look into
`WebGLRenderingContext.cpp` and `WebGLRenderingContext.hpp`. It should be really straight-forward.

## How can I add my own classes to javascript?

That also should be easy. Just look at the implementation of the TestClass. There are several macros
there that will help you go through it. At some point I'll write documentation :) - I keep saying
that all the time...

