
Webcam.set({
  width: 300, 
  height: 300,
  image_format: "jpeg",
  jpeg_quality: 90
});
Webcam.attach('#webcam');
let url;
function takeScreenshot()
{
    Webcam.snap(function(data_url){
      document.getElementById('results').innerHTML = '<img src='+data_url+'>';
      console.log(data_url);
      url = data_url;
    })
}

Webcam.upload( base64image, '/upload', function(code, text) {
 console.log(code);
 console.log(text);
});