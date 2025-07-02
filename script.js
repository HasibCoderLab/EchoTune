const song = document.getElementById('song');
const progress = document.getElementById('progress');
const ctrlIcon = document.getElementById('ctrlIcon');

// Set time after audio is loaded
song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

// Play/Pause toggle
function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.remove('bx-play');
    ctrlIcon.classList.add('bx-pause');
  } else {
    song.pause();
    ctrlIcon.classList.remove('bx-pause');
    ctrlIcon.classList.add('bx-play');
  }
}

// Progress bar update
setInterval(() => {
  progress.value = song.currentTime;
}, 500);

// Set time when scrubbing
progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.remove('bx-play');
  ctrlIcon.classList.add('bx-pause');
};
