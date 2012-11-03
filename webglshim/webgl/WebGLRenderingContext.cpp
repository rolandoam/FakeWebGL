//
//  WebGLRenderingContext.cpp
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

#include <OpenGLES/ES2/gl.h>
#include <iostream>
#include <iterator>
#include "WebGLRenderingContext.h"
#include "jsapi.h"
#include "jsfriendapi.h"
#include "lodepng.h"

using namespace std;

#pragma mark - ChesterCanvas

JS_BINDED_CLASS_GLUE_IMPL(ChesterCanvas);

JS_BINDED_CONSTRUCTOR_IMPL(ChesterCanvas)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		int w = JSVAL_TO_INT(argv[0]);
		int h = JSVAL_TO_INT(argv[1]);
		ChesterCanvas* cobj = new ChesterCanvas(w, h);
		jsval out;
		JS_WRAP_OBJECT_IN_VAL(ChesterCanvas, cobj, out);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_PROP_GET_IMPL(ChesterCanvas, width)
{
	vp.set(INT_TO_JSVAL(width));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(ChesterCanvas, height)
{
	vp.set(INT_TO_JSVAL(height));
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(ChesterCanvas, getContext)
{
	if (argc >= 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSString* str = JS_ValueToString(cx, argv[0]);
		const char* cstr = JS_EncodeString(cx, str);
		JSBool ok = JS_FALSE;
		if (strncmp(cstr, "experimental-webgl", 18) == 0) {
			WebGLRenderingContext* cobj = new WebGLRenderingContext(this);
			jsval out;
			JS_WRAP_OBJECT_IN_VAL(WebGLRenderingContext, cobj, out);
			JS_SET_RVAL(cx, vp, out);
			ok = JS_TRUE;
		}
		JS_free(cx, (void*)cstr);
		return ok;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void ChesterCanvas::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	ChesterCanvas::js_class = {
		"ChesterCanvas", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_GETTER(ChesterCanvas, width),
		JS_BINDED_PROP_DEF_GETTER(ChesterCanvas, height),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(ChesterCanvas, getContext),
		JS_FS_END
	};
	ChesterCanvas::js_parent = NULL;
	ChesterCanvas::js_proto = JS_InitClass(cx, global, NULL, &ChesterCanvas::js_class, ChesterCanvas::_js_constructor, 1, props, funcs, NULL, NULL);
}

#pragma mark - FakeXMLHTTPRequest

FakeXMLHTTPRequest::~FakeXMLHTTPRequest()
{
	if (onreadystateCallback) {
		JS_RemoveObjectRoot(getGlobalContext(), &onreadystateCallback);
	}
	if (data) {
		free(data);
	}
}

JS_BINDED_CLASS_GLUE_IMPL(FakeXMLHTTPRequest);

JS_BINDED_CONSTRUCTOR_IMPL(FakeXMLHTTPRequest)
{
	FakeXMLHTTPRequest* req = new FakeXMLHTTPRequest();
	jsval out;
	JS_WRAP_OBJECT_IN_VAL(FakeXMLHTTPRequest, req, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, onreadystatechange)
{
	if (onreadystateCallback) {
		jsval out = OBJECT_TO_JSVAL(onreadystateCallback);
		vp.set(out);
	} else {
		vp.set(JSVAL_NULL);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeXMLHTTPRequest, onreadystatechange)
{
	jsval callback = vp.get();
	if (callback != JSVAL_NULL) {
		onreadystateCallback = JSVAL_TO_OBJECT(callback);
		JS_AddNamedObjectRoot(cx, &onreadystateCallback, "FakeXMLHttpRequest_callback");
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, readyState)
{
	vp.set(INT_TO_JSVAL(readyState));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, status)
{
	vp.set(INT_TO_JSVAL(status));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, responseText)
{
	JSString* str = JS_NewStringCopyN(cx, (const char*)data, dataSize);
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, response)
{
	if (url.length() > 5 && url.compare(url.length() - 5, 5, ".json") == 0) {
		jsval outVal;
		JSString* str = JS_NewStringCopyN(cx, (const char*)data, dataSize);
		if (JS_ParseJSON(cx, JS_GetStringCharsZ(cx, str), dataSize, &outVal)) {
			vp.set(outVal);
			return JS_TRUE;
		}
	}
	return _js_get_responseText(cx, id, vp);
}

JS_BINDED_FUNC_IMPL(FakeXMLHTTPRequest, open)
{
	if (argc >= 2) {
		jsval* argv = JS_ARGV(cx, vp);
		const char* method;
		const char* urlstr;
		JSBool async = true;
		JSString* jsMethod = JS_ValueToString(cx, argv[0]);
		JSString* jsURL = JS_ValueToString(cx, argv[1]);
		if (argc > 2) {
			JS_ValueToBoolean(cx, argv[2], &async);
		}
		method = JS_EncodeString(cx, jsMethod);
		urlstr = JS_EncodeString(cx, jsURL);
		
		url = urlstr;
		readyState = 1;
		isAsync = async;
		
		JS_free(cx, (void*)method);
		JS_free(cx, (void*)urlstr);

		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(FakeXMLHTTPRequest, send)
{
	std::string path = getFullPathFromRelativePath(url.c_str());
	if (path.empty()) {
		// file not found
		readyState = 4;
		status = 404;
	} else {
		dataSize = readFileInMemory(path.c_str(), &data);
		if (dataSize > 0) {
			if (onreadystateCallback) {
				readyState = 4;
				status = 200;
			}
		} else {
			printf("Error trying to read '%s'\n", path.c_str());
			if (onreadystateCallback) {
				readyState = 4;
				status = 404; // just issue any error
			}
		}
	}
	if (onreadystateCallback) {
		jsval fval = OBJECT_TO_JSVAL(onreadystateCallback);
		jsval out;
		JS_CallFunctionValue(cx, NULL, fval, 0, NULL, &out);
	}
	return JS_TRUE;
}

void FakeXMLHTTPRequest::_js_register(JSContext *cx, JSObject *global)
{
	// create the class
	FakeXMLHTTPRequest::js_class = {
		"XMLHttpRequest", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_ACCESSOR(FakeXMLHTTPRequest, onreadystatechange),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, readyState),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, status),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, responseText),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, response),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeXMLHTTPRequest, open),
		JS_BINDED_FUNC_FOR_DEF(FakeXMLHTTPRequest, send),
		JS_FS_END
	};
	FakeXMLHTTPRequest::js_parent = NULL;
	FakeXMLHTTPRequest::js_proto = JS_InitClass(cx, global, NULL, &FakeXMLHTTPRequest::js_class, FakeXMLHTTPRequest::_js_constructor, 1, props, funcs, NULL, NULL);
}

#pragma mark - PNGImage

PNGImage::PNGImage() :
	BasicObject(),
	onloadCallback(getGlobalContext()),
	onerrorCallback(getGlobalContext())
{
	src = "invalid";
}

void PNGImage::loadPNG()
{
	std::string fullPath = getFullPathFromRelativePath(src.c_str());
	if (fullPath.empty()) {
		printf("PNG: File not found: %s\n", src.c_str());
		if (onerrorCallback) {
			jsval funcval = OBJECT_TO_JSVAL(onerrorCallback);
			jsval out;
			JSContext* cx = getGlobalContext();
			// create error: object with a single property
			JSObject* err = JS_NewObject(cx, NULL, NULL, NULL);
			JSString* str = JS_NewStringCopyZ(cx, "error");
			jsval strVal = STRING_TO_JSVAL(str);
			JS_SetProperty(cx, err, "type", &strVal);
			jsval errVal = OBJECT_TO_JSVAL(err);
			// just execute the callback
			JS_CallFunctionValue(cx, NULL, funcval, 1, &errVal, &out);
		}
	} else {
		unsigned error = lodepng::decode(bytes, width, height, fullPath);
		if (error) {
			printf("PNG: error %u decoding png: %s\n", error, lodepng_error_text(error));
			return;
		}
		if (onloadCallback) {
			jsval funcval = OBJECT_TO_JSVAL(onloadCallback);
			jsval out;
			JS_CallFunctionValue(getGlobalContext(), NULL, funcval, 0, NULL, &out);
		}
	}
}

unsigned char* PNGImage::getBytes()
{
	return &bytes[0];
}

JS_BINDED_CLASS_GLUE_IMPL(PNGImage)

JS_BINDED_CONSTRUCTOR_IMPL(PNGImage)
{
	PNGImage* image = new PNGImage();
	jsval out;
	JS_WRAP_OBJECT_IN_VAL(PNGImage, image, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(PNGImage, width)
{
	vp.set(INT_TO_JSVAL(width));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(PNGImage, height)
{
	vp.set(INT_TO_JSVAL(height));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(PNGImage, src)
{
	JSString* str = JS_NewStringCopyZ(cx, src.c_str());
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(PNGImage, src)
{
	JSString* jsstr = JS_ValueToString(cx, vp.get());
	const char* cstr = JS_EncodeString(cx, jsstr);
	// copy the source
	if (strlen(cstr) > 0) {
		src = cstr;
		loadPNG();
	}
	JS_free(cx, (void*)cstr);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(PNGImage, onload)
{
	if (onloadCallback) {
		vp.set(OBJECT_TO_JSVAL(onloadCallback));
	} else {
		vp.set(JSVAL_NULL);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(PNGImage, onload)
{
	jsval callback = vp.get();
	if (callback != JSVAL_NULL) {
		onloadCallback = JSVAL_TO_OBJECT(callback);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(PNGImage, onerror)
{
	if (onerrorCallback) {
		vp.set(OBJECT_TO_JSVAL(onerrorCallback));
	} else {
		vp.set(JSVAL_NULL);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(PNGImage, onerror)
{
	jsval callback = vp.get();
	if (callback != JSVAL_NULL) {
		onerrorCallback = JSVAL_TO_OBJECT(callback);
	}
	return JS_TRUE;
}

void PNGImage::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	PNGImage::js_class = {
		"PNGImage", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_GETTER(PNGImage, width),
		JS_BINDED_PROP_DEF_GETTER(PNGImage, height),
		JS_BINDED_PROP_DEF_ACCESSOR(PNGImage, src),
		JS_BINDED_PROP_DEF_ACCESSOR(PNGImage, onload),
		JS_BINDED_PROP_DEF_ACCESSOR(PNGImage, onerror),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_FS_END
	};
	PNGImage::js_parent = NULL;
	PNGImage::js_proto = JS_InitClass(cx, global, NULL, &PNGImage::js_class, PNGImage::_js_constructor, 1, props, funcs, NULL, NULL);
}

#pragma mark - WebGLRenderingContext

JS_BINDED_CLASS_GLUE_IMPL(WebGLRenderingContext);

JS_BINDED_CONSTRUCTOR_IMPL(WebGLRenderingContext)
{
	// this constructor should never be called from js
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, activeTexture)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum texture;
		JS_ValueToECMAUint32(cx, argv[0], &texture);
		glActiveTexture(texture);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, attachShader)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		GLuint shader;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		JS_ValueToECMAUint32(cx, argv[1], &shader);
		glAttachShader(program, shader);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bindAttribLocation)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		GLuint index;
		JSString* str = JS_ValueToString(cx, argv[2]);
		const char* name = JS_EncodeString(cx, str);
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		JS_ValueToECMAUint32(cx, argv[1], &index);
		glBindAttribLocation(program, index, name);
		JS_free(cx, (void*)name);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bindBuffer)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLuint buffer;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_GET_UINT_WRAPPED(argv[1], "buffer", buffer);
		glBindBuffer(target, buffer);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bindFramebuffer)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLuint framebuffer;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_GET_UINT_WRAPPED(argv[1], "buffer", framebuffer);
		glBindFramebuffer(target, framebuffer);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bindRenderbuffer)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLuint renderbuffer;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_GET_UINT_WRAPPED(argv[1], "buffer", renderbuffer);
		glBindFramebuffer(target, renderbuffer);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bindTexture)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		uint32_t texture;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_GET_UINT_WRAPPED(argv[1], "texture", texture);
		glBindTexture(target, texture);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void WebGLRenderingContext::blendColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha)
{
	glBlendColor(red, green, blue, alpha);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, blendEquation)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum mode;
		JS_ValueToECMAUint32(cx, argv[0], &mode);
		glBlendEquation(mode);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, blendEquationSeparate)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum modeRGB;
		GLenum modeAlpha;
		JS_ValueToECMAUint32(cx, argv[0], &modeRGB);
		JS_ValueToECMAUint32(cx, argv[1], &modeAlpha);
		glBlendEquationSeparate(modeRGB, modeAlpha);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, blendFunc)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum sfactor;
		GLenum dfactor;
		JS_ValueToECMAUint32(cx, argv[0], &sfactor);
		JS_ValueToECMAUint32(cx, argv[1], &dfactor);
		glBlendFunc(sfactor, dfactor);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, blendFuncSeparate)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum srcRGB;
		GLenum dstRGB;
		GLenum srcAlpha;
		GLenum dstAlpha;
		JS_ValueToECMAUint32(cx, argv[0], &srcRGB);
		JS_ValueToECMAUint32(cx, argv[1], &dstRGB);
		JS_ValueToECMAUint32(cx, argv[2], &srcAlpha);
		JS_ValueToECMAUint32(cx, argv[3], &dstAlpha);
		glBlendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bufferData)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		JSObject *data;
		GLenum usage;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		data = JSVAL_TO_OBJECT(argv[1]);
		JS_ValueToECMAUint32(cx, argv[2], &usage);
		if (JS_IsArrayBufferViewObject(data, cx)) {
			void* d = JS_GetArrayBufferViewData(data, cx);
			GLsizeiptr size = JS_GetArrayBufferViewByteLength(data, cx);
			glBufferData(target, size, d, usage);
			return JS_TRUE;
		}
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, bufferSubData)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLintptr offset;
		JSObject *data;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		offset = JSVAL_TO_INT(argv[1]);
		data = JSVAL_TO_OBJECT(argv[1]);
		if (JS_IsArrayBufferViewObject(data, cx)) {
			void* d = JS_GetArrayBufferViewData(data, cx);
			GLsizeiptr size = JS_GetArrayBufferViewByteLength(data, cx);
			glBufferSubData(target, offset, size, d);
			return JS_TRUE;
		}
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

GLenum WebGLRenderingContext::checkFramebufferStatus(GLenum target)
{
	return glCheckFramebufferStatus(target);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, clear)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLbitfield mask;
		JS_ValueToECMAUint32(cx, argv[0], &mask);
		glClear(mask);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, clearColor)
{
	if (argc == 4) {
		GLclampf color[4];
		jsval* argv = JS_ARGV(cx, vp);
		for (int i=0; i < 4; i++) {
			double d;
			JS_ValueToNumber(cx, argv[i], &d);
			color[i] = d;
		}
		glClearColor(color[0], color[1], color[2], color[3]);
		return JS_TRUE;
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, clearDepth)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		double depth;
		JS_ValueToNumber(cx, argv[0], &depth);
		glClearDepthf(depth);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, clearStencil)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint s = JSVAL_TO_INT(argv[0]);
		glClearStencil(s);
	}
	return JS_TRUE;
}

