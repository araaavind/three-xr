import * as THREE from 'three';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.experience.sizes.aspect,
      0.1,
      100
    );
    this.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );
    this.scene.add(this.orthographicCamera);
    this.orthographicCamera.position.set(0, 0, 25);
    this.orthographicCamera.lookAt(0, 0, 0);
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
  }
}
