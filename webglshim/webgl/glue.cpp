//
//  glue.cpp
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

#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <map>
#include <string>
#include "jsapi.h"
#include "jsdbgapi.h"
#include "glue.h"
#include "lodepng.h"

#include "WebGLRenderingContext.h"

JSContext *cx, *dbgCtx;
JSObject* globalObject;
JSObject* nextCallbackForRequestAnimationFrame;
JSRuntime* runtime;

std::map<JSScript*, std::string> script_filename;
std::map<std::string, JSScript*> filename_script;
std::map<std::string, js::RootedObject*> globals;

static JSClass global_class = {
    "global", JSCLASS_GLOBAL_FLAGS,
    JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
    JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, sc_finalize,
    JSCLASS_NO_OPTIONAL_MEMBERS
};

void sc_finalize(JSFreeOp *freeOp, JSObject *obj) {
    return;
}

void reportError(JSContext *cx, const char *message, JSErrorReport *report)
{
	fprintf(stderr, "%s:%u:%s\n",
			report->filename ? report->filename : "<no filename=\"filename\">",
			(unsigned int) report->lineno,
			message);
};

bool evalString(const char *string, jsval *outVal, const char *filename)
{
	jsval rval;
	JSScript* script = JS_CompileScript(cx, globalObject, string, strlen(string), filename, 1);
	if (script) {
		script_filename[script] = filename;
		filename_script[filename] = script;
		JSBool evaluatedOK = JS_ExecuteScript(cx, globalObject, script, &rval);
		if (JS_FALSE == evaluatedOK) {
			fprintf(stderr, "(evaluatedOK == JS_FALSE)\n");
		}
		return evaluatedOK;
	}
	return false;
}

size_t readFileInMemory(const char *path, unsigned char **buff) {
    struct stat buf;
    int file = open(path, O_RDONLY);
    long readBytes = -1;
    if (file) {
        if (fstat(file, &buf) == 0) {
            *buff = (unsigned char *)calloc(buf.st_size + 1, 1);
            if (*buff) {
                readBytes = read(file, *buff, buf.st_size);
            }
        }
    }
    close(file);
    return readBytes;
}

bool runScript(const char *path) {
	if (!path) {
		return false;
	}
	std::string rpath;
	if (path[0] == '/') {
		rpath = path;
	} else {
		rpath = getFullPathFromRelativePath(path);
	}
	JSScript* script = JS_CompileUTF8File(cx, globalObject, rpath.c_str());
	jsval rval;
	if (script) {
		script_filename[script] = path;
		filename_script[path] = script;
		JSBool evaluatedOK = JS_ExecuteScript(cx, globalObject, script, &rval);
		if (JS_FALSE == evaluatedOK) {
			fprintf(stderr, "(evaluatedOK == JS_FALSE)\n");
		}
		return evaluatedOK;
	}
	return false;
}

JSBool jslog(JSContext* cx, uint32_t argc, jsval *vp)
{
	if (argc > 0) {
		JSString *string = NULL;
		JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string);
		if (string) {
			char *cstr = JS_EncodeString(cx, string);
			printf("%s\n", cstr);
		}
	}
	return JS_TRUE;
}

JSBool jsRequestAnimationFrame(JSContext* cx, uint32_t argc, jsval *vp)
{
	// TODO:
	// remove from root if the argument is NULL
	if (argc >= 1) {
		jsval* argv = JS_ARGV(cx, vp);
		setRequestAnimationFrameCallback(JSVAL_TO_OBJECT(argv[0]));
	}
	return JS_TRUE;
}

JSBool jsDevicePixelRatio(JSContext* cx, uint32_t argc, jsval *vp)
{
	JS_SET_RVAL(cx, vp, DOUBLE_TO_JSVAL(getDevicePixelRatio()));
	return JS_TRUE;
}

JSObject* getRequestAnimationFrameCallback() {
	JSObject* ret = nextCallbackForRequestAnimationFrame;
	if (ret) {
//		JS_RemoveObjectRoot(cx, &nextCallbackForRequestAnimationFrame);
		nextCallbackForRequestAnimationFrame = NULL;
	}
	return ret;
}

void setRequestAnimationFrameCallback(JSObject* obj) {
	nextCallbackForRequestAnimationFrame = obj;
//	JS_AddNamedObjectRoot(cx, &nextCallbackForRequestAnimationFrame, "requestAnimationFrameCallback");
}

