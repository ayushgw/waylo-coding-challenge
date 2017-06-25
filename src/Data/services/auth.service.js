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


export default function AuthService($q) {
   "ngInject";

   var service = this;
   var firebaseauth = firebase.auth();

   let saveUserDetails = (user, updateObj) => {
      user.updateProfile(updateObj); // WON'T WORK
      // TODO: SAVE ADDITIONAL PROPERTIES IN DATABASE USING USER'S UID
   };

   service.isAuthenticated = function() {
      var deferred = $q.defer();
      let flag = false;
      firebaseauth.onAuthStateChanged(function(user) {
         if (user) {
            flag = true;
            return deferred.resolve(flag);
         } else {
            return deferred.reject(flag);
         }
      });
      return deferred.promise;
   };

   service.oauthSignIn = (provider) => {
      let Provider = provider + 'AuthProvider';
      let ProviderObj = new firebase.auth[Provider]();
      return firebaseauth.signInWithPopup(ProviderObj);
   };

   service.userLogin = (user) => {
      return firebaseauth.signInWithEmailAndPassword(user.email, user.password);
   };

   service.userSignup = (user) => {
      let signup = firebaseauth.createUserWithEmailAndPassword(user.email, user.password);
      signup.then( (result) => {
         let updateObj = {
            name: user.name,
            gender: user.gender
         };
         saveUserDetails(result, updateObj);
         return result;
      })
      return signup;
   };

}
