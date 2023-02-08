import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import Experience from '../Experience';

export default class Helpers {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setHelpers();
    this.setOrbitControls();
  }

  setHelpers() {
    this.stats = new Stats();
    this.gridHelper = new THREE.GridHelper(200, 20);
    this.axesHelper = new THREE.AxesHelper(100);
    this.cameraHelper = new THREE.CameraHelper(this.camera.perspectiveCamera);
    this.scene.add(this.gridHelper);
    this.scene.add(this.axesHelper);
    // this.scene.add(this.cameraHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.camera.perspectiveCamera, this.canvas);
    this.controls.enableDamping = false;
    this.controls.enableZoom = true;
    this.controls.target.set(6, 1.6, -6);
    // this.controls.enabled = false;
  }

  resize() { }

  update() {
    if (this.stats) {
      this.stats.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
