/**
 * OXO 3D script
 *
 * @author Rogier van der Linde <rogier.vanderlinde@kahosl.be>
 */

// init scene
let scene = new THREE.Scene();

// add ground
let groundGeometry = new THREE.PlaneGeometry(200, 300, 32);
let groundTexture = new THREE.TextureLoader().load(
    "https://rogiervdl.github.io/JS-course/demos/06_games/threejssimple/img/floor.jpg"
);
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(4, 4);
let groundMaterial = new THREE.MeshPhongMaterial({
    shininess: 15,
    specular: 0x888888,
    flatShading: true,
    side: THREE.DoubleSide,
    map: groundTexture,
});
let ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = (Math.PI / 360) * 110;
ground.castShadow = false;
ground.receiveShadow = true;
scene.add(ground);

// add shape
let shapeGeometry = new THREE.TorusGeometry(30, 10, 12, 24);
// let shapeGeometry = new THREE.BoxGeometry( 50, 50, 50 );
let shapeMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    side: THREE.DoubleSide,
    flatShading: true,
    shininess: 60,
    specular: 0x156289,
});
let shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
shape.castShadow = false;
shape.receiveShadow = false;
shape.position.y = 70;
shape.rotation.y = (Math.PI / 360) * 120;
scene.add(shape);

// add ambient light
let ambientlight = new THREE.AmbientLight(0x444444, 2.5);
scene.add(ambientlight);

// add spotlight
let spotlight = new THREE.SpotLight(0xf88fff, 0.7);
spotlight.position.set(150, 200, -75);
spotlight.shadow.camera.visible = true;
spotlight.castShadow = true;
spotlight.penumbra = 0.1;
spotlight.angle = 0.4;
scene.add(spotlight);

// add camera
camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);
camera.position.y = 250;
camera.position.z = 250;
// camera.position.x = 100;
camera.lookAt(new THREE.Vector3(0, 50, 0));

// init renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// render
let render = function () {
    // keep looping
    requestAnimationFrame(render);
    shape.rotation.y += 0.01;

    // render the scene
    renderer.render(scene, camera);
};
render();
