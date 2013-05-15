//
//  AppDelegate.m
//  webglshim
//
//  Created by Rolando Abarca on 10/5/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//

#include <sys/time.h>
#include <vector>
#import <QuartzCore/QuartzCore.h>
#import "AppDelegate.h"
#import "EAGLView.h"
#import "glue.h"

@interface SimpleViewController : UIViewController
@end

@implementation SimpleViewController
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
	return YES;
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
	std::vector<webglTouch_t> injectedTouches;
	for (UITouch *t in touches) {
		CGPoint pt = [t locationInView:self.view];
		injectedTouches.push_back({pt.x, pt.y});
	}
	injectTouches(webglTouchesBegan, &injectedTouches[0], touches.count);
}

- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event {
	std::vector<webglTouch_t> injectedTouches;
	for (UITouch *t in touches) {
		CGPoint pt = [t locationInView:self.view];
		injectedTouches.push_back({pt.x, pt.y});
	}
	injectTouches(webglTouchesMoved, &injectedTouches[0], touches.count);
}

- (void)touchesEnded:(NSSet *)touches withEvent:(UIEvent *)event {
	std::vector<webglTouch_t> injectedTouches;
	for (UITouch *t in touches) {
		CGPoint pt = [t locationInView:self.view];
		injectedTouches.push_back({pt.x, pt.y});
	}
	injectTouches(webglTouchesEnded, &injectedTouches[0], touches.count);
}

- (void)touchesCancelled:(NSSet *)touches withEvent:(UIEvent *)event {
	std::vector<webglTouch_t> injectedTouches;
	for (UITouch *t in touches) {
		CGPoint pt = [t locationInView:self.view];
		injectedTouches.push_back({pt.x, pt.y});
	}
	injectTouches(webglTouchesCanceled, &injectedTouches[0], touches.count);
}
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
	createJSEnvironment();
	[_window setFrame:[UIScreen mainScreen].bounds];
	_window.rootViewController = [[SimpleViewController alloc] init];
	_window.rootViewController.view = _glView;
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
	// Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
	// Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
	[self.glView stopAnimation];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
	// Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
	// If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
	[self.glView stopAnimation];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
	// Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
	[self.glView startAnimation];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
	// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
	[self.glView startAnimation];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
	// Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
	[self.glView stopAnimation];
}

- (void)initJS
{
	[EAGLContext setCurrentContext:[_glView getContext]];
	// run all the files
	if (0) {
		runScript("js/debugger.js");
	}
	
	/**
	 * Three.js tests:
	 * 1) basic three.js test
	 * 2) geometry hierarchy 2
	 *    http://mrdoob.github.com/three.js/examples/webgl_geometry_hierarchy2.html
	 * 3) materials cubemap
	 *    http://mrdoob.github.com/three.js/examples/webgl_materials_cubemap.html
	 * 4) materials skin
	 *    http://mrdoob.github.com/three.js/examples/webgl_materials_bumpmap_skin.html
	 */
#define TEST_THREE 0

	// three.js
#if TEST_THREE
	// required for all tests
	runScript("js/three/three.js");
	
#if TEST_THREE == 1
	runScript("js/three/test-three.js");
#endif
	
#if TEST_THREE == 2
	runScript("js/three/webgl_geometry_hierarchy2.js");
#endif
	
#if TEST_THREE == 3
	runScript("js/three/BinaryLoader.js");
	runScript("js/three/materials_cubemap.js");
#endif
	
#if TEST_THREE == 4
	// NOT WORKING (YET)
	runScript("js/three/ShaderSkin.js");
	runScript("js/three/CopyShader.js");
	runScript("js/three/EffectComposer.js");
	runScript("js/three/RenderPass.js");
	runScript("js/three/ShaderPass.js");
	runScript("js/three/MaskPass.js");
	runScript("js/three/webgl_materials_bumpmap_skin.js");
#endif
	
#endif
	
#if !TEST_THREE
	// chester examples
	runScript("js/chester.js");
	runScript("js/chester-test-3.js");
#endif
}

@end
