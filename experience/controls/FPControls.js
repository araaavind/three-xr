import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { Clock } from 'three';
import Experience from '../Experience';

export default class FPControls {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time;
    this.clock = new Clock();
    this.controls = new FirstPersonControls(this.camera.perspectiveCamera, this.experience.canvas);
    this.controls.lookSpeed = .005;
    this.controls.movementSpeed = 4;
    this.controls.enabled = false;
  }

  resize() {
    this.controls.handleResize();
  }

  update() {
    this.controls.update(this.clock.getDelta());
  }
}
