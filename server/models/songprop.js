const mongoose=require('mongoose');

const songpropSchema = new mongoose.Schema({
    loudnessindex:{
        type:Float64Array,
        required:true,
        unique:true,
        
    },
    tempo:{
        type:Int32Array,
    },
    title:{
        type:String,
        required:true,
    },
  });

const songpropModel = mongoose.model('songprop', songpropSchema);

module.exports = songpropModel;