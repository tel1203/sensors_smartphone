window.addEventListener("load", function(eve) {
/*
  setInterval(function() {
    setTimeout(function(marker.invisible(), 2500);
  }, 5000);
*/
  makeGMap("gmap", [34.66, 135.16]).then(
    function(result) {
      var map = result;
      var marker = makeBlinkMarker(map);
    },
    function(e) {
    }
  );


}, false);

function makeGMap(id, curPosition) {
    return new Promise(function(resolve, reject){
    //    curPosition = [34.669969, 135.163364];
    
        var mapDiv = document.getElementById(id);
        var mapOptions = {
            center: new google.maps.LatLng(curPosition[0], curPosition[1]),
            zoom: 13,
        };
        map = new google.maps.Map(mapDiv, mapOptions);
        console.log("GMap initialize finish", map);
        resolve(map);
    });
}

function makeBlinkMarker(map) {
  var marker = positionMarker;

  marker.init(map, {"latitude":34.66, "longitude":135.16, "accuracy":300});
  setInterval(function() {
    marker.visible();
    getGPSStatus().then(
    function(result) {
      marker.refresh(result);
      map.panTo(new google.maps.LatLng(result['latitude'], result['longitude']));
    },
    function(e) {
    }
    )
    setTimeout(function() {
      marker.invisible()
    }, 2000);
  }, 4000);

  return (marker);
}


var positionMarker = {
    marker: null,
    init: function(map, position) {
      this.marker = new google.maps.Circle({
          map: map,
          center: new google.maps.LatLng(position['latitude'], position['longitude']),
          radius: position['accuracy'], // 単位はメートル
          strokeColor: '#0088ff',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#0088ff',
          fillOpacity: 0.2
      })
    },
    refresh: function(position) {
      this.marker.setCenter(new google.maps.LatLng(position['latitude'], position['longitude']));
      this.marker.setRadius(position['accuracy']);
    },
    visible: function() {
      this.marker.setVisible(true);
    },
    invisible: function() {
      this.marker.setVisible(false);
    }
};


function drawPosition(map, position, drawFlag) {
      console.log(map);
      console.log(position);
      console.log(drawFlag);

      var latitude = position['latitude'];
      var longitude = position['longitude'];
      var accuracy = position['accuracy'];
  
      // 現在位置にピンをたてる
      var currentPos = new google.maps.LatLng(latitude, longitude);
      // 誤差を円で描く
      var positionMarker = new google.maps.Circle({
          map: map,
          center: currentPos,
          radius: accuracy, // 単位はメートル
          strokeColor: '#0088ff',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#0088ff',
          fillOpacity: 0.2
      });
    
      return function() {
        var latitude = position['latitude'];
        var longitude = position['longitude'];
        var accuracy = position['accuracy'];

        // 現在位置にピンをたてる
//        var currentPos = new google.maps.LatLng(latitude, longitude);
//        if (drawFlag == true) {
//          positionMarker.setVisible(true);
//        } else {
//          positionMarker.setVisible(false);
//        }
      };
    //}(map, {"latitude":34.66, "longitude":135.16, "accuracy":300}, true);
};


var _drawPosition = (function(map, position, drawFlag) {
return
    var latitude = position['latitude'];
    var longitude = position['longitude'];
    var accuracy = position['accuracy'];

    // 現在位置にピンをたてる
    var currentPos = new google.maps.LatLng(latitude, longitude);
    // 誤差を円で描く
    var positionMarker = new google.maps.Circle({
        map: map,
        center: currentPos,
        radius: accuracy, // 単位はメートル
        strokeColor: '#0088ff',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#0088ff',
        fillOpacity: 0.2
    });

    return function () {
        var latitude = position['latitude'];
        var longitude = position['longitude'];
        var accuracy = position['accuracy'];

        // 現在位置にピンをたてる
        var currentPos = new google.maps.LatLng(latitude, longitude);
        if (drawFlag == true) {
          positionMarker.setVisible(true);
        } else {
          positionMarker.setVisible(false);
        }
    };
}());

var counter = (function () {
    var cnt = 0;
 
    return function () {
        cnt += 1;
        console.log(cnt);
    };
}());

