music_1='';
music_2='';

leftWrist_x=0;
leftWrist_y=0;

rightWrist_x=0;
rightWrist_y=0;

leftWrist_score=0;
rightWrist_score=0;

song1_status="";//left if song 1 and right is song 2
song2_status="";

function preload() {
    music_1=loadSound('music.mp3');
    music_2=loadSound('music2.mp3');
}
function setup() {
    canvas=createCanvas(600,500);
    canvas.position(450);

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results){
    if (results.length>0) {
        console.log(results);
        leftWrist_x= results[0].pose.leftWrist.x;
        leftWrist_y= results[0].pose.leftWrist.y;

        console.log("leftWrist_x =" +leftWrist_x+ "leftWrist_y =" +leftWrist_y);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist_x =" +rightWrist_x+ "rightWrist_y =" +rightWrist_y);

        leftWrist_score=results[0].pose.keypoints[9].score;
        console.log("leftWrist_score = " + leftWrist_score);

        rightWrist_score=results[0].pose.keypoints[10].score;
        console.log("rightWrist_score = " + rightWrist_score);
    }

}

function draw() {
    image(video, 0,0,600,500);

	song1_status = music_1.isPlaying();
	song2_status = music_2.isPlaying();

    fill("#eb4034");
    stroke("#eb4034");
    
    if (leftWrist_score>0.2) {

        music_2.stop()
    if (song1_status==false) {
           music_1.play();
        document.getElementById("song_name").innerHTML='Playing - Harry Potter Theme Song';
    }

    }

    if (rightWrist_score>0.2) {

        music_1.stop()
    if (song2_status==false) {
           music_2.play();
        document.getElementById("song_name").innerHTML='Playing - Peter Pan Song';
    }

    }
    
}