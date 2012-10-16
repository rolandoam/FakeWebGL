//
//  glue.h
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

#ifndef __GLUE_JS__
#define __GLUE_JS__

#include <typeinfo>
#include <string>
#include "jsapi.h"

void sc_finalize(JSFreeOp *freeOp, JSObject *obj);
JSBool jsNewGlobal(JSContext* cx, unsigned argc, jsval* vp);

typedef JSBool(*js_function)(JSContext* cx, unsigned argc, jsval* vp);

JSContext* getGlobalContext();
void createJSEnvironment();
JSObject* getGlobalObject(const char* name);
bool runScript(const char *path, JSObject* glob = NULL, JSContext* cx = NULL);
bool evalString(const char *string, jsval *outVal, const char *filename);

size_t readFileInMemory(const char *path, unsigned char **buff);
JSObject* getRequestAnimationFrameCallback();
void setRequestAnimationFrameCallback(JSObject* obj);
float getDevicePixelRatio();
void getDeviceWinSize(int* width, int* height);

// debug functions
JSScript* getScript(std::string name);
JSBool jsGets(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsPrint(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsRunInBackgroundThread(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsGetScript(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsSetGlobalObject(JSContext* cx, unsigned argc, jsval* vp);
// this is a server socket
JSBool jsSocketOpen(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsSocketRead(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsSocketWrite(JSContext* cx, unsigned argc, jsval* vp);
JSBool jsSocketClose(JSContext* cx, unsigned argc, jsval* vp);

// native matrix ops

// multiply 2 4x4 matrices. Store result in res
void mat4mul(float* matA, float* matB, float* res);
// multiply a 4x4 matrix with a vec3, res should be a vec3
void mat4mulvec3(float* matA, float* vec, float* res);
// translate a 4x4 matrix
void mat4translate(float* matA, float x, float y, float z);
// rotate a 4x4 matrix
void mat4rotate(float* matA, float r, float x, float y, float z);
// scale a 4x4 matrix
void mat4scale(float* matA, float scaleX, float scaleY, float scaleZ);

// set to zero if you do not want to load chesterGL
#define CHESTER 0

#pragma mark - Platform Specific

typedef enum {
	webglTouchesBegan = 1,
	webglTouchesMoved,
	webglTouchesEnded,
	webglTouchesCanceled
} webglTouchEventType;

typedef struct {
	float x;
	float y;
} webglTouch_t;

const char* getFullPathFromRelativePath(const char* path);
void injectTouches(webglTouchEventType type, webglTouch_t* touches, int count);

#pragma mark - Helpful Macros

#define JS_BINDED_CLASS_GLUE(klass) \
static JSClass js_class; \
static JSObject* js_proto; \
static JSObject* js_parent; \
static void _js_register(JSContext* cx, JSObject* global);

#define JS_BINDED_CLASS_GLUE_IMPL(klass) \
JSClass klass::js_class = {}; \
JSObject* klass::js_proto = NULL; \
JSObject* klass::js_parent = NULL; \

#define JS_BINDED_FUNC(klass, name) \
JSBool name(JSContext *cx, unsigned argc, jsval *vp)

#define JS_BINDED_CONSTRUCTOR(klass) \
static JSBool _js_constructor(JSContext *cx, unsigned argc, jsval *vp)

#define JS_BINDED_CONSTRUCTOR_IMPL(klass) \
JSBool klass::_js_constructor(JSContext *cx, unsigned argc, jsval *vp)

#define JS_BINDED_FUNC_IMPL(klass, name) \
static JSBool klass##_func_##name(JSContext *cx, unsigned argc, jsval *vp) { \
	JSObject* thisObj = JS_THIS_OBJECT(cx, vp); \
	klass* obj = (klass*)JS_GetPrivate(thisObj); \
	if (obj) { \
		return obj->name(cx, argc, vp); \
	} \
	JS_ReportError(cx, "Invalid object call for function %s", #name); \
	return JS_FALSE; \
} \
JSBool klass::name(JSContext *cx, unsigned argc, jsval *vp)

#define JS_WRAP_OBJECT(klass, cobj, out) \
do { \
	JSObject *obj = JS_NewObject(cx, &klass::js_class, klass::js_proto, klass::js_parent); \
	if (obj) { \
		JS_SetPrivate(obj, cobj); \
		out = OBJECT_TO_JSVAL(obj); \
	} \
} while(0) \

#define JS_BINDED_FUNC_FOR_DEF(klass, name) \
JS_FN(#name, klass##_func_##name, 0, JSPROP_PERMANENT | JSPROP_SHARED)

#define JS_BINDED_PROP_GET(klass, propName) \
JSBool _js_get_##propName(JSContext *cx, JSHandleId id, JSMutableHandleValue vp)

#define JS_BINDED_PROP_GET_IMPL(klass, propName) \
static JSBool _js_get_##klass##_##propName(JSContext *cx, JSHandleObject obj, JSHandleId id, JSMutableHandleValue vp) { \
	klass* cobj = (klass*)JS_GetPrivate(obj); \
	if (cobj) { \
		return cobj->_js_get_##propName(cx, id, vp); \
	} \
	JS_ReportError(cx, "Invalid getter call for property %s", #propName); \
	return JS_FALSE; \
} \
JSBool klass::_js_get_##propName(JSContext *cx, JSHandleId id, JSMutableHandleValue vp)

#define JS_BINDED_PROP_SET(klass, propName) \
JSBool _js_set_##propName(JSContext *cx, JSHandleId id, JSBool strict, JSMutableHandleValue vp)

#define JS_BINDED_PROP_SET_IMPL(klass, propName) \
static JSBool _js_set_##klass##_##propName(JSContext *cx, JSHandleObject obj, JSHandleId id, JSBool strict, JSMutableHandleValue vp) { \
	klass* cobj = (klass*)JS_GetPrivate(obj); \
	if (cobj) { \
		return cobj->_js_set_##propName(cx, id, strict, vp); \
	} \
	JS_ReportError(cx, "Invalid setter call for property %s", #propName); \
	return JS_FALSE; \
} \
JSBool klass::_js_set_##propName(JSContext *cx, JSHandleId id, JSBool strict, JSMutableHandleValue vp)

#define JS_BINDED_PROP_DEF_GETTER(klass, propName) \
{#propName, 0, JSPROP_ENUMERATE | JSPROP_SHARED, JSOP_WRAPPER(_js_get_##klass##_##propName), NULL}

#define JS_BINDED_PROP_DEF_GETTER_SETTER(klass, propName) \
{#propName, 0, JSPROP_ENUMERATE | JSPROP_SHARED, JSOP_WRAPPER(_js_get_##klass##_##propName), JSOP_WRAPPER(_js_set_##klass##_##propName)}

#define JS_CREATE_UINT_WRAPPED(valOut, propName, val) \
do { \
	JSObject* jsobj = JS_NewObject(cx, NULL, NULL, NULL); \
	jsval propVal = UINT_TO_JSVAL(val); \
	JS_SetProperty(cx, jsobj, "_" propName, &propVal); \
	valOut = OBJECT_TO_JSVAL(jsobj); \
} while(0)

#define JS_GET_UINT_WRAPPED(inVal, propName, out) \
do { \
	if (inVal.isObject()) {\
		JSObject* jsobj = JSVAL_TO_OBJECT(inVal); \
		jsval outVal; \
		JS_GetProperty(cx, jsobj, "_" propName, &outVal); \
		JS_ValueToECMAUint32(cx, outVal, &out); \
	} else { \
		int32_t tmp; \
		JS_ValueToInt32(cx, inVal, &tmp); \
		out = (uint32_t)tmp; \
	} \
} while (0)

#endif
