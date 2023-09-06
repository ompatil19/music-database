const mongoose = require('mongoose');
const Artist = require('./models/artists'); // Replace with the correct path to your Artist model
const Album = require('./models/albums');
mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function findTotalAlbumsByArtist(artistName) {
    try {
      const totalAlbums = await Album.countDocuments({ artists: artistName });
      console.log('Total albums by', artistName, ':', totalAlbums);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Example usage
  findTotalAlbumsByArtist('Taylor Swift');
  

  
// Find artists by popularity

// async function findArtistsByPopularity(minPopularity, maxPopularity) {
//     try {
//       const artists = await Artist.find({
//         popularity: { $gte: minPopularity, $lte: maxPopularity },
//       });
//       console.log('Artists with popularity between', minPopularity, 'and', maxPopularity, ':', artists);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  

// Count total no of artists

// async function countArtists() {
//     try {
//       const artistCount = await Artist.countDocuments();
//       console.log('Total number of artists:', artistCount);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
// async function sortArtistsByPopularity(ascending = true) {
//     try {
//       const sortOrder = ascending ? 1 : -1;
//       const artists = await Artist.find().sort({ popularity: sortOrder });
//       console.log('Artists sorted by popularity:', artists);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  

// Call the function to retrieve artists sorted by popularity in descending order
// sortArtistsByPopularity(false);
// countArtists();

// findArtistsByPopularity(70, 98);
