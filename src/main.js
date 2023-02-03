import './styles.css';
import $ from 'jquery';
import Experience from './experience/experience';

const experience = new Experience($('.experience-canvas')[0]);

experience.sizes.on('switchdevice', () => setScrollProgress(experience.sizes.device));
