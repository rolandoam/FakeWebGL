/*
 
 File: ES2Renderer.m
 
 Abstract: The ES2Renderer class creates an OpenGL ES 2.0 context and draws
 using OpenGL ES 2.0 shaders.
 
 Version: 1.0
 
 Disclaimer: IMPORTANT:  This Apple software is supplied to you by Apple Inc.
 ("Apple") in consideration of your agreement to the following terms, and your
 use, installation, modification or redistribution of this Apple software
 constitutes acceptance of these terms.  If you do not agree with these terms,
 please do not use, install, modify or redistribute this Apple software.
 
 In consideration of your agreement to abide by the following terms, and subject
 to these terms, Apple grants you a personal, non-exclusive license, under
 Apple's copyrights in this original Apple software (the "Apple Software"), to
 use, reproduce, modify and redistribute the Apple Software, with or without
 modifications, in source and/or binary forms; provided that if you redistribute
 the Apple Software in its entirety and without modifications, you must retain
 this notice and the following text and disclaimers in all such redistributions
 of the Apple Software.
 Neither the name, trademarks, service marks or logos of Apple Inc. may be used
 to endorse or promote products derived from the Apple Software without specific
 prior written permission from Apple.  Except as expressly stated in this notice,
 no other rights or licenses, express or implied, are granted by Apple herein,
 including but not limited to any patent rights that may be infringed by your
 derivative works or by other works in which the Apple Software may be
 incorporated.
 
 The Apple Software is provided by Apple on an "AS IS" basis.  APPLE MAKES NO
 WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED
 WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND OPERATION ALONE OR IN
 COMBINATION WITH YOUR PRODUCTS.
 
 IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, MODIFICATION AND/OR
 DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED AND WHETHER UNDER THEORY OF
 CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, EVEN IF
 APPLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 Copyright (C) 2009 Apple Inc. All Rights Reserved.
 
 */

#include "glue.h"
#import "ES2Renderer.h"

@implementation ES2Renderer

// Create an ES 2.0 context
- (id) init
{
	if (self = [super init])
	{
		_context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
        
        if (!_context || ![EAGLContext setCurrentContext:_context])
		{
            return nil;
        }
		
		// Create default framebuffer object. The backing will be allocated for the current layer in -resizeFromLayer
		glGenFramebuffers(1, &defaultFramebuffer); CHECK_GL_ERROR();
		glGenRenderbuffers(1, &colorRenderbuffer); CHECK_GL_ERROR();
		glBindFramebuffer(GL_FRAMEBUFFER, defaultFramebuffer); CHECK_GL_ERROR();
		glBindRenderbuffer(GL_RENDERBUFFER, colorRenderbuffer); CHECK_GL_ERROR();
		glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, colorRenderbuffer); CHECK_GL_ERROR();
	}
	
	return self;
}

- (void)render {    
    [EAGLContext setCurrentContext:_context];
    
    glBindFramebuffer(GL_FRAMEBUFFER, defaultFramebuffer); CHECK_GL_ERROR();
    
	JSObject* obj = getRequestAnimationFrameCallback();
	if (obj) {
		jsval fval = OBJECT_TO_JSVAL(obj);
		jsval outval;
		JSContext* cx = getGlobalContext();
		if (0) {
			JSObject* global = getGlobalObject("debug-global");
			JS_CallFunctionValue(cx, global, fval, 0, NULL, &outval);
		} else {
			JS_CallFunctionValue(cx, NULL, fval, 0, NULL, &outval);
		}
	}
#if 0
	struct timeval now;
	gettimeofday(&now, NULL);
	if (now.tv_sec - lastInfoDisplay.tv_sec >= 1) {
		lastInfoDisplay.tv_sec = now.tv_sec;
		NSLog(@"FPS: %d", self.framesPerSecond);
	}
#endif
    
    glBindRenderbuffer(GL_RENDERBUFFER, colorRenderbuffer); CHECK_GL_ERROR();
    [_context presentRenderbuffer:GL_RENDERBUFFER];
}

- (bool)resizeFromLayer:(CAEAGLLayer *)layer
{
	// Allocate color buffer backing based on the current layer size
    glBindRenderbuffer(GL_RENDERBUFFER, colorRenderbuffer); CHECK_GL_ERROR();
    [_context renderbufferStorage:GL_RENDERBUFFER fromDrawable:layer];
	glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_WIDTH, &backingWidth); CHECK_GL_ERROR();
    glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_HEIGHT, &backingHeight); CHECK_GL_ERROR();
	
    if (glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE)
	{
        NSLog(@"Failed to make complete framebuffer object %x", glCheckFramebufferStatus(GL_FRAMEBUFFER));
        return false;
    }

	setInnerWidthAndHeight(getGlobalContext(), NULL, backingWidth, backingHeight);
	return true;
}

- (CGSize)size
{
	return {(CGFloat)backingWidth, (CGFloat)backingHeight};
}

- (void) dealloc
{
	// tear down GL
	if (defaultFramebuffer)
	{
		glDeleteFramebuffers(1, &defaultFramebuffer);
		defaultFramebuffer = 0;
	}
	
	if (colorRenderbuffer)
	{
		glDeleteRenderbuffers(1, &colorRenderbuffer);
		colorRenderbuffer = 0;
	}
	
	// realease the shader program object
	if (program)
	{
		glDeleteProgram(program);
		program = 0;
	}
	
	// tear down context
	if ([EAGLContext currentContext] == _context)
        [EAGLContext setCurrentContext:nil];
	
	_context = nil;
}

@end
