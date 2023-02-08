import * as THREE from 'three';
import { GUI } from 'dat.gui';
import Experience from '../Experience';
import ModelView from './models/ModelView';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.resources = this.experience.resources;

    this.resources.on('ready', () => {
      this.setCamera();
      this.setLight();
      this.setBackgroundTexture();
      this.setGui();
      this.modelView = new ModelView();
      this.addVRButton();
      this.addStatsButton();
      this.sizes.on('switchdevice', (device) => this.switchDevice(device));
    });
  }

  setCamera() {
    this.camera.perspectiveCamera.position.x = -1.5;
    this.camera.perspectiveCamera.position.y = 1.6;
    this.camera.perspectiveCamera.position.z = 1.5;
    this.camera.perspectiveCamera.lookAt(0, 1.6, 0);
  }

  setLight() {
    // Directional light
    this.directionalLight = new THREE.DirectionalLight(0xc4c4c4, 0);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.far = 20;
    this.directionalLight.shadow.mapSize.set(1024, 1024);
    this.directionalLight.shadow.normalBias = 0.05;
    this.directionalLight.position.set(50, 50, 100);
    
    // Point light
    this.pointLight = new THREE.PointLight(0xc4c4c4, 0);
    this.pointLight.position.set(80, 80, 80);
    
    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x404040, 0); // soft white light
    
    this.scene.add(this.directionalLight);
    this.scene.add(this.pointLight);
    this.scene.add(this.ambientLight);
  }

  setBackgroundTexture() {
    this.renderer.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.renderer.toneMappingExposure = 1.2;
    this.backgroundTexture = this.resources.items['outdoor1'];
    this.scene.environment = this.backgroundTexture;
    this.scene.background = this.backgroundTexture;
  }
  
  setGui() {
    this.gui = new GUI();
    
    // Lighting
    this.lightingFolder = this.gui.addFolder('Lighting');
    this.lightingFolder.add(this.renderer.renderer, 'toneMappingExposure', .25, 2, .001).name('Exposure');
    this.lightingFolder.add(this.directionalLight, 'intensity', 0, 20, .001).name('Directional Light');
    this.lightingFolder.add(this.pointLight, 'intensity', 0, 20, .001).name('Point Light');
    this.lightingFolder.add(this.ambientLight, 'intensity', 0, 20, .001).name('Ambient Light');
    this.lightingFolder.open();

    // Camera
    this.cameraFolder = this.gui.addFolder('Camera');
    this.cameraFolder.open();
  }

  addVRButton() {
    document.body.appendChild(this.renderer.vrButton.createButton(this.renderer.renderer));
  }

  addStatsButton() {
    document.body.appendChild(this.experience.helpers.stats.dom);
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
