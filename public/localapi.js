const API_BASE_URL = "http://thetracks-api.onrender.com";
const API_KEY = "openDoor.null"; // Replace with any valid API key from .env

let audioPlayer = null;

// Function to fetch data from API
const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Error fetching ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Function to update trending section
const _updateTrending = async () => {
    const trendingSongs = await fetchData("trending");
    if (!trendingSongs || trendingSongs.length === 0) return;

    const song = trendingSongs[0];
    document.querySelector('.song-title').textContent = song.title;
    document.querySelector('.artist-name').textContent = song.artist;
    document.querySelector('.trending-img').src = song.cover;
    
    document.querySelector('.play-btn').onclick = () => _playSong(song);
};

// Function to update top artists and play all their songs sequentially
const _updateTopArtists = async () => {
    const topArtists = await fetchData("artists");
    if (!topArtists) return;

    const artistCategories = Object.keys(topArtists); // Get artist names (Davido, Ruger, etc.)
    const artistList = artistCategories.slice(0, 4); // Only take the first four artists

    const artistElements = document.querySelectorAll('.top-artists-grid .grid-item');

    artistList.forEach((artistName, index) => {
        if (!artistElements[index]) return;

        const artist = topArtists[artistName]; // Get artist's songs
        if (!artist || artist.length === 0) return;

        // Set artist image and name
        artistElements[index].querySelector('img').src = artist[0].cover;
        artistElements[index].querySelector('p').textContent = artistName; // FIX: Use artistName

        // On click, play all five songs sequentially
        artistElements[index].onclick = () => _playArtistSongs(artist);
    });
};

// Function to play all five songs of an artist sequentially
const _playArtistSongs = (songs) => {
    let currentSongIndex = 0;

    const playSong = (index) => {
        if (index < 0 || index >= songs.length) return; // Ensure valid index

        const song = songs[index];
        if (!song) return;

        document.querySelector('.play-img').src = song.cover;
        document.querySelector('.play-details h4').textContent = song.artist;
        document.querySelector('.play-details p').textContent = song.title;

        if (audioPlayer) audioPlayer.pause();
        audioPlayer = new Audio(`${API_BASE_URL}/play/${song.folder}/${song.file}?api_key=${API_KEY}`);
        audioPlayer.play();

        // Update play/pause button
        const playButton = document.querySelector('.play-controls button:nth-child(2) i');
        playButton.classList.replace('fa-play', 'fa-pause');

        playButton.onclick = () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playButton.classList.replace('fa-play', 'fa-pause');
            } else {
                audioPlayer.pause();
                playButton.classList.replace('fa-pause', 'fa-play');
            }
        };

        // Play next song automatically when the current one ends
        audioPlayer.onended = () => {
            if (currentSongIndex < songs.length - 1) {
                currentSongIndex++;
                playSong(currentSongIndex);
            }
        };
    };

    // **Previous Song Button** (Moves to the previous song)
    document.querySelector('.play-controls button:nth-child(1)').onclick = () => {
        currentSongIndex = (currentSongIndex > 0) ? currentSongIndex - 1 : songs.length - 1;
        playSong(currentSongIndex);
    };

    // **Next Song Button** (Moves to the next song)
    document.querySelector('.play-controls button:nth-child(3)').onclick = () => {
        currentSongIndex = (currentSongIndex < songs.length - 1) ? currentSongIndex + 1 : 0;
        playSong(currentSongIndex);
    };

    // Start playing the first song
    playSong(currentSongIndex);
};

const _updateBillboardTopChart = async () => {
    const topCharts = await fetchData("albums");
    if (!topCharts) return;

    const albumCategories = Object.keys(topCharts); // Get album names (Made in Lagos, Timeless, etc.)
    const albumList = albumCategories.slice(0, 4); // Only take the first four albums

    const chartElements = document.querySelectorAll('.topchart-grid .grid-item');

    albumList.forEach((albumName, index) => {
        if (!chartElements[index]) return;

        const album = topCharts[albumName]; // Get album's songs
        if (!album || album.length === 0) return;

        // Set album image and name
        chartElements[index].querySelector('img').src = album[0].cover;
        chartElements[index].querySelector('p').textContent = albumName;

        // On click, play all five songs sequentially
        chartElements[index].onclick = () => _playArtistSongs(album);
    });
};


// Function to play a song
const _playSong = (song) => {
    document.querySelector('.play-img').src = song.cover;
    document.querySelector('.play-details h4').textContent = song.artist;
    document.querySelector('.play-details p').textContent = song.title;

    if (audioPlayer) audioPlayer.pause();
    audioPlayer = new Audio(`${API_BASE_URL}/play/${song.folder}/${song.file}?api_key=${API_KEY}`);
    audioPlayer.play();

    const playButton = document.querySelector('.play-controls button:nth-child(2) i');
    playButton.classList.replace('fa-play', 'fa-pause');

    playButton.onclick = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.classList.replace('fa-play', 'fa-pause');
        } else {
            audioPlayer.pause();
            playButton.classList.replace('fa-pause', 'fa-play');
        }
    };
};

// Initialize API Data on Load
window.onload = async () => {
    await _updateTrending();
    _updateTopArtists();
    _updateBillboardTopChart();
};