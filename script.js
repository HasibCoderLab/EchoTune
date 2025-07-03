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

// ✅ Live Clock Setup
const clockEl = document.createElement('div');
clockEl.id = "liveClock";
clockEl.style.textAlign = "center";
clockEl.style.fontSize = "14px";
clockEl.style.color = "#00ffe5";
clockEl.style.marginTop = "10px";
document.querySelector(".music-player").appendChild(clockEl);

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("liveClock").textContent = `🕒 ${timeString}`;
}
setInterval(updateClock, 1000);
updateClock();


const songs = [
  {
    title: "Broken Angel",
    artist: "Arash ft. Helena",
    src: "media/Music/Arash feat. Helena - Broken Angel.mp3",
    image: "media/images/Photo-1.png"
  },
  {
    title: "Aashiq Banaya Aapne",
    artist: "Diya Ghosh",
    src: "media/Music/Aashiq Banaya Aapne.mp3",
    image: "media/images/Photo-2.jpeg"
  },
  {
    title: "Dil Ne Ye Ka",
    artist: "Girl",
    src: "media/Music/Dil Ne Ye Ka.mp3",
    image: "media/images/Photo-3.jpeg"
  }
];

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
  const s = songs[index];
  song.pause();
  songTitle.textContent = s.title;
  songArtist.textContent = s.artist;
  songSource.src = s.src;
  songImage.src = s.image || "media/images/default.png";
  song.load();
  updateProgress(0);
  playPause(true);
}
loadSong(currentSong);

function playPause(forcePlay = false) {
  if (song.paused || forcePlay) {
    song.play().then(() => {
      ctrlIcon.classList.replace('bx-play', 'bx-pause');
    }).catch(e => {
      console.warn("Play prevented:", e);
    });
  } else {
    song.pause();
    ctrlIcon.classList.replace('bx-pause', 'bx-play');
  }
}

function updateProgress(value) {
  progress.value = value;
}

song.addEventListener('loadedmetadata', () => {
  progress.max = song.duration;
});

song.addEventListener('timeupdate', () => {
  updateProgress(song.currentTime);
});

progress.addEventListener('input', () => {
  song.currentTime = progress.value;
});

function nextSong() {
  if (isShuffle) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentSong && songs.length > 1);
    currentSong = newIndex;
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
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
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    song.pause();
    songTitle.textContent = file.name;
    songArtist.textContent = "Custom Upload";
    songImage.src = "media/images/default.png";
    songSource.src = url;
    song.load();
    playPause(true);
  }
});

function toggleMode() {
  document.body.classList.toggle('light-mode');
}
