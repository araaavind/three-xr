import $ from 'jquery';
import * as THREE from 'three';
import Experience from '../experience';
import ModelView from './model-container/model-view';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.resources.on('ready', () => {
      this.setCamera();
      this.setLight();
      this.modelView = new ModelView();
      this.sizes.on('switchdevice', device => this.switchDevice(device));
    });
  }

  setCamera() {
    this.camera.perspectiveCamera.position.x = 1;
    this.camera.perspectiveCamera.position.y = 1;
    this.camera.perspectiveCamera.position.z = 5;
  }

  setLight() {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 2);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(0, 0, 100);
    this.scene.add(this.sunlight);

    this.pointLight = new THREE.PointLight(0xc4c4c4, 5);
    this.pointLight.position.set(300, 300, 300);
    this.scene.add(this.pointLight);

    this.ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
    this.scene.add(this.ambientLight);
  }

  switchDevice(device) {
    if (this.modelView) {
      this.modelView.switchDevice(device);
    }
  }

  resize() {
    if (this.modelView) {
      this.modelView.resize();
    }
  }

  update() {
    if (this.modelView) {
      this.modelView.update();
    }
  }
}
