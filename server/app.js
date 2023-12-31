const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Artist = require('./models/artists');
const bodyParser = require('body-parser');
const getArtistDetails = require('./artist');
const getAlbumDetails = require('./album');
const getTrackDetails = require('./track');
const getTrackRecommendations = require('./getTrackRecommendations');

const getAccessToken = require('./getAccessToken');
const insertionLogic = require('./insertion');

app.use(bodyParser.json());
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/MusicRecSys', {

}).then(console.log("Connected to mongo DB"));

app.get('/album/:albumName', async (req, res) => {
  const albumName = req.params.albumName;

  try {
    const accessToken = await getAccessToken();
    const albumDetails = await getAccessToken().then(() => {
      getAlbumDetails(albumName)
        .then(async albumDetails => {
          // console.log('Album Details:', albumDetails);
          res.json(albumDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  } catch (error) {
    res.status(404).json({ error: 'Album not found' });
  }
});

app.get('/artist/:artistName', async (req, res) => {
  const artistName = req.params.artistName;

  try {
    const artistDetails = await getAccessToken().then(() => {
      getArtistDetails(artistName)
        .then(artistDetails => {
          // console.log('Artist Details:', artistDetails);
          res.json(artistDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  } catch (error) {
    res.status(404).json({ error: 'Artist not found' });
  }
});

app.get('/track/:trackName', async (req, res) => {
  const trackName = req.params.trackName;

  try {
    const accessToken = await getAccessToken();
    const trackDetails = await getTrackDetails(trackName);
    // console.log('Track Details:', trackDetails);
    res.json(trackDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ error: 'Song not found' });
  }
});

app.get('/recommend/:trackName', async (req, res) => {
  const trackName = req.params.trackName;

  try {
    const accessToken = await getAccessToken();
    const trackDetails = await getTrackDetails(trackName);
    const recommendations = await getTrackRecommendations(trackDetails.trackId);

    // console.log('Recommendations', recommendations);

    res.json(
      recommendations
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ error: 'Song not found' });
  }
});


const albumsModel = require('./models/albums');
const artistsModel = require('./models/artists');
const tracksModel = require('./models/tracks');



app.post('/artist/:artistName/insert', async (req, res) => {
  const artistName = req.params.artistName;
  
  try {
    const artistDetails = await getAccessToken().then(() => {
      return getArtistDetails(artistName);
    });

    if (!artistDetails) {
      console.error('Error: Artist details not found');
      res.status(500).json({ error: 'Error retrieving artist details' });
      return;
    }
    console.log('Artist Details:', artistDetails);
    const spotifyId = artistDetails.artistId;
    const existingArtist = await artistsModel.findOne({artistId:spotifyId});
    // console.log('Existing Artist:', existingArtist);
    if (!existingArtist) {
      const newArtist = new artistsModel(artistDetails);
      await newArtist.save();
      res.json({ message: 'Artist details inserted successfully' });
    } else {
      console.log('Artist already exists:', artistName);
      res.json({ message: 'Artist already exists' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Error inserting artist details' });
  }
});
app.post('/album/:albumName/insert', async (req, res) => {
  const albumName = req.params.albumName;

  try {
    const albumDetails = await getAccessToken().then(() => {
      return getAlbumDetails(albumName);
    });

    if (!albumDetails) {
      console.error('Error: Album details not found');
      res.status(500).json({ error: 'Error retrieving album details' });
      return;
    }
    const spotifyId = albumDetails.albumId;
    const existingAlbum = await albumsModel.findOne({ albumId:spotifyId });

    if (!existingAlbum) {
      const newAlbum = new albumsModel(albumDetails);
      await newAlbum.save();
      res.json({ message: 'Album details inserted successfully' });
    } else {
      console.log('Album already exists:', albumName);
      res.json({ message: 'Album already exists' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Error inserting album details' });
  }
});

app.post('/track/:trackName/insert', async (req, res) => {
  const trackName = req.params.trackName;

  try {
    const trackDetails = await getAccessToken().then(() => {
      return getTrackDetails(trackName);
    });

    if (!trackDetails) {
      console.error('Error: Track details not found');
      res.status(500).json({ error: 'Error retrieving track details' });
      return;
    }
    const spotifyId = trackDetails.trackId;
    const existingTrack = await tracksModel.findOne({ trackId:spotifyId });

    if (!existingTrack) {
      const newTrack = new tracksModel(trackDetails);
      await newTrack.save();
      res.json({ message: 'Track details inserted successfully' });
    } else {
      console.log('Track already exists:', trackName);
      res.json({ message: 'Track already exists' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Error inserting track details' });
  }
});




app.put('/api/updateArtist', async (req, res) => {
  const { currentName, newName } = req.body;

  try {
      const updatedArtist = await Artist.findOneAndUpdate(
          { artistName: currentName },
          { $set: { artistName: newName } },
          { new: true }
      );

      if (!updatedArtist) {
          return res.json({ message: 'Artist not found' });
      } else {
          return res.json({ message: 'Artist updated successfully' });
      }
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getArtists', async (req, res) => {
  const artistName = req.query.artistName;

  try {
      const artist = await Artist.findOne({ artistName });

      if (!artist) {
          return res.json({ message: 'Artist not found' });
      }

      return res.status(200).json({ artist });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/deleteArtist', async (req, res) => {
  const artistName = req.query.artistName;

  try {
      const deletedArtist = await Artist.findOneAndDelete({ artistName });

      if (!deletedArtist) {
          return res.status(404).json({ message: 'Artist not found' });
      }

      return res.status(200).json({ message: 'Artist deleted successfully', deletedArtist });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      mongoose.disconnect();
  }
});

app.delete('/api/deleteArtist', async (req, res) => {
  const artistName = req.query.artistName;

  try {
      const deletedArtist = await Artist.findOneAndDelete({ artistName });
      if (!deletedArtist) {
          return res.status(404).json({ message: 'Artist not found' });
      }

      return res.status(200).json({ message: 'Artist deleted successfully', deletedArtist });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
  } finally {
      mongoose.disconnect();
  }
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
