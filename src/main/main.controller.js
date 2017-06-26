export default function MainController(AuthService, $state) {
   "ngInject";
   var main = this;

   main.isLoading = false;
   let toggleLoadingFlag = () => {
      main.isLoading = !main.isLoading;
   };

   main.oauthSignIn = (provider) => {
      toggleLoadingFlag();
      let oauthlogin = AuthService.oauthSignIn(provider);
      oauthlogin.then(function(result) {
         $state.go('home');
      })
      .catch(function(error) {
         console.log(error);
      });
   };

   main.userLogin = (user) => {
      toggleLoadingFlag();
      let userlogin = AuthService.userLogin(user)
      userlogin.then(function(result) {
         toggleLoadingFlag();
         $state.go('home');
      })
      .catch(function(error) {
         toggleLoadingFlag();
         console.log(error);
      });
   };

   main.userSignup = (user) => {
      toggleLoadingFlag();
      let userSignup = AuthService.userSignup(user)
      userSignup.then(function(result) {
         toggleLoadingFlag();
         $state.go('home');
      })
      .catch(function(error) {
         toggleLoadingFlag();
         console.log(error);
      });
   };
}
