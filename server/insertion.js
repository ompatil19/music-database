const getAccessToken = require('./getAccessToken');

const albumsModel = require('./models/albums');
const artistModel = require('./models/artists');
const tracksModel = require('./models/tracks');
const playlistsModel = require('./models/playlists');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys');



async function insertAlbum(albumDetails) {
  try {
    // Check if the album with the same album ID already exists
    console.log('Album found:');
    const existingAlbum = await albumsModel.findOne({ albumId: albumDetails.albumId });
    if (!existingAlbum) {
      const newAlbum = new albumsModel(albumDetails);
      await newAlbum.save();
    } else {
      console.log('Album already exists:', albumDetails);
    }
  } catch (error) {
    console.error('Error storing album details:', error);
  }
}

async function insertArtist(artistDetails) {
  try {
    // Check if the artist with the same ID already exists
    console.log('Artist found:');
    const existingArtist = await artistModel.findOne({ artistId: artistDetails.artistId });

    if (!existingArtist) {
      const newArtist = new artistModel(artistDetails);
      await newArtist.save();
    } else {
      console.log('Artist already exists:', artistDetails);
      // res.json({"status":"Artist already exists"})
    }
  } catch (error) {
    console.error('Error storing artist details:', error);
  }
}

async function insertTrack(trackDetails) {
  try {
    // Check if the song with the same song ID already exists
    console.log('Track found:');
    const existingTrack = await tracksModel.findOne({ trackId: trackDetails.trackId });
    if (!existingTrack) {
      const newTrack = new tracksModel(trackDetails);
      await newTrack.save();
    } else {
      console.log('Track already exists:', trackDetails);
    }
  } catch (error) {
    console.error('Error storing track details:', error);
  }
}

async function insertPlaylist(playlistDetails) {
  try {
    console.log('Playlist found:');
    const existingPlaylist = await playlistModel.findOne({ playlistId: playlistDetails.playlistId });
    if (!existingPlaylist) {
      const newPlaylist = new playlistsModel(playlistDetails);
      await newPlaylist.save();
    } else {
      console.log('Playlist already exists:', playlistDetails);
    }
  } catch (error) {
    console.error('Error storing playlist details:', error);
  }
}



module.exports = {
  insertAlbum,
  insertArtist,
  insertTrack,
  insertPlaylist
};
