img = "";
model_status = "";
objects = [];

function preload() {
    music = loadSound("clock_alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    ObjectDetection = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded Successfully");
    model_status = true;

}

function getResults(e, r) {
    if (e) {
        console.error(e);
    } else {
        objects = r;
        console.log(r);
    }

}




function draw() {
    image(video, 0, 0, 380, 380);

    if (model_status != "") {
        ObjectDetection.detect(video, getResults);
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status: Object Detected";
            object_name = objects[i].label;
            if (object_name == "person") {
                document.getElementById("obj_detect").innerHTML = "Status: Baby Found";
                music.stop
            } else {
                document.getElementById("obj_detect").innerHTML = "Status: Baby Not Found";
                music.play();

            }

        }

    if (objects.length<0){
        document.getElementById("obj_detect").innerHTML = "Status: Baby Not Found";
                music.play();
    }
    }

}