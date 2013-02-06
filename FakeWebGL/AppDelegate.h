//
//  AppDelegate.h
//  webglshim
//
//  Created by Rolando Abarca on 10/5/12.
//  Copyright (c) 2012 Rolando Abarca. All rights reserved.
//

#import <UIKit/UIKit.h>

@class EAGLView;

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) IBOutlet UIWindow* window;
@property (strong, nonatomic) IBOutlet EAGLView* glView;

- (void)initJS;

@end
