//
//  XMLHTTPRequest.cpp
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


#include <regex>
#include <algorithm>
#include <vector>
#include "jsfriendapi.h"
#include "XMLHTTPRequest.h"

using namespace std;

#pragma mark - FakeXMLHTTPRequest

void* bgReadFile(void* arg) {
	FakeXMLHTTPRequest* req = (FakeXMLHTTPRequest*)arg;
	std::string path = getFullPathFromRelativePath(req->url.c_str());
	if (path.empty()) {
		// file not found
		req->status = 404;
	} else {
		shared_ptr<char> tmp = readFileInMemory(path.c_str(), req->dataSize);
		req->data.flush();
		req->data << tmp.get();
		if (req->dataSize > 0) {
			req->status = 200;
		} else {
			printf("Error trying to read '%s'\n", path.c_str());
			req->status = 404; // just issue any error
		}
	}
	req->readyState = 4;
	if (!req->onreadystateCallback.isNullOrUndefined()) {
		if (req->isAsync) {
			addDeferredCallback(NULL, req->onreadystateCallback, 0, NULL);
			// just terminate this thread
			pthread_cancel(pthread_self());
		} else {
			JSContext* cx = getGlobalContext();
			JS_IsExceptionPending(cx) && JS_ReportPendingException(cx);
			jsval out;
			JS_CallFunctionValue(cx, NULL, req->onreadystateCallback, 0, NULL, &out);
		}
	}
	return NULL;
}

size_t FakeXMLHTTPRequest::gotHeader(void* ptr, size_t size, size_t nmemb, void *userdata) {
	FakeXMLHTTPRequest* req = (FakeXMLHTTPRequest*)userdata;
	string header((const char*)ptr, size * nmemb);
	req->_gotHeader(header);
	return size * nmemb;
}

size_t FakeXMLHTTPRequest::gotData(char* ptr, size_t size, size_t nmemb, void *userdata) {
	FakeXMLHTTPRequest* req = (FakeXMLHTTPRequest*)userdata;
	size_t sz = size * nmemb;
	req->_gotData(ptr, sz);
	return sz;
}

void FakeXMLHTTPRequest::_gotData(char* ptr, size_t len) {
	data.write(ptr, len);
	dataRead += len;
	if (dataRead >= dataLength) {
		readyState = 4;
	}
}

void FakeXMLHTTPRequest::_gotHeader(string header) {
	regex re("([\\w-]+):\\s+(.+)\r\n"),
		statusRe("HTTP/(1\\.1|1\\.0) (\\d{3}) (.+)\r\n");
	smatch md;
	if (regex_match(header, md, re)) {
		string h = md[1],
			v = md[2];
		std::transform(h.begin(), h.end(), h.begin(), ::tolower);
		if (h == "content-type") {
			if (v.compare(0, 16, "application/json") == 0) {
				responseType = kRequestResponseTypeJSON;
			}
		} else if (h == "content-length") {
			dataLength = atol(v.c_str());
		}
	} else if (regex_match(header, md, statusRe)) {
		string st = md[2];
		status = atoi(st.c_str());
	}
}

FakeXMLHTTPRequest::FakeXMLHTTPRequest() : onreadystateCallback(JSVAL_NULL), isNetwork(false) {
	static bool __curlInit = false;
	if (__curlInit) {
		__curlInit = true;
		curl_global_init(CURL_GLOBAL_ALL);
	}
	curlHandle = curl_easy_init();
	curl_easy_setopt(curlHandle, CURLOPT_WRITEFUNCTION, FakeXMLHTTPRequest::gotData);
	curl_easy_setopt(curlHandle, CURLOPT_WRITEDATA, this);
	curl_easy_setopt(curlHandle, CURLOPT_HEADERFUNCTION, FakeXMLHTTPRequest::gotHeader);
	curl_easy_setopt(curlHandle, CURLOPT_WRITEHEADER, this);
	dataRead = dataLength = 0;
}

