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