window.addEventListener("load",function(eve){
/* */
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    chartAccelA = createChartGraphAcclA();
    setInterval(function () {
      var t = (new Date()).getTime(); // current time
      var xa = sensorAccel.xa;
      var ya = sensorAccel.ya;
      var za = sensorAccel.za;
      chartAccelA.series[0].addPoint([t, xa], false, true);
      chartAccelA.series[1].addPoint([t, ya], false, true);
      chartAccelA.series[2].addPoint([t, za], false, true);
    }, 100);
    setInterval(function () {
      chartAccelA.redraw();
    }, 1000);

    chartGyro = createChartGraphGyro();
    setInterval(function () {
      var t = (new Date()).getTime(); // current time
      var alpha = sensorGyro.alpha;
      var beta = sensorGyro.beta;
      var gamma = sensorGyro.gamma;
      chartGyro.series[0].addPoint([t, alpha], false, true);
      chartGyro.series[1].addPoint([t, beta], false, true);
      chartGyro.series[2].addPoint([t, gamma], false, true);
    }, 100);
    setInterval(function () {
      chartGyro.redraw();
    }, 1000);
}, false);

function createChartGraphAcclA() {
    var chart = new Highcharts.Chart({ // [1]
        chart: {
            renderTo: 'graphAcclA',
            type: 'spline', 
            marginRight: 10,
        },
        credits: {
             enabled: false
         },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 200
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#ff0000'
            },
            {
                value: 0,
                width: 1,
                color: '#00ff00'
            },
            {
                value: 0,
                width: 1,
                color: '#0000ff'
            }],
            max: 10,
            min: -10
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Xa',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }, {
            name: 'Ya',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }, {
            name: 'Za',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }]
    });

  return(chart);
}

function createChartGraphGyro() {
    var chart = new Highcharts.Chart({ // [1]
        chart: {
            renderTo: 'graphGyro',
            type: 'spline', 
            marginRight: 10,
        },
        credits: {
             enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 200
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#ff0000'
            },
            {
                value: 0,
                width: 1,
                color: '#00ff00'
            },
            {
                value: 0,
                width: 1,
                color: '#0000ff'
            }],
            max: 360,
            min: 0
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Xa',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }, {
            name: 'Ya',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }, {
            name: 'Za',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                // Initial data 
                for (i = -49; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            }()),
            lineWidth: 1,
            marker: {
              radius: 2,
              symbol: "square",
              enabled: false
            }
        }]
    });

  return(chart);
}

