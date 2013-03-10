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
#include <queue>
#include <string>
#include <pthread.h>
#include <iconv.h>
#include <errno.h>
#include <assert.h>
#include "jsapi.h"
#include "jsfriendapi.h"
#include "jsdbgapi.h"
#include "glue.h"
#include "lodepng.h"

#include "WebGLRenderingContext.h"
#include "XMLHTTPRequest.h"
#include "FakeCanvas.h"
#include "FakeImage.h"
#include "FakeAudio.h"

JSContext *_cx, *dbgCtx;
JSObject* globalObject;
jsval nextCallbackForRequestAnimationFrame = JSVAL_NULL;
JSRuntime* runtime;

using namespace std;


struct DeferredCallback {
	js::RootedObject obj;
	js::RootedValue  fval;
	js::AutoArrayRooter args;
	unsigned argc;

	DeferredCallback(JSContext* cx) : obj(cx, NULL), fval(cx), args(cx, 0, NULL), argc(0) {}
	~DeferredCallback() {
		jsval* arr = args.array;
		if (arr) {
			delete arr;
		}
	}
};

// this is the queue of things to evaluate (obj,function)
queue<DeferredCallback*> callbackQueue;
pthread_mutex_t queue_mutex = PTHREAD_MUTEX_INITIALIZER;

void dummy_finalize(JSFreeOp *freeOp, JSObject *obj)
{
	return;
}

static JSClass global_class = {
    "global", JSCLASS_GLOBAL_FLAGS,
    JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
    JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, dummy_finalize,
    JSCLASS_NO_OPTIONAL_MEMBERS
};

void basic_object_finalize(JSFreeOp *freeOp, JSObject *obj) {
	JSBindedObject* native = dynamic_cast<JSBindedObject*>((JSBindedObject*)JS_GetPrivate(obj));
	if (native) {
		delete native;
	}
    return;
}

void reportError(JSContext *cx, const char *message, JSErrorReport *report)
{
	fprintf(stderr, "%s:%u:%u:%s\n",
			report->filename ? report->filename : "<no filename=\"filename\">",
			(unsigned int) report->lineno,
			(unsigned int) report->column,
			message);
};

bool evalString(const char *string, jsval *outVal, const char *filename)
{
	jsval rval;
	JSScript* script = JS_CompileScript(_cx, globalObject, string, strlen(string), filename, 1);
	if (script) {
		JSBool evaluatedOK = JS_ExecuteScript(_cx, globalObject, script, &rval);
		if (JS_FALSE == evaluatedOK) {
			fprintf(stderr, "(evaluatedOK == JS_FALSE)\n");
		}
		return evaluatedOK;
	}
	return false;
}

void addDeferredCallback(JSObject* obj, jsval fval, unsigned argc, jsval* args) {
	DeferredCallback* cb = new DeferredCallback(_cx);
	cb->obj = obj;
	cb->fval = fval;
	cb->argc = argc;
	cb->args.changeArray(args, argc);

	pthread_mutex_lock(&queue_mutex);
	callbackQueue.push(cb);
	pthread_mutex_unlock(&queue_mutex);
}

void executePendingCallbacks() {
	pthread_mutex_lock(&queue_mutex);
	while (!callbackQueue.empty()) {
		DeferredCallback* cb = callbackQueue.front();
		jsval rval;
		// we might find a deadlock if something we execute tries to add a deffered callback
		JS_CallFunctionValue(_cx, cb->obj, cb->fval, cb->argc, cb->args.array, &rval);
		JS_IsExceptionPending(_cx) && JS_ReportPendingException(_cx);
		callbackQueue.pop();
	}
	pthread_mutex_unlock(&queue_mutex);
}

size_t readFileInMemory(const char *path, unsigned char **buff) {
	struct stat buf;
	int file = open(path, O_RDONLY);
	size_t readBytes = 0;
	if (file) {
		if (fstat(file, &buf) == 0) {
			*buff = (unsigned char *)calloc(buf.st_size, 1);
			if (*buff) {
				readBytes = read(file, *buff, buf.st_size);
			}
		}
		close(file);
	}
    return readBytes;
}

