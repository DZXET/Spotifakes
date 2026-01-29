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

// Search elements - will be initialized later
let searchInput = null;
let clearSearchBtn = null;

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
            },
            {
                title: "Time Left",
                artist: "ZUTOMAYO",
                src: "song24.mp3",
                cover: "cover24.jpg"
            },
            {
                title: "Jouzai",
                artist: "TOOBOE",
                src: "song25.mp3",
                cover: "cover25.jpg"
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
        category: "SHANGRI-LA FRONTIER",
        songs: [
            {
                title: "BROKEN GAMES",
                artist: "FZMZ",
                src: "song26.mp3",
                cover: "cover26.jpg"
            },
            {
                title: "Danger Danger",
                artist: "FZMZ",
                src: "song27.mp3",
                cover: "cover27.jpg"
            },
            {
                title: "Frontiers",
                artist: "Awich",
                src: "song28.mp3",
                cover: "cover28.jpg"
            }
        ]
    },
        {
        category: "OVERLORD",
        songs: [
            {
                title: "Clattanoia",
                artist: "OxT",
                src: "song29.mp3",
                cover: "cover29.jpg"
            },
            {
                title: "L.L.L",
                artist: "MYTH & ROID",
                src: "song30.mp3",
                cover: "cover30.jpg"
            },
            {
                title: "GO CRY GO",
                artist: "OxT",
                src: "song31.mp3",
                cover: "cover31.jpg"
            },
            {
                title: "HYDRA",
                artist: "MYTH & ROID",
                src: "song32.mp3",
                cover: "cover32.jpg"
            },
            {
                title: "VORACITY",
                artist: "MYTH & ROID",
                src: "song33.mp3",
                cover: "cover33.jpg"
            },
            {
                title: "Silent Solitude",
                artist: "OxT",
                src: "song34.mp3",
                cover: "cover34.jpg"
            }
            ,
            {
                title: "Hollow Hunger",
                artist: "OxT",
                src: "song35.mp3",
                cover: "cover35.jpg"
            },
            {
                title: "No Man's Dawn",
                artist: "Mayu Maeshima",
                src: "song36.mp3",
                cover: "cover36.jpg"
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
    },
    {
        category: "Death Note",
        songs: [
            {
                title: "the WORLD",
                artist: "NIGHTMARE",
                src: "song37.mp3",
                cover: "cover37.jpg"
            },
            {
                title: "alumina",
                artist: "NIGHTMARE",
                src: "song38.mp3",
                cover: "cover38.jpg"
            }
        ]
    },
    {
        category: "Hunter x Hunter",
        songs: [
            {
                title: "Departure",
                artist: "Masatoshi Ono",
                src: "songHxH.mp3",
                cover: "coverHxH.jpg"
            }
        ]
    },
    {
        category: "Jujutsu Kaisen",
        songs: [
            {
                title: "廻廻奇譚",
                artist: "Eve",
                src: "song39.mp3",
                cover: "cover39.jpg"
            },
            {
                title: "LOST IN PARADISE",
                artist: "ALI, AKLO",
                src: "song40.mp3",
                cover: "cover40.jpg"
            },
            {
                title: "Ao No Sumika",
                artist: "Tatsuya Kitani",
                src: "song41.mp3",
                cover: "cover41.jpg"
            },
            {
                title: "give it back",
                artist: "Cö shu Nie",
                src: "song42.mp3",
                cover: "cover42.jpg"
            },
            {
                title: "more than words",
                artist: "Hitsujibungaku",
                src: "song43.mp3",
                cover: "cover43.jpg"
            },
            {
                title: "AKARI",
                artist: "Soushi Sakiyama",
                src: "song44.mp3",
                cover: "cover44.jpg"
            },
            {
                title: "AIZO",
                artist: "King Gnu",
                src: "song45.mp3",
                cover: "cover45.jpg"
            },
            {
                title: "Yoake no Uta",
                artist: "jo0ji",
                src: "song46.mp3",
                cover: "cover46.jpg"
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
        
        // Update Media Session (notification player)
        if (typeof updateMediaSession === "function") {
            updateMediaSession();
        }
        
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
        
        // Fade back in
        setTimeout(() => {
            bg.style.opacity = 1;
        }, 100);
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
        
        // Update Media Session (notification player)
        if (typeof updateMediaSession === "function") {
            updateMediaSession();
        }
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
    
    // Store current song reference before rebuilding
    const currentSong = songs[index];
    
    // Rebuild flat songs array
    songs = playlist.flatMap(cat => cat.songs);
    
    // Update index to match the current song's new position
    if (currentSong) {
        const newIndex = songs.findIndex(s => s.title === currentSong.title && s.artist === currentSong.artist);
        if (newIndex !== -1) {
            index = newIndex;
        }
    }
    
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
            const songList = songs.findIndex(song => song.title === s.title && song.artist === s.artist);
            const songKey = `${s.title}-${s.artist}`;
            const isFav = favourites.has(songKey);
            
            const div = document.createElement("div");
            div.className = "playlist-song" + (isFav ? " favourite" : "");
            
            // Song title
            const titleSpan = document.createElement("span");
            titleSpan.textContent = s.title;
            div.appendChild(titleSpan);
            
            // Song artist (hidden but searchable)
            const artistSpan = document.createElement("span");
            artistSpan.className = "song-artist";
            artistSpan.textContent = s.artist;
            artistSpan.style.display = 'none';
            div.appendChild(artistSpan);
            
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

/* ========== Search Functionality ========== */
function filterPlaylist(searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    const allCategories = document.querySelectorAll('.category-header');
    
    console.log('Searching for:', query);
    console.log('Found categories:', allCategories.length);
    
    if (query === '') {
        // Show all when search is empty
        allCategories.forEach(cat => {
            cat.classList.remove('hidden');
            // Show all songs in this category
            let next = cat.nextElementSibling;
            while (next && !next.classList.contains('category-header')) {
                next.classList.remove('hidden');
                next = next.nextElementSibling;
            }
        });
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        console.log('Showing all');
    } else {
        if (clearSearchBtn) clearSearchBtn.style.display = 'block';
        
        // Hide all first
        allCategories.forEach(cat => cat.classList.add('hidden'));
        document.querySelectorAll('.playlist-song').forEach(song => song.classList.add('hidden'));
        
        // Show matching songs and their categories
        let matchCount = 0;
        allCategories.forEach(categoryHeader => {
            let hasMatchingChild = false;
            let current = categoryHeader.nextElementSibling;
            
            // Go through all songs in this category
            while (current && !current.classList.contains('category-header')) {
                // ดึง title span สำหรับ ชื่อเพลง
                const titleSpan = current.querySelector('span');
                // ดึง artist จากอ้อยไปตามหา data attribute หรือ text content
                const songText = current.textContent.toLowerCase();
                const titleText = titleSpan ? titleSpan.textContent.toLowerCase() : '';
                
                // ค้นหาทั้งชื่อเพลงและ artist
                if (songText.includes(query) || titleText.includes(query)) {
                    current.classList.remove('hidden');
                    hasMatchingChild = true;
                    matchCount++;
                }
                current = current.nextElementSibling;
            }
            
            // Show category if it has matching songs
            if (hasMatchingChild) {
                categoryHeader.classList.remove('hidden');
            }
        });
        console.log('Found matches:', matchCount);
    }
}

/* ========== Initialize ========== */
loadSong(index, false);
rebuildPlaylist();

// Initialize search elements after DOM is ready
searchInput = document.getElementById("searchInput");
clearSearchBtn = document.getElementById("clearSearchBtn");

console.log('Initializing search - searchInput:', searchInput, 'clearSearchBtn:', clearSearchBtn);

// Search event listeners
if (searchInput && clearSearchBtn) {
    console.log('Search input found, attaching listeners');
    
    searchInput.addEventListener('input', (e) => {
        console.log('Search input event:', e.target.value);
        filterPlaylist(e.target.value);
    });

    clearSearchBtn.addEventListener('click', () => {
        console.log('Clear button clicked');
        searchInput.value = '';
        filterPlaylist('');
        searchInput.focus();
    });

    // Clear search when sidebar closes
    overlay.addEventListener('click', () => {
        console.log('Overlay clicked, clearing search');
        searchInput.value = '';
        filterPlaylist('');
    });
} else {
    console.warn('Search elements not found after init - searchInput:', searchInput, 'clearSearchBtn:', clearSearchBtn);
}

audio.volume = 1;
updateVolumeUI();
drawWave();

/* ========== Loading Screen ========== */
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Wait minimum 1.5 seconds to show the loading screen nicely
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after fade out animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});/* ========== MEDIA SESSION API FOR NOTIFICATION PLAYER ========== */
// This enables control from lock screen, notification bar, and media keys
// Works on Android, iOS, and desktop browsers

function updateMediaSession() {
    // Check if Media Session API is supported
    if ('mediaSession' in navigator) {
        const currentSong = songs[index];
        
        // Set metadata for notification player
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSong.title,
            artist: currentSong.artist,
            album: playlist.find(cat => cat.songs.includes(currentSong))?.category || 'Spotifake Player',
            artwork: [
                { src: currentSong.cover, sizes: '96x96', type: 'image/jpeg' },
                { src: currentSong.cover, sizes: '128x128', type: 'image/jpeg' },
                { src: currentSong.cover, sizes: '192x192', type: 'image/jpeg' },
                { src: currentSong.cover, sizes: '256x256', type: 'image/jpeg' },
                { src: currentSong.cover, sizes: '384x384', type: 'image/jpeg' },
                { src: currentSong.cover, sizes: '512x512', type: 'image/jpeg' }
            ]
        });

        // Set up action handlers
        navigator.mediaSession.setActionHandler('play', () => {
            play().catch(err => console.error("Media session play error:", err));
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            pause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            if (!isLoadingSong) {
                index = (index - 1 + songs.length) % songs.length;
                loadSong(index, true);
            }
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            if (!isLoadingSong) {
                index = (index + 1) % songs.length;
                loadSong(index, true);
            }
        });

        // Seek backward (10 seconds)
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
        });

        // Seek forward (10 seconds)
        navigator.mediaSession.setActionHandler('seekforward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);
        });

        // Seek to specific position
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && 'fastSeek' in audio) {
                audio.fastSeek(details.seekTime);
            } else {
                audio.currentTime = details.seekTime;
            }
        });

        console.log('Media Session API initialized successfully');
    } else {
        console.log('Media Session API not supported in this browser');
    }
}

