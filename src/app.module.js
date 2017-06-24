import 'mdi/css/materialdesignicons.min.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngmessages from 'angular-messages';

import Routes from './app.config';
import RunFunction from '.app.run';

angular.module('app', [uirouter, ngmessages])
.config(Routes)
.run(RunFunction);
