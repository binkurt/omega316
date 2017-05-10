var counter= 1;
var inFullScreen=false;

window.onload= function(){
    document.addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            if (inFullScreen){
                inFullScreen=false;
                exitFullscreen();
            }else{
                inFullScreen=true;
                requestFullscreen();
            }
        }
    }, false);
    var spanCounter= document.getElementById("counter");
    setInterval(function(){
        counter++;
        spanCounter.innerHTML= counter;
    }, 1000);
};

var requestFullscreen = function () {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

var exitFullscreen = function () {
    if (document.documentElement.exitFullscreen) {
        document.documentElement.exitFullscreen();
    } else if (document.documentElement.webkitExitFullscreen) {
        document.documentElement.webkitExitFullscreen();
    } else if (document.documentElement.mozCancelFullScreen) {
        document.documentElement.mozCancelFullScreen();
    } else if (document.documentElement.msExitFullscreen) {
        document.documentElement.msExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

function toggleFullScreen() {
    if (document.hasOwnProperty(webkitFullscreenElement)) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.hasOwnProperty(mozFullscreenElement)) {
        document.documentElement.mozRequestFullscreen();
    } else {
        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
