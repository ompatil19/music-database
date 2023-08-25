const getAccessToken = require('./getAccessToken');

const albumModel = require('./models/album');
const artistModel = require('./models/artists');
const songsModel = require('./models/songs');
const playlistsModel = require('./models/playlists');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://prakruthi:chocolate19@cluster0.dsrdyr0.mongodb.net/');

 

async function insertAlbum(albumDetails) {
  try {
    // Check if the album with the same album ID already exists
    console.log('Album found:');
    const existingAlbum = await albumModel.findOne({ albumId: albumDetails.albumId });
    if (!existingAlbum) {
      const newAlbum = new albumModel(albumDetails);
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
      }
    } catch (error) {
      console.error('Error storing artist details:', error);
    }
  }
  
  async function insertSong(songDetails) {
    try {
        // Check if the song with the same song ID already exists
        console.log('Song found:');
        const existingSong = await songsModel.findOne({ songId: songDetails.songId });
        if (!existingSong) {
            const newSong = new songsModel(songDetails);
            await newSong.save();
        } else {
            console.log('Song already exists:', songDetails);
        }
    } catch (error) {
        console.error('Error storing song details:', error);
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
  insertSong,
  playlistsModel
};
