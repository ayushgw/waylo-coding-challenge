import angular from 'angular';

import AuthService from './services/auth.service';
import DatabaseService from './services/database.service';

export default angular.module('Data', [])
.service('AuthService', AuthService)
.service('DatabaseService', DatabaseService)
.name;
