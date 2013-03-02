//
//  FakeImage.h
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

#ifndef __FAKE_IMAGE_H__
#define __FAKE_IMAGE_H__

#include "jstypes.h"
#include "glue.h"

typedef enum {
	PNGImage,
	JPEGImage,
	PVRImage
} FakeImageType;

class FakeImage : public JSBindedObject
{
private:
	std::vector<unsigned char> bytes;
	std::string src;
	js::RootedObject onloadCallback;
	js::RootedObject onerrorCallback;
	bool flipped;
	void load(std::string type);
	void loadPNG();

public:
	unsigned int width;
	unsigned int height;

	FakeImage();
	unsigned char* getBytes();
	void flipY();
	JS_BINDED_CLASS_GLUE(FakeImage);
	JS_BINDED_CONSTRUCTOR(FakeImage);
	JS_BINDED_PROP_GET(FakeImage, width);
	JS_BINDED_PROP_GET(FakeImage, height);
	JS_BINDED_PROP_ACCESSOR(FakeImage, src);
	JS_BINDED_PROP_ACCESSOR(FakeImage, onload);
	JS_BINDED_PROP_ACCESSOR(FakeImage, onerror);

	JS_BINDED_FUNC(FakeImage, addEventListener);
};

#endif
