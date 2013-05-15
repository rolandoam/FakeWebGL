//
//  FakeWorker.h
//  FakeWebGL
//
//  Created by Rolando Abarca on 3/3/13.
//  Copyright (c) 2013 Rolando Abarca. All rights reserved.
//

#ifndef __FakeWebGL__FakeWorker__
#define __FakeWebGL__FakeWorker__

#include "glue.h"

class FakeWorker : public JSBindedObject
{
	js::RootedObject onmessageCallback;
	js::RootedObject onerrorCallback;
public:
	FakeWorker(JSContext* cx);
	FakeWorker(JSContext* cx, std::string aPath);
	~FakeWorker();

	JS_BINDED_CLASS_GLUE(FakeWorker);
	JS_BINDED_CONSTRUCTOR(FakeWorker);
	JS_BINDED_PROP_ACCESSOR(FakeWorker, onmessage);
	JS_BINDED_PROP_ACCESSOR(FakeWorker, onerror);

	JS_BINDED_FUNC(FakeAudio, postMessage);
	JS_BINDED_FUNC(FakeAudio, terminate);
};

#endif /* defined(__FakeWebGL__Worker__) */
