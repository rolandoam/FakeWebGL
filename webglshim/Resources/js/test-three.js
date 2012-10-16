// based on Getting Started with Three.js
// http://www.aerotwist.com/tutorials/getting-started-with-three-js/

// set the scene size
var WIDTH = 400,
  HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the Canvas
var canvas = new ChesterCanvas(innerWidth, innerHeight);

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer({canvas: canvas});
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;

// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),

  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

var loop = function () {
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
};

loop();
