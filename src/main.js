window.onload = init;        

var WIDTH = 1000,
    HEIGHT = 500;

var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var clock = new THREE.Clock();
var scene,renderer;
var action_upper_limbs;

var last_frame_time = 0;

function init()
{
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

    var loader = new THREE.JSONLoader();
    loader.load('../resources/model/human.js',function(geometry)
    {
        var human = new vj2.Model(geometry, new THREE.MeshLambertMaterial());
        human.material.skinning = true;
        create_animation(human);
    });
}

function create_animation(human)
{
    scene.add(human);
    action_upper_limbs = new vj2.Action_upper_limbs(human, scene);
    last_frame_time = Date.now();
    loop();
}

function loop()
{
    requestAnimationFrame(loop);
    var dt = Date.now() - last_frame_time;

    action_upper_limbs.update(dt/1000);
    renderer.render(scene, camera);

    last_frame_time = Date.now();
}
