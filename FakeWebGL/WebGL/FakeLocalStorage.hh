//
//  FakeLocalStorage.h
//  FakeWebGL
//
//  Created by Rolando Abarca on 5/11/13.
//  Copyright (c) 2013 Rolando Abarca. All rights reserved.
//

#ifndef __FakeLocalStorage__
#define __FakeLocalStorage__

#include "glue.h"

class FakeLocalStorage : public JSBindedObject
{
public:
	FakeLocalStorage(JSContext* cx);
	~FakeLocalStorage();
	
	JS_BINDED_CLASS_GLUE(FakeLocalStorage);
	JS_BINDED_CONSTRUCTOR(FakeLocalStorage);
};

#endif /* defined(__FakeLocalStorage__) */
