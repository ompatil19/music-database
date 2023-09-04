const mongoose=require('mongoose');

const playlistsSchema = new mongoose.Schema({
    playlistID:{
        type:String,
        required:true,
        unique: true,
    },
    userID:{
        type:String,
        required:true,
    },
    songID:{
        type:String,
        required:true,
    },
    playlistName:{
        type:String,
        required:true,
        // unique:true,
    },
    tracks:{
        type:String,
        required:true,
    },
   
  });

const playlistsModel = mongoose.model('playlists', playlistsSchema);

module.exports = playlistsModel;


// const mongoose = require("mongoose");

// const playlistSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, // Playlist ID as primary key
//   playlistName: String,
//   trackIds: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Track" // Reference to Track collection
//   }],
//   description: String,
//   followers: Number,
// });

// const Playlist = mongoose.model("Playlist", playlistSchema);

// module.exports = Playlist;
