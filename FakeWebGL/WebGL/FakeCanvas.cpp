//
//  FakeCanvas.cpp
//  FakeWebGL
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

#include "FakeCanvas.h"
#include "WebGLRenderingContext.h"

#pragma mark - FakeCanvas

JS_BINDED_CLASS_GLUE_IMPL(FakeCanvas);

JS_BINDED_CONSTRUCTOR_IMPL(FakeCanvas)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		int w = JSVAL_TO_INT(argv[0]);
		int h = JSVAL_TO_INT(argv[1]);
		FakeCanvas* cobj = new FakeCanvas(w, h);
		jsval out;
		JS_WRAP_OBJECT_IN_VAL(FakeCanvas, cobj, out);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call: %s", __FUNCTION__);
	return JS_FALSE;
}

JS_BINDED_PROP_GET_IMPL(FakeCanvas, width)
{
	vp.set(INT_TO_JSVAL(width));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeCanvas, height)
{
	vp.set(INT_TO_JSVAL(height));
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeCanvas, getContext)
{
	if (argc >= 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSString* str = JS_ValueToString(cx, argv[0]);
		JSStringWrapper wrapper(str);
		JSBool ok = JS_FALSE;
		if (strncmp(wrapper, "experimental-webgl", 18) == 0) {
			WebGLRenderingContext* cobj = new WebGLRenderingContext(this);
			jsval out;
			JS_WRAP_OBJECT_IN_VAL(WebGLRenderingContext, cobj, out);
			JS_SET_RVAL(cx, vp, out);
			ok = JS_TRUE;
		}
		return ok;
	}
	JS_ReportError(cx, "invalid call: %s", __FUNCTION__);
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(FakeCanvas, getBoundingClientRect) {
	static js::RootedObject obj(cx, NULL);
	if (!obj) {
		obj = JS_NewObject(cx, NULL, NULL, NULL);
		int width, height;
		getDeviceWinSize(&width, &height);
		jsval t = INT_TO_JSVAL(0),
			l = INT_TO_JSVAL(0),
			b = INT_TO_JSVAL(0),
			w = INT_TO_JSVAL(width),
			h = INT_TO_JSVAL(height);
		JS_SetProperty(cx, obj, "top", &t);
		JS_SetProperty(cx, obj, "left", &l);
		JS_SetProperty(cx, obj, "bottom", &b);
		JS_SetProperty(cx, obj, "width", &w);
		JS_SetProperty(cx, obj, "height", &h);
	}
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
	return JS_FALSE;
}

void FakeCanvas::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	FakeCanvas::js_class = {
		"FakeCanvas", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_GETTER(FakeCanvas, width),
		JS_BINDED_PROP_DEF_GETTER(FakeCanvas, height),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeCanvas, getContext),
		JS_BINDED_FUNC_FOR_DEF(FakeCanvas, getBoundingClientRect),
		JS_FS_END
	};
	FakeCanvas::js_parent = NULL;
	FakeCanvas::js_proto = JS_InitClass(cx, global, NULL, &FakeCanvas::js_class, FakeCanvas::_js_constructor, 1, props, funcs, NULL, NULL);
}
