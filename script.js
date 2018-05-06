var video = document.getElementById('video');
var playBtn = document.getElementById('play-pause');
var controls = document.querySelector('.controls');
var scrollBar = document.getElementById('scrollBar');
var time = document.querySelector('.currentTime');
var volume = document.getElementById('volume');
var currentMinutes = Math.floor(video.currentTime/60);
var currentSeconds = video.currentTime - (currentMinutes * 60);
time.innerHTML = currentMinutes + ':'+ currentSeconds + '/' + video.duration;

scrollBar.addEventListener('change', changeCurrentTime);
volume.addEventListener('change', changeVolume);
playBtn.addEventListener('click', playVideo);
// video.addEventListener('mouseover', showControls);
// video.addEventListener('mouseout', hideControls);

function changeVolume() {
	video.volume = this.value / 100;
}
function changeCurrentTime() {
	video.currentTime = video.duration / 100 * this.value;
	time.innerHTML = video.currentTime + '/' + video.duration;
}
function showControls() {
	controls.style.visibility = 'visible';
}
function hideControls() {
	controls.style.visibility = 'hidden';
}
function playVideo() {
	video.play();
	this.removeEventListener('click', playVideo);
	this.addEventListener('click', pauseVideo);
	this.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pauseVideo() {
	video.pause();
	this.removeEventListener('click', pauseVideo);
	this.addEventListener('click', playVideo);
	this.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}