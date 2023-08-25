const express = require("express");

const app = express();
const mongoose = require("mongoose");
const axios = require('axios');
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




// Example usage
const albumName = 'folklore'; // Replace with the album name you want to search for
getAccessToken().then(()=>{getAlbumDetails(albumName)
  .then(albumDetails => {
    console.log('Album Details:', albumDetails);
    insertionLogic.insertAlbum(albumDetails);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});




 // Example usage
  const artistName = 'Drake'; // Replace with the artist name you want to search for
  getAccessToken().then(() => {
    getArtistDetails(artistName)
      .then(artistDetails => {
        console.log('Artist Details:', artistDetails);
        insertionLogic.insertArtist(artistDetails);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });


  const songName = 'touch'; // Replace with the song name you want to search for
getAccessToken().then(() => {
    getSongDetails(songName)
        .then(songDetails => {
            console.log('Song Details:', songDetails);
            console.log(typeof(songDetails.genres));
            // insertionLogic.insertSong(songDetails);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


  // const playlistName = 'Your Playlist Name'; // Replace with the playlist name you want to search for

  // getAccessToken().then(() => {
  //     getPlaylistDetails(playlistName)
  //         .then(playlistDetails => {
  //             console.log('Playlist Details:', playlistDetails);
  //             insertionLogic.insertPlaylist(playlistDetails); // Assuming you have a function for playlist insertion
  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //         });
  // });



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
