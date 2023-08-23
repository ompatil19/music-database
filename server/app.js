// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// //const songsModel = require("./models/songs");
// //const axios = require('axios');

// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// mongoose.connect(
//   "mongodb+srv://prakruthi:chocolate19@cluster0.dsrdyr0.mongodb.net/"
// );


// var client_id = '66b1e51344074dfe84deafaec427d5a3';
// var redirect_uri = 'http://localhost:3000/callback';

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   var scope = 'user-read-private user-read-email';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });


// // app.get("/getsongs", (req, res) => {
// //   songsModel.find({}, (err, result) => {
// //     if (err) {
// //       res.json(err);
// //     } else {
// //       res.json(result);
// //     }
// //   });
// // });

// // app.post("/createsongs", async (req, res) => {
// //   const user = req.body;
// //   const newUser = new UserModel(user);
// //   await newUser.save();

// //   res.json(user);
// // });

// app.listen(3000, () => {
//   console.log("Listening on port 3000");
// });

const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
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
  "mongodb+srv://ompatil:chocolate19@cluster0.dsrdyr0.mongodb.net/"
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


async function getAlbumDetails(albumName) {
  try {
    const searchOptions = {
      url: 'https://api.spotify.com/v1/search',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        q: albumName,
        type: 'album'
      }
    };

    const response = await axios(searchOptions);
    const albums = response.data.albums.items;

    if (albums.length > 0) {
      const album = albums[0];
      const albumId = album.id;

      const albumDetailsOptions = {
        url: `https://api.spotify.com/v1/albums/${albumId}`,
        method: 'get',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      };

      const albumResponse = await axios(albumDetailsOptions);
      const detailedAlbum = albumResponse.data;

      // Prepare and return the album details
      const albumDetails = {
        id: albumId,
        name: detailedAlbum.name,
        artists: detailedAlbum.artists.map(artist => artist.name),
        release_date: detailedAlbum.release_date,
        total_tracks: detailedAlbum.total_tracks,
        genres: detailedAlbum.genres,
        // Add more details as needed
      };

      return albumDetails;
    } else {
      throw new Error('Album not found.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Example usage
const albumName = 'folklore'; // Replace with the album name you want to search for
getAccessToken().then(()=>{getAlbumDetails(albumName)
  .then(albumDetails => {
    console.log('Album Details:', albumDetails);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});


//Route to get data from database
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


//Route to add data to database
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});



app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
