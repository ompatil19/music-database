const express = require("express");
const app = express();
require('dotenv').config();

const getArtistDetails = require('./artist'); 
const getAlbumDetails = require('./album');
const getTrackDetails = require('./track');
const getPlaylistDetails = require('./playlist');
const getTrackRecommendations = require('./getTrackRecommendations');

const getAccessToken = require('./getAccessToken'); 
const insertionLogic = require('./insertion');

const cors = require("cors");


app.use(express.json());
app.use(cors());


app.get('/album/:albumName', async (req, res) => {
  const albumName = req.params.albumName;

  try {
    const accessToken = await getAccessToken();
    const albumDetails = await getAccessToken().then(() => {
      getAlbumDetails(albumName)
        .then(async albumDetails => {
          console.log('Album Details:', albumDetails);
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


app.post('/album/:albumName/insert', async (req, res) => {
  const albumName = req.params.albumName;

  try {
    const albumDetails = await getAccessToken().then(() => {
      getAlbumDetails(albumName)
        .then(albumDetails => {
          console.log('Album Details:', albumDetails);
          insertionLogic.insertAlbum(albumDetails);
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
          console.log('Artist Details:', artistDetails);
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

app.post('/artist/:artistName/insert', async (req, res) => {
  const artistName = req.params.artistName;

  try {
    const artistDetails = await getAccessToken().then(() => {
      getArtistDetails(artistName)
        .then(artistDetails => {
          console.log('Artist Details:', artistDetails);
          insertionLogic.insertArtist(artistDetails);
          res.json({ message: 'Artist details inserted successfully' });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  } catch (error) {
    res.status(400).json({ error: 'Error inserting artist details' });
  }
});


app.get('/track/:trackName', async (req, res) => {
  const trackName = req.params.trackName;
  
  try {
    const accessToken = await getAccessToken();
    const trackDetails = await getTrackDetails(trackName);    
    console.log('Track Details:', trackDetails);    
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

    console.log('Recommendations', recommendations);
    
    res.json(
      recommendations
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ error: 'Song not found' });
  }
});


app.post('/track/:trackName/insert', async (req, res) => {
  const trackName = req.params.trackName;

  try {
    const trackDetails = await getAccessToken().then(() => {
      getTrackDetails(trackName)
        .then(trackDetails => {
          console.log('Track Details:', trackDetails);
          insertionLogic.insertTrack(trackDetails);
          res.json({ message: 'Track details inserted successfully' });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    
  } catch (error) {
    res.status(400).json({ error: 'Error inserting song details' });
  }
});


app.get('/playlist/:playlistName', async (req, res) => {
  const playlistName = req.params.playlistName;

  try {
    const playlistDetails = await getAccessToken().then(() => {
      getPlaylistDetails(playlistName)
        .then(playlistDetails => {
          console.log('Playlist Details:', playlistDetails);
          res.json(playlistDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  } catch (error) {
    res.status(404).json({ error: 'Playlist not found' });
  }
});

app.post('/playlist/:playlistName/insert', async (req, res) => {
  const playlistName = req.params.playlistName;

  try {
    const playlistDetails = await getAccessToken().then(() => {
      getPlaylistDetails(playlistName)
        .then(playlistDetails => {
          console.log('Playlist Details:', playlistDetails);
          insertionLogic.insertPlaylist(playlistDetails);
          res.json({ message: 'Playlist details inserted successfully' });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    
  } catch (error) {
    res.status(400).json({ error: 'Error inserting playlist details' });
  }
});


// //Route to get data from database
// app.get("/getUsers", (req, res) => {
//   UserModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });


// //Route to add data to database
// app.post("/createUser", async (req, res) => {
//   const user = req.body;
//   const newUser = new UserModel(user);
//   await newUser.save();

//   res.json(user);
// });



app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
