var a="";
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true});
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    draggable: true,
    // starts at csula
    center: {lat: 34.0666664 , lng: -118.167332664}
  });

  
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('room').addEventListener('change', onChangeHandler);
  directionsDisplay.addListener('directions_changed', function() {
computeTotalDistance(directionsDisplay.getDirections());
});

}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
   
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    // if(start.includes("king hall")){
    //     start={lat: 34.067512,lng: -118.165493}
    // }if(end.includes("king hall")){
    //     end={lat: 34.067512,lng: -118.165493}
    // }
    directionsService.route({
    origin: start,
    destination: end,
    // BICYCLING
    //WALKING
    //TRANSIT
    //DRIVING
    travelMode: 'WALKING'
    }, function(response, status) {
    if (status === 'OK') {
        directionsDisplay.setDirections(response);
    } else {
        window.alert('Directions request failed due to ' + status);
    }
    });
} 
function computeTotalDistance(result) {
var total = 0;
var myroute = result.routes[0];
for (var i = 0; i < myroute.legs.length; i++) {
  total += myroute.legs[i].distance.value;
}

var r = document.getElementById('room').value;
var dis = (total/1000)*(0.621371/1);
//round dis
dis = round(dis,1)
document.getElementById('total').innerHTML = dis + ' mi';

var spe =1.45;//*(1/60)*(1/60);//dis *(1/60)*(1/60);
document.getElementById('speed').innerHTML = spe + ' speed';


var atString = r+"";
var at = r.substring(0,1);
//seconds for stair
var sps = Number(at) * 0.10;
document.getElementById('addedTime').innerHTML = sps + ' time added';

var tim =(total/spe)*(1/60);
tim = round(tim+sps,0)
document.getElementById('time').innerHTML = tim + ' time';
var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    a =  h + ":" + m + ":" + s+"   "+a;
//round numbers
function round(number, precision) {
var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
    precision = -precision;
    }  
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
};
return shift(Math.round(shift(number, precision, false)), precision, true);
}

}
//live event
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
//////
// $(function () {
//     var directionsDisplay = new google.maps.DirectionsRenderer;
//     var directionsService = new google.maps.DirectionsService;
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 7,
//       center: {lat: 34.0668, lng: 118.1681}
//     });
//     directionsDisplay.setMap(map);
//     directionsDisplay.setPanel(document.getElementById('right-panel'));

//     var control = document.getElementById('floating-panel');
//     control.style.display = 'block';
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

//     var onChangeHandler = function() {
//       calculateAndDisplayRoute(directionsService, directionsDisplay);
//     };
//     document.getElementById('start').addEventListener('change', onChangeHandler);
//     document.getElementById('end').addEventListener('change', onChangeHandler);
//     directionsDisplay.addListener('directions_changed', function() {
// computeTotalDistance(directionsDisplay.getDirections());
// });
    
   
//     function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//         var start = document.getElementById('start').value;
//         var end = document.getElementById('end').value;
//         directionsService.route({
//           origin: start,
//           destination: end,
//           travelMode: 'WALKING'
//         }, function(response, status) {
//           if (status === 'OK') {
//             directionsDisplay.setDirections(response);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }
//       function computeTotalDistance(result) {
//       var total = 0;
//       var myroute = result.routes[0];
//       for (var i = 0; i < myroute.legs.length; i++) {
//         total += myroute.legs[i].distance.value;
//       }
//       var dis = (total/1000)*(0.621371/1);
//       document.getElementById('total').innerHTML = dis + ' mi';
      
//       var spe =1.45;//*(1/60)*(1/60);//dis *(1/60)*(1/60);
//       document.getElementById('speed').innerHTML = spe + ' speed';
    
//       var tim =(total/spe)/60;
//       document.getElementById('time').innerHTML = tim + ' time';
    
//     }
//     google.maps.event.addDomListener(window, 'load', initMap);
// });
/////////////
//   $(function () {

