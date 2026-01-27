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
const miniplayerBtn = document.getElementById("miniplayerBtn");

// Mini player window reference
let miniPlayerWindow = null;


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
                src: "song15.mp3",
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
let isLoadingSong = false; // Flag to prevent multiple simultaneous loads

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

/* ========== Load Song (IMPROVED with error handling) ========== */
function loadSong(i, autoplay = false) {
    if (isLoadingSong) return; // Prevent multiple simultaneous loads
    isLoadingSong = true;
    
    const s = songs[i];
    
    // Stop current playback and reset
    const wasPlaying = !audio.paused;
    audio.pause();
    audio.currentTime = 0;
    
    // Reset progress bar
    bar.style.width = "0%";
    current.textContent = "0:00";
    
    // Remove playing state
    cover.classList.remove("playing");
    
    // Smooth transition for background
    bg.style.opacity = 0;
    
    setTimeout(() => {
        // Update UI
        cover.style.backgroundImage = `url(${s.cover})`;
        bg.style.backgroundImage = `url(${s.cover})`;
        title.textContent = s.title;
        artist.textContent = s.artist;
        
        // Load new audio
        audio.src = s.src;
        audio.load();
        
        // When audio is ready to play
        audio.oncanplaythrough = () => {
            isLoadingSong = false;
            
            if (autoplay || wasPlaying) {
                play().catch(err => {
                    console.error("Playback failed:", err);
                    pause();
                });
            }
        };
        
        // Handle loading errors
        audio.onerror = () => {
            console.error("Error loading audio:", s.src);
            isLoadingSong = false;
            pause();
            
            // Try to play next song after error
            setTimeout(() => {
                if (index < songs.length - 1) {
                    next.click();
                }
            }, 1000);
        };
        
        // Fade back in if was playing
        if (wasPlaying || autoplay) {
            setTimeout(() => {
                bg.style.opacity = 1;
            }, 100);
        }
    }, 400);
    
    highlight();
}

/* ========== Play & Pause (IMPROVED with error handling) ========== */
function play() {
    return new Promise((resolve, reject) => {
        initAudioContext();
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Toggle icons
                    playIcon.style.display = "none";
                    pauseIcon.style.display = "block";
                    
                    // Add spinning animation
                    cover.classList.add("playing");
                    bg.style.opacity = 1;
                    
                    resolve();
                })
                .catch(error => {
                    console.error("Play failed:", error);
                    
                    // Reset UI on error
                    playIcon.style.display = "block";
                    pauseIcon.style.display = "none";
                    cover.classList.remove("playing");
                    
                    reject(error);
                });
        }
    });
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

playBtn.onclick = () => {
    if (audio.paused) {
        play().catch(err => console.error("Playback error:", err));
    } else {
        pause();
    }
};

/* ========== Next / Prev (IMPROVED) ========== */
prev.onclick = () => {
    if (isLoadingSong) return; // Prevent spam clicking
    
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index, true);
};

next.onclick = () => {
    if (isLoadingSong) return; // Prevent spam clicking
    
    index = (index + 1) % songs.length;
    loadSong(index, true);
};

/* ========== Progress Bar ========== */
audio.ontimeupdate = () => {
    if (audio.duration && !isNaN(audio.duration)) {
        bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        current.textContent = format(audio.currentTime);
        duration.textContent = format(audio.duration);
    }
};

