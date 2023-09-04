const mongoose=require('mongoose');

const artistsSchema = new mongoose.Schema({
    artistId:{
        type:String,
        required:true,
        unique: true,
    },
    artistName:{
        type:String,
        required:true,
    },
    artistImage: {
        type: String, // Assuming albumImage is a URL
    },
    followers:{
        type:String,
        required:true,
    },
    popularity:{
        type:String,
        required:true,
    },
    genres:{
        type:Object,
        required:true,
        // unique:true,
    },



  });

const artistsModel = mongoose.model('artists', artistsSchema);

module.exports = artistsModel;

// const mongoose = require("mongoose");

// const artistSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, // Artist ID as primary key
//   popularity: Number,
//   artistName: String,
//   genres: [String],
//   followers: Number,
// });

// const Artist = mongoose.model("Artist", artistSchema);

// module.exports = Artist;
