//
//  WebGLRenderingContext.h
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

#ifndef __WEBGL_RENDERING_CONTEXT__
#define __WEBGL_RENDERING_CONTEXT__

#include <OpenGLES/ES2/gl.h>
#include <string>
#include <vector>
#include "jstypes.h"
#include "glue.h"

class JSObject;

#define WebGLProgram GLuint
#define WebGLShader GLuint
#define WebGLBuffer GLuint
#define WebGLFramebuffer GLuint
#define WebGLRenderbuffer GLuint
#define WebGLTexture GLuint
#define WebGLUniformLocation GLint

class WebGLRenderingContext;

class TestClass
{
	int x;
	int y;
public:
	TestClass(std::string something);
	void foo();

	JS_BINDED_CLASS_GLUE(TestClass);
	JS_BINDED_CONSTRUCTOR(TestClass);
	JS_BINDED_FUNC(TestClass, foo);
};

class ChesterCanvas
{
public:
	int width;
	int height;

	ChesterCanvas(int w, int h) : width(w), height(h) {};
	JS_BINDED_CLASS_GLUE(ChesterCanvas);
	JS_BINDED_CONSTRUCTOR(ChesterCanvas);
	JS_BINDED_PROP_GET(ChesterCanvas, width);
	JS_BINDED_PROP_GET(ChesterCanvas, height);
	JS_BINDED_FUNC(ChesterCanvas, getContext);
};

class FakeXMLHTTPRequest
{
	std::string url;
	std::string type;
	unsigned char* data;
	size_t dataSize;
	JSObject* onreadystateCallback;
	int readyState;
	int status;
	bool isAsync;
public:
	~FakeXMLHTTPRequest();
	JS_BINDED_CLASS_GLUE(FakeXMLHTTPRequest);
	JS_BINDED_CONSTRUCTOR(FakeXMLHTTPRequest);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, onreadystatechange);
	JS_BINDED_PROP_SET(FakeXMLHTTPRequest, onreadystatechange);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, readyState);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, status);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, responseText);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, response);
	JS_BINDED_FUNC(FakeXMLHTTPRequest, open);
	JS_BINDED_FUNC(FakeXMLHTTPRequest, send);
};

class PNGImage
{
	std::vector<unsigned char> bytes;
	std::string src;
	JSObject* onloadCallback;

	void loadPNG();

public:
	unsigned int width;
	unsigned int height;

	PNGImage();
    ~PNGImage();
	unsigned char* getBytes();
	JS_BINDED_CLASS_GLUE(PNGImage);
	JS_BINDED_CONSTRUCTOR(PNGImage);
	JS_BINDED_PROP_GET(PNGImage, width);
	JS_BINDED_PROP_GET(PNGImage, height);
	JS_BINDED_PROP_GET(PNGImage, src);
	JS_BINDED_PROP_SET(PNGImage, src);
	JS_BINDED_PROP_GET(PNGImage, onload);
	JS_BINDED_PROP_SET(PNGImage, onload);
};

class WebGLRenderingContext
{
public:
	GLsizei drawingBufferWidth;
	GLsizei drawingBufferHeight;
	ChesterCanvas* canvas;

	WebGLRenderingContext(ChesterCanvas* canvas)
	{
		this->canvas = canvas;
		this->drawingBufferWidth = canvas->width;
		this->drawingBufferHeight = canvas->height;
	};

	JS_BINDED_CLASS_GLUE(WebGLRenderingContext);
	JS_BINDED_CONSTRUCTOR(WebGLRenderingContext);

	JS_BINDED_FUNC(WebGLRenderingContext, activeTexture);
	JS_BINDED_FUNC(WebGLRenderingContext, attachShader);
	JS_BINDED_FUNC(WebGLRenderingContext, bindAttribLocation);
	JS_BINDED_FUNC(WebGLRenderingContext, bindBuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, bindFramebuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, bindRenderbuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, bindTexture);
	void blendColor(GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha);
	JS_BINDED_FUNC(WebGLRenderingContext, blendEquation);
	JS_BINDED_FUNC(WebGLRenderingContext, blendEquationSeparate);
	JS_BINDED_FUNC(WebGLRenderingContext, blendFunc);
	JS_BINDED_FUNC(WebGLRenderingContext, blendFuncSeparate);

	// data should be an ArrayBuffer
	JS_BINDED_FUNC(WebGLRenderingContext, bufferData);
	JS_BINDED_FUNC(WebGLRenderingContext, bufferSubData);

	GLenum checkFramebufferStatus(GLenum target);
	JS_BINDED_FUNC(WebGLRenderingContext, clear);
	JS_BINDED_FUNC(WebGLRenderingContext, clearColor);
	JS_BINDED_FUNC(WebGLRenderingContext, clearDepth);
	JS_BINDED_FUNC(WebGLRenderingContext, clearStencil);
	void colorMask(GLboolean red, GLboolean green, GLboolean blue, GLboolean alpha);
	JS_BINDED_FUNC(WebGLRenderingContext, compileShader);

