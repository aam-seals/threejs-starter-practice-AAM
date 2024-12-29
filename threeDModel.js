import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { URDFLoader } from './assets/js/URDFLoader.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/dat.gui@latest/build/dat.gui.module.js';

const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);

// Camera
const sizes = {
    width: window.innerWidth,
    height: 500,
};
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(3, 3, 3);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting
const ambientLight = new THREE.AmbientLight(0x606060, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = true;
controls.enableDamping = true;

// URDF Loader
const loader = new URDFLoader();
let robot;
loader.load(
    'assets/drone_gripper_1/urdf/drone_gripper_1.urdf',
    (urdf) => {
        robot = urdf;
        scene.add(robot);
        robot.rotation.y = Math.PI; // Rotate for visibility
        setupJointControls(robot);
    },
    undefined,
    (error) => {
        console.error('Error loading URDF or mesh:', error);
    }
);

// GUI for Joint Controls
function setupJointControls(robot) {
    const gui = new GUI();
    const jointControls = {};

    robot.traverse((child) => {
        if (child.isURDFJoint && child.jointType === 'revolute') {
            const jointName = child.name;
            jointControls[jointName] = { angle: 0 };
            gui.add(jointControls[jointName], 'angle', -Math.PI, Math.PI)
                .name(jointName)
                .onChange((value) => {
                    child.setJointValue(value);
                });
        }
    });
}

// Responsiveness
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
