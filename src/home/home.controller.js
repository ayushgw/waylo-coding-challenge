import avatar from '../Data/images/avatar.png';

export default function HomeController(AuthService, DatabaseService, NgMap, $scope, $location, $mdToast) {
   "ngInject";
   var home = this;
   home.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCc53wwPMIa3bfR2bJ2f3FqGVfGvAYZIHs';
   let noOfDataPoints = null;

   let getUserDetails = DatabaseService.getUserDetails();
   getUserDetails.then( (result) => {
      home.user = result;
      $scope.$digest();
   });

   let getData = DatabaseService.getData();
   getData.on('value', (snapshot) => {
      let datapoints = snapshot.val();
      let formattedData = [];
      angular.forEach(datapoints, (value, key) => {
         formattedData.push(value);
      });
      let formattedDataLength = formattedData.length;
      noOfDataPoints = noOfDataPoints || formattedDataLength;
      if(noOfDataPoints !== formattedDataLength) {
         // show toast
         if(noOfDataPoints < formattedDataLength) {
            $mdToast.show($mdToast.simple().textContent('A data point has been added!'));
         }
         else if (noOfDataPoints > formattedDataLength) {
            $mdToast.show($mdToast.simple().textContent('A data point has been deleted!'));
         }
         noOfDataPoints = formattedDataLength;
      }
      markDatapoints(formattedData);
      home.datapoints = formattedData;
      $scope.$digest();
   });

   home.userSignOut = () => {
      AuthService.userSignOut();
      $location.path('/');
   };


   // Marking Data Points
   home.selectDatapoint = (datapoint) => {
      home.selectedDatapoint = datapoint;
      home.openInfoWindow(datapoint)
   };
   home.openInfoWindow = (datapoint) => {
      let marker = new google.maps.Marker({
         position: new google.maps.LatLng(datapoint.location[1], datapoint.location[2]),
         map: map
      });
      infowindow.setContent(datapoint.location[0]);
      infowindow.open(map, marker);
   };
   //
   var map, infowindow;
   function markDatapoints (datapoints) {
      map = new google.maps.Map(document.getElementById('map'), {
         zoom: 2,
         center: new google.maps.LatLng(23.88, 45.07),
         mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      infowindow = new google.maps.InfoWindow();
      var marker, i;

      var counter = 0;
      angular.forEach(datapoints, (value, key) => {
         marker = new google.maps.Marker({
            position: new google.maps.LatLng(value.location[1], value.location[2]),
            map: map
         });
         google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
               home.selected = key;
               home.selectDatapoint(value);
               console.log(counter);
               $scope.$digest();
               infowindow.setContent(value.location[0]);
               infowindow.open(map, marker);
            }
         })(marker, i));
         counter++;
      });

   };

}
