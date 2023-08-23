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

const PORT = 3000;
const CLIENT_ID = "66b1e51344074dfe84deafaec427d5a3";
const CLIENT_SECRET = "b7ad5a3bc7f7456d8a318ca728516101";
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = "user-read-private user-read-email"; // The requested permissions

app.get("/", (req, res) => {
  // Redirect the user to the Spotify authorization URL
  // const state = generateRandomString(16); // Define the generateRandomString function
  const authParams = {
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state: state,
  };
  const authURL = "https://accounts.spotify.com/authorize?" + querystring.stringify(authParams);
  res.redirect(authURL);
});

app.get("/callback", async (req, res) => {
  // Handle the callback after user grants permissions
  const { code, state } = req.query;
  
  // Verify that the state parameter matches to prevent CSRF attacks
  if (state !== storedState) {
    res.status(400).send("State mismatch");
    return;
  }
  
  // Exchange the authorization code for an access token
  const tokenParams = {
    code: code,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };
  const tokenConfig = {
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
  };
  
  try {
    const tokenResponse = await axios.post("https://accounts.spotify.com/api/token", querystring.stringify(tokenParams), tokenConfig);
    const { access_token, refresh_token } = tokenResponse.data;
    
    // Use the access token to make authorized API requests
    // Store the access token and refresh token securely
    
    res.send("Authentication successful!");
  } catch (error) {
    console.error("Error exchanging authorization code for access token:", error.message);
    res.status(500).send("An error occurred during authentication");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