bool runScript(const char *path, JSObject* glob, JSContext* cx) {
	if (!path) {
		return false;
	}
	string rpath;
	if (path[0] == '/') {
		rpath = path;
	} else {
		rpath = getFullPathFromRelativePath(path);
		if (rpath.empty()) {
			return false;
		}
	}
	if (glob == NULL) {
		glob = globalObject;
	}
	if (cx == NULL) {
		cx = _cx;
	}
	unsigned char* buff = NULL;
	size_t fsize = readFileInMemory(rpath.c_str(), &buff);
	if (fsize > 0) {
		JSScript* script = JS_CompileScript(cx, glob, (const char*)buff, fsize, rpath.c_str(), 1);
		jsval rval;
		JSBool evaluatedOK = false;
		if (script) {
			evaluatedOK = JS_ExecuteScript(cx, glob, script, &rval);
			if (JS_FALSE == evaluatedOK) {
				fprintf(stderr, "(evaluatedOK == JS_FALSE)\n");
			}
		}
		// check pending exceptions
		if (JS_IsExceptionPending(cx) && JS_ReportPendingException(cx)) {
			fprintf(stderr, "***\n");
		}
		free(buff);
		return evaluatedOK;
	}
	return false;
}

JSBool jsRunScript(JSContext* cx, unsigned argc, jsval*vp)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSString* str = JS_ValueToString(cx, argv[0]);
		JSStringWrapper path(str);
		JSObject* glob = JS_GetGlobalForScopeChain(cx);
		JSBool res = runScript(path, glob);
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
			JSStringWrapper wrapper(string);
			printf("%s\n", (const char*)wrapper);
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
		setRequestAnimationFrameCallback(argv[0]);
	}
	return JS_TRUE;
}

JSBool jsDevicePixelRatio(JSContext* cx, uint32_t argc, jsval *vp)
{
	JS_SET_RVAL(cx, vp, DOUBLE_TO_JSVAL(getDevicePixelRatio()));
	return JS_TRUE;
}

jsval getRequestAnimationFrameCallback() {
	return nextCallbackForRequestAnimationFrame;
}

void setRequestAnimationFrameCallback(jsval cb) {
	if (nextCallbackForRequestAnimationFrame != JSVAL_NULL) {
		JS_RemoveValueRoot(_cx, &nextCallbackForRequestAnimationFrame);
	}
	nextCallbackForRequestAnimationFrame = cb;
	JS_AddValueRoot(_cx, &nextCallbackForRequestAnimationFrame);
}

// mat native methods
JSBool jsMat4mul(JSContext* cx, unsigned argc, jsval* vp)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		JSObject* mat0 = JSVAL_TO_OBJECT(argv[0]);
		JSObject* mat1 = JSVAL_TO_OBJECT(argv[1]);
		JSObject* matOut = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsTypedArrayObject(mat0) && JS_IsTypedArrayObject(mat1) && JS_IsTypedArrayObject(matOut)) {
			float* fmat0 = JS_GetFloat32ArrayData(mat0);
			float* fmat1 = JS_GetFloat32ArrayData(mat1);
			float* fmatOut = JS_GetFloat32ArrayData(matOut);
			mat4mul(fmat0, fmat1, fmatOut);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "One of the vectors passed is not a typed array");
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
		if (JS_IsTypedArrayObject(mat) && JS_IsTypedArrayObject(vec) && JS_IsTypedArrayObject(vecOut)) {
			float* fmat = JS_GetFloat32ArrayData(mat);
			float* fvec = JS_GetFloat32ArrayData(vec);
			float* fvecOut = JS_GetFloat32ArrayData(vecOut);
			mat4mulvec3(fmat, fvec, fvecOut);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "One of the vectors passed is not a typed array");
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
		if (JS_IsTypedArrayObject(mat)) {
			float* fmat = JS_GetFloat32ArrayData(mat);
			mat4translate(fmat, x, y, z);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "The vector passed is not a typed array");
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
		if (JS_IsTypedArrayObject(mat)) {
			float* fmat = JS_GetFloat32ArrayData(mat);
			mat4rotate(fmat, angle, x, y, z);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "The vector passed is not a typed array");
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
		if (JS_IsTypedArrayObject(mat)) {
			float* fmat = JS_GetFloat32ArrayData(mat);
			mat4scale(fmat, x, y, z);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "The vector passed is not a typed array");
		}
	}
	return JS_FALSE;
}

