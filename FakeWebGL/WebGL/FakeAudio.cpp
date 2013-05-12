//
//  FakeAudio.cpp
//  webglshim
//
//  Created by Rolando Abarca on 11/2/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//

#include <map>
#include <string>
#include <pthread.h>
#include <unistd.h>
#include "FakeAudio.h"

using namespace std;

static bool bgThreadAlive;
static void* _checkBufferStatus(void* args);

class AudioManager
{
	ALCdevice* device;
	ALCcontext* context;
	map<string, OpenALBuffer*> buffers;
	pthread_t bgThread;

public:
	AudioManager() {
		device = alcOpenDevice(0);
		context = alcCreateContext(device, NULL);
		alcMakeContextCurrent(context);
		bgThreadAlive = true;
		/*
		int err = pthread_create(&bgThread, NULL, _checkBufferStatus, this);
		if (err) {
			fprintf(stderr, "Error creating background thread, there will be no notifications on audio ended (%d)\n", err);
		}
		 */
	}

	~AudioManager() {
		alcDestroyContext(context);
		alcCloseDevice(device);
		bgThreadAlive = false;
		pthread_join(bgThread, NULL);
	}

	OpenALBuffer* getBuffer(string path)
	{
		if (buffers.find(path) != buffers.end())
			return buffers[path];
		return NULL;
	}

	void setBuffer(OpenALBuffer* buffer, string path)
	{
		buffers[path] = buffer;
	}
	
	void checkBuffers() {
		map<string, OpenALBuffer*>::iterator it = buffers.begin();
		for (; it != buffers.end(); it++) {
			ALint value;
			OpenALBuffer* b = it->second;
			alGetSourcei(b->getBufferId(), AL_SOURCE_STATE, &value);
			if (value == AL_STOPPED) {
				b->notifyEvent(AudioEnded);
			}
		}
	}
};

// background thread that will check the status of the buffers
static void* _checkBufferStatus(void* args) {
	AudioManager* manager = (AudioManager*)args;
	while (bgThreadAlive) {
		manager->checkBuffers();
		usleep(32); // two frames (aprox, at 16fps)
	}
	return NULL;
}

static AudioManager manager;

#pragma mark - OpenALCallback

OpenALCallback::OpenALCallback(JSContext* cx, js::Value func, JSObject* thisObj) : jsfunction(cx, func), jsthis(cx, thisObj)
{
}

void OpenALCallback::call(JSContext* cx) {
	JS::Value rval;
	JS_CallFunctionValue(cx, jsthis.get(), jsfunction.get(), 0, NULL, &rval);
}

#pragma mark - OpenALBuffer

OpenALBuffer::OpenALBuffer(string path)
{
	src = path;
	void* data = getData();
	if (data) {
		alGenBuffers(1, &bufferId);
		alBufferData(bufferId, format, data, size, sampleRate);
		free(data);
	}
}

OpenALBuffer::~OpenALBuffer()
{
	if (bufferId) {
		alDeleteBuffers(1, &bufferId);
	}
}

ALuint OpenALBuffer::getBufferId()
{
	return bufferId;
}

void OpenALBuffer::registerCallback(AudioCallbackType eventType, std::shared_ptr<OpenALCallback> callback) {
//	if (eventType == AudioEnded) {
//		audioEndedCallbacks.push_back(callback);
//	}
}

void OpenALBuffer::deregisterCallack(AudioCallbackType eventType, std::shared_ptr<OpenALCallback> callback) {
//	if (eventType == AudioEnded) {
//		vector<shared_ptr<OpenALCallback>>::iterator pos = std::find(audioEndedCallbacks.begin(), audioEndedCallbacks.end(), callback);
//		if (pos != audioEndedCallbacks.end()) {
//			audioEndedCallbacks.erase(pos);
//		}
//	}
}

void OpenALBuffer::notifyEvent(AudioCallbackType eventType) {
	if (eventType == AudioEnded) {
		vector<shared_ptr<OpenALCallback>>::iterator it = audioEndedCallbacks.begin();
		JSContext* cx = getGlobalContext();
		for (; it != audioEndedCallbacks.end(); it++) {
			shared_ptr<OpenALCallback> callback = *it;
			callback->call(cx);
		}
	}
}

#pragma mark - FakeAudio

FakeAudio::FakeAudio() : readyState(0), loaded(false), volume(1.0f), buffer(NULL), sourceId(0), linkedSourceId(0), preload(false), played(false), ended(true), autoplay(false)
{
}

FakeAudio::FakeAudio(string aPath) : readyState(0), loaded(false), volume(1.0f), buffer(NULL), sourceId(0), linkedSourceId(0), preload(false), played(false), ended(true)
{
	src = aPath;
}

FakeAudio::~FakeAudio()
{
	if (buffer) {
		delete buffer;
	}
}

