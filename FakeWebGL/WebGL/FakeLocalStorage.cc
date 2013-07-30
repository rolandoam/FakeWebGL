//
//  FakeLocalStorage.cpp
//  FakeWebGL
//
//  Created by Rolando Abarca on 5/11/13.
//  Copyright (c) 2013 Rolando Abarca. All rights reserved.
//

#include "FakeLocalStorage.hh"

FakeLocalStorage::FakeLocalStorage(JSContext* cx) {
}

JS_BINDED_CLASS_GLUE_IMPL(FakeLocalStorage);

JS_BINDED_CONSTRUCTOR_IMPL(FakeLocalStorage)
{
	FakeLocalStorage* storage = new FakeLocalStorage(cx);

	jsval out;
	JS_WRAP_OBJECT_IN_VAL(FakeLocalStorage, storage, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JSBool getProperty(JSContext *cx, JSHandleObject obj, JSHandleId id, JSMutableHandleValue vp) {
	jsval outval;
	if (JS_IdToValue(cx, id, &outval)) {
		JSStringWrapper wrapper(outval);
		jsval val = localStorageGet((const char*)wrapper);
		vp.set(val);
	} else {
		vp.set(JSVAL_NULL);
	}
	return JS_TRUE;
}

JSBool setProperty(JSContext *cx, JSHandleObject obj, JSHandleId id, JSBool strict, JSMutableHandleValue vp) {
	jsval valkey;
	if (JS_IdToValue(cx, id, &valkey)) {
		JSStringWrapper wrapper(valkey);
		localStorageSet((const char*)wrapper, vp);
	}
	return JS_TRUE;
}


void FakeLocalStorage::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	FakeLocalStorage::js_class = {
		"FakeLocalStorage", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, getProperty, setProperty,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	FakeLocalStorage::js_parent = NULL;
	FakeLocalStorage::js_proto = JS_InitClass(cx, global, NULL, &FakeLocalStorage::js_class, FakeLocalStorage::_js_constructor, 1, NULL, NULL, NULL, NULL);
}
