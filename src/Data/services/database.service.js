import firebase from 'firebase';
import datapoints from './sample.datapoints.json';

export default function DatabaseService($q) {
   "ngInject";

   var service = this;
   var firebasedatabase = firebase.database();


   // DATA POINTS
   // service.setData = () => {
   //    firebasedatabase.ref('data').set(datapoints);
   // };
   // service.setData();

   service.getData = () => {
      let deferred = $q.defer();

      let getDatapoints = firebasedatabase.ref('data');
      getDatapoints.on('value', (snapshot) => {
         let datapoints = snapshot.val();
         let formattedData = [];
         angular.forEach(datapoints, (value, key) => {
            formattedData.push(value);
         });
         console.log(formattedData);
         deferred.resolve(formattedData);
      });

      return deferred.promise;
   };


   // USER DATA
   service.saveUserDetails = (user, result) => {
      let timestamp = Math.floor(Date.now() / 1000);
      let offset = new Date().getTimezoneOffset();
      let timezone = -(offset/60);
      let locale = window.navigator.languages && window.navigator.languages[0] || window.navigator.language || window.navigator.userLanguage;

      let userObj = {
         name: user.name,
         email: user.email || null,
         gender: user.gender || null,
         profilepic: result.providerData[0].photoURL || 'https://www.causes.com/assets/avatar_placeholder-9a2f53db6270aa02b5ae2c5af1ffc72b.svg',
         timestamp: timestamp,
         timezone: timezone,
         locale: locale
      }
      firebasedatabase.ref('users/' + result.uid).set(userObj);
   };

   service.getUserDetails = () => {
      let userId = firebase.auth().currentUser.uid;
      let getUserDetails = firebasedatabase.ref('users/' + userId).once('value').then(function(snapshot) {
         let userDetails = snapshot.val();
         return userDetails;
      });
      return getUserDetails;
   };
}
