const mongoose=require('mongoose');

const songsSchema = new mongoose.Schema({
    songId:{
        type:String,
        required:true,
        unique:true,
    },
    songname:{
        type:String,     
    },
    // genre:{
    //     type:String,
    //     required:true,
    // },
    duration:{
        type:String,     
    },
    releasedate:{
        type:String,     
    },
    streams:{
        type:Int32Array,     
    },
    explicity:{
        type:String,
    },
    artistName:{
        type: String,
    }
         
  });

const songsModel = mongoose.model('songs', songsSchema);

module.exports = songsModel;


// const mongoose = require("mongoose");

// const trackSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, // Track ID as primary key
//   artistId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Artist" // Reference to Artist collection
//   },
//   albumId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Album" // Reference to Album collection
//   },
//   trackName: String,
//   genres: [String],
//   duration: Number,
//   releaseDate: Date,
//   streams: Number,
//   explicit: Boolean,
// });

// const Track = mongoose.model("Track", trackSchema);

// module.exports = Track;
