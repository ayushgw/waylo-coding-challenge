import avatar from '../Data/images/avatar.png';

export default function HomeController(AuthService, DatabaseService, NgMap, $scope, $location) {
   "ngInject";
   var home = this;
   home.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCc53wwPMIa3bfR2bJ2f3FqGVfGvAYZIHs';

   let getUserDetails = DatabaseService.getUserDetails();
   getUserDetails.then( (result) => {
      home.user = result;
      $scope.$digest();
   });

   let getData = DatabaseService.getData();
   getData.then( (result) => {
      console.log('result', result);
      markDatapoints(result);
      home.datapoints = result;
      $scope.$digest();
   });

   home.selectDatapoint = (datapoint) => {
      home.selectedDatapoint = datapoint;
   };

   home.userSignOut = () => {
      AuthService.userSignOut();
      $location.path('/');
   };

   ////////////////////////////////////////////
   ////////////// Map Plot ///////////////////
   ////////////////////////////////////////////
   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(23.88, 45.07),
      mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   var infowindow = new google.maps.InfoWindow();
   var marker, i;

   function markDatapoints (datapoints) {
      console.log('mark', datapoints);
      angular.forEach(datapoints, (value, key) => {
         console.log(value);
         marker = new google.maps.Marker({
            position: new google.maps.LatLng(value.location[1], value.location[2]),
            map: map
         });
         google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
               infowindow.setContent(value.location[0]);
               infowindow.open(map, marker);
            }
         })(marker, i));
      });
   };
   ////////////////////////////////////////////
   ////////////////////////////////////////////

}
