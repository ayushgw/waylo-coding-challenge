import angular from 'angular';

import './home.styles.css';
import HomeController from './home.controller';

export default angular.module('home', [])
.controller('HomeController', HomeController)
.name;