void WebGLRenderingContext::colorMask(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha)
{
	glColorMask(red, green, blue, alpha);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, compileShader)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint shader;
		JS_ValueToECMAUint32(cx, argv[0], &shader);
		glCompileShader(shader);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createBuffer)
{
	if (argc == 0) {
		GLuint buffer;
		glGenBuffers(1, &buffer);
		jsval out;
		JS_CREATE_UINT_WRAPPED(out, "buffer", buffer);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createFramebuffer)
{
	if (argc == 0) {
		GLuint framebuffer;
		glGenFramebuffers(1, &framebuffer);
		jsval out;
		JS_CREATE_UINT_WRAPPED(out, "buffer", framebuffer);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createProgram)
{
	if (argc == 0) {
		GLuint program = glCreateProgram();
		jsval out;
		JS_CREATE_UINT_WRAPPED(out, "program", program);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createRenderbuffer)
{
	if (argc == 0) {
		GLuint renderbuffer;
		glGenRenderbuffers(1, &renderbuffer);
		jsval out;
		JS_CREATE_UINT_WRAPPED(out, "buffer", renderbuffer);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createShader)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum type;
		JS_ValueToECMAUint32(cx, argv[0], &type);
		GLuint shader = glCreateShader(type);
		jsval out = UINT_TO_JSVAL(shader);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, createTexture)
{
	if (argc == 0) {
		GLuint texture;
		glGenTextures(1, &texture);
		jsval out;
		JS_CREATE_UINT_WRAPPED(out, "texture", texture);
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, cullFace)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum mode;
		JS_ValueToECMAUint32(cx, argv[0], &mode);
		glCullFace(mode);
	}
	return JS_TRUE;
}

void WebGLRenderingContext::deleteBuffer(WebGLBuffer buffer)
{
	glDeleteBuffers(1, &buffer);
}

void WebGLRenderingContext::deleteFramebuffer(WebGLFramebuffer framebuffer)
{
	glDeleteFramebuffers(1, &framebuffer);
}

void WebGLRenderingContext::deleteProgram(WebGLProgram program)
{
	glDeleteProgram(program);
}

void WebGLRenderingContext::deleteRenderbuffer(WebGLRenderbuffer renderbuffer)
{
	glDeleteRenderbuffers(1, &renderbuffer);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, deleteShader)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint shader;
		JS_ValueToECMAUint32(cx, argv[0], &shader);
		glDeleteShader(shader);
		return JS_TRUE;
	}
	return JS_FALSE;
}

