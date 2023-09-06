const mongoose = require('mongoose');
const Artist = require('./models/artists'); // Replace with the correct path to your Artist model

mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function deleteArtist(artistName) {
  try {
    const deletedArtist = await Artist.findOneAndDelete({ artistName });

    if (!deletedArtist) {
      console.log('Artist not found.');
    } else {
      console.log('Artist deleted successfully:', deletedArtist);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

const artistNameToDelete = 'Lorde'; // Replace with the artist name you want to delete
deleteArtist(artistNameToDelete);



// const express = require('express');
// const router = express.Router();

// // Import the Artist model if you haven't already
// const Artist = require('../models/artists');

// // Define a route to delete an artist by name
// router.delete('/artists/:name', async (req, res) => {
//   const artistName = req.params.name;

//   try {
//     // Find the artist by name and delete it
//     const deletedArtist = await Artist.findOneAndDelete({ artistName });

//     if (!deletedArtist) {
//       return res.status(404).json({ message: 'Artist not found' });
//     }

//     return res.status(200).json({ message: 'Artist deleted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
