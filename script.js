var video = document.querySelector('.video');
var playBtn = document.querySelector('.play-pause-btn');
var controls = document.querySelector('.controls');
var scrollBar = document.querySelector('.scroll-bar');
var time = document.querySelector('.current-time');
var volume = document.querySelector('.volume');
var fullscreen = document.querySelector('.fullscreen');

fullscreen.addEventListener('click', runFullscreen);
scrollBar.addEventListener('change', changeCurrentTime);
volume.addEventListener('change', changeVolume);
playBtn.addEventListener('click', playVideo);
video.addEventListener('loadedmetadata', displayTiming);
video.addEventListener('loadedmetadata', setCurrentTime);
video.addEventListener('canplaythrough', setVolume);
video.addEventListener('timeupdate', displayTiming);
video.addEventListener('timeupdate', setCurrentTime);
// video.addEventListener('mouseover', showControls);
// video.addEventListener('mouseout', hideControls);

function runFullscreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
}
function displayTiming() {
	var currentMinutes = Math.floor(video.currentTime/60);
	var currentSeconds = Math.floor(video.currentTime - (currentMinutes * 60));
	var durationMinutes = Math.floor(video.duration/60);
	var durationSeconds = Math.floor(video.duration - (durationMinutes * 60));
	time.innerHTML = currentMinutes + ':'+ currentSeconds + ' / ' + durationMinutes + ':'+ durationSeconds;
	}
function setCurrentTime() {
	scrollBar.value = Math.floor(1000 / video.duration * video.currentTime);
}
function setVolume() {
	volume.value = video.volume * 100;
}
function changeVolume() {
	video.volume = this.value / 100;
	var icon = document.querySelector('.volume-icon');
	if (video.volume == 0) {
			icon.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
	} else {
		icon.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
	}
}
function changeCurrentTime() {
	video.currentTime = video.duration / 1000 * this.value;
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