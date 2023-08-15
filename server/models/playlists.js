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
    pName:{
        type:String,
        required:true,
        // unique:true,
    }
   
  });

const playlistsModel = mongoose.model('playlists', playlistsSchema);

module.exports = playlistsModel;