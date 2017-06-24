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

var Auth = firebase.auth;
var GithubProvider = new firebase.auth.GithubAuthProvider();
var FacebookProvider = new firebase.auth.FacebookAuthProvider();

export default function AuthService() {
  "ngInject";

  var service = this;

  // firebase objects
  let Auth = firebase.auth();
  let GithubProvider = new firebase.auth.GithubAuthProvider();
  let FacebookProvider = new firebase.auth.FacebookAuthProvider();


}