void WebGLRenderingContext::deleteTexture(WebGLTexture texture)
{
	glDeleteTextures(1, &texture);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, depthFunc)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum func;
		JS_ValueToECMAUint32(cx, argv[0], &func);
		glDepthFunc(func);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, depthMask)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		JSBool flag;
		JS_ValueToBoolean(cx, argv[0], &flag);
		glDepthMask(flag);
		return JS_TRUE;
	}
	return JS_FALSE;
}

void WebGLRenderingContext::depthRange(GLclampf zNear, GLclampf zFar)
{
	glDepthRangef(zNear, zFar);
}

void WebGLRenderingContext::detachShader(WebGLProgram program, WebGLShader shader)
{
	glDetachShader(program, shader);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, disable)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum cap;
		JS_ValueToECMAUint32(cx, argv[0], &cap);
		glDisable(cap);
		return JS_TRUE;
	}
	return JS_FALSE;
}

void WebGLRenderingContext::disableVertexAttribArray(GLuint index)
{
	glDisableVertexAttribArray(index);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, drawArrays)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum mode;
		GLint first;
		GLsizei count;
		JS_ValueToECMAUint32(cx, argv[0], &mode);
		first = JSVAL_TO_INT(argv[1]);
		count = JSVAL_TO_INT(argv[2]);
		glDrawArrays(mode, first, count);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, drawElements)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum mode;
		GLsizei count;
		GLenum type;
		GLintptr offset;
		JS_ValueToECMAUint32(cx, argv[0], &mode);
		count = JSVAL_TO_INT(argv[1]);
		JS_ValueToECMAUint32(cx, argv[2], &type);
		offset = JSVAL_TO_INT(argv[3]);
		glDrawElements(mode, count, type, reinterpret_cast<GLvoid*>(offset));
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, enable)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum cap;
		JS_ValueToECMAUint32(cx, argv[0], &cap);
		glEnable(cap);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, enableVertexAttribArray)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint index;
		JS_ValueToECMAUint32(cx, argv[0], &index);
		glEnableVertexAttribArray(index);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void WebGLRenderingContext::finish()
{
	glFinish();
}

