import $ from 'jquery';
import { Promise } from 'bluebird';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EventEmitter } from 'events';

import Experience from '../Experience';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    // set loaders
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.RGBELoader = new RGBELoader();
    this.loaders.GLTFLoader = new GLTFLoader();
    this.loaders.DRACOLoader = new DRACOLoader();
    this.loaders.DRACOLoader.setDecoderPath('/js/draco/');
    this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
    
    this.init();
  }

  async init() {
    await Promise.map(this.assets, (asset) => {
      if (asset.type === 'imageTexture') {
        return this.loaders.textureLoader.loadAsync(asset.path)
          .then((file) => this.singleAssetLoad(asset, file))
          .catch((err) => console.error(`Error in loading ${asset.name}: ${err}`));
      } else if (asset.type === 'gltfModel') {
        return this.loaders.GLTFLoader.loadAsync(asset.path)
          .then((gltf) => this.singleAssetLoad(asset, gltf))
          .catch((err) => console.error(`Error in loading ${asset.name}: ${err}`));
      } else if (asset.type === 'hdrTexture') {
        return this.loaders.RGBELoader.loadAsync(asset.path)
          .then((hdr) => this.hdrAssetLoad(asset, hdr))
          .catch((err) => console.error(`Error in loading ${asset.name}: ${err}`));
      }
    }, { concurrency: 50 });
    this.loaders.DRACOLoader.dispose();
  }

  singleAssetLoad(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    this.assetsLoaded();
  }

  hdrAssetLoad(asset, hdr) {
    // hdr.mapping = THREE.EquirectangularReflectionMapping;
    // this.items[asset.name] = hdr;
    const PMREMGen = new THREE.PMREMGenerator(this.renderer.renderer);
    this.items[asset.name] = PMREMGen.fromEquirectangular(hdr).texture;
    PMREMGen.dispose();
    hdr.dispose();
    this.loaded++;
    this.assetsLoaded();
  }

  assetsLoaded() {
    this.updateProgressBar();
    if (this.loaded === this.queue) {
      setTimeout(() => {
        this.emit('ready');
        $('.loading-screen')[0].style.visibility = 'hidden';
        $('.experience')[0].style.visibility = 'visible';
      }, 500);
    }
  }

  updateProgressBar() {
    const percentage = Math.round((this.loaded / this.queue) * 100);
    const progressColorMap = {
      5: '#f63a0f',
      25: '#f27011',
      50: '#f2b01e',
      75: '#f2d31b',
      100: '#86e01e',
    };
    $('.progress-bar')[0].textContent = `${percentage}%`;
    $('.progress-bar')[0].style.width = `${percentage}%`;
    $('.progress-bar')[0].style.backgroundColor = progressColorMap[Object.keys(progressColorMap).reduce((p1, p2) => {
      return Math.abs(p2 - percentage) < Math.abs(p1 - percentage) ? p2 : p1;
    })];
  }
}