void genSource(ALuint sourceId, ALuint bufferId, bool looping)
{
	alSourcei(sourceId, AL_BUFFER, bufferId);
	alSourcei(sourceId, AL_PITCH, 1.0f);
	alSourcei(sourceId, AL_GAIN, 1.0f);
	if (looping)
		alSourcei(sourceId, AL_LOOPING, AL_TRUE);
}

void FakeAudio::loadAudio()
{
	buffer = manager.getBuffer(src);
	if (!buffer) {
		buffer = new OpenALBuffer(src);
		manager.setBuffer(buffer, src);
	}
	alGenSources(1, &sourceId);
	genSource(sourceId, buffer->getBufferId(), loop);
	loaded = true;
	if (autoplay)
		play(NULL, 0, NULL);
	updateDuration();
}

void FakeAudio::updateDuration()
{
	// get the duration
    ALint bufferID = buffer->getBufferId(),
	bufferSize, frequency, bitsPerSample, channels;
    alGetBufferi(bufferID, AL_SIZE, &bufferSize);
    alGetBufferi(bufferID, AL_FREQUENCY, &frequency);
    alGetBufferi(bufferID, AL_CHANNELS, &channels);
    alGetBufferi(bufferID, AL_BITS, &bitsPerSample);

    duration = ((float)bufferSize)/(frequency*channels*(bitsPerSample/8));
}

JS_BINDED_CLASS_GLUE_IMPL(FakeAudio);

