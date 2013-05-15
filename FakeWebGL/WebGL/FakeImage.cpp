//
//  FakeImage.cpp
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

#include "lodepng.h"
#include "FakeImage.h"

#pragma mark - FakeImage

FakeImage::FakeImage() :
	onloadCallback(JSVAL_NULL),
	onerrorCallback(JSVAL_NULL)
{
	src = "invalid";
	flipped = false;
}

unsigned char* FakeImage::getBytes()
{
	return &bytes[0];
}

// just flip the rows in the raw buffer
void FakeImage::flipY()
{
	if (!flipped) {
		flipped = true;
	} else {
		return;
	}
	unsigned char* buff = &bytes[0];
	int lastRow = this->height - 1,
	rowWidth = this->width * 4; // this "4" depends on the color space of the image - we're assuming RGBA
	unsigned char tmp[rowWidth];
	for (int j=0; j < lastRow; j++) {
		int curRow = j * rowWidth,
		replRow = lastRow * rowWidth;
		// copy current row in tmp
		memcpy(tmp, buff + curRow, rowWidth);
		// copy last row in current row
		memcpy(buff + curRow, buff + replRow, rowWidth);
		// copy back current row (tmp) in last row
		memcpy(buff + replRow, tmp, rowWidth);
		lastRow--;
	}
}

JS_BINDED_CLASS_GLUE_IMPL(FakeImage)

JS_BINDED_CONSTRUCTOR_IMPL(FakeImage)
{
	FakeImage* image = new FakeImage();
	jsval out;
	JS_WRAP_OBJECT_IN_VAL(FakeImage, image, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeImage, width)
{
	vp.set(INT_TO_JSVAL(width));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeImage, height)
{
	vp.set(INT_TO_JSVAL(height));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeImage, src)
{
	JSString* str = JS_NewStringCopyZ(cx, src.c_str());
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeImage, src)
{
	JSString* jsstr = JS_ValueToString(cx, vp.get());
	JSStringWrapper wrapper(jsstr);
	// copy the source
	if (strlen(wrapper) > 0) {
		src = (const char *)wrapper;
		std::string ext = src.substr(src.find_last_of(".") + 1);
		load(ext);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeImage, onload)
{
	vp.set(onloadCallback);
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeImage, onload)
{
	jsval callback = vp.get();
	if (!callback.isNull()) {
		if (!onloadCallback.isNull()) {
			JS_RemoveValueRoot(cx, &onloadCallback);
		}
		onloadCallback = callback;
		JS_AddValueRoot(cx, &onloadCallback);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeImage, onerror)
{
	vp.set(onerrorCallback);
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeImage, onerror)
{
	jsval callback = vp.get();
	if (callback != JSVAL_NULL && callback.isObject()) {
		if (!onerrorCallback.isNull()) {
			JS_RemoveValueRoot(cx, &onerrorCallback);
		}
		onerrorCallback = callback;
		JS_AddValueRoot(cx, &onerrorCallback);
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeImage, addEventListener) {
	if (argc >=2) {
		jsval* argv = JS_ARGV(cx, vp);
		JSStringWrapper jsstr(argv[0]);
		std::string str((const char*)jsstr);
		if (str.compare("load") == 0 && !argv[1].isNull()) {
			if (!onloadCallback.isNull()) {
				JS_RemoveValueRoot(cx, &onloadCallback);
			}
			onloadCallback = argv[1];
			JS_AddValueRoot(cx, &onloadCallback);
		} else if (str.compare("error") == 0 && !argv[1].isNull()) {
			if (!onerrorCallback.isNull()) {
				JS_RemoveValueRoot(cx, &onerrorCallback);
			}
			onerrorCallback = argv[1];
			JS_AddValueRoot(cx, &onerrorCallback);
		}
	}
	return JS_TRUE;
}

void FakeImage::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	FakeImage::js_class = {
		"FakeImage", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_GETTER(FakeImage, width),
		JS_BINDED_PROP_DEF_GETTER(FakeImage, height),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeImage, src),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeImage, onload),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeImage, onerror),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeImage, addEventListener),
		JS_FS_END
	};
	FakeImage::js_parent = NULL;
	FakeImage::js_proto = JS_InitClass(cx, global, NULL, &FakeImage::js_class, FakeImage::_js_constructor, 1, props, funcs, NULL, NULL);
}

void FakeImage::load(std::string type)
{
	if (type.compare("png") == 0) {
		loadPNG();
	} else if (type.size() > 0) {
		fprintf(stderr, "Image type not yet implemented: %s", type.c_str());
	} else {
		fprintf(stderr, "Invalid file type");
	}
}

void FakeImage::loadPNG()
{
	std::string fullPath = getFullPathFromRelativePath(src.c_str());
	if (fullPath.empty()) {
		fprintf(stderr, "PNG: File not found: %s\n", src.c_str());
		if (!onerrorCallback.isNull()) {
			jsval out;
			JSContext* cx = getGlobalContext();
			// create error: object with a single property
			JSObject* err = JS_NewObject(cx, NULL, NULL, NULL);
			JSString* str = JS_NewStringCopyZ(cx, "error");
			jsval strVal = STRING_TO_JSVAL(str);
			JS_SetProperty(cx, err, "type", &strVal);
			jsval errVal = OBJECT_TO_JSVAL(err);
			// just execute the callback
			JS_CallFunctionValue(cx, NULL, onerrorCallback, 1, &errVal, &out);
		}
	} else {
		unsigned error = lodepng::decode(bytes, width, height, fullPath);
		if (error) {
			printf("PNG: error %u decoding png: %s\n", error, lodepng_error_text(error));
			return;
		}
		if (!onloadCallback.isNull()) {
			jsval out;
			JS_CallFunctionValue(getGlobalContext(), NULL, onloadCallback, 0, NULL, &out);
		}
	}
}
