const express = require("express");
const app = express();
require('dotenv').config();

const getArtistDetails = require('./artist'); // Import the artist.js file
const getAlbumDetails = require('./album');
const getSongDetails = require('./songs');
const getPlaylistDetails = require('./playlist');

const getAccessToken = require('./getAccessToken'); // Import your access token function if not already done
const insertionLogic = require('./insertion');

const cors = require("cors");


app.use(express.json());
app.use(cors());

  app.get('/album/:albumName', async (req, res) => {
    const albumName = req.params.albumName;
    
    try {
        const albumDetails = await getAccessToken().then(()=>{getAlbumDetails(albumName)
          .then(albumDetails => {
            console.log('Album Details:', albumDetails);
            res.json(albumDetails);
           // insertionLogic.insertAlbum(albumDetails);
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
      const albumDetails = await getAccessToken().then(()=>{getAlbumDetails(albumName)
        .then(albumDetails => {
          console.log('Album Details:', albumDetails);
          insertionLogic.insertAlbum(albumDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
      res.json(albumDetails);
  } catch (error) {
      res.status(404).json({ error: 'Album not found' });
  }
});

app.get('/artist/:artistName', async (req, res) => {
  const artistName = req.params.artistName;
  
  try {
    const artistDetails = await  getAccessToken().then(() => {
      getArtistDetails(artistName)
        .then(artistDetails => {
          console.log('Artist Details:', artistDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    res.json(artistDetails);
  } catch (error) {
    res.status(404).json({ error: 'Artist not found' });
  }
});

app.post('/artist/:artistName/insert', async (req, res) => {
  const artistName = req.params.artistName;
  
  try {
    const artistDetails = await  getAccessToken().then(() => {
      getArtistDetails(artistName)
        .then(artistDetails => {
          console.log('Artist Details:', artistDetails);
          insertionLogic.insertArtist(artistDetails);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    res.json({ message: 'Artist details inserted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error inserting artist details' });
  }
});

app.get('/song/:songName', async (req, res) => {
  const songName = req.params.songName;
  
  try {
    const songDetails = await getAccessToken().then(() => {
      getSongDetails(songName)
          .then(songDetails => {
              console.log('Song Details:', songDetails);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });
    res.json(songDetails);
  } catch (error) {
    res.status(404).json({ error: 'Song not found' });
  }
});

app.post('/song/:songName/insert', async (req, res) => {
  const songName = req.params.songName;
  
  try {
    const songDetails = await getAccessToken().then(() => {
      getSongDetails(songName)
          .then(songDetails => {
              console.log('Song Details:', songDetails);
              insertionLogic.insertSong(songDetails);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });
    insertionLogic.insertSong(songDetails);
    res.json({ message: 'Song details inserted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error inserting song details' });
  }
});


app.get('/playlist/:playlistName', async (req, res) => {
  const playlistName = req.params.playlistName;
  
  try {
    const playlistDetails = await   getAccessToken().then(() => {
      getPlaylistDetails(playlistName)
          .then(playlistDetails => {
              console.log('Playlist Details:', playlistDetails);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });
    res.json(playlistDetails);
  } catch (error) {
    res.status(404).json({ error: 'Playlist not found' });
  }
});

app.post('/playlist/:playlistName/insert', async (req, res) => {
  const playlistName = req.params.playlistName;
  
  try {
    const playlistDetails = await   getAccessToken().then(() => {
      getPlaylistDetails(playlistName)
          .then(playlistDetails => {
              console.log('Playlist Details:', playlistDetails);
              insertionLogic.insertPlaylist(playlistDetails); 
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });
    insertionLogic.insertPlaylist(playlistDetails);
    res.json({ message: 'Playlist details inserted successfully' });
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