void WebGLRenderingContext::flush()
{
	glFlush();
}

void WebGLRenderingContext::framebufferRenderbuffer(GLenum target, GLenum attachment,
							 GLenum renderbuffertarget,
							 WebGLRenderbuffer renderbuffer)
{
	glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer);
}

void WebGLRenderingContext::framebufferTexture2D(GLenum target, GLenum attachment, GLenum textarget,
						  WebGLTexture texture, GLint level)
{
	glFramebufferTexture2D(target, attachment, textarget, texture, level);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, frontFace)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum mode;
		JS_ValueToECMAUint32(cx, argv[0], &mode);
		glFrontFace(mode);
	}
	return JS_TRUE;
}

void WebGLRenderingContext::generateMipmap(GLenum target)
{
	glGenerateMipmap(target);
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getAttribLocation)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		const char* name;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		JSString* jsname = JS_ValueToString(cx, argv[1]);
		name = JS_EncodeString(cx, jsname);
		int location = glGetAttribLocation(program, name);
		JS_SET_RVAL(cx, vp, INT_TO_JSVAL(location));
		JS_free(cx, (void*)name);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getParameter)
{
	// TODO: FIX FOR THE REST OF THE NON-INTEGER PARAMS
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum pname;
		GLint ret;
		JS_ValueToECMAUint32(cx, argv[0], &pname);
		glGetIntegerv(pname, &ret);
		JS_SET_RVAL(cx, vp, INT_TO_JSVAL(ret));
	}
	return JS_TRUE;
}

