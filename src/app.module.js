import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngmessages from 'angular-messages';
import ngaria from 'angular-aria';
import nganimate from 'angular-animate';
import ngmaterial from 'angular-material';
import 'angular-material/angular-material.min.css';

import './app.styles.css';
import Routes from './app.config';
import RunFunction from './app.run';

import Data from './Data/Data.module';
import main from './main/main.module';
import home from './home/home.module';

angular.module('app', [uirouter, ngmaterial, ngmessages, Data, main, home])
.config(Routes)
.run(RunFunction);
