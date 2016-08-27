window.addEventListener("load",function(eve){                                                                
    setInterval(function() {
        getGPSStatus().then(
            function(result) {
              var text = "(" +
                "Lat:"+result["latitude"].toFixed(4)+", "+
                "Lon:"+result["longitude"].toFixed(4)+") "+
                (result["accuracy"] != null ? "(Acc:"+result["accuracy"].toFixed(2)+"m) " : "") +
                (result["altitude"] != null ? "Alt:"+result["altitude"]+"m " : "") +
                (result["altitudeAccuracy"] != null ?
                  "(Acc:"+result["altitudeAccuracy"].toFixed(2)+"m) " : "") +
                (result["speed"] != null ? "Speed:"+result["speed"]+") " : "") +
                (result["heading"] != null ? "Heading:"+result["heading"]+") " : "") +
                "";
//                console.log("GPS:" + JSON.stringify(result));
                $("#location").text(text);
            },
            function(e) {
            //  console.log("GPS: fail" + JSON.stringify(e));
              $("#location").text("no data");
            }
        )
    }, 5000);
}, false);
    
function getGPSStatus() {
    return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var result = [];
                var data = position.coords;
                result["latitude"] = data.latitude;
                result["longitude"] = data.longitude;
                result["altitude"] = data.altitude;
                result["accuracy"] = data.accuracy;
                result["altitudeAccuracy"] = data.altitudeAccuracy;
                result["heading"] = data.heading ;    //0=北,90=東,180=南,270=西
                result["speed"] = data.speed ;

                resolve(result);
            }, function(error) {
                switch (error.code) {
                   case 1:
                       // 位置情報の利用が許可されていません
                       break;
                   case 2:
                       // デバイスの位置が判定できません
                       break;
                   case 3:
                       // タイムアウト
                       break;
                   default:
                       // APIが未対応
                }
                reject(error.code);
            });
        } else {
            reject(null);
        }
    });
};


