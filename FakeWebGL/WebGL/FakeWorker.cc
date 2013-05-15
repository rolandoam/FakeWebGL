//
//  FakeWorker.cc
//  FakeWebGL
//
//  Created by Rolando Abarca on 3/3/13.
//  Copyright (c) 2013 Rolando Abarca. All rights reserved.
//

#include <iostream>
#include "FakeWorker.hh"

using namespace std;

FakeWorker::FakeWorker(JSContext* cx) : onmessageCallback(cx, NULL), onerrorCallback(cx, NULL) {
}

FakeWorker::FakeWorker(JSContext* cx, string aPath) : onmessageCallback(cx, NULL), onerrorCallback(cx, NULL) {
}

JS_BINDED_CLASS_GLUE_IMPL(FakeWorker);

JS_BINDED_CONSTRUCTOR_IMPL(FakeWorker)
{
	FakeWorker* worker;
	jsval* argv = JS_ARGV(cx, vp);
	if (argc == 1 && argv[0].isString()) {
		JSString* str = argv[0].toString();
		JSStringWrapper wrapper(str);
		string tmp((const char*)wrapper);
		worker = new FakeWorker(cx, tmp);
	} else {
		worker = new FakeWorker(cx);
	}
	jsval out;
	JS_WRAP_OBJECT_IN_VAL(FakeWorker, worker, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeWorker, onmessage)
{
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeWorker, onmessage)
{
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeWorker, onerror)
{
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeWorker, onerror)
{
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeWorker, postMessage) {
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeWorker, terminate) {
	return JS_TRUE;
}

void FakeWorker::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	FakeWorker::js_class = {
		"Worker", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_ACCESSOR(FakeWorker, onmessage),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeWorker, onerror),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeWorker, postMessage),
		JS_BINDED_FUNC_FOR_DEF(FakeWorker, terminate),
		JS_FS_END
	};
	FakeWorker::js_parent = NULL;
	FakeWorker::js_proto = JS_InitClass(cx, global, NULL, &FakeWorker::js_class, FakeWorker::_js_constructor, 1, props, funcs, NULL, NULL);
}
