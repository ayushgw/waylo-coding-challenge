import avatar from '../Data/images/avatar.png';

export default function HomeController(DatabaseService, NgMap, $scope) {
   "ngInject";
   var home = this;

   let getUserDetails = DatabaseService.getUserDetails();
   getUserDetails.then( (result) => {
      console.log(result);
      home.user = result;
      $scope.$digest();
   });

   let getData = DatabaseService.getData();
   getData.on('value', (snapshot) => {
      let datapoints = snapshot.val();
      home.datapoints = datapoints.datapoints;
      console.log(home.datapoints);
      $scope.$digest();
   });

   home.selectDatapoint = (datapoint) => {
      home.selectedDatapoint = datapoint;
   };

}
