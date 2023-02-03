import * as THREE from 'three';
import Experience from "../../experience";
import _ from 'underscore';

export default class ModelView {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.view = new THREE.Group();

    this.sunInital = { x: 13, y: 13, z: 1.5 };

    this.switchDevice(this.sizes.device);
    this.setView();
  }

  setView() {
    this.house = this.resources.items['house']
    this.house.name = 'house';

    this.car = this.resources.items['car']
    this.car.name = 'car';

    this.view.add(this.house.scene);
    this.view.add(this.car.scene);
    this.scene.add(this.view);
  }

  switchDevice(device) {
    if (device === 'desktop') {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.scale = 1;
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.scale = .6;
    }
    this.resize();
  }

  resize() {
    this.view.position.set(this.x, this.y, this.z);
    this.view.scale.set(this.scale, this.scale, this.scale);
  }

  update() { }
}
