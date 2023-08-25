const axios = require('axios');
const Song = require('./models/songs');
const getArtistDetails = require('./artist'); 

async function getSongDetails(songName) {
    try {
        const searchOptions = {
            url: 'https://api.spotify.com/v1/search',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            params: {
                q: songName,
                type: 'track'
            }
        };

        const response = await axios(searchOptions);
        const tracks = response.data.tracks.items;

        if (tracks.length > 0) {
            const track = tracks[0];

            const artistDetails = await getArtistDetails(track.artists[0].name);
            
            // Prepare the song details object
            const songDetails = {
                songId: track.id,
                songname: track.name,
                artists: track.artists.map(artist => artist.name),
                genre: artistDetails.genres, 
                //genres:track.genres,             
                duration: track.duration_ms,
                releasedate: track.album.release_date,
                streams: track.popularity,  
                explicity: track.explicit ? 'Yes' : 'No',  // Convert boolean to Yes/No

            }; 

            return songDetails;
        } else {
            throw new Error('Song not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = getSongDetails;