// Update position state for notification player progress bar
function updatePositionState() {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        if (audio.duration && !isNaN(audio.duration)) {
            try {
                navigator.mediaSession.setPositionState({
                    duration: audio.duration,
                    playbackRate: audio.playbackRate,
                    position: audio.currentTime
                });
            } catch (error) {
                console.error('Failed to update position state:', error);
            }
        }
    }
}

// Call updatePositionState periodically when playing
audio.addEventListener('timeupdate', () => {
    // Update every 1 second to avoid too many updates
    if (audio.currentTime % 1 < 0.1) {
        updatePositionState();
    }
});

// Update when duration changes
audio.addEventListener('durationchange', () => {
    updatePositionState();
});

// Update when playback rate changes
audio.addEventListener('ratechange', () => {
    updatePositionState();
});

// Update when song is loaded
audio.addEventListener('loadedmetadata', () => {
    updatePositionState();
});

/* ========== PWA SERVICE WORKER FOR BETTER MOBILE EXPERIENCE ========== */
// Register service worker if supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Create inline service worker
        const swCode = `
            self.addEventListener('install', (event) => {
                console.log('Service Worker installed');
                self.skipWaiting();
            });
            
            self.addEventListener('activate', (event) => {
                console.log('Service Worker activated');
                return self.clients.claim();
            });
            
            self.addEventListener('fetch', (event) => {
                // Let the browser handle all requests normally
                event.respondWith(fetch(event.request));
            });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(registration => {
                console.log('Service Worker registered successfully');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

/* ========== WAKE LOCK API TO PREVENT SCREEN SLEEP ========== */
// Keep screen awake while playing (useful for lyrics reading)
let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activated');
            
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock released');
            });
        } catch (err) {
            console.log('Wake Lock error:', err);
        }
    }
}

async function releaseWakeLock() {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
            wakeLock = null;
        } catch (err) {
            console.log('Wake Lock release error:', err);
        }
    }
}

// Request wake lock when playing
audio.addEventListener('play', () => {
    requestWakeLock();
});

// Release wake lock when paused
audio.addEventListener('pause', () => {
    releaseWakeLock();
});

// Release on page hide
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Don't release wake lock, let it continue in background
    }
});

console.log('Mobile enhancements loaded: Media Session API, Wake Lock, PWA support');

/* ========== VERSION INFO ========== */
console.log('%c🎵 Spotifake Music Player v2.0 🎵', 'color: #1DB954; font-size: 16px; font-weight: bold;');
console.log('%cFeatures: Mobile Responsive | Notification Player | PWA | Wake Lock', 'color: #b3b3b3; font-size: 10px;');