// Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const bar = document.getElementById("progress-bar");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volumeIcon");
const bg = document.getElementById("bg");

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const togglePlaylist = document.getElementById("togglePlaylist");

const modeBtn = document.getElementById("modeBtn");
const modeIcon = document.getElementById("modeIcon");

const playlistBox = document.getElementById("playlist");
const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");

/* Playlist with Categories */
const playlist = [
    {
        category: "Chainsawman",
        songs: [
            {
                title: "KICKBACK",
                artist: "米津玄師",
                src: "song1.mp3",
                cover: "cover1.jpg"
            },
            {
                title: "IRIS OUT",
                artist: "米津玄師",
                src: "song2.mp3",
                cover: "cover2.jpg"
            },
            {
                title: "JANE DOE",
                artist: "米津玄師, 宇多田ヒカル",
                src: "song3.mp3",
                cover: "cover3.jpg"
            }
        ]
    },
    {
        category: "Frieren",
        songs: [
            {
                title: "Yuusha",
                artist: "YOASOBI",
                src: "song4.mp3",
                cover: "cover4.jpg"
            },
            {
                title: "Haru",
                artist: "ヨルシカ",
                src: "song5.mp3",
                cover: "cover5.jpg"
            },
            {
                title: "Anytime Anywhere",
                artist: "milet",
                src: "song6.mp3",
                cover: "cover6.jpg"
            },
            {
                title: "lulu.",
                artist: "Mrs. GREEN APPLE",
                src: "song21.mp3",
                cover: "cover21.jpg"
            },
            {
                title: "The Story of Us",
                artist: "milet",
                src: "song22.mp3",
                cover: "cover22.jpg"
            },
            {
                title: "Bliss",
                artist: "milet",
                src: "song23.mp3",
                cover: "cover23.jpg"
            }
        ]
    },
    {
        category: "orb:on the movements of the earth",
        songs: [
            {
                title: "Kaijuu",
                artist: "Sakanaction",
                src: "song7.mp3",
                cover: "cover7.jpg"
            },
            {
                title: "Aporia",
                artist: "ヨルシカ",
                src: "song8.mp3",
                cover: "cover8.jpg"
            }
        ]
    },
    {
        category: "Zom 100",
        songs: [
            {
                title: "Song Of The Dead",
                artist: "KANA-BOON",
                src: "song9.mp3",
                cover: "cover9.jpg"
            },
            {
                title: "ハピネス オブ ザ デッド",
                artist: "シユイ",
                src: "song10.mp3",
                cover: "cover10.jpg"
            }
        ]
    },
    {
        category: "Call of the Night",
        songs: [
            {
                title: "Daten",
                artist: "Creepy Nuts",
                src: "song11.mp3",
                cover: "cover11.jpg"
            },
            {
                title: "Yofukashino Uta",
                artist: "Creepy Nuts",
                src: "song12.mp3",
                cover: "cover12.jpg"
            },
            {
                title: "Mirage",
                artist: "Creepy Nuts",
                src: "song13.mp3",
                cover: "cover13.jpg"
            },
            {
                title: "Nemure",
                artist: "Creepy Nuts",
                src: "song14.mp3",
                cover: "cover14.jpg"
            }
        ]
    },
    {
        category: "Delicious in Dungeon",
        songs: [
            {
                title: "Sleep Walking Orchestra",
                artist: "BUMP OF CHICKEN",
                src: "song151.mp3",
                cover: "cover15.jpg"
            },
            {
                title: "Party!!",
                artist: "Ryokuoushoku Shakai",
                src: "song16.mp3",
                cover: "cover16.jpg"
            },
            {
                title: "Unmei",
                artist: "Sumika",
                src: "song17.mp3",
                cover: "cover17.jpg"
            },
            {
                title: "Twinkling Ash",
                artist: "Regal Lily",
                src: "song18.mp3",
                cover: "cover18.jpg"
            }
        ]
    },
    {
        category: "Violet Evergarden",
        songs: [
            {
                title: "Sincerely",
                artist: "TRUE",
                src: "song19.mp3",
                cover: "cover19.jpg"
            },
            {
                title: "Michishirube",
                artist: "Minori Chihara",
                src: "song20.mp3",
                cover: "cover20.jpg"
            }
        ]
    }
];

// Flatten songs for easier access
const songs = playlist.flatMap(cat => cat.songs);
let index = 0;

/* ========== Audio Context & Analyser Setup ========== */
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let source = null;
let analyser = null;

function initAudioContext() {
    if (!source) {
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.8;

        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        drawWave();
    }

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

/* ========== Minimal Mirror Waveform (Left-Right) ========== */
const bufferLength = 32;
const dataArray = new Uint8Array(bufferLength);

function drawWave() {
    requestAnimationFrame(drawWave);

    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    // Clear canvas with transparency
    const isDark = !document.body.classList.contains('light');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const barWidth = (canvas.width / 2) / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height * 0.7);
        const y = (canvas.height - barHeight) / 2;
        
        // Gradient color
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#1ed760');
        gradient.addColorStop(0.5, '#1db954');
        gradient.addColorStop(1, '#169c46');
        
        ctx.fillStyle = gradient;
        
        const roundRadius = barWidth / 3;
        
        // Right side bars
        const xRight = centerX + (i * barWidth);
        ctx.beginPath();
        ctx.roundRect(xRight, y, barWidth - 2, barHeight, roundRadius);
        ctx.fill();
        
        // Left side bars (mirror)
        const xLeft = centerX - ((i + 1) * barWidth);
        ctx.beginPath();
        ctx.roundRect(xLeft, y, barWidth - 2, barHeight, roundRadius);
        ctx.fill();
    }
}

