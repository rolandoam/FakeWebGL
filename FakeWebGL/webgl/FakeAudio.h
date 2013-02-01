//
//  FakeAudio.h
//  webglshim
//
//  Created by Rolando Abarca on 11/2/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//

#ifndef __webglshim__FakeAudio__
#define __webglshim__FakeAudio__

#include <OpenAL/al.h>
#include <OpenAL/alc.h>
#include "WebGLRenderingContext.h"

class OpenALBuffer
{
	ALuint bufferId;
	ALenum format;
	ALsizei size;
	ALsizei sampleRate;
	std::string src;
public:
	OpenALBuffer(std::string path);
	~OpenALBuffer();
	ALuint getBufferId();
	// this is platform dependent, for iOS is defined in FakeAudio.ios.mm
	void* getData();
};

class FakeAudio
{
	int readyState;
	std::string src;
	bool autoplay;
	bool loop;
	bool played;
	bool ended;
	bool preload;
	bool loaded;
	float volume;
	float duration;

	OpenALBuffer* buffer;
	ALuint sourceId;
public:
	FakeAudio();
	FakeAudio(std::string aPath);
	~FakeAudio();
	
	void loadAudio();
	
	JS_BINDED_CLASS_GLUE(FakeAudio);
	JS_BINDED_CONSTRUCTOR(FakeAudio);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, autoplay);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, loop);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, preload);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, muted);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, src);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, currentTime);
	JS_BINDED_PROP_ACCESSOR(FakeAudio, volume);
	JS_BINDED_PROP_GET(FakeAudio, played);
	JS_BINDED_PROP_GET(FakeAudio, ended);
	JS_BINDED_PROP_GET(FakeAudio, duration);
	JS_BINDED_PROP_GET(FakeAudio, currentSrc);
	JS_BINDED_PROP_GET(FakeAudio, readyState);
	
	JS_BINDED_FUNC(FakeAudio, canPlayType);
	JS_BINDED_FUNC(FakeAudio, load);
	JS_BINDED_FUNC(FakeAudio, play);
	JS_BINDED_FUNC(FakeAudio, pause);
};

#endif /* defined(__webglshim__FakeAudio__) */
