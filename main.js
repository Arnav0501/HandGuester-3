Webcam.set({
    width:350,
    height:350,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );


function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EZqgrhKyA/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}


function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first predition is " + prediction_1;
    speak_data_2 = "And the second predition is " + prediction_2;
    var utterThis =new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}


function gotResult(error, results){
if (error) {
    console.error(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
   prediction_1 = results[0].label;
   prediction_2 = reults[1].label;
   speak();

   if(results[0].label == "thumbs up")
   {
    document.getElementById("update_emoji").innerHTML = "&#128077;";
   }

   if(results[0].label == "waving")
   {
    document.getElementById("update_emoji").innerHTML = "&#128075;";
   }

   if(results[0].label == "pointing")
   {
    document.getElementById("update_emoji").innerHTML = "&#128070;";
   }

   if(results[1].label == "thumbs up")
   {
    document.getElementById("update_emoji").innerHTML = "&#128077;";
   }

   if(results[1].label == "waving")
   {
    document.getElementById("update_emoji").innerHTML = "&#128075;";
   }

   if(results[1].label == "pointing")
   {
    document.getElementById("update_emoji").innerHTML = "&#128070;";
   }
}
}