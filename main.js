status="";
object=[];
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
object_name=document.getElementById("object_name").value;
}

function model_loaded(){
    console.log("model_loaded")
    status=true;
}
 
function got_result(error,result){
if(error){
    console.error(error);
}
else{
    console.log(result);
object=result;
}
}

function draw(){
    image(video,0,0,600,400)

    if(status!=""){
objectDetector.detect(video,got_result);

        for(var i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status = object detected"
            fill('#2fa199');
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke('#2fa199');
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(got_result);
                document.getElementById("object_status").innerHTML=object_name+" found";
synth=window.speechSynthesis;
utterthis=new SpeechSynthesisUtterance(object_name+" found");
synth.speak(utterthis);
            }
            else{
                document.getElementById("object_status").innerHTML=object_name+" not found";
            }
        }
    }
}