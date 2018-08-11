# test flask app

## description
I am making this app to figure out how to work with a data stream

* I am simulating the program receiving a data stream in 
* in my simulation instead of reading from the stream I am reading in the time at 100Hz)
* I need python to be able to simultaneously handle a data stream in, and pass this data stream on to a web application


## tools
* flask (duh)
* time.time()
* plotly.js


Unfortunately chartist.js is not good enough here is the old plotting code
```
let chart = new Chartist.Line('.ct-chart', {series: [[0,1]]}, {showPoint:false});    
function updatePlot(x) {
  chart.update({series: [x]}, {showPoint: false});
}
```