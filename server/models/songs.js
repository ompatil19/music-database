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
    genre:{
        type:String,
        required:true,
    },
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
        type:String
    }
         
  });

const songsModel = mongoose.model('songs', songsSchema);

module.exports = songsModel;