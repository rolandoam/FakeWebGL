//
//  XMLHTTPRequest.h
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

#ifndef __FAKE_XMLHTTPREQUEST_H__
#define __FAKE_XMLHTTPREQUEST_H__

#include "jstypes.h"
#include "glue.h"

enum FakeXMLHTTPRequestResponseType {
	kRequestResponseTypeString,
	kRequestResponseTypeArrayBuffer,
	kRequestResponseTypeBlob,
	kRequestResponseTypeDocument,
	kRequestResponseTypeJSON
};

class FakeXMLHTTPRequest : public JSBindedObject
{
	std::string url;
	std::string type;
	unsigned char* data;
	size_t dataSize;
	js::RootedObject onreadystateCallback;
	int readyState;
	int status;
	int responseType;
	bool isAsync;
public:
	FakeXMLHTTPRequest() : onreadystateCallback(getGlobalContext(), NULL) {}
	~FakeXMLHTTPRequest();
	JS_BINDED_CLASS_GLUE(FakeXMLHTTPRequest);
	JS_BINDED_CONSTRUCTOR(FakeXMLHTTPRequest);
	JS_BINDED_PROP_ACCESSOR(FakeXMLHTTPRequest, onreadystatechange);
	JS_BINDED_PROP_ACCESSOR(FakeXMLHTTPRequest, responseType);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, readyState);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, status);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, responseText);
	JS_BINDED_PROP_GET(FakeXMLHTTPRequest, response);
	JS_BINDED_FUNC(FakeXMLHTTPRequest, open);
	JS_BINDED_FUNC(FakeXMLHTTPRequest, send);
};

#endif
