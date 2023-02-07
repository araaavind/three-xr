import * as THREE from 'three';
import Experience from '../../Experience';

export default class ModelView {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.view = new THREE.Group();

    this.switchDevice(this.sizes.device);
    this.setView();
  }

  setView() {
    this.house = this.resources.items['house'];
    this.house.name = 'house';
    this.house.scene.position.set(0, 0, 0);
    this.view.add(this.house.scene);
    
    this.car = this.resources.items['car'];
    this.car.name = 'car';
    this.car.scene.position.set(4.2, 0, -9.5);
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

  update() {
  }
}
