import './styles.css';
import $ from 'jquery';
import Experience from './experience/Experience';

const experience = new Experience($('.experience-canvas')[0]);

window.onload = () => {
  $('.loading-screen')[0].style.visibility = 'visible';
};
