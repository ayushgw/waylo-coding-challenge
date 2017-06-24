import angular from 'angular';

import AuthService from './services/auth.service';

export default angular.module('Data', [])
.service('AuthService', AuthService)
.name;
