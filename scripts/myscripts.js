
  $(function () {

    var map, infoWindow;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0668, lng: 118.1681},
        zoom: 16
      });
      infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
    google.maps.event.addDomListener(window, 'load', initMap);
    });
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