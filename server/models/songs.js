const mongoose=require('mongoose');

const songsSchema = new mongoose.Schema({
    songId:{
        type:String,
        required:true,
        // unique:true, 
    },
    songname:{
        type:String,     
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artistModel',
        // required: true,
    },
    genres:{
        type:Array,
        required:true,
    },
    duration:{
        type:String,     
    },
    releasedate:{ 
        type:String,     
    },
    streams:{
        type:String     
    },
    explicity:{
        type:String
    }
         
  });

const songsModel = mongoose.model('songs', songsSchema);

module.exports = songsModel;