GLint WebGLRenderingContext::getBufferParameter(GLenum target, GLenum pname)
{
	GLint res;
	glGetBufferParameteriv(target, pname, &res);
	return res;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getError)
{
	GLenum error = glGetError();
	jsval out = UINT_TO_JSVAL(error);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getExtension)
{
	jsval out = BOOLEAN_TO_JSVAL(JS_FALSE);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getShaderInfoLog)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		GLint len, outLen;
		glGetShaderiv(program, GL_INFO_LOG_LENGTH, &len);
		char buff[len+1];
		glGetShaderInfoLog(program, len, &outLen, buff);
		if (outLen > 0) {
			JSString* str = JS_NewStringCopyN(cx, buff, outLen);
			JS_SET_RVAL(cx, vp, STRING_TO_JSVAL(str));
		}
	} else {
		JS_SET_RVAL(cx, vp, JSVAL_NULL);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getUniformLocation)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		const char* name;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		JSString* str = JS_ValueToString(cx, argv[1]);
		name = JS_EncodeString(cx, str);
		int location = glGetUniformLocation(program, name);
		JS_SET_RVAL(cx, vp, INT_TO_JSVAL(location));
		JS_free(cx, (void*)name);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

GLint WebGLRenderingContext::getVertexAttrib(GLuint index, GLenum pname)
{
	return 0;
}

GLsizeiptr WebGLRenderingContext::getVertexAttribOffset(GLuint index, GLenum pname)
{
	return 0;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, lineWidth)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		double width;
		JS_ValueToNumber(cx, argv[0], &width);
		glLineWidth(width);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, linkProgram)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		glLinkProgram(program);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, pixelStorei)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum pname;
		int32_t param;
		JS_ValueToECMAUint32(cx, argv[0], &pname);
		JS_ValueToInt32(cx, argv[1], &param);
		if (pname == GL_PACK_ALIGNMENT || pname == GL_UNPACK_ALIGNMENT) {
			glPixelStorei(pname, param);
			return JS_TRUE;
		} else {
			JS_ReportError(cx, "Invalid enum for pixelStorei: %u", pname);
			return JS_FALSE;
		}
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void WebGLRenderingContext::polygonOffset(GLfloat factor, GLfloat units)
{
	glPolygonOffset(factor, units);
}

