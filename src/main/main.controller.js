export default function MainController(AuthService, $state) {
   "ngInject";
   var main = this;

   main.oauthSignIn = (provider) => {
      let oauthlogin = AuthService.oauthSignIn(provider);
      oauthlogin.then(function(result) {
         console.log('User Signed In using ' + provider);
         $state.go('home');
      })
      .catch(function(error) {
         console.log(error);
      });
   };

   main.userLogin = (user) => {
      let userlogin = AuthService.userLogin(user)
      userlogin.then(function(result) {
         console.log(result);
         $state.go('home');
      })
      .catch(function(error) {
         console.log(error);
      });
   };

   main.userSignup = (user) => {
      let userSignup = AuthService.userSignup(user)
      userSignup.then(function(result) {
         console.log(result);
         $state.go('home');
      })
      .catch(function(error) {
         console.log(error);
      });
   };
}
