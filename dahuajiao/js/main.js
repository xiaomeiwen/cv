try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new window.AudioContext();
} catch (e) {
    console.log("No Web Audio API support");
}

var audio = document.querySelector("audio"),
canvas = document.getElementById('spectrograph'),
canvasContext = canvas.getContext('2d'),
playhead = document.getElementById("playhead"),
button = document.getElementsByTagName("button")[0],
playpause = document.getElementById("playpause"),
lefttoplay = document.getElementById("lefttoplay"),
righttoplay = document.getElementById("righttoplay"),
lefttopause = document.getElementById("lefttopause"),
righttopause = document.getElementById("righttopause");
var analyser;

audio.controls = true;
audio.loop = true;
audio.style.display = "none";

function startstop(){
  if (audio.paused) {
		audio.play();
		lefttopause.beginElement();
		righttopause.beginElement();
	} else { 
		audio.pause();
		lefttoplay.beginElement();
		righttoplay.beginElement();
	}	
}

button.addEventListener('click',function(){
	startstop();
});

button.addEventListener('touchend', function() {
    startstop();
});

audio.addEventListener('loadedmetadata',function(){
    playhead.max = audio.duration;
    audio.play();
    audioPercentage = 100 / audio.duration;
});

window.addEventListener("load", initPlayer, false);

function spectrumLooper(){
  window.requestAnimationFrame(spectrumLooper);
    var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyArray);
    canvas.width = canvas.width;
    const bars = 150,
    halvsies = canvas.height / 2;
    for (var i = 0; i < bars; i++){
        var barWidth = Math.ceil(canvas.width / bars),
        barX = i * barWidth,
        barHeight = frequencyArray[i]/2;
      canvasContext.fillStyle = "hsl("+200+i+",80%,60%)";
      canvasContext.fillRect(barX, halvsies, barWidth, barHeight);
      canvasContext.fillStyle = "#002D3C";
      canvasContext.fillRect(barX, halvsies, barWidth, barHeight - barWidth);
      canvasContext.fillStyle = "hsl("+200+i+",80%,60%)";
      canvasContext.fillRect(barX, halvsies, barWidth, -(barHeight));
      canvasContext.fillStyle = "#002D3C";
      canvasContext.fillRect(barX, halvsies, barWidth, -(barHeight) + barWidth);
    }
	playhead.value = audio.currentTime;
  button.style.transform = "translateX("+ ((audioPercentage * audio.currentTime) - 1) +"vw)";
}

function initPlayer(){
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    spectrumLooper();
}
fullpage.initialize('#fullpage', {
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
		menu: '#menu',
		css3:true,
        navigation:true
});