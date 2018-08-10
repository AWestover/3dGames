
Webcam.set({
  width: 300, 
  height: 300,
  image_format: "jpeg",
  jpeg_quality: 90
});

Webcam.attach('#webcam');
function takeScreenshot()
{
  $.notify("Picture submitted to be altered")
  Webcam.snap(function(data_uri){
    document.getElementById('results').innerHTML = '<img src='+data_uri+'>';
    $.post("/upload", {"data_uri": data_uri}, function(data)
      {
          $.notify("Your face has arrived");
          let imgPath = data["path"];
          $("body").append("<img src='" + imgPath + "'>");
          window.scrollTo(0,document.body.scrollHeight);
      });
  })
}
