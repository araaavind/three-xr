import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EventEmitter } from 'events';

import Experience from '../experience';

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.GLTFLoader = new GLTFLoader();
    this.loaders.DRACOLoader = new DRACOLoader();
    this.loaders.DRACOLoader.setDecoderPath('/js/draco/');
    this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'imageTexture') {
        this.loaders.textureLoader.load(asset.path, (file) => this.singleAssetLoad(asset, file));
      } else if (asset.type === 'gltfModel') {
        this.loaders.GLTFLoader.load(asset.path, (gltf) => this.singleAssetLoad(asset, gltf));
      }
    }
  }

  singleAssetLoad(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    if (this.loaded === this.queue) {
      setTimeout(() => {
        console.log(asset.name + ' loaded');
        this.emit('ready');
      }, 500);
    }
  }
}
