status="";
function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(600,400);
video.size(600,400);
video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',model_loaded);
    document.getElementById("status").innerHTML="status = object detecting";
o=document.getElementById("object_name").value;
}

function model_loaded(){
    console.log("model_loaded")
    status=true;
}

function draw(){
    image(video,0,0,600,400)
}