FakeXMLHTTPRequest::~FakeXMLHTTPRequest() {
	if (curlHandle) {
		curl_easy_cleanup(curlHandle);
	}
	if (!onreadystateCallback.isNull()) {
		JS_RemoveValueRoot(getGlobalContext(), &onreadystateCallback);
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
	vp.set(onreadystateCallback);
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeXMLHTTPRequest, onreadystatechange)
{
	if (!onreadystateCallback.isNull()) {
		JS_RemoveValueRoot(cx, &onreadystateCallback);
	}
	onreadystateCallback = vp.get();
	JS_AddValueRoot(cx, &onreadystateCallback);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, responseType)
{
	JSString* str = JS_NewStringCopyN(cx, "", 0);
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeXMLHTTPRequest, responseType)
{
	jsval type = vp.get();
	if (type.isString()) {
		JSString* str = type.toString();
		JSBool equal;
		JS_StringEqualsAscii(cx, str, "text", &equal);
		if (equal) {
			responseType = kRequestResponseTypeString;
			return JS_TRUE;
		}
		JS_StringEqualsAscii(cx, str, "arraybuffer", &equal);
		if (equal) {
			responseType = kRequestResponseTypeArrayBuffer;
			return JS_TRUE;
		}
		JS_StringEqualsAscii(cx, str, "json", &equal);
		if (equal) {
			responseType = kRequestResponseTypeJSON;
			return JS_TRUE;
		}
		// ignore the rest of the response types for now
		return JS_TRUE;
	}
	JS_ReportError(cx, "Invalid response type");
	return JS_FALSE;
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
	JSString* str = JS_NewStringCopyN(cx, data.str().c_str(), dataSize);
	if (str) {
		vp.set(STRING_TO_JSVAL(str));
		return JS_TRUE;
	} else {
		JS_ReportError(cx, "Error trying to create JSString from data");
		return JS_FALSE;
	}
}

JS_BINDED_PROP_GET_IMPL(FakeXMLHTTPRequest, response)
{
	if (responseType == kRequestResponseTypeJSON) {
		std::string tmpstr = data.str();
		size_t outLen;
		std::shared_ptr<char> buff = convertToUTF16((char*)tmpstr.c_str(), outLen);
		jsval outval;
		if (JS_ParseJSON(cx, (const jschar*)buff.get(), outLen / sizeof(jschar), &outval)) {
			vp.set(outval);
		} else {
			JS_ReportPendingException(cx);
			vp.set(JSVAL_NULL);
		}
		return JS_TRUE;
	} else if (responseType == kRequestResponseTypeArrayBuffer) {
		JSObject* tmp = JS_NewArrayBuffer(cx, dataSize);
		uint8_t* tmpData = JS_GetArrayBufferData(tmp);
		data.read((char*)tmpData, dataSize);
		jsval outVal = OBJECT_TO_JSVAL(tmp);
		vp.set(outVal);
		return JS_TRUE;
	}
	// by default, return text
	return _js_get_responseText(cx, id, vp);
}

JS_BINDED_FUNC_IMPL(FakeXMLHTTPRequest, overrideMimeType)
{
	jsval* argv = JS_ARGV(cx, vp);
	if (argc == 1 && argv[0].isString()) {
		JSStringWrapper w1(argv[0]);
		std::string mimeType = "Content-type: ";
		mimeType += (const char*)w1;
		struct curl_slist *slist = NULL;
		slist = curl_slist_append(slist, mimeType.c_str());
		curl_easy_setopt(curlHandle, CURLOPT_HTTPHEADER, slist);
	}
	return JS_TRUE;
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
		JSStringWrapper w1(jsMethod);
		JSStringWrapper w2(jsURL);
		method = w1;
		urlstr = w2;
		
		url = urlstr;
		readyState = 1;
		isAsync = async;
		std::string methodstr(method);

		if (url.length() > 5 && url.compare(url.length() - 5, 5, ".json") == 0) {
			responseType = kRequestResponseTypeJSON;
		}
		if ((url.length() > 7 && url.compare(0, 7, "http://") == 0) ||
			(url.length() > 8 && url.compare(0, 8, "https://") == 0))
		{
			curl_easy_setopt(curlHandle, CURLOPT_URL, url.c_str());
			if (methodstr.compare("POST") == 0 || methodstr.compare("post") == 0) {
				curl_easy_setopt(curlHandle, CURLOPT_POST, 1);
			}
			isNetwork = true;
		}
		return JS_TRUE;
	}
	JS_ReportError(cx, "invalid call: %s", __FUNCTION__);
	return JS_FALSE;
}

JS_BINDED_FUNC_IMPL(FakeXMLHTTPRequest, send)
{
	if (!isNetwork) {
		if (isAsync) {
			pthread_t bgThread;
			pthread_create(&bgThread, NULL, bgReadFile, this);
			pthread_detach(bgThread);
		} else {
			bgReadFile(this);
		}
	} else {
		if (argc == 1) {
			jsval data = JS_ARGV(cx, vp)[0];
			if (data.isString()) {
				JSStringWrapper wrapper(data);
				curl_easy_setopt(curlHandle, CURLOPT_COPYPOSTFIELDS, (const char*)wrapper);
			} else {
				// for now we just ignore objects, but we should stringify them
			}
		}
		curl_easy_perform(curlHandle);
		readyState = 4;
		if (!onreadystateCallback.isNullOrUndefined()) {
			JS_IsExceptionPending(cx) && JS_ReportPendingException(cx);
			jsval out;
			JS_CallFunctionValue(cx, NULL, onreadystateCallback, 0, NULL, &out);
		}
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
		JS_BINDED_PROP_DEF_ACCESSOR(FakeXMLHTTPRequest, responseType),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, readyState),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, status),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, responseText),
		JS_BINDED_PROP_DEF_GETTER(FakeXMLHTTPRequest, response),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeXMLHTTPRequest, overrideMimeType),
		JS_BINDED_FUNC_FOR_DEF(FakeXMLHTTPRequest, open),
		JS_BINDED_FUNC_FOR_DEF(FakeXMLHTTPRequest, send),
		JS_FS_END
	};
	FakeXMLHTTPRequest::js_parent = NULL;
	FakeXMLHTTPRequest::js_proto = JS_InitClass(cx, global, NULL, &FakeXMLHTTPRequest::js_class, FakeXMLHTTPRequest::_js_constructor, 0, props, funcs, NULL, NULL);
}
