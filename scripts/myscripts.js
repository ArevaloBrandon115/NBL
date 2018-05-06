var a="";
var tim =0;
var gl = "";
//shows the map center at csula
function initMap() {
    //lets you drag the markers around
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true});
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    scrollwheel: false,//doesn't let you zoom out
    draggable: true,
    center: {lat: 34.0666664 , lng: -118.167332664}//center starts at csula
  });
  
  //sets map
  directionsDisplay.setMap(map);
  //directions from point A to B
  directionsDisplay.setPanel(document.getElementById('right-panel'));
 
 
  //calls method to make the the blue path from point A to B
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  //if any of the inputs change then it call calculateAndDisplayRoute method
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  document.getElementById('startroom').addEventListener('change', onChangeHandler);
  document.getElementById('endroom').addEventListener('change', onChangeHandler);
  
  //if anyting changes then it displays the directions
  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
    });

}

//calculate and display route
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    
    //start should be lat+","+lng
    var start = document.getElementById('start').value;
    //if the user chooses to use current location
    if(start===""){
       //getLocation();
        start = 34.0666664+","+-118.167332664;//document.getElementById('start').value;
    }

    //end should be (lat,lng)
    var end = document.getElementById('end').value;

    //gets the route to take for the map
    directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'WALKING'   //walking from point A to B
    }, function(response, status) {
    
    //if no errors found it fins the route
    //else display error message
    if (status === 'OK') {
        directionsDisplay.setDirections(response);
    } else {
        window.alert('Directions request failed due to ' + status);
    }
    });
} 

//computes the total distance
function computeTotalDistance(result) {

    //adds the total time for arrival
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    //gets user room number input
    var r = document.getElementById('startroom').value;
    var r2 = document.getElementById('endroom').value;

    var dis = (total/1000)*(0.621371/1);//round distance needed to travel
    dis = round(dis,1)//rounds it off

    //displays the distance in miles (PERSON USE)
    // document.getElementById('total').innerHTML = dis + ' mi';

    //average speed (PERSON USE)
    var spe =1.45;
    // document.getElementById('speed').innerHTML = spe + ' speed';

    var at = r.substring(0,1);
    var c=0;
    if(!isEmpty(at)){
        while(!isInt(at)){
            at = r.substring(c,(c+1));
            c++;
        }
    }
    var at2 = r2.substring(0,1);
    var c=0;
    if(!isEmpty(at2)){
        while(!isInt(at2)){
            at2 = r2.substring(c,(c+1));
            c++;
        }
    }
    
    function isInt(value) {
        return !isNaN(value) && 
               parseInt(Number(value)) == value && 
               !isNaN(parseInt(value, 10));
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }
    //seconds for stair (PERSON USE)
    var sps = Number(at) * 0.10;
    var sps2 = Number(at2) * 0.10;
    // document.getElementById('addedTime').innerHTML = sps + ' time added';
    // document.getElementById('time2').innerHTML = sps2 + ' time added';
    // document.getElementById('tot').innerHTML = (sps+sps2) + ' time added';

    //time (PERSON USE)
    tim =(total/spe)*(1/60);
    tim = round(tim+sps+sps2,0)
    document.getElementById('time').innerHTML = tim + ' min';

    //creates the current time and displays  (PERSON USE)
    var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        a =  h + ":" + m + ":" + s+"   "+a;

    //round numbers method
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
    //method used to get current time
    function checkTime(i) {
        if( i < 10 ) {
        i = "0" + i;
        }
        return i;
        }
}

