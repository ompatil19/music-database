const mongoose=require('mongoose');

const artistsSchema = new mongoose.Schema({
    playlistID:{
        type:String,
        required:true,
        unique: true,
    },
    popularity:{
        type:int,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
        // unique:true,
    },
    songID:{
        type:String,
        required:true,       
    },
    concerts:{
        type:String,
        required:true,
        // unique:true,
    },
    listeners:{
        type:String,
        required:true,
        //unique:true,
    },
    dateofbirth:{
        type:Date,
        required:true,
        // unique:true,
    },
    age:{
        type:int,
        required:true,
        // unique:true,
    }

  });

const artistsModel = mongoose.model('artists', artistsSchema);

module.exports = artistsModel;