/* ========== Load Song (with smooth background fade) ========== */
function loadSong(i) {
    const s = songs[i];
    
    // Smooth transition for background
    bg.style.opacity = 0;
    
    setTimeout(() => {
        audio.src = s.src;
        cover.style.backgroundImage = `url(${s.cover})`;
        bg.style.backgroundImage = `url(${s.cover})`;
        title.textContent = s.title;
        artist.textContent = s.artist;
        
        // Fade back in if playing
        if (!audio.paused) {
            setTimeout(() => {
                bg.style.opacity = 1;
            }, 100);
        }
    }, 400);
    
    highlight();
}

/* ========== Play & Pause ========== */
function play() {
    initAudioContext();
    audio.play();
    
    // Toggle icons
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    
    // Add spinning animation
    cover.classList.add("playing");
    bg.style.opacity = 1;
}

function pause() {
    audio.pause();
    
    // Toggle icons
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    
    // Stop spinning animation
    cover.classList.remove("playing");
    bg.style.opacity = 0;
}

playBtn.onclick = () => (audio.paused ? play() : pause());

/* ========== Next / Prev ========== */
prev.onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    setTimeout(() => play(), 500);
};

next.onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    setTimeout(() => play(), 500);
};

/* ========== Progress Bar ========== */
audio.ontimeupdate = () => {
    if (audio.duration) {
        bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        current.textContent = format(audio.currentTime);
        duration.textContent = format(audio.duration);
    }
};

progress.onclick = (e) => {
    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    audio.currentTime = (clickX / progress.clientWidth) * audio.duration;
};

/* ========== Volume ========== */
function updateVolumeUI() {
    const value = volume.value * 100;
    const bgColor = document.body.classList.contains("light") ? "#ccc" : "#333";
    volume.style.background = `linear-gradient(to right, var(--green) ${value}%, ${bgColor} ${value}%)`;
}

volume.oninput = () => {
    audio.volume = volume.value;
    updateVolumeUI();

    if (volume.value == 0) {
        // mute icon
        volumeIcon.src = "https://upload.wikimedia.org/wikipedia/commons/8/85/Sound-off_black.png";
    } else {
        // normal sound icon
        volumeIcon.src = "https://pngimg.com/d/sound_PNG20.png";
    }
};


/* ========== Playlist Sidebar ========== */
togglePlaylist.onclick = () => {
    sidebar.classList.add("show");
    overlay.style.display = "block";
};

overlay.onclick = () => {
    sidebar.classList.remove("show");
    overlay.style.display = "none";
};

/* ========== Build Playlist with Categories ========== */
playlist.forEach((category, catIndex) => {
    // Create category header
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category-header";
    categoryDiv.textContent = category.category;
    categoryDiv.style.cursor = "pointer";
    categoryDiv.style.fontWeight = "bold";
    categoryDiv.style.marginTop = "15px";
    categoryDiv.style.marginBottom = "10px";
    categoryDiv.style.fontSize = "14px";
    categoryDiv.style.color = "var(--green)";
    
    playlistBox.appendChild(categoryDiv);
    
    // Create songs in this category
    let songCount = 0;
    category.songs.forEach((s, songIndex) => {
        const songList = songs.findIndex(song => song.title === s.title);
        
        const div = document.createElement("div");
        div.textContent = s.title;
        div.className = "playlist-song";
        div.style.paddingLeft = "20px";
        div.style.marginBottom = "8px";
        div.style.cursor = "pointer";
        div.style.fontSize = "13px";
        
        div.onclick = () => {
            index = songList;
            loadSong(index);
            setTimeout(() => {
                play();
                sidebar.classList.remove("show");
                overlay.style.display = "none";
            }, 500);
        };
        
        playlistBox.appendChild(div);
        songCount++;
    });
});

function highlight() {
    document.querySelectorAll(".playlist-song").forEach((d, i) => {
        d.classList.toggle("active", i === index);
    });
}

/* ========== Dark / Light Mode ========== */
modeBtn.onclick = () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        modeIcon.src = "https://www.svgrepo.com/show/432507/light-mode.svg";
    } else {
        modeIcon.src = "https://cdn-icons-png.flaticon.com/512/6714/6714978.png";
    }

    updateVolumeUI();
};

/* ========== Time Format ========== */
function format(time) {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
}

/* ========== Auto play next song ========== */
audio.onended = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    setTimeout(() => play(), 500);
};

/* ========== Initialize ========== */
loadSong(index);
audio.volume = 1;
updateVolumeUI();
drawWave();