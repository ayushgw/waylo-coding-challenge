import angular from 'angular';

import HomeController from './home.controller';

export default angular.module('home', [])
.controller('HomeController', HomeController)
.name;
