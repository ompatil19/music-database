const mongoose=require('mongoose');

const albumSchema = new mongoose.Schema({
    dateofrelease:{
        type:Date,
        
    },
    songId:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
  });

const albumModel = mongoose.model('album', albumSchema);

module.exports = albumModel;