//     var map, infoWindow;
//     function initMap() {
//       map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 34.0668, lng: 118.1681},
//         zoom: 16
//       });
//       infoWindow = new google.maps.InfoWindow;

//       // Try HTML5 geolocation.
//       if (navigator.geolocation) { 
//         navigator.geolocation.getCurrentPosition(function(position) {
//           var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent('Location found.');
//           infoWindow.open(map);
//           map.setCenter(pos);
//         }, function() {
//           handleLocationError(true, infoWindow, map.getCenter());
//         });
//       } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//       }
//     }

//     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//       infoWindow.setPosition(pos);
//       infoWindow.setContent(browserHasGeolocation ?
//                             'Error: The Geolocation service failed.' :
//                             'Error: Your browser doesn\'t support geolocation.');
//       infoWindow.open(map);
//     }
//     google.maps.event.addDomListener(window, 'load', initMap);
//     });
 ////////////////
 // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      // var map, infoWindow;
      // function initMap() {
      //   map = new google.maps.Map(document.getElementById('map'), {
      //     center: {lat: -34.397, lng: 150.644},
      //     zoom: 16
      //   });
      //   infoWindow = new google.maps.InfoWindow;

      //   // Try HTML5 geolocation.
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(function(position) {
      //       var pos = {
      //         lat: position.coords.latitude,
      //         lng: position.coords.longitude
      //       };

      //       infoWindow.setPosition(pos);
      //       infoWindow.setContent('Location found.');
      //       infoWindow.open(map);
      //       map.setCenter(pos);
      //     }, function() {
      //       handleLocationError(true, infoWindow, map.getCenter());
      //     });
      //   } else {
      //     // Browser doesn't support Geolocation
      //     handleLocationError(false, infoWindow, map.getCenter());
      //   }
      // }

  //     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //       infoWindow.setPosition(pos);
  //       infoWindow.setContent(browserHasGeolocation ?
  //                             'Error: The Geolocation service failed.' :
  //                             'Error: Your browser doesn\'t support geolocation.');
  //       infoWindow.open(map);
  //     }


    //   function test(){

    //     function onPositionReceived(position){
    //         console.log(position);
    //     }
    
    //     function locationNotReceived(positionError){
    //         console.log(positionError);
    //     }
    
    //     if(navigator.geolocation){
      
    //         var watch = navigator.geolocation.watchPosition(onPositionReceived,locationNotReceived);
    //         console.log(watch);
    //         navigator.geolocation.clearWatch(watch);
    //     }
    // }

    /////////updates but the popup keeps showing
    // if (navigator.geolocation) { 
    //   navigator.geolocation.getCurrentPosition(function(position) {  
    
    //     var point = new google.maps.LatLng(position.coords.latitude, 
    //                                        position.coords.longitude);
    
    //     // Initialize the Google Maps API v3
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //        zoom: 15,
    //       center: point,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     });
    
    //     // Place a marker
    //     new google.maps.Marker({
    //       position: point,
    //       map: map
    //     });
    //   }); 
    // } 
    // else {
    //   alert('W3C Geolocation API is not available');
    // } 
    // // Initialize the Google Maps API v3
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // });
    
    // var marker = null;
    
    // function autoUpdate() {
    //   navigator.geolocation.watchPosition(function(position) {  
    //     var newPoint = new google.maps.LatLng(position.coords.latitude, 
    //                                           position.coords.longitude);
    
    //     if (marker) {
    //       // Marker already created - Move it
    //       marker.setPosition(newPoint);
    //     }
    //     else {
    //       // Marker does not exist - Create it
    //       marker = new google.maps.Marker({
    //         position: newPoint,
    //         map: map
    //       });
    //     }
    
    //     // Center the map on the new position
    //     map.setCenter(newPoint);
    //   }); 
    
    //   // Call the autoUpdate() function every 5 seconds
    //   setTimeout(autoUpdate, 5000);
    // }