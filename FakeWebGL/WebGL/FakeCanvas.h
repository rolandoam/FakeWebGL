//
//  FakeCanvas.h
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

#ifndef __FAKE_CANVAS_H__
#define __FAKE_CANVAS_H__

#include <map>
#include "jstypes.h"
#include "glue.h"

class FakeCanvas : public JSBindedObject
{
	std::map<std::string,void*> listeners;
public:
	int width;
	int height;
	
	FakeCanvas(int w, int h) : width(w), height(h) {};
	~FakeCanvas();
	JS_BINDED_CLASS_GLUE(FakeCanvas);
	JS_BINDED_CONSTRUCTOR(FakeCanvas);
	JS_BINDED_PROP_GET(FakeCanvas, clientWidth);
	JS_BINDED_PROP_GET(FakeCanvas, clientHeight);
	JS_BINDED_PROP_ACCESSOR(FakeCanvas, width);
	JS_BINDED_PROP_ACCESSOR(FakeCanvas, height);
	JS_BINDED_FUNC(FakeCanvas, getContext);
	JS_BINDED_FUNC(FakeCanvas, getBoundingClientRect);
	JS_BINDED_FUNC(FakeCanvas, addEventListener);
};

#endif
