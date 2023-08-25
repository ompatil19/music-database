const express = require("express");
const querystring = require("querystring");
const app = express();
const mongoose = require("mongoose");
const axios = require('axios');
require('dotenv').config();
// const UserModel = require("./models/Users");

const cors = require("cors");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let ACCESS_TOKEN;
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://mohit:chocolate01@cluster0.dsrdyr0.mongodb.net/"
);

//Spotify authorisation
// Function to obtain the access token
function getAccessToken() {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    params: {
      grant_type: 'client_credentials'
    }
  };

  return axios(authOptions)
    .then(response => {
      ACCESS_TOKEN = response.data.access_token;
      console.log('Access Token:', ACCESS_TOKEN);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


async function getSongDetails(songname) {
  try {
    const searchOptions = {
      url: 'https://api.spotify.com/v1/search',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        q: songname,
        type: 'track'
      }
    };

    const response = await axios(searchOptions);
    const tracks = response.data.tracks.items;

    if (tracks.length > 0) {
      const track = tracks[0];

      // Prepare and return the song details
      const songDetails = {
        id: track.id,
        name: track.name,
        //genre: track.album.genres, // Example, accessing the first genre
        duration: track.duration_ms, // Duration in milliseconds
        release_date: track.album.release_date,
        streams: track.popularity,
        explicit: track.explicit,
        artists: track.artists.map(artist => artist.name),
        albumname: track.album.name,
        // Add more details as needed
      };

      return songDetails;
    } else {
      throw new Error('Song not found.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


// Example usage
const songname = 'mirrorball'; // Replace with the song name you want to search for

getAccessToken().then(() => {
  getSongDetails(songname)
    .then(songDetails => {
      console.log('Song Details:', songDetails);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});




// Route to add song data to the database
app.post("/createSong", async (req, res) => {
  const song = req.body;
  const newSong = new songsModel(song);
  await newSong.save();

  res.json(song);
});
// Route to get song data from the database
app.get("/getSongs", (req, res) => {
  songsModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});




app.listen(3002, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
