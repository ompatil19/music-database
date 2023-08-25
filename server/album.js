
const axios = require('axios');


async function getAlbumDetails(albumName) {
    try {
      const searchOptions = {
        url: 'https://api.spotify.com/v1/search',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        params: {
          q: albumName,
          type: 'album'
        }
      };
  
      const response = await axios(searchOptions);
      const albums = response.data.albums.items;
  
      if (albums.length > 0) {
        const album = albums[0];
        const albumId = album.id;
  
        const albumDetailsOptions = {
          url: `https://api.spotify.com/v1/albums/${albumId}`,
          method: 'get',
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`
          }
        };
  
        const albumResponse = await axios(albumDetailsOptions);
        const detailedAlbum = albumResponse.data;
  
        // Prepare and return the album details
        const albumDetails = {
          albumId: albumId,
          albumName: detailedAlbum.name,
          artists: detailedAlbum.artists.map(artist => artist.name),
          releaseDate: detailedAlbum.release_date,
          total_tracks: detailedAlbum.total_tracks,
          genres: detailedAlbum.genres,
          // Add more details as needed
        };
   
        return albumDetails;
      } else {
        throw new Error('Album not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  
  module.exports = getAlbumDetails;