JSObject* NewGlobalObject(JSContext* cx)
{
	JSObject* glob = JS_NewGlobalObject(cx, &global_class, NULL);
	if (!glob) {
		return NULL;
	}
	if (!JS_InitStandardClasses(cx, glob))
		return NULL;
	if (!JS_InitReflect(cx, glob))
		return NULL;
	if (!JS_DefineDebuggerObject(cx, glob))
		return NULL;

	JS_DefineFunction(cx, glob, "log", jslog, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "requestAnimationFrame", jsRequestAnimationFrame, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "runScript", jsRunScript, 1, JSPROP_READONLY | JSPROP_PERMANENT);

	// add the native mat functions
	JS_DefineFunction(cx, glob, "_mat4mul", jsMat4mul, 3, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4mulvec3", jsMat4mulvec3, 3, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4translate", jsMat4translate, 4, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4rotate", jsMat4rotate, 5, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, glob, "_mat4scale", jsMat4scale, 4, JSPROP_READONLY | JSPROP_PERMANENT);

	// get the size of the screen
	int width, height;
	getDeviceWinSize(&width, &height);
	setInnerWidthAndHeight(cx, glob, width, height);

	// add custom classes
	FakeCanvas::_js_register(_cx, glob);
	WebGLRenderingContext::_js_register(_cx, glob);
	FakeImage::_js_register(_cx, glob);
	FakeXMLHTTPRequest::_js_register(_cx, glob);
	FakeAudio::_js_register(_cx, glob);

	return glob;
}

void setInnerWidthAndHeight(JSContext* cx, JSObject* glob, int width, int height)
{
	if (glob == NULL) {
		glob = globalObject;
	}
	jsval valWidth = INT_TO_JSVAL(width);
	jsval valHeight = INT_TO_JSVAL(height);
	jsval pixelRatio = DOUBLE_TO_JSVAL(getDevicePixelRatio());
	JS_SetProperty(cx, glob, "innerWidth", &valWidth);
	JS_SetProperty(cx, glob, "innerHeight", &valHeight);
	JS_SetProperty(cx, glob, "devicePixelRatio", &pixelRatio);
}

JSContext* getGlobalContext() {
	return _cx;
}

JSObject* getGlobalObject() {
	return globalObject;
}

// will inject touches in the proper document event
void injectTouches(webglTouchEventType type, webglTouch_t* touches, int count)
{
	// the js event
	JSObject* jsEvent = JS_NewObject(_cx, NULL, NULL, NULL);
	vector<jsval> jsTouches;
	for (int i=0; i < count; i++) {
		JSObject* objTouch = JS_NewObject(_cx, NULL, NULL, NULL);
		jsval pageX = INT_TO_JSVAL(touches[i].x);
		jsval pageY = INT_TO_JSVAL(touches[i].y);
		JS_SetProperty(_cx, objTouch, "pageX", &pageX);
		JS_SetProperty(_cx, objTouch, "pageY", &pageY);
		JS_SetProperty(_cx, objTouch, "clientX", &pageX);
		JS_SetProperty(_cx, objTouch, "clientY", &pageY);
		jsval jsTouch = OBJECT_TO_JSVAL(objTouch);
		jsTouches.push_back(jsTouch);
	}
	js::RootedObject touchArray(_cx, JS_NewArrayObject(_cx, count, &jsTouches[0]));
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
			break;
		default:
			eventHandler = JSVAL_NULL;
			break;
	}
	if (!eventHandler.isNullOrUndefined()) {
		JS_IsExceptionPending(_cx) && JS_ReportPendingException(_cx);
		jsval valEvent = OBJECT_TO_JSVAL(jsEvent);
		jsval out;
		JS_CallFunctionValue(_cx, NULL, eventHandler, 1, &valEvent, &out);
	}
}

void createJSEnvironment() {
	// create world
	runtime = JS_NewRuntime(15 * 1024 * 1024, JS_NO_HELPER_THREADS);
	_cx = JS_NewContext(runtime, 15360);

	JS_SetVersion(_cx, JSVERSION_LATEST);
	JS_SetOptions(_cx, JSOPTION_TYPE_INFERENCE);
	JS_SetErrorReporter(_cx, reportError);
	globalObject = NewGlobalObject(_cx);

	// load the polyfill
	runScript("scripts/polyfill.js");
}
