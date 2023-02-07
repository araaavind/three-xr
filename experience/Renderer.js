import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import Experience from './Experience';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    
    this.setRenderer();
  }
  
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    
    this.vrButton = VRButton;
    this.renderer.xr.enabled = true;
    this.renderer.setAnimationLoop(() => {
      this.experience.time.emit('update');
    });
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