JS_BINDED_CONSTRUCTOR_IMPL(FakeAudio)
{
	FakeAudio* audio;
	jsval* argv = JS_ARGV(cx, vp);
	if (argc == 1 && argv[0].isString()) {
		JSString* str = argv[0].toString();
		JSStringWrapper wrapper(str);
		string tmp = (const char *)wrapper;
		audio = new FakeAudio(tmp);
	} else {
		audio = new FakeAudio();
	}
	jsval out;
	JS_WRAP_OBJECT_IN_VAL(FakeAudio, audio, out);
	JS_SET_RVAL(cx, vp, out);
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, autoplay)
{
	vp.set(BOOLEAN_TO_JSVAL(autoplay));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, autoplay)
{
	if (vp.isBoolean()) {
		autoplay = vp.get().toBoolean();
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, loop)
{
	vp.set(BOOLEAN_TO_JSVAL(loop));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, loop)
{
	if (vp.isBoolean()) {
		loop = vp.get().toBoolean();
		alSourcei(sourceId, AL_LOOPING, loop ? AL_TRUE : AL_FALSE);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, preload)
{
	JSString* str;
	if (preload) {
		str = JS_NewStringCopyZ(cx, "auto");
	} else {
		str = JS_NewStringCopyZ(cx, "none");
	}
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, preload)
{
	if (vp.isString()) {
		JSString* str = vp.toString();
		JSStringWrapper wrapper(str);
		string tmp((const char*)wrapper);
		if (tmp == "none") {
			preload = false;
		} else if (tmp == "auto" || tmp == "metadata") {
			preload = true;
		}
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, muted)
{
	float vol;
	alGetSourcef(sourceId, AL_GAIN, &vol);
	vp.set(BOOLEAN_TO_JSVAL(vol > 0));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, muted)
{
	if (vp.isBoolean()) {
		JSBool m = vp.toBoolean();
		if (m == JS_TRUE) {
			alSourcef(sourceId, AL_GAIN, 0);
		} else {
			alSourcef(sourceId, AL_GAIN, volume);
		}
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, src)
{
	JSString* str = JS_NewStringCopyZ(cx, src.c_str());
	vp.set(STRING_TO_JSVAL(str));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, src)
{
	if (vp.isString()) {
		JSString* str = vp.toString();
		JSStringWrapper wrapper(str);
		src = (const char *)wrapper;
		if (preload) {
			loadAudio();
		}
		return JS_TRUE;
	}
	JS_ReportError(cx, "Invalid source for Audio");
	return JS_FALSE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, currentTime)
{
	float time;
	alGetSourcef(sourceId, AL_SEC_OFFSET, &time);
	vp.set(DOUBLE_TO_JSVAL(time));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, currentTime)
{
	if (vp.isNumber()) {
		double time = vp.toNumber();
		alSourcef(sourceId, AL_SEC_OFFSET, time);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, volume)
{
	float vol;
	alGetSourcef(sourceId, AL_GAIN, &vol);
	vp.set(DOUBLE_TO_JSVAL(vol));
	return JS_TRUE;
}

JS_BINDED_PROP_SET_IMPL(FakeAudio, volume)
{
	if (vp.isNumber()) {
		volume = vp.toNumber();
		alSourcef(sourceId, AL_GAIN, volume);
	}
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, played)
{
	vp.set(BOOLEAN_TO_JSVAL(played));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, ended)
{
	float time;
	alGetSourcef(sourceId, AL_SEC_OFFSET, &time);
	vp.set(BOOLEAN_TO_JSVAL(time >= duration));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, duration)
{
	vp.set(DOUBLE_TO_JSVAL(duration));
	return JS_TRUE;
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, currentSrc)
{
	return _js_get_src(cx, id, vp);
}

JS_BINDED_PROP_GET_IMPL(FakeAudio, readyState)
{
	if (loaded) {
		vp.set(INT_TO_JSVAL(4));
	} else {
		vp.set(INT_TO_JSVAL(0));
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, canPlayType)
{
	jsval* argv = JS_ARGV(cx, vp);
	JSString* out;
	if (argc == 1 && argv[0].isString()) {
		JSString* str = argv[0].toString();
		JSStringWrapper wrapper(str);
		string tmp((const char*)wrapper);
		if (tmp == "audio/mpeg" || tmp == "audio/wav") {
			out = JS_NewStringCopyZ(cx, "maybe");
		} else {
			out = JS_NewStringCopyZ(cx, "");
		}
	} else {
		out = JS_NewStringCopyZ(cx, "");
	}
	JS_SET_RVAL(cx, vp, STRING_TO_JSVAL(out));
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, load)
{
	loadAudio();
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, play)
{
	if (!loaded) {
		loadAudio();
	}
	if (sourceId > 0) {
		alSourcePlay(sourceId);
		if (linkedSourceId > 0) {
			alSourcePlay(linkedSourceId);
		}
	} else {
		printf("audio not loaded: %s\n", src.c_str());
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, pause)
{
	alSourcePause(sourceId);
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, linkAndLoop)
{
	JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
	if (args.length() == 1) {
		JSObject* obj = args[0].toObjectOrNull();
		FakeAudio* audio = (FakeAudio*)JS_GetPrivate(obj);
		if (audio) {
			if (!loaded) {
				loadAudio();
			}
			if (!audio->loaded) {
				audio->loadAudio();
			}
			ALuint bids[2] = {
				buffer->getBufferId(),
				audio->buffer->getBufferId()
			};
			alSourceQueueBuffers(sourceId, 2, bids);
			linkedSourceId = audio->sourceId;
		}
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, addEventListener) {
	JS::CallArgs args = CallArgsFromVp(argc, vp);
	if (args.length() >=2) {
		JSStringWrapper wrapper(args[0]);
		string str((const char*)wrapper);
		if (str.compare("ended") == 0) {
			JS::Value jsthis = JS_THIS(cx, vp);
			shared_ptr<OpenALCallback> cb(new OpenALCallback(cx, args[1], jsthis.toObjectOrNull()));
			buffer->registerCallback(AudioEnded, cb);
		}
	}
	return JS_TRUE;
}

JS_BINDED_FUNC_IMPL(FakeAudio, removeEventListener) {
	JS::CallArgs args = CallArgsFromVp(argc, vp);
	if (args.length() >= 2) {
		// need to think this through
	}
	return JS_TRUE;
}

void FakeAudio::_js_register(JSContext* cx, JSObject* global)
{
	// create the class
	FakeAudio::js_class = {
		"FakeAudio", JSCLASS_HAS_PRIVATE,
		JS_PropertyStub, JS_PropertyStub, JS_PropertyStub, JS_StrictPropertyStub,
		JS_EnumerateStub, JS_ResolveStub, JS_ConvertStub, basic_object_finalize,
		JSCLASS_NO_OPTIONAL_MEMBERS
	};
	static JSPropertySpec props[] = {
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, autoplay),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, loop),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, preload),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, muted),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, src),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, currentTime),
		JS_BINDED_PROP_DEF_ACCESSOR(FakeAudio, volume),
		JS_BINDED_PROP_DEF_GETTER(FakeAudio, played),
		JS_BINDED_PROP_DEF_GETTER(FakeAudio, ended),
		JS_BINDED_PROP_DEF_GETTER(FakeAudio, duration),
		JS_BINDED_PROP_DEF_GETTER(FakeAudio, currentSrc),
		JS_BINDED_PROP_DEF_GETTER(FakeAudio, readyState),
		{0, 0, 0, 0, 0}
	};
	static JSFunctionSpec funcs[] = {
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, canPlayType),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, load),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, play),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, pause),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, linkAndLoop),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, addEventListener),
		JS_BINDED_FUNC_FOR_DEF(FakeAudio, removeEventListener),
		JS_FS_END
	};
	FakeAudio::js_parent = NULL;
	FakeAudio::js_proto = JS_InitClass(cx, global, NULL, &FakeAudio::js_class, FakeAudio::_js_constructor, 1, props, funcs, NULL, NULL);
}
