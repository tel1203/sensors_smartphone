window.addEventListener("touchstart", function(event) {
console.log("touchstart");
  //同時にタッチされた数を取得
  var touchCount = event.touches.length;
 
  //タッチされた位置座標を取得
  //クライアント座標
  var clientX = event.touches[0].clientX;
  var clientY = event.touches[0].clientY;
  //ページ上の座標
  var pageX = event.touches[0].pageX;
  var pageY = event.touches[0].pageY;
  //画面上の座標
  var screenX = event.touches[0].screenX;
  var screenY = event.touches[0].screenY;

  $("#clientX").text(clientX);
  $("#clientY").text(clientY);
  $("#pageX").text(pageX);
  $("#pageY").text(pageY);
  $("#screenX").text(screenX);
  $("#screenY").text(screenY);

}, false);

var objSensorAccel = {
  xa: null,
  ya: null,
  za: null,
  xg: null,
  yg: null,
  zg: null
};
var sensorAccel = objSensorAccel; 
window.addEventListener("devicemotion", function(event) {
console.log("devicemotion");
    //加速度センサの3軸の値
    var xa = event.acceleration.x;
    var ya = event.acceleration.y;
    var za = event.acceleration.z;
     
    //重力加速度センサの3軸の値
    var xg = event.accelerationIncludingGravity.x;
    var yg = event.accelerationIncludingGravity.y;
    var zg = event.accelerationIncludingGravity.z;

    if (xa == null || ya == null || za == null) {
      return;
    }
    sensorAccel.xa = xa;
    sensorAccel.ya = ya;
    sensorAccel.za = za;
    sensorAccel.xg = xg;
    sensorAccel.yg = yg;
    sensorAccel.zg = zg;

    $("#acclXa").text(xa.toFixed(2));
    $("#acclYa").text(ya.toFixed(2));
    $("#acclZa").text(za.toFixed(2));

    $("#acclXg").text(xg.toFixed(2));
    $("#acclYg").text(yg.toFixed(2));
    $("#acclZg").text(zg.toFixed(2));

}, false);



/*
alpha   ディスプレイ奥から手前方向      0～360
beta    ディスプレイ横軸と同方向        -90～90
gamma   ディスプレイ縦軸と同方向        -90～270
*/
var objSensorGyro = {
  alpha: null,
  beta: null,
  gamma: null
};
var sensorGyro = objSensorGyro; 
window.addEventListener("deviceorientation", function(event) {
console.log("deviceorientation");
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    if (alpha == null || beta == null || gamma == null) {
      return;
    }

    sensorGyro.alpha = alpha;
    sensorGyro.beta = beta;
    sensorGyro.gamma = gamma;
    $("#gyroA").text(alpha.toFixed(2));
    $("#gyroB").text(beta.toFixed(2));
    $("#gyroG").text(gamma.toFixed(2));
}, false);

setInterval(function() {
    getGPSStatus().then(
        function(result) {
        //  console.log("GPS:" + JSON.stringify(result));
        },
        function(e) {
        //  console.log("GPS: fail" + JSON.stringify(e));
        }
    )
}, 5000);

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
        reject(null);
    });
};
