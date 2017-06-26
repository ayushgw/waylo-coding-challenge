export default function RunFunction($trace, $transitions, $rootScope) {
   "ngInject";

   // $trace.enable('TRANSITION');

   // Restrict dashboard access to authenticated users only
   $transitions.onStart({ to: 'home' }, function(trans) {
      let auth = trans.injector().get('AuthService');
      return auth.isAuthenticated()
      .then(function(result) {
         // User is Authenticated
      })
      .catch(function(error) {
         // User isn't Authenticated. Redirect to 'main'
         return trans.router.stateService.target('main');
      });
   });

}
