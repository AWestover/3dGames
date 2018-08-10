
Webcam.set({
  width: 300, 
  height: 300,
  image_format: "jpeg",
  jpeg_quality: 90
});

Webcam.attach('#webcam');
function takeScreenshot()
{
    Webcam.snap(function(data_uri){
      document.getElementById('results').innerHTML = '<img src='+data_uri+'>';
      $.post("/upload", {"data_uri": data_uri}, function(data)
        {
            alert("posted");
            let imgPath = data["path"];
            $("body").append("<img src='" + imgPath + "'>");
        });
    })
}
