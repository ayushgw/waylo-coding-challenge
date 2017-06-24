import firebase from 'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyBVStbSMdSQabhlGQbxRJ5S1n0tMGOzJkg",
   authDomain: "waylo-coding-challenge.firebaseapp.com",
   databaseURL: "https://waylo-coding-challenge.firebaseio.com",
   projectId: "waylo-coding-challenge",
   storageBucket: "",
   messagingSenderId: "358369695785"
};
firebase.initializeApp(config);

export default function AuthService() {
   "ngInject";

   var service = this;
   var firebaseauth = firebase.auth();

   service.oauthSignIn = (provider) => {
      let Provider = provider + 'AuthProvider';
      let ProviderObj = new firebase.auth[Provider]();
      let signin = firebaseauth.signInWithPopup(ProviderObj);
      signin.then(function(result) {
         let user = result.user;
         return user;
      })
      .catch(function(error) {
         return error;
      });

      return signin;
   };

   service.userLogin = () => {

   };

   service.userSignup = () => {

   };

}
