
const axios = require('axios');

// Function to find and display albums by artist name from the Spotify API
exports.findAlbumsByArtistNameInTerminal = async (artistName) => {
  try {
    // Use the Spotify API to search for artists by name
    const artistSearchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`, // Replace with your Spotify access token
        'Content-Type': 'application/json',
      },
    });

    if (!artistSearchResponse.ok) {
      console.log('Artist not found');
      return;
    }

    const artistData = await artistSearchResponse.json();

    // Extract the first artist from the search results
    const artist = artistData.artists.items[0];

    if (!artist) {
      console.log('Artist not found');
      return;
    }

    // Use the Spotify API to search for albums by the artist's ID
    const albumsSearchResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`, // Use the stored access token
    'Content-Type': 'application/json',
  },
});


    if (!albumsSearchResponse.ok) {
      console.log('No albums found for this artist.');
      return;
    }

    const albumsData = await albumsSearchResponse.json();

    if (albumsData.items.length === 0) {
      console.log('No albums found for this artist.');
      return;
    }

    console.log(`Albums by ${artistName}:`);
    albumsData.items.forEach((album) => {
      console.log(`- ${album.name}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
  
};