progress.onclick = (e) => {
    if (!audio.duration || isNaN(audio.duration)) return;
    
    const rect = progress.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / progress.clientWidth) * audio.duration;
    
    audio.currentTime = newTime;
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
            if (isLoadingSong) return; // Prevent clicks during loading
            
            index = songList;
            loadSong(index, true);
            
            setTimeout(() => {
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

/* ========== Mini Player ========== */
miniplayerBtn.onclick = () => {
    if (miniPlayerWindow && !miniPlayerWindow.closed) miniPlayerWindow.close();
    const currentSong = songs[index];
    const currentTime = audio.currentTime;
    const isPlaying = !audio.paused;
    const currentVolume = audio.volume;
    const isLightMode = document.body.classList.contains('light');
    const audioSrc = new URL(currentSong.src, window.location.href).href;
    const coverSrc = new URL(currentSong.cover, window.location.href).href;
    miniPlayerWindow = window.open('', 'miniPlayer', 'width=350,height=500,left=' + ((screen.width - 350) - 50) + ',top=50,resizable=yes,scrollbars=no');
    if (miniPlayerWindow) {
        miniPlayerWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Mini Player</title><style>:root{--bg:#121212;--card:#181818;--text:#fff;--sub:#b3b3b3;--green:#1db954;--progress-bg:#333}body.light{--bg:#f2f2f2;--card:#fff;--text:#000;--sub:#555;--progress-bg:#ddd}*{margin:0;padding:0;box-sizing:border-box}body{background:var(--bg);color:var(--text);font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;height:100vh;display:flex;flex-direction:column;overflow:hidden}.mini-header{padding:15px;background:linear-gradient(135deg,var(--green) 0%,#169c46 100%);display:flex;justify-content:space-between;align-items:center}.mini-header h2{font-size:16px;font-weight:bold;color:#fff}.header-buttons{display:flex;gap:8px}.theme-btn,.close-btn{background:rgba(255,255,255,0.2);border:none;color:white;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:16px;transition:all 0.2s;display:flex;align-items:center;justify-content:center}.theme-btn:hover,.close-btn:hover{background:rgba(255,255,255,0.3);transform:scale(1.1)}.mini-content{flex:1;display:flex;flex-direction:column;padding:20px;align-items:center;justify-content:center;background:var(--card)}.mini-cover{width:200px;height:200px;border-radius:50%;background-size:cover;background-position:center;box-shadow:0 10px 40px rgba(0,0,0,0.6);margin-bottom:20px;animation:spin 6s linear infinite;animation-play-state:paused}.mini-cover.playing{animation-play-state:running}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.mini-info{text-align:center;margin-bottom:20px}.mini-info h3{font-size:18px;margin-bottom:5px;color:var(--text)}.mini-info p{font-size:13px;color:var(--sub)}.mini-progress{width:100%;margin-bottom:20px}.progress-bar-container{width:100%;height:6px;background:var(--progress-bg);border-radius:20px;cursor:pointer;overflow:hidden;margin-bottom:8px}.progress-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#1db954,#1ed760)}.progress-time{display:flex;justify-content:space-between;font-size:11px;color:var(--sub)}.mini-controls{display:flex;gap:20px;align-items:center;justify-content:center;margin-bottom:20px}.mini-btn{background:none;border:none;color:var(--sub);cursor:pointer;padding:8px}.mini-btn:hover{color:var(--text);transform:scale(1.1)}.mini-play-btn{background:var(--green);width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center}.mini-play-btn:hover{transform:scale(1.05);box-shadow:0 8px 20px rgba(29,185,84,0.4)}.mini-volume{display:flex;align-items:center;gap:10px;width:100%}.mini-volume img{width:22px;filter:invert(1)}body.light .mini-volume img{filter:invert(0)}.mini-volume input{flex:1;height:6px;border-radius:10px;outline:none;-webkit-appearance:none;appearance:none;cursor:pointer}.mini-volume input::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--green);cursor:pointer}</style></head><body' + (isLightMode?' class="light"':'') + '><div class="mini-header"><h2>🎵 Mini Player</h2><div class="header-buttons"><button class="theme-btn" id="themeBtn">' + (isLightMode?'🌙':'☀️') + '</button><button class="close-btn" onclick="window.close()">×</button></div></div><div class="mini-content"><div class="mini-cover" id="miniCover" style="background-image:url(\'' + coverSrc + '\')"></div><div class="mini-info"><h3 id="miniTitle">' + currentSong.title + '</h3><p id="miniArtist">' + currentSong.artist + '</p></div><div class="mini-progress"><div class="progress-bar-container" id="miniProgressBar"><div class="progress-bar-fill" id="miniProgressFill"></div></div><div class="progress-time"><span id="miniCurrent">0:00</span><span id="miniDuration">0:00</span></div></div><div class="mini-controls"><button class="mini-btn" id="miniPrev"><svg width="24" height="24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/></svg></button><button class="mini-play-btn" id="miniPlay"><svg id="miniPlayIcon" width="24" height="24" fill="#000"><path d="M8 5v14l11-7z"/></svg><svg id="miniPauseIcon" width="24" height="24" fill="#000" style="display:none"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg></button><button class="mini-btn" id="miniNext"><svg width="24" height="24" fill="currentColor"><path d="M16 18h2V6h-2v12zM6 18l8.5-6L6 6v12z"/></svg></button></div><div class="mini-volume"><img id="miniVolumeIcon" src="https://pngimg.com/d/sound_PNG20.png"><input type="range" min="0" max="1" step="0.01" value="' + currentVolume + '" id="miniVolume"></div></div><audio id="miniAudio" src="' + audioSrc + '"></audio><script>const miniAudio=document.getElementById("miniAudio");const miniCover=document.getElementById("miniCover");const miniTitle=document.getElementById("miniTitle");const miniArtist=document.getElementById("miniArtist");const miniPlayBtn=document.getElementById("miniPlay");const miniPlayIcon=document.getElementById("miniPlayIcon");const miniPauseIcon=document.getElementById("miniPauseIcon");const miniPrevBtn=document.getElementById("miniPrev");const miniNextBtn=document.getElementById("miniNext");const miniProgressFill=document.getElementById("miniProgressFill");const miniCurrent=document.getElementById("miniCurrent");const miniDuration=document.getElementById("miniDuration");const miniVolume=document.getElementById("miniVolume");const miniVolumeIcon=document.getElementById("miniVolumeIcon");const themeBtn=document.getElementById("themeBtn");miniAudio.volume=' + currentVolume + ';miniAudio.addEventListener("loadedmetadata",()=>{miniAudio.currentTime=' + currentTime + '});themeBtn.onclick=()=>{document.body.classList.toggle("light");themeBtn.textContent=document.body.classList.contains("light")?"🌙":"☀️";updateVolumeUI()};function formatTime(t){if(isNaN(t))return"0:00";const m=Math.floor(t/60);const s=Math.floor(t%60).toString().padStart(2,"0");return m+":"+s}function updateVolumeUI(){const v=miniVolume.value*100;const bg=document.body.classList.contains("light")?"#ddd":"#333";miniVolume.style.background="linear-gradient(to right,var(--green) "+v+"%,"+bg+" "+v+"%)"}miniAudio.ontimeupdate=()=>{if(miniAudio.duration&&!isNaN(miniAudio.duration)){miniProgressFill.style.width=(miniAudio.currentTime/miniAudio.duration)*100+"%";miniCurrent.textContent=formatTime(miniAudio.currentTime);miniDuration.textContent=formatTime(miniAudio.duration)}};miniPlayBtn.onclick=()=>{if(miniAudio.paused){miniAudio.play().then(()=>{miniPlayIcon.style.display="none";miniPauseIcon.style.display="block";miniCover.classList.add("playing")})}else{miniAudio.pause();miniPlayIcon.style.display="block";miniPauseIcon.style.display="none";miniCover.classList.remove("playing")}};document.getElementById("miniProgressBar").onclick=(e)=>{if(!miniAudio.duration)return;const rect=e.target.getBoundingClientRect();miniAudio.currentTime=(e.clientX-rect.left)/rect.width*miniAudio.duration};miniVolume.oninput=()=>{miniAudio.volume=miniVolume.value;updateVolumeUI();miniVolumeIcon.src=miniVolume.value==0?"https://upload.wikimedia.org/wikipedia/commons/8/85/Sound-off_black.png":"https://pngimg.com/d/sound_PNG20.png"};updateVolumeUI();miniPrevBtn.onclick=()=>{if(window.opener&&!window.opener.closed)window.opener.postMessage({action:"prev"},"*")};miniNextBtn.onclick=()=>{if(window.opener&&!window.opener.closed)window.opener.postMessage({action:"next"},"*")};window.addEventListener("message",(e)=>{if(e.data.action==="updateSong"){const d=e.data;miniTitle.textContent=d.title;miniArtist.textContent=d.artist;miniCover.style.backgroundImage="url("+d.cover+")";const wasPlaying=!miniAudio.paused;miniAudio.src=d.src;miniAudio.load();miniAudio.oncanplaythrough=()=>{if(wasPlaying||d.autoplay){miniAudio.play().then(()=>{miniPlayIcon.style.display="none";miniPauseIcon.style.display="block";miniCover.classList.add("playing")})}}}});' + (isPlaying?'miniAudio.play().then(()=>{miniPlayIcon.style.display="none";miniPauseIcon.style.display="block";miniCover.classList.add("playing")})':'') + '<\/script></body></html>');
        miniPlayerWindow.document.close();
    }
};
window.addEventListener('message',(event)=>{if(event.data.action==='prev'){prev.click();setTimeout(()=>{updateMiniPlayer()},100)}else if(event.data.action==='next'){next.click();setTimeout(()=>{updateMiniPlayer()},100)}});
function updateMiniPlayer(){if(miniPlayerWindow&&!miniPlayerWindow.closed){const currentSong=songs[index];const audioSrc=new URL(currentSong.src,window.location.href).href;const coverSrc=new URL(currentSong.cover,window.location.href).href;miniPlayerWindow.postMessage({action:'updateSong',title:currentSong.title,artist:currentSong.artist,src:audioSrc,cover:coverSrc,autoplay:!audio.paused},'*')}}

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

/* ========== Auto play next song (IMPROVED) ========== */
audio.onended = () => {
    if (isLoadingSong) return;
    
    index = (index + 1) % songs.length;
    loadSong(index, true);
};

/* ========== Additional Error Handling ========== */
// Handle audio stalling
audio.onstalled = () => {
    console.warn("Audio stalled, attempting to continue...");
};

// Handle audio waiting for data
audio.onwaiting = () => {
    console.log("Buffering...");
};

// Handle successful audio load
audio.onloadeddata = () => {
    console.log("Audio loaded successfully");
};

/* ========== Initialize ========== */
loadSong(index, false);
audio.volume = 1;
updateVolumeUI();
drawWave();
