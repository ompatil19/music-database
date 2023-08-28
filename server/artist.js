
const axios = require('axios');


async function getArtistDetails(artistName) {
  try {
    const searchOptions = {
      url: 'https://api.spotify.com/v1/search',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        q: artistName,
        type: 'artist'
      }
    };

    const response = await axios(searchOptions);
    const artists = response.data.artists.items;

    if (artists.length > 0) {
      const artist = artists[0];

      const artistDetailsOptions = {
        url: `https://api.spotify.com/v1/artists/${artist.id}`,
        method: 'get',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      };

      const artistResponse = await axios(artistDetailsOptions);
      const detailedArtist = artistResponse.data;

      // Prepare and return the artist details
      const artistDetails = {
        artistId: detailedArtist.id,
        artistName: detailedArtist.name,
        followers: detailedArtist.followers.total,
        popularity: detailedArtist.popularity,
        genres: detailedArtist.genres,

      };

      return artistDetails;
    } else {
      throw new Error('Artist not found.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = getArtistDetails;
