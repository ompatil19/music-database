const mongoose = require('mongoose');
const Artist = require('./models/artists'); // Replace with the correct path to your Artist model

mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function getAllArtists() {
  try {
    const artists = await Artist.find();
    console.log('All artists:', artists);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateArtist(currentName, newName) {
  try {
    const updatedArtist = await Artist.findOneAndUpdate(
      { artistName: currentName },
      { $set: { artistName: newName } },
      { new: true }
    );

    if (!updatedArtist) {
      console.log('Artist not found.');
    } else {
      console.log('Artist updated successfully:', updatedArtist);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

const currentArtistName = 'Travis Scott'; // Replace with the current artist name
const newArtistName = 'The Weeknd'; // Replace with the new artist name
updateArtist(currentArtistName, newArtistName);

getAllArtists();
