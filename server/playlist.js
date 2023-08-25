const axios = require('axios');

async function getPlaylistDetails(playlistName) {
    try {
        const searchOptions = {
            url: 'https://api.spotify.com/v1/search',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            params: {
                q: playlistName,
                type: 'playlist'
            }
        };

        const response = await axios(searchOptions);
        const playlists = response.data.playlists.items;

        if (playlists.length > 0) {
            const playlist = playlists[0];
            const playlistId = playlist.id;

            const playlistDetailsOptions = {
                url: `https://api.spotify.com/v1/playlists/${playlistId}`,
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            };

            const playlistResponse = await axios(playlistDetailsOptions);
            const detailedPlaylist = playlistResponse.data;

            // Prepare and return the playlist details
            const playlistDetails = {
                playlistId: playlistId,
                playlistName: detailedPlaylist.name,
                // owner: detailedPlaylist.owner.display_name,
                // description: detailedPlaylist.description,
                // totalTracks: detailedPlaylist.tracks.total,
                // public: detailedPlaylist.public,
                // Add more details as needed
            };

            return playlistDetails;
        } else {
            throw new Error('Playlist not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = getPlaylistDetails;
