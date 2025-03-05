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
    const billboardResult = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const nigerianAlbumsResult = await fetch('https://api.spotify.com/v1/browse/categories/afrobeat/playlists?limit=4', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const billboardData = await billboardResult.json();
    const nigerianAlbumsData = await nigerianAlbumsResult.json();
    
    const chartElements = document.querySelectorAll('.topchart-grid .grid-item');
    
    // Billboard Top Chart
    billboardData.tracks.items.slice(0, 2).forEach((track, index) => {
        if (chartElements[index]) {
            chartElements[index].querySelector('img').src = track.track.album.images[0]?.url || '';
            chartElements[index].querySelector('p').textContent = track.track.name;
        }
    });
    
    // Nigerian Albums (2 additional slots)
    const nigerianPlaylists = nigerianAlbumsData.playlists.items.slice(0, 2);
    nigerianPlaylists.forEach((playlist, index) => {
        const chartIndex = index + 2; // Billboard took first 2 slots
        if (chartElements[chartIndex]) {
            chartElements[chartIndex].querySelector('img').src = playlist.images[0]?.url || '';
            chartElements[chartIndex].querySelector('p').textContent = playlist.name;
        }
    });
};

// Initialize Spotify Data on Load
window.onload = async () => {
    await _getToken();
    _updateTrending();
    _updateTopArtists();
    _updateBillboardTopChart();
};