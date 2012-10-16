//
//  glue.ios.mm
//  webglshim
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

#include "glue.h"
#import <Foundation/Foundation.h>
#import "AppDelegate.h"
#import "ViewController.h"

#define RETINA_PREFIX @"@2x"

const char* getFullPathFromRelativePath(const char* path)
{
	NSBundle* mainBundle = [NSBundle mainBundle];
	NSString* aPath = [NSString stringWithUTF8String:path];
	NSString* extension = [aPath pathExtension];
	aPath = [aPath stringByDeletingPathExtension];
	// test for retina version
	NSString* fullPath = [mainBundle pathForResource:[NSString stringWithFormat:@"%@%@.%@", aPath, RETINA_PREFIX, extension] ofType:nil];
	if (!fullPath) {
		fullPath = [mainBundle pathForResource:[NSString stringWithUTF8String:path] ofType:nil];
	}
	return [fullPath UTF8String];
}

float getDevicePixelRatio()
{
	return [UIScreen mainScreen].currentMode.pixelAspectRatio;
}

void getDeviceWinSize(int* width, int* height)
{
	CGRect bounds = [UIScreen mainScreen].bounds;
	//AppDelegate* delegate = [UIApplication sharedApplication].delegate;
	//ViewController* controller = delegate.viewController;
	//UIView* view = controller.view;

	// retina not working yet...
	//float contentScaleFactor = view.contentScaleFactor;
	*width = bounds.size.width;// * contentScaleFactor;
	*height = bounds.size.height;// * contentScaleFactor;
}

// all the mat multiplication code "borrowed" from the closure library
// http://closure-library.googlecode.com/svn/docs/closure_goog_vec_mat4.js.source.html

// multiply 2 4x4 matrices. Store result in res
void mat4mul(float* mat0, float* mat1, float* resultMat) {
	float a00 = mat0[0], a10 = mat0[1], a20 = mat0[2], a30 = mat0[3];
	float a01 = mat0[4], a11 = mat0[5], a21 = mat0[6], a31 = mat0[7];
	float a02 = mat0[8], a12 = mat0[9], a22 = mat0[10], a32 = mat0[11];
	float a03 = mat0[12], a13 = mat0[13], a23 = mat0[14], a33 = mat0[15];

	float b00 = mat1[0], b10 = mat1[1], b20 = mat1[2], b30 = mat1[3];
	float b01 = mat1[4], b11 = mat1[5], b21 = mat1[6], b31 = mat1[7];
	float b02 = mat1[8], b12 = mat1[9], b22 = mat1[10], b32 = mat1[11];
	float b03 = mat1[12], b13 = mat1[13], b23 = mat1[14], b33 = mat1[15];

	resultMat[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
	resultMat[1] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
	resultMat[2] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
	resultMat[3] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;

	resultMat[4] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
	resultMat[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
	resultMat[6] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
	resultMat[7] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;

	resultMat[8] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
	resultMat[9] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
	resultMat[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
	resultMat[11] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;

	resultMat[12] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
	resultMat[13] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
	resultMat[14] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
	resultMat[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
}

// multiply a 4x4 matrix with a vec3, res should be a vec3
void mat4mulvec3(float* mat, float* vec, float* resultVec) {
	float x = vec[0], y = vec[1], z = vec[2];
	resultVec[0] = x * mat[0] + y * mat[4] + z * mat[8] + mat[12];
	resultVec[1] = x * mat[1] + y * mat[5] + z * mat[9] + mat[13];
	resultVec[2] = x * mat[2] + y * mat[6] + z * mat[10] + mat[14];
}

void mat4setColumnValues(float* mat, int column, float v0, float v1, float v2, float v3) {
	int i = column * 4;
	mat[i] = v0;
	mat[i + 1] = v1;
	mat[i + 2] = v2;
	mat[i + 3] = v3;
}

void mat4setFromValues(float* mat, float v00, float v10, float v20, float v30, float v01, float v11, float v21, float v31, float v02, float v12, float v22, float v32,
					   float v03, float v13, float v23, float v33) {
	mat[0] = v00;
	mat[1] = v10;
	mat[2] = v20;
	mat[3] = v30;
	mat[4] = v01;
	mat[5] = v11;
	mat[6] = v21;
	mat[7] = v31;
	mat[8] = v02;
	mat[9] = v12;
	mat[10] = v22;
	mat[11] = v32;
	mat[12] = v03;
	mat[13] = v13;
	mat[14] = v23;
	mat[15] = v33;
};

// translate a 4x4 matrix
void mat4translate(float* mat, float x, float y, float z) {
	mat4setColumnValues(mat, 3,
						mat[0] * x + mat[4] * y + mat[8] * z + mat[12],
						mat[1] * x + mat[5] * y + mat[9] * z + mat[13],
						mat[2] * x + mat[6] * y + mat[10] * z + mat[14],
						mat[3] * x + mat[7] * y + mat[11] * z + mat[15]);
}

// rotate a 4x4 matrix
void mat4rotate(float* mat, float angle, float x, float y, float z) {
	float m00 = mat[0], m10 = mat[1], m20 = mat[2], m30 = mat[3];
	float m01 = mat[4], m11 = mat[5], m21 = mat[6], m31 = mat[7];
	float m02 = mat[8], m12 = mat[9], m22 = mat[10], m32 = mat[11];
	float m03 = mat[12], m13 = mat[13], m23 = mat[14], m33 = mat[15];

	float cosAngle = cosf(angle);
	float sinAngle = sinf(angle);
	float diffCosAngle = 1 - cosAngle;
	float r00 = x * x * diffCosAngle + cosAngle;
	float r10 = x * y * diffCosAngle + z * sinAngle;
	float r20 = x * z * diffCosAngle - y * sinAngle;

	float r01 = x * y * diffCosAngle - z * sinAngle;
	float r11 = y * y * diffCosAngle + cosAngle;
	float r21 = y * z * diffCosAngle + x * sinAngle;

	float r02 = x * z * diffCosAngle + y * sinAngle;
	float r12 = y * z * diffCosAngle - x * sinAngle;
	float r22 = z * z * diffCosAngle + cosAngle;

	mat4setFromValues(mat,
					  m00 * r00 + m01 * r10 + m02 * r20,
					  m10 * r00 + m11 * r10 + m12 * r20,
					  m20 * r00 + m21 * r10 + m22 * r20,
					  m30 * r00 + m31 * r10 + m32 * r20,

					  m00 * r01 + m01 * r11 + m02 * r21,
					  m10 * r01 + m11 * r11 + m12 * r21,
					  m20 * r01 + m21 * r11 + m22 * r21,
					  m30 * r01 + m31 * r11 + m32 * r21,

					  m00 * r02 + m01 * r12 + m02 * r22,
					  m10 * r02 + m11 * r12 + m12 * r22,
					  m20 * r02 + m21 * r12 + m22 * r22,
					  m30 * r02 + m31 * r12 + m32 * r22,

					  m03, m13, m23, m33);
}

// scale a 4x4 matrix
void mat4scale(float* mat, float x, float y, float z) {
	mat4setFromValues(mat,
					  mat[0] * x, mat[1] * x, mat[2] * x, mat[3] * x,
					  mat[4] * y, mat[5] * y, mat[6] * y, mat[7] * y,
					  mat[8] * z, mat[9] * z, mat[10] * z, mat[11] * z,
					  mat[12], mat[13], mat[14], mat[15]);
}
