const mongoose=require('mongoose');

const tracksSchema = new mongoose.Schema({
    trackId:{
        type:String,
        required:true,
        // unique:true, 
    },
    trackName:{
        type:String     
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

const tracksModel = mongoose.model('tracks', tracksSchema);

module.exports = tracksModel;