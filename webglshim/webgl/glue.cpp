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
#include "jsfriendapi.h"
#include "jsdbgapi.h"
#include "glue.h"
#include "lodepng.h"

#include "WebGLRenderingContext.h"
#include "FakeAudio.h"

JSContext *_cx, *dbgCtx;
JSObject* globalObject;
JSObject* nextCallbackForRequestAnimationFrame;
JSRuntime* runtime;

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
	JSScript* script = JS_CompileScript(_cx, globalObject, string, strlen(string), filename, 1);
	if (script) {
		filename_script[filename] = script;
		JSBool evaluatedOK = JS_ExecuteScript(_cx, globalObject, script, &rval);
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

JSObject* getGlobalObject(const char* name) {
	js::RootedObject* obj = globals[name];
	if (obj) {
		return obj->get();
	}
	return NULL;
}

bool runScript(const char *path, JSObject* glob, JSContext* cx) {
	if (!path) {
		return false;
	}
	std::string rpath;
	if (path[0] == '/') {
		rpath = path;
	} else {
		rpath = getFullPathFromRelativePath(path);
	}
	if (glob == NULL) {
		glob = globalObject;
	}
	if (cx == NULL) {
		cx = _cx;
	}
	JSScript* script = JS_CompileUTF8File(cx, glob, rpath.c_str());
	jsval rval;
	JSBool evaluatedOK = false;
	if (script) {
		filename_script[path] = script;
		JSAutoCompartment ac(cx, glob);
		evaluatedOK = JS_ExecuteScript(cx, glob, script, &rval);
		if (JS_FALSE == evaluatedOK) {
			fprintf(stderr, "(evaluatedOK == JS_FALSE)\n");
		}
	}
	return evaluatedOK;
}

JSBool jsRunScript(JSContext* cx, unsigned argc, jsval*vp)
{
	if (argc >= 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSString* str = JS_ValueToString(cx, argv[0]);
		const char* path = JS_EncodeString(cx, str);
		JSBool res = false;
		if (argc == 2 && argv[1].isString()) {
			JSString* globalName = JSVAL_TO_STRING(argv[1]);
			const char* name = JS_EncodeString(cx, globalName);
			js::RootedObject* rootedGlobal = globals[name];
			if (rootedGlobal) {
				JS_free(cx, (void*)name);
				res = runScript(path, rootedGlobal->get());
			} else {
				JS_ReportError(cx, "Invalid global object: %s", name);
				return JS_FALSE;
			}
		} else {
			JSObject* glob = JS_GetGlobalForScopeChain(cx);
			res = runScript(path, glob);
		}
		JS_free(cx, (void*)path);
		return res;
	}
	return JS_TRUE;
}

JSBool jslog(JSContext* cx, uint32_t argc, jsval *vp)
{
	if (argc > 0) {
		jsval* argv = JS_ARGV(cx, vp);
		JSString *string = JS_ValueToString(cx, argv[0]);
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

JSScript* getScript(std::string name)
{
	return filename_script[name];
}

// mat native methods
JSBool jsMat4mul(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat0 = JSVAL_TO_OBJECT(argv[0]);
		JSObject* mat1 = JSVAL_TO_OBJECT(argv[1]);
		JSObject* matOut = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsArrayBufferViewObject(mat0, cx) && JS_IsArrayBufferViewObject(mat1, cx) && JS_IsArrayBufferViewObject(matOut, cx)) {
			float* fmat0 = (float *)JS_GetArrayBufferViewData(mat0, cx);
			float* fmat1 = (float *)JS_GetArrayBufferViewData(mat1, cx);
			float* fmatOut = (float *)JS_GetArrayBufferViewData(matOut, cx);
			mat4mul(fmat0, fmat1, fmatOut);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JSBool jsMat4mulvec3(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat = JSVAL_TO_OBJECT(argv[0]);
		JSObject* vec = JSVAL_TO_OBJECT(argv[1]);
		JSObject* vecOut = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsArrayBufferViewObject(mat, cx) && JS_IsArrayBufferViewObject(vec, cx) && JS_IsArrayBufferViewObject(vecOut, cx)) {
			float* fmat = (float *)JS_GetArrayBufferViewData(mat, cx);
			float* fvec = (float *)JS_GetArrayBufferViewData(vec, cx);
			float* fvecOut = (float *)JS_GetArrayBufferViewData(vecOut, cx);
			mat4mulvec3(fmat, fvec, fvecOut);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JSBool jsMat4translate(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat = JSVAL_TO_OBJECT(argv[0]);
		double x; JS_ValueToNumber(cx, argv[1], &x);
		double y; JS_ValueToNumber(cx, argv[2], &y);
		double z; JS_ValueToNumber(cx, argv[3], &z);
		if (JS_IsArrayBufferViewObject(mat, cx)) {
			float* fmat = (float *)JS_GetArrayBufferViewData(mat, cx);
			mat4translate(fmat, x, y, z);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JSBool jsMat4rotate(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 5) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat = JSVAL_TO_OBJECT(argv[0]);
		float angle = JSVAL_TO_DOUBLE(argv[1]);
		double x; JS_ValueToNumber(cx, argv[2], &x);
		double y; JS_ValueToNumber(cx, argv[3], &y);
		double z; JS_ValueToNumber(cx, argv[4], &z);
		if (JS_IsArrayBufferViewObject(mat, cx)) {
			float* fmat = (float *)JS_GetArrayBufferViewData(mat, cx);
			mat4rotate(fmat, angle, x, y, z);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JSBool jsMat4scale(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat = JSVAL_TO_OBJECT(argv[0]);
		double x; JS_ValueToNumber(cx, argv[1], &x);
		double y; JS_ValueToNumber(cx, argv[2], &y);
		double z; JS_ValueToNumber(cx, argv[3], &z);
		if (JS_IsArrayBufferViewObject(mat, cx)) {
			float* fmat = (float *)JS_GetArrayBufferViewData(mat, cx);
			mat4scale(fmat, x, y, z);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JSBool jsSetGlobalObject(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* obj = JSVAL_TO_OBJECT(argv[0]);
		globalObject = obj;
	}
	return JS_TRUE;
}

JSObject* NewGlobalObject(JSContext* cx)
{
	JSObject* glob = JS_NewGlobalObject(cx, &global_class, NULL);
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
	JS_DefineFunction(cx, glob, "runScript", jsRunScript, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	
	// add debug functions
	JS_DefineFunction(cx, glob, "_getScript", jsGetScript, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_runInBackgroundThread", jsRunInBackgroundThread, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_socketOpen", jsSocketOpen, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_socketWrite", jsSocketWrite, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_socketRead", jsSocketRead, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_socketClose", jsSocketClose, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	
	// add the native mat functions
	JS_DefineFunction(cx, glob, "_mat4mul", jsMat4mul, 3, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4mulvec3", jsMat4mulvec3, 3, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4translate", jsMat4translate, 4, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4rotate", jsMat4rotate, 5, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4scale", jsMat4scale, 4, JSPROP_READONLY | JSPROP_PERMANENT);
	
	// get the size of the screen
	int width, height;
	getDeviceWinSize(&width, &height);
	jsval valWidth = INT_TO_JSVAL(width);
	jsval valHeight = INT_TO_JSVAL(height);
	jsval pixelRatio = DOUBLE_TO_JSVAL(getDevicePixelRatio());
	JS_SetProperty(cx, glob, "innerWidth", &valWidth);
	JS_SetProperty(cx, glob, "innerHeight", &valHeight);
	JS_SetProperty(cx, glob, "devicePixelRatio", &pixelRatio);

	// add custom classes
	ChesterCanvas::_js_register(_cx, glob);
	WebGLRenderingContext::_js_register(_cx, glob);
	PNGImage::_js_register(_cx, glob);
	FakeXMLHTTPRequest::_js_register(_cx, glob);
	FakeAudio::_js_register(_cx, glob);

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
			global = new js::RootedObject(cx, NewGlobalObject(getGlobalContext()));
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
	return _cx;
}

// will inject touches in the proper document event
void injectTouches(webglTouchEventType type, webglTouch_t* touches, int count)
{
	// the js event
	JSObject* jsEvent = JS_NewObject(_cx, NULL, NULL, NULL);
	std::vector<jsval> jsTouches;
	for (int i=0; i < count; i++) {
		JSObject* objTouch = JS_NewObject(_cx, NULL, NULL, NULL);
		jsval pageX = INT_TO_JSVAL(touches[i].x);
		jsval pageY = INT_TO_JSVAL(touches[i].y);
		JS_SetProperty(_cx, objTouch, "pageX", &pageX);
		JS_SetProperty(_cx, objTouch, "pageY", &pageY);
		jsval jsTouch = OBJECT_TO_JSVAL(objTouch);
		jsTouches.push_back(jsTouch);
	}
	JSObject* touchArray = JS_NewArrayObject(_cx, count, &jsTouches[0]);
	jsval valArray = OBJECT_TO_JSVAL(touchArray);
	// set all the touches arrays with the same data
	JS_SetProperty(_cx, jsEvent, "touches", &valArray);
	JS_SetProperty(_cx, jsEvent, "targetTouches", &valArray);
	JS_SetProperty(_cx, jsEvent, "changedTouches", &valArray);
	// call the document event listener
	jsval eventHandler;
	switch (type) {
		case webglTouchesBegan:
			JS_GetProperty(_cx, globalObject, "_touchesBegan", &eventHandler);
			break;
		case webglTouchesMoved:
			JS_GetProperty(_cx, globalObject, "_touchesMoved", &eventHandler);
			break;
		case webglTouchesEnded:
		case webglTouchesCanceled:
			JS_GetProperty(_cx, globalObject, "_touchesEnded", &eventHandler);
		default:
			break;
	}
	if (eventHandler != JSVAL_VOID) {
		jsval valEvent = OBJECT_TO_JSVAL(jsEvent);
		jsval out;
		JS_CallFunctionValue(_cx, NULL, eventHandler, 1, &valEvent, &out);
	}
}

void createJSEnvironment() {
	// create world
	JS_SetCStringsAreUTF8();
	runtime = JS_NewRuntime(10 * 1024 * 1024);
	_cx = JS_NewContext(runtime, 10240);

	JS_SetVersion(_cx, JSVERSION_LATEST);
	JS_SetOptions(_cx, JSOPTION_TYPE_INFERENCE);
	JS_SetOptions(_cx, JS_GetOptions(_cx) | JSOPTION_VAROBJFIX);
	JS_SetErrorReporter(_cx, reportError);
	globalObject = NewGlobalObject(_cx);

	// load the polyfill
	runScript("js/polyfill.js");
#if CHESTER
	runScript("js/chester.js");
#endif
}
