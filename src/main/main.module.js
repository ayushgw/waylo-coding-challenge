import angular from 'angular';

import './main.styles.css';
import MainController from './main.controller';

export default angular.module('main', [])
.controller('MainController', MainController)
.name;
