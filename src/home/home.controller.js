import 'ngmap/testapp/scripts/markerclusterer';
import markers from 'ngmap/testapp/scripts/markers';

export default function HomeController(NgMap) {
   "ngInject";
   var home = this;

   // var markers=[
   //    {"position":[-32.202924,-64.404945],"onClick":"markerClicked()","photo":"https://mw2.google.com/mw-panoramio/photos/medium/27932.jpg"},
   //    {"position":[47.867077,17.470493],"onClick":"markerClicked()","photo":"https://mw2.google.com/mw-panoramio/photos/medium/522084.jpg"},
   //    {"position":[-37.766372,145.141754],"onClick":"markerClicked()","photo":"https://mw2.google.com/mw-panoramio/photos/medium/1578881.jpg"}
   // ];

   home.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCc53wwPMIa3bfR2bJ2f3FqGVfGvAYZIHs";
   MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_
   = 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m';

   home.dynMarkers = [];
   NgMap.getMap().then(function(map) {
      for (var i=0; i<1000; i++) {
         var latLng = new google.maps.LatLng(markers[i].position[0], markers[i].position[1]);
         home.dynMarkers.push(new google.maps.Marker({position:latLng}));
      }
      home.markerClusterer = new MarkerClusterer(map, home.dynMarkers, {});
   });
}