JSObject* NewGlobalObject(JSContext* cx)
{
	js::RootedObject glob(cx, JS_NewGlobalObject(cx, &global_class, NULL));
	if (!glob) {
		return NULL;
	}
	JSAutoCompartment ac(cx, glob);
	if (!JS_InitStandardClasses(cx, glob))
		return NULL;
	if (!JS_InitReflect(cx, glob))
		return NULL;
	if (!JS_DefineDebuggerObject(cx, glob))
		return NULL;

	JS_DefineFunction(cx, glob, "log", jslog, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "newGlobal", jsNewGlobal, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "requestAnimationFrame", jsRequestAnimationFrame, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	
	// get the size of the screen
	int width, height;
	getDeviceWinSize(&width, &height);
	jsval valWidth = INT_TO_JSVAL(width);
	jsval valHeight = INT_TO_JSVAL(height);
	jsval pixelRatio = DOUBLE_TO_JSVAL(getDevicePixelRatio());
	JS_SetProperty(cx, glob, "innerWidth", &valWidth);
	JS_SetProperty(cx, glob, "innerHeight", &valHeight);
	JS_SetProperty(cx, glob, "devicePixelRatio", &pixelRatio);
	return glob;
}

JSBool jsNewGlobal(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 1) {
		jsval *argv = JS_ARGV(cx, vp);
		JSString *jsstr = JS_ValueToString(cx, argv[0]);
		std::string key = JS_EncodeString(cx, jsstr);
		js::RootedObject *global = globals[key];
		if (!global) {
			global = new js::RootedObject(cx, NewGlobalObject(cx));
			JS_WrapObject(cx, global->address());
			globals[key] = global;
		}
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(*global));
		return JS_TRUE;
	}
	return JS_FALSE;
}

JSContext* getGlobalContext()
{
	return cx;
}

// will inject touches in the proper document event
void injectTouches(webglTouchEventType type, webglTouch_t* touches, int count)
{
	// the js event
	JSObject* jsEvent = JS_NewObject(cx, NULL, NULL, NULL);
	std::vector<jsval> jsTouches;
	for (int i=0; i < count; i++) {
		JSObject* objTouch = JS_NewObject(cx, NULL, NULL, NULL);
		jsval pageX = INT_TO_JSVAL(touches[i].x);
		jsval pageY = INT_TO_JSVAL(touches[i].y);
		JS_SetProperty(cx, objTouch, "pageX", &pageX);
		JS_SetProperty(cx, objTouch, "pageY", &pageY);
		jsval jsTouch = OBJECT_TO_JSVAL(objTouch);
		jsTouches.push_back(jsTouch);
	}
	JSObject* touchArray = JS_NewArrayObject(cx, count, &jsTouches[0]);
	jsval valArray = OBJECT_TO_JSVAL(touchArray);
	// set all the touches arrays with the same data
	JS_SetProperty(cx, jsEvent, "touches", &valArray);
	JS_SetProperty(cx, jsEvent, "targetTouches", &valArray);
	JS_SetProperty(cx, jsEvent, "changedTouches", &valArray);
	// call the document event listener
	jsval eventHandler;
	switch (type) {
		case webglTouchesBegan:
			JS_GetProperty(cx, globalObject, "_touchesBegan", &eventHandler);
			break;
		case webglTouchesMoved:
			JS_GetProperty(cx, globalObject, "_touchesMoved", &eventHandler);
			break;
		case webglTouchesEnded:
		case webglTouchesCanceled:
			JS_GetProperty(cx, globalObject, "_touchesEnded", &eventHandler);
		default:
			break;
	}
	if (eventHandler != JSVAL_VOID) {
		jsval valEvent = OBJECT_TO_JSVAL(jsEvent);
		jsval out;
		JS_CallFunctionValue(cx, NULL, eventHandler, 1, &valEvent, &out);
	}
}

void createJSEnvironment() {
	// create world
	JS_SetCStringsAreUTF8();
	runtime = JS_NewRuntime(10 * 1024 * 1024);
	cx = JS_NewContext(runtime, 10240);

	JS_SetOptions(cx, JSOPTION_TYPE_INFERENCE);
	JS_SetVersion(cx, JSVERSION_LATEST);
	JS_SetOptions(cx, JS_GetOptions(cx) & ~JSOPTION_METHODJIT);
	JS_SetOptions(cx, JS_GetOptions(cx) & ~JSOPTION_METHODJIT_ALWAYS);
	JS_SetErrorReporter(cx, reportError);
	globalObject = NewGlobalObject(cx);

	// turn debug on
//	JS_SetDebugMode(cx, JS_TRUE);
//	JS_DefineDebuggerObject(cx, globalObject);

	TestClass::_js_register(cx, globalObject);
	ChesterCanvas::_js_register(cx, globalObject);
	WebGLRenderingContext::_js_register(cx, globalObject);
	PNGImage::_js_register(cx, globalObject);
	FakeXMLHTTPRequest::_js_register(cx, globalObject);
	
	// load the polyfill
	runScript("js/polyfill.js");
#if CHESTER
	runScript("js/chester.js");
#endif
}
