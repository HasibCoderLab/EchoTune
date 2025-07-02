const song = document.getElementById('song');
const songImage = document.getElementById('songImage');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songSource = document.getElementById('songSource');
const progress = document.getElementById('progress');
const ctrlIcon = document.getElementById('ctrlIcon');
const playlistEl = document.getElementById('playlist');
const search = document.getElementById('search');
const shuffleIcon = document.getElementById('shuffleIcon');
const repeatIcon = document.getElementById('repeatIcon');
const fileInput = document.getElementById('fileInput');

const songs = [
  {
    title: "Broken Angel",
    artist: "Arash ft. Helena",
    src: "media/Music/Arash feat. Helena - Broken Angel.mp3",
    image: "media/images/Photo1.png"
  },
  {
    title: "Aashiq Banaya Aapne",
    artist: "Diya Ghosh",
    src: "media/Music/Aashiq Banaya Aapne.mp3",
    image: "media/images/Photo2.png"
  },
  {
    title: "Dil Ne Ye Ka",
    artist: "Girl",
    src: "media/Music/Dil Ne Ye Ka.mp3",
    image: "media/images/Photo3.png"
  }
];

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
  const s = songs[index];
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  songSource.src = s.src;
  songImage.src = s.image;
  song.load();
}
loadSong(currentSong);

function playPause() {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.replace('bx-play', 'bx-pause');
  } else {
    song.pause();
    ctrlIcon.classList.replace('bx-pause', 'bx-play');
  }
}

song.onloadedmetadata = () => progress.max = song.duration;

setInterval(() => {
  progress.value = song.currentTime;
}, 500);

progress.onchange = () => {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.replace("bx-play", "bx-pause");
};

function nextSong() {
  if (isShuffle) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
  song.play();
  ctrlIcon.classList.replace("bx-play", "bx-pause");
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  song.play();
  ctrlIcon.classList.replace("bx-play", "bx-pause");
}

function togglePlaylist() {
  playlistEl.classList.toggle('hidden');
}

function renderPlaylist(filter = "") {
  playlistEl.innerHTML = "";
  songs
    .filter(s => s.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((s, index) => {
      const item = document.createElement("div");
      item.textContent = `${s.title} - ${s.artist}`;
      item.onclick = () => {
        currentSong = index;
        loadSong(currentSong);
        song.play();
        ctrlIcon.classList.replace("bx-play", "bx-pause");
      };
      playlistEl.appendChild(item);
    });
}
renderPlaylist();
search.addEventListener("input", (e) => renderPlaylist(e.target.value));

function toggleShuffle() {
  isShuffle = !isShuffle;
  shuffleIcon.style.color = isShuffle ? "#0ff" : "#00ffe588";
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatIcon.style.color = isRepeat ? "#0ff" : "#00ffe588";
}

song.addEventListener("ended", () => {
  if (isRepeat) {
    song.currentTime = 0;
    song.play();
  } else {
    nextSong();
  }
});

function downloadSong() {
  const link = document.createElement('a');
  link.href = songs[currentSong].src;
  link.download = songs[currentSong].title + ".mp3";
  link.click();
}

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    songTitle.textContent = file.name;
    songArtist.textContent = "Custom Upload";
    songImage.src = "media/images/default.png";
    songSource.src = url;
    song.load();
    song.play();
    ctrlIcon.classList.replace("bx-play", "bx-pause");
  }
});

function toggleMode() {
  document.body.classList.toggle('light-mode');
}
