//
//  FakeAudio.ios.m
//  webglshim
//
//  Created by Rolando Abarca on 11/2/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//

#import "FakeAudio.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AudioToolbox/ExtendedAudioFile.h>

void* OpenALBuffer::getData()
{
	void * data = NULL;
	NSString* fullPath = [NSString stringWithUTF8String:getFullPathFromRelativePath(src.c_str())];
	NSURL* url = [NSURL fileURLWithPath:fullPath];

	// Open the file
	ExtAudioFileRef	file = NULL;
	OSStatus error = ExtAudioFileOpenURL((__bridge CFURLRef)url, &file);
	if (error) {
		NSLog(@"OpenALSource: ExtAudioFileOpenURL FAILED, Error = %ld", error);
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}

	// Get the audio data format
	AudioStreamBasicDescription inputFormat;
	UInt32 propertySize = sizeof(inputFormat);
	error = ExtAudioFileGetProperty(file, kExtAudioFileProperty_FileDataFormat, &propertySize, &inputFormat);
	if (error) {
		NSLog(@"OpenALSource: ExtAudioFileGetProperty(kExtAudioFileProperty_FileDataFormat) FAILED, Error = %ld", error);
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}
	if (inputFormat.mChannelsPerFrame > 2) {
		NSLog(@"OpenALSource: Unsupported Format, channel count is greater than stereo");
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}

	// Set the client format to 16 bit signed integer (native-endian) data
	// Maintain the channel count and sample rate of the original source format
	AudioStreamBasicDescription	outputFormat = {
		.mSampleRate = inputFormat.mSampleRate,
		.mChannelsPerFrame = inputFormat.mChannelsPerFrame,
		.mFormatID = kAudioFormatLinearPCM,
		.mBytesPerPacket = 2 * inputFormat.mChannelsPerFrame,
		.mFramesPerPacket = 1,
		.mBytesPerFrame = 2 * inputFormat.mChannelsPerFrame,
		.mBitsPerChannel = 16,
		.mFormatFlags = kAudioFormatFlagsNativeEndian | kAudioFormatFlagIsPacked | kAudioFormatFlagIsSignedInteger
	};

	// Set the desired client (output) data format
	error = ExtAudioFileSetProperty(file, kExtAudioFileProperty_ClientDataFormat, sizeof(outputFormat), &outputFormat);
	if (error) {
		NSLog(@"OpenALSource: ExtAudioFileSetProperty(kExtAudioFileProperty_ClientDataFormat) FAILED, Error = %ld", error);
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}

	// Get the total frame count
	SInt64 frameCount = 0;
	propertySize = sizeof(frameCount);
	error = ExtAudioFileGetProperty(file, kExtAudioFileProperty_FileLengthFrames, &propertySize, &frameCount);
	if (error) {
		NSLog(@"OpenALSource: ExtAudioFileGetProperty(kExtAudioFileProperty_FileLengthFrames) FAILED, Error = %ld", error);
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}

	// Read all the data into memory
	int dataSize = frameCount * outputFormat.mBytesPerFrame;
	data = malloc(dataSize);

	AudioBufferList	bufferList;
	bufferList.mNumberBuffers = 1;
	bufferList.mBuffers[0].mDataByteSize = dataSize;
	bufferList.mBuffers[0].mNumberChannels = outputFormat.mChannelsPerFrame;
	bufferList.mBuffers[0].mData = data;

	// Read the data into an AudioBufferList
	error = ExtAudioFileRead(file, (UInt32*)&frameCount, &bufferList);
	if (error == noErr) {
		// success
		size = (ALsizei)dataSize;
		format = (outputFormat.mChannelsPerFrame > 1) ? AL_FORMAT_STEREO16 : AL_FORMAT_MONO16;
		sampleRate = (ALsizei)outputFormat.mSampleRate;
	}
	else {
		// failure
		free(data);
		data = NULL;
		NSLog(@"OpenALSource: ExtAudioFileRead FAILED, Error = %ld", error);
		if (file)
			ExtAudioFileDispose(file);
		return data;
	}
	
	// Dispose the ExtAudioFileRef, it is no longer needed
	if (file) {
		ExtAudioFileDispose(file);
	}
	return data;
}