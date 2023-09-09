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