//live event
function startTime() {
    //gets users input for wished arrival time
    var ic = document.getElementById('arrival').value;
    var tt;
    var tt2;

    //gets the current time 
    var date = new Date();
    var datep2 = new Date(date);

    date.setMinutes(date.getMinutes() + parseInt(tim));
    datep2.setMinutes(datep2.getMinutes() + parseInt(tim)+2);
    
    hour = date.getHours();
    minute = checkTime(date.getMinutes());
    ss = checkTime(date.getSeconds());

    hour2 = datep2.getHours();
    minute2 = checkTime(datep2.getMinutes());
    ss2 = checkTime(datep2.getSeconds());

    if(hour==0){
        hour = 12;
    }if(hour2==0){
        hour2 = 12;
    }
    //method to get current time
    function checkTime(i) {
        if( i < 10 ) {
        i = "0" + i;
        }
        return i;
    }

    // date.setMinutes(d.getMinutes() + 10);

    if ( hour2 > 12 ) {
            hour2 = hour2 - 12;
        if ( hour2 == 12 ) {
            hour2 = checkTime(hour2);
            tt2 = hour2+":"+minute2+" AM";
            // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" AM";
        }else {
            hour2 = checkTime(hour2);
            tt2 = hour2+":"+minute2+" PM";
            // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" PM";     
        }
    }
    else {
        tt2 = hour2+":"+minute2+" AM";
        // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" AM";  
    } 

    //getting uses time input comparing to current time
    if ( hour > 12 ) {
            hour = hour - 12;
        if ( hour == 12 ) {
            hour = checkTime(hour);
            tt = hour+":"+minute+" AM";
            // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" AM";
        }else {
            hour = checkTime(hour);
            tt = hour+":"+minute+" PM";
            // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" PM";     
        }
    }
    else {
        tt = hour+":"+minute+" AM";
        // document.getElementById("clock").innerHTML = hour+":"+minute+":"+ss+" AM";  
    } 
  //AM/PM
    var apm1 = tt.slice(tt.indexOf(" "),tt.length);
    var apm2 = ic.slice(ic.indexOf(" "),ic.length);
    var apm3 = tt2.slice(tt2.indexOf(" "),tt2.length);

    //HH:MM
    var compspl1 = tt.slice(0,tt.indexOf(" "));
    var compspl2 = ic.slice(0,ic.indexOf(" "));
    var compspl3 = tt2.slice(0,tt2.indexOf(" "));

    //HH
    var hourspl1 = compspl1.slice(0,compspl1.indexOf(":"));
    var hourspl2 = checkTime(compspl2.slice(0,compspl2.indexOf(":")));
    var hourspl3 = compspl3.slice(0,compspl3.indexOf(":"));
   
    //makes ex.1 into 01 or 2 into02
    function checkTime(i) {
        if( i < 10 ) {
        i = "0" + i;
        }
        return i;
    }
    //MM
    var minspl1 = compspl1.slice(compspl1.indexOf(":")+1,compspl1.length);
    var minspl2 = compspl2.slice(compspl2.indexOf(":")+1,compspl2.length);
    var minspl3 = compspl3.slice(compspl3.indexOf(":")+1,compspl3.length);
    
            if((hourspl1 == parseInt(hourspl2)||hourspl3 == parseInt(hourspl2))
            &&(apm1.toLocaleLowerCase() == apm2.toLocaleLowerCase()
            ||apm3.toLocaleLowerCase() == apm2.toLocaleLowerCase())){

                if(parseInt(datep2.getMinutes())<minspl2){
                    document.getElementById("al").innerHTML = "On Time! No need to rush.";
                    document.getElementById("al").className = "alert alert-danger algreen";
                }
                
                //ex (current) 10:12 pm = (input) 10:10pm turns yellow
                //arrive with time to spare
                if((parseInt(datep2.getMinutes())>=minspl2)){
                    document.getElementById("al").innerHTML = "start walking, to arrive on time.";
                    document.getElementById("al").className = "alert alert-danger alyellow";
                
                }

                //ex (current) 10:10 pm = (input) 10:10pm turns red
                //arrive on time on the dot
                if(parseInt(date.getMinutes())>=minspl2 && minspl2!=NaN){
                    document.getElementById("al").innerHTML = "start walking. going to be late!";
                    document.getElementById("al").className = "alert alert-danger alred";
                }
        }else{
            document.getElementById("al").innerHTML = "On Time! No need to rush.";
            document.getElementById("al").className = "alert alert-danger algreen";
        }    
           

    var time = setTimeout(startTime,1000);
}

//current loaction method doesnt work
function getLocation() {
    // var x;
    // function getLocation() {
    //     if (navigator.geolocation) {
    //     document.getElementById("start").value = 34.0666664 ,  -118.167332664;
    //         navigator.geolocation.watchPosition(showPosition);
    //     } else { 
    //         x = "Geolocation is not supported by this browser.";}
    //     } 
        
    // function showPosition(position) {
    //     // lat: 34.0666664 , lng: -118.167332664
    //     x= position.coords.latitude +","+ position.coords.longitude;
        
    // }
}
