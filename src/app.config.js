export default function Routes($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdAriaProvider) {
   "ngInject";

   // enable html5Mode for pushstate ('#'-less URLs)
   $locationProvider.html5Mode(true);
   $locationProvider.hashPrefix('!');


   $urlRouterProvider.otherwise('/');

   $stateProvider
   .state('main', {
      url: '/',
      template: require('./main/main.template.html'),
      controller: 'MainController',
      controllerAs: 'main'
   })
   .state('home', {
      url: '/dashboard',
      template: require('./home/home.template.html'),
      controller: 'HomeController',
      controllerAs: 'home'
   });


   $mdThemingProvider.theme('default')
   .primaryPalette('blue-grey', {
      'default': '400',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
   })
   .accentPalette('blue-grey', {
      'default': '100'
   })
   .warnPalette('amber');

   $mdAriaProvider.disableWarnings();
}
