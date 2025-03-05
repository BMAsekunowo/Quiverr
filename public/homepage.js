// Initialize Spotify API
const clientId = '0543e3c0e26e4423908d4d66dd1ef988';
const clientSecret = 'f102a46958b64a2b9ba5970bec3432f2';
let token = '';




// Function to get Spotify API Token
const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    token = data.access_token;
};

// Function to fetch top trending artist and update the UI
const _updateTrending = async () => {
    const result = await fetch('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=US', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    const topTrack = data.tracks[0];
    
    // Update trending section
    document.querySelector('.song-title').textContent = topTrack.name;
    document.querySelector('.artist-name').textContent = topTrack.artists[0].name;
    document.querySelector('.trending-img').src = topTrack.album.images[0]?.url || '';
    document.querySelector('.trending-img').style.objectFit = 'cover';
    
    document.querySelector('.play-btn').onclick = () => _playSong(topTrack);
};

// Function to fetch and populate top artists
const _updateTopArtists = async () => {
    const result = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=4', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });

    const data = await result.json();
    const artistElements = document.querySelectorAll('.top-artists-grid .grid-item');
    
    data.albums.items.forEach((album, index) => {
        if (artistElements[index]) {
            artistElements[index].querySelector('img').src = album.images[0]?.url || '';
            artistElements[index].querySelector('p').textContent = album.artists[0].name;
        }
    });
};

// Function to fetch Billboard top chart + Nigerian albums
const _updateBillboardTopChart = async () => {
    const albumIds = [
        '2u5FhZ2YxbU4ud1HMC0KA4', // Wizkid - Made in Lagos
        '7gUYfDjSMXdPZouXq52gNp', // Davido - Timeless
        '6B1U3HuVhXaL7Tj1NAsxls', // Burna Boy - Love, Damini
        '1JjVArLqF2v29D9xR2kS4y'  // Rema - Rave & Roses
    ];
    
    const chartElements = document.querySelectorAll('.topchart-grid .grid-item');
    
    albumIds.forEach(async (albumId, index) => {
        try {
            const albumResult = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (!albumResult.ok) {
                console.error(`Failed to fetch album ${albumId}:`, albumResult.status, albumResult.statusText);
                return;
            }
            
            const albumData = await albumResult.json();
            
            if (chartElements[index]) {
                chartElements[index].querySelector('img').src = albumData.images[0]?.url || '';
                chartElements[index].querySelector('p').textContent = albumData.name;
            }
        } catch (error) {
            console.error(`Error fetching album ${albumId}:`, error);
        }
    });
};

// Function to play a song and update the play panel
const _playSong = (track) => {
    document.querySelector('.play-img').src = track.album.images[0]?.url || '';
    document.querySelector('.play-details h4').textContent = track.artists[0].name;
    document.querySelector('.play-details p').textContent = track.name;
    
    if (track.preview_url) {
        let audio = new Audio(track.preview_url);
        audio.play();
        
        // Update Play Controls
        const playButton = document.querySelector('.play-controls button:nth-child(2) i');
        playButton.classList.replace('fa-play', 'fa-pause');
        
        playButton.onclick = () => {
            if (audio.paused) {
                audio.play();
                playButton.classList.replace('fa-play', 'fa-pause');
            } else {
                audio.pause();
                playButton.classList.replace('fa-pause', 'fa-play');
            }
        };
    } else {
        console.warn('No preview available for this track');
    }
};

// Initialize Spotify Data on Load
window.onload = async () => {
    await _getToken();
    _updateTrending();
    _updateTopArtists();
    _updateBillboardTopChart();
};