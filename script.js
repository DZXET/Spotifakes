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

const playlistBox = document.getElementById("playlist");
const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");

// Favourite button
const favouriteBtn = document.getElementById("favouriteBtn");

/* Playlist with Categories */
let playlist = [
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

// Load category order from localStorage
function loadCategoryOrder() {
    const savedOrder = localStorage.getItem('categoryOrder');
    if (savedOrder) {
        const orderArray = JSON.parse(savedOrder);
        const orderedPlaylist = [];
        orderArray.forEach(categoryName => {
            const cat = playlist.find(c => c.category === categoryName);
            if (cat) orderedPlaylist.push(cat);
        });
        // Add any new categories that weren't in saved order
        playlist.forEach(cat => {
            if (!orderedPlaylist.includes(cat)) {
                orderedPlaylist.push(cat);
            }
        });
        playlist = orderedPlaylist;
    }
}

// Save category order to localStorage
function saveCategoryOrder() {
    const orderArray = playlist.map(cat => cat.category);
    localStorage.setItem('categoryOrder', JSON.stringify(orderArray));
}

// Load favourites from localStorage
let favourites = new Set();
function loadFavourites() {
    const saved = localStorage.getItem('favourites');
    if (saved) {
        favourites = new Set(JSON.parse(saved));
    }
}

function saveFavourites() {
    localStorage.setItem('favourites', JSON.stringify([...favourites]));
}

// Initialize
loadCategoryOrder();
loadFavourites();

// Flatten songs for easier access
let songs = playlist.flatMap(cat => cat.songs);
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
        
        // Left side bars (mirrored)
        const xLeft = centerX - ((i + 1) * barWidth);
        ctx.beginPath();
        ctx.roundRect(xLeft, y, barWidth - 2, barHeight, roundRadius);
        ctx.fill();
    }
}

