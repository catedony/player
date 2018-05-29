const video = document.querySelector('.video');
const playBtn = document.querySelector('.play-pause-btn');
const controls = document.querySelector('.controls');
const scrollBar = document.querySelector('.scroll-bar');
const volume = document.querySelector('.volume');
const fullscreen = document.querySelector('.fullscreen');
const screenPlayBtn = document.querySelector('.screen-play-btn');

screenPlayBtn.addEventListener('click', playVideo);
fullscreen.addEventListener('click', runFullscreen);
scrollBar.addEventListener('change', changeCurrentTime);
volume.addEventListener('change', changeVolume);
playBtn.addEventListener('click', playVideo);
video.addEventListener('loadedmetadata', displayTiming);
video.addEventListener('loadedmetadata', setCurrentTime);
video.addEventListener('canplaythrough', setVolume);
video.addEventListener('timeupdate', displayTiming);
video.addEventListener('timeupdate', setCurrentTime);
video.addEventListener('mouseover', showControls);
video.addEventListener('click', pauseVideo);
controls.addEventListener('mouseover', showControls);
video.addEventListener('mouseout', hideControls);
controls.addEventListener('mouseout', hideControls);

let runFullscreen = () => {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
};
let displayTiming = () => {
	let time = document.querySelector('.current-time');
	let currentMinutes = Math.floor(video.currentTime/60);
	let currentSeconds = Math.floor(video.currentTime - (currentMinutes * 60));
	let durationMinutes = Math.floor(video.duration/60);
	let durationSeconds = Math.floor(video.duration - (durationMinutes * 60));
	time.innerHTML = currentMinutes + ':'+ currentSeconds + ' / ' + durationMinutes + ':'+ durationSeconds;
	};
let setCurrentTime = () => {
	scrollBar.value = Math.floor(1000 / video.duration * video.currentTime);
};

let setVolume = () =>	volume.value = video.volume * 100;

let changeVolume = () => {
	video.volume = this.value / 100;
	var icon = document.querySelector('.volume-icon');
	if (video.volume == 0) {
			icon.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>';
	} else {
		icon.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
	}
};
let changeCurrentTime = () => video.currentTime = video.duration / 1000 * this.value;

let showControls = () => controls.style.visibility = 'visible';

let hideControls = () =>	controls.style.visibility = 'hidden';

let playVideo = () => {
	video.play();
	screenPlayBtn.style.display = 'none';
	playBtn.removeEventListener('click', playVideo);
	playBtn.addEventListener('click', pauseVideo);
	playBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
};

let pauseVideo = () => {
	video.pause();
	screenPlayBtn.style.display = 'block';
	playBtn.removeEventListener('click', pauseVideo);
	playBtn.addEventListener('click', playVideo);
	playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
};