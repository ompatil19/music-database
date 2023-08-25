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