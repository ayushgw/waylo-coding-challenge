export default function MainController(AuthService) {
   "ngInject";
   var main = this;

   main.oauthSignIn = (provider) => {
      let oauthlogin = AuthService.oauthSignIn(provider);
      oauthlogin.then(function(result) {
         console.log('User Signed In using ' + provider);
         console.log(result);
         // $state.go('home');
      })
      .catch(function(error) {
         console.log('error');
      });
   };

   main.userLogin = (user) => {

   };

   main.userSignup = (user) => {

   };
}
