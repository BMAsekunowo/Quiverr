//Spotify API configuration
// const APICONTROLLER =(function(){
    const clientId = '0543e3c0e26e4423908d4d66dd1ef988';
    const clientSecret = 'f102a46958b64a2b9ba5970bec3432f2';
    const artistId ='0TnOYISbd1XYRBk9myaseg'


    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
    
        if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
        }
    
        const data = await result.json();
        return data.access_token;
    };
    
    const _getArtists = async (token, artistId) => {
        if (!token) {
            token = await _getToken();
        }
        
        const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
        const result = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
    
        if (!result.ok) {
            throw new Error(`Error ${result.status}: ${result.statusText}`);
        }
    
        const data = await result.json();
        return data.tracks;
    };

// })();
