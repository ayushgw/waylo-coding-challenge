export default function Routes($urlRouterProvider, $stateProvider) {
  "ngInject";

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

}
