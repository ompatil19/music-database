
const axios = require('axios');
const getArtistDetails = require('./artist');

async function getTrackDetails(trackName,accessToken) {
    try {
        const searchOptions = {
            url: 'https://api.spotify.com/v1/search',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            params: {
                q: trackName,
                type: 'track'
            }
        };

        const response = await axios(searchOptions);
        const tracks = response.data.tracks.items;

        if (tracks.length > 0) {
            const trackData = tracks[0];
            const artistDetails = await getArtistDetails(trackData.artists[0].name);

            const trackImage = trackData.album.images[0].url;

            // Prepare the track details object
            const trackDetails = {
                trackId: trackData.id,
                trackName: trackData.name,
                trackImage: trackImage,
                artists: trackData.artists.map(artist => artist.name),
                genre: artistDetails.genres,
                //genres:track.genres,             
                duration: trackData.duration_ms,
                releasedate: trackData.album.release_date,
                streams: trackData.popularity,
                explicity: trackData.explicit ? 'Yes' : 'No',  // Convert boolean to Yes/No
            };

            return trackDetails;
        } else {
            throw new Error('Track not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = getTrackDetails;