/* ========== Load Song (IMPROVED with smooth transitions) ========== */
function loadSong(idx, autoplay = false) {
    if (isLoadingSong) return;
    isLoadingSong = true;
    
    const wasPlaying = !audio.paused;
    
    // Pause current song and fade out
    if (wasPlaying) {
        pause();
    }
    
    // Fade out background
    bg.style.opacity = 0;
    
    setTimeout(() => {
        const s = songs[idx];
        
        // Update UI
        cover.style.backgroundImage = `url(${s.cover})`;
        bg.style.backgroundImage = `url(${s.cover})`;
        title.textContent = s.title;
        artist.textContent = s.artist;
        
        // Update favourite button
        updateFavouriteButton();
        
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

/* ========== Favourite Functions ========== */
function getCurrentSongKey() {
    const currentSong = songs[index];
    return `${currentSong.title}-${currentSong.artist}`;
}

function updateFavouriteButton() {
    const songKey = getCurrentSongKey();
    const isFav = favourites.has(songKey);
    
    if (isFav) {
        favouriteBtn.classList.add('active');
        favouriteBtn.title = 'Remove from Favourites';
    } else {
        favouriteBtn.classList.remove('active');
        favouriteBtn.title = 'Add to Favourites';
    }
}

favouriteBtn.onclick = () => {
    const songKey = getCurrentSongKey();
    
    if (favourites.has(songKey)) {
        favourites.delete(songKey);
    } else {
        favourites.add(songKey);
    }
    
    saveFavourites();
    updateFavouriteButton();
    rebuildPlaylist(); // Rebuild to update favourite icons
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

/* ========== Build Playlist with Categories and Drag-and-Drop ========== */
let draggedCategory = null;

function rebuildPlaylist() {
    playlistBox.innerHTML = '';
    
    // Rebuild flat songs array
    songs = playlist.flatMap(cat => cat.songs);
    
    playlist.forEach((category, catIndex) => {
        // Create category header
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category-header";
        categoryDiv.textContent = category.category;
        categoryDiv.draggable = true;
        categoryDiv.dataset.categoryIndex = catIndex;
        
        // Drag events for category
        categoryDiv.addEventListener('dragstart', (e) => {
            draggedCategory = catIndex;
            categoryDiv.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        
        categoryDiv.addEventListener('dragend', () => {
            categoryDiv.classList.remove('dragging');
            document.querySelectorAll('.category-header').forEach(el => {
                el.classList.remove('drag-over');
            });
        });
        
        categoryDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (draggedCategory !== null && draggedCategory !== catIndex) {
                categoryDiv.classList.add('drag-over');
            }
        });
        
        categoryDiv.addEventListener('dragleave', () => {
            categoryDiv.classList.remove('drag-over');
        });
        
        categoryDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (draggedCategory !== null && draggedCategory !== catIndex) {
                // Reorder playlist array
                const draggedCat = playlist[draggedCategory];
                playlist.splice(draggedCategory, 1);
                
                // Adjust target index if needed
                const newIndex = draggedCategory < catIndex ? catIndex - 1 : catIndex;
                playlist.splice(newIndex, 0, draggedCat);
                
                // Save and rebuild
                saveCategoryOrder();
                rebuildPlaylist();
            }
            
            draggedCategory = null;
        });
        
        playlistBox.appendChild(categoryDiv);
        
        // Create songs in this category
        category.songs.forEach((s) => {
            const songList = songs.findIndex(song => song.title === s.title);
            const songKey = `${s.title}-${s.artist}`;
            const isFav = favourites.has(songKey);
            
            const div = document.createElement("div");
            div.className = "playlist-song" + (isFav ? " favourite" : "");
            
            // Song title
            const titleSpan = document.createElement("span");
            titleSpan.textContent = s.title;
            div.appendChild(titleSpan);
            
            // Favourite icon
            if (isFav) {
                const favIcon = document.createElement("span");
                favIcon.className = "fav-icon";
                favIcon.textContent = "♥";
                div.appendChild(favIcon);
            }
            
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
        });
    });
    
    highlight();
}

// Initial build
rebuildPlaylist();

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

/* ========== Mini Player Mode - Popup Window ========== */
miniplayerBtn.onclick = () => {
    // Get current song info
    const currentSong = songs[index];
    const currentTime = audio.currentTime;
    const isPlaying = !audio.paused;
    const currentVolume = audio.volume;
    const isLightMode = document.body.classList.contains('light');
    
    // Create popup window with mini player
    const width = 350;
    const height = 500;
    const left = (screen.width - width) - 50;
    const top = 50;
    
    const popup = window.open(
        '',
        'miniPlayer',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no,menubar=no,toolbar=no,location=no,status=no`
    );
    
    if (popup) {
        // Build mini player HTML
        popup.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Player - ${currentSong.title}</title>
    <style>
        :root {
            --bg: #121212;
            --card: #181818;
            --text: #fff;
            --sub: #b3b3b3;
            --green: #1db954;
            --progress-bg: #333;
        }
        
        body.light {
            --bg: #f2f2f2;
            --card: #fff;
            --text: #000;
            --sub: #555;
            --progress-bg: #ddd;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transition: background 0.4s ease, color 0.4s ease;
        }
        
        .mini-header {
            padding: 15px;
            background: linear-gradient(135deg, var(--green) 0%, #169c46 100%);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .mini-header h2 {
            font-size: 16px;
            font-weight: bold;
            color: #fff;
        }
        
        .header-buttons {
            display: flex;
            gap: 8px;
        }
        
        .theme-btn,
        .close-btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .theme-btn:hover,
        .close-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }
        
        .mini-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 20px;
            align-items: center;
            justify-content: center;
            background: var(--card);
        }
        
        .mini-cover {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            margin-bottom: 20px;
            animation: spin 6s linear infinite;
            animation-play-state: paused;
        }
        
        .mini-cover.playing {
            animation-play-state: running;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .mini-info {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .mini-info h3 {
            font-size: 18px;
            margin-bottom: 5px;
            color: var(--text);
        }
        
        .mini-info p {
            font-size: 13px;
            color: var(--sub);
        }
        
        .mini-progress {
            width: 100%;
            margin-bottom: 20px;
        }
        
        .progress-bar-container {
            width: 100%;
            height: 6px;
            background: var(--progress-bg);
            border-radius: 20px;
            cursor: pointer;
            overflow: hidden;
            margin-bottom: 8px;
        }
        
        .progress-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #1db954, #1ed760);
            transition: width 0.1s linear;
        }
        
        .progress-time {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: var(--sub);
        }
        
        .mini-controls {
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .mini-btn {
            background: none;
            border: none;
            color: var(--sub);
            cursor: pointer;
            transition: all 0.2s;
            padding: 8px;
        }
        
        .mini-btn:hover {
            color: var(--text);
            transform: scale(1.1);
        }
        
        .mini-play-btn {
            background: var(--green);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .mini-play-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(29, 185, 84, 0.4);
        }
        
        .mini-volume {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
        }
        
        .mini-volume img {
            width: 22px;
            filter: invert(1);
        }
        
        body.light .mini-volume img {
            filter: invert(0);
        }
        
        .mini-volume input {
            flex: 1;
            height: 6px;
            border-radius: 10px;
            background: linear-gradient(to right, var(--green) 100%, var(--progress-bg) 0%);
            outline: none;
            -webkit-appearance: none;
            appearance: none;
            cursor: pointer;
        }
        
        .mini-volume input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--green);
            cursor: pointer;
            box-shadow: 0 0 10px rgba(30, 215, 96, .8);
        }
        
        .mini-volume input::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--green);
            cursor: pointer;
            border: none;
            box-shadow: 0 0 10px rgba(30, 215, 96, .8);
        }
    </style>
</head>
<body${isLightMode ? ' class="light"' : ''}>
    <div class="mini-header">
        <h2>🎵 Mini Player</h2>
        <div class="header-buttons">
            <button class="theme-btn" id="themeBtn" title="Toggle Theme">${isLightMode ? '🌙' : '☀️'}</button>
            <button class="close-btn" onclick="window.close()">×</button>
        </div>
    </div>
    
    <div class="mini-content">
        <div class="mini-cover" id="miniCover" style="background-image: url('${currentSong.cover}')"></div>
        
        <div class="mini-info">
            <h3 id="miniTitle">${currentSong.title}</h3>
            <p id="miniArtist">${currentSong.artist}</p>
        </div>
        
        <div class="mini-progress">
            <div class="progress-bar-container" id="miniProgressBar">
                <div class="progress-bar-fill" id="miniProgressFill"></div>
            </div>
            <div class="progress-time">
                <span id="miniCurrent">0:00</span>
                <span id="miniDuration">0:00</span>
            </div>
        </div>
        
        <div class="mini-controls">
            <button class="mini-btn" id="miniPrev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
                </svg>
            </button>
            
            <button class="mini-play-btn" id="miniPlay">
                <svg id="miniPlayIcon" width="24" height="24" viewBox="0 0 24 24" fill="#000">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg id="miniPauseIcon" width="24" height="24" viewBox="0 0 24 24" fill="#000" style="display: none;">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
            </button>
            
            <button class="mini-btn" id="miniNext">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 18h2V6h-2v12zM6 18l8.5-6L6 6v12z"/>
                </svg>
            </button>
        </div>
        
        <div class="mini-volume">
            <img id="miniVolumeIcon" src="https://pngimg.com/d/sound_PNG20.png" alt="volume">
            <input type="range" min="0" max="1" step="0.01" value="${currentVolume}" id="miniVolume">
        </div>
    </div>
    
    <audio id="miniAudio" src="${currentSong.src}"></audio>
    
    <script>
        const miniAudio = document.getElementById('miniAudio');
        const miniCover = document.getElementById('miniCover');
        const miniTitle = document.getElementById('miniTitle');
        const miniArtist = document.getElementById('miniArtist');
        const miniPlayBtn = document.getElementById('miniPlay');
        const miniPlayIcon = document.getElementById('miniPlayIcon');
        const miniPauseIcon = document.getElementById('miniPauseIcon');
        const miniPrevBtn = document.getElementById('miniPrev');
        const miniNextBtn = document.getElementById('miniNext');
        const miniProgressBar = document.getElementById('miniProgressBar');
        const miniProgressFill = document.getElementById('miniProgressFill');
        const miniCurrent = document.getElementById('miniCurrent');
        const miniDuration = document.getElementById('miniDuration');
        const miniVolume = document.getElementById('miniVolume');
        const miniVolumeIcon = document.getElementById('miniVolumeIcon');
        const themeBtn = document.getElementById('themeBtn');
        
        // Set initial time and volume
        miniAudio.currentTime = ${currentTime};
        miniAudio.volume = ${currentVolume};
        
        // Theme toggle
        themeBtn.onclick = () => {
            document.body.classList.toggle('light');
            const isLight = document.body.classList.contains('light');
            themeBtn.textContent = isLight ? '🌙' : '☀️';
            updateVolumeUI();
        };
        
        // Format time
        function formatTime(time) {
            if (isNaN(time)) return '0:00';
            const m = Math.floor(time / 60);
            const s = Math.floor(time % 60).toString().padStart(2, '0');
            return m + ':' + s;
        }
        
        // Update volume UI
        function updateVolumeUI() {
            const value = miniVolume.value * 100;
            const isLight = document.body.classList.contains('light');
            const bgColor = isLight ? '#ddd' : '#333';
            miniVolume.style.background = 'linear-gradient(to right, var(--green) ' + value + '%, ' + bgColor + ' ' + value + '%)';
        }
        
        // Update progress
        miniAudio.ontimeupdate = () => {
            if (miniAudio.duration) {
                const percent = (miniAudio.currentTime / miniAudio.duration) * 100;
                miniProgressFill.style.width = percent + '%';
                miniCurrent.textContent = formatTime(miniAudio.currentTime);
                miniDuration.textContent = formatTime(miniAudio.duration);
            }
        };
        
        // Play/Pause
        miniPlayBtn.onclick = () => {
            if (miniAudio.paused) {
                miniAudio.play();
                miniPlayIcon.style.display = 'none';
                miniPauseIcon.style.display = 'block';
                miniCover.classList.add('playing');
            } else {
                miniAudio.pause();
                miniPlayIcon.style.display = 'block';
                miniPauseIcon.style.display = 'none';
                miniCover.classList.remove('playing');
            }
        };
        
        // Progress bar click
        miniProgressBar.onclick = (e) => {
            if (!miniAudio.duration) return;
            const rect = miniProgressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / miniProgressBar.clientWidth) * miniAudio.duration;
            miniAudio.currentTime = newTime;
        };
        
        // Volume
        miniVolume.oninput = () => {
            miniAudio.volume = miniVolume.value;
            updateVolumeUI();
            
            if (miniVolume.value == 0) {
                miniVolumeIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/8/85/Sound-off_black.png';
            } else {
                miniVolumeIcon.src = 'https://pngimg.com/d/sound_PNG20.png';
            }
        };
        
        // Initial volume UI update
        updateVolumeUI();
        
        // Communicate with main window
        miniPrevBtn.onclick = () => {
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({action: 'prev'}, '*');
            }
        };
        
        miniNextBtn.onclick = () => {
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage({action: 'next'}, '*');
            }
        };
        
        // Start playing if it was playing
        ${isPlaying ? 'miniAudio.play(); miniPlayIcon.style.display = "none"; miniPauseIcon.style.display = "block"; miniCover.classList.add("playing");' : ''}
    </script>
</body>
</html>
        `);
        popup.document.close();
    }
};

// Listen for messages from mini player
window.addEventListener('message', (event) => {
    if (event.data.action === 'prev') {
        prev.click();
    } else if (event.data.action === 'next') {
        next.click();
    }
});

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
