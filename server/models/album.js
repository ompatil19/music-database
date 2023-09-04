const mongoose=require('mongoose');


const albumSchema = new mongoose.Schema({
    albumId:{
        type:String,
        required:true,
         unique:true,
         index:true
    },
    albumName:{
        type:String,
        required:true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artistModel',
        // required: true,
    },
    releaseDate:{
            type:Date,
            
    },
    // totalTracks:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'tracksModel',
    //     required: true,
    // },
    // genres:{
    //     type:String,
    //     // required:true
    // } 
        
});

const albumModel = mongoose.model('album', albumSchema);

module.exports = albumModel;



// const mongoose = require("mongoose");

// const albumSchema = new mongoose.Schema({

//   _id: mongoose.Schema.Types.ObjectId, // Album ID as primary key
//   artistId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Artist" // Reference to Artist collection
//   },
//   trackIds: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Track" // Reference to Track collection
//   }],
//   albumImage: String,
//   totalTracks: Number,
//   artistName: String,
//   albumName: String,
// });

// const Album = mongoose.model("Album", albumSchema);

// module.exports = Album;
