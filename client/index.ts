import * as THREE from 'three';

class Globe extends THREE.Group {
    private earth: THREE.Object3D;
    private clouds: THREE.Object3D;

    constructor() {
        super();

        this.earth = new THREE.Mesh(
            new THREE.SphereGeometry(1.0, 16, 16),
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('/assets/texture/earth.jpg'),
            }),
        );

        this.clouds = new THREE.Mesh(
            new THREE.SphereGeometry(1.02, 16, 16),
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('/assets/texture/clouds.jpg'),
                blending: THREE.AdditiveBlending,
                depthTest: true,
                depthWrite: true,
            }),
        );

        this.add(this.earth, this.clouds);
    }

    public update(dt: number) {
        this.rotation.y += 0.01 * 2 * Math.PI * dt;
        this.clouds.rotation.y += 0.003 * 2 * Math.PI * dt;
    }
}

(() => {
    let renderer: THREE.WebGLRenderer;
    let clock: THREE.Clock;
    let scene: THREE.Scene;
    let camera: THREE.Camera;
    let globe: Globe;

    window.addEventListener('load', () => {
        const canvas = document.getElementById('webgl-canvas');
        if (!canvas) {
            throw new Error(`there is no element with the id 'webgl-canvas'`);
        }

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera = new THREE.PerspectiveCamera(65.0, window.innerWidth / window.innerHeight, 0.1, 100.0);
        camera.position.set(0.0, 0.0, 3.0);
        scene = new THREE.Scene();

        globe = new Globe();
        scene.add(globe);

        scene.add(new THREE.AmbientLight(0xffffff, 0.1));
        scene.add(new THREE.DirectionalLight(0xffffff, 1.0));

        clock = new THREE.Clock();
        clock.start();
        requestAnimationFrame(renderLoop)
    });

    function renderLoop() {
        requestAnimationFrame(renderLoop);

        const dt = clock.getDelta();
        update(dt);

        renderer.render(scene, camera);
    }

    function update(dt: number) {
        globe.update(dt);
    }
})();