	JS_BINDED_FUNC(WebGLRenderingContext, createBuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, createFramebuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, createProgram);
	JS_BINDED_FUNC(WebGLRenderingContext, createRenderbuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, createShader);
	JS_BINDED_FUNC(WebGLRenderingContext, createTexture);

	JS_BINDED_FUNC(WebGLRenderingContext, cullFace);

	void deleteBuffer(WebGLBuffer buffer);
	void deleteFramebuffer(WebGLFramebuffer framebuffer);
	void deleteProgram(WebGLProgram program);
	void deleteRenderbuffer(WebGLRenderbuffer renderbuffer);
	JS_BINDED_FUNC(WebGLRenderingContext, deleteShader);
	void deleteTexture(WebGLTexture texture);

	JS_BINDED_FUNC(WebGLRenderingContext, depthFunc);
	JS_BINDED_FUNC(WebGLRenderingContext, depthMask);
	void depthRange(GLclampf zNear, GLclampf zFar);
	void detachShader(WebGLProgram program, WebGLShader shader);
	JS_BINDED_FUNC(WebGLRenderingContext, disable);
	void disable(GLenum cap);
	void disableVertexAttribArray(GLuint index);
	JS_BINDED_FUNC(WebGLRenderingContext, drawArrays);
	JS_BINDED_FUNC(WebGLRenderingContext, drawElements);

	JS_BINDED_FUNC(WebGLRenderingContext, enable);
	JS_BINDED_FUNC(WebGLRenderingContext, enableVertexAttribArray);
	void finish();
	void flush();
	void framebufferRenderbuffer(GLenum target, GLenum attachment,
								 GLenum renderbuffertarget,
								 WebGLRenderbuffer renderbuffer);
	void framebufferTexture2D(GLenum target, GLenum attachment, GLenum textarget,
							  WebGLTexture texture, GLint level);
	JS_BINDED_FUNC(WebGLRenderingContext, frontFace);

	void generateMipmap(GLenum target);

	JS_BINDED_FUNC(WebGLRenderingContext, getAttribLocation);

	JS_BINDED_FUNC(WebGLRenderingContext, getParameter);
	GLint getBufferParameter(GLenum target, GLenum pname);

	JS_BINDED_FUNC(WebGLRenderingContext, getError);
	JS_BINDED_FUNC(WebGLRenderingContext, getExtension);
	JS_BINDED_FUNC(WebGLRenderingContext, getShaderInfoLog);
	JS_BINDED_FUNC(WebGLRenderingContext, getUniformLocation);

	GLint getVertexAttrib(GLuint index, GLenum pname);

	GLsizeiptr getVertexAttribOffset(GLuint index, GLenum pname);

	JS_BINDED_FUNC(WebGLRenderingContext, lineWidth);
	JS_BINDED_FUNC(WebGLRenderingContext, linkProgram);
	JS_BINDED_FUNC(WebGLRenderingContext, pixelStorei);
	void polygonOffset(GLfloat factor, GLfloat units);

	void readPixels(GLint x, GLint y, GLsizei width, GLsizei height,
					GLenum format, GLenum type, JSObject* pixels);

	JS_BINDED_FUNC(WebGLRenderingContext, shaderSource);
	JS_BINDED_FUNC(WebGLRenderingContext, getShaderParameter);
	JS_BINDED_FUNC(WebGLRenderingContext, getProgramParameter);

	JS_BINDED_FUNC(WebGLRenderingContext, texImage2D);

	JS_BINDED_FUNC(WebGLRenderingContext, texParameterf);
	JS_BINDED_FUNC(WebGLRenderingContext, texParameteri);

	JS_BINDED_FUNC(WebGLRenderingContext, uniform1f);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform1fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform1i);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform1iv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform2f);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform2fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform2i);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform2iv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform3f);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform3fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform3i);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform3iv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform4f);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform4fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform4i);
	JS_BINDED_FUNC(WebGLRenderingContext, uniform4iv);

	JS_BINDED_FUNC(WebGLRenderingContext, uniformMatrix2fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniformMatrix3fv);
	JS_BINDED_FUNC(WebGLRenderingContext, uniformMatrix4fv);

	JS_BINDED_FUNC(WebGLRenderingContext, useProgram);
	JS_BINDED_FUNC(WebGLRenderingContext, validateProgram);

	void vertexAttrib1f(GLuint indx, GLfloat x);
	void vertexAttrib1fv(GLuint indx, JSObject* values);
	void vertexAttrib2f(GLuint indx, GLfloat x, GLfloat y);
	void vertexAttrib2fv(GLuint indx, JSObject* values);
	void vertexAttrib3f(GLuint indx, GLfloat x, GLfloat y, GLfloat z);
	void vertexAttrib3fv(GLuint indx, JSObject* values);
	void vertexAttrib4f(GLuint indx, GLfloat x, GLfloat y, GLfloat z, GLfloat w);
	void vertexAttrib4fv(GLuint indx, JSObject* values);
	JS_BINDED_FUNC(WebGLRenderingContext, vertexAttribPointer);

	JS_BINDED_FUNC(WebGLRenderingContext, viewport);
};

#endif