void WebGLRenderingContext::readPixels(GLint x, GLint y, GLsizei width, GLsizei height,
				GLenum format, GLenum type, JSObject* pixels)
{
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, shaderSource)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint shader;
		JS_ValueToECMAUint32(cx, argv[0], &shader);
		JSString* jsstr = JS_ValueToString(cx, argv[1]);
		const char* source = JS_EncodeString(cx, jsstr);
		GLint length = strlen(source);
		glShaderSource(shader, 1, &source, &length);
		JS_free(cx, (void*)source);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getShaderParameter)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint shader;
		GLenum pname;
		JS_ValueToECMAUint32(cx, argv[0], &shader);
		JS_ValueToECMAUint32(cx, argv[1], &pname);
		jsval out = JSVAL_NULL;
		switch (pname) {
			case GL_SHADER_TYPE:
				GLint shaderType;
				glGetShaderiv(shader, GL_SHADER_TYPE, &shaderType);
				out = INT_TO_JSVAL(shaderType);
				break;
			case GL_COMPILE_STATUS:
				GLint status;
				glGetShaderiv(shader, GL_COMPILE_STATUS, &status);
				out = BOOLEAN_TO_JSVAL(status == GL_TRUE);
				break;
			default:
				break;
		}
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, getProgramParameter)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		GLenum pname;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		JS_ValueToECMAUint32(cx, argv[1], &pname);
		jsval out = JSVAL_NULL;
		GLint params;
		switch (pname) {
			case GL_DELETE_STATUS:
				glGetProgramiv(program, GL_DELETE_STATUS, &params);
				out = BOOLEAN_TO_JSVAL(params == GL_TRUE);
				break;
			case GL_LINK_STATUS:
				glGetProgramiv(program, GL_LINK_STATUS, &params);
				out = BOOLEAN_TO_JSVAL(params == GL_TRUE);
				break;
			case GL_VALIDATE_STATUS:
				glGetProgramiv(program, GL_VALIDATE_STATUS, &params);
				out = BOOLEAN_TO_JSVAL(params == GL_TRUE);
				break;
			case GL_ATTACHED_SHADERS:
				glGetProgramiv(program, GL_ATTACHED_SHADERS, &params);
				out = INT_TO_JSVAL(params);
				break;
			case GL_ACTIVE_ATTRIBUTES:
				glGetProgramiv(program, GL_ACTIVE_ATTRIBUTES, &params);
				out = INT_TO_JSVAL(params);
				break;
			case GL_ACTIVE_UNIFORMS:
				glGetProgramiv(program, GL_ACTIVE_UNIFORMS, &params);
				out = INT_TO_JSVAL(params);
				break;
			default:
				break;
		}
		JS_SET_RVAL(cx, vp, out);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, texImage2D)
{
	if (argc >= 6) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLint level;
		GLenum internalformat;
		GLenum format;
		GLenum type;
		JSObject* jsimage;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		level = JSVAL_TO_INT(argv[1]);
		JS_ValueToECMAUint32(cx, argv[2], &internalformat);
		if (argc == 6) {
			JS_ValueToECMAUint32(cx, argv[3], &format);
			JS_ValueToECMAUint32(cx, argv[4], &type);
			jsimage = JSVAL_TO_OBJECT(argv[5]);
			if (JS_InstanceOf(cx, jsimage, &PNGImage::js_class, NULL)) {
				PNGImage* image = (PNGImage*)JS_GetPrivate(jsimage);
				glTexImage2D(target, level, internalformat, image->width, image->height, 0, format, type, image->getBytes());
				return JS_TRUE;
			}
		} else if (argc == 9) {
			// do the other call
			GLsizei width = JSVAL_TO_INT(argv[3]);
			GLsizei height = JSVAL_TO_INT(argv[4]);
			GLint border = JSVAL_TO_INT(argv[5]);
			JS_ValueToECMAUint32(cx, argv[6], &format);
			JS_ValueToECMAUint32(cx, argv[7], &type);
			jsimage = (argv[8].isNullOrUndefined() ? NULL : JSVAL_TO_OBJECT(argv[8]));
			const GLvoid* data = NULL;
			if (jsimage && JS_InstanceOf(cx, jsimage, &PNGImage::js_class, NULL)) {
				PNGImage* image = (PNGImage*)JS_GetPrivate(jsimage);
				data = image->getBytes();
			}
			glTexImage2D(target, level, internalformat, width, height, border, format, type, data);
			return JS_TRUE;
		}
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, texParameterf)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLenum pname;
		GLfloat param;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_ValueToECMAUint32(cx, argv[1], &pname);
		param = JSVAL_TO_DOUBLE(argv[2]);
		glTexParameterf(target, pname, param);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, texParameteri)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLenum target;
		GLenum pname;
		GLint param;
		JS_ValueToECMAUint32(cx, argv[0], &target);
		JS_ValueToECMAUint32(cx, argv[1], &pname);
		param = JSVAL_TO_INT(argv[2]);
		glTexParameteri(target, pname, param);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform1f)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		double x;
		JS_ValueToNumber(cx, argv[1], &x);
		glUniform1f(location, x);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform1fv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsFloat32Array(arr, cx)) {
				GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform1fv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLfloat data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					double tmp;
					JS_GetElement(cx, arr, i, &elt);
					JS_ValueToNumber(cx, elt, &tmp);
					data[i] = tmp;
				}
				glUniform1fv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform1i)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		GLint x;
		JS_ValueToInt32(cx, argv[1], &x);
		glUniform1i(location, x);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform1iv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsInt32Array(arr, cx)) {
				GLint* data = JS_GetInt32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform1iv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLint data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					JS_GetElement(cx, arr, i, &elt);
					data[i] = JSVAL_TO_INT(elt);
				}
				glUniform1iv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform2f)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		double x;
		double y;
		JS_ValueToNumber(cx, argv[1], &x);
		JS_ValueToNumber(cx, argv[2], &y);
		glUniform2f(location, x, y);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform2fv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsFloat32Array(arr, cx)) {
				GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform2fv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLfloat data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					double tmp;
					JS_GetElement(cx, arr, i, &elt);
					JS_ValueToNumber(cx, elt, &tmp);
					data[i] = tmp;
				}
				glUniform2fv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform2i)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		GLint x;
		GLint y;
		JS_ValueToInt32(cx, argv[1], &x);
		JS_ValueToInt32(cx, argv[2], &y);
		glUniform2i(location, x, y);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform2iv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsInt32Array(arr, cx)) {
				GLint* data = JS_GetInt32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform2iv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLint data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					JS_GetElement(cx, arr, i, &elt);
					data[i] = JSVAL_TO_INT(elt);
				}
				glUniform2iv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform3f)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location;
		double x;
		double y;
		double z;
		location = JSVAL_TO_INT(argv[0]);
		JS_ValueToNumber(cx, argv[1], &x);
		JS_ValueToNumber(cx, argv[2], &y);
		JS_ValueToNumber(cx, argv[3], &z);
		glUniform3f(location, x, y, z);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform3fv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsFloat32Array(arr, cx)) {
				GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform3fv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLfloat data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					double tmp;
					JS_GetElement(cx, arr, i, &elt);
					JS_ValueToNumber(cx, elt, &tmp);
					data[i] = tmp;
				}
				glUniform3fv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform3i)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		GLint x;
		GLint y;
		GLint z;
		JS_ValueToInt32(cx, argv[1], &x);
		JS_ValueToInt32(cx, argv[2], &y);
		JS_ValueToInt32(cx, argv[3], &z);
		glUniform3i(location, x, y, z);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform3iv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsInt32Array(arr, cx)) {
				GLint* data = JS_GetInt32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform3iv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLint data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					JS_GetElement(cx, arr, i, &elt);
					data[i] = JSVAL_TO_INT(elt);
				}
				glUniform3iv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform4f)
{
	if (argc == 5) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location;
		double x;
		double y;
		double z;
		double w;
		location = JSVAL_TO_INT(argv[0]);
		JS_ValueToNumber(cx, argv[1], &x);
		JS_ValueToNumber(cx, argv[2], &y);
		JS_ValueToNumber(cx, argv[3], &z);
		JS_ValueToNumber(cx, argv[4], &w);
		glUniform4f(location, x, y, z, w);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform4fv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsFloat32Array(arr, cx)) {
				GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform4fv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLfloat data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					double tmp;
					JS_GetElement(cx, arr, i, &elt);
					JS_ValueToNumber(cx, elt, &tmp);
					data[i] = tmp;
				}
				glUniform4fv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform4i)
{
	if (argc == 5) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		GLint x;
		GLint y;
		GLint z;
		GLint w;
		JS_ValueToInt32(cx, argv[1], &x);
		JS_ValueToInt32(cx, argv[2], &y);
		JS_ValueToInt32(cx, argv[3], &z);
		JS_ValueToInt32(cx, argv[4], &w);
		glUniform4i(location, x, y, z, w);
		return JS_TRUE;
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniform4iv)
{
	if (argc == 2) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint location = JSVAL_TO_INT(argv[0]);
		if (argv[1].isObject()) {
			JSObject* arr = JSVAL_TO_OBJECT(argv[1]);
			if (JS_IsInt32Array(arr, cx)) {
				GLint* data = JS_GetInt32ArrayData(arr, cx);
				GLsizei count = JS_GetTypedArrayLength(arr, cx);
				glUniform4iv(location, count, data);
				return JS_TRUE;
			} else if (JS_IsArrayObject(cx, arr)) {
				// implement thing here getting the elements from the array
				unsigned length;
				JS_GetArrayLength(cx, arr, &length);
				GLint data[length];
				for (int i=0; i < length; i++) {
					jsval elt;
					JS_GetElement(cx, arr, i, &elt);
					data[i] = JSVAL_TO_INT(elt);
				}
				glUniform4iv(location, length, data);
				return JS_TRUE;
			}
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniformMatrix2fv)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint location;
		GLboolean transpose;
		JSObject* arr;
		JS_ValueToECMAUint32(cx, argv[0], &location);
		transpose = JSVAL_TO_BOOLEAN(argv[1]);
		arr = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsFloat32Array(arr, cx)) {
			GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
			glUniformMatrix2fv(location, 1, transpose, data);
			return JS_TRUE;
		} else if (JS_IsArrayObject(cx, arr)) {
			unsigned length;
			JS_GetArrayLength(cx, arr, &length);
			GLfloat data[length];
			for (int i=0; i < length; i++) {
				jsval elt;
				double tmp;
				JS_GetElement(cx, arr, i, &elt);
				JS_ValueToNumber(cx, elt, &tmp);
				data[i] = tmp;
			}
			glUniformMatrix2fv(location, 1, transpose, data);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniformMatrix3fv)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint location;
		GLboolean transpose;
		JSObject* arr;
		JS_ValueToECMAUint32(cx, argv[0], &location);
		transpose = JSVAL_TO_BOOLEAN(argv[1]);
		arr = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsFloat32Array(arr, cx)) {
			GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
			glUniformMatrix3fv(location, 1, transpose, data);
			return JS_TRUE;
		} else if (JS_IsArrayObject(cx, arr)) {
			unsigned length;
			JS_GetArrayLength(cx, arr, &length);
			GLfloat data[length];
			for (int i=0; i < length; i++) {
				jsval elt;
				double tmp;
				JS_GetElement(cx, arr, i, &elt);
				JS_ValueToNumber(cx, elt, &tmp);
				data[i] = tmp;
			}
			glUniformMatrix3fv(location, 1, transpose, data);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, uniformMatrix4fv)
{
	if (argc == 3) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint location;
		GLboolean transpose;
		JSObject* arr;
		JS_ValueToECMAUint32(cx, argv[0], &location);
		transpose = JSVAL_TO_BOOLEAN(argv[1]);
		arr = JSVAL_TO_OBJECT(argv[2]);
		if (JS_IsFloat32Array(arr, cx)) {
			GLfloat* data = JS_GetFloat32ArrayData(arr, cx);
			glUniformMatrix4fv(location, 1, transpose, data);
			return JS_TRUE;
		} else if (JS_IsArrayObject(cx, arr)) {
			unsigned length;
			JS_GetArrayLength(cx, arr, &length);
			GLfloat data[length];
			for (int i=0; i < length; i++) {
				jsval elt;
				double tmp;
				JS_GetElement(cx, arr, i, &elt);
				JS_ValueToNumber(cx, elt, &tmp);
				data[i] = tmp;
			}
			glUniformMatrix4fv(location, 1, transpose, data);
			return JS_TRUE;
		}
	}
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, useProgram)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		glUseProgram(program);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, validateProgram)
{
	if (argc == 1) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint program;
		JS_GET_UINT_WRAPPED(argv[0], "program", program);
		glValidateProgram(program);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void WebGLRenderingContext::vertexAttrib1f(GLuint indx, GLfloat x)
{
	glVertexAttrib1f(indx, x);
}

void WebGLRenderingContext::vertexAttrib1fv(GLuint indx, JSObject* values)
{
	JSContext* cx = getGlobalContext();
	if (JS_IsFloat32Array(values, cx)) {
		GLfloat* data = JS_GetFloat32ArrayData(values, cx);
		int count = JS_GetTypedArrayLength(values, cx);
		if (count >= 1) {
			glVertexAttrib1fv(indx, data);
		}
	}
}

void WebGLRenderingContext::vertexAttrib2f(GLuint indx, GLfloat x, GLfloat y)
{
	glVertexAttrib2f(indx, x, y);
}

void WebGLRenderingContext::vertexAttrib2fv(GLuint indx, JSObject* values)
{
	JSContext* cx = getGlobalContext();
	if (JS_IsFloat32Array(values, cx)) {
		GLfloat* data = JS_GetFloat32ArrayData(values, cx);
		int count = JS_GetTypedArrayLength(values, cx);
		if (count >= 2) {
			glVertexAttrib2fv(indx, data);
		}
	}
}

void WebGLRenderingContext::vertexAttrib3f(GLuint indx, GLfloat x, GLfloat y, GLfloat z)
{
	glVertexAttrib3f(indx, x, y, z);
}

void WebGLRenderingContext::vertexAttrib3fv(GLuint indx, JSObject* values)
{
	JSContext* cx = getGlobalContext();
	if (JS_IsFloat32Array(values, cx)) {
		GLfloat* data = JS_GetFloat32ArrayData(values, cx);
		int count = JS_GetTypedArrayLength(values, cx);
		if (count >= 3) {
			glVertexAttrib3fv(indx, data);
		}
	}
}

void WebGLRenderingContext::vertexAttrib4f(GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w)
{
	glVertexAttrib4f(indx, x, y, z, w);
}

void WebGLRenderingContext::vertexAttrib4fv(GLuint indx, JSObject* values)
{
	JSContext* cx = getGlobalContext();
	if (JS_IsFloat32Array(values, cx)) {
		GLfloat* data = JS_GetFloat32ArrayData(values, cx);
		int count = JS_GetTypedArrayLength(values, cx);
		if (count >= 4) {
			glVertexAttrib4fv(indx, data);
		}
	}
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, vertexAttribPointer)
{
	if (argc == 6) {
		jsval* argv = JS_ARGV(cx, vp);
		GLuint indx;
		GLint size;
		GLenum type;
		GLboolean normalized;
		GLsizei stride;
		GLintptr offset;
		JS_ValueToECMAUint32(cx, argv[0], &indx);
		size = JSVAL_TO_INT(argv[1]);
		JS_ValueToECMAUint32(cx, argv[2], &type);
		normalized = JSVAL_TO_BOOLEAN(argv[3]);
		stride = JSVAL_TO_INT(argv[4]);
		offset = JSVAL_TO_INT(argv[5]);
		glVertexAttribPointer(indx, size, type, normalized, stride, reinterpret_cast<GLvoid*>(offset));
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(WebGLRenderingContext, viewport)
{
	if (argc == 4) {
		jsval* argv = JS_ARGV(cx, vp);
		GLint x, y;
		GLsizei width, height;
		x = JSVAL_TO_INT(argv[0]);
		y = JSVAL_TO_INT(argv[1]);
		width = JSVAL_TO_INT(argv[2]);
		height = JSVAL_TO_INT(argv[3]);
		glViewport(x, y, width, height);
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call");
	return JS_FALSE;
}

void WebGLRenderingContext::_js_register(JSContext* cx, JSObject *global)
{
	// create the class
	WebGLRenderingContext::js_class = {
		"WebGLRenderingContext", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, activeTexture),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, attachShader),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bindAttribLocation),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bindBuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bindFramebuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bindRenderbuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bindTexture),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, blendEquation),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, blendEquationSeparate),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, blendFunc),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, blendFuncSeparate),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bufferData),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, bufferSubData),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, clear),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, clearColor),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, clearDepth),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, clearStencil),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, compileShader),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createBuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createFramebuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createProgram),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createRenderbuffer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createShader),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, createTexture),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, cullFace),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, deleteShader),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, depthFunc),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, depthMask),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, disable),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, drawArrays),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, drawElements),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, enable),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, enableVertexAttribArray),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, frontFace),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getError),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getExtension),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getShaderInfoLog),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getUniformLocation),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getAttribLocation),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getParameter),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, lineWidth),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, linkProgram),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, pixelStorei),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, shaderSource),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getShaderParameter),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, getProgramParameter),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, texImage2D),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, texParameterf),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, texParameteri),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform1f),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform1fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform1i),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform1iv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform2f),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform2fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform2i),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform2iv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform3f),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform3fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform3i),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform3iv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform4f),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform4fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform4i),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniform4iv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniformMatrix2fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniformMatrix3fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, uniformMatrix4fv),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, useProgram),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, validateProgram),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, vertexAttribPointer),
		JS_BINDED_FUNC_FOR_DEF(WebGLRenderingContext, viewport),
		JS_FS_END
	};
	WebGLRenderingContext::js_parent = NULL;
	WebGLRenderingContext::js_proto = JS_InitClass(cx, global, NULL, &WebGLRenderingContext::js_class, WebGLRenderingContext::_js_constructor, 1, props, funcs, NULL, NULL);
}
