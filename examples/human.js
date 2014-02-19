window.onload = init;        
var WIDTH = 1000,
HEIGHT = 500;

var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;


var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
var clock = new THREE.Clock();
var scene,renderer;
var action_upper_limbs;

function init(){

        var container = $('#container');
        scene = new THREE.Scene();     
        renderer = new THREE.WebGLRenderer();
        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
        
        renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor("white",1);
        container.append(renderer.domElement);
	camera.position.set(0,1,1);  
	scene.position.set(0,0.5,0);
	camera.lookAt(scene.position);
        load_model_json('../resources/model/human.js',create_animation);
     }

function create_animation(human){
        scene.add(human);
	action_upper_limbs = new Action_upper_limbs(human);
	action_upper_limbs.create_upper_limbs();
        loop();
}

var rotate_camera = function(){
    var timer = Date.now() * 0.0005;
    camera.position.y = 1;
    camera.position.z = Math.cos( timer ) *0.5;
    camera.position.x =  Math.sin( timer )*0.5;
    camera.lookAt( scene.position );   
}

function loop(){
    requestAnimationFrame(loop);
    //rotate_camera();
    renderer.render(scene, camera);
}
